# 04 — Handoff Protocol

## Propósito
Definir como a responsabilidade é transferida entre agentes (ex.: de [`PO.md`](../agents/AGENT-PO.md) para [`TECH-LEAD.md`](../agents/AGENT-TECH-LEAD.md)), quem pode disparar execuções em paralelo (*fan-out*) e quais artefatos são obrigatórios em cada entrega.

## Quando se aplica
Toda vez que um agente termina sua parte e transfere responsabilidade para outro, incluindo o disparo de um fan-out para múltiplos agentes em paralelo.

## Regras
- Um handoff só é válido se vier acompanhado dos artefatos obrigatórios daquela transição (ex.: PO → ARCHITECT exige Requirement Summary com critério de aceite; ver `05-definition-of-done.md` para o que cada artefato precisa satisfazer).
- Apenas papéis com autoridade definida podem disparar um fan-out — normalmente TECH-LEAD, conforme sua autoridade de desempate em [`TECH-LEAD.md`](../agents/AGENT-TECH-LEAD.md) e a matriz de `08-model-orchestration.md`.
- Todo handoff é rastreável: fica registrado de qual agente veio, para qual agente foi, e com quais artefatos.

## Sinais de violação
- Um agente começando a trabalhar sem o artefato obrigatório da transição anterior.
- Um fan-out disparado por um papel sem autoridade definida para isso.

## Procedimento em caso de falha
Se o artefato obrigatório da transição não existir, quem recebe recusa o handoff e sinaliza explicitamente o que falta — nunca prossegue com base em suposição.

## Exemplo concreto

**Errado** — handoff sem artefato obrigatório:
```
[PO → TECH-LEAD] "Pode planejar a implementação do desconto por CEP."
(sem Requirement Summary nem critério de aceite anexado)
```

**Certo** — handoff recusado por artefato ausente:
```
[TECH-LEAD] Handoff recusado: falta Requirement Summary com critério de aceite.
Não é possível planejar a implementação sem isso. Devolvendo para PO.
```
