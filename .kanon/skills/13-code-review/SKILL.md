# 13 — Code Review

## Propósito
Acionar o CODE-REVIEWER para analisar o código implementado, verificando padrões, segurança, desempenho e aderência aos Acceptance Criteria. Gera um relatório de aprovação ou apontamentos.

## Fase / Posição no fluxo
Fase 3 — Governança, Qualidade e Transições. Roda depois da implementação ([`12-development-execution`](../12-development-execution/SKILL.md)) e é pré-requisito para [`34-pull-request-review`](../34-pull-request-review/SKILL.md).

## Entradas
- Diff/PR produzido pela implementação.

## Saídas
- Relatório de achados em [`templates/CODE-REVIEW-REPORT.template.md`](../../templates/CODE-REVIEW-REPORT.template.md), envelopado no formato do return envelope (aprovação ou apontamentos com severidade).

## Regras principais
- Aciona [`agents/AGENT-CODE-REVIEWER.md`](../../agents/AGENT-CODE-REVIEWER.md), que segue o processo formal descrito lá: aderência à spec primeiro, depois checklist de qualidade (corretude, legibilidade, segurança, testes, arquitetura), depois quality checks automatizados do projeto-alvo.
- O CODE-REVIEWER só relata achados — nunca edita o código revisado. Correção é sempre devolvida a quem implementou.
- O revisor nunca é a mesma sessão/agente que implementou a mudança (`process/14-decision-segregation.md`).
- Cada achado é retornado no formato de [`process/07-return-envelope.md`](../../process/07-return-envelope.md).
- Roda depois de [`37-validate-code-style`](../37-validate-code-style/SKILL.md), que já filtrou problemas rasos de formatação.

## Depende de
- `agents/AGENT-CODE-REVIEWER.md`, `process/07-return-envelope.md`, `process/11-subagent-anti-hallucination.md`, `process/14-decision-segregation.md`, `templates/CODE-REVIEW-REPORT.template.md`, `37-validate-code-style`.

## Procedimento em caso de falha
Se a skill não conseguir acessar o diff completo, retorna `status: blocked` no envelope — nunca revisa "de memória" ou aprova sem ver o código real (ver `process/11-subagent-anti-hallucination.md`).
