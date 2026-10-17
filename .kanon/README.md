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
| [`process/`](process)     | **Como** — 18 contratos comportamentais + `seals.manifest.json`, regem todo o harness                |
| [`skills/`](skills)       | **O quê** — 51 procedimentos executáveis (cada um uma pasta com `SKILL.md`) + `setup/`               |
| [`templates/`](templates) | **Forma** — 38 esqueletos de artefato + `evidence/` e `documentacao/`                                     |
| [`commands/`](commands)   | **Entrada** — especificação agnóstica do comando único `kanon`                                       |
| [`reference/`](reference) | **Base de qualidade** — `boas-praticas-dev/`, referência técnica consumida por `agents/` e `skills/` |

## Fora de `.kanon/`

- [`../.claude/`](../.claude) — a integração *real* com o Claude Code: `hooks/` (os 11 gates `PreToolUse`, código funcional, ligados em `settings.json`), `commands/kanon.md` (o slash command `/kanon` que implementa a spec de `commands/kanon.md` desta pasta), `integrations/` (um adaptador por ferramenta, que atende as capacidades de `process/17-company-profile.md`, e as fontes de tela da `skills/48-screen-validation`) e `scripts/` (ajuda do `/kanon` e lista de skills em `kanon-help.js`, consulta de estado em `kanon-status.js`, perfil efetivo e contexto ativo em `kanon-perfil.js`, renderização de protótipos em PNG e montagem da prancha 390/768/1920).

## O que o kanon não é

- **Não é o conteúdo produzido com ele.** Documentação de projeto, transcrições de reunião, code reviews, assuntos e handoffs vivem em outro repositório, organizado por empresa. Aqui fica só o harness.
- **Não é uma aplicação nem uma biblioteca.** Não há sistema a executar nem dependência a instalar: `.kanon/` é especificação; o único código são os hooks e scripts de apoio em `../.claude/`.
- **Não é amarrado a uma IA.** `.kanon/` não carrega nada de ambiente (Selo I); trocar de ferramenta troca só a camada de integração.
- **Não é só convenção escrita.** As regras críticas são barradas em tempo de execução pelos hooks — por exemplo, sem `DESIGN.md` aprovado a Feature Specification não produz artefato (`41-design-gate`).
- **Não substitui a decisão humana.** Design Gate, aceite do PO e publicação de PR exigem aprovação ou consentimento explícito de uma pessoa.
- **Não é um catálogo de skills avulsas.** Cada skill numerada tem posição no pipeline de [`process/02-sdd-flow.md`](process/02-sdd-flow.md); acionar fora de ordem exige justificativa registrada, e defeito encontrado vira bug (`32-report-bug`), não correção silenciosa.
- **Não termina na implementação.** Uma Feature só chega a `done` com PR, TCO final, Audit Evidence e o aprendizado registrado em `MEMORY.md` ([`process/05-definition-of-done.md`](process/05-definition-of-done.md)).

## Por que a separação

`.kanon/` só contém especificação e dados neutros — funciona como prompt/documentação em qualquer IA ou ferramenta. `.claude/` contém a integração específica desta ferramenta (hooks reais, slash command real). Se amanhã este harness for adaptado para outra IA, `.kanon/` é copiado inteiro; só a pasta de integração muda.
