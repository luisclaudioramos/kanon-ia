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
- **Feature e User Story, com a trava de publicação** ([`.kanon/process/18-work-item-publication-gate.md`](../../.kanon/process/18-work-item-publication-gate.md)): o pacote passa por `node .claude/scripts/kanon-publicacao.js <pacote.json>` antes de qualquer escrita. Recusado, nenhuma chamada de escrita é feita. Aprovado, a publicação segue esta ordem (REST 7.1):
  1. Upload de cada anexo e de cada diagrama (PNG gerado do Mermaid) em `_apis/wit/attachments?fileName=<nome>`; troca `{{ATT:nome}}` e `{{DIAGRAM:nome}}` da descrição pela `url` devolvida (`<url>?fileName=<nome>` nos anexos; imagem `![...](<url>)` nos diagramas). Depois da troca, não pode sobrar nenhum `{{ATT:` nem `{{DIAGRAM:`.
  2. Um único PATCH (`application/json-patch+json`) que começa com `{"op":"test","path":"/rev","value":<rev lida>}`, para não sobrescrever edição feita por outra pessoa no meio do caminho, e traz:
     - `/multilineFieldsFormat/System.Description` = `Markdown` e, na User Story, `/multilineFieldsFormat/Microsoft.VSTS.Common.AcceptanceCriteria` = `Markdown`;
     - `System.Title`, `System.Description`, `Microsoft.VSTS.Common.AcceptanceCriteria` (User Story), `System.Tags`, `System.AssignedTo`;
     - `Microsoft.VSTS.Scheduling.Effort` (SP) e `System.IterationPath` só quando o pacote traz valor; vazios com motivo ficam sem a operação, e o motivo vai para o resumo;
     - `Microsoft.VSTS.Common.Priority` e `Microsoft.VSTS.Common.ValueArea` quando o modelo do time os preenche;
     - uma relação `AttachedFile` por anexo (`attributes.name` = nome do anexo).
  3. User Story nova: `POST _apis/wit/workitems/$User%20Story` com a relação `System.LinkTypes.Hierarchy-Reverse` apontando para a Feature.
  4. Confere a resposta (revisão nova, tags, responsável, anexos) e registra no resumo da publicação.
- **Token**: `az account get-access-token --resource 499b84ac-1321-427f-aa17-267ca6975798`, guardado só durante a sessão, fora do repositório. Com VPN de túnel corporativo ligada, o `az` falha com `CERTIFICATE_VERIFY_FAILED`: exportar `REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt` em vez de desligar a VPN, que outras sessões podem estar usando.
- **Test cases**: cria ou atualiza Test Plans e Suites pelo identificador existente, nunca duplica.
- **PR**: `az repos pr create` passa pelo `pr-publish-consent-gate`; threads de revisão pela conta do revisor humano.
- **Comentário de handoff**: o Azure DevOps remove comentário HTML do texto armazenado (verificado em 2026-08-31), por isso o marcador `<!-- handoff:<id> -->` não localiza comentário — a localização é pelo id gravado em `comentario_ado`.

## Como consultar
Usado pela triagem de `skills/32-report-bug` (perguntas 1, 3 e 6). Em ordem de preferência:
- **Work item e regra** (pergunta 1): `az boards query --wiql "<WIQL>"` e `az boards work-item show --id <id>`, ou o REST `_apis/wit/workitems?ids=<ids>&$expand=all`. O MCP é a primeira opção quando carregou na sessão.
- **PR e histórico** (pergunta 6): `az repos pr list/show` e `az devops invoke --area git --resource pullRequestThreads|pullRequestIterations`.
- **Código** (pergunta 3): a cópia local registrada em `<empresa>/kanon/investigacao.md`, com `git fetch`; o MCP de repositório só quando não há cópia.

## Restrições de acesso
- O MCP só carrega no início da sessão; se falhou, usar o `az`, sem tentar religar.
- As ferramentas de repositório do MCP já caíram para a organização inteira enquanto as de work item funcionavam: antes de depender delas, um teste barato (`repo_repository action=list`) num repositório conhecido.
- Alguns repositórios não são legíveis pela identidade do `az` (`TF401019`): pedir a cópia local ou o acesso, sem insistir.
- VPN ligada: `REQUESTS_CA_BUNDLE` (ver Token, acima).

## Caminho alternativo
API temporariamente indisponível: enfileira a sincronização pendente e reporta o atraso — nunca marca como sincronizado sem confirmação. Nunca configurado: `process/13` — orienta a configuração ou registra exceção.

## Particularidades
- Os campos de front-matter `work_item_ado` e `comentario_ado` do repositório de conteúdo são deste adaptador e mantêm o nome (ferramentas do repositório de conteúdo dependem deles).
- Escrita no work item que falha deixa a nota "pendente na ferramenta de trabalho" no registro local da skill 48.
