# 33 — Audit Evidence

## Propósito
Materializar toda a trilha de artefatos (Features, User Stories, Tasks, Test Reports, Code Reviews, Aprovações) em um pacote formal de evidência (`Evidence-{id}-{title}.docx`), servindo como registro imutável para compliance, SOX ou auditorias internas.

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação. Roda ao final do ciclo de vida da Feature, depois de todos os artefatos estarem em estado final.

## Entradas
- Todos os artefatos gerados durante a Feature (US, Tasks, Test Reports, Code Reviews, aprovações).

## Saídas
- `Evidence-{id}-{title}.docx`, usando o template da pasta `templates/evidence/` (referência futura).

## Regras principais
- Reúne apenas artefatos já existentes e validados — nunca gera evidência de algo não comprovado (ver [`process/11-subagent-anti-hallucination.md`](../../process/11-subagent-anti-hallucination.md)).
- O pacote gerado é imutável: uma vez emitido, não é editado — uma nova versão gera um novo pacote.

## Depende de
- `process/11-subagent-anti-hallucination.md`, todos os artefatos das fases anteriores.

## Procedimento em caso de falha
Se um artefato obrigatório da trilha estiver ausente, a evidência não é gerada como "completa" — a skill reporta exatamente o que falta antes de emitir o pacote.
