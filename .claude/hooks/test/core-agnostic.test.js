'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');
const { rodarHook } = require('./helpers');

function projeto() {
  const raiz = fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-selo-'));
  const empresas = path.join(raiz, 'empresas');
  fs.mkdirSync(path.join(empresas, 'acme', 'kanon'), { recursive: true });
  fs.writeFileSync(
    path.join(empresas, 'acme', 'kanon', 'perfil.md'),
    '---\nnome: Acme\nnomes_reservados: [Fulana Souza, "#aprovacoes-azul"]\n---\n'
  );
  const dir = path.join(raiz, 'kanon');
  fs.mkdirSync(path.join(dir, '.claude', 'integrations'), { recursive: true });
  fs.writeFileSync(path.join(dir, '.claude', 'kanon.local.json'), JSON.stringify({ empresas, contexto: 'acme' }));
  fs.writeFileSync(path.join(dir, '.claude', 'integrations', 'jira.md'), '---\nnomes: [Jira, ADO]\n---\n');
  fs.mkdirSync(path.join(dir, '.kanon', 'skills', 'x'), { recursive: true });
  execSync('git init -q -b main', { cwd: dir });
  return dir;
}
function escrita(dir, rel, content) {
  return { tool_name: 'Write', tool_input: { file_path: path.join(dir, rel), content } };
}

test('barra nome de empresa, pessoa, canal e ferramenta em .kanon/', () => {
  const dir = projeto();
  for (const texto of ['Publicar no Jira.', 'Pedir aceite à Fulana Souza.', 'Avisar em #aprovacoes-azul.', 'ver empresas/acme/x', 'bug no ADO']) {
    const r = rodarHook('core-agnostic-gate', escrita(dir, '.kanon/skills/x/SKILL.md', texto), { cwd: dir });
    assert.strictEqual(r.decisao, 'deny', texto);
  }
});

test('vale também em agents/ e templates/', () => {
  const dir = projeto();
  const r = rodarHook('core-agnostic-gate', escrita(dir, '.kanon/templates/X.template.md', 'Canal: #aprovacoes-azul'), { cwd: dir });
  assert.strictEqual(r.decisao, 'deny');
});

test('deixa passar termos genéricos, identificadores e arquivos fora de .kanon/', () => {
  const dir = projeto();
  for (const texto of ['A empresa aprova pela capacidade comunicacao.', 'campo work_item_ado', 'aprovado pelo PO']) {
    assert.strictEqual(rodarHook('core-agnostic-gate', escrita(dir, '.kanon/skills/x/SKILL.md', texto), { cwd: dir }).decisao, 'allow', texto);
  }
  assert.strictEqual(rodarHook('core-agnostic-gate', escrita(dir, '.claude/integrations/jira.md', 'Jira'), { cwd: dir }).decisao, 'allow');
});

test('commit gate barra nome em linha adicionada de .kanon/', () => {
  const dir = projeto();
  fs.writeFileSync(path.join(dir, '.kanon', 'skills', 'x', 'SKILL.md'), 'Publicar no Jira.\n');
  execSync('git add .kanon', { cwd: dir });
  const r = rodarHook('core-agnostic-commit-gate', { tool_name: 'Bash', tool_input: { command: 'git commit -m x' } }, { cwd: dir });
  assert.strictEqual(r.decisao, 'deny');
});

test('sem contexto nem adaptadores: só os padrões de ambiente', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-selo-vazio-'));
  fs.mkdirSync(path.join(dir, '.kanon'), { recursive: true });
  assert.strictEqual(rodarHook('core-agnostic-gate', escrita(dir, '.kanon/a.md', 'Publicar no Jira.'), { cwd: dir }).decisao, 'allow');
  assert.strictEqual(rodarHook('core-agnostic-gate', escrita(dir, '.kanon/a.md', 'ver /home/fulano/x'), { cwd: dir }).decisao, 'deny');
});
