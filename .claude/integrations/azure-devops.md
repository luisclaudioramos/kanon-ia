---
nomes: [Azure DevOps, ADO, az repos, az devops]
capacidades: [trabalho, repositorio]
---
# Azure DevOps — adaptador

Atende as capacidades `trabalho` (work items, test plans, comentários) e `repositorio` (PRs, votos) de [`.kanon/process/17-company-profile.md`](../../.kanon/process/17-company-profile.md). Usado por `skills/16-work-tracking-publication`, `26-test-case-publication`, `34-pull-request-review`, `44-topic-enrichment`, `47-handoff-delivery` e `48-screen-validation`.

## Como conectar
MCP `azure-devops` ou CLI `az` autenticado (`az devops login`). Organização, projeto e repositório vêm do registro do projeto no repositório de conteúdo — nunca de `.kanon/`.

## Teste de conexão
`az devops project list` (ou a ferramenta equivalente do MCP) devolve o projeto do registro.

## Como publicar
- **Work items**: cria e vincula Feature → US → Task/Bug; atualiza pelo identificador, nunca duplica.
- **Test cases**: cria ou atualiza Test Plans e Suites pelo identificador existente, nunca duplica.
- **PR**: `az repos pr create` passa pelo `pr-publish-consent-gate`; threads de revisão pela conta do revisor humano.
- **Comentário de handoff**: o Azure DevOps remove comentário HTML do texto armazenado (verificado em 2026-08-31), por isso o marcador `<!-- handoff:<id> -->` não localiza comentário — a localização é pelo id gravado em `comentario_ado`.

## Caminho alternativo
API temporariamente indisponível: enfileira a sincronização pendente e reporta o atraso — nunca marca como sincronizado sem confirmação. Nunca configurado: `process/13` — orienta a configuração ou registra exceção.

## Particularidades
- Os campos de front-matter `work_item_ado` e `comentario_ado` do repositório de conteúdo são deste adaptador e mantêm o nome (ferramentas do repositório de conteúdo dependem deles).
- Escrita no work item que falha deixa a nota "pendente na ferramenta de trabalho" no registro local da skill 48.
