# 19 — Runbook Authoring

## Propósito
Gerar automaticamente o `RUNBOOK.md` (com passos de deploy, monitoramento, rollback e health checks). O status deste runbook (ready/não-ready) bloqueia a ida para produção.

## Fase / Posição no fluxo
Transversal — acionada ao longo da Fase 4, e é pré-requisito direto para a transição `doing → done` em [`09-feature-state-management`](../09-feature-state-management/SKILL.md).

## Entradas
- Decisão de arquitetura (skill 04) e detalhes operacionais da implementação.

## Saídas
- `RUNBOOK.md` com status `ready` ou `não-ready`.

## Regras principais
- Aciona [`agents/AGENT-SRE.md`](../../agents/AGENT-SRE.md).
- O runbook cobre, no mínimo: passos de deploy, monitoramento, plano de rollback e health checks (base: `agents/AGENT-SRE.md`, checklist).
- Um runbook incompleto é gerado como `não-ready` por padrão — nunca marcado `ready` para "destravar" uma entrega.

## Depende de
- `agents/AGENT-SRE.md`, `09-feature-state-management`.

## Procedimento em caso de falha
Se alguma seção obrigatória do runbook não puder ser preenchida (ex.: sem plano de rollback definido), o runbook permanece `não-ready`, bloqueando a transição para `done`.
