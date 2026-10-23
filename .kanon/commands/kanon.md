# kanon — Comando de Entrada do Harness

## Propósito
Único ponto de entrada interativo do harness Kanon. Sem argumento ou com `--help`, mostra a ajuda: os comandos do `kanon` e os agentes. Com `skills`, lista as skills por fase. Com um nome de skill, roteia direto para ela.

## Uso
- `kanon`, `kanon --help`, `kanon help`, `kanon -h` — mostra a ajuda: a linha "Atuando para", os comandos desta lista e os agentes de [`agents/`](../agents/README.md) com a missão de cada um. Não lista as skills nem pergunta nada.
- `kanon skills` — lista as skills por fase (nome sem o número + propósito de uma linha), tirada de [`skills/README.md`](../skills/README.md).
- `kanon status <projeto|feature>` — diz em que etapa a Feature está e qual é o próximo passo, pelos artefatos da pasta, com os comandos de cada marco prontos para rodar; com um projeto, uma linha por Feature. Atalho do modo consulta de [`skills/09-feature-state-management`](../skills/09-feature-state-management/SKILL.md).
- `kanon <nome-da-skill> [contexto adicional]` — executa a skill correspondente diretamente.
- `kanon contexto <empresa>/<area>/<equipe>` — define para quem o kanon trabalha nesta máquina; atalho de `kanon company-profile contexto` ([`skills/51-company-profile`](../skills/51-company-profile/SKILL.md)).
- `kanon mensagem [destino] [assunto]` — escreve uma mensagem para um público e para no rascunho; atalho de `kanon audience-message` ([`skills/52-audience-message`](../skills/52-audience-message/SKILL.md)).

## Comportamento
0. Montar o perfil efetivo da empresa ([`process/17-company-profile.md`](../process/17-company-profile.md)) pela camada de integração e mostrar a linha "Atuando para", ou o aviso de modo neutro.
1. Sem argumento, com `--help`, `help`, `-h` ou `skills`: mostrar a ajuda ou a lista de skills descrita em Uso e parar. As duas derivam dos índices (`agents/README.md` e `skills/README.md`), nunca o contrário ([`process/01-menu-map.md`](../process/01-menu-map.md)).
1a. Com `status <nome>`: responder pela consulta de estado de [`process/03-state-management.md`](../process/03-state-management.md) e parar.
1b. Com `mensagem`: tratar como `audience-message` com o resto dos argumentos e seguir no passo 3.
2. Com outro argumento: o primeiro token é o `<nome-da-skill>`. Resolver para uma pasta em `skills/` comparando o nome ignorando o prefixo numérico (ex.: `refine-feature` → `skills/01-refine-feature/`; `setup` → `skills/setup/`).
3. Ler o `SKILL.md` da pasta resolvida (Propósito, Fase, Entradas, Saídas, Regras, Depende de) e executá-lo, aplicando os agentes de [`agents/`](../agents) e os processos de [`process/`](../process) que ele referenciar.
4. Usar os templates aplicáveis em [`templates/`](../templates) para os artefatos gerados.
5. Reportar o resultado no formato de [`process/07-return-envelope.md`](../process/07-return-envelope.md).

## Procedimento em caso de falha
Se `<nome-da-skill>` não corresponder a nenhuma skill conhecida, seguir o procedimento de falha de [`process/01-menu-map.md`](../process/01-menu-map.md): listar os comandos válidos mais próximos, nunca adivinhar ou executar uma skill não correspondente.

## Implementações concretas
- **Claude Code**: [`.claude/commands/kanon.md`](../../.claude/commands/kanon.md) — slash command real, invocado como `/kanon`, `/kanon --help`, `/kanon skills` `/kanon status <nome>` ou `/kanon <skill> <contexto>`; a ajuda e a lista de skills saem de [`.claude/scripts/kanon-help.js`](../../.claude/scripts/kanon-help.js), a consulta de estado de [`.claude/scripts/kanon-status.js`](../../.claude/scripts/kanon-status.js).
- **Outras IAs/ferramentas**: cole este arquivo como prompt de sistema, ou adapte para o mecanismo de comando equivalente da ferramenta (mantendo o comportamento acima).
