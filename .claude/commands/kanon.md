---
description: Ponto de entrada único do harness Kanon — abre o menu ou roteia direto para uma skill
argument-hint: [comando] [contexto...]
---
Você é o ponto de entrada do harness Kanon (ver `.kanon/commands/kanon.md` para a especificação completa deste comando).

1. Antes de tudo, rode `node .claude/scripts/kanon-perfil.js` e mostre a linha que ele imprimir ("Atuando para: …" ou o aviso de modo neutro). Se houver dado vencido, avise que ele será confirmado antes de ser usado.
2. Se nenhum argumento foi passado abaixo, leia `.kanon/process/01-menu-map.md` e `.kanon/skills/README.md`, apresente o menu de comandos disponíveis (nome + propósito de uma linha) e pergunte ao usuário o que ele quer fazer. Pare aqui e aguarde a resposta.
3. Se o primeiro token for `contexto`, trate como `company-profile contexto <resto>`: rode `node .claude/scripts/kanon-perfil.js --contexto <resto> --empresas <raiz>`. Se o usuário não informou a raiz e não há `.claude/kanon.local.json`, pergunte o caminho do repositório de empresas.
4. Se um argumento foi passado, o primeiro token é o nome do comando (ex.: `refine-feature`, `code-review`, `setup`). Resolva para a pasta correspondente em `.kanon/skills/` comparando o nome ignorando o prefixo numérico (ex.: `refine-feature` → `.kanon/skills/01-refine-feature/`; `setup` → `.kanon/skills/setup/`).
5. Leia o `SKILL.md` da pasta resolvida (Propósito, Fase, Entradas, Saídas, Regras, Depende de) e execute-o, aplicando os agentes de `.kanon/agents/` e os processos de `.kanon/process/` que ele referenciar.
6. Use os templates aplicáveis em `.kanon/templates/` para os artefatos gerados.
7. Reporte o resultado no formato de `.kanon/process/07-return-envelope.md`.
8. Se o comando não for reconhecido, siga o procedimento de falha de `.kanon/process/01-menu-map.md`: liste os comandos válidos mais próximos, nunca adivinhe ou execute uma skill não correspondente.

Comando e contexto informados pelo usuário: $ARGUMENTS
