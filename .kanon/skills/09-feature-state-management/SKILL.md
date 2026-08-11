# 09 — Feature State Management

## Propósito
Mover a Feature entre os estados `backlog → ready → doing → done`, aplicando as regras de rollback e bloqueando a transição para `done` se o runbook não estiver 100% verde.

## Fase / Posição no fluxo
Fase 3 — Governança, Qualidade e Transições. Acionada continuamente ao longo de todo o ciclo de vida da Feature, não apenas uma vez.

## Entradas
- Estado atual da Feature e os artefatos que sustentam a transição pretendida (testes, review, runbook).

## Saídas
- Novo estado da Feature, registrado e rastreável.

## Regras principais
- Implementa exatamente [`process/03-state-management.md`](../../process/03-state-management.md) — vocabulário fixo de estados, pré-condições de transição e regras de rollback.
- A transição para `done` depende do runbook gerado por [`19-runbook-authoring`](../19-runbook-authoring/SKILL.md) estar "ready".

## Depende de
- `process/03-state-management.md`, `19-runbook-authoring`.

## Procedimento em caso de falha
Idêntico ao de `process/03-state-management.md`: estado ambíguo ou inconsistente é tratado como bloqueado até ser reconciliado com os artefatos reais.
