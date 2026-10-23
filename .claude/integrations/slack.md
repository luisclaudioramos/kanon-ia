---
nomes: [Slack, slack_send_message_draft, slack_send_message]
capacidades: [comunicacao]
---
# Slack — adaptador

Atende a capacidade `comunicacao` de [`.kanon/process/17-company-profile.md`](../../.kanon/process/17-company-profile.md). Usado por `skills/34-pull-request-review`, `47-handoff-delivery`, `48-screen-validation`, `51-company-profile` e `52-audience-message`. Canais, formato e quem envia vêm sempre do perfil da empresa.

## Como conectar
MCP do Slack do claude.ai, autenticado com a conta de quem usa o kanon.

## Teste de conexão
`slack_search_channels` encontra o canal que o perfil registra para o assunto.

## Como publicar
### Notificação de aprovação de PR (`skills/34`)
- A cada PR criado ou atualizado, uma mensagem individual (uma por PR, nunca uma lista de vários PRs) no canal que o perfil efetivo registra para *aprovação de PR*, no formato registrado no perfil, enviada **sempre como rascunho** (`slack_send_message_draft`) — só vai ao canal depois de confirmação explícita do usuário, mesmo com o processo já padronizado.
- Depois de enviada, a mensagem recebe a reação inicial 👀 (em análise) e o par `{PR, channel_id, message_ts}` é gravado em `APPROVAL-NOTIFICATION-SUMMARY.md`, que passa a ser o estado de rastreamento PR ↔ mensagem.
- **Nunca cria uma segunda mensagem de topo para o mesmo PR.** "Atualizar" significa trocar a reação de status (👀 → ✅ aprovada, ou 💬 se há comentário novo sem aprovação) e responder em thread (`thread_ts` = message_ts, sem `reply_broadcast`) resumindo o voto ou comentário novo da PR.
- A sincronização com os votos da PR não roda automaticamente nem em agenda — só quando o usuário aciona a checagem.
- Ordem de aprovação sugerida (sob pedido): resposta em thread no(s) PR(s) afetado(s), em texto (ex.: "Aprovar depois do #000 — mesmo `participant.mock.ts`"), nunca como numeração por ícone.

### Rascunhos de handoff (`skills/47`)
`slack_send_message_draft` para os rascunhos — a skill nunca envia.

### Mensagem por público (`skills/52`)
- **Ler antes**: `slack_read_channel` (ou `slack_read_thread` quando a mensagem é resposta) desde o último envio sobre o assunto; a busca (`slack_search_public_and_private`) só para achar a conversa, nunca no lugar da leitura.
- **Rascunho**: `slack_send_message_draft`, com o texto final. Resposta em conversa só com o `thread_ts` lido no formato detalhado.
- O MCP põe sozinho a assinatura de envio pelo Claude: o texto não a repete.

## Caminho alternativo
MCP indisponível ou não configurado: a notificação fica pendente e é registrada como falha de sincronização no resumo — nunca tratada como enviada. Não bloqueia o PR.

## Particularidades
- O MCP não edita mensagem: atualizar = trocar reação + responder em thread.
- O MCP não anexa arquivo: rascunho com o texto, e a pessoa anexa o arquivo antes de enviar.
- `thread_ts` só se lido no formato detalhado da mensagem; nunca texto provisório na primeira chamada.
