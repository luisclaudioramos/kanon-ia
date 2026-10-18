#!/usr/bin/env node
// Triagem de bug (skills/32-report-bug, seção "Triagem: é bug de verdade?"): bloqueia a gravação de um
// BUG.md (ou BUG-NN-*.md) novo sem a seção Triagem, ou com as perguntas 1 a 5 sem resposta. A pergunta 6
// (regressão) é opcional. Resposta "não medido" é inconclusivo, não Bug. A pergunta 4 "latente" (Bug latente)
// só vale para item já registrado na ferramenta de trabalho, com o campo **Item de origem** preenchido.
// Bug antigo, já gravado sem a seção, não é cobrado ao ser editado.
// Ver .kanon/skills/32-report-bug/SKILL.md e .kanon/templates/BUG.template.md
'use strict';
const fs = require('fs');
const path = require('path');

const OBRIGATORIAS = [1, 2, 3, 4, 5];

function ehBug(filePath) {
  const base = path.basename(filePath || '');
  if (/\.template\.md$/i.test(base)) return false;
  if (/^BUG-(TASK|INSTRUCTIONS)/i.test(base)) return false;
  return /^BUG(-\d+[^/]*)?\.md$/i.test(base);
}

function temTriagem(texto) {
  return /^## Triagem\s*$/m.test(texto);
}

function temItemDeOrigem(texto) {
  const m = texto.match(/^\*\*Item de origem\*\*:\s*(.*)$/m);
  return Boolean(m && m[1].trim() && !/\[preencher/i.test(m[1]));
}

// Devolve a lista de problemas da seção Triagem; vazia quando está completa.
function problemas(texto) {
  if (!temTriagem(texto)) return ['falta a seção "## Triagem"'];
  const secao = texto.split(/^## Triagem\s*$/m)[1].split(/^## /m)[0];
  const out = [];
  for (const n of OBRIGATORIAS) {
    const linha = secao.split('\n').find((l) => new RegExp(`^\\|\\s*${n}\\s*\\|`).test(l));
    const resposta = linha ? (linha.split('|')[3] || '').trim() : '';
    if (!linha) out.push(`pergunta ${n} sem linha`);
    else if (!resposta || /\[preencher/i.test(resposta)) out.push(`pergunta ${n} sem resposta`);
    else if (/^n[ãa]o medid/i.test(resposta)) out.push(`pergunta ${n} não medida (inconclusivo, não Bug)`);
    else if (n === 4 && /^latente\b/i.test(resposta) && !temItemDeOrigem(texto)) {
      out.push('Bug latente sem o item de origem (só vale para item já registrado na ferramenta de trabalho)');
    }
  }
  return out;
}

function conteudoFinal(input, atual) {
  const t = input.tool_input || {};
  if (input.tool_name === 'Write') return t.content || '';
  if (atual === null) return t.new_string || '';
  if (t.replace_all) return atual.split(t.old_string).join(t.new_string);
  return atual.replace(t.old_string, () => t.new_string);
}

function responder(decisao, motivo) {
  if (decisao === 'allow') process.exit(0);
  process.stdout.write(
    JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: motivo } })
  );
  process.exit(0);
}

let raw = '';
process.stdin.on('data', (d) => (raw += d));
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    const filePath = (input.tool_input || {}).file_path || '';
    if (!ehBug(filePath)) return responder('allow');
    const atual = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null;
    if (atual !== null && !temTriagem(atual)) return responder('allow');
    const lista = problemas(conteudoFinal(input, atual));
    if (!lista.length) return responder('allow');
    responder(
      'deny',
      `bug-triage-gate: ${path.basename(filePath)} sem a triagem completa (${lista.join('; ')}). Responda as perguntas 1 a 5 da seção Triagem com a evidência (skills/32-report-bug, "Triagem: é bug de verdade?"; modelo em .kanon/templates/BUG.template.md). Se a triagem não terminou em Bug, não crie o BUG.md: reporte o resultado. Bug latente só para item já registrado, com **Item de origem**.`
    );
  } catch (err) {
    responder('deny', `bug-triage-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/bug-triage-gate.js.`);
  }
});
