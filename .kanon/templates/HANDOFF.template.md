# Handoff — _[preencher: de qual agente para qual agente]_

_Implementa `process/04-handoff-protocol.md`. Usado por `skills/10-handoff-management`._

**De**: _[preencher: agente de origem]_ · **Para**: _[preencher: agente de destino]_

## O que foi feito
_[preencher]_

## O que falta
_[preencher: ou "nada"]_

## Decisões tomadas e por quê
_[preencher]_

## Riscos conhecidos
_[preencher]_

## Critério de aceite para quem recebe
_[preencher]_

## Return Envelope (Selo III) — obrigatório em fan-out
```json
{
  "status": "success | failure | blocked",
  "evidence": ["_[preencher]_"],
  "summary": "_[preencher]_",
  "path_to_artifact": "_[preencher]_"
}
```
Ver `process/07-return-envelope.md` para o schema completo.

## Confirmação de recebimento
- [ ] Quem recebe confirma entendimento antes de assumir o trabalho
