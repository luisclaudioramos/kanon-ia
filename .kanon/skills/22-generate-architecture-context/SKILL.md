# 22 — Generate Architecture Context

## Propósito
Complementar a skill 04 criando diagramas de contexto (C4 Model) e documentação técnica detalhada para orientar os engenheiros durante a implementação.

## Fase / Posição no fluxo
Fase 1 — Arquitetura e Especificação. Roda após [`04-architecture-assessment`](../04-architecture-assessment/SKILL.md) e antes do início da Fase 2 (refino de User Stories).

## Entradas
- `reports/architecture-assessment.md` (skill 04).

## Saídas
- Diagramas de contexto (C4 Model) e documentação técnica detalhada.

## Regras principais
- Usa o mecanismo de diagramação transversal [`20-diagram-authoring`](../20-diagram-authoring/SKILL.md) (Mermaid).
- A documentação técnica gerada segue [`process/06-markdown-formatting-rules.md`](../../process/06-markdown-formatting-rules.md) e não introduz nenhuma decisão nova — só detalha o que já foi decidido na skill 04.

## Depende de
- `04-architecture-assessment`, `20-diagram-authoring`, `process/06-markdown-formatting-rules.md`.

## Procedimento em caso de falha
Se a decisão de arquitetura da skill 04 ainda não existir ou estiver incompleta, esta skill bloqueia — não gera contexto técnico para uma decisão que ainda não foi tomada.
