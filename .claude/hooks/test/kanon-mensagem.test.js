'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { main } = require('../../scripts/kanon-mensagem');

const REPO = path.join(__dirname, '..', '..', '..');

// Projeto sem contexto gravado (o perfil sai da pasta da mensagem), com o .kanon real.
const PROJETO = fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-projeto-'));
fs.symlinkSync(path.join(REPO, '.kanon'), path.join(PROJETO, '.kanon'));

// Pasta com um perfil de equipe próprio, para o validador achar os papéis subindo da pasta.
function pasta() {
  const raiz = fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-mensagem-'));
  fs.mkdirSync(path.join(raiz, 'kanon'));
  fs.writeFileSync(
    path.join(raiz, 'kanon', 'perfil.md'),
    ['---', 'nivel: equipe', 'nome: Equipe X', 'papeis:', '  - papel: Dev back-end', '    pessoa: Fulano Dev', '  - papel: PO', '    pessoa: Ciclana PO', '---', ''].join('\n')
  );
  const item = path.join(raiz, 'item');
  fs.mkdirSync(item);
  return item;
}

function mensagem({ publico = 'Negócio', tipo = 'Fechamento', destino = 'canal do negócio', status = 'rascunho', extra = '', texto } = {}) {
  return [
    '---',
    `publico: ${publico}`,
    `tipo: ${tipo}`,
    `destino: ${destino}`,
    'fontes:',
    '  - banco de produção, 2026-10-22',
    `status: ${status}`,
    extra,
    '---',
    '',
    '# Elegíveis de outubro',
    '',
    '## Lido antes de escrever',
    '',
    'Nada novo desde o último envio.',
    '',
    '## Texto',
    '',
    texto || 'Os elegíveis de outubro batem com os arquivos (7,3 milhões), conferido no banco em 22/10.',
    '',
  ]
    .filter((l) => l !== '')
    .join('\n');
}

function validar(conteudo, nome = 'msg.md') {
  const dir = pasta();
  const f = path.join(dir, nome);
  fs.writeFileSync(f, conteudo);
  return main([f], { projectDir: PROJETO });
}

test('mensagem completa para o negócio passa sem erro', () => {
  const r = validar(mensagem());
  assert.strictEqual(r.code, 0, r.stdout);
  assert.match(r.stdout, /0 erro\(s\)/);
});

test('o template sem preencher não passa', () => {
  const r = main([path.join(REPO, '.kanon', 'templates', 'MENSAGEM.template.md')], { projectDir: PROJETO });
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /público .* fora do catálogo/);
  assert.match(r.stdout, /destino não preenchido/);
});

test('público, tipo e estado fora do catálogo são erro', () => {
  const r = validar(mensagem({ publico: 'Diretoria', tipo: 'Memorando', status: 'pronto' }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /público "Diretoria"/);
  assert.match(r.stdout, /tipo "Memorando"/);
  assert.match(r.stdout, /status "pronto"/);
});

test('aprovado sem data de aprovação é erro', () => {
  const r = validar(mensagem({ status: 'aprovado' }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /sem aprovado_em/);
  assert.strictEqual(validar(mensagem({ status: 'aprovado', extra: 'aprovado_em: 2026-10-23' })).code, 0);
});

test('dado proibido e nome de dev para o negócio são erro; arquivo:linha e prazo são aviso', () => {
  const r = validar(mensagem({ texto: 'O Fulano Dev corrigiu em stage.ts:142 o cliente 123.456.789-09; entregamos até 30/10.' }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /ERRO .*CPF/);
  assert.match(r.stdout, /ERRO .*nome de dev \("Fulano Dev"\)/);
  assert.match(r.stdout, /AVISO .*stage\.ts:142/);
  assert.match(r.stdout, /AVISO .*data limite/);
});

test('para o time técnico, nome de dev e arquivo:linha não são cobrados', () => {
  const r = validar(mensagem({ publico: 'Time técnico', tipo: 'Pergunta', texto: 'Pessoal, o Fulano Dev viu que stage.ts:142 lê só uma tabela?' }));
  assert.strictEqual(r.code, 0, r.stdout);
});

test('abertura que só anuncia e fecho genérico são aviso, para qualquer público (04-escrita-clara.md)', () => {
  const r = validar(
    mensagem({
      publico: 'Time técnico',
      tipo: 'Aviso',
      texto: 'Gostaria de informar que o filtro de fases agora lê as duas tabelas.\nQualquer dúvida, fico à disposição!',
    })
  );
  assert.strictEqual(r.code, 0, r.stdout);
  assert.match(r.stdout, /AVISO .*abertura que só anuncia \("Gostaria de informar"\)/);
  assert.match(r.stdout, /AVISO .*fecho genérico \("Qualquer dúvida"\)/);
});

test('a conclusão na primeira linha e uma oferta específica no fim não geram aviso de escrita', () => {
  const r = validar(
    mensagem({ texto: 'Os elegíveis de outubro batem com os arquivos, conferido no banco em 22/10.\nSe quiserem, mando as consultas para replicar.' })
  );
  assert.strictEqual(r.code, 0, r.stdout);
  assert.doesNotMatch(r.stdout, /abertura que só anuncia|fecho genérico/);
});

test('status para a liderança com a data da estimativa do time passa sem erro (STATUS-REPORT)', () => {
  const r = validar(
    mensagem({
      publico: 'Liderança executiva',
      tipo: 'Status',
      texto: '### Estado: 🟡 Amarelo\nUma decisão de escopo está pendente e ainda não trava a entrega.\n| Revisão de público | 2026-11-26 | Time técnico | estimativa do time de 2026-10-21 |',
    })
  );
  assert.strictEqual(r.code, 0, r.stdout);
});

test('número de impacto sem verificacao no frontmatter é aviso (process/19)', () => {
  const texto = 'Pessoal, 800 desafios caíram de 1 para 0 depois do resgate.';
  const sem = validar(mensagem({ publico: 'Time técnico', tipo: 'Aviso', texto }));
  assert.strictEqual(sem.code, 0, sem.stdout);
  assert.match(sem.stdout, /AVISO .*número de impacto sem `verificacao`/);
  const com = validar(mensagem({ publico: 'Time técnico', tipo: 'Aviso', texto, extra: 'verificacao: triagem/TRIAGEM.md#verificação' }));
  assert.doesNotMatch(com.stdout, /número de impacto/);
});

test('handoff: nome de pessoa e caminho da base são erro', () => {
  const dir = pasta();
  fs.writeFileSync(path.join(dir, 'po.md'), '# Pendências\n\nA Ciclana PO decide. Ver docs/assuntos/x.md\n');
  fs.writeFileSync(path.join(dir, 'dev.md'), '# Contexto\n\nO filtro em stage.ts:142 lê uma tabela.\n');
  const r = main([dir], { projectDir: PROJETO });
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /po\.md: nome de pessoa \("Ciclana PO"\)/);
  assert.match(r.stdout, /po\.md: caminho da base/);
  assert.doesNotMatch(r.stdout, /dev\.md/);
});

test('pasta sem mensagem nem handoff é recusada', () => {
  const dir = pasta();
  fs.writeFileSync(path.join(dir, 'nota.md'), '# nota\n');
  assert.strictEqual(main([dir], { projectDir: PROJETO }).code, 1);
});
