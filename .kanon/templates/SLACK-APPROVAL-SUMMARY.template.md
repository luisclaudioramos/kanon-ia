# Slack Approval Summary — _[preencher: nome da Feature/Bug]_

_Gerado e mantido por `skills/34-pull-request-review`. Rastreia a notificação de cada PR no canal fixo `#aprovacao-de-pr` e o estado da sincronização com o Azure DevOps._

## Canal
Fixo: `#aprovacao-de-pr` (`C07Q2SGUQ4R`). Formato de mensagem por PR: título, branch de origem → destino, link — sempre em rascunho (`slack_send_message_draft`), enviado só após confirmação explícita do usuário.

## PRs notificados
| PR (ADO) | Título | Branch | Message TS | Status (reação) | Última sincronização |
|---|---|---|---|---|---|
| _[preencher: #ID]_ | _[preencher]_ | _[preencher: origem → destino]_ | _[preencher: ts da mensagem enviada]_ | 👀 em análise / ✅ aprovada / 💬 com comentários pendentes | _[preencher: data/hora ou "nunca sincronizado"]_ |

## Ordem de aprovação sugerida
_Preenchido apenas quando solicitado explicitamente pelo usuário — não roda automaticamente. Cada linha vira uma resposta em thread (`thread_ts`) no PR afetado, em texto, sem numeração por ícone._

| PR | Depende de (mesmo arquivo) | Arquivo(s) compartilhado(s) |
|---|---|---|
| _[preencher: #ID]_ | _[preencher: #ID ou "nenhum"]_ | _[preencher]_ |

## Falhas de sincronização
| PR | Motivo | Ação |
|---|---|---|
| _[preencher]_ | _[preencher]_ | _[preencher]_ |
