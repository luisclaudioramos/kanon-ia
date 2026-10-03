# Design Tokens

## Objetivo
Fonte única de verdade para cor, tipografia, espaçamento, raio de borda e elevação — evita que o mesmo valor visual seja hardcoded e duplicado em múltiplos lugares (CSS, SCSS, JS), com risco real de divergir com o tempo.

## Hierarquia de camadas

- **Primitives** — valores brutos (`color.blue-500`, `spacing.4`). Nunca usados diretamente em componentes.
- **Semantic** — tokens contextuais que referenciam primitives (`color.background` → `primitives.color.dark-900`, `color.cta` → `primitives.color.accent-500`). É a camada que componentes de fato consomem — desacopla o uso do valor bruto, permitindo trocar a paleta sem caçar cada uso direto.
- **Component** (opcional) — overrides específicos de um componente, só quando um componente realmente precisar de um valor que a camada semantic não cobre. Não crie essa camada antecipadamente — YAGNI.

Se o produto não tem múltiplos temas (ex.: é dark-only ou light-only), não crie variantes de tema nos tokens semânticos — tema múltiplo é uma decisão de produto, não um default de arquitetura.

## Começando sem tokens

Projeto que ainda não tem tokens não precisa de ferramenta para começar. O primeiro passo é transformar em CSS custom properties (`--color-primary`, `--spacing-4`) os valores que a regra D3 de [`process/16-design-foundations.md`](../../../process/16-design-foundations.md) aponta como repetidos — a cor que aparece 14 vezes, o espaçamento que aparece 30. Cada valor extraído vira um token semântico na hora; a camada de primitives e o motor de build entram quando a quantidade de tokens justificar.

## Motor de build

Ferramentas como [Style Dictionary](https://amzn.github.io/style-dictionary/) geram múltiplos formatos de saída (CSS custom properties, variáveis SCSS, módulo JS) a partir de uma única definição JSON — evita manter os 3 formatos sincronizados manualmente. Alternativa: escrever CSS custom properties à mão quando o projeto for pequeno o bastante para não justificar a ferramenta.

## Estrutura de referência

```
packages/design-tokens/
  src/
    primitives/
    semantic/
  build/          # gerado — css/, scss/, js/
```

## README

Segue [`boas-praticas-dev/06-documentacao.md`](../../boas-praticas-dev/06-documentacao.md), omitindo explicitamente as seções de UI ([delta de frontend](01-workspace-monorepo.md#documentação-de-cada-pacoteapp)) — este pacote não expõe interface, só dados.
