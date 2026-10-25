---
incidente: _[preencher: pasta do incidente no repositório de conteúdo]_
data: _[preencher: AAAA-MM-DD do postmortem]_
sistemas: [_[preencher: sistemas afetados]_]
conduzido_por: _[preencher: papel, ex.: SRE ou TECH-LEAD]_
estado: rascunho
revisado_em: _[preencher: AAAA-MM-DD, quando o time revisar]_
---

# Postmortem — _[preencher: incidente em uma linha]_

_Regras em `reference/boas-praticas-dev/11-debugging.md`, "Postmortem". Sem culpa: o texto descreve o que o sistema e o processo permitiram, nunca quem errou; pessoa aparece só como papel. Fato com fonte e horário; o que não foi conferido fica marcado como hipótese. Seção sem item diz "Nenhum"._

## Resumo do incidente
_[preencher: 3–5 linhas: o que aconteceu, quando, quanto afetou, se já está resolvido e a causa em uma frase]_

## Linha temporal
_Horários com o fuso. Os quatro marcos são obrigatórios; o restante, só o que muda a leitura._

| Horário | Evento | Fonte |
|---|---|---|
| _[preencher]_ | **Início:** _[preencher: quando o problema começou de fato]_ | _[preencher: log, consulta, mudança em produção]_ |
| _[preencher]_ | **Detecção:** _[preencher: quem ou o que percebeu (alerta, cliente, time)]_ | _[preencher]_ |
| _[preencher]_ | **Contenção:** _[preencher: o impacto parou de crescer]_ | _[preencher]_ |
| _[preencher]_ | **Resolução:** _[preencher: o sistema voltou ao normal e os dados foram corrigidos]_ | _[preencher]_ |

**Tempos:** até detectar _[preencher]_ · até conter _[preencher]_ · até resolver _[preencher]_

## Impacto
- **Quem foi afetado:** _[preencher: contagem de clientes, participantes ou transações, nunca dado pessoal]_
- **Valor financeiro:** _[preencher: valor, ou "nenhum"]_
- **Sistemas e ambientes:** _[preencher: produção; homologação só quando também foi afetada]_
- **Duração:** _[preencher]_
- **Ainda pendente:** _[preencher: dado a corrigir, cliente a avisar, ou "nada"]_

## Causa raiz
- **Causa direta:** _[preencher: o que quebrou, com a evidência (`arquivo:linha`, consulta, log)]_
- **Por que aconteceu:** _[preencher: os "porquês" até chegar a uma causa de sistema ou processo]_
- **Por que não foi pego antes:** _[preencher: o que faltou no teste, na revisão, no alerta ou na validação]_

## O que funcionou / falhou
| Etapa | Funcionou | Falhou |
|---|---|---|
| Prevenção (teste, revisão, validação) | _[preencher]_ | _[preencher]_ |
| Detecção (alerta, monitoração) | _[preencher]_ | _[preencher]_ |
| Contenção e correção | _[preencher]_ | _[preencher]_ |
| Comunicação | _[preencher]_ | _[preencher]_ |

## Ações corretivas
_Cada ação vira um item na ferramenta de trabalho, com o link aqui. O postmortem só fecha quando toda ação tem item._

| Ação | Tipo | Prioridade | Dono | Prazo | Item | Estado |
|---|---|---|---|---|---|---|
| _[preencher]_ | _[preencher: prevenir / detectar / conter]_ | _[preencher: alta / média / baixa]_ | _[preencher: papel]_ | _[preencher: AAAA-MM-DD da estimativa do time ou data acordada, ou "a estimar com o time"]_ | _[preencher: link]_ | _[preencher: aberta / feita]_ |

## Lições aprendidas
- _[preencher: o que vale além deste incidente]_ → _[preencher: registrada em `MEMORY.md` (`skills/23-register-lesson-learned`), virou ADR (`templates/DECISION-RECORD.template.md`) ou fica só aqui]_
