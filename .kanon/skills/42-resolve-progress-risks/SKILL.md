# 42 — Resolve Progress Risks

## Propósito
Dar um comando direto para fechar (ou investigar) os riscos já listados na tabela de riscos de um `PROGRESS-REPORT.md` de uma Feature — sem exigir que o usuário re-explique cada risco do zero, e sem o agente adivinhar qual risco resolver a partir de um pedido em linguagem natural como "finalizar o fluxo".

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação. Companion de [`35-feature-progress-report`](../35-feature-progress-report/SKILL.md): 35 identifica e lista os riscos, 42 age sobre eles.

## Entradas
- `PROGRESS-REPORT.md` da Feature (tabela de riscos) — gerado por `35-feature-progress-report`.
- Escolha do usuário sobre quais riscos priorizar nesta rodada (nem todo risco listado precisa ser resolvido na mesma execução).

## Saídas
- Cada risco trabalhado tem sua linha na tabela de riscos atualizada com o resultado real (resolvido / investigado sem solução / permanece em aberto), nunca apagada do histórico.
- Artefatos afetados por cada risco (`FEATURE.md`, `bugs/BUG-XX.md`, `PUBLICATION-EXCEPTION.md`, `TASK-XX.md`, etc.) atualizados para refletir o novo estado.
- Lições reais descobertas no processo de fechamento registradas via `15-memory-update`/`23-register-lesson-learned` — não só o conteúdo do risco, mas o que o processo de resolvê-lo ensinou.

## Regras principais
- Um pedido em linguagem natural sem comando literal correspondente (ex.: "finalizar o fluxo", "fechar as pendências") que caia sobre uma Feature com `PROGRESS-REPORT.md` existente é resolvido perguntando ao usuário **usando os próprios riscos da tabela como opções da pergunta** — nunca escolhendo um risco por adivinhação (`process/01-menu-map.md`).
- Risco cuja ação recomendada é resolver um bug aciona `32-report-bug`/investigação direta; risco de PR pendente aciona `34-pull-request-review` (respeitando `process/13-external-integration-prerequisite.md`); risco de checklist dessincronizado aciona a marcação retroativa com evidência, seguindo a regra de atomicidade de `process/05-definition-of-done.md`.
- Um risco que não pôde ser resolvido nesta rodada (fora do escopo, depende de outro time, sem acesso) permanece registrado explicitamente como tal, com o motivo — nunca marcado como resolvido sem evidência real, nem silenciosamente removido da tabela.
- Todo RF-X/RNF que um risco resolvido revela (ex.: uma correção expõe uma lacuna nova) segue o mesmo mecanismo de conversão de `18-feature-context-back-propagation`/`35-feature-progress-report`.

## Depende de
- `35-feature-progress-report` (fonte da tabela de riscos), `32-report-bug`, `34-pull-request-review`, `process/13-external-integration-prerequisite.md`, `process/05-definition-of-done.md`, `15-memory-update`, `process/01-menu-map.md` (mecanismo de pergunta de esclarecimento).

## Procedimento em caso de falha
Se a Feature não tiver `PROGRESS-REPORT.md` gerado ainda, a skill não inventa uma lista de riscos — orienta a rodar `35-feature-progress-report` primeiro. Se o usuário pedir para resolver um risco que não existe na tabela, a skill aponta a lista real de riscos em vez de agir sobre algo não registrado.

## Exemplo concreto

**Errado** — adivinhar qual risco resolver:
```
Usuário: "Pode finalizar o fluxo?"
Sistema: (assume que é sobre o PR pendente e ignora os outros 2 riscos abertos)
```

**Certo** — pergunta usando os riscos reais como opções, depois age sobre os escolhidos:
```
Usuário: "Pode finalizar o fluxo?"
Sistema: A Feature está `done` com 3 riscos abertos em PROGRESS-REPORT.md:
  R-1 (checklists de Task não marcados), R-2 (RNF-01 indeterminado), R-3 (PR pendente).
  Qual(is) você quer que eu resolva?
Usuário: escolhe R-1 e R-3.
Sistema: resolve os dois, atualiza PROGRESS-REPORT.md/FEATURE.md/bugs/, registra lições novas em MEMORY.md.
```
