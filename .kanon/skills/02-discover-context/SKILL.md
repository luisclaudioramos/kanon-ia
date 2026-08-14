# 02 — Discover Context

## Propósito
Varrer o codebase existente, a documentação e as duas camadas de `MEMORY.md` (núcleo e Feature) em busca de artefatos, padrões ou decisões passadas relacionadas ao escopo da Feature — evita retrabalho e alinha com padrões já herdados.

## Fase / Posição no fluxo
Fase 0 — Inicialização e Contexto. Roda logo após [`01-refine-feature`](../01-refine-feature/SKILL.md) e antes de [`03-create-feature-artifacts`](../03-create-feature-artifacts/SKILL.md).

## Entradas
- Escopo inicial da Feature (saída da skill 01).
- Corpus local: código, documentação, **[`MEMORY.md` do núcleo](../../MEMORY.md)** (raiz do vault — lições cross-Feature, sempre consultado, independente do que está sendo construído) e `features/<feature>/MEMORY.md` (se já existir uma Feature anterior relacionada).

## Saídas
- Relatório de contexto: padrões herdados, decisões passadas relevantes, artefatos reaproveitáveis.

## Regras principais
- Usa o mecanismo de busca definido em [`process/12-knowledge-retrieval.md`](../../process/12-knowledge-retrieval.md) (BM25 sobre o corpus local).
- O `MEMORY.md` do núcleo é sempre parte do corpus, mesmo numa Feature em um repositório diferente de onde a lição foi originalmente aprendida — lição reaproveitável não é escopada a um repositório específico, só a ter sido promovida do nível Feature para o núcleo (ver critério em `skills/15-memory-update`).
- Toda afirmação sobre um padrão ou decisão existente cita `path:line` de origem — nunca uma afirmação genérica de "o projeto já faz X".

## Depende de
- `process/12-knowledge-retrieval.md`, [`MEMORY.md` do núcleo](../../MEMORY.md), `MEMORY.md` da Feature (referência futura, se existente).

## Procedimento em caso de falha
Se `MEMORY.md` ou o corpus não existir ou não puder ser buscado, a skill reporta explicitamente "sem contexto histórico encontrado" — nunca inventa um padrão ou decisão para preencher a lacuna (ver `process/11-subagent-anti-hallucination.md`).
