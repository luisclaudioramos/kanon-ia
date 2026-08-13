# 36 — Knowledge Retrieval (RAG Ativo)

## Propósito
**Objetivo principal**: garantir que nenhuma decisão de arquitetura seja tomada, e nenhum gate seja aprovado, sem antes confirmar contra o corpus real o que já existe — fechando a lacuna entre "o agente lembra de algo" e "o agente confirmou algo". Executa uma busca BM25 avançada sobre todo o corpus (código, `MEMORY.md`, runbooks, decisões passadas) e retorna um relatório estruturado com os trechos mais relevantes e suas fontes (`path:line`). Diferente da recuperação passiva/automática usada por outras skills, esta é acionada explicitamente — pelos dois checkpoints formais abaixo, ou sob demanda pelo usuário/agente.

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação, mas com três **checkpoints formais obrigatórios** em qualquer Feature: imediatamente antes de [`39-generate-requirement-summary`](../39-generate-requirement-summary/SKILL.md) (confirmar que o problema não já foi levantado/decidido antes, evitando retrabalho e resumo inconsistente), imediatamente antes de [`04-architecture-assessment`](../04-architecture-assessment/SKILL.md) (confirmar que decisões e padrões já existentes no corpus são conhecidos antes de propor arquitetura nova) e imediatamente antes de cada execução de [`11-quality-gate`](../11-quality-gate/SKILL.md) (confirmar que os critérios sendo avaliados batem com o que o corpus realmente mostra, não com memória do agente). Fora desses três pontos, continua acionável a qualquer momento sob demanda.

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
