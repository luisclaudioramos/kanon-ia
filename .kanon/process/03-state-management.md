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

## Marcos da consulta de estado
A consulta de estado (`kanon status <projeto|feature>`, modo consulta de [`skills/09-feature-state-management`](../skills/09-feature-state-management/SKILL.md)) lê só os artefatos da pasta da Feature, na ordem de [`02-sdd-flow.md`](02-sdd-flow.md):

| # | Marco | Artefato que comprova | Comandos que geram o marco, na ordem (o primeiro é o próximo passo se faltar) |
|---|---|---|---|
| 1 | Requisito | `REQUIREMENT-SUMMARY.md` | `generate-requirement-summary` |
| 2 | Design Gate | `DESIGN.md` com Status `APPROVED` e "Aprovado por" preenchido | `design-gate` (aguardando aprovação humana, se o `DESIGN.md` já existe) |
| 3 | Especificação | `FEATURE.md`, `PLAN-v*.md` e `INSTRUCTIONS.md` | `create-feature-artifacts` |
| 4 | Arquitetura | `ARCHITECTURE.md` ou `reports/architecture-assessment.md` | `architecture-assessment` |
| 5 | TCO preliminar | `TCO.md` | `cost-of-ownership-tco` |
| 6 | User Stories | `USER-STORY-*.md` (ou `US-NN-*.md`) ou `user-stories/` | `refine-user-stories` → `create-user-story-artifacts` |
| 7 | Validação de telas | `telas/SCREEN-VALIDATION.md` com todas as telas do índice em `aprovada` ou `aprovada com ressalvas`; ou "Não se aplica" na linha "Aprovadores de tela" da `FEATURE.md` (marco mostrado como `[-]`) | `screen-validation` |
| 8 | Tasks | `TASK-*.md` ou `tasks/` | `refine-tasks` → `create-task-artifacts` |
| 9 | Casos de teste | `TEST-CASE*.md` ou `test-cases/` | `test-case-authoring` |
| 10 | Code review / PR | `REVIEW-PR*`, `PR-REVIEW*` ou `CODE-REVIEW*` | `code-review` → `pull-request-review` |
| 11 | Quality gate | `quality-gate-feature.md` ou `TEST-REPORT*.md` | `test-report` → `quality-gate` |
| 12 | Runbook | `RUNBOOK*.md` | `runbook-authoring` |
| 13 | Auditoria | `AUDIT-EVIDENCE*` ou `Evidence-*` | `audit-evidence` |
| 14 | Memória | `MEMORY.md` | `memory-update` |

- A etapa atual é o último marco cumprido sem buraco antes dele; o próximo passo é o primeiro marco que falta.
- A lista de marcos traz, embaixo de cada um, os comandos que o geram, já com o nome da Feature, prontos para rodar ou para refazer uma etapa.
- Marco que falta enquanto um posterior existe é **lacuna**, nunca etapa cumprida — o fluxo não avança como se ela tivesse sido feita (`02-sdd-flow.md`, procedimento em caso de falha).
- Pasta sem nenhum artefato do pipeline é declarada fora do formato; o próximo passo é o Requirement Summary.
- Validação de telas com tela pendente não fecha o marco: a consulta diz quantas telas do índice estão aprovadas. Feature sem a linha "Aprovadores de tela" e sem `telas/` aparece com o marco em aberto até declarar "Não se aplica" ou validar as telas.
- Catorze marcos cumpridos tornam a Feature candidata a `done`, não `done`: estado da PR, do work item e do deploy fica fora da pasta, e a consulta diz que não os verificou.

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
