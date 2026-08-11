# 25 — Test Case Authoring (BDD)

## Propósito
Gerar os arquivos `TEST-CASE.md` derivados dos Acceptance Criteria (ou das Repro Steps, no caso de Bugs), usando linguagem Gherkin (Dado-Quando-Então) e cobrindo 100% dos AC.

## Fase / Posição no fluxo
Fase 4 — Desenvolvimento e Testes. Roda em paralelo à implementação, alimentando [`14-qualification`](../14-qa-validation/SKILL.md) e [`28-test-report`](../28-test-report/SKILL.md).

## Entradas
- Acceptance Criteria da User Story (skill 05) ou Repro Steps do Bug (skill 32).

## Saídas
- Arquivos `TEST-CASE.md` em Gherkin.

## Regras principais
- Aciona [`agentes-ia/QA-ENGINEER.md`](../../agents/AGENT-QA-ENGINEER.md).
- Cobertura de 100% dos AC é obrigatória para esta skill — diferente de cobertura de código, que é apenas um indicador (base: `agentes-ia/QA-ENGINEER.md`).
- Usa o formato Gherkin descrito em `agentes-ia/GLOSSARIO.md#gherkin`.

## Depende de
- `agentes-ia/QA-ENGINEER.md`, `05-refine-user-stories`, `32-report-bug`.

## Procedimento em caso de falha
Um AC sem caso de teste correspondente bloqueia a skill `14-qualification` — a lacuna é reportada, não ignorada.
