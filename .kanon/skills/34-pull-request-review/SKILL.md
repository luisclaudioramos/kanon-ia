# 34 — Pull Request Review

## Propósito
Orquestrar a criação do PR no repositório, preencher a descrição com links para os artefatos (US, Tasks, Test Cases), solicitar revisores e gerenciar o fluxo de votos. Só libera o merge quando todos os votos obrigatórios estão verdes e o Quality Gate está aprovado.

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação. Roda após [`13-code-review`](../13-code-review/SKILL.md) e [`14-qa-validation`](../14-qa-validation/SKILL.md).

## Entradas
- Código desenvolvido e testado, achados de `13-code-review`.

## Saídas
- PR criado/atualizado, com revisores solicitados e status de votos.
- Notificação do PR postada no canal Slack `#aprovacao-de-pr`, registrada em `SLACK-APPROVAL-SUMMARY.md`.

## Regras principais
- Solicita [`agents/AGENT-CODE-REVIEWER.md`](../../agents/AGENT-CODE-REVIEWER.md) e revisores humanos.
- Cada voto segue o formato de [`process/07-return-envelope.md`](../../process/07-return-envelope.md).
- Merge só é liberado com todos os votos obrigatórios verdes **e** [`11-quality-gate`](../11-quality-gate/SKILL.md) aprovado — sem exceção "só dessa vez" (base: `reference/boas-praticas-dev/10-ci-cd-deploy.md`).
- PR é **mandatório** para uma Feature alcançar `done` — exige acesso funcional ao repositório remoto (MCP de git/DevOps, ou CLI autenticado como `gh`/`az repos`) como pré-requisito, regido por [`process/13-external-integration-prerequisite.md`](../../process/13-external-integration-prerequisite.md).
- A revisão de `13-code-review` que alimenta este PR segue [`process/14-decision-segregation.md`](../../process/14-decision-segregation.md) — quem implementou não é quem aprova o próprio código.

### Notificação de aprovação no Slack
- A cada PR criado/atualizado, a skill prepara uma mensagem individual (uma por PR, nunca uma lista batida de vários PRs) para o canal fixo `#aprovacao-de-pr`, com título, branch de origem → destino e link, e a envia **sempre como rascunho** (`slack_send_message_draft`) — só vai ao canal depois de confirmação explícita do usuário. Isso vale mesmo com o processo já padronizado: postar num canal do time nunca é automático.
- Depois de enviada, a mensagem recebe a reação inicial 👀 (em análise) e o par `{PR, channel_id, message_ts}` é gravado em `SLACK-APPROVAL-SUMMARY.md` (template em `templates/SLACK-APPROVAL-SUMMARY.template.md`), que passa a ser o estado de rastreamento PR ↔ mensagem.
- **Nunca cria uma segunda mensagem de topo para o mesmo PR.** Como o MCP do Slack disponível não tem edição de mensagem, "atualizar" significa: trocar a reação de status (👀 → ✅ aprovada, ou 💬 se há comentário novo sem aprovação) e responder em thread (`thread_ts` = message_ts, sem `reply_broadcast`) resumindo o voto/comentário novo do ADO.
- A sincronização com o ADO (ler votos/comentários novos e refletir na reação/thread) **não roda automaticamente nem em agenda** — só quando o usuário aciona explicitamente a checagem. Um mecanismo agendado/periódico é trabalho futuro, fora do escopo desta skill hoje.
- Análise de sobreposição de arquivos entre PRs abertos do mesmo repositório (para sugerir ordem de aprovação) também só roda sob pedido explícito do usuário — nunca por padrão. Quando solicitada, o resultado é registrado na seção "Ordem de aprovação sugerida" de `SLACK-APPROVAL-SUMMARY.md` e postado como resposta em thread no(s) PR(s) afetado(s), em texto (ex.: "Aprovar depois do #000 — mesmo `participant.mock.ts`"), nunca como numeração por ícone.
- Canal e formato de mensagem são fixos (`#aprovacao-de-pr`, formato `[projeto] : [branch-origem] para [branch-destino] [link]` já documentado no Purpose do canal) — não configuráveis por projeto nesta versão.

## Depende de
- `agents/AGENT-CODE-REVIEWER.md`, `process/07-return-envelope.md`, `11-quality-gate`, `process/13-external-integration-prerequisite.md`, `process/14-decision-segregation.md`, `templates/SLACK-APPROVAL-SUMMARY.template.md`.

## Procedimento em caso de falha
Enquanto houver voto pendente ou o Quality Gate não estiver aprovado, o PR permanece bloqueado para merge — a skill nunca libera por pressão de prazo. Se o acesso ao repositório remoto não estiver configurado, segue `process/13`: orienta a configuração do MCP/CLI e só aceita prosseguir sem PR com exceção explícita e registrada. Se o MCP do Slack não estiver disponível/configurado, a notificação fica pendente e é registrada como falha de sincronização em `SLACK-APPROVAL-SUMMARY.md` — nunca é tratada como enviada silenciosamente, mas também não bloqueia o PR em si (a notificação no Slack não é pré-requisito para `done`, diferente do PR real).
