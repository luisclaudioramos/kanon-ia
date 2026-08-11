#!/usr/bin/env node
// Selo Mestre: bloqueia Write que esvazia (apaga o conteúdo de) um artefato governado já existente.
// Ver process/09-identity-seals-gate.md
'use strict';
const fs = require('fs');
const path = require('path');

// Tudo que vive dentro de .kanon/ (agents/, process/, skills/, templates/, commands/,
// seals.manifest.json) é governado por este selo.
function isGoverned(filePath) {
  if (!filePath) return false;
  const rel = path.relative(process.cwd(), filePath);
  return rel === '.kanon' || rel.startsWith('.kanon' + path.sep);
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
    const toolName = input.tool_name;
    const toolInput = input.tool_input || {};
    const filePath = toolInput.file_path;

    if (toolName === 'Write' && isGoverned(filePath)) {
      const newContent = (toolInput.content || '').trim();
      const existed = filePath && fs.existsSync(filePath);
      const hadContent = existed && fs.readFileSync(filePath, 'utf8').trim().length > 0;
      if (newContent.length === 0 && hadContent) {
        return deny(
          `identity-seals-gate: bloqueado esvaziar um artefato governado existente (${filePath}). Se a intenção é remover o arquivo, use uma exclusão explícita, não um Write vazio.`
        );
      }
    }
    allow();
  } catch (err) {
    deny(`identity-seals-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/identity-seals-gate.js ou aprove manualmente se a ação for legítima.`);
  }
});
