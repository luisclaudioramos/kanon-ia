#!/usr/bin/env node
// Selo I em todo arquivo criado/editado dentro de .kanon/:
// 1. hardcode de ambiente (URL de produção, chave, path absoluto de usuário, segredo) — fora
//    de .kanon/agents/ e .kanon/templates/, que têm exemplos pedagógicos de "código errado";
// 2. nome próprio de empresa, área, equipe, pessoa ou canal (nomes dos perfis conhecidos) e
//    nome de ferramenta com adaptador em .claude/integrations/ — em todo .kanon/.
// Ver .kanon/process/10-core-agnosticism-gate.md e .kanon/process/17-company-profile.md.
'use strict';
const path = require('path');
const { nomesReservados, nomesDeFerramentas, regexDeNome } = require('./lib/perfil');

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
    const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const filePath = toolInput.file_path || '';
    const rel = path.relative(projectDir, filePath).split(path.sep).join('/');
    if (!(rel === '.kanon' || rel.startsWith('.kanon/'))) return allow();

    const content = toolInput.content || toolInput.new_string || '';
    if (!EXCLUDED_SUBDIRS.some((dir) => rel === dir || rel.startsWith(dir + '/'))) {
      for (const { name, re } of PATTERNS) {
        const match = content.match(re);
        if (match) {
          return deny(`core-agnostic-gate: hardcode de ambiente detectado (${name}: "${match[0]}") em ${filePath}. Parametrize via variável de ambiente.`);
        }
      }
    }
    for (const nome of [...nomesReservados(projectDir), ...nomesDeFerramentas(projectDir)]) {
      if (regexDeNome(nome).test(content)) {
        return deny(`core-agnostic-gate: "${nome}" é nome de empresa, pessoa, canal ou ferramenta e não pode aparecer em ${rel}. Fale em capacidade ou papel (process/17-company-profile.md).`);
      }
    }
    allow();
  } catch (err) {
    if (String(err.message).startsWith('perfil ilegível')) {
      return deny(`core-agnostic-gate: ${err.message}. Fail-closed: corrija esse perfil no repositório de empresas (process/17-company-profile.md, gramática do frontmatter) — o hook está certo.`);
    }
    deny(`core-agnostic-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/core-agnostic-gate.js ou aprove manualmente se a ação for legítima.`);
  }
});
