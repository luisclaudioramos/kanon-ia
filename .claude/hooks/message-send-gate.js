#!/usr/bin/env node
// O kanon rascunha, a pessoa envia (.kanon/skills/52-audience-message, process/17 "Como comunicar"):
// 1. envio direto de mensagem (agora ou agendado) é sempre negado — o caminho é o rascunho;
// 2. rascunho de mensagem e documento compartilhado são negados se o texto tiver dado que nunca
//    sai (documento, telefone, caminho da máquina, segredo); documento compartilhado limpo ainda
//    pede confirmação, porque fica visível assim que é criado.
'use strict';
const { dadosProibidos, textos } = require('./lib/mensagem');

const ENVIO = /(?:^|__)(?:slack_)?(?:send_message|schedule_message|send_email|send_mail|reply_message)$/;
const RASCUNHO = /(?:^|__)(?:slack_)?(?:send_message_draft|create_draft)$/;
const DOCUMENTO = /(?:^|__)(?:slack_)?(?:create_canvas|update_canvas)$/;

function responder(decisao, motivo) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: decisao, permissionDecisionReason: motivo },
    })
  );
  process.exit(0);
}

let raw = '';
process.stdin.on('data', (d) => (raw += d));
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    const nome = input.tool_name || '';
    if (ENVIO.test(nome)) {
      return responder(
        'deny',
        `message-send-gate: o kanon não envia mensagem (${nome}). Crie o rascunho com o texto aprovado e a pessoa envia (skills/52-audience-message).`
      );
    }
    const ehRascunho = RASCUNHO.test(nome);
    const ehDocumento = DOCUMENTO.test(nome);
    if (!ehRascunho && !ehDocumento) process.exit(0);

    const achados = dadosProibidos(textos(input.tool_input || {}).join('\n'));
    if (achados.length) {
      const lista = achados.map((a) => `${a.nome} ("${a.trecho}")`).join('; ');
      return responder(
        'deny',
        `message-send-gate: o texto tem dado que nunca sai — ${lista}. Mascare ou retire e gere o rascunho de novo (reference/comunicacao/01-regras-gerais.md).`
      );
    }
    if (ehDocumento) {
      return responder('ask', `message-send-gate: ${nome} publica o documento assim que é criado; confirme o conteúdo e o destino.`);
    }
    process.exit(0);
  } catch (err) {
    responder(
      'deny',
      `message-send-gate: erro interno no hook (${err.message}) — bloqueado por padrão (fail-closed). Corrija .claude/hooks/message-send-gate.js.`
    );
  }
});
