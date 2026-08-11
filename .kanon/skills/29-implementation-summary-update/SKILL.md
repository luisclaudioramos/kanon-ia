# 29 — Implementation Summary Update

## Propósito
Manter o `IMPLEMENTATION-SUMMARY.md` atualizado com o progresso das Tasks, decisões técnicas tomadas durante o coding e o status final de cada User Story.

## Fase / Posição no fluxo
Fase 4 — Desenvolvimento e Testes. Roda continuamente durante a implementação, em paralelo a [`12-development-execution`](../12-development-execution/SKILL.md).

## Entradas
- Progresso das Tasks e decisões tomadas durante o desenvolvimento.

## Saídas
- `IMPLEMENTATION-SUMMARY.md` atualizado.

## Regras principais
- Aciona [`18-feature-context-back-propagation`](../18-feature-context-back-propagation/SKILL.md) para propagar decisões relevantes de volta aos documentos mestres da Feature.
- Nenhuma decisão técnica relevante fica registrada só na conversa/PR — ela chega ao summary.

## Depende de
- `18-feature-context-back-propagation`.

## Procedimento em caso de falha
Se uma decisão técnica não puder ser rastreada até uma task específica, ela é registrada como "decisão avulsa" com o contexto mínimo disponível, em vez de omitida.
