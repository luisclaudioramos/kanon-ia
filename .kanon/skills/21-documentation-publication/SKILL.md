# 21 — Documentation Publication (Scrum Master)

## Propósito
Publicar os artefatos de conhecimento (Features, arquitetura, decisões, runbooks) na ferramenta que atende a capacidade `documentacao` no perfil da empresa, para que a documentação de longo prazo fique acessível e versionada para a organização.

## Fase / Posição no fluxo
Fase 5 — Publicação e Integrações. Roda após artefatos de conhecimento existirem (ex.: ADR da skill 04, runbook da skill 19) e de novo na entrega da Feature, para a documentação passar a descrever o sistema como ficou.

## Entradas
- Artefatos de conhecimento em estado `aprovado` ou em validação declarada.
- Perfil efetivo: ferramenta da capacidade `documentacao`, o adaptador dela e, se houver, a árvore de páginas da empresa.
- **Local da pasta Features**, informado por quem publica (ver [`templates/documentacao/FIXED-PAGES.md`](../../templates/documentacao/FIXED-PAGES.md)).

## Saídas
- Documentação publicada, no formato de [`templates/documentacao/PAGE-MODELS.md`](../../templates/documentacao/PAGE-MODELS.md) e [`templates/documentacao/STANDARDS.md`](../../templates/documentacao/STANDARDS.md).
- Cópia local publicada na Feature.
- [`templates/PUBLISH-SUMMARY.template.md`](../../templates/PUBLISH-SUMMARY.template.md) preenchido com a capacidade `documentacao`.

## Regras principais
- Aciona [`agents/AGENT-SCRUM-MASTER.md`](../../agents/AGENT-SCRUM-MASTER.md).
- O procedimento de publicação e a conferência específicos da ferramenta vêm do adaptador registrado no perfil.
- Publica conhecimento consolidado ou **em validação declarada**: documento em validação diz na situação quem valida. Nunca publica rascunho sem situação.
- **Pergunta o local** da pasta Features a cada publicação; nunca usa um padrão nem o de uma publicação anterior sem confirmação.
- **Mostra o rascunho** a quem pediu a publicação e só publica com o aceite.
- Na entrega da Feature, atualiza a situação para `Entregue em AAAA-MM-DD` e revisa o conteúdo para o to-be — é a documentação que a trava 9 de `process/15-pull-request-gates.md` e o DoD de `process/05-definition-of-done.md` cobram.
- Integração externa regida por [`process/13-external-integration-prerequisite.md`](../../process/13-external-integration-prerequisite.md). Endereço e token vivem na configuração do ambiente, nunca em `.kanon/`.

## Depende de
- `agents/AGENT-SCRUM-MASTER.md`, `04-architecture-assessment`, `19-runbook-authoring`, `process/13-external-integration-prerequisite.md`, `process/17-company-profile.md`, `templates/documentacao/`, `templates/PUBLISH-SUMMARY.template.md`.

## Procedimento em caso de falha
Ferramenta temporariamente indisponível: a documentação permanece local e a skill sinaliza a pendência — não é perdida nem considerada publicada sem confirmação. Capacidade nunca configurada: segue `process/13`. Item da conferência do adaptador que não atende: a skill lista o item e o documento, e só publica depois da correção ou de uma exceção registrada por quem pediu. Artefato em rascunho: aguarda a aprovação.
