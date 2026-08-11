#!/usr/bin/env node
// Garante que todo fan-out (tool Agent) tenha description e instrução mínima,
// evitando subagentes despachados sem cobertura de selos ("execuções órfãs").
// Ver process/04-handoff-protocol.md e process/08-model-orchestration.md
'use strict';

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
    const toolInput = input.tool_input || {};
    const prompt = (toolInput.prompt || '').trim();
    const description = (toolInput.description || '').trim();

    if (!description) {
      return deny('seal-routing-gate: subagente disparado sem "description" — obrigatório para rastreabilidade do fan-out.');
    }
    if (prompt.length < 20) {
      return deny('seal-routing-gate: prompt do subagente é curto demais para conter instrução real (risco de execução órfã). Detalhe a tarefa.');
    }
    allow();
  } catch (err) {
    deny(`seal-routing-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/seal-routing-gate.js ou aprove manualmente se a ação for legítima.`);
  }
});
