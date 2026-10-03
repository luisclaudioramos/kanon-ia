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
- Toda US só avança de `refinado` para `aprovado` com AC no formato Dado/Quando/Então (ver `agents/GLOSSARIO.md#gherkin`) — cobrindo pelo menos o cenário de fluxo principal; o cenário de erro/borda é preenchido sempre que existir um caminho de exceção relevante, nunca deixado como placeholder vazio sem essa avaliação.
- Toda US só avança de `refinado` para `aprovado` com **Como é hoje**, **Como deve ficar** (trava 1) e **Sistemas afetados** (trava 5) preenchidos, ou com "Não se aplica: _motivo_" — regras em [`process/15-pull-request-gates.md`](../../process/15-pull-request-gates.md).
- O texto da US segue a trava 2 (linguagem clara): toda sigla, jargão ou nome de sistema é explicado na primeira ocorrência.
- Persona e Prioridade (MoSCoW) de cada US são definidas aqui, herdando o contexto de "Descrição" e "Priorização, Risco e Esforço" da `FEATURE.md` pai.
- Dependências entre US ("Bloqueado por"/"Bloqueia") são mapeadas durante o refino, não descobertas só na execução (`07-refine-tasks`).
- A seção "UI/UX" só é preenchida quando `agents/AGENT-UI-UX-DESIGNER.md` foi acionado para esta US (mesma condição de `skills/01-refine-feature`); caso contrário, é removida do arquivo em vez de ficar como placeholder vazio.
- Em US com interface, depois do refino aciona [`48-screen-validation`](../48-screen-validation/SKILL.md). A validação não bloqueia `07-refine-tasks`: o front pode começar em paralelo, e a cobrança acontece na entrega (trava 12 de `process/15-pull-request-gates.md`) e no fechamento da US (`process/05-definition-of-done.md`).
- A transição para `publicado` só ocorre depois de aprovado — nenhuma US pula direto de `refinado` para `publicado`.
- Decisões de negócio/arquitetura tomadas durante o refino (ex.: escopo de uma US, resolução de conflito entre requisitos) são registradas na tabela "Decisões" do `FEATURE.md` — não apenas na cabeça de quem refinou.

## Depende de
- `agents/AGENT-PO.md`, `agents/AGENT-QA-ENGINEER.md`, `process/15-pull-request-gates.md`, `48-screen-validation`.

## Procedimento em caso de falha
Uma US sem AC testável não avança de `refinado` para `aprovado` — fica retida até o critério de aceite ser esclarecido, nunca aprovada "por prazo".
