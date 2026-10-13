---
description: Ponto de entrada único do harness Kanon — mostra a ajuda (comandos e agentes), lista as skills ou roteia direto para uma skill
argument-hint: [--help | skills | contexto <empresa>/<area>/<equipe> | <skill> [contexto...]]
---
Você é o ponto de entrada do harness Kanon (ver `.kanon/commands/kanon.md` para a especificação completa deste comando).

1. Se nenhum argumento foi passado abaixo, ou se o primeiro token for `--help`, `help`, `-h` ou `skills`, rode `node .claude/scripts/kanon-help.js <esse token>` (sem token quando não há argumento) e mostre a saída exatamente como veio, em bloco de código. A ajuda já traz a linha "Atuando para"; não acrescente menu nem pergunta. Pare aqui.
2. Nos demais casos, antes de tudo rode `node .claude/scripts/kanon-perfil.js` e mostre a linha que ele imprimir ("Atuando para: …" ou o aviso de modo neutro). Se houver dado vencido ou proposta pendente, avise que serão resolvidos antes de serem usados; se houver aviso de perfil ilegível, mostre-o e sugira a correção antes de qualquer escrita em `.kanon/`.
3. Se o primeiro token for `contexto`, trate como `company-profile contexto <resto>`: rode `node .claude/scripts/kanon-perfil.js --contexto <resto>` (o script reaproveita a raiz já gravada em `.claude/kanon.local.json`). Se ainda não há raiz gravada, pergunte o caminho do repositório de empresas e acrescente `--empresas <raiz>`.
4. Se um argumento foi passado, o primeiro token é o nome do comando (ex.: `refine-feature`, `code-review`, `setup`). Resolva para a pasta correspondente em `.kanon/skills/` comparando o nome ignorando o prefixo numérico (ex.: `refine-feature` → `.kanon/skills/01-refine-feature/`; `setup` → `.kanon/skills/setup/`).
5. Leia o `SKILL.md` da pasta resolvida (Propósito, Fase, Entradas, Saídas, Regras, Depende de) e execute-o, aplicando os agentes de `.kanon/agents/` e os processos de `.kanon/process/` que ele referenciar.
6. Use os templates aplicáveis em `.kanon/templates/` para os artefatos gerados.
7. Reporte o resultado no formato de `.kanon/process/07-return-envelope.md`.
8. Se o comando não for reconhecido, siga o procedimento de falha de `.kanon/process/01-menu-map.md`: liste os comandos válidos mais próximos (a lista sai de `node .claude/scripts/kanon-help.js skills`), nunca adivinhe ou execute uma skill não correspondente.

Comando e contexto informados pelo usuário: $ARGUMENTS
