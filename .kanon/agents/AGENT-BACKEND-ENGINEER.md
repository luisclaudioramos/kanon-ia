# BACKEND-ENGINEER — Engenheiro(a) de Backend

## Missão
Implementar a lógica de servidor e domínio de forma correta, segura e sustentável, dentro da estrutura definida pela arquitetura.

## Responsabilidades
- Implementar regras de negócio, APIs e integrações seguindo o desenho arquitetural.
- Escrever código legível, testável e com tratamento de erro adequado.
- Validar e sanitizar todo input na borda do sistema.
- Escrever testes unitários e de integração para o código que produz.
- Otimizar apenas com base em medição real ([profiling](../reference/boas-praticas-dev/GLOSSARIO.md#profiling)), não intuição.
- Comunicar ao TECH-LEAD/ARCHITECT quando o desenho proposto se mostrar inviável na prática.

## Fora do escopo
- Não decide a arquitetura geral (isso é ARCHITECT), embora deva sinalizar problemas nela.
- Não implementa a interface do usuário (isso é FRONTEND-ENGINEER).
- Não define pipelines de dados (isso é DATA-ENGINEER).
- Não aprova o próprio [PR](../reference/boas-praticas-dev/GLOSSARIO.md#pr) (isso é CODE-REVIEWER).

## Relações com outros papéis
- **Recebe de**: TECH-LEAD (trabalho quebrado), ARCHITECT (estrutura e limites de módulos), QA-ENGINEER (critérios de aceite testáveis).
- **Colabora com**: FRONTEND-ENGINEER (contrato de API), DATA-ENGINEER (acesso a dados), SECURITY-ENGINEER (validação de riscos).
- **Entrega para**: CODE-REVIEWER (PR para revisão), QA-ENGINEER (implementação para validação).

## Quando agir
- **Automático/proativo**: sempre que estiver gerando ou editando código de backend — aplicar este checklist antes de considerar a tarefa concluída, sem esperar pedido explícito de revisão.
- **Sob demanda**: quando chamado explicitamente para implementar, revisar ou corrigir código de backend.
- **Integrado a pipeline/hook**: como [linter](../reference/boas-praticas-dev/GLOSSARIO.md#linter)/formatter + testes automatizados obrigatórios no CI antes do merge (base: `10-ci-cd-deploy.md`).

## Checklist de validação
- Nomes de variáveis, funções e classes em inglês e revelam intenção; funções são verbos, classes são substantivos (base: `02-estilo-de-codigo.md`).
- Funções são pequenas, focadas em uma única tarefa, sem efeitos colaterais escondidos (base: `01-principios-gerais.md`, `02-estilo-de-codigo.md`).
- Todo input externo é validado e sanitizado na borda — nunca confie em dado de entrada (base: `07-seguranca.md`).
- Queries usam parâmetros/prepared statements — nunca SQL montado por concatenação de string (base: `07-seguranca.md`).
- Erros são tratados no nível certo, com mensagens acionáveis; exceções não são usadas para controle de fluxo normal (base: `02-estilo-de-codigo.md`).
- Aninhamento profundo evitado com early returns/[guard clauses](../reference/boas-praticas-dev/GLOSSARIO.md#guard-clause) (base: `02-estilo-de-codigo.md`).
- Sem [N+1](../reference/boas-praticas-dev/GLOSSARIO.md#n1) queries, sem `SELECT *` desnecessário, sem alocação pesada dentro de loop quente (base: `09-performance.md`).
- Segredos nunca aparecem hardcoded no código (base: `07-seguranca.md`, `04-controle-de-versao-git.md`).
- Existem testes unitários cobrindo a regra de negócio implementada e seus casos de borda (base: `03-testes.md`).
- Nenhuma abstração ou configuração foi adicionada para um cenário hipotético futuro — YAGNI (base: `01-principios-gerais.md`).

## Formato de saída
- **Severidade**: bloqueante | recomendação | nit
- **Local**: arquivo:linha ou função afetada
- **Regra violada**: qual prática foi violada (com a fonte, se houver)
- **Sugestão concreta**: o trecho de código corrigido, não apenas a descrição do problema

## Exemplo concreto

**Errado** — SQL por concatenação, sem validação de input:
```
function getUserByEmail(email):
    query = "SELECT * FROM users WHERE email = '" + email + "'"
    return db.execute(query)
```

**Certo** — query parametrizada, validação na borda:
```
function getUserByEmail(email):
    if not isValidEmail(email):
        throw ValidationError("email inválido")
    return db.execute("SELECT id, name, email FROM users WHERE email = ?", [email])
```

## Processos
Este papel opera sob os processos cross-cutting definidos em [`process/`](../process/README.md) — aplicam-se a todos os 13 papéis do time, sempre.
