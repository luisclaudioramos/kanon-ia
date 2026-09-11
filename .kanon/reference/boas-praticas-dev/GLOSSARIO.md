# Glossário

Termos técnicos usados nos documentos deste repositório, para consulta rápida durante a leitura. Os arquivos principais linkam a primeira ocorrência de cada termo aqui.

<a id="adr"></a>
### ADR (Architecture Decision Record)
Documento curto que registra uma decisão arquitetural importante: contexto, decisão tomada, alternativas consideradas e consequências. Evita que a mesma discussão se repita meses depois.

<a id="aaa"></a>
### AAA (Arrange-Act-Assert)
Estrutura de um teste em três blocos visíveis e nessa ordem: preparar o estado e as entradas (Arrange), executar a única ação sob teste (Act), verificar o resultado observável (Assert).

<a id="assert"></a>
### Assert / Asserção
Instrução que verifica se uma condição é verdadeira em um ponto do código; se for falsa, interrompe a execução com um erro. Usada tanto para validar invariantes internas quanto para verificar resultados em testes.

<a id="bisseccao"></a>
### Bisecção (git bisect)
Técnica de busca binária para encontrar o commit exato que introduziu um bug: divide o histórico ao meio repetidamente, testando se o bug está presente, até isolar o commit responsável. `git bisect` automatiza esse processo.

<a id="blameless"></a>
### Blameless (sem culpa)
Abordagem de investigação de incidentes focada em entender falhas de sistema e processo, não em apontar culpados individuais. Pessoas relatam o que aconteceu sem medo de punição, o que gera análises mais honestas e completas. Ver também [Post-mortem](#post-mortem).

<a id="cache"></a>
### Cache
Camada de armazenamento temporário que guarda o resultado de uma operação cara (cálculo, consulta) para reaproveitar em chamadas futuras, evitando refazer o trabalho.

<a id="changelog"></a>
### Changelog
Arquivo (geralmente `CHANGELOG.md`) que lista as mudanças notáveis de cada versão de um projeto, biblioteca ou API, para que quem consome saiba o que mudou.

<a id="ciclomatica"></a>
### Complexidade Ciclomática
Métrica que mede o número de caminhos independentes que o fluxo de um código pode seguir (baseado em `if`, `for`, `while`, etc.). Quanto maior, mais difícil de testar e entender a função.

<a id="csrf"></a>
### CSRF (Cross-Site Request Forgery)
Ataque que engana o navegador de um usuário autenticado para que ele envie, sem saber, uma requisição indesejada a um site onde já está logado (ex.: transferir dinheiro clicando em um link malicioso).

<a id="debugger"></a>
### Debugger
Ferramenta que permite executar um programa passo a passo, inspecionando variáveis e o estado da aplicação em tempo real, para localizar a causa de um bug.

<a id="design-pattern"></a>
### Design Pattern (Padrão de Projeto)
Solução reutilizável e testada para um problema recorrente de design de software. Exemplos: **Factory** (cria objetos sem expor a lógica de criação), **Strategy** (troca algoritmos em tempo de execução), **Observer** (notifica interessados quando um estado muda), **Repository** (abstrai o acesso a dados).

<a id="diff"></a>
### Diff
Representação das diferenças entre duas versões de um arquivo ou código, mostrando o que foi adicionado, removido ou alterado.

<a id="docstring"></a>
### Docstring
Comentário estruturado, colocado logo no início de uma função/classe/módulo, que documenta seu propósito, parâmetros e retorno, geralmente lido por ferramentas de geração de documentação.

<a id="feature-flag"></a>
### Feature Flag
Mecanismo que liga/desliga uma funcionalidade em produção via configuração, sem precisar de novo deploy. Permite mesclar código incompleto na branch principal sem expor a funcionalidade a usuários.

<a id="force-push"></a>
### Force Push
Comando (`git push --force`) que sobrescreve o histórico remoto de uma branch com o histórico local, mesmo que divirjam. Perigoso em branches compartilhadas porque pode apagar commits de outras pessoas.

<a id="gatekeeping"></a>
### Gatekeeping
Postura de bloquear ou dificultar contribuições por controle excessivo ou preferências pessoais, em vez de critérios objetivos de qualidade.

<a id="guard-clause"></a>
### Guard Clause
Verificação no início de uma função que retorna/interrompe cedo quando uma condição inválida é detectada, evitando aninhamento profundo de `if`s.

<a id="hash"></a>
### Hash (de senha)
Função que transforma uma senha em uma sequência irreversível de caracteres, usada para armazenar credenciais sem guardar a senha original em texto puro.

<a id="io"></a>
### IO (Input/Output)
Operações de entrada e saída de dados que envolvem comunicação com algo fora do processo (disco, rede, banco de dados), geralmente muito mais lentas que operações em memória.

<a id="invariante"></a>
### Invariante
Condição que deve permanecer sempre verdadeira em um determinado ponto do código, independentemente das operações realizadas (ex.: "o saldo nunca é negativo").

<a id="linter"></a>
### Linter
Ferramenta que analisa o código estaticamente (sem executá-lo) para apontar erros, más práticas e desvios de estilo antes mesmo de rodar os testes.

<a id="lock"></a>
### Lock
Mecanismo de sincronização que impede que duas ou mais partes do código acessem um mesmo recurso ao mesmo tempo, evitando condições de corrida.

<a id="microsservicos"></a>
### Microsserviços
Estilo arquitetural em que o sistema é dividido em vários serviços pequenos e independentes, cada um responsável por uma parte do domínio, que se comunicam entre si pela rede.

<a id="mock"></a>
### Mock
Objeto ou função "falsa" usada em testes para simular o comportamento de uma dependência real (banco, API externa), isolando o que está sendo testado.

<a id="monolito"></a>
### Monolito
Aplicação construída e implantada como uma única unidade, com todos os módulos rodando no mesmo processo (em oposição a microsserviços).

<a id="n1"></a>
### N+1 (Queries)
Problema de performance em que uma consulta inicial retorna N registros, e o código então executa mais uma consulta para cada um deles (N consultas adicionais), em vez de buscar tudo de uma vez.

<a id="nit"></a>
### Nit (Nitpick)
Comentário de code review sobre um detalhe menor e não bloqueante (estilo, preferência), sinalizado para deixar claro que não impede a aprovação do PR.

<a id="owasp"></a>
### OWASP
Open Web Application Security Project, organização que mantém listas e recursos de referência sobre segurança de aplicações web, incluindo o "OWASP Top 10" — as vulnerabilidades mais críticas e comuns.

<a id="pipeline"></a>
### Pipeline (CI/CD)
Sequência automatizada de etapas (build, testes, scanning, deploy) que o código passa desde o commit até chegar em produção.

<a id="post-mortem"></a>
### Post-mortem
Documento/reunião de análise feita após um incidente, registrando o que aconteceu, o impacto, a causa raiz e as ações para evitar recorrência. Ver também [Blameless](#blameless).

<a id="pr"></a>
### PR (Pull Request)
Solicitação para que as mudanças de uma branch sejam revisadas e mescladas na branch principal. Também chamado de Merge Request (MR) em alguns sistemas (ex.: GitLab).

<a id="profiling"></a>
### Profiling
Análise do comportamento em tempo de execução de um programa (uso de CPU, memória, tempo gasto por função) para identificar gargalos reais de performance.

<a id="race-condition"></a>
### Race Condition (Condição de Corrida)
Bug que ocorre quando o resultado de um programa depende da ordem/tempo imprevisível em que operações concorrentes são executadas.

<a id="rebase"></a>
### Rebase
Comando Git que reaplica os commits de uma branch sobre outra base, reescrevendo o histórico para ficar linear, como alternativa ao merge.

<a id="regressao"></a>
### Regressão (Teste de)
Teste escrito para garantir que um bug corrigido não volte a acontecer no futuro.

<a id="rollback"></a>
### Rollback
Ação de reverter um deploy ou mudança para um estado anterior conhecido como estável, geralmente em resposta a um problema em produção.

<a id="runbook"></a>
### Runbook
Documento com o passo a passo operacional para lidar com uma situação específica (deploy, rollback, troubleshooting de um incidente comum).

<a id="scanning"></a>
### Scanning (de Segurança)
Varredura automatizada de código, dependências ou segredos em busca de vulnerabilidades conhecidas ou credenciais expostas.

<a id="serverless"></a>
### Serverless
Modelo de execução em que o código roda sob demanda em infraestrutura totalmente gerenciada por um provedor de nuvem, sem o time precisar gerenciar servidores.

<a id="sla"></a>
### SLA (Service Level Agreement)
Acordo que define o nível de serviço esperado, como tempo máximo de resposta a um code review ou disponibilidade de um sistema.

<a id="squash"></a>
### Squash
Ação de combinar múltiplos commits em um único commit, geralmente usada para limpar um histórico com commits intermediários tipo "WIP" antes de mesclar.

<a id="ssrf"></a>
### SSRF (Server-Side Request Forgery)
Ataque em que um invasor engana o servidor para que ele faça requisições a destinos que não deveria acessar (ex.: recursos internos da rede).

<a id="staging"></a>
### Staging
Ambiente que replica a produção o mais fielmente possível, usado para testar mudanças antes do deploy real.

<a id="stateless"></a>
### Stateless
Componente/serviço que não guarda estado entre requisições; cada requisição é processada de forma independente, o que facilita escalar horizontalmente.

<a id="tls"></a>
### TLS (Transport Layer Security)
Protocolo que criptografa a comunicação entre duas partes na rede (ex.: entre navegador e servidor), garantindo confidencialidade e integridade dos dados em trânsito.

<a id="xss"></a>
### XSS (Cross-Site Scripting)
Vulnerabilidade que permite a um invasor injetar scripts maliciosos em páginas vistas por outros usuários, geralmente por falta de escaping de conteúdo dinâmico.
