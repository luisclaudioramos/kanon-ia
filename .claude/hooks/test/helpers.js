'use strict';
const { spawnSync } = require('child_process');
const path = require('path');

function rodarHook(nome, input, { cwd, projectDir }) {
  const r = spawnSync('node', [path.join(__dirname, '..', `${nome}.js`)], {
    input: JSON.stringify(input),
    cwd,
    env: { ...process.env, CLAUDE_PROJECT_DIR: projectDir || cwd },
    encoding: 'utf8',
  });
  if (r.status !== 0) throw new Error(`hook ${nome} saiu com ${r.status}: ${r.stderr}`);
  if (!r.stdout.trim()) return { decisao: 'allow', motivo: '' };
  const out = JSON.parse(r.stdout).hookSpecificOutput;
  return { decisao: out.permissionDecision, motivo: out.permissionDecisionReason };
}

module.exports = { rodarHook };
