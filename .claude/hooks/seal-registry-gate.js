#!/usr/bin/env node
// Valida a integridade do seals.manifest.json sempre que ele for escrito/editado.
// Ver process/09-identity-seals-gate.md
'use strict';
const fs = require('fs');
const path = require('path');

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
    const toolName = input.tool_name;
    const toolInput = input.tool_input || {};
    const filePath = toolInput.file_path || '';
    if (path.basename(filePath) !== 'seals.manifest.json') return allow();

    let resultingContent;
    if (toolName === 'Write') {
      resultingContent = toolInput.content || '';
    } else if (toolName === 'Edit') {
      const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
      resultingContent = current.split(toolInput.old_string || '').join(toolInput.new_string || '');
    } else {
      return allow();
    }

    let parsed;
    try {
      parsed = JSON.parse(resultingContent);
    } catch {
      return deny('seal-registry-gate: seals.manifest.json resultante não é JSON válido.');
    }
    if (!Array.isArray(parsed.seals)) {
      return deny('seal-registry-gate: seals.manifest.json precisa ter uma chave "seals" (array) no nível superior.');
    }
    allow();
  } catch (err) {
    deny(`seal-registry-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/seal-registry-gate.js ou aprove manualmente se a ação for legítima.`);
  }
});
