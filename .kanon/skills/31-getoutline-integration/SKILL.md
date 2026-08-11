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
- Integração externa (referência futura — depende da skill `setup`).

## Depende de
- `04-architecture-assessment`, `19-runbook-authoring`, `setup/`.

## Procedimento em caso de falha
Se o Outline estiver indisponível, a documentação permanece local e a skill sinaliza a pendência de publicação — não é perdida nem considerada "publicada" sem confirmação.
