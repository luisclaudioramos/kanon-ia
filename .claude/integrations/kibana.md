---
nomes: [Kibana]
capacidades: [observabilidade]
---
# Kibana — adaptador

Atende a capacidade `observabilidade` de [`.kanon/process/17-company-profile.md`](../../.kanon/process/17-company-profile.md). Usado pela triagem de `skills/32-report-bug` (perguntas 2 e 5), por `skills/14-qa-validation` e na sustentação. Endereços, índices e filtros por sistema ficam em `<empresa>/kanon/investigacao.md`; usuário e senha no `.env` da empresa.

## Como conectar
Usuário e senha de leitura no `.env` da empresa, um par por ambiente. A API aceita autenticação básica (`curl -u`), sem login no navegador.

## Teste de conexão
`GET <kibana>/api/status` com autenticação básica → `200`. `302` sem autenticação mostra só que a rede alcança o endereço.

## Como consultar
Em ordem de preferência:
1. **API, sem depender de pessoa**: `POST <kibana>/api/console/proxy?path=<índice>/_search&method=POST` com `kbn-xsrf: true` e o corpo de busca do Elasticsearch (`_count` para contar). Filtrar por `@timestamp` (janela do relato), pelo serviço e pelo identificador do caso. A evidência é o filtro, a janela e o total, mais os campos que provam o ponto, sem dado pessoal.
2. **Navegador com a sessão de uma pessoa** (Discover): quando a busca precisa ser mostrada ou a credencial de API não está disponível. Não encerrar a sessão nem mexer na rede enquanto a pessoa estiver logada.
3. **Uma pessoa roda a consulta** escrita pela skill (KQL ou corpo de busca) e devolve o total e o print.

Para o que não chega ao Elastic (falha antes de a instrumentação iniciar, log de inicialização do processo): ver o adaptador [`kubernetes.md`](kubernetes.md), `kubectl logs`.

## Restrições de acesso
- Endereço em rede privada: só responde com a VPN da empresa ligada. Sem ela, a página pode abrir do cache e o login falha por tempo esgotado.
- Certificado assinado por uma CA interna da empresa, fora da cadeia padrão das ferramentas de linha de comando: aponte para o certificado da CA (`curl --cacert <ca-da-empresa>`; o caminho fica no perfil da empresa). Não use `curl -k`/`--insecure`: ele aceita qualquer certificado e esconde um intermediário falso. O pacote de certificados do sistema só resolve se a CA interna tiver sido incorporada a ele.
- Produção: só leitura e só com pedido explícito (regra da triagem da `skills/32-report-bug`).
- Retenção limitada: ocorrência mais antiga que a retenção do índice não aparece; registrar "fora da retenção", não "não ocorreu".

## Caminho alternativo
VPN ou credencial indisponível: caminho 3 (pessoa roda). Nunca configurado: `process/13`.
