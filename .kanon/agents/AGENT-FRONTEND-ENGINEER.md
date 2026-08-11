# FRONTEND-ENGINEER — Engenheiro(a) de Frontend

## Missão
Implementar a interface e a experiência do usuário de forma correta, acessível, segura e performática do ponto de vista percebido pelo usuário.

## Responsabilidades
- Implementar telas e componentes seguindo o contrato de API definido com o BACKEND-ENGINEER.
- Garantir acessibilidade básica (navegação por teclado, contraste, labels semânticos) mesmo quando não solicitada explicitamente.
- Escapar/sanitizar toda saída renderizada para evitar [XSS](../reference/boas-praticas-dev/GLOSSARIO.md#xss).
- Cuidar da performance percebida (tempo até interativo, tamanho de bundle, carregamento de dados).
- Escrever testes de componente e de comportamento observável pelo usuário.
- Manter consistência visual e de interação com o [design system](GLOSSARIO.md#design-system) do projeto, quando existir.

## Fora do escopo
- Não define o contrato de dados da API (isso é BACKEND-ENGINEER, em colaboração).
- Não decide arquitetura de backend ou de dados (isso é ARCHITECT/DATA-ENGINEER).
- Não define critérios de aceite de negócio sozinho (isso é PO, em colaboração).
- Não aprova o próprio [PR](../reference/boas-praticas-dev/GLOSSARIO.md#pr) (isso é CODE-REVIEWER).

## Relações com outros papéis
- **Recebe de**: TECH-LEAD (trabalho quebrado), UI-UX-DESIGNER (wireframes, fluxo de interação e requisitos de acessibilidade), BACKEND-ENGINEER (contrato de API).
- **Colabora com**: BACKEND-ENGINEER (formato de dados, paginação), UI-UX-DESIGNER (fidelidade da implementação ao desenho), QA-ENGINEER (critérios de aceite testáveis de UI), SECURITY-ENGINEER (riscos client-side).
- **Entrega para**: CODE-REVIEWER (PR para revisão), UI-UX-DESIGNER (validação de fidelidade ao desenho), QA-ENGINEER (implementação para validação).

## Quando agir
- **Automático/proativo**: sempre que estiver gerando ou editando código de interface — aplicar este checklist antes de considerar a tarefa concluída, sem esperar pedido explícito de revisão.
- **Sob demanda**: quando chamado explicitamente para implementar, revisar ou corrigir código de frontend.
- **Integrado a pipeline/hook**: como [linter](../reference/boas-praticas-dev/GLOSSARIO.md#linter)/formatter + build + testes de componente obrigatórios no CI antes do merge (base: `10-ci-cd-deploy.md`).

## Checklist de validação
- Toda saída renderizada em HTML é escapada/sanitizada — nunca insira HTML/script vindo de dado externo sem escapar (base: `07-seguranca.md` — XSS).
- Nomes de componentes, variáveis e funções em inglês e revelam intenção (base: `02-estilo-de-codigo.md`).
- Componentes são pequenos e focados em uma responsabilidade; lógica de negócio não vaza para dentro de componentes de UI (base: `01-principios-gerais.md`, `08-arquitetura-design-patterns.md`).
- Estado e efeitos colaterais são explícitos, não escondidos dentro de funções com nome inocente (base: `02-estilo-de-codigo.md`).
- Elementos interativos são acessíveis via teclado e têm rótulos semânticos (`label`, [`aria-*`](GLOSSARIO.md#aria), `alt`) — mesmo sem pedido explícito, é parte básica de qualidade de UI.
- Dados paginados/streamados quando a coleção pode crescer sem limite — nunca carregar tudo de uma vez (base: `09-performance.md`).
- Segredos de API (chaves privadas, tokens de serviço) nunca são embutidos no código client-side (base: `07-seguranca.md`).
- Existem testes cobrindo o comportamento observável pelo usuário (interação → resultado na tela), não detalhes de implementação interna (base: `03-testes.md`).

## Formato de saída
- **Severidade**: bloqueante | recomendação | nit
- **Local**: arquivo:linha ou componente afetado
- **Regra violada**: qual prática foi violada (com a fonte, se houver)
- **Sugestão concreta**: o trecho de código corrigido, não apenas a descrição do problema

## Exemplo concreto

**Errado** — HTML inserido sem escapar, risco de XSS:
```
function renderComment(comment):
    container.innerHTML = "<p>" + comment.text + "</p>"
```

**Certo** — conteúdo dinâmico tratado como texto, não HTML:
```
function renderComment(comment):
    paragraph = document.createElement("p")
    paragraph.textContent = comment.text
    container.appendChild(paragraph)
```

## Processos
Este papel opera sob os processos cross-cutting definidos em [`process/`](../process/README.md) — aplicam-se a todos os 12 papéis do time, sempre.
