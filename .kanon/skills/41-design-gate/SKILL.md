# 41 — Design Gate

## Propósito
Forçar uma decisão explícita entre ≥2 abordagens de alto nível — e aprovação humana — antes de qualquer investimento em Feature Specification (skills 01-03) ou Architecture Assessment (skill 04). Evita gastar as skills 01-03 especificando em detalhe uma abordagem que nunca seria aprovada.

## Fase / Posição no fluxo
Fase 0 — Inicialização e Contexto. Roda após [`39-generate-requirement-summary`](../39-generate-requirement-summary/SKILL.md) ter produzido o `REQUIREMENT-SUMMARY.md`, e antes de [`01-refine-feature`](../01-refine-feature/SKILL.md). É um **hard gate**: `01-refine-feature` (e por extensão `02-discover-context`, `03-create-feature-artifacts`) não produz `FEATURE.md`/`PLAN-vx.md`/`INSTRUCTIONS.md` enquanto este gate não estiver aprovado — bloqueio reforçado por `.claude/hooks/design-gate-approval-gate.js`, não apenas por convenção.

## Entradas
- `REQUIREMENT-SUMMARY.md` (skill 39).

## Saídas
- `DESIGN.md` (ver `templates/DESIGN.template.md`), com `Status: APPROVED` e `Aprovado por` preenchido por um humano.

## Regras principais
- Aciona [`agentes-ia/ARCHITECT.md`](../../agents/AGENT-ARCHITECT.md) para esboçar 2 alternativas de alto nível (não a análise técnica profunda — essa é a skill 04) e [`agentes-ia/UI-UX-DESIGNER.md`](../../agents/AGENT-UI-UX-DESIGNER.md) quando a Feature envolve interface, mesma condição usada em [`01-refine-feature`](../01-refine-feature/SKILL.md).
- Executa obrigatoriamente no tier de modelo **Forte + XHigh** (ver [`process/08-model-orchestration.md`](../../process/08-model-orchestration.md)) — é uma decisão de governança de pipeline, nunca delegada a um tier inferior.
- `DESIGN.md` só é considerado aprovado com `**Status**: \`APPROVED\`` (sem o placeholder `DRAFT`) e `**Aprovado por**` preenchido com um nome real, nunca com o placeholder `[preencher...]` — é exatamente o que `.claude/hooks/design-gate-approval-gate.js` verifica antes de liberar a escrita de `FEATURE.md`, `PLAN-vx.md` ou `INSTRUCTIONS.md` na mesma pasta.
- Não substitui [`04-architecture-assessment`](../04-architecture-assessment/SKILL.md): este gate é um esboço de alto nível para decidir *se* e *por onde* seguir; a skill 04 é a avaliação técnica profunda que decide o tech-stack, já com `FEATURE.md` completo.

## Depende de
- `agentes-ia/ARCHITECT.md`, `agentes-ia/UI-UX-DESIGNER.md`, `process/08-model-orchestration.md`, `39-generate-requirement-summary`.

## Procedimento em caso de falha
Se não houver 2 alternativas genuinamente distintas ou a aprovação humana não vier, o `DESIGN.md` permanece `DRAFT` e o hook `design-gate-approval-gate.js` nega qualquer escrita dos artefatos de Feature Specification — a skill não avança "com uma alternativa só" nem assume aprovação implícita.
