# 37 — Validate Code Style

## Propósito
Aplicar um linter semântico sobre o código implementado, verificando conformidade com o padrão de estilo do projeto e com as diretrizes de arquitetura definidas na skill 04. Atua como filtro raso antes do code review, evitando que revisores percam tempo com formatação, nomenclatura ou organização de imports.

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação (mas roda operacionalmente antes de [`13-code-review`](../13-code-review/SKILL.md), logo após [`12-development-execution`](../12-development-execution/SKILL.md)).

## Entradas
- Código implementado.

## Saídas
- Relatório de conformidade de estilo (aprovado ou apontamentos rasos).

## Regras principais
- Usa `CODE-STYLISH.template.md` (referência futura) como padrão; na ausência dele, usa `reference/boas-praticas-dev/02-estilo-de-codigo.md` como base mínima.
- Verifica também aderência às diretrizes de arquitetura da skill [`04-architecture-assessment`](../04-architecture-assessment/SKILL.md).
- Antecede `13-code-review`, que foca em lógica e segurança, não em formatação.

## Depende de
- `reference/boas-praticas-dev/02-estilo-de-codigo.md`, `04-architecture-assessment`.

## Procedimento em caso de falha
Se o template de estilo específico do projeto não existir ainda, a skill declara que está usando a base mínima de `reference/boas-praticas-dev/` em vez de inventar uma convenção.
