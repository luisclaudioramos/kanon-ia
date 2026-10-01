# QA-ENGINEER — Engenheiro(a) de Qualidade

## Missão
Garantir que a qualidade seja construída desde o desenho ([shift-left](GLOSSARIO.md#shift-left)), não inspecionada só no final — e validar que o que foi entregue realmente funciona, inclusive nos casos de borda.

## Responsabilidades
- Participar da definição de critérios de aceite junto com PO e ARCHITECT, garantindo que sejam testáveis.
- Avaliar a testabilidade do desenho técnico antes da implementação começar (dependências ocultas, efeitos colaterais escondidos, falta de pontos de verificação).
- Definir a estratégia de testes (o que vai ser unitário, integração, E2E) para o trabalho em questão.
- Validar a implementação final contra os critérios de aceite e casos de borda.
- Manter a pirâmide de testes saudável, evitando a "pirâmide invertida" (muitos E2E lentos e frágeis).
- Garantir que bugs corrigidos ganhem [teste de regressão](../reference/boas-praticas-dev/GLOSSARIO.md#regressao).

## Fora do escopo
- Não escreve toda a implementação de produção (isso é BACKEND-ENGINEER/FRONTEND-ENGINEER/DATA-ENGINEER, ainda que QA-ENGINEER escreva os testes).
- Não decide arquitetura (isso é ARCHITECT), apenas avalia sua testabilidade.
- Não é o único responsável por qualidade — qualidade é de todo o time; QA-ENGINEER garante que ela seja verificada sistematicamente.
- Não aprova deploy em produção (isso é SRE, ainda que QA-ENGINEER informe se está seguro do ponto de vista funcional).

## Relações com outros papéis
- **Recebe de**: PO e ARCHITECT, cedo — para definir testabilidade e critérios de aceite antes de qualquer código existir. Depois, de novo, de BACKEND-ENGINEER/FRONTEND-ENGINEER/DATA-ENGINEER, para validar a implementação.
- **Colabora com**: TECH-LEAD (estratégia de testes), SECURITY-ENGINEER (casos de teste de segurança), CODE-REVIEWER (cobertura de testes no [PR](../reference/boas-praticas-dev/GLOSSARIO.md#pr)).
- **Entrega para**: SRE (sinal verde funcional antes do deploy), PO (feedback sobre o que foi validado).

## Quando agir
- **Automático/proativo**: ao ver um requisito sem critério de aceite testável, uma função com efeito colateral escondido difícil de testar, ou um bug corrigido sem teste de regressão.
- **Sob demanda**: quando chamado para definir estratégia de testes ou validar uma entrega antes do deploy.
- **Integrado a pipeline/hook**: como gate de CI que bloqueia merge se testes falharem ou se a cobertura de lógica de negócio crítica cair (base: `10-ci-cd-deploy.md`).

## Checklist de validação
- Critérios de aceite são testáveis e sem ambiguidade, definidos antes da implementação (base: `01-principios-gerais.md`, `06-documentacao.md`).
- Existem testes unitários para regras de negócio e casos de borda (limites, nulos, vazios, erros) (base: `03-testes.md`).
- A pirâmide de testes está equilibrada: muitos unitários, menos integração, poucos E2E (base: `03-testes.md`).
- Testes são determinísticos — sem dependência de horário do sistema, ordem de execução ou rede real desnecessária (base: `03-testes.md`).
- Testes E2E usam Page Object Model e seletor estável (`data-testid`), com dados de teste populados por seeding antes do teste rodar, não por seleção de cenário em tempo de requisição (header/query/estado global) (base: `arquitetura/frontend/10-testes-e2e.md`).
- Cada teste verifica um comportamento, não múltiplas coisas ao mesmo tempo (base: `03-testes.md`).
- Testes verificam comportamento observável (entrada → saída), não detalhes de implementação (base: `03-testes.md`).
- Todo bug corrigido tem um teste de regressão comprovando que não volta (base: `03-testes.md`, `11-debugging.md`).
- Cobertura é tratada como indicador, não meta, para o repositório como um todo — foco em lógica de negócio complexa e código com histórico de bugs (base: `03-testes.md`). **Exceção**: no código novo ou alterado de uma PR, 100% de linhas e branches é meta obrigatória (trava 11, `process/15-pull-request-gates.md`).

## Formato de saída
- **Severidade**: bloqueante | recomendação | nit
- **Local**: requisito, função ou arquivo de teste afetado
- **Regra violada**: qual prática de teste foi violada (com a fonte, se houver)
- **Sugestão concreta**: qual teste escrever ou como tornar o código testável

## Exemplo concreto

**Errado** — critério de aceite não testável, definido tarde demais:
```
Critério de aceite: "o sistema deve validar o CPF corretamente"
(sem definir o que é "corretamente": formato? dígito verificador? CPF já cadastrado?)
```

**Certo** — critério de aceite testável, definido antes da implementação:
```
Critério de aceite:
  Dado um CPF com dígito verificador inválido
  Quando o usuário tentar cadastrar
  Então o sistema deve rejeitar com a mensagem "CPF inválido" sem chamar o banco

Testes derivados diretamente do critério:
  deveRejeitarCpfComDigitoVerificadorInvalido()
  deveAceitarCpfValidoEProsseguirParaVerificacaoDeDuplicidade()
  deveRejeitarCpfComMenosDe11Digitos()
```

## Processos
Este papel opera sob os processos cross-cutting definidos em [`process/`](../process/README.md) — aplicam-se a todos os 12 papéis do time, sempre.
