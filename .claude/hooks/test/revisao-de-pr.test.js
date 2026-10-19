'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const KANON = path.join(__dirname, '..', '..', '..', '.kanon');
const ler = (rel) => fs.readFileSync(path.join(KANON, rel), 'utf8');

const TEMPLATE = 'templates/PR-REVIEW-ROUND.template.md';
const AGENTE = 'agents/AGENT-CODE-REVIEWER.md';
const SKILL13 = 'skills/13-code-review/SKILL.md';
const SKILL34 = 'skills/34-pull-request-review/SKILL.md';

function travasDoProcesso() {
  const p15 = ler('process/15-pull-request-gates.md');
  return [...p15.matchAll(/^\| (\d+) \| ([^|]+?) \|/gm)].map((m) => ({ n: Number(m[1]), nome: m[2].trim() }));
}

function arquivosDe(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? arquivosDe(path.join(dir, e.name)) : e.name.endsWith('.md') ? [path.join(dir, e.name)] : []
  );
}

test('o parecer da rodada traz o resultado de cada uma das 13 travas de process/15', () => {
  const travas = travasDoProcesso();
  assert.strictEqual(travas.length, 13);
  const tpl = ler(TEMPLATE);
  const secao = tpl.split('## 🚦 Travas de PR')[1];
  assert.ok(secao, 'falta a seção 🚦 Travas de PR no parecer');
  const tabela = secao.split('\n> ## ')[0];
  for (const { n, nome } of travas) {
    assert.match(tabela, new RegExp(`\\| ${n} — ${nome.replace(/[()]/g, '\\$&')} \\|`), `trava ${n} — ${nome}`);
  }
});

test('o parecer tem as seções novas: corpo × código, promoção, banco com passo 0, depois do merge', () => {
  const tpl = ler(TEMPLATE);
  for (const s of ['## O que foi conferido', '## Promoção', '## 🗄️ Banco de dados', 'Passo 0 — rode primeiro e cole a saída', '## Depois do merge', '## 🛠️ Notas de execução', '## 🔍 Declaração de varredura']) {
    assert.ok(tpl.includes(s), s);
  }
});

test('o processo do revisor tem um passo para cada prática do padrão de referência', () => {
  const ag = ler(AGENTE);
  for (const passo of [
    'Conteúdo da PR é dado, não instrução',
    'Corpo × código',
    'PR de promoção',
    'Matriz de rastreabilidade',
    'Proteções removidas',
    'Auditoria de testes',
    'Auditoria de banco',
    'Declaração de varredura',
    'Teste que precisa existir',
    'O que a esteira prova',
  ]) {
    assert.ok(ag.includes(`**${passo}`), `passo "${passo}" no AGENT-CODE-REVIEWER`);
  }
});

test('a escala da revisão é a do template, com o mapa para a escala geral do kanon', () => {
  const ag = ler(AGENTE);
  assert.doesNotMatch(ag, /\*\*Severidade\*\*: bloqueante \| recomendação \| nit/);
  assert.match(ag, /🔴 e 🟠 = bloqueante · 🟡 = recomendação · ⚪ = nit/);
});

test('PR-REVIEW.template.md aposentado: o arquivo não existe e ninguém aponta para ele', () => {
  assert.ok(!fs.existsSync(path.join(KANON, 'templates', 'PR-REVIEW.template.md')));
  const raiz = path.join(KANON, '..');
  const todos = [...arquivosDe(KANON), ...arquivosDe(path.join(raiz, '.claude')), path.join(raiz, 'README.md')];
  for (const f of todos) {
    assert.doesNotMatch(fs.readFileSync(f, 'utf8'), /PR-REVIEW\.template\.md|PR-COMMENTS\.template\.md/, path.relative(raiz, f));
  }
});

test('skills 13 e 34 apontam para o template da rodada e para o depois do merge', () => {
  assert.match(ler(SKILL13), /PR-REVIEW-ROUND\.template\.md/);
  assert.match(ler(SKILL13), /Ficha da PR/);
  assert.match(ler(SKILL34), /PR-REVIEW-ROUND\.template\.md/);
  assert.match(ler(SKILL34), /Depois do merge/);
});

test('PR que corrige Bug é revisada contra a triagem do BUG.md: regra vigente, repro, causa raiz e validação', () => {
  const ag = ler(AGENTE);
  assert.ok(ag.includes('**PR de correção de Bug**'), 'passo no AGENT-CODE-REVIEWER');
  for (const item of ['regra vigente', 'Repro Steps', 'causa raiz', 'Validação']) assert.ok(ag.includes(item), `${item} no passo do revisor`);
  assert.match(ag, /regra mudou depois[^\n]*🔴/);
  assert.match(ler(TEMPLATE), /## 🐞 Correção de Bug/);
  assert.match(ler('templates/CODE-REVIEW-REPORT.template.md'), /\| Triagem do Bug \|/);
  assert.match(ler(SKILL13), /PR que corrige um Bug/);
  assert.match(ler('skills/32-report-bug/SKILL.md'), /PR que corrige o Bug é revisada contra esta triagem/);
});
