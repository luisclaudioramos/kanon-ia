# 11 — Quality Gate (Pré e Pós-Dev)

## Propósito
Executar a bateria de validações obrigatórias da Definition of Done: verifica se testes passam, se code review ocorreu, se a documentação foi atualizada, entre outros critérios. É o filtro antes de avançar de estado.

## Fase / Posição no fluxo
Fase 3 — Governança, Qualidade e Transições. Acionada antes e depois do desenvolvimento (Fase 4), e sempre antes de uma transição para `done` em [`09-feature-state-management`](../09-feature-state-management/SKILL.md).

## Entradas
- Artefato a ser validado (Task, User Story, Feature) e seus artefatos de suporte (testes, review, runbook).

## Saídas
- Aprovação ("verde") ou lista de critérios pendentes.

## Regras principais
- Implementa exatamente [`process/05-definition-of-done.md`](../../process/05-definition-of-done.md) — os mesmos critérios objetivos e imutáveis, sem exceção silenciosa.
- Integra com [`agentes-ia/QA-ENGINEER.md`](../../agents/AGENT-QA-ENGINEER.md) e [`agentes-ia/CODE-REVIEWER.md`](../../agents/AGENT-CODE-REVIEWER.md) para confirmar os critérios de teste e revisão.
- Precedido por um checkpoint formal de [`36-knowledge-retrieval`](../36-knowledge-retrieval/SKILL.md) — os critérios avaliados são confirmados contra o corpus real, não contra memória do agente.
- Segue [`process/14-decision-segregation.md`](../../process/14-decision-segregation.md): a aprovação roda como subagente independente de quem produziu o artefato avaliado, quando o ambiente permitir fan-out; quando não permitir, o resultado é registrado como "aprovado sem segregação de decisão".
- Um RNF que não pôde ser confirmado nem como verde nem como falho (estado indeterminado — ex.: ambiente indisponível, acesso insuficiente, dependência externa quebrada) não bloqueia o gate silenciosamente: aciona `32-report-bug` com a causa classificada, e o resultado do gate é "aprovado com ressalva registrada" — nunca "aprovado" liso nem "reprovado" por algo fora do controle da Feature.

## Depende de
- `process/05-definition-of-done.md`, `agentes-ia/QA-ENGINEER.md`, `agentes-ia/CODE-REVIEWER.md`, `09-feature-state-management`, `36-knowledge-retrieval`, `process/14-decision-segregation.md`, `32-report-bug`.

## Procedimento em caso de falha
Se um critério do DoD não for satisfeito, o artefato não avança de estado — a skill lista exatamente quais critérios faltam, sem aprovar parcialmente. Se um RNF ficar em estado indeterminado, o gate não trava o fluxo principal à força: registra a ressalva, aciona o Bug Flow (`32-report-bug`) para rastrear a causa, e notifica explicitamente o usuário para a decisão final.
