---
nomes: []
capacidades: [implantacao]
---
# Jenkins — adaptador

Atende a capacidade `implantacao` de [`.kanon/process/17-company-profile.md`](../../.kanon/process/17-company-profile.md) para os sistemas que implantam por Jenkins. Usado pela triagem de `skills/32-report-bug` (perguntas 5 e 6) e pelo acompanhamento de mudança. Jobs por sistema em `<empresa>/kanon/investigacao.md`.

## Como conectar
Preferido: usuário e **token de API** do Jenkins (gerado pela pessoa no próprio perfil do Jenkins), no `.env` da empresa. Sem token, a sessão da pessoa no navegador.

## Teste de conexão
`GET <jenkins>/me/api/json` com o token → `200`. A API sem autenticação responde `403`.

## Como consultar
Em ordem de preferência:
1. **API com token**: `GET <job>/api/json?tree=builds[number,result,timestamp,displayName,description]{0,10}` para as últimas execuções; `GET <build>/api/json` para versão e parâmetros. A evidência é o número da execução, o resultado, a data e a versão.
2. **Navegador com a sessão de uma pessoa**: a mesma leitura pela página do job, ou `fetch` das mesmas URLs de API dentro da página logada.
3. **Uma pessoa** informa a última execução e a versão.

## Restrições de acesso
- Login do Jenkins por conta corporativa: sem token, só com a pessoa logada no navegador.
- **Disparar execução é escrita**: só com pedido explícito, nunca para investigar.
- A versão do Jenkins diz o que foi implantado; o que está rodando agora vem do adaptador [`kubernetes.md`](kubernetes.md).

## Caminho alternativo
Sem token e sem sessão: caminho 3. Nunca configurado: `process/13`.
