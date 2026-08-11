# 12 — Development Execution (Agente Engenheiro)

## Propósito
Acionar o agente especializado (Backend, Frontend ou Data) para implementar uma Task específica, seguindo rigorosamente as instruções do `TASK.md` e os padrões de estilo do projeto.

## Fase / Posição no fluxo
Fase 4 — Desenvolvimento e Testes. Roda após [`08-create-task-artifacts`](../08-create-task-artifacts/SKILL.md) e é o que [`24-development-orchestration`](../24-development-orchestration/SKILL.md) distribui em paralelo.

## Entradas
- `TASK-XX.md` (skill 08).

## Saídas
- Código implementado e PR aberto.

## Regras principais
- Aciona [`agentes-ia/BACKEND-ENGINEER.md`](../../agents/AGENT-BACKEND-ENGINEER.md), [`agentes-ia/FRONTEND-ENGINEER.md`](../../agents/AGENT-FRONTEND-ENGINEER.md) ou [`agentes-ia/DATA-ENGINEER.md`](../../agents/AGENT-DATA-ENGINEER.md), conforme a natureza da task.
- Segue `CODE-STYLISH.template.md` (referência futura) e o checklist do agente acionado.
- Nenhum valor de ambiente é hardcoded no código gerado (ver [`process/10-core-agnosticism-gate.md`](../../process/10-core-agnosticism-gate.md)).

## Depende de
- `agentes-ia/BACKEND-ENGINEER.md`, `agentes-ia/FRONTEND-ENGINEER.md`, `agentes-ia/DATA-ENGINEER.md`, `process/10-core-agnosticism-gate.md`.

## Procedimento em caso de falha
Se a task tiver ambiguidade que impeça a implementação, a skill bloqueia e devolve para [`07-refine-tasks`](../07-refine-tasks/SKILL.md) via handoff reverso, em vez de implementar algo baseado em suposição.
