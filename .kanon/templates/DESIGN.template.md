# Design Gate — _[preencher: nome da Feature]_

_Breadcrumb: [Home](../README.md) > Design Gate_

**Versão**: v_[preencher]_ · **Status**: `DRAFT` | `APPROVED`
**Aprovado por**: _[preencher: nome de quem aprovou humanamente]_ · **Data**: _[preencher]_

## Problema (resumo do Requirement Summary)
_[preencher: 2-3 frases, vindas de `REQUIREMENT-SUMMARY.md` — não repita o documento inteiro]_

## Alternativas de alto nível — 2 obrigatórias

### Alternativa A: _[preencher: nome]_
- Abordagem: _[preencher: 1 parágrafo, nível de esboço — não é a análise técnica profunda de `ARCHITECTURE.md`]_
- Prós: _[preencher]_
- Contras: _[preencher]_

### Alternativa B: _[preencher: nome]_
- Abordagem: _[preencher]_
- Prós: _[preencher]_
- Contras: _[preencher]_

## Decisão
**Escolhida**: _[preencher: A ou B]_
**Decidido por**: _[preencher: TECH-LEAD/ARCHITECT]_
**Justificativa**: _[preencher]_

## Aprovação
- [ ] Revisado pelo Tech Lead
- [ ] Revisado pelo Architect (e UI-UX-DESIGNER, se a Feature envolve interface)
- [ ] `APPROVED` — libera avanço para `skills/01-refine-feature` (bloqueado por `.claude/hooks/design-gate-approval-gate.js` até aqui)

## Relação com a Architecture Assessment (skill 04)
Este é um gate de alto nível, antes da Feature Specification existir — não substitui a avaliação técnica profunda de `reports/architecture-assessment.md` (skill 04), que roda depois, já com `FEATURE.md` completo. Se a decisão daqui for invalidada pela análise mais profunda, a Feature volta para este Design Gate (rollback), não avança com a contradição registrada em dois lugares.
