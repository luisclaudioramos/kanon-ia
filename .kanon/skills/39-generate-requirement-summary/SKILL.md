# 39 — Generate Requirement Summary

## Propósito
Pegar anotações cruas de negócio (uma conversa, um e-mail, um ticket) e transformá-las no primeiro artefato formal do pipeline: o `REQUIREMENT-SUMMARY.md`. É o "brief executivo" que alimenta [`01-refine-feature`](../01-refine-feature/SKILL.md).

## Fase / Posição no fluxo
Atua no início absoluto do fluxo, antes mesmo da skill 01, apesar do número alto — é a semente de todo o pipeline descrito em [`process/02-sdd-flow.md`](../../process/02-sdd-flow.md).

## Entradas
- Anotação crua de negócio (conversa, e-mail, ticket).

## Saídas
- `REQUIREMENT-SUMMARY.md`.

## Regras principais
- Aciona [`agents/AGENT-PO.md`](../../agents/AGENT-PO.md).
- Usa formato de critério de aceite verificável (Gherkin) sempre que possível, mesmo neste estágio inicial.

## Depende de
- `agents/AGENT-PO.md`.

## Procedimento em caso de falha
Se a anotação recebida não tiver informação mínima de problema/objetivo, a skill não gera um `REQUIREMENT-SUMMARY.md` vazio — pede mais contexto antes de formalizar o artefato.
