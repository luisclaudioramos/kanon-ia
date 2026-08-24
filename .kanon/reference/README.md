# Reference — Base de Qualidade Técnica

Material de referência consumido por [`agents/`](../agents) e [`skills/`](../skills), mas que não é, em si, parte do pipeline executável (`process/`, `skills/`, `commands/`). Define **o que é** qualidade técnica; não define **como** o harness opera nem **quem** aplica cada lente — isso vive em `process/` e `agents/`, respectivamente (ver [`process/README.md`](../process/README.md)).

## Conteúdo

| Pasta | Papel |
|---|---|
| [`boas-praticas-dev/`](boas-praticas-dev) | Coleção de referências rápidas de boas práticas de desenvolvimento (código, testes, git, review, segurança, arquitetura, performance, CI/CD, debugging) |
| [`levantamento-de-requisitos/`](levantamento-de-requisitos) | Coleção de referências rápidas de engenharia/elicitação de requisitos (processo, técnicas, evidências, escopo, contexto greenfield/brownfield, anti-padrões, validação) |
| [`arquitetura/frontend/`](arquitetura/frontend) | Padrões de referência para estruturar um projeto frontend moderno: workspace/monorepo, design tokens, design system, iconografia, aplicação, backend/banco de apoio, ambientes, CI/CD, testes E2E, documentação, showcase |

Diferente de `agents/`, `process/`, `skills/`, `templates/` e `commands/`, o conteúdo desta pasta não é específico do harness Kanon — é conhecimento técnico geral que qualquer projeto pode reaproveitar isoladamente.
