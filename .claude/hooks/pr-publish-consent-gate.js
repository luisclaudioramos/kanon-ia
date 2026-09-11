#!/usr/bin/env node
// Exige confirmação explícita do usuário (via prompt de permissão nativo do Claude Code)
// antes de publicar um Pull Request. Ver process/04-handoff-protocol.md
'use strict';

let raw = '';
process.stdin.on('data', (d) => (raw += d));
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    const command = (input.tool_input && input.tool_input.command) || '';
    const isPrCreate = /\bgh\s+pr\s+create\b/.test(command) || /\baz\s+repos\s+pr\s+create\b/.test(command);
    if (!isPrCreate) {
      process.exit(0);
      return;
    }

    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'ask',
          permissionDecisionReason: 'pr-publish-consent-gate: publicar um Pull Request requer confirmação explícita do usuário.',
        },
      })
    );
    process.exit(0);
  } catch (err) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: `pr-publish-consent-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/pr-publish-consent-gate.js ou aprove manualmente se a ação for legítima.`,
        },
      })
    );
    process.exit(0);
  }
});
