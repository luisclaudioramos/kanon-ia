# 10 — Handoff Management

## Propósito
Controlar a transferência de responsabilidade entre agentes (ex.: do PO para o Tech Lead, ou do Tech Lead para os engenheiros), garantindo que o return envelope (JSON) seja respeitado em todo fan-out.

## Fase / Posição no fluxo
Fase 3 — Governança, Qualidade e Transições. Acionada a cada transição de responsabilidade entre agentes, ao longo de todo o pipeline.

## Entradas
- Artefato/handoff produzido pelo agente de origem.

## Saídas
- Handoff validado e entregue ao agente de destino, ou rejeitado com o motivo explícito.

## Regras principais
- Implementa [`process/04-handoff-protocol.md`](../../process/04-handoff-protocol.md) (o que é obrigatório em todo handoff).
- Em fan-outs, valida que cada retorno de subagente respeita o schema de [`process/07-return-envelope.md`](../../process/07-return-envelope.md) antes de rotear a resposta de volta.

## Depende de
- `process/04-handoff-protocol.md`, `process/07-return-envelope.md`.

## Procedimento em caso de falha
Um handoff sem os artefatos obrigatórios, ou um retorno de fan-out fora do schema do envelope, é rejeitado e devolvido à origem — nunca roteado adiante incompleto.
