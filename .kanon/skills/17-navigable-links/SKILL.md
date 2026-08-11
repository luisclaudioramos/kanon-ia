# 17 — Navigable Links

## Propósito
Acionada a cada novo artefato criado. Insere breadcrumbs e links Markdown bidirecionais entre todos os documentos (Feature → US → Tasks → Test Cases), garantindo rastreabilidade total.

## Fase / Posição no fluxo
Transversal — acionada por praticamente todas as skills que criam artefatos (03, 06, 08, 27, entre outras).

## Entradas
- Artefato recém-criado e seu artefato "pai" na hierarquia.

## Saídas
- Artefato com breadcrumb e links bidirecionais aplicados.

## Regras principais
- Segue o formato de breadcrumb definido em [`process/06-markdown-formatting-rules.md`](../../process/06-markdown-formatting-rules.md).
- Todo link é bidirecional: se A referencia B, B também referencia A.

## Depende de
- `process/06-markdown-formatting-rules.md`.

## Procedimento em caso de falha
Um artefato sem breadcrumb válido, ou com link quebrado, é considerado malformado (mesma regra de `process/06-markdown-formatting-rules.md`) e é corrigido antes de ser aceito como concluído.
