# 15 — Pull Request Gates

## Propósito
Definir, num lugar só, as 12 travas que toda Pull Request precisa cumprir: onde cada uma nasce no fluxo, o que a PR confere, se bloqueia ou só alerta, e quais exceções valem. Skills e templates apontam para este arquivo em vez de copiar os critérios.

## Quando se aplica
- Em toda PR aberta a partir de **2026-09-29**.
- Em PRs abertas antes dessa data, a partir do primeiro push (iteração) posterior a ela. PR sem novo push não é cobrada retroativamente.
- Nas PRs que o kanon cria (`skills/34-pull-request-review`) e nas que ele revisa, de qualquer autor (`skills/13-code-review`).
- Cada trava tem uma etapa de origem (refinamento, desenvolvimento, test case). A PR resume e confere o que já foi feito nessas etapas.

## Regras
- **Tipos**: 🔴 bloqueia o merge · 🟡 alerta, não bloqueia.
- **"Não se aplica"** é aceito em qualquer item, sempre com o motivo em uma frase. "N/A" sozinho, sem motivo, conta como trava 🔴 violada.
- Os critérios numéricos (limites da trava 6, aprovações da trava 8, cobertura da trava 11, parada do ciclo adversarial) vivem só aqui. Quem precisar deles aponta para esta seção.
- Uma trava violada é reportada citando o número e o nome (ex.: "Trava 7 — Massa de teste"), para que o autor encontre a regra.

## As travas

### Refinamento (User Story e Task)

| # | Trava | Nasce em | A PR confere | Tipo |
|---|---|---|---|---|
| 1 | As-is / to-be | A US tem **Como é hoje** e **Como deve ficar**, descrevendo comportamento, não código. | A descrição traz o as-is/to-be técnico (o que o código fazia, o que passa a fazer) e o link da US. | 🔴 |
| 5 | Integrações | A US ou a Task lista os **sistemas afetados**: o que a mudança consome, quem consome o que muda, se há quebra de contrato e para quem. | A seção **Integrações** confirma o planejado ou explica o que mudou no desenvolvimento. "Nenhuma" é aceito, com justificativa. | 🔴 |
| 6 | Tamanho | A Task é fatiada para caber numa PR abaixo do limite desta trava. | Alerta se a PR tiver **mais de 20 arquivos ou mais de 400 linhas** alteradas, **ou** mexer em contrato público, migração de banco ou biblioteca compartilhada. Quando dispara, a descrição lista as áreas ou sistemas que podem ser afetados, e a trava 8 passa a exigir 2 aprovações. | 🟡 |

### Desenvolvimento e test case

| # | Trava | Nasce em | A PR confere | Tipo |
|---|---|---|---|---|
| 3 | Testes unitários | DoD da Task. | A PR inclui ou altera testes do comportamento novo ou corrigido, ou declara uma exceção: só documentação, só migração SQL, só troca de versão de dependência, só HTML/CSS sem lógica. | 🔴 |
| 11 | Cobertura de 100% | DoD da Task. | **100% de linhas e branches no código novo ou alterado da PR** (cobertura do diff, não do repositório), com o relatório anexado ou citado. Exceções declaradas com motivo: código gerado automaticamente, DTO/record sem lógica, configuração de inicialização (`Startup`, `Program`, módulos Angular). Em PR produzida pelo kanon, também o resultado do teste de mutação (ver "Ciclo adversarial"). | 🔴 |
| 4 | Como testar | TEST-CASE (`skills/25-test-case-authoring`): pré-condições, passos, resultado esperado. | A seção **Como testar** resume ambiente, pré-condição, ação e resultado esperado, e aponta o TEST-CASE. | 🔴 |
| 7 | Massa de teste | Pré-condições do TEST-CASE: script, seed, payload ou usuário de teste de homologação. | A PR aponta onde está a massa, ou declara "não precisa: _motivo_". A massa é **sempre sintética ou anonimizada**: nunca CPF, e-mail ou telefone real de cliente (LGPD). | 🔴 |
| 9 | Documentação atualizada | Fim do desenvolvimento: toda documentação que descreve o sistema atual e foi afetada (README, docs do repositório, wiki, docs de as-is) é atualizada para o to-be. | A seção **Documentação** lista o que foi atualizado (no diff ou por link), ou declara que nenhuma doc descreve esse comportamento. | 🔴 |
| 10 | Mocks e demais testes | Desenvolvimento: mocks, fixtures, testes de integração e E2E afetados são atualizados junto com o código. | A suíte completa do repositório passa (unitários, integração, E2E quando existir) e os mocks refletem o contrato novo. Falha de E2E causada por ambiente indisponível é registrada como ressalva, no mesmo padrão de RNF indeterminado de `skills/11-quality-gate`, e não vira reprovação automática. | 🔴 |
| 12 | Validação de tela | `skills/48-screen-validation`: cada tela da US é aprovada pelo PO e pelo negócio, por versão, em `telas/SCREEN-VALIDATION.md`. O front pode começar antes da aprovação. | Vale para PR que mexe na interface de uma US com telas. A seção **Validação de tela** traz, por tela, a versão aprovada, o link do registro e o print da tela implementada ao lado da versão aprovada, na mesma escala. Tela ainda não aprovada: alerta, com "aguardando validação" e o estado. Tela implementada diferente da versão aprovada: achado na revisão; o front corrige ou a diferença vira mudança pedida (`skills/49-change-impact`). O bloqueio fica no fechamento da US (`process/05-definition-of-done.md`). | 🟡 |

### Transversal

| # | Trava | Regra | Tipo |
|---|---|---|---|
| 2 | Linguagem clara | Vale para US, Task e PR. 🔴 se houver sigla, jargão ou nome de sistema sem explicação na primeira ocorrência. O restante (clareza, ordem, tamanho) é 🟡 sugestão. Teste: alguém na primeira semana de empresa entende o que mudou e por quê? | 🔴 / 🟡 |

### PR

| # | Trava | Regra | Tipo |
|---|---|---|---|
| 8 | Aprovações | Mínimo de **1 aprovação de colega**; **2 quando o destino é `master`** ou quando a trava 6 disparou. O voto do autor não conta. Sem as aprovações, ninguém faz o merge, nem o próprio autor. | 🔴 |

### Ciclo adversarial (trava 11, código produzido pelo kanon)

Cobertura de 100% não prova que o teste verifica algo: uma linha executada sem assert conta como coberta. Por isso o código produzido pelo kanon passa também por **teste de mutação** (Stryker.NET para .NET, StrykerJS para Angular), que altera o código em pequenos pontos e confere se algum teste falha.

1. Escrever testes tentando quebrar o código: limites, nulos, vazios, erros, e concorrência quando houver.
2. Medir a cobertura do diff e rodar o teste de mutação no código alterado.
3. Repetir enquanto houver linha ou branch sem cobertura ou mutante sobrevivente.

**Parada**:
- **Sucesso**: 100% de linhas e branches no diff **e** nenhum mutante sobrevivente no código alterado.
- **Sem avanço**: depois de **5 rodadas** seguidas sem melhora, parar e listar cada linha, branch ou mutante que ficou de fora, com o motivo.
- Nunca declarar 100% sem que o relatório de cobertura e de mutação comprove.

Para o repositório como um todo, cobertura continua sendo indicador, não meta (`agents/AGENT-QA-ENGINEER.md`). A meta de 100% vale só para o código novo ou alterado da PR.

## Sinais de violação
- PR com descrição vazia, só com o título da US, ou com "N/A" sem motivo.
- PR mergeada com menos aprovações de colegas do que a trava 8 exige, ou aprovada só pelo voto do autor.
- Massa de teste com CPF, e-mail ou telefone real.
- Relatório de revisão que aprova sem citar o resultado de cada trava.
- Skill ou template repetindo um critério numérico deste arquivo em vez de apontar para ele.
- Agente declarando 100% de cobertura sem relatório.
- PR que mexe na interface de uma US com telas sem a seção Validação de tela, ou com "aguardando validação" sem o estado da tela.

## Procedimento em caso de falha
- Trava 🔴 violada: a PR não é aberta (quando o kanon é o autor) ou recebe achado bloqueante no rascunho de comentários (quando o kanon revisa). O merge fica bloqueado até a correção. Exceção: a trava 8 não impede a abertura, porque só pode ser cumprida com a PR já aberta; ela é conferida no merge, pelos votos da PR.
- Ciclo adversarial sem avanço: o kanon pode abrir a PR com a trava 11 pendente, desde que o relatório de lacunas esteja na seção Testes da descrição. Quem decide é o revisor humano.
- Trava 🟡 disparada: vira alerta na revisão e, no caso da trava 6, eleva a trava 8 para 2 aprovações.
- Trava que não pôde ser verificada (relatório de cobertura inexistente no repositório, ambiente de E2E fora do ar): registrada como ressalva com a causa, nunca como aprovada. A ressalva segue o padrão "aprovado com ressalva" de `skills/11-quality-gate`: fica visível para o revisor, nunca conta como cumprida, e a decisão de merge é do revisor humano.

## Exemplo concreto

**Errado** — descrição que não cumpre as travas:
```
Ajuste no cadastro. Testado localmente.
```

**Certo** — descrição que cumpre as travas (dados fictícios; POST é o tipo de chamada HTTP que cria um registro numa API, e 201 e 400 são os códigos de resposta):
```text
US: #0000 — Cadastro aceita celular opcional
Como era: o cadastro recusava cliente sem celular (erro de validação).
Como fica: celular vira opcional; sem celular, a validação exige e-mail.
Integrações: consome a API de clientes (POST /customers). Quem consome: o portal de cadastro. Sem quebra de contrato.
Como testar: homologação, criar cliente sem celular e com e-mail → 201 (criado); sem os dois → 400 (recusado).
Massa: payload sintético em tests/fixtures/customer-sem-celular.json.
Testes: 2 unitários novos; cobertura do diff 100% (relatório no pipeline).
Documentação: README da API atualizado (seção Cadastro).
```
