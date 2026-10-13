# Hooks — Firewalls de Contrato em Runtime

Scripts Node.js que rodam como hooks `PreToolUse` do Claude Code, interceptando ações **antes** de serem executadas. Diferente de [`agents/`](../../.kanon/agents), [`process/`](../../.kanon/process), [`skills/`](../../.kanon/skills) e [`templates/`](../../.kanon/templates) — que são especificação — estes arquivos são **código funcional real**, ligados em [`.claude/settings.json`](../settings.json).

## Índice

| Hook | Selo/Grupo | O que bloqueia |
|---|---|---|
| [identity-seals-gate.js](identity-seals-gate.js) | Selos e Identidade | Write que esvazia um artefato governado já existente (qualquer coisa dentro de `.kanon/`) |
| [seal-registry-gate.js](seal-registry-gate.js) | Selos e Identidade | `seals.manifest.json` resultante inválido (não é JSON, ou sem chave `seals[]`) |
| [seal-routing-gate.js](seal-routing-gate.js) | Selos e Identidade | Fan-out (tool `Agent`) sem `description` ou com prompt curto demais |
| [seals-write-gate.js](seals-write-gate.js) | Selos e Identidade | Qualquer escrita em `seals.manifest.json` sem o marcador `.kanon/.seals-write-authorized` |
| [core-agnostic-gate.js](core-agnostic-gate.js) | Agnosticismo (Selo I) | Hardcode de ambiente (chave AWS, URL de produção, path absoluto, segredo) em arquivos dentro de `.kanon/`; nome de empresa, pessoa, canal ou ferramenta (perfis e adaptadores) em todo `.kanon/` |
| [core-agnostic-commit-gate.js](core-agnostic-commit-gate.js) | Agnosticismo (Selo I) | `git commit` com hardcode de ambiente staged dentro de `.kanon/`; nome de empresa, pessoa, canal ou ferramenta (perfis e adaptadores) em todo `.kanon/` |
| [design-gate-approval-gate.js](design-gate-approval-gate.js) | SDD Flow (`skills/41-design-gate`) | Escrita de `FEATURE.md`/`PLAN-vx.md`/`INSTRUCTIONS.md` sem um `DESIGN.md` irmão com `Status: APPROVED` e `Aprovado por` preenchido |
| [pr-publish-consent-gate.js](pr-publish-consent-gate.js) | SCM | `gh pr create` / `az repos pr create` sem confirmação explícita (força o prompt de permissão nativo) |
| [branch-delete-guard.js](branch-delete-guard.js) | SCM | Exclusão local ou remota das branches protegidas do perfil da empresa (padrão: `main`, `master`, `develop`, `release/*`, `hotfix/*`) |
| [develop-merge-squash-gate.js](develop-merge-squash-gate.js) | SCM | `git merge` para dentro da branch de integração do perfil (padrão: `develop`) sem `--squash` |

## Escopo real vs. futuro

Alguns hooks já protegem este repositório **hoje** (`branch-delete-guard.js`, `pr-publish-consent-gate.js`) porque atuam sobre comandos Git/GitHub genéricos. Outros (`core-agnostic-gate.js`, `core-agnostic-commit-gate.js`, `seal-registry-gate.js`, `seals-write-gate.js`, `develop-merge-squash-gate.js`) ficam **dormentes** até que `.kanon/`, `seals.manifest.json` ou a branch de integração existam — a lógica está pronta e testada, só não encontra alvo ainda.

**Importante**: `core-agnostic-gate.js`/`core-agnostic-commit-gate.js` verificam apenas `.kanon/`; a checagem de hardcode de ambiente pula `.kanon/agents/` e `.kanon/templates/`, que contêm exemplos pedagógicos intencionais de "código errado" (segredos falsos, URLs de exemplo) que um scanner amplo bloquearia incorretamente. A checagem de nomes vale em todo `.kanon/`, inclusive `agents/` e `templates/`.

## Perfil da empresa e testes

Os hooks de branch e o Selo I ampliado leem o perfil da empresa por [`lib/perfil.js`](lib/perfil.js) (`.kanon/process/17-company-profile.md`). Sem perfil, todos voltam ao padrão seguro. Com perfil ilegível, os hooks de branch voltam ao padrão, mas o Selo I bloqueia (fail-closed) e a mensagem nomeia o perfil a corrigir; o boot (`kanon-perfil.js`) também avisa. As pessoas de `papeis` entram nos nomes barrados; nomes com menos de 3 letras não. Testes: `node --test ".claude/hooks/test/*.test.js"`.

## Comportamento em falha interna

Todo hook aqui segue a mesma regra: se o próprio script quebrar (erro inesperado), ele **nega a ação por padrão** (fail-closed), com a mensagem de erro explicando o que quebrou e como corrigir ou aprovar manualmente. A prioridade é nunca deixar um bug no hook passar uma violação despercebida — o custo de um falso bloqueio (corrigível na hora) é menor que o de um gate que falha aberto silenciosamente.

## Testando um hook manualmente

Cada hook lê um JSON de `PreToolUse` via stdin e responde em stdout. Exemplo:
```bash
echo '{"tool_name":"Bash","tool_input":{"command":"git branch -D main"}}' | node hooks/branch-delete-guard.js
```

## Comandos (`commands/`)

A camada de interface do usuário é um único comando de entrada (`/kanon`), implementado como slash command real do Claude Code em [`.claude/commands/kanon.md`](../commands/kanon.md). Sem argumento ou com `--help`, ele mostra a ajuda (comandos e agentes); com `skills`, lista as skills por fase — as duas saem de [`.claude/scripts/kanon-help.js`](../scripts/kanon-help.js); com um nome de skill, roteia direto para ela em [`skills/`](../../.kanon/skills).
