# 31 — GetOutline Integration

## Propósito
Publicar os artefatos de conhecimento (arquitetura, decisões, runbooks) no Outline, garantindo que a documentação de longo prazo fique acessível e versionada para toda a organização.

## Fase / Posição no fluxo
Fase 5 — Publicação e Integrações. Roda após artefatos de conhecimento consolidado existirem (ex.: ADR da skill 04, runbook da skill 19).

## Entradas
- Artefatos de conhecimento consolidado (arquitetura, decisões, runbooks).

## Saídas
- Documentação publicada e versionada no Outline.

## Regras principais
- Publica apenas artefatos de conhecimento consolidado, não rascunhos ou artefatos de trabalho em andamento.
- Integração externa — configuração e pré-requisito regidos por [`process/13-external-integration-prerequisite.md`](../../process/13-external-integration-prerequisite.md).

## Depende de
- `04-architecture-assessment`, `19-runbook-authoring`, `setup/`, `process/13-external-integration-prerequisite.md`.

## Procedimento em caso de falha
Se o Outline estiver temporariamente indisponível, a documentação permanece local e a skill sinaliza a pendência de publicação — não é perdida nem considerada "publicada" sem confirmação. Se o Outline nunca foi configurado, segue `process/13`: orienta a configuração e só aceita pular com exceção explícita e registrada.
