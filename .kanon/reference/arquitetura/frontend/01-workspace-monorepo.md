# Workspace e Monorepo

## Quando usar um monorepo
Faz sentido quando o projeto vai ter mais de um pacote publicável/reutilizável (design system, tokens, iconografia) e/ou mais de um app consumindo esses pacotes, com times que precisam evoluí-los juntos. Um projeto de app único, sem pacotes compartilhados, não precisa de workspace — YAGNI.

## Ferramenta de gerenciamento

| Ferramenta | Quando escolher |
| --- | --- |
| **Yarn Workspaces** | Default — resolve dependências compartilhadas e scripts entre pacotes sem overhead adicional. Suficiente para a maioria dos monorepos de time pequeno/médio. |
| **Turborepo** | Quando o tempo de build começa a doer (cache local/remoto, execução paralela por grafo de dependência) — adicionar por cima do Yarn Workspaces, não no lugar dele. |
| **Nx** | Quando o monorepo cresce o suficiente para precisar de geração de código, análise de grafo de dependência avançada e plugins por stack — maior curva de aprendizado, só compensa em escala real. |

Não adicione Turborepo/Nx antes de sentir a dor que eles resolvem (cache de build lento, builds redundantes) — complexidade de tooling proporcional ao problema real, mesmo princípio de `01-principios-gerais.md`.

## Estrutura de diretórios de referência

```
<raiz>/
├── packages/       # pacotes publicáveis/reutilizáveis (design tokens, design system, iconografia, etc.)
├── apps/           # aplicações finais (frontend, docs, showcase)
├── tools/          # ferramentas de suporte ao desenvolvimento (e2e, scripts)
└── infrastructure/ # Docker, Kubernetes, Terraform — sem package.json próprio
```

Workspaces globais recomendados no `package.json` raiz: `["packages/*", "apps/*", "tools/*"]`.

## Convenção de nomes de pacote

Pacotes reutilizáveis usam um escopo compartilhado (`@<organizacao-ou-projeto>/<pacote>`), versão semântica própria — não lockstep com a versão do(s) app(s) consumidor(es). Apps e ferramentas internas são `"private": true`, sem escopo.

## Ferramentas de qualidade na raiz

Prettier + ESLint (flat config) + Husky + lint-staged, configurados uma vez na raiz e aplicados a todos os workspaces via hook de pré-commit. Scripts padronizados na raiz (`build`, `lint`, `format`, `dev`) que delegam para os workspaces (`yarn workspaces foreach` ou equivalente da ferramenta escolhida), em vez de cada pacote reinventar seu próprio pipeline de qualidade.

## Node e package manager

Fixar a versão do Node via `engines` no `package.json` raiz e via `packageManager` (Yarn 4+, ativado por `corepack`) — evita divergência de versão entre máquinas e CI.
