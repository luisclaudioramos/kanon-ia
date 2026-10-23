'use strict';
const test = require('node:test');
const assert = require('node:assert');
const os = require('os');
const { rodarHook } = require('./helpers');

const cwd = os.tmpdir();
const SLACK = 'mcp__claude_ai_Slack__';
const hook = (tool_name, tool_input = {}) => rodarHook('message-send-gate', { tool_name, tool_input }, { cwd });

test('envio direto é sempre negado, agora ou agendado', () => {
  for (const t of ['slack_send_message', 'slack_schedule_message']) {
    const r = hook(SLACK + t, { channel_id: 'C1', message: 'Pessoal, tudo certo.' });
    assert.strictEqual(r.decisao, 'deny', t);
    assert.match(r.motivo, /rascunho/);
  }
  assert.strictEqual(hook('mcp__gmail__send_email', { body: 'oi' }).decisao, 'deny');
});

test('rascunho limpo passa', () => {
  const r = hook(SLACK + 'slack_send_message_draft', {
    channel_id: 'C1',
    message: 'Os elegíveis de outubro batem com os arquivos: 1.234.567, conferido no banco em 22/10. Ts 1700000000.000000.',
  });
  assert.strictEqual(r.decisao, 'allow');
});

test('rascunho com documento, caminho ou segredo é negado', () => {
  const casos = [
    ['CPF', 'Cliente 123.456.789-09 sem a fase.'],
    ['CNPJ', 'Empresa 12.345.678/0001-90 sem a fase.'],
    ['11 ou 14', 'Cliente 12345678909 sem a fase.'],
    ['caminho absoluto', 'Ver /home/fulano/empresas/relatorio.md'],
    ['token', 'use xoxb-123456789012-abcdefghij'],
    ['credencial', 'password=SuperSecreta123'],
    ['string de conexão', 'mysql://app:s3nh4@10.0.0.1/db'],
  ];
  for (const [nome, message] of casos) {
    const r = hook(SLACK + 'slack_send_message_draft', { channel_id: 'C1', message });
    assert.strictEqual(r.decisao, 'deny', nome);
    assert.ok(r.motivo.includes(nome) || r.motivo.toLowerCase().includes(nome.toLowerCase()), `${nome}: ${r.motivo}`);
  }
});

test('documento compartilhado limpo pede confirmação; com dado proibido é negado', () => {
  assert.strictEqual(hook(SLACK + 'slack_create_canvas', { title: 'Casos', content: '19 casos, massa QA_' }).decisao, 'ask');
  assert.strictEqual(hook(SLACK + 'slack_update_canvas', { content: 'CPF 123.456.789-09' }).decisao, 'deny');
});

test('leitura e busca não passam pela trava', () => {
  for (const t of ['slack_read_channel', 'slack_read_thread', 'slack_search_public_and_private']) {
    assert.strictEqual(hook(SLACK + t, { channel_id: 'C1' }).decisao, 'allow', t);
  }
});
