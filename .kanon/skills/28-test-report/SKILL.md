# 28 — Test Report

## Propósito
Executar todos os casos de teste (manualmente ou via automação) e compilar um relatório consolidado (`TEST-REPORT.md`) com sucessos, falhas e evidências anexadas.

## Fase / Posição no fluxo
Fase 4 — Desenvolvimento e Testes. Roda após [`25-test-case-authoring`](../25-test-case-authoring/SKILL.md) e alimenta [`14-qualification`](../14-qa-validation/SKILL.md).

## Entradas
- `TEST-CASE.md` (skill 25).

## Saídas
- `TEST-REPORT.md` com resultado de cada caso e evidências (prints/logs).

## Regras principais
- Toda evidência anexada corresponde a uma execução real — mesma disciplina de `evidence[]` do [`process/07-return-envelope.md`](../../process/07-return-envelope.md).
- Um teste que não pôde ser executado aparece como "não executado", nunca como "passou" por omissão.
- Cada caso traz o ambiente e a versão em que rodou. Os "atestado local" aparecem também em "Cenários que homologação não monta", com o que falta para rodarem lá ([`14-qa-validation`](../14-qa-validation/SKILL.md)).

## Depende de
- `25-test-case-authoring`, `process/07-return-envelope.md`, `process/11-subagent-anti-hallucination.md`.

## Procedimento em caso de falha
Se a execução de um caso de teste falhar por motivo de ambiente (não do próprio código), isso é registrado separadamente de uma falha funcional, para não confundir os dois tipos de problema no relatório.
