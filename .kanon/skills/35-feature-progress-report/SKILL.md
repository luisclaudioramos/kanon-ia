# 35 — Feature Progress Report

## Propósito
Compilar um dashboard executivo mostrando o andamento macro da Feature: percentual de User Stories concluídas, Tasks em aberto, bugs pendentes, cobertura de testes, desvio de cronograma e riscos identificados.

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação. Roda continuamente ao longo do pipeline, como insumo para cerimônias ágeis e decisões de go/no-go.

## Entradas
- Estados reais de Features/US/Tasks/Bugs (skill 09), relatórios de teste (skill 28).

## Saídas
- Dashboard executivo em Markdown/HTML.

## Regras principais
- Aciona [`agentes-ia/SCRUM-MASTER.md`](../../agents/AGENT-SCRUM-MASTER.md) e serve como insumo para [`agentes-ia/PO.md`](../../agents/AGENT-PO.md).
- Todo dado do dashboard vem do estado real registrado em `09-feature-state-management`, nunca de estimativa otimista.

## Depende de
- `agentes-ia/SCRUM-MASTER.md`, `09-feature-state-management`, `28-test-report`.

## Procedimento em caso de falha
Uma métrica que não pode ser calculada por falta de dado aparece explicitamente como "sem dado" — nunca é exibida como zero ou omitida silenciosamente.
