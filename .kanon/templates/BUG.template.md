# Bug — _[preencher: título curto]_

_Breadcrumb: Bug > _[preencher: ID]_ · Gerado por `skills/32-report-bug`_

**Severidade**: bloqueante | recomendação | nit (ver `process/06-markdown-formatting-rules.md`)
**Status**: aberto | em correção | corrigido | validado
**Classificação**: Bug | Bug latente (só para item já registrado; ver `skills/32-report-bug`, Resultado)
**Item de origem**: _[preencher: id e link do item na ferramenta de trabalho; obrigatório no Bug latente]_

## Triagem
_Seis perguntas de `skills/32-report-bug`, cada uma com a evidência. Só é Bug com 1 a 3 respondidas e 4 e 5 descartando outra causa. No Bug latente, a 4 começa com "latente:" e diz o que foi medido e por que não prova a ocorrência._

| # | Pergunta | Resposta e evidência |
|---|---|---|
| 1 | Regra que diz o que deveria acontecer | _[preencher: trecho + link do critério de aceite, regra ou contrato]_ |
| 2 | Reproduz? | _[preencher: sim, nos passos abaixo · ou ocorrência nos logs com horário e identificador]_ |
| 3 | Linha que produz o comportamento | _[preencher: `arquivo:linha`]_ |
| 4 | O dado confirma? | _[preencher: "Sim" (com a seção Verificação) + ambiente, consulta e resultado · "plausível: " + o que falta verificar · ou "latente: " + o que foi medido]_ |
| 5 | Ambiente e configuração descartados | _[preencher: versão implantada, configuração, serviços e filas conferidos]_ |
| 6 | Regressão? | _[preencher: "não" · ou a mudança (PR, versão) que alterou o comportamento]_ |

## Verificação
_Obrigatória quando a pergunta 4 é "Sim" (`process/19-evidence-verification.md`). Sem ela, a 4 fica "plausível" ou "latente"._

- **Fatos do ambiente lidos**: _[preencher: arquivo e data; fatos usados]_
- **Campos conferidos**: _[preencher: cada campo de filtro, junção ou data — o que significa, a fonte (código que grava ou fato do ambiente) e a amostra]_
- **Hipóteses**: _[preencher: pelo menos duas, incluindo "a consulta ou o campo está errado" e "é o esperado"; para cada uma, o que a refutaria e o resultado]_
- **Cadeia causal**: _[preencher: do gatilho ao sintoma, cada passo com a evidência]_
- **Validação**: _[preencher: as cinco perguntas do processo 19, com a resposta]_
- **Pre-mortem**: _[preencher: se estiver errado, por quê; e o teste feito]_
- **Conferência independente**: _[preencher: quem conferiu (outro agente, sem a hipótese), o que recebeu e o resultado]_
- **Conclusão**: _[preencher: confirmada / plausível / refutada / inconclusiva; limite do número com a direção do erro]_

## Como refazer a triagem
_Uma linha por pergunta: ferramenta, conexão (nome do valor no perfil, sem credencial) e o comando ou a consulta exata. Scripts ao lado deste arquivo; nunca só na área temporária da sessão._

| # | Ferramenta e conexão | Comando, consulta ou script |
|---|---|---|
| 1 | _[preencher]_ | _[preencher]_ |
| 2 | _[preencher]_ | _[preencher: reprodução local primeiro (script), depois homologação; produção só se as duas não derem resultado, com aprovação]_ |
| 3 | _[preencher]_ | _[preencher]_ |
| 4 | _[preencher]_ | _[preencher]_ |
| 5 | _[preencher]_ | _[preencher]_ |
| 6 | _[preencher]_ | _[preencher]_ |

## Repro Steps
1. _[preencher]_
2. _[preencher]_
3. _[preencher: resultado obtido vs. esperado]_

## System Info
- Ambiente: _[preencher]_
- Versão: _[preencher]_
- Navegador/SO (se aplicável): _[preencher]_

## Causa raiz
_[preencher: preenchido após investigação — `skills/32-report-bug` referencia `reference/boas-praticas-dev/11-debugging.md`, corrigir causa raiz, não sintoma]_

## Tasks de correção
- [ ] [BUG-TASK-XX](./BUG-TASK-XX.md)

## Validação
- [ ] Teste de regressão adicionado
- [ ] Reproduzido e confirmado corrigido
