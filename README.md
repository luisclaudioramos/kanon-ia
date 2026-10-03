# kanon

Harness de desenvolvimento orientado a especificação (*spec-driven development*), usado
para conduzir o trabalho nos projetos da empresa. Este repositório guarda o **núcleo do
harness** — a especificação, não o conteúdo produzido com ela.

## O que tem aqui

Duas pastas, com papéis distintos: [`.kanon/`](.kanon) é a **especificação**, neutra de
ambiente; [`.claude/`](.claude) é a **integração real** com o Claude Code, que faz a
especificação valer em tempo de execução.

### `.kanon/` — o núcleo, 173 arquivos

| Pasta | Papel | Volume |
|---|---|---|
| [`.kanon/agents/`](.kanon/agents) | **Quem** — papéis especializados (`AGENT-*.md`) que aplicam julgamento em cada etapa | 14 arquivos |
| [`.kanon/process/`](.kanon/process) | **Como** — contratos comportamentais que regem o harness, mais `seals.manifest.json` | 20 arquivos |
| [`.kanon/skills/`](.kanon/skills) | **O quê** — procedimentos executáveis, cada um uma pasta com `SKILL.md` | 53 arquivos |
| [`.kanon/templates/`](.kanon/templates) | **Forma** — esqueletos de artefato, mais `evidence/` e `outline/` | 43 arquivos |
| [`.kanon/commands/`](.kanon/commands) | **Entrada** — especificação agnóstica do comando `kanon` | 1 arquivo |
| [`.kanon/reference/`](.kanon/reference) | **Base de qualidade** — `boas-praticas-dev/`, consumida por agentes e skills | 41 arquivos |

### `.claude/` — a integração, 18 arquivos

| Item | Papel |
|---|---|
| [`.claude/hooks/`](.claude/hooks) | Os 10 gates em JavaScript que rodam de verdade, todos ligados no `settings.json`: `identity-seals-gate`, `seal-registry-gate`, `seals-write-gate`, `seal-routing-gate`, `core-agnostic-gate`, `core-agnostic-commit-gate`, `design-gate-approval-gate`, `branch-delete-guard`, `develop-merge-squash-gate`, `pr-publish-consent-gate` — mais um README próprio |
| [`.claude/settings.json`](.claude/settings.json) | Liga os hooks ao harness: 10 execuções em 3 matchers de `PreToolUse` |
| [`.claude/commands/kanon.md`](.claude/commands/kanon.md) | O slash command `/kanon`, que implementa a especificação de `.kanon/commands/kanon.md` |
| [`.claude/integrations/screen-sources.md`](.claude/integrations/screen-sources.md) | Fontes de tela da `skills/48-screen-validation`: ferramenta, teste de conexão e caminho alternativo de cada uma |
| [`.claude/scripts/render-screens.sh`](.claude/scripts/render-screens.sh) | Converte protótipos HTML em PNG com o Chrome headless, em uma ou várias larguras (padrão 1920), e monta a prancha 390/768/1920 |
| [`.claude/scripts/prancha.py`](.claude/scripts/prancha.py) | Monta a prancha de uma tela com as imagens de 390, 768 e 1920 px lado a lado |
> **Dois arquivos da pasta ficam fora do versionamento**, listados no
> [`.gitignore`](.gitignore): `settings.local.json`, com as permissões acumuladas em
> sessões passadas e caminhos absolutos da máquina, e `RESUME.md`, checkpoint de uma
> sessão interrompida. Existem no disco e continuam funcionando localmente — só não
> entram na história, porque não descrevem o harness e não viajam entre máquinas.

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

A integração específica de uma ferramenta mora fora dele, em [`.claude/`](.claude): os
hooks `PreToolUse` que barram de fato uma escrita fora do contrato, e o slash command
`/kanon`. É ali que vivem os caminhos, os comandos e o que só faz sentido no Claude Code.

Se amanhã o harness for adaptado para outra IA, `.kanon/` é copiado inteiro e só a camada
de integração muda. A divisão é essa: `.kanon/` diz **o que** vale, `.claude/` faz valer.

## O que não está aqui

O conteúdo produzido *com* o harness — documentação de projeto, transcrições de reunião,
code reviews, assuntos e handoffs — vive em outro repositório, organizado por empresa.
