# 04 — Architecture Assessment (Design Gate)

## Propósito
Executar a análise técnica profunda da Feature, propondo 2 alternativas de solução (ex.: monolito vs. microsserviços, SQL vs. NoSQL), documentando a decisão e definindo o tech-stack final.

## Fase / Posição no fluxo
Fase 1 — Arquitetura e Especificação. Roda após [`03-create-feature-artifacts`](../03-create-feature-artifacts/SKILL.md) e antes de [`22-generate-architecture-context`](../22-generate-architecture-context/SKILL.md).

## Entradas
- `FEATURE.md` (skill 03).

## Saídas
- `reports/architecture-assessment.md` com as 2 alternativas avaliadas, a decisão e o tech-stack final.
- Um ADR numerado por decisão relevante (`templates/DECISION-RECORD.template.md`), na pasta de decisões do projeto (perfil, "Processos > Decisões técnicas"), com `origem` apontando para a Feature.
- Tabela "Impacted Systems" do `FEATURE.md` preenchida (repositórios/serviços tocados, tipo, impacto, ambiente/projeto de deploy).

## Regras principais
- Aciona [`agents/AGENT-ARCHITECT.md`](../../agents/AGENT-ARCHITECT.md) para propor as alternativas e [`agents/AGENT-TECH-LEAD.md`](../../agents/AGENT-TECH-LEAD.md) para validar/desempatar.
- A decisão final de arquitetura (stack escolhida, alternativa descartada) também é registrada na tabela "Decisões" do `FEATURE.md`, além do ADR completo em `ARCHITECTURE.md`.
- Executa obrigatoriamente no tier de modelo **Forte + High** (ver [`process/08-model-orchestration.md`](../../process/08-model-orchestration.md)).
- A decisão é registrada como ADR no modelo único de RFC e ADR (ver `agents/AGENT-ARCHITECT.md`, base `reference/boas-praticas-dev/06-documentacao.md`). O `ARCHITECTURE.md` é o documento da Feature e lista os ADRs que ela gerou; o número e o estado ficam no ADR.
- Nenhuma das alternativas pode depender de hardcode de ambiente (ver [`process/10-core-agnosticism-gate.md`](../../process/10-core-agnosticism-gate.md)).

## Depende de
- `agents/AGENT-ARCHITECT.md`, `agents/AGENT-TECH-LEAD.md`, `process/08-model-orchestration.md`, `process/10-core-agnosticism-gate.md`, `36-knowledge-retrieval` (checkpoint formal obrigatório antes desta skill).
- `reference/arquitetura/frontend/` — quando a Feature envolve estruturação de workspace/monorepo, design system/tokens, ou CI/CD de um projeto frontend, como base de padrões genéricos antes de propor as 2 alternativas.

## Procedimento em caso de falha
Se o tier de modelo Forte não estiver disponível, a skill fica bloqueada até estar — decisão de arquitetura crítica nunca é tomada em tier inferior (ver `process/08-model-orchestration.md`).
