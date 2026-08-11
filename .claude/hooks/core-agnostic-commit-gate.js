#!/usr/bin/env node
// Revalida, no momento do commit, que nenhum arquivo dentro de .kanon/ staged contém
// hardcode de ambiente. Exclui .kanon/agents/ e .kanon/templates/ (exemplos pedagógicos
// intencionais de "código errado" — ver core-agnostic-gate.js e
// .kanon/process/10-core-agnosticism-gate.md).
'use strict';
const { execSync } = require('child_process');

const PATTERNS = [
  { name: 'AWS Access Key', re: /AKIA[0-9A-Z]{16}/ },
  { name: 'URL de produção', re: /https?:\/\/[^\s"'`]*prod[^\s"'`]*/i },
  { name: 'Path absoluto de usuário', re: /\/home\/[a-zA-Z0-9_-]+\/|C:\\Users\\[a-zA-Z0-9_-]+/ },
  { name: 'Segredo hardcoded', re: /(api[_-]?key|secret|password)\s*[:=]\s*["'][A-Za-z0-9\-_]{12,}["']/i },
];

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
    if (!/git\s+commit/.test(command)) return allow();

    let diff;
    try {
      diff = execSync(
        "git diff --cached -- .kanon ':!.kanon/agents' ':!.kanon/templates'",
        { encoding: 'utf8' }
      );
    } catch {
      return allow(); // sem repositório git ou sem .kanon/: nada a checar
    }
    if (!diff.trim()) return allow();

    for (const line of diff.split('\n')) {
      if (!line.startsWith('+') || line.startsWith('+++')) continue;
      for (const { name, re } of PATTERNS) {
        const match = line.match(re);
        if (match) {
          return deny(`core-agnostic-commit-gate: commit bloqueado — hardcode de ambiente (${name}: "${match[0]}") em uma linha adicionada dentro de .kanon/.`);
        }
      }
    }
    allow();
  } catch (err) {
    deny(`core-agnostic-commit-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/core-agnostic-commit-gate.js ou aprove manualmente se a ação for legítima.`);
  }
});
