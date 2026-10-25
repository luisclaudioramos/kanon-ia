---
publico: _[preencher: Liderança executiva ou Gestão de entrega]_
tipo: Status
destino: _[preencher: canal, e-mail ou reunião, como o perfil registra]_
periodo: _[preencher: AAAA-MM-DD a AAAA-MM-DD]_
anterior: _[preencher: link do report anterior, ou "primeiro report"]_
fontes:
  - _[preencher: board, ferramenta de trabalho, mudanças em produção, painel de progresso (`skills/35-feature-progress-report`), com data]_
status: rascunho
aprovado_em: _[preencher: AAAA-MM-DD, quando a pessoa aprovar texto e destino]_
enviado_em: _[preencher: AAAA-MM-DD, quando a pessoa enviar]_
---

# Status — _[preencher: projeto ou portfólio]_ — _[preencher: período]_

_Tipo "Status" de `reference/comunicacao/03-tipos-de-mensagem.md`; conteúdo pelo público em `02-publicos.md`; revisão pelo `agents/AGENT-COMMUNICATOR.md` e validação com `kanon-mensagem` antes de propor o rascunho, como toda mensagem (`skills/52-audience-message`)._

## Lido antes de escrever
_[preencher: o report anterior e o que mudou no destino desde ele]_

## Texto

### Estado: _[preencher: 🟢 Verde / 🟡 Amarelo / 🔴 Vermelho]_
_[preencher: uma frase com o motivo. Se a cor mudou desde o report anterior, a frase começa pela mudança: "De 🟢 para 🟡: ..."]_

_Vários projetos: uma linha por projeto._

| Projeto | Estado | Mudou desde o último |
|---|---|---|
| _[preencher]_ | _[preencher]_ | _[preencher]_ |

### Progresso desde o último report
- Em produção: _[preencher: o que chegou a produção no período, com a fonte]_
- Pronto em homologação: _[preencher]_
- _[preencher: outro avanço que muda a leitura do leitor, com a fonte]_

### Riscos e bloqueios
| Risco ou bloqueio | Impacto no negócio | Mitigação | O que precisa |
|---|---|---|---|
| _[preencher]_ | _[preencher]_ | _[preencher, ou "sem mitigação"]_ | _[preencher: de quem e o quê]_ |

### Decisões necessárias
- _[preencher: a decisão]_ — opções: _[preencher: só as que existem]_ — sem ela: _[preencher: o que trava]_ — quem decide: _[preencher: papel]_

### Próximos marcos
| Marco | Data | Dono | Fonte da data |
|---|---|---|---|
| _[preencher]_ | _[preencher: AAAA-MM-DD, ou "sem data: aguardando estimativa do time"]_ | _[preencher: papel; nome só para Gestão de entrega]_ | _[preencher: estimativa do time de AAAA-MM-DD, ou mudança em produção já agendada]_ |

## Régua do estado

- 🟢 **Verde:** nenhum risco ameaça marco ou escopo.
- 🟡 **Amarelo:** risco com mitigação em andamento, ou decisão pendente que ainda não trava nada.
- 🔴 **Vermelho:** marco comprometido, bloqueio sem responsável, ou decisão pendente que já trava o trabalho.

A cor muda só por esses critérios. Seção do texto sem item diz "Nenhum".

## Regras de data

- A data de um marco entra só quando saiu da **estimativa do time técnico** que vai executar, ou quando é um compromisso já agendado (mudança em produção marcada). A fonte e a data da estimativa vão na coluna "Fonte da data".
- Sem estimativa do time: "sem data: aguardando estimativa do time". Estimativa feita pelo agente nunca entra.
- Folga, margem, divisão interna da entrega e estratégia de negociação continuam fora (`reference/comunicacao/01-regras-gerais.md`).
