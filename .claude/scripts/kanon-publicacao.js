#!/usr/bin/env node
// Trava de publicação de work item (process/18-work-item-publication-gate.md), usada pela
// skills/16-work-tracking-publication antes de criar ou atualizar uma Feature ou User Story na
// ferramenta de trabalho. Confere o pacote que vai ser publicado — descrição, critérios, anexos e
// campos — e recusa o que estiver fora do modelo. O modelo de seções da Feature sai do próprio
// .kanon/templates/FEATURE.template.md, para template e trava nunca divergirem.
//   node .claude/scripts/kanon-publicacao.js <pacote.json>
'use strict';
const fs = require('fs');
const path = require('path');

const FIM_DA_PUBLICACAO = '<!-- kanon:fim-da-publicacao -->';

// Prazo e estratégia de uso interno nunca saem do cofre. A lista pega candidatos; quem decide é a
// pessoa que leu o arquivo inteiro (campo "revisado") ou o arquivo fica de fora ("fora").
const PRAZO_ESTRATEGIA = [
  { nome: 'horas', re: /\b\d+(?:[.,]\d+)?\s?(?:h|horas?)\b/i },
  { nome: 'prazo', re: /\bprazos?\b|\bdeadline\b/i },
  { nome: 'data de entrega', re: /\bdata de entrega|\bentregar? até|\baté o dia/i },
  { nome: 'data limite', re: /\baté (?:dia )?\d{1,2}\/\d{1,2}\b/i },
  { nome: 'comunicar data', re: /\bcomunicar (?:a |uma )?data\b/i },
  { nome: 'orçamento', re: /\borçamento/i },
  { nome: 'estratégia', re: /\bestrat[eé]gi/i },
  { nome: 'folga ou margem', re: /\bfolga\b|\bmargem de segurança|\bgordura\b/i },
  { nome: 'dias úteis', re: /\bdias? úteis/i },
];

const LINK = /\]\(([^)\s]+)/g;
const LINK_PERMITIDO = /^(?:https?:\/\/|mailto:|\{\{ATT:|\{\{DIAGRAM:)/;
const ANEXO_CITADO = /\{\{ATT:([^}]+)\}\}/g;
const REF_KANON =
  /(?:^|[\s`(])(\.kanon\/[\w./-]+|skills\/\d{2}-[\w-]+|process\/\d{2}-[\w-]+|templates\/[\w-]+\.template\.md|agents\/AGENT-[\w-]+)/g;

function secoesDoModelo(projectDir) {
  const tpl = fs.readFileSync(path.join(projectDir, '.kanon', 'templates', 'FEATURE.template.md'), 'utf8');
  const fim = tpl.indexOf(FIM_DA_PUBLICACAO);
  const linhas = (fim >= 0 ? tpl.slice(0, fim) : tpl).split('\n');
  const secoes = [];
  linhas.forEach((l, i) => {
    const m = l.match(/^## (.+?)\s*$/);
    if (!m) return;
    const seguinte = linhas.slice(i + 1).find((x) => x.trim()) || '';
    secoes.push({ titulo: m[1], opcional: seguinte.startsWith('_Opcional') });
  });
  return secoes;
}

const vazio = (v) => v === undefined || v === null || String(v).trim() === '';

function trechosSuspeitos(texto) {
  const achados = [];
  texto.split('\n').forEach((linha, i) => {
    for (const { nome, re } of PRAZO_ESTRATEGIA) {
      const m = linha.match(re);
      if (m) achados.push({ linha: i + 1, nome, trecho: m[0] });
    }
  });
  return achados;
}

function conferirTexto(rotulo, texto, problemas) {
  texto.split('\n').forEach((linha, i) => {
    const onde = `${rotulo}:${i + 1}`;
    for (const m of linha.matchAll(LINK)) {
      if (!LINK_PERMITIDO.test(m[1])) {
        problemas.push(`${onde} link relativo "${m[1]}": no item publicado ele não abre — aponte para o anexo ({{ATT:nome}}) ou para a URL`);
      }
    }
    if (/\[preencher/i.test(linha)) problemas.push(`${onde} texto de template não preenchido`);
    const semUrl = linha.replace(/https?:\/\/\S+/g, '');
    for (const m of semUrl.matchAll(REF_KANON)) {
      problemas.push(`${onde} referência interna do kanon "${m[1]}": não faz sentido fora do cofre`);
    }
    if (/^_Breadcrumb/.test(linha)) problemas.push(`${onde} breadcrumb do cofre: tire do texto publicado`);
  });
}

function conferirFeature(descricao, manifesto, projectDir, problemas) {
  const modelo = secoesDoModelo(projectDir);
  const titulos = modelo.map((s) => s.titulo);
  const presentes = [...descricao.matchAll(/^## (.+?)\s*$/gm)].map((m) => m[1]);
  let ultimo = -1;
  for (const t of presentes) {
    const i = titulos.indexOf(t);
    if (i < 0) {
      problemas.push(`a seção "${t}" não existe no modelo da Feature (templates/FEATURE.template.md): tire ou mova para o cofre`);
      continue;
    }
    if (i < ultimo) problemas.push(`a seção "${t}" está fora da ordem do modelo`);
    ultimo = Math.max(ultimo, i);
  }
  for (const s of modelo) {
    if (!s.opcional && !presentes.includes(s.titulo)) problemas.push(`falta a seção "${s.titulo}" do modelo`);
  }
  const docs = (descricao.split(/^## Documentos relacionados\s*$/m)[1] || '').split(/^## /m)[0];
  const citados = [...docs.matchAll(ANEXO_CITADO)].map((m) => m[1]);
  const nomes = (manifesto.anexos || []).map((a) => a.nome);
  for (const n of nomes) {
    if (!citados.includes(n)) problemas.push(`o anexo "${n}" não aparece em Documentos relacionados`);
  }
  return citados;
}

function conferirUserStory(descricao, criterios, manifesto, problemas) {
  const m = String(manifesto.titulo || '').match(/^(US\d{2}) - [^:]+: .+/);
  if (!m) problemas.push('o título precisa seguir "USnn - camada: título" (ex.: "US01 - API do cadastro: aceitar celular opcional")');
  if (/```mermaid/.test(descricao) || /```mermaid/.test(criterios)) {
    problemas.push('diagrama Mermaid em texto: gere a imagem, anexe e aponte com {{DIAGRAM:nome}}');
  }
  if (vazio(criterios)) problemas.push('critérios de aceite vazios: eles vão no campo próprio do item');
  if (/^#+ .*Critérios de aceite/im.test(descricao)) {
    problemas.push('critérios de aceite dentro da descrição: eles vão no campo próprio do item, não na descrição');
  }
  return m ? m[1] : null;
}

function conferirCampos(campos, us, problemas, motivos) {
  const tags = String(campos.tags || '')
    .split(';')
    .map((t) => t.trim())
    .filter(Boolean);
  if (!/^\d{4}$/.test(tags[0] || '')) problemas.push('a primeira tag precisa ser o ano (ex.: "2026; produto; tema")');
  if (us && tags[tags.length - 1] !== us) problemas.push(`a última tag precisa ser "${us}"`);
  if (vazio(campos.responsavel)) problemas.push('falta o responsável do item');
  for (const [chave, rotulo, genero] of [
    ['esforco', 'esforço', 'vazio'],
    ['iteracao', 'iteração', 'vazia'],
  ]) {
    const v = campos[chave];
    if (v && typeof v === 'object') {
      if (vazio(v.motivo)) problemas.push(`${rotulo} ${genero} sem motivo: registre por que está vazio, nunca invente o valor`);
      else motivos.push(`${rotulo}: ${v.motivo}`);
    } else if (vazio(v)) {
      problemas.push(`${rotulo} ${genero} sem motivo: registre por que está vazio (ex.: { "motivo": "a estimar com o time" }), nunca invente o valor`);
    }
  }
}

function avaliar(manifesto, base, projectDir) {
  const problemas = [];
  const motivos = [];
  const revisados = [];
  const tipo = manifesto.tipo;
  if (tipo !== 'feature' && tipo !== 'user-story') {
    return { problemas: [`tipo "${tipo}" desconhecido: use "feature" ou "user-story"`], motivos, revisados };
  }
  const ler = (rel, rotulo) => {
    if (vazio(rel)) return '';
    const p = path.resolve(base, rel);
    if (!fs.existsSync(p)) {
      problemas.push(`${rotulo}: arquivo "${rel}" não existe`);
      return '';
    }
    return fs.readFileSync(p, 'utf8');
  };
  const descricao = ler(manifesto.descricao, 'descrição');
  const criterios = tipo === 'user-story' ? ler(manifesto.criterios, 'critérios') : '';
  if (vazio(descricao)) problemas.push('descrição vazia');

  const primeira = descricao.split('\n').find((l) => l.trim()) || '';
  if (primeira.trim() !== `# ${manifesto.titulo}`) {
    problemas.push(`a primeira linha da descrição precisa ser "# ${manifesto.titulo}" (é "${primeira.trim()}")`);
  }
  conferirTexto('descrição', descricao, problemas);
  conferirTexto('critérios', criterios, problemas);

  const suspeitosDoTexto = [
    ...trechosSuspeitos(descricao).map((a) => ({ ...a, rotulo: 'descrição' })),
    ...trechosSuspeitos(criterios).map((a) => ({ ...a, rotulo: 'critérios' })),
  ];
  if (suspeitosDoTexto.length && vazio(manifesto.revisao_descricao)) {
    for (const a of suspeitosDoTexto) problemas.push(`${a.rotulo}:${a.linha} ${a.nome} ("${a.trecho}"): prazo ou estratégia interna não vai para o item`);
  } else if (suspeitosDoTexto.length) {
    revisados.push(`descrição — revisado: ${manifesto.revisao_descricao}`);
  }

  const citados =
    tipo === 'feature' ? conferirFeature(descricao, manifesto, projectDir, problemas) : [...descricao.matchAll(ANEXO_CITADO)].map((m) => m[1]);
  const us = tipo === 'user-story' ? conferirUserStory(descricao, criterios, manifesto, problemas) : null;

  const anexos = manifesto.anexos || [];
  const nomes = anexos.map((a) => a.nome);
  for (const c of new Set(citados)) {
    if (!nomes.includes(c)) {
      problemas.push(`"${c}" está em Documentos relacionados e não está na lista de anexos: anexe ou tire o link`);
    }
  }
  for (const a of anexos) {
    const p = path.resolve(base, a.arquivo || '');
    if (vazio(a.arquivo) || !fs.existsSync(p)) {
      problemas.push(`o arquivo do anexo "${a.nome}" não existe (${a.arquivo || 'sem caminho'})`);
      continue;
    }
    const achados = trechosSuspeitos(fs.readFileSync(p, 'utf8'));
    if (!achados.length) continue;
    if (!vazio(a.revisado)) {
      revisados.push(`${a.nome} — revisado: ${a.revisado}`);
      continue;
    }
    for (const x of achados) {
      problemas.push(`${a.nome}:${x.linha} ${x.nome} ("${x.trecho}"): deixe o arquivo em "fora" com o motivo, ou registre "revisado" se uma pessoa leu e não é prazo nem estratégia interna`);
    }
  }
  for (const f of manifesto.fora || []) {
    if (vazio(f.motivo)) problemas.push(`"${f.arquivo}" ficou de fora sem motivo`);
  }
  conferirCampos(manifesto.campos || {}, us, problemas, motivos);
  return { problemas, motivos, revisados, anexos: nomes, fora: manifesto.fora || [] };
}

function relatorio(manifesto, r) {
  const linhas = [];
  const cab = `Publicação de ${manifesto.tipo} "${manifesto.titulo}"`;
  if (r.problemas.length) {
    linhas.push(`${cab}: RECUSADA — ${r.problemas.length} problema(s). Nada foi publicado.`);
    for (const p of r.problemas) linhas.push(`  ✗ ${p}`);
  } else {
    linhas.push(`${cab}: PODE PUBLICAR`);
  }
  if (r.anexos) linhas.push(`Anexos (${r.anexos.length}): ${r.anexos.join(', ') || 'nenhum'}`);
  if (r.revisados.length) {
    linhas.push('Revisados por pessoa:');
    for (const x of r.revisados) linhas.push(`  - ${x}`);
  }
  if (r.fora && r.fora.length) {
    linhas.push('Fora, de propósito:');
    for (const f of r.fora) linhas.push(`  - ${f.arquivo} — ${f.motivo || 'sem motivo'}`);
  }
  if (r.motivos.length) {
    linhas.push('Campos vazios com motivo:');
    for (const m of r.motivos) linhas.push(`  - ${m}`);
  }
  return linhas.join('\n');
}

function main(argv, { projectDir }) {
  const arquivo = argv[0];
  if (!arquivo) return { code: 1, stdout: 'Uso: node .claude/scripts/kanon-publicacao.js <pacote.json>\n' };
  let manifesto;
  try {
    manifesto = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
  } catch (err) {
    return { code: 1, stdout: `Pacote ilegível (${arquivo}): ${err.message}. Nada foi publicado.\n` };
  }
  const r = avaliar(manifesto, path.dirname(path.resolve(arquivo)), projectDir);
  return { code: r.problemas.length ? 1 : 0, stdout: `${relatorio(manifesto, r)}\n` };
}

if (require.main === module) {
  const projectDir = process.env.CLAUDE_PROJECT_DIR || path.join(__dirname, '..', '..');
  const r = main(process.argv.slice(2), { projectDir });
  process.stdout.write(r.stdout);
  process.exit(r.code);
}

module.exports = { main, secoesDoModelo, trechosSuspeitos, PRAZO_ESTRATEGIA };
