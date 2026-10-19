# 08 — Create Task Artifacts

## Propósito
Gerar os arquivos `TASK-XX.md` para cada tarefa refinada, incluindo checklists de implementação e referências de volta à User Story pai.

## Fase / Posição no fluxo
Fase 2 — Refino de Usuário e Tarefas. Roda após [`07-refine-tasks`](../07-refine-tasks/SKILL.md) e antes do início da Fase 3 (governança e qualidade).

## Entradas
- Tasks refinadas e estimadas (skill 07).

## Saídas
- Arquivos `TASK-XX.md` com checklist de implementação, em `tasks/` dentro da pasta da US (`user-stories/<id>-usNN-<nome>/tasks/`) ou do bug ([layout da pasta da Feature](../../process/03-state-management.md#layout-da-pasta-da-feature)).

## Regras principais
- Segue [`process/06-markdown-formatting-rules.md`](../../process/06-markdown-formatting-rules.md).
- Aciona [`17-navigable-links`](../17-navigable-links/SKILL.md) para referenciar a US pai.

## Depende de
- `07-refine-tasks`, `process/06-markdown-formatting-rules.md`, `17-navigable-links`.

## Procedimento em caso de falha
Uma task sem referência válida a uma US pai existente não é materializada.
