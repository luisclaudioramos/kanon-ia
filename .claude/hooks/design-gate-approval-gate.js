#!/usr/bin/env node
// Selo do Design Gate (skills/41-design-gate): bloqueia a materialização dos artefatos
// de Feature Specification (FEATURE.md, PLAN-vx.md, INSTRUCTIONS.md) enquanto o DESIGN.md
// irmão não estiver com Status APPROVED e Aprovado por preenchido por um humano.
// Ver .kanon/skills/41-design-gate/SKILL.md e .kanon/templates/DESIGN.template.md
'use strict';
const fs = require('fs');
const path = require('path');
const { isApproved } = require('./lib/design');

const GATED_BASENAMES = new Set(['FEATURE.md', 'INSTRUCTIONS.md']);
const GATED_PATTERN = /^PLAN-v.*\.md$/i;

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

function isGated(filePath) {
  const base = path.basename(filePath || '');
  return GATED_BASENAMES.has(base) || GATED_PATTERN.test(base);
}

let raw = '';
process.stdin.on('data', (d) => (raw += d));
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    const toolInput = input.tool_input || {};
    const filePath = toolInput.file_path || '';

    if (!isGated(filePath)) return allow();

    const designMdPath = path.join(path.dirname(filePath), 'DESIGN.md');
    if (!fs.existsSync(designMdPath)) {
      return deny(
        `design-gate-approval-gate: bloqueado escrever ${path.basename(filePath)} sem um DESIGN.md aprovado na mesma pasta. Rode skills/41-design-gate primeiro (ver .kanon/templates/DESIGN.template.md).`
      );
    }

    const designMdContent = fs.readFileSync(designMdPath, 'utf8');
    if (!isApproved(designMdContent)) {
      return deny(
        `design-gate-approval-gate: ${designMdPath} existe mas não está com Status APPROVED e Aprovado por preenchido por um humano. Feature Specification (skills 01-03) fica bloqueada até o Design Gate ser aprovado.`
      );
    }

    allow();
  } catch (err) {
    deny(`design-gate-approval-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/design-gate-approval-gate.js ou aprove manualmente se a ação for legítima.`);
  }
});
