#!/usr/bin/env node
// Validador de texto que sai do repositório para uma pessoa:
// - mensagem (templates/MENSAGEM.template.md, skills/52-audience-message): público e tipo do
//   catálogo, destino, estado, texto pronto e o que o público não pode receber;
// - handoff (dev.md, po.md, negocios.md de skills/46-handoff-authoring): sem dado proibido, sem nome
//   de pessoa (papéis, nunca nomes) e sem caminho da base de conhecimento.
// Erro bloqueia a entrega; aviso é para a pessoa decidir.
//   node .claude/scripts/kanon-mensagem.js <arquivo.md | pasta>
'use strict';
const fs = require('fs');
const path = require('path');
const { parseFrontmatter, carregarPerfilEfetivo, regexDeNome } = require('../hooks/lib/perfil');
const { dadosProibidos, publicos, tiposDeMensagem } = require('../hooks/lib/mensagem');
const { PRAZO_ESTRATEGIA } = require('./kanon-publicacao');

const HANDOFFS = ['dev.md', 'po.md', 'negocios.md'];
const ESTADOS = ['rascunho', 'aprovado', 'enviado'];
const DATA = /^\d{4}-\d{2}-\d{2}$/;
const PLACEHOLDER = /_\[preencher/;
const ARQUIVO_LINHA = /[\w./-]+\.[a-z]{1,5}:\d+\b/;
const CAMINHO_DA_BASE = /\/home\/|(?:^|[\s(`])\.kanon\/|(?:^|[\s(`])docs\/|\[\[/;
// Quem não lê código: arquivo:linha é ruído; nome de dev não entra (02-publicos.md).
const NAO_TECNICOS = ['PO', 'Negócio', 'Gestão de entrega', 'Liderança executiva', 'Parceiro ou fornecedor externo', 'Suporte e operação'];
const SEM_NOME_DE_DEV = ['Negócio', 'Liderança executiva', 'Parceiro ou fornecedor externo', 'Suporte e operação'];
const PAPEL_DEV = /\bdev\b|desenvolvedor|engenheir/i;
// Cortes de reference/comunicacao/04-escrita-clara.md: valem para todos os públicos.
const ABERTURA_QUE_ANUNCIA = /gostaria de (?:informar|avisar|comunicar|compartilhar)|venho por meio desta|segue abaixo|espero que (?:estejam|esteja|você esteja) bem|passando (?:aqui )?para (?:informar|avisar)|desculp[ae] (?:o|pelo) incômodo|desculpe incomodar/i;
// Número de impacto (process/19-evidence-verification.md): número com 3+ dígitos na mesma linha de uma palavra
// de impacto. Sem `verificacao` no frontmatter, é aviso: a pessoa confere se o número passou pela verificação.
const NUMERO_DE_IMPACTO = /(?=.*\b\d{1,3}(?:\.\d{3})+\b|.*\b\d{3,}\b)(?=.*\b(?:afetad|ca[íi]ram|caiu|impact|perd|zerad|derrubad|duplicad|clientes|participantes|usu[áa]rios))/i;
const FECHO_GENERICO = /qualquer (?:coisa|dúvida)|fico à disposição|estou à disposição|espero ter ajudado/i;

function secao(md, titulo) {
  const m = md.match(new RegExp(`^## ${titulo}\\s*$`, 'm'));
  if (!m) return null;
  const resto = md.slice(m.index + m[0].length);
  const fim = resto.search(/^## /m);
  return (fim < 0 ? resto : resto.slice(0, fim)).trim();
}

function pessoas(arquivo, projectDir, filtro = () => true) {
  const ef = carregarPerfilEfetivo({ projectDir, cwd: path.dirname(path.resolve(arquivo)) });
  const papeis = (ef && Array.isArray(ef.papeis) ? ef.papeis : []).filter((p) => p && p.pessoa && filtro(p));
  return [...new Set(papeis.map((p) => String(p.pessoa)))];
}

function nomesNoTexto(texto, nomes) {
  return nomes.filter((n) => String(n).length >= 3 && regexDeNome(n).test(texto));
}

function validarMensagem(arquivo, md, projectDir) {
  const erros = [];
  const avisos = [];
  const fm = parseFrontmatter(md) || {};
  const vazio = (v) => v === undefined || v === null || v === '' || PLACEHOLDER.test(String(v));

  const catalogo = publicos(projectDir);
  if (!catalogo.includes(fm.publico)) erros.push(`público "${fm.publico || ''}" fora do catálogo (${catalogo.join(', ')})`);
  const tipos = tiposDeMensagem(projectDir);
  if (!tipos.includes(fm.tipo)) erros.push(`tipo "${fm.tipo || ''}" fora do catálogo (${tipos.join(', ')})`);
  if (vazio(fm.destino)) erros.push('destino não preenchido: pergunte, nunca deduza');
  if (!ESTADOS.includes(fm.status)) erros.push(`status "${fm.status || ''}" inválido (${ESTADOS.join(', ')})`);
  if (['aprovado', 'enviado'].includes(fm.status) && !DATA.test(String(fm.aprovado_em || ''))) {
    erros.push(`status ${fm.status} sem aprovado_em (AAAA-MM-DD): rascunho só com o ok do texto e do destino`);
  }
  if (fm.status === 'enviado' && !DATA.test(String(fm.enviado_em || ''))) erros.push('status enviado sem enviado_em (AAAA-MM-DD)');
  const fontes = Array.isArray(fm.fontes) ? fm.fontes : fm.fontes ? [fm.fontes] : [];
  if (!fontes.length || fontes.every(vazio)) avisos.push('nenhuma fonte: toda afirmação de estado e todo número precisam de fonte e data');

  const lido = secao(md, 'Lido antes de escrever');
  if (lido === null || !lido || PLACEHOLDER.test(lido)) avisos.push('"Lido antes de escrever" vazio: leia o destino desde o último envio');

  const texto = secao(md, 'Texto');
  if (texto === null || !texto) {
    erros.push('seção "Texto" ausente ou vazia');
    return { erros, avisos };
  }
  if (PLACEHOLDER.test(texto)) erros.push('o texto ainda tem campo a preencher: rascunho só com texto final');
  for (const a of dadosProibidos(texto)) erros.push(`dado que nunca sai: ${a.nome} ("${a.trecho}")`);

  if (SEM_NOME_DE_DEV.includes(fm.publico)) {
    for (const n of nomesNoTexto(texto, pessoas(arquivo, projectDir, (p) => PAPEL_DEV.test(String(p.papel || ''))))) {
      erros.push(`nome de dev ("${n}") numa mensagem para ${fm.publico}: cite a correção do time, não quem fez`);
    }
  }
  if (NAO_TECNICOS.includes(fm.publico)) {
    const m = texto.match(ARQUIVO_LINHA);
    if (m) avisos.push(`"${m[0]}" numa mensagem para ${fm.publico}: arquivo:linha só ajuda quem lê código`);
  }
  for (const { nome, re } of PRAZO_ESTRATEGIA) {
    const m = texto.match(re);
    if (m) avisos.push(`possível ${nome} ("${m[0]}"): prazo e estratégia internos ficam no repositório de conteúdo`);
  }
  const linhas = texto.split('\n').map((l) => l.trim()).filter(Boolean);
  const abertura = (linhas[0] || '').match(ABERTURA_QUE_ANUNCIA);
  if (abertura) avisos.push(`abertura que só anuncia ("${abertura[0]}"): a primeira linha é o pedido, a pergunta ou a conclusão`);
  const fecho = linhas.length > 1 && linhas[linhas.length - 1].match(FECHO_GENERICO);
  if (fecho) avisos.push(`fecho genérico ("${fecho[0]}"): termine quando o conteúdo acabar ou ofereça algo específico`);
  const impacto = linhas.find((l) => NUMERO_DE_IMPACTO.test(l));
  if (impacto && vazio(fm.verificacao)) {
    avisos.push(`número de impacto sem \`verificacao\` no frontmatter ("${impacto.slice(0, 60)}"): aponte a seção Verificação que o sustenta (process/19-evidence-verification.md)`);
  }
  return { erros, avisos };
}

function validarHandoff(arquivo, md, projectDir) {
  const erros = [];
  const avisos = [];
  if (PLACEHOLDER.test(md)) erros.push('ainda tem campo a preencher');
  for (const a of dadosProibidos(md)) erros.push(`dado que nunca sai: ${a.nome} ("${a.trecho}")`);
  for (const n of nomesNoTexto(md, pessoas(arquivo, projectDir))) erros.push(`nome de pessoa ("${n}"): no handoff vão papéis, nunca nomes`);
  const c = md.match(CAMINHO_DA_BASE);
  if (c) erros.push(`caminho da base de conhecimento ("${c[0].trim()}"): o handoff carrega a evidência que cita`);
  if (path.basename(arquivo) !== 'dev.md') {
    const m = md.match(ARQUIVO_LINHA);
    if (m) avisos.push(`"${m[0]}" fora do handoff de engenharia: evidência técnica só quando é o argumento`);
  }
  return { erros, avisos };
}

function avaliar(arquivo, projectDir) {
  const md = fs.readFileSync(arquivo, 'utf8');
  const fm = parseFrontmatter(md);
  if (fm && 'publico' in fm) return validarMensagem(arquivo, md, projectDir);
  if (HANDOFFS.includes(path.basename(arquivo))) return validarHandoff(arquivo, md, projectDir);
  return null;
}

function main(argv, { projectDir }) {
  const alvo = argv[0];
  if (!alvo) return { code: 1, stdout: 'Uso: node .claude/scripts/kanon-mensagem.js <arquivo.md | pasta>\n' };
  if (!fs.existsSync(alvo)) return { code: 1, stdout: `Não encontrado: ${alvo}\n` };
  const arquivos = fs.statSync(alvo).isDirectory()
    ? fs.readdirSync(alvo).filter((f) => f.endsWith('.md')).map((f) => path.join(alvo, f))
    : [alvo];

  const linhas = [];
  let erros = 0;
  let avisos = 0;
  let avaliados = 0;
  for (const arquivo of arquivos) {
    const r = avaliar(arquivo, projectDir);
    if (!r) continue;
    avaliados++;
    const nome = path.relative(process.cwd(), arquivo) || arquivo;
    for (const e of r.erros) linhas.push(`ERRO   ${nome}: ${e}`);
    for (const a of r.avisos) linhas.push(`AVISO  ${nome}: ${a}`);
    erros += r.erros.length;
    avisos += r.avisos.length;
  }
  if (!avaliados) return { code: 1, stdout: `Nenhuma mensagem (frontmatter com publico) nem handoff (dev.md, po.md, negocios.md) em ${alvo}.\n` };
  linhas.push(`${avaliados} arquivo(s): ${erros} erro(s), ${avisos} aviso(s).${erros ? ' Corrija os erros antes de pedir aprovação.' : ''}`);
  return { code: erros ? 1 : 0, stdout: `${linhas.join('\n')}\n` };
}

if (require.main === module) {
  const projectDir = process.env.CLAUDE_PROJECT_DIR || path.join(__dirname, '..', '..');
  const r = main(process.argv.slice(2), { projectDir });
  process.stdout.write(r.stdout);
  process.exit(r.code);
}

module.exports = { main, avaliar };
