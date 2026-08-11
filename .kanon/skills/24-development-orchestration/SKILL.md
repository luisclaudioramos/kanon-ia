# 24 — Development Orchestration (Tech Lead)

## Propósito
Gerenciar o fan-out massivo (até 12 engenheiros em paralelo), distribuir as Tasks, resolver conflitos de arquivo e monitorar o progresso geral da Feature. É o "maestro" da implementação.

## Fase / Posição no fluxo
Fase 4 — Desenvolvimento e Testes. Coordena múltiplas execuções de [`12-development-execution`](../12-development-execution/SKILL.md) em paralelo.

## Entradas
- Conjunto de Tasks prontas para implementação (skill 08).

## Saídas
- Tasks distribuídas entre engenheiros, conflitos de arquivo resolvidos, progresso consolidado.

## Regras principais
- Autoridade de disparar fan-out é do [`agentes-ia/TECH-LEAD.md`](../../agents/AGENT-TECH-LEAD.md), conforme [`process/04-handoff-protocol.md`](../../process/04-handoff-protocol.md).
- Cada subagente do fan-out roda no tier de modelo exigido por sua tarefa (ver [`process/08-model-orchestration.md`](../../process/08-model-orchestration.md)).
- Conflitos entre engenheiros (ex.: dois tocando o mesmo arquivo) são resolvidos pelo TECH-LEAD, nunca por quem "terminar primeiro".

## Depende de
- `agentes-ia/TECH-LEAD.md`, `process/04-handoff-protocol.md`, `process/08-model-orchestration.md`.

## Procedimento em caso de falha
Um conflito de arquivo ou uma divergência entre engenheiros que não se resolve automaticamente é escalado para decisão humana, seguindo o mesmo procedimento de falha de `process/08-model-orchestration.md`.
