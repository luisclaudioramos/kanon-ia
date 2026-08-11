# Hooks — Firewalls de Contrato em Runtime

Scripts Node.js que rodam como hooks `PreToolUse` do Claude Code, interceptando ações **antes** de serem executadas. Diferente de [`agents/`](../../.kanon/agents), [`process/`](../../.kanon/process), [`skills/`](../../.kanon/skills) e [`templates/`](../../.kanon/templates) — que são especificação — estes arquivos são **código funcional real**, ligados em [`.claude/settings.json`](../settings.json).

## Índice

| Hook | Selo/Grupo | O que bloqueia |
|---|---|---|
| [identity-seals-gate.js](identity-seals-gate.js) | Selos e Identidade | Write que esvazia um artefato governado já existente (qualquer coisa dentro de `.kanon/`) |
| [seal-registry-gate.js](seal-registry-gate.js) | Selos e Identidade | `seals.manifest.json` resultante inválido (não é JSON, ou sem chave `seals[]`) |
| [seal-routing-gate.js](seal-routing-gate.js) | Selos e Identidade | Fan-out (tool `Agent`) sem `description` ou com prompt curto demais |
| [seals-write-gate.js](seals-write-gate.js) | Selos e Identidade | Qualquer escrita em `seals.manifest.json` sem o marcador `.kanon/.seals-write-authorized` |
| [core-agnostic-gate.js](core-agnostic-gate.js) | Agnosticismo (Selo I) | Hardcode de ambiente (chave AWS, URL de produção, path absoluto, segredo) em arquivos dentro de `.kanon/` |
| [core-agnostic-commit-gate.js](core-agnostic-commit-gate.js) | Agnosticismo (Selo I) | `git commit` com hardcode de ambiente staged dentro de `.kanon/` |
| [pr-publish-consent-gate.js](pr-publish-consent-gate.js) | SCM | `gh pr create` / `az repos pr create` sem confirmação explícita (força o prompt de permissão nativo) |
| [branch-delete-guard.js](branch-delete-guard.js) | SCM | Exclusão local ou remota de `main`, `master`, `develop`, `release/*`, `hotfix/*` |
| [develop-merge-squash-gate.js](develop-merge-squash-gate.js) | SCM | `git merge` para dentro de `develop` sem `--squash` |

## Escopo real vs. futuro

Alguns hooks já protegem este repositório **hoje** (`branch-delete-guard.js`, `pr-publish-consent-gate.js`) porque atuam sobre comandos Git/GitHub genéricos. Outros (`core-agnostic-gate.js`, `core-agnostic-commit-gate.js`, `seal-registry-gate.js`, `seals-write-gate.js`, `develop-merge-squash-gate.js`) ficam **dormentes** até que `.kanon/`, `seals.manifest.json` ou a branch `develop` existam — a lógica está pronta e testada, só não encontra alvo ainda.

**Importante**: `core-agnostic-gate.js`/`core-agnostic-commit-gate.js` verificam apenas `.kanon/`, nunca `agentes-ia/`, `process/`, `skills/` ou `templates/` — essas pastas contêm exemplos pedagógicos intencionais de "código errado" (segredos falsos, URLs de exemplo) que um scanner amplo bloquearia incorretamente.

## Comportamento em falha interna

Todo hook aqui segue a mesma regra: se o próprio script quebrar (erro inesperado), ele **permite a ação por padrão** (fail-open) e escreve um aviso em stderr — a prioridade é nunca travar o fluxo de trabalho do usuário por um bug no hook. Isso é uma escolha deliberada para hooks de convenção de projeto, diferente de um gate de segurança corporativo que travaria por padrão (fail-closed).

## Testando um hook manualmente

Cada hook lê um JSON de `PreToolUse` via stdin e responde em stdout. Exemplo:
```bash
echo '{"tool_name":"Bash","tool_input":{"command":"git branch -D main"}}' | node hooks/branch-delete-guard.js
```

## Comandos (`commands/`)

A camada de interface do usuário é um único comando de entrada (`/kanon`), implementado como slash command real do Claude Code em [`.claude/commands/kanon.md`](../commands/kanon.md). Sem argumento, ele abre o menu (`.kanon/process/01-menu-map.md`); com um nome de comando, roteia direto para a skill correspondente em [`skills/`](../../.kanon/skills).
