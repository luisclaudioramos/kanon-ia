# 23 — Register Lesson Learned

## Propósito
Permitir que um agente ou usuário registre uma lição de forma isolada (ex.: "evitar lib X") diretamente no repositório de conhecimento, sem precisar rodar o encerramento completo da Feature.

## Fase / Posição no fluxo
Fase 6 — Memória, Custo e Encerramento. Pode ser acionada a qualquer momento do pipeline, não só no final — é mais granular que [`15-memory-update`](../15-memory-update/SKILL.md).

## Entradas
- A lição pontual a ser registrada (o quê, por quê, contexto mínimo). Uma fonte comum é a seção "Lições aprendidas" do postmortem (`templates/POSTMORTEM.template.md`), que aponta para a entrada criada.

## Saídas
- Entrada isolada em `MEMORY.md`.

## Regras principais
- Mesma disciplina de citação de origem que `15-memory-update`, mas sem exigir o encerramento completo da Feature.

## Depende de
- `process/12-knowledge-retrieval.md` (mesmo mecanismo de consulta que consumirá esta entrada depois).

## Procedimento em caso de falha
Uma lição sem contexto mínimo (o quê aconteceu, por quê é relevante) não é registrada — a skill pede mais detalhe antes de gravar.
