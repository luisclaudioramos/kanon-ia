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
- Aciona [`agents/AGENT-PO.md`](../../agents/AGENT-PO.md), que decide a técnica de elicitação e a abordagem por contexto (`reference/levantamento-de-requisitos/02-tecnicas-de-elicitacao.md`, `06`/`07`/`08`).
- Usa formato de critério de aceite verificável (Gherkin) sempre que possível, mesmo neste estágio inicial.
- Antes de formalizar, roda o checkpoint formal obrigatório de [`36-knowledge-retrieval`](../36-knowledge-retrieval/SKILL.md) contra `MEMORY.md`/corpus local, por levantamento anterior relacionado ao mesmo problema — evita retrabalho e um resumo inconsistente com decisão já tomada (`reference/levantamento-de-requisitos/01-processo-de-elicitacao.md`, "Verificação antes de começar").
- Captura evidência ou métrica do problema sempre que existir (log, reclamação recorrente, dado de performance atual); quando não existir, registra isso explicitamente como lacuna qualitativa, nunca inventa um número (`reference/levantamento-de-requisitos/03-evidencias-e-metricas.md`).
- `REQUIREMENT-SUMMARY.md` só é considerado pronto para alimentar `01-refine-feature` após homologação explícita do stakeholder que pediu — ausência de objeção não conta como validação (`reference/levantamento-de-requisitos/11-validacao-e-homologacao.md`).

## Depende de
- `agents/AGENT-PO.md`, `36-knowledge-retrieval`, `reference/levantamento-de-requisitos/01-processo-de-elicitacao.md`, `reference/levantamento-de-requisitos/03-evidencias-e-metricas.md`, `reference/levantamento-de-requisitos/11-validacao-e-homologacao.md`.

## Procedimento em caso de falha
Se a anotação recebida não tiver informação mínima de problema/objetivo, a skill não gera um `REQUIREMENT-SUMMARY.md` vazio — pede mais contexto antes de formalizar o artefato. Se o stakeholder não homologar explicitamente o resumo gerado, o artefato permanece em rascunho — não é passado para `01-refine-feature` como se estivesse validado.
