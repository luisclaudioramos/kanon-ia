---
nomes: [WebStorm, SQLPad]
capacidades: [dados]
---
# Banco de dados (WebStorm e alternativas) — adaptador

Atende a capacidade `dados` de [`.kanon/process/17-company-profile.md`](../../.kanon/process/17-company-profile.md). Usado pela triagem de `skills/32-report-bug` (perguntas 4 e 5), por `skills/13-code-review` (auditoria de banco) e por `skills/44-topic-enrichment`. Identificadores de conexão, bases e versões ficam em `<empresa>/kanon/investigacao.md`; credenciais no `.env` da empresa ou na própria ferramenta.

## Como conectar
Conexões cadastradas no WebStorm como **somente leitura**, lidas pelo MCP do WebStorm (`execute_sql_query`, `test_database_connection`), sempre com o `projectPath` do projeto onde as conexões estão.

## Teste de conexão
`test_database_connection` com o id da conexão → sem problemas. "Não há rota para o host" = rede (VPN), não credencial.

## Como consultar
Em ordem de preferência:
1. **MCP do WebStorm**, conexão somente leitura: só `SELECT`, `SHOW` e `information_schema`; consulta agregada sempre que possível.
2. **Cliente de linha de comando num contêiner descartável** (`docker --context default run --rm mysql:<versão> mysql …`), com a credencial de leitura do `.env` passada por variável de ambiente, nunca na linha de comando. Serve também para validar script de migração contra a DDL real (`SHOW CREATE TABLE`) nas versões de cada ambiente.
3. **Proxy de banco gerenciado na nuvem** (`cloud-sql-proxy`), quando o banco é gerenciado e a rede privada não alcança: exige login interativo da pessoa no provedor e permissão de cliente no projeto. Não resolve quando a instância só tem IP privado: o proxy usa a mesma rota que falta.
4. **Uma pessoa roda a consulta** escrita pela skill na ferramenta de produção dela (ex.: SQLPad) e devolve o resultado.

## Restrições de acesso
- Banco em rede privada: só com a VPN ligada, e a rota pode mudar quando o banco migra; o teste de conexão vem antes de qualquer consulta.
- Produção: só leitura e só com pedido explícito. Escrita em produção nunca é feita pela skill: vai como script para a pessoa rodar, um comando por vez.
- Consulta longa: o MCP desiste por volta de 60 s, mas a consulta continua no servidor. Acompanhe pelo `information_schema.processlist`. O `cancel_sql_query` só acha a sessão que o próprio MCP abriu, não o id do `processlist`; e `KILL QUERY` é ação sobre recurso compartilhado, que a skill não executa. Se for preciso parar, peça à pessoa que cancele no WebStorm. Senão, deixe terminar e não repita a consulta enquanto ela roda.
- Antes de consulta pesada em produção: `EXPLAIN` com índice em todas as junções não garante menos de 60 s. Em tabela grande, rode antes uma fatia (um status, um período ou `LIMIT`) e meça; só então rode o resto, em partes.
- Colunas com segredo (cadeia de conexão, token) nunca entram no `SELECT`. Documento e nome de cliente ficam fora da evidência.

## Caminho alternativo
Rede ou credencial indisponível: caminho 4. Nunca configurado: `process/13`.
