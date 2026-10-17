---
nomes: [GLPI]
capacidades: [mudanca]
---
# GLPI — adaptador

Atende a capacidade `mudanca` de [`.kanon/process/17-company-profile.md`](../../.kanon/process/17-company-profile.md). Usado pela triagem de `skills/32-report-bug` (perguntas 5 e 6) para ler o que mudou em produção, e pelo acompanhamento de mudança. Perfil de acesso, formato do anúncio e fechamento ficam no perfil da empresa.

## Como conectar
Preferido: API REST (`/apirest.php`), que exige **dois** tokens: o `app_token` do cliente de API (cadastrado por um administrador do GLPI) e o token do usuário (ou usuário e senha). Sem `app_token`, a sessão da pessoa no navegador.

## Teste de conexão
`GET /apirest.php/initSession` com o `app_token` e a credencial → `session_token`; encerrar com `killSession`. Resposta `ERROR_APP_TOKEN_PARAMETERS_MISSING` = falta o cliente de API.

## Como consultar
Em ordem de preferência:
1. **API**: `GET /apirest.php/Change?range=0-20&order=DESC` e `GET /apirest.php/Change/<id>` para a mudança, data e itens; buscar pelo título ou pela data.
2. **Navegador com a sessão de uma pessoa**, no perfil que vê Mudanças.
3. **Uma pessoa** informa as mudanças da janela.
4. Quando a mudança é criada pela esteira (workflow de mudança no repositório), o registro da execução do workflow liga o merge ao número da mudança ([`github.md`](github.md)).

## Restrições de acesso
- Sem `app_token`, nada pela API: pedir o cadastro ao administrador do GLPI.
- O perfil padrão do usuário pode não ver Mudanças; trocar de perfil é ação da pessoa.
- Mudar estado, aprovar ou fechar mudança é escrita: só com pedido explícito.

## Caminho alternativo
Caminhos 2 a 4. Nunca configurado: `process/13`.
