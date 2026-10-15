# 34 — Pull Request Review

## Propósito
Orquestrar a criação do PR no repositório, preencher a descrição com links para os artefatos (US, Tasks, Test Cases), solicitar revisores e gerenciar o fluxo de votos. Só libera o merge quando as aprovações exigidas pela trava 8 de `process/15-pull-request-gates.md` estão presentes e o Quality Gate está aprovado.

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação. Roda após [`13-code-review`](../13-code-review/SKILL.md) e [`14-qa-validation`](../14-qa-validation/SKILL.md).

## Entradas
- Código desenvolvido e testado, achados de `13-code-review`.

## Saídas
- PR criado/atualizado, com revisores solicitados e status de votos.
- Notificação do PR pela capacidade `comunicacao`, no canal que o perfil registra para "aprovação de PR", registrada em `APPROVAL-NOTIFICATION-SUMMARY.md`.

## Regras principais
- Solicita [`agents/AGENT-CODE-REVIEWER.md`](../../agents/AGENT-CODE-REVIEWER.md) e revisores humanos.
- Nas PRs que o próprio kanon cria, a descrição segue [`templates/PR-DESCRIPTION.template.md`](../../templates/PR-DESCRIPTION.template.md), preenchida por `12-development-execution`. A PR **não é aberta** enquanto houver trava 🔴 de [`process/15-pull-request-gates.md`](../../process/15-pull-request-gates.md) pendente, exceto a trava 8, conferida no merge pelos votos da PR (não na abertura), e a trava 11 com relatório de lacunas do ciclo adversarial (ver "Procedimento em caso de falha" de `process/15`), que segue para decisão do revisor humano.
- Na PR que o kanon cria para uma US com telas, a seção **Validação de tela** do `PR-DESCRIPTION` é preenchida a partir de `telas/SCREEN-VALIDATION.md` (`skills/48-screen-validation`). Tela não aprovada não impede abrir nem mergear a PR — a trava 12 é alerta —, mas fica visível na descrição com o estado da tela.
- Na PR que o kanon cria e que mexe em interface, a seção **Fundamentos de design** do `PR-DESCRIPTION` é preenchida a partir do perfil de design e de `process/16-design-foundations.md`. Regra 🔴 pendente impede abrir a PR, como as demais travas 🔴.
- O merge só é liberado com as aprovações de colegas exigidas pela trava 8 de `process/15`. O voto do autor não conta. O kanon continua sem votar por conta própria, salvo pedido explícito do revisor humano.
- Cada voto segue o formato de [`process/07-return-envelope.md`](../../process/07-return-envelope.md).
- Merge só é liberado com as aprovações da trava 8 de `process/15` **e** [`11-quality-gate`](../11-quality-gate/SKILL.md) aprovado — sem exceção "só dessa vez" (base: `reference/boas-praticas-dev/10-ci-cd-deploy.md`).
- PR é **mandatório** para uma Feature alcançar `done` — exige acesso funcional ao repositório remoto (pelo adaptador da capacidade `repositorio` do perfil) como pré-requisito, regido por [`process/13-external-integration-prerequisite.md`](../../process/13-external-integration-prerequisite.md).
- A revisão de `13-code-review` que alimenta este PR segue [`process/14-decision-segregation.md`](../../process/14-decision-segregation.md) — quem implementou não é quem aprova o próprio código.

### Publicação dos comentários de revisão no PR
- O texto vem pronto de `13-code-review`, no formato de [`templates/PR-REVIEW-ROUND.template.md`](../../templates/PR-REVIEW-ROUND.template.md). Esta skill **não reescreve** o conteúdo; ela publica o que o revisor humano aprovou.
- **Rascunho → revisão humana → publicação, nesta ordem, sempre.** O rascunho completo é apresentado ao revisor humano (no chat e no arquivo), que aprova, edita ou corta itens. Nada é publicado antes dessa aprovação explícita — vale mesmo com o padrão já estabelecido.
- Publicação pela conta do revisor humano, via a integração configurada (`process/13-external-integration-prerequisite.md`): o parecer da rodada como comentário na conversa da PR, uma thread por achado 🔴/🟠 e a thread consolidada `QLD-01`, cada thread ancorada em `arquivo:linha` da **última iteração** do PR. Antes de publicar, um dry-run confere quantidade de threads, âncoras e tamanho de cada texto. Na rodada seguinte, a resposta vai na própria thread (aceito, recusado ou reaberto) e o parecer novo é outro comentário na conversa.
- **Sem voto** (aprovar / aguardando autor / rejeitar) salvo pedido explícito do revisor humano. Comentar e votar são decisões separadas. Quando o voto vai, o corpo é o da seção "Voto" do rascunho: uma a três linhas que apontam para o parecer.
- Depois de publicar, os ids das threads e a data voltam para o cabeçalho do rascunho, que muda de `RASCUNHO` para `PUBLICADO`. É esse arquivo que a próxima rodada de revisão compara com a nova iteração do PR.
- Comentário de PR não renderiza Mermaid; diagramas vão em texto, dentro de cerca de código.
- **Depois do merge**: quando o merge é o próprio deploy ou abre a mudança automaticamente (o perfil diz em quais repositórios), a skill acompanha os passos do deploy, e não só o resultado final, e a validação no ambiente listada na seção "Depois do merge" do parecer; o resultado vai como resposta no parecer da última rodada, depois da revisão humana.

### Notificação de aprovação
- A cada PR criado ou atualizado, a skill prepara uma mensagem individual (uma por PR, nunca uma lista de vários PRs) para o canal e no formato que o perfil efetivo registra para "aprovação de PR" (`process/17-company-profile.md`), e segue a regra de envio do perfil ("quem envia"). Sem regra no perfil, só rascunho, enviado depois de confirmação explícita do usuário — postar num canal do time nunca é automático.
- O estado PR ↔ mensagem fica em `APPROVAL-NOTIFICATION-SUMMARY.md` (template `templates/APPROVAL-NOTIFICATION-SUMMARY.template.md`).
- **Nunca cria uma segunda mensagem de topo para o mesmo PR.** Como atualizar uma mensagem existente depende da ferramenta e está no adaptador da capacidade `comunicacao`.
- A sincronização com os votos e comentários da PR **não roda automaticamente nem em agenda** — só quando o usuário aciona a checagem.
- Análise de sobreposição de arquivos entre PRs abertos (ordem de aprovação sugerida) só roda sob pedido explícito; o resultado vai para a seção "Ordem de aprovação sugerida" do resumo e como resposta em texto no(s) PR(s) afetado(s), nunca como numeração por ícone.
- Aprovação ou voto vindo de quem não está no perfil vira `51-company-profile propor`, além de ser registrado normalmente.

## Depende de
- `agents/AGENT-CODE-REVIEWER.md`, `process/07-return-envelope.md`, `11-quality-gate`, `13-code-review`, `process/13-external-integration-prerequisite.md`, `process/14-decision-segregation.md`, `process/15-pull-request-gates.md`, `templates/PR-REVIEW-ROUND.template.md`, `templates/PR-DESCRIPTION.template.md`, `templates/APPROVAL-NOTIFICATION-SUMMARY.template.md`, `process/17-company-profile.md`.

## Procedimento em caso de falha
Enquanto houver voto pendente ou o Quality Gate não estiver aprovado, o PR permanece bloqueado para merge — a skill nunca libera por pressão de prazo. Se o acesso ao repositório remoto não estiver configurado, segue `process/13`: orienta a configuração do MCP/CLI e só aceita prosseguir sem PR com exceção explícita e registrada. Se a capacidade `comunicacao` não estiver disponível ou configurada, a notificação fica pendente e é registrada como falha de sincronização em `APPROVAL-NOTIFICATION-SUMMARY.md` — nunca é tratada como enviada silenciosamente, mas também não bloqueia o PR em si (a notificação não é pré-requisito para `done`, diferente do PR real).
