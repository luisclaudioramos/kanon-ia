# Regras Gerais

## Quem lê, não quem pede

O público é o **destinatário** do texto, não quem pediu para escrevê-lo. Quem conversa com o agente costuma ser
alguém técnico; a mensagem que sai pode ser para negócio, dados ou um parceiro. Escrever no tom de quem pede é o
erro mais comum desta disciplina.

## Antes de escrever

1. **Ler o canal ou a conversa desde o último envio** e incorporar o que chegou. Pergunta que já foi respondida sai
   da mensagem; resposta que chegou muda o texto.
2. **Identificar o público** pelo destino e pelo destinatário. O perfil da empresa diz quem ocupa cada papel e qual
   canal atende cada assunto. Destino não informado é perguntado, nunca deduzido.
3. **Conferir no sistema o que vai ser afirmado.** "Corrigimos" só depois de ver a correção aplicada; antes disso,
   "vamos corrigir". Todo número leva a fonte e o momento (banco de produção em uma data, arquivo de um dia, cópia
   analítica de D-1).
4. **Saber o que a mensagem pede ao leitor.** Se não pede nada, é aviso ou fechamento; se pede, a pergunta ou o
   pedido vai na primeira linha.

## Ao escrever

- **O pedido ou a conclusão na primeira linha.** Quem lê só a prévia já sabe do que se trata e se precisa agir.
- **Um assunto por mensagem.** Assunto tratado em outro canal não é citado.
- **Fato separado de hipótese.** O que não foi conferido aparece como hipótese, nunca com a confiança de um fato
  (`process/11-subagent-anti-hallucination.md`).
- **Nível técnico proporcional ao leitor.** Nem jargão de código para quem decide produto, nem abstração vaga para
  quem vai implementar. Como traduzir o achado e testar o texto antes de propor: [04](04-escrita-clara.md).
- **Material grande vai num documento compartilhável** (casos de teste, evidências, telas, consultas longas) e a
  mensagem leva o link.
- **Pergunta parte só do que o leitor disse.** Não se inventam opções nem cenários que ele não citou; a decisão
  volta para ele, sem recomendação no lugar dela.
- **Pergunta ao time vai para o time**, não para uma pessoa marcada, salvo pedido de quem aprova o envio.

## O que nunca entra, para nenhum público

- Segredo, credencial, token ou chave, nem parcial.
- Dado pessoal de cliente (documento, e-mail, telefone, nome). Se o caso exige identificar alguém, usar um
  identificador técnico ou o documento mascarado, e só para quem tem direito de ver.
- Caminho interno (pasta da máquina, caminho do repositório de conteúdo) que o leitor não consegue abrir.
- Prazo interno, divisão de entrega e estratégia: ficam no repositório de conteúdo, como uso interno.
- Estimativa que não saiu do time que vai executar.
- Nome de quem investigou ou errou, para quem não é do time técnico.

## Conflito de prioridade

Quando a mensagem medeia um conflito (débito técnico × nova funcionalidade, prazo × qualidade), ela apresenta os dois
lados com o mesmo peso: o risco de cada caminho, o valor de cada um e quem decide. Não escolhe por quem decide.

## Decisão humana

Arquitetura crítica, orçamento, priorização e roteiro são decididos por pessoas. A mensagem pode levar a análise; a
decisão aparece como pendente de quem tem a autoridade, nunca como tomada.

## Envio

- **O agente rascunha, a pessoa envia.** Rascunho só depois da aprovação do texto **e** do destino, a cada envio;
  aprovação de um envio não vale para o próximo.
- **Texto final já no rascunho.** Nada de texto provisório para ajustar depois.
- **O texto enviado fica registrado** junto do item a que se refere (feature, bug, incidente), com destino, data e
  estado (rascunho, enviado).
- **Resposta recebida reabre o ciclo** a partir do passo 1 de "Antes de escrever".

## Exemplo concreto

**Errado** — escrito no tom de quem pediu, com caminho interno e afirmação não conferida:
```
Corrigido! O bug estava em src/services/stage.ts:142, a query não fazia o join com a
participant_stage. Já tá ok, qualquer coisa me chama.
```

**Certo** — para o negócio, conferido e com o próximo passo:
```
Os elegíveis de outubro batem com os arquivos: 7,3 milhões, conferido no banco hoje
às 10h. A diferença da análise vinha de olhar só uma das duas tabelas onde eles ficam.
Seguem as consultas para vocês replicarem.
```
