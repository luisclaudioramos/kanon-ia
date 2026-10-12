#!/usr/bin/env node
// Impede exclusão de branches protegidas, local ou remotamente. A lista vem do perfil da
// empresa (branches.protegidas, process/17-company-profile.md); sem perfil, ou com perfil
// ilegível, vale o padrão main, master, develop, release/*, hotfix/*. Ver process/04-handoff-protocol.md
'use strict';
const { politicaDeBranches } = require('./lib/perfil');

let PROTECTED = [];

function isProtected(branch) {
  return PROTECTED.some((re) => re.test(branch));
}

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
    PROTECTED = politicaDeBranches({
      projectDir: process.env.CLAUDE_PROJECT_DIR || process.cwd(),
      cwd: input.cwd || process.cwd(),
    }).protegidas;
    const command = (input.tool_input && input.tool_input.command) || '';

    let match = command.match(/git\s+branch\s+(?:-D|-d|--delete)\s+(.+)/);
    if (match) {
      const branches = match[1].trim().split(/\s+/).filter((b) => !b.startsWith('-'));
      const hit = branches.find(isProtected);
      if (hit) return deny(`branch-delete-guard: tentativa de excluir a branch protegida "${hit}" bloqueada.`);
    }

    match = command.match(/git\s+push\s+\S+\s+(?:--delete\s+(\S+)|:(\S+))/);
    if (match) {
      const branch = match[1] || match[2];
      if (branch && isProtected(branch)) {
        return deny(`branch-delete-guard: tentativa de excluir remotamente a branch protegida "${branch}" bloqueada.`);
      }
    }

    allow();
  } catch (err) {
    deny(`branch-delete-guard: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/branch-delete-guard.js ou aprove manualmente se a ação for legítima.`);
  }
});
