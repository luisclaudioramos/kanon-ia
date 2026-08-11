# 30 — Cost of Ownership (TCO)

## Propósito
Estimar os custos de infraestrutura, licenciamento, manutenção e operação (SRE) da Feature implementada, gerando um relatório financeiro para o PO e stakeholders.

## Fase / Posição no fluxo
Fase 6 — Memória, Custo e Encerramento. Roda próximo ao encerramento da Feature, com a arquitetura e operação já definidas.

## Entradas
- Decisão de arquitetura (skill 04), runbook (skill 19), dados operacionais.

## Saídas
- Relatório de Custo Total de Propriedade.

## Regras principais
- Aciona [`agentes-ia/SRE.md`](../../agents/AGENT-SRE.md) para os dados operacionais e [`agentes-ia/PO.md`](../../agents/AGENT-PO.md) como destinatário do relatório.
- Toda estimativa é declarada como estimativa, com as premissas explícitas — nunca apresentada como valor exato e garantido.

## Depende de
- `agentes-ia/SRE.md`, `agentes-ia/PO.md`, `04-architecture-assessment`, `19-runbook-authoring`.

## Procedimento em caso de falha
Se faltar dado real de custo para uma parte da estimativa, a skill declara essa lacuna explicitamente, em vez de estimar sem sinalizar a incerteza.
