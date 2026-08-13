# 34 — Pull Request Review

## Propósito
Orquestrar a criação do PR no repositório, preencher a descrição com links para os artefatos (US, Tasks, Test Cases), solicitar revisores e gerenciar o fluxo de votos. Só libera o merge quando todos os votos obrigatórios estão verdes e o Quality Gate está aprovado.

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação. Roda após [`13-code-review`](../13-code-review/SKILL.md) e [`14-qa-validation`](../14-qa-validation/SKILL.md).

## Entradas
- Código desenvolvido e testado, achados de `13-code-review`.

## Saídas
- PR criado/atualizado, com revisores solicitados e status de votos.

## Regras principais
- Solicita [`agents/AGENT-CODE-REVIEWER.md`](../../agents/AGENT-CODE-REVIEWER.md) e revisores humanos.
- Cada voto segue o formato de [`process/07-return-envelope.md`](../../process/07-return-envelope.md).
- Merge só é liberado com todos os votos obrigatórios verdes **e** [`11-quality-gate`](../11-quality-gate/SKILL.md) aprovado — sem exceção "só dessa vez" (base: `reference/boas-praticas-dev/10-ci-cd-deploy.md`).
- PR é **mandatório** para uma Feature alcançar `done` — exige acesso funcional ao repositório remoto (MCP de git/DevOps, ou CLI autenticado como `gh`/`az repos`) como pré-requisito, regido por [`process/13-external-integration-prerequisite.md`](../../process/13-external-integration-prerequisite.md).
- A revisão de `13-code-review` que alimenta este PR segue [`process/14-decision-segregation.md`](../../process/14-decision-segregation.md) — quem implementou não é quem aprova o próprio código.

## Depende de
- `agents/AGENT-CODE-REVIEWER.md`, `process/07-return-envelope.md`, `11-quality-gate`, `process/13-external-integration-prerequisite.md`, `process/14-decision-segregation.md`.

## Procedimento em caso de falha
Enquanto houver voto pendente ou o Quality Gate não estiver aprovado, o PR permanece bloqueado para merge — a skill nunca libera por pressão de prazo. Se o acesso ao repositório remoto não estiver configurado, segue `process/13`: orienta a configuração do MCP/CLI e só aceita prosseguir sem PR com exceção explícita e registrada.
