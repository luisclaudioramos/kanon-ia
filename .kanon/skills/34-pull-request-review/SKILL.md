# 34 — Pull Request Review

## Propósito
Orquestrar a criação do PR no repositório, preencher a descrição com links para os artefatos (US, Tasks, Test Cases), solicitar revisores e gerenciar o fluxo de votos. Só libera o merge quando todos os votos obrigatórios estão verdes e o Quality Gate está aprovado.

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação. Roda após [`13-code-review`](../13-code-review/SKILL.md) e [`14-qualification`](../14-qa-validation/SKILL.md).

## Entradas
- Código desenvolvido e testado, achados de `13-code-review`.

## Saídas
- PR criado/atualizado, com revisores solicitados e status de votos.

## Regras principais
- Solicita [`agentes-ia/CODE-REVIEWER.md`](../../agents/AGENT-CODE-REVIEWER.md) e revisores humanos.
- Cada voto segue o formato de [`process/07-return-envelope.md`](../../process/07-return-envelope.md).
- Merge só é liberado com todos os votos obrigatórios verdes **e** [`11-quality-gate`](../11-quality-gate/SKILL.md) aprovado — sem exceção "só dessa vez" (base: `boas-praticas-dev/10-ci-cd-deploy.md`).

## Depende de
- `agentes-ia/CODE-REVIEWER.md`, `process/07-return-envelope.md`, `11-quality-gate`.

## Procedimento em caso de falha
Enquanto houver voto pendente ou o Quality Gate não estiver aprovado, o PR permanece bloqueado para merge — a skill nunca libera por pressão de prazo.
