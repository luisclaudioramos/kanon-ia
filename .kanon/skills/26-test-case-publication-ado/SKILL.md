# 26 — Test Case Publication (Azure DevOps)

## Propósito
Sincronizar os casos de teste gerados localmente com o Azure DevOps, criando ou atualizando os Test Plans e Suites, garantindo rastreabilidade total.

## Fase / Posição no fluxo
Fase 4 — Desenvolvimento e Testes. Roda após [`25-test-case-authoring`](../25-test-case-authoring/SKILL.md).

## Entradas
- `TEST-CASE.md` (skill 25).

## Saídas
- Test Plans/Suites criados ou atualizados no Azure DevOps.

## Regras principais
- Integração externa via API do Azure DevOps (referência futura — depende da skill `setup` ter configurado as credenciais).
- Nunca duplica um Test Case já publicado — atualiza pelo identificador existente.

## Depende de
- `25-test-case-authoring`, `setup/` (configuração de integração ADO).

## Procedimento em caso de falha
Se a integração com o ADO não estiver configurada ou disponível, a skill reporta isso explicitamente e mantém os test cases apenas locais, sem bloquear o restante do pipeline.
