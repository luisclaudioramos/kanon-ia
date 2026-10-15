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
- **Trava de publicação** ([`process/18-work-item-publication-gate.md`](../../process/18-work-item-publication-gate.md)): antes de criar ou atualizar uma Feature ou User Story, monta o pacote do item (descrição no modelo de `templates/FEATURE.template.md`, critérios, anexos, campos) e roda a trava (no Claude Code: `node .claude/scripts/kanon-publicacao.js <pacote.json>`). Recusada, não publica nada: corrige e roda de novo.
- Lê **inteiro** cada documento antes de anexá-lo. Prazo ou estratégia de uso interno não é anexado: o documento vai para `fora` do pacote, com o motivo, e o resumo da publicação lista o que ficou de fora e por quê. Quando não souber classificar um trecho, pergunta; nunca marca `revisado` sozinha.
- Esforço e iteração nunca são inventados: vazios, só com o motivo registrado.

## Depende de
- `agents/AGENT-SCRUM-MASTER.md`, `process/13-external-integration-prerequisite.md`, `process/17-company-profile.md`, `process/18-work-item-publication-gate.md`, `templates/FEATURE.template.md`, `templates/USER-STORY.template.md`, `templates/PUBLISH-SUMMARY.template.md`.

## Procedimento em caso de falha
Trava de publicação recusou: nada é publicado; o resumo lista cada problema e a skill corrige o pacote antes de tentar de novo. Ferramenta temporariamente indisponível: a skill enfileira a sincronização pendente e reporta o atraso — nunca falha silenciosamente nem marca como sincronizado sem confirmação. Capacidade nunca configurada: segue `process/13` — orienta a configuração e só aceita pular com exceção explícita e registrada.
