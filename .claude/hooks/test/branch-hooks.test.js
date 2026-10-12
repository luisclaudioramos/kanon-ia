'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');
const { rodarHook } = require('./helpers');

function repo(branch) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-branch-'));
  execSync(`git init -q -b ${branch}`, { cwd: dir });
  return dir;
}
function bash(command) {
  return { tool_name: 'Bash', tool_input: { command } };
}

test('sem perfil: develop é protegida', () => {
  const dir = repo('main');
  assert.strictEqual(rodarHook('branch-delete-guard', bash('git branch -D develop'), { cwd: dir }).decisao, 'deny');
  assert.strictEqual(rodarHook('branch-delete-guard', bash('git push origin --delete hotfix/x'), { cwd: dir }).decisao, 'deny');
  assert.strictEqual(rodarHook('branch-delete-guard', bash('git branch -D feature/x'), { cwd: dir }).decisao, 'allow');
});

test('sem perfil: merge em develop exige --squash', () => {
  const dir = repo('develop');
  assert.strictEqual(rodarHook('develop-merge-squash-gate', bash('git merge feature/x'), { cwd: dir }).decisao, 'deny');
  assert.strictEqual(rodarHook('develop-merge-squash-gate', bash('git merge --squash feature/x'), { cwd: dir }).decisao, 'allow');
});

function comPerfil(branch, frontmatter) {
  const dir = repo(branch);
  fs.mkdirSync(path.join(dir, 'kanon'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'kanon', 'perfil.md'), `---\n${frontmatter}\n---\n`);
  return dir;
}

test('com perfil trunk-based: develop deixa de ser protegida, trunk passa a ser', () => {
  const dir = comPerfil('main', 'nome: Acme\nbranches:\n  protegidas: [main, trunk]\n  integracao: trunk');
  assert.strictEqual(rodarHook('branch-delete-guard', bash('git branch -D develop'), { cwd: dir }).decisao, 'allow');
  assert.strictEqual(rodarHook('branch-delete-guard', bash('git branch -D trunk'), { cwd: dir }).decisao, 'deny');
});

test('com perfil: squash exigido na branch de integração do perfil', () => {
  const dir = comPerfil('trunk', 'nome: Acme\nbranches:\n  integracao: trunk');
  assert.strictEqual(rodarHook('develop-merge-squash-gate', bash('git merge feature/x'), { cwd: dir }).decisao, 'deny');
  const dev = comPerfil('develop', 'nome: Acme\nbranches:\n  integracao: trunk');
  assert.strictEqual(rodarHook('develop-merge-squash-gate', bash('git merge feature/x'), { cwd: dev }).decisao, 'allow');
});

test('perfil malformado: volta ao padrão seguro', () => {
  const dir = comPerfil('develop', 'nome: Acme\n\tquebrado');
  assert.strictEqual(rodarHook('branch-delete-guard', bash('git branch -D develop'), { cwd: dir }).decisao, 'deny');
  assert.strictEqual(rodarHook('develop-merge-squash-gate', bash('git merge feature/x'), { cwd: dir }).decisao, 'deny');
});
