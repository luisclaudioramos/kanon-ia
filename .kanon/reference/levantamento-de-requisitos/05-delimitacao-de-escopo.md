# Delimitação de Escopo

## O que o sistema não fará

Definir escopo não é só listar o que será entregue — é, com o mesmo peso, listar explicitamente o que **não** será. Um requisito sem "fora de escopo" documentado convida [scope creep](GLOSSARIO.md#scope-creep): cada pedido incremental parece pequeno demais para reavaliar prazo/custo, até que a soma deles nunca teria cabido no plano original.

```
Fora de escopo: métodos de pagamento alternativos (Pix, boleto) — item futuro.
```

Uma linha como essa evita duas conversas repetidas depois: "por que Pix não está aqui" e "então vamos adicionar Pix rapidinho já que estamos mexendo nisso".

## [MVP](GLOSSARIO.md#mvp) como disciplina, não como desculpa

Focar no MVP significa perguntar, para cada parte do escopo: "isso precisa existir para validar a hipótese central, ou é um refinamento que pode vir depois de já sabermos que a direção está certa?" Não é sinônimo de "fazer mal feito" — é sinônimo de "não construir o que ainda não foi comprovado necessário".

## Sinais de escopo mal delimitado

- O requisito tenta descrever tudo que o sistema deveria fazer eventualmente, não o que precisa existir na próxima entrega.
- Não existe uma frase "fora de escopo" em lugar nenhum do documento — presume-se implicitamente que tudo que não foi proibido está incluso.
- Pedidos novos são aceitos no meio do desenvolvimento sem reabrir a conversa de prazo/custo.

## Como delimitar na prática

1. Escreva o "fará" e o "não fará" lado a lado — nunca só um dos dois.
2. Priorize pelo [MVP](GLOSSARIO.md#mvp): o que é necessário para a hipótese central funcionar, versus o que é melhoria incremental.
3. Toda vez que um pedido novo aparecer depois da delimitação inicial, trate como uma nova rodada de priorização — não como um "ajuste rápido" ao escopo já fechado.
