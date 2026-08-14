# 01 — Refine Feature

## Propósito
Receber a ideação crua de negócio (business scope) e transformá-la em uma estrutura inicial de Feature, extraindo requisitos funcionais e não funcionais e preparando o terreno para a arquitetura.

## Fase / Posição no fluxo
Fase 0 — Inicialização e Contexto. Roda após [`39-generate-requirement-summary`](../39-generate-requirement-summary/SKILL.md) ter produzido o `REQUIREMENT-SUMMARY.md` (a "semente" do fluxo, apesar do número alto) **e** após [`41-design-gate`](../41-design-gate/SKILL.md) ter aprovado o `DESIGN.md` — hard gate reforçado por `.claude/hooks/design-gate-approval-gate.js`, que bloqueia a escrita de `FEATURE.md`/`PLAN-vx.md`/`INSTRUCTIONS.md` sem ele. Roda antes de [`02-discover-context`](../02-discover-context/SKILL.md).

## Entradas
- `REQUIREMENT-SUMMARY.md` (produzido pela skill 39) ou, na ausência dele, a ideação bruta equivalente.
- `DESIGN.md` aprovado (skill 41).

## Saídas
- Estrutura inicial de Feature: requisitos funcionais e não funcionais extraídos, com critério de aceite verificável para cada um.

## Regras principais
- É a primeira etapa formal do pipeline descrito em [`process/02-sdd-flow.md`](../../process/02-sdd-flow.md) — corresponde às fases de Análise e Especificação do processo de elicitação (`reference/levantamento-de-requisitos/01-processo-de-elicitacao.md`), com a Elicitação já feita por `39-generate-requirement-summary`.
- Aciona [`agents/AGENT-PO.md`](../../agents/AGENT-PO.md) (e [`agents/AGENT-UI-UX-DESIGNER.md`](../../agents/AGENT-UI-UX-DESIGNER.md) quando a Feature envolve interface) para produzir os requisitos.
- Todo requisito extraído precisa vir com critério de aceite no formato Dado/Quando/Então (ver `agents/GLOSSARIO.md#gherkin`) — nunca um requisito vago sem forma de verificação.
- Todo requisito extraído inclui explicitamente o que **não** será feito, quando aplicável — não deixa o "fora de escopo" implícito (`reference/levantamento-de-requisitos/05-delimitacao-de-escopo.md`).
- Se o `REQUIREMENT-SUMMARY.md` de entrada não tiver evidência, hipótese de sucesso ou métrica (KPI) registradas para o problema, a skill sinaliza a lacuna explicitamente ao extrair o RF correspondente, em vez de assumir que o problema está bem fundamentado (`reference/levantamento-de-requisitos/03-evidencias-e-metricas.md`).
- Prioridade, risco e a estimativa inicial de esforço da Feature (seção "Priorização, Risco e Esforço" do `FEATURE.md`) já nascem aqui, mesmo que refinados depois pelas skills 04/05/06.

## Depende de
- `agents/AGENT-PO.md`, `agents/AGENT-UI-UX-DESIGNER.md`, `process/02-sdd-flow.md`, `41-design-gate`, `reference/levantamento-de-requisitos/01-processo-de-elicitacao.md`, `reference/levantamento-de-requisitos/05-delimitacao-de-escopo.md`.

## Procedimento em caso de falha
Se a ideação recebida não tiver informação suficiente para extrair um requisito verificável, a skill sinaliza a lacuna explicitamente e não avança para `02-discover-context` com um requisito incompleto.
