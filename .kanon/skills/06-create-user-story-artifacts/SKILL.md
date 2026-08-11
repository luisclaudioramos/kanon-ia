# 06 — Create User Story Artifacts

## Propósito
Gerar os arquivos físicos `USER-STORY-XX.md` dentro da estrutura da Feature, aplicando os templates corretos e populando com os dados aprovados.

## Fase / Posição no fluxo
Fase 2 — Refino de Usuário e Tarefas. Roda após [`05-refine-user-stories`](../05-refine-user-stories/SKILL.md) e antes de [`07-refine-tasks`](../07-refine-tasks/SKILL.md).

## Entradas
- User Stories no estado `aprovado` (skill 05).

## Saídas
- Arquivos `USER-STORY-XX.md`.

## Regras principais
- Segue [`process/06-markdown-formatting-rules.md`](../../process/06-markdown-formatting-rules.md).
- Aciona [`17-navigable-links`](../17-navigable-links/SKILL.md) para linkar cada US de volta à Feature pai.

## Depende de
- `05-refine-user-stories`, `process/06-markdown-formatting-rules.md`, `17-navigable-links`.

## Procedimento em caso de falha
Uma US ainda em estado `refinado` (não `aprovado`) não é materializada como arquivo — a skill aguarda a aprovação antes de gerar o artefato.
