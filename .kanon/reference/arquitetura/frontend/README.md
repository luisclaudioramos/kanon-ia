# Arquitetura de Referência — Projeto Frontend Moderno

Coleção de padrões de referência para estruturar um projeto frontend moderno do zero ou incrementalmente: workspace/monorepo, design tokens, design system, iconografia, aplicação, testes e entrega contínua. Complementa [`boas-praticas-dev/`](../../boas-praticas-dev) (que é agnóstico de stack) com decisões mais concretas de estruturação de projeto — ainda genéricas, não específicas de nenhum produto.

## Índice

### Fundação de projeto
1. [Workspace e Monorepo](01-workspace-monorepo.md)
8. [Ambientes e Branches](08-ambientes-e-branches.md)

### Design
2. [Design Tokens](02-design-tokens.md)
3. [Design System](03-design-system.md)
4. [Iconografia](04-iconografia.md)

### Implementação
5. [Aplicação Frontend (Angular)](05-aplicacao-frontend-angular.md)
6. [Backend de Apoio (Node/Express)](06-backend-node.md)
7. [Banco de Dados](07-banco-de-dados.md)

### Qualidade e Entrega
9. [CI/CD](09-ci-cd.md)
10. [Testes E2E](10-testes-e2e.md)

### Conhecimento
11. [Documentação do Projeto](11-documentacao-do-projeto.md)
12. [Showcase de Componentes (Storybook)](12-showcase-storybook.md)

### Referência
- [Glossário](GLOSSARIO.md) — termos específicos destes padrões. Termos já cobertos pelo glossário de [`boas-praticas-dev/`](../../boas-praticas-dev/GLOSSARIO.md) são linkados diretamente lá.

## Como usar

Cada arquivo descreve um padrão isolado — estrutura de diretórios, decisões e trade-offs — não um passo a passo de comandos a executar. Use como ponto de partida ao estruturar um projeto novo, ou como checklist de revisão ao avaliar se a estrutura de um projeto existente se desviou sem motivo registrado. Toda decisão aqui é **default recomendado**, não regra rígida — a proporcionalidade ao problema e ao time (`01-principios-gerais.md`) continua valendo: adote cada peça só quando o projeto real precisar dela.

## Relação com `agents/` e `skills/`

Referenciado principalmente por [`AGENT-ARCHITECT`](../../../agents/AGENT-ARCHITECT.md) (estrutura de workspace, design system) e [`AGENT-SRE`](../../../agents/AGENT-SRE.md) (CI/CD, ambientes), e pela skill [`04-architecture-assessment`](../../../skills/04-architecture-assessment/SKILL.md) ao avaliar alternativas de estruturação de um projeto frontend novo.
