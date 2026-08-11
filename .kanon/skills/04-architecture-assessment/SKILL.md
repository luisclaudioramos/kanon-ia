# 04 — Architecture Assessment (Design Gate)

## Propósito
Executar a análise técnica profunda da Feature, propondo 2 alternativas de solução (ex.: monolito vs. microsserviços, SQL vs. NoSQL), documentando a decisão e definindo o tech-stack final.

## Fase / Posição no fluxo
Fase 1 — Arquitetura e Especificação. Roda após [`03-create-feature-artifacts`](../03-create-feature-artifacts/SKILL.md) e antes de [`22-generate-architecture-context`](../22-generate-architecture-context/SKILL.md).

## Entradas
- `FEATURE.md` (skill 03).

## Saídas
- `reports/architecture-assessment.md` com as 2 alternativas avaliadas, a decisão e o tech-stack final.

## Regras principais
- Aciona [`agentes-ia/ARCHITECT.md`](../../agents/AGENT-ARCHITECT.md) para propor as alternativas e [`agentes-ia/TECH-LEAD.md`](../../agents/AGENT-TECH-LEAD.md) para validar/desempatar.
- Executa obrigatoriamente no tier de modelo **Forte + High** (ver [`process/08-model-orchestration.md`](../../process/08-model-orchestration.md)).
- A decisão é registrada como ADR (ver `agentes-ia/ARCHITECT.md`, base `boas-praticas-dev/06-documentacao.md`).
- Nenhuma das alternativas pode depender de hardcode de ambiente (ver [`process/10-core-agnosticism-gate.md`](../../process/10-core-agnosticism-gate.md)).

## Depende de
- `agentes-ia/ARCHITECT.md`, `agentes-ia/TECH-LEAD.md`, `process/08-model-orchestration.md`, `process/10-core-agnosticism-gate.md`.

## Procedimento em caso de falha
Se o tier de modelo Forte não estiver disponível, a skill fica bloqueada até estar — decisão de arquitetura crítica nunca é tomada em tier inferior (ver `process/08-model-orchestration.md`).
