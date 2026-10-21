# 25 — Test Case Authoring (BDD)

## Propósito
Gerar os arquivos `TEST-CASE.md` derivados dos Acceptance Criteria (ou das Repro Steps, no caso de Bugs), usando linguagem Gherkin (Dado-Quando-Então) e cobrindo 100% dos AC.

## Fase / Posição no fluxo
Fase 4 — Desenvolvimento e Testes. Roda em paralelo à implementação, alimentando [`14-qa-validation`](../14-qa-validation/SKILL.md) e [`28-test-report`](../28-test-report/SKILL.md).

## Entradas
- Acceptance Criteria da User Story (skill 05) ou Repro Steps do Bug (skill 32).

## Saídas
- Arquivos `TEST-CASE.md` em Gherkin, na pasta `test-cases/` do item que verificam: `user-stories/<id>-usNN-<nome>/test-cases/` para a US, `bugs/<id>-<nome>/test-cases/` para o bug ([layout da pasta da Feature](../../process/03-state-management.md#layout-da-pasta-da-feature)).

## Regras principais
- Aciona [`agents/AGENT-QA-ENGINEER.md`](../../agents/AGENT-QA-ENGINEER.md).
- Cobertura de 100% dos AC é obrigatória para esta skill. Cobertura de código é indicador para o repositório como um todo, **exceto** no código novo ou alterado de uma PR, onde 100% é meta obrigatória com ciclo adversarial (trava 11 de [`process/15-pull-request-gates.md`](../../process/15-pull-request-gates.md)).
- Usa o formato Gherkin descrito em `agents/GLOSSARIO.md#gherkin`.
- Cada caso declara **Onde roda**: homologação, com a massa que monta o cenário lá, ou local na versão de homologação, com o motivo concreto de homologação não montar o cenário ([`14-qa-validation`](../14-qa-validation/SKILL.md)).
- Todo TEST-CASE traz **Passos para testar** executáveis por alguém de fora da PR (trava 4) e a **Massa de teste** que reproduz o cenário, sempre sintética ou anonimizada (trava 7).
- Quando o código foi produzido pelo kanon, a skill alimenta o "Ciclo adversarial" de `process/15` escrevendo os casos de teste adversariais; quem o executa antes de abrir a PR é `12-development-execution`. Nunca declara 100% sem relatório de cobertura e de mutação que comprove.

## Depende de
- `agents/AGENT-QA-ENGINEER.md`, `05-refine-user-stories`, `32-report-bug`, `process/15-pull-request-gates.md`.

## Procedimento em caso de falha
Um AC sem caso de teste correspondente bloqueia a skill `14-qa-validation` — a lacuna é reportada, não ignorada.
