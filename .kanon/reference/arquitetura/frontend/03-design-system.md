# Design System

## Objetivo
Biblioteca de componentes de UI reutilizáveis, consumindo os [design tokens](02-design-tokens.md) do projeto — formaliza o que já existe e funciona no produto, não reinventa componentes do zero.

## Critério de seleção — o que entra no pacote
Nem todo componente da aplicação deve virar componente do design system:
- **Entra:** componentes genéricos, sem conhecimento de domínio de negócio (botões, cards, badges, modais estruturais, inputs, navegação, tabelas).
- **Fica na aplicação:** componentes acoplados a regras de negócio específicas — mover para um pacote compartilhado sem um segundo consumidor real força abstração prematura (`08-arquitetura-design-patterns.md`).

## Taxonomia interna: Atomic Design
Organizar por **atoms** (elementos sem composição interna: botão, input, badge) → **molecules** (combinações simples: campo de formulário = label + input + mensagem de erro) → **organisms** (composições maiores: modal estrutural, navegação). Adicionar uma camada `templates/` só se um padrão de layout de página realmente se repetir em uso.

## Estilo
Consumir os design tokens via o pré-processador/sistema de estilo que o projeto já usa (SCSS, CSS Modules, etc.) — a escolha de ferramenta de estilo (SCSS vs. Tailwind vs. CSS-in-JS) é uma decisão do projeto consumidor, não do design system; adotar aqui uma ferramenta diferente da já decidida no projeto cria dois sistemas de estilo concorrentes.

## Testes e acessibilidade
- Testes unitários de componente cobrindo variações relevantes de estado (não só o caminho feliz).
- Atributo estável para seletor de teste (ex. `data-testid`) em todo elemento interativo/relevante — evita que a suite E2E do projeto dependa de seletor de classe CSS ou estrutura DOM.
- Verificação automatizada de acessibilidade (ex. axe-core) — WCAG AA como piso: contraste, ARIA labels, navegação por teclado.

## Documentação viva
[Storybook](12-showcase-storybook.md) (ou equivalente) como catálogo navegável — cada componente ganha uma "story" demonstrando suas variações, seguindo `06-documentacao.md` ("prefira gerar documentação a partir do código").
