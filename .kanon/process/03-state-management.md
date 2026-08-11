# 03 — State Management

## Propósito
Definir a máquina de estados de uma feature/tarefa — `backlog → ready → doing → done` — com regras explícitas de transição e de rollback.

## Quando se aplica
Em qualquer feature ou tarefa rastreada pelo sistema, do momento em que é criada até ser concluída.

## Regras
- Estados válidos: `backlog`, `ready`, `doing`, `done` — nenhum outro rótulo é usado.
- Transições têm pré-condições explícitas: só avança para `done` se o critério correspondente estiver satisfeito (ex.: runbook/checklist de `05-definition-of-done.md` "verde").
- Regras de rollback são explícitas: uma feature em `doing` que precisa recuar por bloqueio volta para `ready` (não para `backlog`, salvo se o próprio requisito for invalidado — nesse caso volta para `backlog`).
- O estado atual de cada feature é sempre consultável a partir dos artefatos reais; nenhum agente assume o estado sem verificar.

## Sinais de violação
- Uma feature marcada `done` sem o runbook/checklist "verde".
- Uma feature que "some" do rastreamento sem passar por uma transição de estado válida.

## Procedimento em caso de falha
Se o estado real de uma feature for ambíguo ou inconsistente com os artefatos existentes, ela é tratada como bloqueada até o estado correto ser reconciliado manualmente — nunca assumido o estado mais otimista.

## Exemplo concreto

**Errado** — transição sem satisfazer a pré-condição:
```
Feature "desconto-por-cep": doing → done
(runbook não foi gerado, testes não confirmados)
```

**Certo** — transição condicionada, rollback explícito:
```
Feature "desconto-por-cep": doing → bloqueado (runbook falhou em CEP com formato internacional)
Rollback: doing+backlog → ready+backlog (requisito precisa esclarecer formato de CEP aceito)
Só após runbook verde: doing → done
```
