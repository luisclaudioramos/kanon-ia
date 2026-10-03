# Glossário

Termos específicos destes padrões. Termos gerais já cobertos por [`boas-praticas-dev/GLOSSARIO.md`](../../boas-praticas-dev/GLOSSARIO.md) (ex.: monolito, microsserviços, pipeline, staging, stateless, pr, changelog, runbook) não são repetidos aqui.

<a id="atomic-design"></a>
### Atomic Design
Metodologia de organização de componentes de UI em camadas crescentes de composição: atoms (elementos sem composição interna), molecules (combinações simples de atoms), organisms (composições maiores), templates (layouts de página).

<a id="design-token"></a>
### Design Token
Valor visual nomeado (cor, espaçamento, tipografia) que substitui um valor bruto hardcoded, permitindo trocar a decisão visual em um único lugar. Ver [Design Tokens](02-design-tokens.md).

<a id="monorepo"></a>
### Monorepo
Repositório único contendo múltiplos pacotes/aplicações relacionados, com dependências e scripts de build compartilhados — em oposição a um repositório por pacote (polyrepo).

<a id="workspace"></a>
### Workspace
Mecanismo do gerenciador de pacotes (Yarn, npm, pnpm) que permite tratar múltiplos pacotes de um monorepo como um projeto único para fins de instalação de dependências e execução de scripts.

<a id="page-object-model"></a>
### Page Object Model (POM)
Padrão de organização de testes E2E em que cada tela (ou componente reutilizável) tem uma classe dedicada que encapsula seus seletores e ações, mantendo os arquivos de teste livres de detalhes de implementação da UI.

<a id="12-factor"></a>
### 12-Factor App
Conjunto de princípios para construir aplicações backend portáveis e escaláveis (configuração via ambiente, processos stateless, logs em stdout, etc.) — ver [12factor.net](https://12factor.net/).

<a id="ssr"></a>
### SSR (Server-Side Rendering)
Técnica em que o HTML de uma página é renderizado no servidor antes de chegar ao navegador, melhorando SEO e tempo de carregamento percebido, em contraste com renderização só no cliente.

<a id="breakpoint"></a>
### Breakpoint
Largura a partir da qual o layout muda (ex.: `md` a partir de 768 px). Definido nos design tokens e no perfil de design do sistema.

<a id="mobile-first"></a>
### Mobile first
Forma de escrever estilos que parte do celular e acrescenta regras para telas maiores com `min-width`.

<a id="largura-de-conferencia"></a>
### Largura de conferência
Largura em que toda tela é validada e testada: 390, 768 e 1920 px. Não é breakpoint.

<a id="prancha"></a>
### Prancha
Imagem única com a mesma tela em 390, 768 e 1920 px lado a lado, usada para validar e comparar telas.

<a id="padrao-por-funcao"></a>
### Padrão por função
Aparência combinada para um elemento com a mesma função em todas as telas (ex.: ação primária: componente, cor, tamanho e ícone), registrada no perfil de design.

<a id="bug-visual"></a>
### Bug visual
Defeito de interface que o usuário enxerga (divergência entre telas, tela quebrada no celular, falta de contraste). Vira bug no work item.

<a id="oportunidade-tecnica"></a>
### Oportunidade técnica
Melhoria interna invisível ao usuário (valor fixo igual a um token, componente duplicado). Fica no inventário do perfil de design.
