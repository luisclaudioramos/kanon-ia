# 12 — Development Execution (Agente Engenheiro)

## Propósito
Acionar o agente especializado (Backend, Frontend ou Data) para implementar uma Task específica, seguindo rigorosamente as instruções do `TASK.md` e os padrões de estilo do projeto.

## Fase / Posição no fluxo
Fase 4 — Desenvolvimento e Testes. Roda após [`08-create-task-artifacts`](../08-create-task-artifacts/SKILL.md) e é o que [`24-development-orchestration`](../24-development-orchestration/SKILL.md) distribui em paralelo.

## Entradas
- `TASK-XX.md` (skill 08).

## Saídas
- Código implementado, documentação afetada atualizada, suíte completa passando e PR aberto com a descrição de [`templates/PR-DESCRIPTION.template.md`](../../templates/PR-DESCRIPTION.template.md).

## Regras principais
- Aciona [`agents/AGENT-BACKEND-ENGINEER.md`](../../agents/AGENT-BACKEND-ENGINEER.md), [`agents/AGENT-FRONTEND-ENGINEER.md`](../../agents/AGENT-FRONTEND-ENGINEER.md) ou [`agents/AGENT-DATA-ENGINEER.md`](../../agents/AGENT-DATA-ENGINEER.md), conforme a natureza da task.
- Segue `CODE-STYLISH.template.md` (referência futura) e o checklist do agente acionado.
- Nenhum valor de ambiente é hardcoded no código gerado (ver [`process/10-core-agnosticism-gate.md`](../../process/10-core-agnosticism-gate.md)).
- **Antes de abrir a PR**, cumpre as travas de desenvolvimento de [`process/15-pull-request-gates.md`](../../process/15-pull-request-gates.md), nesta ordem:
  1. Atualiza mocks, fixtures, testes de integração e E2E afetados e roda a suíte completa (trava 10).
  2. Executa o "Ciclo adversarial" de `process/15` até a condição de parada ali definida (trava 11). Nunca declara 100% sem relatório de cobertura e de mutação que comprove.
  3. Atualiza a documentação do sistema atual afetada para o to-be (trava 9): a documentação da Feature via [`18-feature-context-back-propagation`](../18-feature-context-back-propagation/SKILL.md); README, docs do repositório e wiki diretamente.
  4. Preenche o `PR-DESCRIPTION` com todas as seções, usando "Não se aplica: _motivo_" onde couber.
- Em task de interface, antes da PR, confere as regras D1–D6 de [`process/16-design-foundations.md`](../../process/16-design-foundations.md) contra o perfil de design do sistema, só no que a task introduz, e gera as pranchas 390/768/1920 das telas alteradas.

## Depende de
- `agents/AGENT-BACKEND-ENGINEER.md`, `agents/AGENT-FRONTEND-ENGINEER.md`, `agents/AGENT-DATA-ENGINEER.md`, `process/10-core-agnosticism-gate.md`, `process/15-pull-request-gates.md`, `templates/PR-DESCRIPTION.template.md`, `18-feature-context-back-propagation`.

## Procedimento em caso de falha
Se a task tiver ambiguidade que impeça a implementação, a skill bloqueia e devolve para [`07-refine-tasks`](../07-refine-tasks/SKILL.md) via handoff reverso, em vez de implementar algo baseado em suposição.

Se o ciclo adversarial parar sem avanço, a PR só é aberta com o relatório das lacunas na seção **Testes** do `PR-DESCRIPTION`, marcada como trava 11 pendente — a decisão de seguir é do revisor humano. Se o repositório não gera relatório de cobertura, isso é registrado como ressalva, nunca como 100%.
