# 16 — Work Tracking Publication (Scrum Master)

## Propósito
Sincronizar os artefatos (Features, User Stories, Tasks, Bugs) com a ferramenta que atende a capacidade `trabalho` no perfil da empresa, criando work items, vinculando-os e atualizando status.

## Fase / Posição no fluxo
Fase 5 — Publicação e Integrações. Roda continuamente conforme artefatos são criados/atualizados ao longo do pipeline.

## Entradas
- Artefatos locais (Feature, US, Task, Bug) e seus estados atuais.
- Perfil efetivo: ferramenta da capacidade `trabalho` e o adaptador dela (`process/17-company-profile.md`).

## Saídas
- Work items criados/atualizados na ferramenta de trabalho, vinculados entre si.
- `templates/PUBLISH-SUMMARY.template.md` preenchido com a capacidade `trabalho`.

## Regras principais
- Aciona [`agents/AGENT-SCRUM-MASTER.md`](../../agents/AGENT-SCRUM-MASTER.md) como responsável pela sincronização de processo.
- O *como* vem do adaptador da ferramenta registrada no perfil; esta skill não conhece ferramenta.
- Integração externa — configuração e pré-requisito regidos por [`process/13-external-integration-prerequisite.md`](../../process/13-external-integration-prerequisite.md): sem a capacidade `trabalho` no perfil ou sem o adaptador configurado, a skill orienta a configuração antes de pular a etapa.
- Nunca duplica um work item já existente — atualiza pelo identificador.

## Depende de
- `agents/AGENT-SCRUM-MASTER.md`, `process/13-external-integration-prerequisite.md`, `process/17-company-profile.md`, `templates/PUBLISH-SUMMARY.template.md`.

## Procedimento em caso de falha
Ferramenta temporariamente indisponível: a skill enfileira a sincronização pendente e reporta o atraso — nunca falha silenciosamente nem marca como sincronizado sem confirmação. Capacidade nunca configurada: segue `process/13` — orienta a configuração e só aceita pular com exceção explícita e registrada.
