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
  assert.match(r.stdout, /Etapa: 3\/13 — Especificação/);
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
  assert.match(r.stdout, /Etapa: 1\/13 — Requisito/);
  assert.match(r.stdout, /aguardando aprovação humana/);
});

test('marco posterior sem o anterior vira lacuna, não etapa', () => {
  const { dir } = arvore({ ...ESPEC, 'p/feature/f/MEMORY.md': 'x', 'p/feature/f/tasks/': '' });
  const r = rodar(dir, 'f');
  assert.match(r.stdout, /Etapa: 3\/13/);
  assert.match(r.stdout, /Lacunas: TCO preliminar, User Stories, Casos de teste.*Runbook, Auditoria \(/);
  assert.doesNotMatch(r.stdout, /Lacunas: .*(Arquitetura|Tasks|Memória)/);
});

test('reconhece variações de nome dos artefatos', () => {
  const { equipe } = arvore({
    ...ESPEC,
    'p/feature/f/reports/architecture-assessment.md': 'x',
    'p/feature/f/TCO.md': 'x',
    'p/feature/f/US-01-algo.md': 'x',
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
  const { dir } = arvore(todos);
  const r = rodar(dir, 'f');
  assert.match(r.stdout, /13\/13/);
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
  assert.match(r.stdout, /f\s+3\/13 Especificação · próximo: architecture-assessment/);
  assert.match(r.stdout, /h\s+1\/13 Requisito · próximo: design-gate/);
  assert.match(r.stdout, /g\s+0\/13 fora do formato · próximo: generate-requirement-summary/);
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
