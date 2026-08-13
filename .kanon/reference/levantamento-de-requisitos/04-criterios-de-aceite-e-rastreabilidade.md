# Critérios de Aceite e Rastreabilidade

## Formato Gherkin

Todo critério de aceite deveria ser escrito no formato [Dado/Quando/Então](GLOSSARIO.md#gherkin):

```
Dado [um contexto/estado inicial]
Quando [uma ação acontece]
Então [um resultado observável e verificável é esperado]
```

Isso força três coisas que texto livre não garante: um estado de partida explícito, uma ação concreta (não uma intenção vaga), e um resultado que dá para checar como verdadeiro ou falso — não uma impressão subjetiva.

## Checklist [INVEST](GLOSSARIO.md#invest) para uma User Story

- **I**ndependente — não depende de outra story terminar primeiro para ser testável isoladamente.
- **N**egociável — é uma conversa em aberto sobre a melhor forma de resolver, não uma especificação técnica fechada demais.
- **V**aliosa — entrega valor de negócio identificável, não só valor técnico interno.
- **E**stimável — o time consegue dar uma ordem de grandeza de esforço a partir do que está escrito.
- **S**mall (pequena) — cabe em um ciclo de entrega curto; se não cabe, deveria estar dividida.
- **T**estável — existe um critério de aceite verificável, não "vamos saber quando virmos".

## [Rastreabilidade](GLOSSARIO.md#rastreabilidade)

Toda a cadeia deveria poder ser percorrida em qualquer direção:

```
Objetivo de negócio ←→ Requisito/User Story ←→ Critério de aceite ←→ Teste que o valida
```

Se alguém pergunta "por que estamos construindo isso", a resposta não pode ser "porque está no backlog" — precisa apontar para o objetivo de negócio de origem. Se alguém pergunta "como sei que terminou", a resposta não pode ser "o desenvolvedor disse que terminou" — precisa apontar para o critério de aceite verificado.

## Anti-padrão

- Critério de aceite que descreve implementação em vez de comportamento observável (ex.: "Dado que o método `validate()` é chamado" em vez de "Dado um CPF inválido no formulário").
- User Story sem nenhum objetivo de negócio citado, só a ação técnica ("Como usuário, quero um botão X" sem o "para que", i.e. o valor esperado).
- Requisito "óbvio demais para escrever critério" — normalmente é onde a exceção mora (ver [01-processo-de-elicitacao.md](01-processo-de-elicitacao.md), Regras de Ouro).
