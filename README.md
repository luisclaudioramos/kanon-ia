# kanon

Harness de desenvolvimento orientado a especificação (*spec-driven development*), usado
para conduzir o trabalho nos projetos da empresa. Este repositório guarda o **núcleo do
harness** — a especificação, não o conteúdo produzido com ela.

## O que tem aqui

Tudo vive em [`.kanon/`](.kanon), a raiz do harness — 163 arquivos:

| Pasta | Papel | Volume |
|---|---|---|
| [`.kanon/agents/`](.kanon/agents) | **Quem** — papéis especializados (`AGENT-*.md`) que aplicam julgamento em cada etapa | 14 arquivos |
| [`.kanon/process/`](.kanon/process) | **Como** — contratos comportamentais que regem o harness, mais `seals.manifest.json` | 18 arquivos |
| [`.kanon/skills/`](.kanon/skills) | **O quê** — procedimentos executáveis, cada um uma pasta com `SKILL.md` | 50 arquivos |
| [`.kanon/templates/`](.kanon/templates) | **Forma** — esqueletos de artefato, mais `evidence/` e `outline/` | 38 arquivos |
| [`.kanon/commands/`](.kanon/commands) | **Entrada** — especificação agnóstica do comando `kanon` | 1 arquivo |
| [`.kanon/reference/`](.kanon/reference) | **Base de qualidade** — `boas-praticas-dev/`, consumida por agentes e skills | 41 arquivos |

## Ordem de leitura

Começar por [`.kanon/README.md`](.kanon/README.md), que estabelece a sequência:

1. `process/00-runtime-contract.md` — contrato de inicialização, lido antes de qualquer
   skill ou agente atuar.
2. `process/09-identity-seals-gate.md` + `process/seals.manifest.json` — os 5 Selos de
   Identidade e o catálogo que os rastreia.
3. `process/01-menu-map.md` — como um comando do usuário vira uma skill.
4. Daí em diante, o fluxo segue `process/02-sdd-flow.md`.

## Por que `.kanon/` é separado da integração

`.kanon/` é **neutro de ambiente**: nenhum arquivo ali contém URL de produção, chave de API
ou caminho absoluto de usuário — é o Selo I, verificado por
`process/10-core-agnosticism-gate.md`. Por isso funciona como prompt e documentação em
qualquer IA ou ferramenta, e pode ser copiado inteiro para outro ambiente.

A integração específica de uma ferramenta mora fora dele. No repositório de origem isso é
a pasta `.claude/`, com os hooks `PreToolUse` e o slash command `/kanon`. **Essa pasta não
está aqui** — este repositório traz só o núcleo agnóstico. Se o harness for adaptado para
outra IA, `.kanon/` viaja; só a camada de integração muda.

## O que não está aqui

O conteúdo produzido *com* o harness — documentação de projeto, transcrições de reunião,
code reviews, assuntos e handoffs — vive em outro repositório, organizado por empresa.
