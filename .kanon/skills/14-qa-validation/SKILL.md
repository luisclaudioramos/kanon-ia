# 14 — Qualification (Testes Executivos)

## Propósito
Validar a implementação contra os Acceptance Criteria da User Story, executando cenários de teste e atestando a qualidade funcional.

## Fase / Posição no fluxo
Fase 3 — Governança, Qualidade e Transições. Roda depois de [`13-code-review`](../13-code-review/SKILL.md), usando os casos de teste gerados por [`25-test-case-authoring`](../25-test-case-authoring/SKILL.md).

## Entradas
- `TEST-CASE.md` (skill 25) e a implementação já revisada.

## Saídas
- Atestado de qualidade funcional: AC cumpridos ou não, com evidência.

## Regras principais
- Aciona [`agents/AGENT-QA-ENGINEER.md`](../../agents/AGENT-QA-ENGINEER.md) para validar contra os AC.
- Nenhum AC é atestado como cumprido sem o cenário de teste correspondente ter sido de fato executado (ver `process/11-subagent-anti-hallucination.md`).

## Depende de
- `agents/AGENT-QA-ENGINEER.md`, `25-test-case-authoring`, `process/11-subagent-anti-hallucination.md`.

## Procedimento em caso de falha
Se um cenário de teste não puder ser executado, a skill reporta isso explicitamente como "não executado" — nunca simula um resultado de sucesso.
