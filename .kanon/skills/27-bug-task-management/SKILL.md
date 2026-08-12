# 27 — Bug Task Management

## Propósito
No fluxo paralelo de Bugs, gerenciar a criação e o vínculo das tarefas corretivas ao `BUG.md`, garantindo que a correção seja rastreada como um artefato de primeira classe.

## Fase / Posição no fluxo
Fase 4 — Desenvolvimento e Testes. Roda em paralelo ao fluxo principal de Feature, disparada por [`32-report-bug`](../32-report-bug/SKILL.md).

## Entradas
- `BUG.md` (skill 32).

## Saídas
- Tasks de correção vinculadas ao Bug de origem.

## Regras principais
- Fluxo paralelo ao pipeline principal descrito em [`process/02-sdd-flow.md`](../../process/02-sdd-flow.md) — não interrompe o desenvolvimento em curso de outras Features.
- Cada task de correção referencia o `BUG.md` de origem via [`17-navigable-links`](../17-navigable-links/SKILL.md).
- Todo defeito corrigido durante qualquer Feature — mesmo um achado pequeno, corrigido na hora — passa por aqui: a correção sem `BUG.md` de origem não é um caminho válido (ver `32-report-bug`, acionamento automático).

## Depende de
- `32-report-bug`, `17-navigable-links`.

## Procedimento em caso de falha
Uma task de correção sem um `BUG.md` de origem válido não é criada.
