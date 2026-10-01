# .kanon/ — Núcleo Agnóstico (Spec-Driven Development Harness)

Raiz do harness Kanon. Tudo aqui é **neutro de ambiente** — nenhum arquivo dentro desta pasta contém URL de produção, chave de API ou path absoluto de usuário (Selo I, ver [`process/10-core-agnosticism-gate.md`](process/10-core-agnosticism-gate.md)). Especificidades de ambiente, quando existirem, vivem em `.kanon/environment/` (ainda não criado neste repositório).

## Ordem de leitura

1. **[`process/00-runtime-contract.md`](process/00-runtime-contract.md)** — contrato de inicialização, lido antes de qualquer skill ou agente atuar.
2. **[`process/09-identity-seals-gate.md`](process/09-identity-seals-gate.md)** + **[`process/seals.manifest.json`](process/seals.manifest.json)** — os 5 Selos de Identidade e o catálogo que os rastreia.
3. **[`process/01-menu-map.md`](process/01-menu-map.md)** — como um comando do usuário vira uma skill.
4. A partir daí, o fluxo segue [`process/02-sdd-flow.md`](process/02-sdd-flow.md).

## Conteúdo

| Pasta                     | Papel                                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`agents/`](agents)       | **Quem** — 12 papéis especializados (`AGENT-*.md`) que aplicam julgamento em cada etapa              |
| [`process/`](process)     | **Como** — 16 contratos comportamentais + `seals.manifest.json`, regem todo o harness                |
| [`skills/`](skills)       | **O quê** — 43 procedimentos executáveis (cada um uma pasta com `SKILL.md`) + `setup/`               |
| [`templates/`](templates) | **Forma** — 35 esqueletos de artefato + `evidence/` e `outline/`                                     |
| [`commands/`](commands)   | **Entrada** — especificação agnóstica do comando único `kanon`                                       |
| [`reference/`](reference) | **Base de qualidade** — `boas-praticas-dev/`, referência técnica consumida por `agents/` e `skills/` |

## Fora de `.kanon/`

- [`../.claude/`](../.claude) — a integração *real* com o Claude Code: `hooks/` (os 9 gates `PreToolUse`, código funcional) e `commands/kanon.md` (o slash command `/kanon` que implementa a spec de `commands/kanon.md` desta pasta).

## Por que a separação

`.kanon/` só contém especificação e dados neutros — funciona como prompt/documentação em qualquer IA ou ferramenta. `.claude/` contém a integração específica desta ferramenta (hooks reais, slash command real). Se amanhã este harness for adaptado para outra IA, `.kanon/` é copiado inteiro; só a pasta de integração muda.
