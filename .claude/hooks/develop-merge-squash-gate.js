#!/usr/bin/env node
// Força squash merge ao mesclar uma feature branch em develop, mantendo o histórico
// com um único commit por Feature. Ver boas-praticas-dev/04-controle-de-versao-git.md
'use strict';
const { execSync } = require('child_process');

function allow() {
  process.exit(0);
}

function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: reason,
      },
    })
  );
  process.exit(0);
}

let raw = '';
process.stdin.on('data', (d) => (raw += d));
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    const command = (input.tool_input && input.tool_input.command) || '';
    if (!/git\s+merge\b/.test(command)) return allow();
    if (/--squash\b/.test(command)) return allow();

    let currentBranch = '';
    try {
      currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    } catch {
      return allow();
    }
    if (currentBranch !== 'develop') return allow();

    deny('develop-merge-squash-gate: merge para "develop" precisa usar --squash (histórico limpo, um commit por Feature). Use: git merge --squash <branch>.');
  } catch (err) {
    deny(`develop-merge-squash-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/develop-merge-squash-gate.js ou aprove manualmente se a ação for legítima.`);
  }
});
