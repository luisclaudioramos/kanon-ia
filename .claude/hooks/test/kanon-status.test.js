'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { main, avaliarFeature, MARCOS } = require('../../scripts/kanon-status');

const APROVADO = '**Versão**: v1 · **Status**: `APPROVED`\n**Aprovado por**: Fulana · **Data**: 2026-10-01\n';
const RASCUNHO = '**Versão**: v1 · **Status**: `DRAFT`\n**Aprovado por**: _[preencher: nome]_\n';

function arvore(arquivos) {
  const raiz = fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-status-'));
  const empresas = path.join(raiz, 'empresas');
  const equipe = path.join(empresas, 'acme', 'vendas', 'azul');
  for (const [rel, conteudo] of Object.entries(arquivos)) {
    const f = path.join(equipe, rel);
    if (rel.endsWith('/')) {
      fs.mkdirSync(f, { recursive: true });
    } else {
      fs.mkdirSync(path.dirname(f), { recursive: true });
      fs.writeFileSync(f, conteudo);
    }
  }
  const dir = path.join(raiz, 'kanon');
  fs.mkdirSync(path.join(dir, '.claude'), { recursive: true });
  fs.writeFileSync(path.join(dir, '.claude', 'kanon.local.json'), JSON.stringify({ empresas, contexto: 'acme/vendas/azul' }));
  return { dir, equipe };
}

function rodar(dir, ...argv) {
  return main(argv, { projectDir: dir, cwd: dir });
}

const indice = (...estados) =>
  `# Validação de telas\n\n## Índice\n\n| Tela | US | Versão vigente | Estado | Versão aprovada | PO | Negócio |\n|---|---|---|---|---|---|---|\n${estados
    .map((e, i) => `| 0${i + 1}-tela | US-01 | v1 | \`${e}\` | v1 | ✓ | ✓ |`)
    .join('\n')}\n\n## Fontes\n\n| Tela | x |\n|---|---|\n| 01-tela | \`enviada\` |\n`;
const TELAS_APROVADAS = indice('aprovada', 'aprovada com ressalvas');

const ESPEC = {
  'p/feature/f/REQUIREMENT-SUMMARY.md': 'x',
  'p/feature/f/DESIGN.md': APROVADO,
  'p/feature/f/FEATURE.md': 'x',
  'p/feature/f/PLAN-v1.md': 'x',
  'p/feature/f/INSTRUCTIONS.md': 'x',
};

test('feature com especificação pronta: etapa 3 e próximo é a arquitetura', () => {
  const { dir } = arvore(ESPEC);
  const r = rodar(dir, 'f');
  assert.strictEqual(r.code, 0);
  assert.match(r.stdout, /Etapa: 3\/14 — Especificação/);
  assert.match(r.stdout, /Próximo: \/kanon architecture-assessment/);
  assert.doesNotMatch(r.stdout, /Lacunas/);
  assert.match(r.stdout, /não verificado/);
});

test('cada marco traz embaixo o comando que o gera, já com o nome da feature', () => {
  const { dir } = arvore(ESPEC);
  const r = rodar(dir, 'f');
  assert.match(r.stdout, /\[x\]  5 TCO preliminar|\[ \]  5 TCO preliminar/);
  assert.match(r.stdout, /TCO\.md\n {9}\/kanon cost-of-ownership-tco f\n/);
  assert.match(r.stdout, /user-stories\/\n {9}\/kanon refine-user-stories f\n {9}\/kanon create-user-story-artifacts f\n/);
  assert.match(r.stdout, /tasks\/\n {9}\/kanon refine-tasks f\n {9}\/kanon create-task-artifacts f\n/);
  assert.match(r.stdout, /\n {9}\/kanon code-review f\n {9}\/kanon pull-request-review f\n/);
  assert.match(r.stdout, /\n {9}\/kanon test-report f\n {9}\/kanon quality-gate f\n/);
});

test('todo comando dos marcos tem pasta em .kanon/skills', () => {
  const skills = fs.readdirSync(path.join(__dirname, '..', '..', '..', '.kanon', 'skills')).map((n) => n.replace(/^\d+-/, ''));
  for (const m of MARCOS) {
    assert.ok(m.comandos.length > 0, m.nome);
    for (const c of m.comandos) assert.ok(skills.includes(c), `${m.nome}: ${c}`);
  }
});

test('DESIGN.md em rascunho: etapa 1 e próximo é a aprovação humana', () => {
  const { dir } = arvore({ 'f/REQUIREMENT-SUMMARY.md': 'x', 'f/DESIGN.md': RASCUNHO });
  const r = rodar(dir, 'f');
  assert.match(r.stdout, /Etapa: 1\/14 — Requisito/);
  assert.match(r.stdout, /aguardando aprovação humana/);
});

test('marco posterior sem o anterior vira lacuna, não etapa', () => {
  const { dir } = arvore({ ...ESPEC, 'p/feature/f/MEMORY.md': 'x', 'p/feature/f/tasks/': '' });
  const r = rodar(dir, 'f');
  assert.match(r.stdout, /Etapa: 3\/14/);
  assert.match(r.stdout, /Lacunas: TCO preliminar, User Stories, Validação de telas, Casos de teste.*Runbook, Auditoria \(/);
  assert.doesNotMatch(r.stdout, /Lacunas: .*(Arquitetura|Tasks|Memória)/);
});

test('reconhece variações de nome dos artefatos', () => {
  const { equipe } = arvore({
    ...ESPEC,
    'p/feature/f/reports/architecture-assessment.md': 'x',
    'p/feature/f/TCO.md': 'x',
    'p/feature/f/US-01-algo.md': 'x',
    'p/feature/f/telas/SCREEN-VALIDATION.md': TELAS_APROVADAS,
    'p/feature/f/TASK-01.md': 'x',
    'p/feature/f/test-cases/': '',
    'p/feature/f/REVIEW-PR-123.md': 'x',
    'p/feature/f/quality-gate-feature.md': 'x',
    'p/feature/f/RUNBOOK.md': 'x',
    'p/feature/f/AUDIT-EVIDENCE.md': 'x',
    'p/feature/f/MEMORY.md': 'x',
  });
  const a = avaliarFeature(path.join(equipe, 'p', 'feature', 'f'));
  assert.strictEqual(a.etapa, MARCOS.length);
  assert.deepStrictEqual(a.lacunas, []);
});

test('feature completa: candidata a done, com o aviso do que não foi verificado', () => {
  const todos = { ...ESPEC };
  for (const f of ['ARCHITECTURE.md', 'TCO.md', 'USER-STORY-01.md', 'TASK-01.md', 'TEST-CASE-01.md', 'CODE-REVIEW-REPORT.md', 'TEST-REPORT.md', 'RUNBOOK.md', 'AUDIT-EVIDENCE.md', 'MEMORY.md']) {
    todos[`p/feature/f/${f}`] = 'x';
  }
  todos['p/feature/f/FEATURE.md'] = '**Aprovadores de tela** (`skills/48-screen-validation`): Não se aplica: a Feature não tem interface\n';
  const { dir } = arvore(todos);
  const r = rodar(dir, 'f');
  assert.match(r.stdout, /14\/14/);
  assert.match(r.stdout, /\[-\]  7 Validação de telas .*não se aplica/);
  assert.match(r.stdout, /candidata a done/);
});

test('pasta fora do formato do kanon: próximo é o requirement summary', () => {
  const { dir } = arvore({ 'p/to-be/feature/g/01-as-is.md': 'x' });
  const r = rodar(dir, 'g');
  assert.match(r.stdout, /fora do formato do kanon/);
  assert.match(r.stdout, /Próximo: \/kanon generate-requirement-summary/);
});

test('projeto: uma linha por feature, de feature/, features/ e to-be/feature/', () => {
  const { dir } = arvore({
    ...ESPEC,
    'p/features/h/REQUIREMENT-SUMMARY.md': 'x',
    'p/to-be/feature/g/01-as-is.md': 'x',
    'p/to-be/feature/README.md': 'x',
  });
  const r = rodar(dir, 'p');
  assert.strictEqual(r.code, 0);
  assert.match(r.stdout, /p — projeto com 3 features/);
  assert.match(r.stdout, /f\s+3\/14 Especificação · próximo: architecture-assessment/);
  assert.match(r.stdout, /h\s+1\/14 Requisito · próximo: design-gate/);
  assert.match(r.stdout, /g\s+0\/14 fora do formato · próximo: generate-requirement-summary/);
});

test('nome parcial com uma só correspondência é aceito', () => {
  const { dir } = arvore({ 'p/feature/premio-fixo-x/REQUIREMENT-SUMMARY.md': 'x' });
  assert.match(rodar(dir, 'premio-fixo').stdout, /premio-fixo-x/);
});

test('nome ambíguo lista as candidatas e não escolhe', () => {
  const { dir } = arvore({ 'p/feature/premio-a/x.md': 'x', 'p/feature/premio-b/x.md': 'x' });
  const r = rodar(dir, 'premio');
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /mais de uma pasta/);
  assert.match(r.stdout, /premio-a/);
  assert.match(r.stdout, /premio-b/);
});

test('nome inexistente e falta de nome falham com mensagem clara', () => {
  const { dir } = arvore({ 'p/feature/f/x.md': 'x' });
  assert.match(rodar(dir, 'zzz').stdout, /Nenhuma pasta "zzz"/);
  assert.strictEqual(rodar(dir).code, 1);
});

test('sem contexto ativo pede o contexto', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-status-vazio-'));
  const r = rodar(dir, 'f');
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /\/kanon contexto/);
});

test('validação de telas: marco 7, entre User Stories e Tasks, gerado pela screen-validation', () => {
  const nomes = MARCOS.map((m) => m.nome);
  assert.strictEqual(nomes.indexOf('Validação de telas'), nomes.indexOf('User Stories') + 1);
  const { dir } = arvore({ ...ESPEC, 'p/feature/f/ARCHITECTURE.md': 'x', 'p/feature/f/TCO.md': 'x', 'p/feature/f/user-stories/': '' });
  const r = rodar(dir, 'f');
  assert.match(r.stdout, /Etapa: 6\/14 — User Stories/);
  assert.match(r.stdout, /Próximo: \/kanon screen-validation — falta telas\/SCREEN-VALIDATION\.md/);
  assert.match(r.stdout, /\[ \]  7 Validação de telas .*\n {9}\/kanon screen-validation f\n/);
});

test('validação de telas com tela pendente não fecha o marco e diz quantas faltam', () => {
  const { dir } = arvore({
    ...ESPEC,
    'p/feature/f/ARCHITECTURE.md': 'x',
    'p/feature/f/TCO.md': 'x',
    'p/feature/f/user-stories/': '',
    'p/feature/f/telas/SCREEN-VALIDATION.md': indice('aprovada', 'enviada', 'mudança pedida'),
  });
  const r = rodar(dir, 'f');
  assert.match(r.stdout, /Etapa: 6\/14/);
  assert.match(r.stdout, /Próximo: \/kanon screen-validation — .*\(1 de 3 telas aprovadas\)/);
});

test('validação de telas com todas aprovadas fecha o marco; o índice do template vazio não conta', () => {
  const base = { ...ESPEC, 'p/feature/f/ARCHITECTURE.md': 'x', 'p/feature/f/TCO.md': 'x', 'p/feature/f/user-stories/': '' };
  const ok = arvore({ ...base, 'p/feature/f/telas/SCREEN-VALIDATION.md': TELAS_APROVADAS });
  assert.match(rodar(ok.dir, 'f').stdout, /Etapa: 7\/14 — Validação de telas/);
  const tpl = fs.readFileSync(path.join(__dirname, '..', '..', '..', '.kanon', 'templates', 'SCREEN-VALIDATION.template.md'), 'utf8');
  const vazio = arvore({ ...base, 'p/feature/f/telas/SCREEN-VALIDATION.md': tpl });
  assert.match(rodar(vazio.dir, 'f').stdout, /\(índice sem telas\)/);
});

test('bug é fluxo paralelo: o status mostra o report-bug fora dos marcos, na feature e no projeto', () => {
  const { dir } = arvore({ ...ESPEC, 'p/feature/g/REQUIREMENT-SUMMARY.md': 'x' });
  const f = rodar(dir, 'f');
  assert.match(f.stdout, /Fluxo paralelo \(a qualquer momento\)\n {2}Bug: \/kanon report-bug f <relato do problema>/);
  assert.ok(f.stdout.indexOf('Fluxo paralelo') > f.stdout.indexOf('Marcos'));
  assert.strictEqual(MARCOS.some((m) => m.comandos.includes('report-bug')), false);
  const p = rodar(dir, 'p');
  assert.match(p.stdout, /Bug em qualquer etapa: \/kanon report-bug <feature> <relato do problema>/);
});

test('projeto no layout as-is/execution/to-be: proposta em to-be/proposals/<nome> conta como feature', () => {
  const { dir } = arvore({
    'core/as-is/x.md': 'x',
    'core/execution/progress/y.md': 'x',
    'core/to-be/proposals/piloto/REQUIREMENT-SUMMARY.md': 'x',
    'core/to-be/proposals/piloto/DESIGN.md': RASCUNHO,
  });
  const p = rodar(dir, 'core');
  assert.match(p.stdout, /piloto +1\/14 Requisito · próximo: design-gate \(aguardando aprovação humana\)/);
  const f = rodar(dir, 'piloto');
  assert.match(f.stdout, /Etapa: 1\/14 — Requisito/);
  assert.match(f.stdout, /Próximo: \/kanon design-gate — DESIGN.md existe, aguardando aprovação humana/);
});
