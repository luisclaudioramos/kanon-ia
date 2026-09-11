# Iconografia

## Objetivo
Registro centralizado de ícones SVG e um componente que os renderiza de forma consistente e acessível — evita ícones inline duplicados/inconsistentes espalhados pela aplicação.

## Contrato de acessibilidade
- `aria-hidden="true"` por padrão (ícone puramente decorativo, quando já há texto adjacente que o descreve).
- `role="img"` + `aria-label` quando o ícone carrega significado próprio, sem texto ao lado.
- Cor via `currentColor` — herda do elemento pai, permitindo que os [design tokens](02-design-tokens.md) controlem a cor pelo contexto, sem prop de cor redundante no componente de ícone.
- Tamanho via input explícito do componente, não via `font-size` implícito — mais previsível para quem consome.

## Estrutura de referência
Separar o registro de ícones (mapa nome→SVG, independente de qualquer framework) do componente que os consome (ex. `<ui-icon name="...">` no framework do projeto) — permite trocar o framework de UI sem reescrever o catálogo de ícones em si.

## Antes de catalogar
Levantar o inventário real de ícones em uso na aplicação antes de desenhar a forma final do registro — cada projeto acumula um conjunto próprio de ícones ao longo do tempo, geralmente sem inventário formal existente.

## README
Segue [`boas-praticas-dev/06-documentacao.md`](../../boas-praticas-dev/06-documentacao.md); do [delta de frontend](01-workspace-monorepo.md#documentação-de-cada-pacoteapp), "SEO" fica omitido (não há página/rota) e "Acessibilidade" se restringe ao contrato acima, não ao checklist completo de uma tela.
