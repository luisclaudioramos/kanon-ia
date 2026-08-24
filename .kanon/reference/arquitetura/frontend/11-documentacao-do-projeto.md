# Documentação do Projeto

## Estrutura de referência
Site de documentação (ex. Docusaurus, ou equivalente) cobrindo, no mínimo: visão geral e arquitetura, guia de instalação/execução local, catálogo de design tokens/design system, estratégia de testes, CI/CD e ambientes. Gerado a partir de arquivos versionados junto ao código, não mantido separadamente num wiki externo desconectado do repositório (`06-documentacao.md` — "mantenha docs próximas ao código").

## Quando vale o investimento
Um site de documentação dedicado compensa quando o projeto tem múltiplos pacotes/consumidores (monorepo com reuso real) ou múltiplos times consumindo a mesma base — para um projeto único e pequeno, um `README.md` bem mantido já cobre a necessidade, sem o overhead de manter um site à parte.
