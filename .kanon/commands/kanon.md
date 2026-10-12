# kanon — Comando de Entrada do Harness

## Propósito
Único ponto de entrada interativo do harness Kanon. Sem argumento, mostra o menu de comandos disponíveis. Com um nome de comando, roteia direto para a skill correspondente.

## Uso
- `kanon` — abre o menu interativo (lista os comandos disponíveis e pergunta o que o usuário quer fazer).
- `kanon <nome-do-comando> [contexto adicional]` — executa a skill correspondente diretamente, sem passar pelo menu.
- `kanon contexto <empresa>/<area>/<equipe>` — define para quem o kanon trabalha nesta máquina; atalho de `kanon company-profile contexto` ([`skills/51-company-profile`](../skills/51-company-profile/SKILL.md)).

## Comportamento
0. Montar o perfil efetivo da empresa ([`process/17-company-profile.md`](../process/17-company-profile.md)) pela camada de integração e mostrar a linha "Atuando para", ou o aviso de modo neutro.
1. Sem argumento: ler [`process/01-menu-map.md`](../process/01-menu-map.md) e [`skills/README.md`](../skills/README.md), apresentar o menu de comandos (nome + propósito de uma linha) e perguntar o que o usuário quer fazer.
2. Com argumento: o primeiro token é o `<nome-do-comando>`. Resolver para uma pasta em `skills/` comparando o nome ignorando o prefixo numérico (ex.: `refine-feature` → `skills/01-refine-feature/`; `setup` → `skills/setup/`).
3. Ler o `SKILL.md` da pasta resolvida (Propósito, Fase, Entradas, Saídas, Regras, Depende de) e executá-lo, aplicando os agentes de [`agents/`](../agents) e os processos de [`process/`](../process) que ele referenciar.
4. Usar os templates aplicáveis em [`templates/`](../templates) para os artefatos gerados.
5. Reportar o resultado no formato de [`process/07-return-envelope.md`](../process/07-return-envelope.md).

## Procedimento em caso de falha
Se `<nome-do-comando>` não corresponder a nenhuma skill conhecida, seguir o procedimento de falha de [`process/01-menu-map.md`](../process/01-menu-map.md): listar os comandos válidos mais próximos, nunca adivinhar ou executar uma skill não correspondente.

## Implementações concretas
- **Claude Code**: [`.claude/commands/kanon.md`](../../.claude/commands/kanon.md) — slash command real, invocado como `/kanon` ou `/kanon <comando> <contexto>`.
- **Outras IAs/ferramentas**: cole este arquivo como prompt de sistema, ou adapte para o mecanismo de comando equivalente da ferramenta (mantendo o comportamento acima).
