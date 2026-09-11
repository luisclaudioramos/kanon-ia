# Backend de Apoio (Node/Express)

> Referência para um backend simples/de apoio (ex.: um serviço de mock, um BFF leve) dentro de um monorepo frontend — não para o backend de produção principal de um sistema, que segue sua própria arquitetura conforme o domínio exigir.

## Stack de referência
Express + [query builder](../../boas-praticas-dev/GLOSSARIO.md#pipeline) (ex. Knex) sobre um banco relacional (ver [Banco de Dados](07-banco-de-dados.md)), autenticação stateless via JWT quando autenticação real for necessária.

## Princípios 12-Factor aplicados
- **Config**: porta, segredos, strings de conexão vêm de variáveis de ambiente, nunca hardcoded.
- **Processos stateless**: sem sessão em memória; autenticação via JWT autocontido, quando aplicável.
- **Logs**: stdout, sem arquivo de log próprio.
- **Admin/tarefas únicas**: migrations e seeds são scripts separados do processo principal, não acoplados ao boot da aplicação.

## Quando NÃO aplicar o rigor completo
Um backend de apoio para desenvolvimento/teste (mock de API, fixture de dados) não precisa do rigor de um backend de produção real — autenticação, 12-Factor completo e disciplina de migration são proporcionais ao que o backend de apoio realmente precisa garantir (dado determinístico, não segurança real). Ver [Testes E2E](10-testes-e2e.md) para o caso de uso mais comum desse tipo de backend.

## Testes
Testes de integração HTTP (ex. Supertest) contra rotas reais, banco de teste isolado do de desenvolvimento, limpo antes de cada execução.

## README
Segue [`boas-praticas-dev/06-documentacao.md`](../../boas-praticas-dev/06-documentacao.md), omitindo as seções de UI do [delta de frontend](01-workspace-monorepo.md#documentação-de-cada-pacoteapp) e com "Segurança" focado em validação de entrada dos endpoints expostos, mesmo quando é só um backend de apoio.
