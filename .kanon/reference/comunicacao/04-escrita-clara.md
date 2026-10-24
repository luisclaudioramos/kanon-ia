# Escrita Clara

As referências 01 a 03 dizem **o que** entra, **para quem** e em **que estrutura**. Esta diz como escrever cada frase
para que quem lê entenda sem ter o sistema aberto. Vale para todos os públicos e para todos os tipos de mensagem.

Adaptado de duas skills públicas de comunicação: `effective-communicator` (patrickdappollonio/claude-plugins), para a
tradução de achados técnicos, e `strategy-communicator` (paulmil11/strategyu-skills), para os testes de leitura e a
ordem do argumento, que vem do Princípio da Pirâmide, de Barbara Minto.

## Quem lê não vê o que você vê

O leitor não está com o arquivo, a tabela ou o log aberto. Nome de tabela, função, arquivo, flag ou coluna é um
**rótulo** para quem pode abrir o sistema, nunca a explicação. A frase precisa fazer sentido sem ele.

## Achado em quatro partes

Para todo público fora do time técnico, cada achado ou resultado sai nesta ordem:

1. **O que acontece**, em palavras simples, sem nome de código.
2. **O que isso significa para o leitor**: o efeito que importa para ele (cliente, dinheiro, prazo do lado dele,
   dado), não o mecanismo.
3. **O que fazer**: o próximo passo dele, ou a decisão pendente e de quem é.
4. **Quão certo é e de onde vem**: conferido ou hipótese, com a fonte e o momento. O nome técnico, se ajudar alguém
   que pode abrir o sistema, vai por último e só para os públicos que o aceitam ([02](02-publicos.md)).

Para o time técnico, o nome de código fica, mas o significado vem na mesma frase na primeira vez em que aparece:
"a coluna `extra_challenge`, que marca o desafio como acelerador para aquele participante".

## Três testes de leitura

Antes de propor o rascunho, o texto passa nos três:

- **Teste do nome apagado.** Apague da frase todo nome de código. Se ela perde o sentido, reescreva. (Não se aplica
  ao time técnico.)
- **Teste dos dez segundos.** Quem lê só a prévia sabe do que se trata, por que importa e o que fazer.
- **Teste da primeira frase.** Lendo só a primeira frase de cada parágrafo ou bloco, o argumento inteiro aparece.
  Se o texto usa negrito, os trechos em negrito, lidos sozinhos, formam o resumo; negrito em palavra solta não ajuda.

## Ordem do argumento

- **Direta (padrão):** conclusão → contexto → evidência. Vale para quase toda mensagem.
- **Indireta:** situação → o que complica → evidência → conclusão. Só quando o leitor já discordou da conclusão e
  quem aprova o envio pede essa ordem.
- **Sem apelo emocional:** nem urgência fabricada, nem promessa de ganho. O fato e o efeito bastam.

## Frases

- **Uma ideia por frase.** Frase longa com "e", "mas" e "porque" encadeados vira duas ou três.
- **Voz ativa e verbo no presente:** "o filtro lê só uma tabela", e não "a leitura de apenas uma tabela estava sendo
  realizada".
- **Verbo, não substantivo:** "conferimos", e não "realizamos a conferência"; "decidiu", e não "tomou a decisão".
- **Palavra comum no lugar do jargão**, para quem não é do time técnico:

  | Em vez de | Escreva |
  |---|---|
  | nulo, null | vazio, sem valor |
  | invariante | regra que sempre vale |
  | código morto | parte que não é usada |
  | concorrência | ao mesmo tempo |
  | upsert | grava ou atualiza |
  | rollback | volta para a versão anterior |
  | deploy, subida | publicação da versão nova |

- **Número no lugar do vago** quando tamanho, tempo ou risco importam: "39 de 1.100 participantes", e não "poucos".
  O número é conferido, com fonte; estimativa de esforço só a que veio do time ([01](01-regras-gerais.md)).
- **Ressalva só onde há dúvida real.** "Talvez" e "parece" sem dúvida de verdade saem; a dúvida real vira hipótese
  explícita ("hipótese, não verificada").
- **Sem figura de linguagem nem jargão corporativo** ("alinhar", "dar um norte", "endereçar", "alavancar", "fazer
  sentido"). Diga a coisa literal.
- **Problema dito sem drama:** a causa e a correção, sem "infelizmente" ou "opa".

## O que cortar antes de propor o rascunho

- **Abertura que só anuncia:** "Gostaria de informar que", "Segue abaixo", "Espero que estejam bem", "Desculpe o
  incômodo". A primeira linha já é o pedido, a pergunta ou a conclusão. Saudação curta do canal ("Pessoal,", "Fulano,")
  fica.
- **Fecho genérico:** "Qualquer dúvida, fico à disposição", "Espero ter ajudado". Termine quando o conteúdo acabar. Uma
  oferta específica pode ficar: "Se quiserem, mando as consultas para replicar."
- **Resumo do que acabou de ser dito.**
- **Segundo assunto no meio do primeiro:** termine o primeiro; o segundo vai como item separado ou em outra mensagem.

O validador de mensagens avisa sobre a abertura que só anuncia e sobre o fecho genérico; o resto é conferido pelo
[`COMMUNICATOR`](../../agents/AGENT-COMMUNICATOR.md).

## Exemplo concreto

**Errado** — para o PO, com abertura que anuncia, nome de código, ressalva vaga e fecho genérico:
```
Gostaria de informar que o extra_challenge vem do NO_ACELERADOR e a campaign_stage_status
está zerada, então talvez não dê para saber o acelerador pelo cadastro. Qualquer coisa me chama!
```

**Certo** — o mesmo fato, nas quatro partes:
```
O acelerador não fica no cadastro do desafio: o cliente marca no arquivo, participante a
participante, quais desafios são extras. Por isso a planilha mostra como ficou em outubro:
9 desafios foram extras para todos que os receberam, e a Chave Pix só para 39 participantes
(banco de produção, 22/10). Para novembro, a indicação de acelerador precisa vir do cliente.
```
