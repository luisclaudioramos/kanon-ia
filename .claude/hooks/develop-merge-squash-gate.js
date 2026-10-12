#!/usr/bin/env node
// Força squash merge ao mesclar uma feature branch na branch de integração, mantendo o
// histórico com um único commit por Feature. A branch vem do perfil da empresa
// (branches.integracao, process/17-company-profile.md); sem perfil, develop.
// Ver .kanon/reference/boas-praticas-dev/04-controle-de-versao-git.md
'use strict';
const { execSync } = require('child_process');
const { politicaDeBranches } = require('./lib/perfil');

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

    const cwd = input.cwd || process.cwd();
    const { integracao } = politicaDeBranches({
      projectDir: process.env.CLAUDE_PROJECT_DIR || process.cwd(),
      cwd,
    });

    let currentBranch = '';
    try {
      currentBranch = execSync('git branch --show-current', { encoding: 'utf8', cwd }).trim();
    } catch {
      return allow();
    }
    if (currentBranch !== integracao) return allow();

    deny(`develop-merge-squash-gate: merge para "${integracao}" precisa usar --squash (histórico limpo, um commit por Feature). Use: git merge --squash <branch>.`);
  } catch (err) {
    deny(`develop-merge-squash-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/develop-merge-squash-gate.js ou aprove manualmente se a ação for legítima.`);
  }
});
