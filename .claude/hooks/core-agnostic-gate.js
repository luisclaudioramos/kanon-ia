#!/usr/bin/env node
// Bloqueia hardcode de ambiente (URLs de produção, chaves de API, paths absolutos de usuário)
// em qualquer arquivo criado/editado dentro da raiz .kanon/.
// Exclusão deliberada: .kanon/agents/ e .kanon/templates/ contêm exemplos pedagógicos
// intencionais de "código errado" (ex.: AGENT-SECURITY-ENGINEER.md tem uma chave falsa
// de propósito) — escanear esses exemplos geraria falso positivo a cada edição futura
// desses documentos. Ver .kanon/process/10-core-agnosticism-gate.md.
'use strict';
const path = require('path');

const EXCLUDED_SUBDIRS = ['.kanon/agents', '.kanon/templates'];

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
    const toolInput = input.tool_input || {};
    const filePath = toolInput.file_path || '';
    const rel = path.relative(process.cwd(), filePath).split(path.sep).join('/');
    if (!(rel === '.kanon' || rel.startsWith('.kanon/'))) return allow();
    if (EXCLUDED_SUBDIRS.some((dir) => rel === dir || rel.startsWith(dir + '/'))) return allow();

    const content = toolInput.content || toolInput.new_string || '';
    for (const { name, re } of PATTERNS) {
      const match = content.match(re);
      if (match) {
        return deny(`core-agnostic-gate: hardcode de ambiente detectado (${name}: "${match[0]}") em ${filePath}. Parametrize via variável de ambiente.`);
      }
    }
    allow();
  } catch (err) {
    deny(`core-agnostic-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/core-agnostic-gate.js ou aprove manualmente se a ação for legítima.`);
  }
});
