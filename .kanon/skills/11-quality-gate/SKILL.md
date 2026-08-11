# 11 — Quality Gate (Pré e Pós-Dev)

## Propósito
Executar a bateria de validações obrigatórias da Definition of Done: verifica se testes passam, se code review ocorreu, se a documentação foi atualizada, entre outros critérios. É o filtro antes de avançar de estado.

## Fase / Posição no fluxo
Fase 3 — Governança, Qualidade e Transições. Acionada antes e depois do desenvolvimento (Fase 4), e sempre antes de uma transição para `done` em [`09-feature-state-management`](../09-feature-state-management/SKILL.md).

## Entradas
- Artefato a ser validado (Task, User Story, Feature) e seus artefatos de suporte (testes, review, runbook).

## Saídas
- Aprovação ("verde") ou lista de critérios pendentes.

## Regras principais
- Implementa exatamente [`process/05-definition-of-done.md`](../../process/05-definition-of-done.md) — os mesmos critérios objetivos e imutáveis, sem exceção silenciosa.
- Integra com [`agentes-ia/QA-ENGINEER.md`](../../agents/AGENT-QA-ENGINEER.md) e [`agentes-ia/CODE-REVIEWER.md`](../../agents/AGENT-CODE-REVIEWER.md) para confirmar os critérios de teste e revisão.

## Depende de
- `process/05-definition-of-done.md`, `agentes-ia/QA-ENGINEER.md`, `agentes-ia/CODE-REVIEWER.md`, `09-feature-state-management`.

## Procedimento em caso de falha
Se um critério do DoD não for satisfeito, o artefato não avança de estado — a skill lista exatamente quais critérios faltam, sem aprovar parcialmente.
