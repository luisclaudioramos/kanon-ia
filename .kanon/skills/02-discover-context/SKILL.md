# 02 — Discover Context

## Propósito
Varrer o codebase existente, a documentação e a `MEMORY.md` em busca de artefatos, padrões ou decisões passadas relacionadas ao escopo da Feature — evita retrabalho e alinha com padrões já herdados.

## Fase / Posição no fluxo
Fase 0 — Inicialização e Contexto. Roda logo após [`01-refine-feature`](../01-refine-feature/SKILL.md) e antes de [`03-create-feature-artifacts`](../03-create-feature-artifacts/SKILL.md).

## Entradas
- Escopo inicial da Feature (saída da skill 01).
- Corpus local: código, documentação, `MEMORY.md` (referência futura).

## Saídas
- Relatório de contexto: padrões herdados, decisões passadas relevantes, artefatos reaproveitáveis.

## Regras principais
- Usa o mecanismo de busca definido em [`process/12-knowledge-retrieval.md`](../../process/12-knowledge-retrieval.md) (BM25 sobre o corpus local).
- Toda afirmação sobre um padrão ou decisão existente cita `path:line` de origem — nunca uma afirmação genérica de "o projeto já faz X".

## Depende de
- `process/12-knowledge-retrieval.md`, `MEMORY.md` (referência futura).

## Procedimento em caso de falha
Se `MEMORY.md` ou o corpus não existir ou não puder ser buscado, a skill reporta explicitamente "sem contexto histórico encontrado" — nunca inventa um padrão ou decisão para preencher a lacuna (ver `process/11-subagent-anti-hallucination.md`).
