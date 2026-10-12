# 26 — Test Case Publication

## Propósito
Sincronizar os casos de teste gerados localmente com a ferramenta que atende a capacidade `trabalho` no perfil da empresa, criando ou atualizando planos e suítes de teste, com rastreabilidade total.

## Fase / Posição no fluxo
Fase 4 — Desenvolvimento e Testes. Roda após [`25-test-case-authoring`](../25-test-case-authoring/SKILL.md).

## Entradas
- `TEST-CASE.md` (skill 25).
- Perfil efetivo: ferramenta da capacidade `trabalho` e o adaptador dela.

## Saídas
- Planos e suítes de teste criados ou atualizados na ferramenta de trabalho.
- `templates/PUBLISH-SUMMARY.template.md` preenchido.

## Regras principais
- O *como* vem do adaptador registrado no perfil (`process/17-company-profile.md`).
- Nunca duplica um caso de teste já publicado — atualiza pelo identificador existente.

## Depende de
- `25-test-case-authoring`, `process/13-external-integration-prerequisite.md`, `process/17-company-profile.md`.

## Procedimento em caso de falha
Se a capacidade `trabalho` não estiver configurada ou disponível, a skill reporta isso explicitamente e mantém os casos de teste apenas locais, sem bloquear o restante do pipeline.
