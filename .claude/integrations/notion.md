---
nomes: [Notion]
capacidades: [documentacao]
---
# Notion — adaptador

Atende a capacidade `documentacao` de [`.kanon/process/17-company-profile.md`](../../.kanon/process/17-company-profile.md). Usado por `skills/21-documentation-publication`.

## Como conectar
Integração do Notion com token na configuração do ambiente, nunca em `.kanon/`; a integração precisa ser convidada para as páginas onde vai publicar.

## Teste de conexão
Buscar uma página conhecida do espaço de documentação; não encontrar = integração sem acesso.

## Como publicar
- Cria páginas estruturadas com os modelos de `.kanon/templates/documentacao/` e atualiza o banco de documentação central do time.
- Só publica artefato em estado `aprovado` ou posterior — nunca um rascunho (`refinado`).

## Caminho alternativo
Nunca configurado: `process/13` — orienta a configuração e só aceita pular com exceção explícita e registrada.
