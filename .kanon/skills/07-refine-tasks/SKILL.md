# 07 — Refine Tasks

## Propósito
Dividir cada User Story em tarefas técnicas atômicas, aplicando a métrica de esforço SPx6h (Story Points × 6 horas) para estimar o trabalho de cada engenheiro.

## Fase / Posição no fluxo
Fase 2 — Refino de Usuário e Tarefas. Roda após [`06-create-user-story-artifacts`](../06-create-user-story-artifacts/SKILL.md) e antes de [`08-create-task-artifacts`](../08-create-task-artifacts/SKILL.md).

## Entradas
- `USER-STORY-XX.md` (skill 06).

## Saídas
- Lista de tasks técnicas atômicas, cada uma com estimativa em Story Points × 6h.

## Regras principais
- Aciona [`agents/AGENT-TECH-LEAD.md`](../../agents/AGENT-TECH-LEAD.md) para dividir o trabalho de forma que cada task seja independente e testável.
- Uma task só recebe estimativa se puder ser desenvolvida e testada isoladamente (base: `agents/AGENT-TECH-LEAD.md`, checklist de divisão de trabalho).
- Estimativa de SP/horas usa o **TCO preliminar** (`30-cost-of-ownership-tco`, primeira passada) como referência de complexidade/custo esperado — Engineers e QA não estimam no vácuo quando o TCO preliminar já existe.
- Cada task é fatiada para gerar uma PR abaixo do limite de tamanho da trava 6 de [`process/15-pull-request-gates.md`](../../process/15-pull-request-gates.md). Uma task que só cabe numa PR acima desse limite é quebrada antes de ser estimada.
- A task herda os **Sistemas afetados** da US e detalha quais deles ela toca (trava 5).

## Depende de
- `agents/AGENT-TECH-LEAD.md`, `30-cost-of-ownership-tco` (TCO preliminar), process/15-pull-request-gates.md.

## Procedimento em caso de falha
Uma task que não pode ser estimada de forma independente é sinalizada para quebra adicional — nunca estimada "no chute" só para preencher a lista.
