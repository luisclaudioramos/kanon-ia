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
