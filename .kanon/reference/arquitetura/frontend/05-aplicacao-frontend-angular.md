# Aplicação Frontend (Angular)

## Estrutura
Aplicação Angular consumindo o design system, os design tokens e a iconografia — como pacotes internos do workspace ou da pasta indicada no perfil de design do sistema — não reimplementando componentes/estilos que já existem nesses pacotes. Preferir componentes standalone a NgModules em projetos novos (menos boilerplate, mais simples de fazer tree-shaking).

## Estilo e responsividade
- **Mobile first**: estilos partem do celular e crescem com `min-width` (regra D2 de [`process/16-design-foundations.md`](../../../process/16-design-foundations.md)). Nada de largura fixa em px nos contêineres.
- **Breakpoints nomeados**, referenciados a partir dos design tokens, nunca hardcoded: base a partir de 0, `md` a partir de 768, `lg` a partir de 1280, `xl` a partir de 1440 — salvo o que o perfil de design do sistema definir.
- **Larguras de conferência ≠ breakpoints**: toda tela é conferida em 390, 768 e 1920 px (regra D1), independente de onde os breakpoints caem.
- `clamp()` para tipografia fluida; unidades relativas para espaçamento.
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

## README
Segue [`boas-praticas-dev/06-documentacao.md`](../../boas-praticas-dev/06-documentacao.md) mais o [delta de frontend](01-workspace-monorepo.md#documentação-de-cada-pacoteapp) por completo — é o app final, tem rotas públicas (SEO se aplica) e é o principal consumidor de [design system](03-design-system.md)/[tokens](02-design-tokens.md)/[iconografia](04-iconografia.md).
