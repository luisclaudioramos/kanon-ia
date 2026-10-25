# Tipos de Mensagem

O tipo define a **estrutura** da mensagem; o público ([02](02-publicos.md)) define o **conteúdo** e o tom. Toda
mensagem tem um único tipo; se precisar de dois (avisar e pedir decisão), são duas mensagens ou o pedido vem primeiro.

| Tipo | Primeira linha | Corpo | Fecha com |
|---|---|---|---|
| Pedido de decisão | a decisão pedida | o que cada opção implica (só as que já existem), o que trava enquanto não decide | quem decide e até quando a decisão evita o bloqueio |
| Pergunta | a pergunta | o mínimo de contexto para responder sem reunião, o que já foi conferido | nada: a pergunta já está no topo |
| Aviso | o que mudou ou vai mudar | para quem muda, quando, o que fazer (ou "nada a fazer") | onde perguntar |
| Fechamento | o que foi resolvido | como foi conferido (fonte e momento), o que muda para o leitor | o que ficou de fora, se algo ficou |
| Incidente | o sintoma e o alcance | o que se sabe, o que é hipótese, o que já foi contido | a próxima atualização (o fato que virá, não um horário inventado) |
| Entrega de material | o que está sendo entregue e para quê | link do documento, resumo, como ler | o que se espera do leitor |
| Status | o estado (🟢, 🟡 ou 🔴) e o motivo, começando pela mudança de cor | progresso desde o último report, riscos e bloqueios, decisões necessárias | os próximos marcos, com data, dono e fonte da data |
| Pedido a outro time | o pedido | contexto mínimo, ambiente, evidência, urgência real | o que muda quando o pedido for atendido |

## Regras por tipo

- **Pedido de decisão:** nunca recomenda no lugar de quem decide, a menos que ele tenha pedido recomendação. Opção
  inventada não entra.
- **Pergunta:** uma por ponto ambíguo. Perguntas ao mesmo público vão juntas, numeradas, e só depois de conferir no
  sistema o que dá para conferir.
- **Aviso:** sem pedido escondido. Se o leitor precisa agir, é pedido, não aviso.
- **Fechamento:** só depois da conferência. "Resolvido" sem fonte é aviso, não fechamento. Para demandas que chegaram
  por um canal, o fechamento volta pelo mesmo canal.
- **Incidente:** a primeira mensagem sai cedo e incompleta; as seguintes vão na mesma conversa, cada uma dizendo o que
  mudou desde a anterior.
- **Entrega de material:** o material fica no documento; a mensagem não o reproduz.
- **Pedido a outro time:** um pedido por mensagem, atendível sem reunião.
- **Status:** modelo em `templates/STATUS-REPORT.template.md`, com a régua da cor. Só o que mudou desde o report anterior, que vai linkado. Data de marco só a da estimativa do time ou de um compromisso já agendado, com a fonte; sem ela, "sem data: aguardando estimativa do time". A decisão pedida segue as regras do pedido de decisão.

## Exemplo concreto

**Errado** — aviso com pedido escondido no fim:
```
Pessoal, subimos a versão nova do filtro de fases. Agora ele lê as duas tabelas.
Ah, e precisamos que alguém valide até amanhã.
```

**Certo** — pedido na primeira linha, aviso como contexto:
```
Pedido: validar em homologação o filtro de fases com as duas tabelas (casos no link).
A versão nova lê participant_eligible e participant_stage; antes lia só a segunda.
```
