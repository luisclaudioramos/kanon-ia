# Testes E2E

## Padrão: Page Object Model (POM)
Cada tela/página tem uma classe que encapsula seletores e ações; componentes reutilizáveis (header, dialogs, cards) têm seus próprios Page Objects. Os specs nunca acessam seletores diretamente — sempre via Page Object. Page Objects nunca fazem asserções — isso é responsabilidade do teste.

```
tools/e2e/
  pages/            # Page Objects (uma classe por tela)
    components/     # Page Objects de componentes reutilizáveis
  specs/            # specs agrupados por feature/domínio
  fixtures/         # setup compartilhado (autenticação, dados)
```

## Seletores: sempre um atributo estável
Usar um atributo dedicado a teste (`data-testid` ou equivalente) como seletor principal — nunca classe CSS, ID de estilo ou posição na estrutura DOM (`nth-child`). Evita que uma mudança visual quebre o teste sem mudar o comportamento.

## Evitar espera fixa
Preferir espera pela condição real (elemento visível, resposta de rede) a `waitForTimeout(N)` — espera fixa é a causa mais comum de teste instável (flaky) em CI.

## Dados de teste: seeding, não seleção em tempo de requisição
Quando a suite depende de um backend de apoio (mock-api), preferir **popular o estado antes do teste rodar** (seed determinístico — ver [Backend de Apoio](06-backend-node.md) e [Banco de Dados](07-banco-de-dados.md)) a mecanismos de seleção de cenário em tempo de requisição (header customizado, query string, estado global mutável no servidor). Seeding evita que o backend de apoio precise de qualquer rota exclusiva de teste misturada ao seu formato de negócio, e elimina o risco de o mecanismo de seleção vazar conceitualmente para código de produção.

Concorrência é a variável que decide a complexidade dessa abordagem: com a suite rodando serial (um único worker), um único banco de fixtures compartilhado, resetado a cada teste, é suficiente. Com execução paralela, cada worker precisa de sua própria instância/arquivo de dados isolado — decisão a ser tomada quando a paralelização for adotada, não antes.

## Padrão AAA (Arrange-Act-Assert)
Estruturar cada teste em preparação → ação → verificação, na ordem — facilita leitura e revisão.

## Cobertura consciente, não exaustiva
Documentar explicitamente o que ficou fora do escopo de uma rodada de testes (ex. um componente sem payload externo exercitável hoje) como inventário para decisão futura, não como lacuna silenciosa.
