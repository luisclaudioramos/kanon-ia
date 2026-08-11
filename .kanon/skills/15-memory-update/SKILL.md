# 15 — Memory Update

## Propósito
Compilar todas as lições aprendidas, decisões arquiteturais, bugs críticos e padrões novos descobertos durante a Feature, e adicioná-los ao `MEMORY.md` do núcleo, servindo como base de RAG para futuras Features.

## Fase / Posição no fluxo
Fase 6 — Memória, Custo e Encerramento. Roda ao final do ciclo de vida de uma Feature, antes de [`40-show-feature-memory`](../40-show-feature-memory/SKILL.md).

## Entradas
- Histórico da Feature: decisões, bugs, padrões descobertos ao longo de todas as fases.

## Saídas
- `MEMORY.md` atualizado com as entradas relevantes desta Feature.

## Regras principais
- Alimenta o mecanismo de busca de [`process/12-knowledge-retrieval.md`](../../process/12-knowledge-retrieval.md) — toda entrada cita a Feature/decisão de origem, para permitir citação de `path:line` no futuro.
- Só registra lições com valor real de reaproveitamento, não um resumo genérico da Feature.

## Depende de
- `process/12-knowledge-retrieval.md`.

## Procedimento em caso de falha
Se não houver lição clara e específica a registrar, a skill não força uma entrada artificial em `MEMORY.md` só para "não ficar vazia".
