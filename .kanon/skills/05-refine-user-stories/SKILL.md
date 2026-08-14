# 05 — Refine User Stories

## Propósito
Quebrar a Feature em User Stories (US), escrevendo os Acceptance Criteria (AC) e as regras de negócio de cada uma. Aplica a regra de ouro **1-1-1**: refinado → aprovado → publicado.

## Fase / Posição no fluxo
Fase 2 — Refino de Usuário e Tarefas. Roda após a Fase 1 (arquitetura definida) e antes de [`06-create-user-story-artifacts`](../06-create-user-story-artifacts/SKILL.md).

## Entradas
- `FEATURE.md` e o contexto arquitetural (skills 03, 04, 22).

## Saídas
- Conjunto de User Stories com AC, cada uma em um dos três estados: `refinado`, `aprovado` ou `publicado`.
- Tabela de esforço (US | Repo | SP | Foco) em "Priorização, Risco e Esforço" do `FEATURE.md`, atualizada conforme cada US é refinada.

## Regras principais
- Aciona [`agents/AGENT-PO.md`](../../agents/AGENT-PO.md) para o valor de negócio e [`agents/AGENT-QA-ENGINEER.md`](../../agents/AGENT-QA-ENGINEER.md) para garantir AC testáveis desde o início (shift-left).
- Toda US só avança de `refinado` para `aprovado` com AC no formato Dado/Quando/Então (ver `agents/GLOSSARIO.md#gherkin`).
- A transição para `publicado` só ocorre depois de aprovado — nenhuma US pula direto de `refinado` para `publicado`.
- Decisões de negócio/arquitetura tomadas durante o refino (ex.: escopo de uma US, resolução de conflito entre requisitos) são registradas na tabela "Decisões" do `FEATURE.md` — não apenas na cabeça de quem refinou.

## Depende de
- `agents/AGENT-PO.md`, `agents/AGENT-QA-ENGINEER.md`.

## Procedimento em caso de falha
Uma US sem AC testável não avança de `refinado` para `aprovado` — fica retida até o critério de aceite ser esclarecido, nunca aprovada "por prazo".
