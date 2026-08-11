# 36 — Knowledge Retrieval (RAG Ativo)

## Propósito
Executar, sob demanda, uma busca BM25 avançada sobre todo o corpus (código, `MEMORY.md`, runbooks, decisões passadas) e retornar um relatório estruturado com os trechos mais relevantes e suas fontes (`path:line`). Diferente da recuperação passiva/automática usada por outras skills, esta é acionada explicitamente pelo usuário ou agente.

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação (mas pode ser acionada a qualquer momento do pipeline).

## Entradas
- Pergunta ou dúvida pontual do usuário/agente.

## Saídas
- Relatório estruturado com trechos relevantes e `path:line` de origem.

## Regras principais
- Implementa [`process/12-knowledge-retrieval.md`](../../process/12-knowledge-retrieval.md) em modo ativo, sob demanda — as skills [`02-discover-context`](../02-discover-context/SKILL.md) e [`15-memory-update`](../15-memory-update/SKILL.md) usam o mesmo mecanismo de forma passiva/automática.

## Depende de
- `process/12-knowledge-retrieval.md`.

## Procedimento em caso de falha
Idêntico ao de `process/12-knowledge-retrieval.md`: se nada relevante for encontrado, a skill declara isso explicitamente em vez de inventar uma fonte.
