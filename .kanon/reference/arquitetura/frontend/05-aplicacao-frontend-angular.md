# Aplicação Frontend (Angular)

## Estrutura
Aplicação Angular consumindo o design system, os design tokens e a iconografia do workspace como pacotes internos — não reimplementando componentes/estilos que já existem nesses pacotes. Preferir componentes standalone a NgModules em projetos novos (menos boilerplate, mais simples de fazer tree-shaking).

## Estilo e responsividade
- Definir breakpoints explícitos e nomeados (ex. `xs`/`sm`/`md`/`lg`/`xl`) referenciados a partir dos design tokens, não hardcoded na aplicação.
- Mobile-first; `clamp()` para tipografia fluida; unidades relativas para espaçamento.
- A ferramenta de estilo (SCSS, Tailwind, etc.) é a mesma decidida para o [design system](03-design-system.md) — nunca duas ferramentas concorrentes no mesmo produto.

## Performance
- Lazy loading por rota; `loading="lazy"` em imagens abaixo da dobra.
- `OnPush` change detection como default em componentes novos.
- Orçamento de bundle (`budgets` no `angular.json`) configurado para de fato disparar em CI — um orçamento alto demais para nunca disparar equivale a não ter orçamento.

## SEO (quando a rota é pública/indexável)
Meta tags dinâmicas (`Meta`/`Title` do Angular), dados estruturados via JSON-LD, tags semânticas e `alt` em imagens, URLs canônicas. Rotas atrás de autenticação não precisam dessas otimizações.

## 12-Factor aplicado ao frontend
Configuração de ambiente (URLs de API, feature flags) injetada no momento do build via variáveis de ambiente, nunca hardcoded ou commitada como segredo — ver [Ambientes e Branches](08-ambientes-e-branches.md).

## Testes
Unitários com o runner que o projeto já usa (Vitest, Karma/Jasmine); comportamento observável pelo usuário, não detalhe de implementação interna (`03-testes.md`).
