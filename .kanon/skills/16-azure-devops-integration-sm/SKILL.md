# 16 — Azure DevOps Integration (Scrum Master)

## Propósito
Sincronizar todos os artefatos (Features, User Stories, Tasks, Bugs) com o Azure DevOps, criando Work Items, vinculando-os e atualizando status.

## Fase / Posição no fluxo
Fase 5 — Publicação e Integrações. Roda continuamente conforme artefatos são criados/atualizados ao longo do pipeline.

## Entradas
- Artefatos locais (Feature, US, Task, Bug) e seus estados atuais.

## Saídas
- Work Items criados/atualizados no Azure DevOps, vinculados entre si.

## Regras principais
- Aciona [`agentes-ia/SCRUM-MASTER.md`](../../agents/AGENT-SCRUM-MASTER.md) como responsável pela sincronização de processo.
- Integração externa — configuração e pré-requisito regidos por [`process/13-external-integration-prerequisite.md`](../../process/13-external-integration-prerequisite.md): sem Azure DevOps configurado, a skill orienta a configuração antes de pular a etapa.
- Nunca duplica um Work Item já existente — atualiza pelo identificador.

## Depende de
- `agentes-ia/SCRUM-MASTER.md`, `setup/` (configuração de integração ADO), `process/13-external-integration-prerequisite.md`.

## Procedimento em caso de falha
Se a API do Azure DevOps estiver temporariamente indisponível, a skill enfileira a sincronização pendente e reporta o atraso — nunca falha silenciosamente nem marca como sincronizado sem confirmação. Se o Azure DevOps nunca foi configurado (não é uma indisponibilidade temporária), segue `process/13`: orienta a configuração e só aceita pular com exceção explícita e registrada.
