# 40 — Show Feature Memory

## Propósito
Ler todos os artefatos gerados durante a Feature, compilar as lições aprendidas e decisões arquiteturais, e exibir um resumo interativo, permitindo perguntas do tipo "Por que escolhemos essa lib?" sem precisar abrir arquivos manualmente.

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação. Fecha o ciclo do pipeline, depois de [`15-memory-update`](../15-memory-update/SKILL.md) e [`23-register-lesson-learned`](../23-register-lesson-learned/SKILL.md).

## Entradas
- `MEMORY.md`, decisões e artefatos da Feature.

## Saídas
- Resumo interativo consultável no terminal/chat.

## Regras principais
- Responde apenas com base em artefatos reais já registrados — mesma disciplina de [`process/12-knowledge-retrieval.md`](../../process/12-knowledge-retrieval.md) e [`process/11-subagent-anti-hallucination.md`](../../process/11-subagent-anti-hallucination.md).
- Nunca infere uma razão plausível para uma decisão que não foi documentada.

## Depende de
- `15-memory-update`, `23-register-lesson-learned`, `process/12-knowledge-retrieval.md`.

## Procedimento em caso de falha
Uma pergunta sem resposta registrada nos artefatos retorna "não documentado" — nunca uma suposição apresentada como se fosse a razão real.
