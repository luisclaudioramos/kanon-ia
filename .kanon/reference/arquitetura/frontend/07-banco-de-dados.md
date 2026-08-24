# Banco de Dados

## Escolha do motor pelo propósito, não por padrão
- **Postgres/MySQL via Docker Compose** — quando o objetivo é paridade com o banco de produção real (testes de integração de maior fidelidade, desenvolvimento local que precisa se comportar como produção).
- **SQLite em arquivo** — quando o objetivo é dado determinístico para fixture/teste, sem necessidade de paridade com o motor de produção. Evita dependência de infraestrutura (Docker rodando) só para popular dados de teste. Ver [Testes E2E](10-testes-e2e.md) para o caso mais comum.

Usar um [query builder](../../boas-praticas-dev/GLOSSARIO.md#design-pattern) (ex. Knex) como camada de abstração torna a troca de motor uma mudança de configuração de conexão, não uma reescrita de código de acesso a dado — vale adotar mesmo quando a escolha inicial é SQLite, para manter a porta aberta.

## Docker Compose (quando o motor real é necessário)
Container com variáveis de ambiente parametrizadas (usuário/senha/nome de banco via `.env`, nunca hardcoded), volume nomeado para persistir dados entre reinícios, `healthcheck` para que outros serviços (backend, CI) esperem o banco estar pronto antes de conectar.

## Scripts de gerenciamento
Padronizar comandos simples (`db:up`, `db:down`, `db:reset`) que encapsulam a interação com o Docker Compose ou com o script de seed — evita que cada desenvolvedor precise lembrar o comando completo.

## Migrations e seeds
Migrations versionadas descrevem o schema incrementalmente; seeds populam dados — nunca o inverso (não usar seed para alterar schema). Seeds de ambiente de teste nunca geram segredo (ex. hash de senha) em tempo de execução — usar um valor pré-gerado, para reprodutibilidade.
