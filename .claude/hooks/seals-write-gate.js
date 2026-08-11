#!/usr/bin/env node
// Bloqueia escrita em seals.manifest.json a menos que autorizada explicitamente
// (marcador .kanon/.seals-write-authorized, criado conscientemente via skills/38-create-template
// ou manualmente por um humano — e removido depois de usar).
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
    const toolInput = input.tool_input || {};
    const filePath = toolInput.file_path || '';
    if (path.basename(filePath) !== 'seals.manifest.json') return allow();

    const marker = path.join(process.cwd(), '.kanon', '.seals-write-authorized');
    if (fs.existsSync(marker)) return allow();

    deny(
      'seals-write-gate: escrita em seals.manifest.json requer autorização explícita. Crie .kanon/.seals-write-authorized (via skills/38-create-template.md ou manualmente) antes de editar, e remova o marcador depois.'
    );
  } catch (err) {
    deny(`seals-write-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/seals-write-gate.js ou aprove manualmente se a ação for legítima.`);
  }
});
