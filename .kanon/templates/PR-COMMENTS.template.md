# Comentários de PR — _[preencher: título do PR]_

[Home](../../README.md) > [Feature](README.md) > Comentários de PR

_Gerado/gerenciado por `skills/13-code-review` (redação) e `skills/34-pull-request-review` (publicação), seguindo `agents/AGENT-CODE-REVIEWER.md`. É o texto que vai, literalmente, para as threads do PR — diferente do `CODE-REVIEW-REPORT.template.md`, que é o relatório interno completo. Passa por revisão humana antes de qualquer publicação._

> **Estado**: `RASCUNHO` | `PUBLICADO em _[preencher: data]_` · threads _[preencher: ids]_ · voto: _[preencher: nenhum | aguardando autor]_
> **Âncoras**: iteração _[preencher: n]_ do PR, commit _[preencher: hash]_. Código de outros repositórios citado em _[preencher: repositório@branch (commit)]_.
> **Leitor**: _[preencher: papel de quem vai ler — ex.: engenheiro frontend sem acesso ao repositório do BFF]_. Tudo que esse leitor não consegue abrir sozinho é citado inline.

## Regras deste artefato

- **Um comentário geral + um inline por achado**, em ordem de severidade. O geral resume; o inline prova.
- **Severidade em quatro níveis**, declarada no título do inline: `bloqueia` (o PR não pode ir), `ajuste` (vai, mas corrige), `pergunta` (decisão que não é do autor), `registro` (fica na história, não pede ação).
- **Cada inline abre com a afirmação em uma frase, em negrito.** Quem lê decide em uma linha se precisa do resto.
- **Autossuficiente para o leitor declarado.** Lógica de outro repositório entra como trecho literal (3 a 8 linhas) + link para a linha + `arquivo:linha`. Nunca "ver o arquivo X do back".
- **Diagramas em texto**, dentro de cerca de código: o fluxo que funciona ao lado do que quebra, ou o caso concreto com valores, datas e horas. Comentário de PR não renderiza Mermaid.
- **Exemplo concreto antes de abstração**: `"Vale-presente R$ 50"` × `"Uber"`, `30/09 22:00`, não "o nome pode divergir".
- **Nenhuma referência a documento interno** (spec, plano, transcrição, vault, memória). Decisão de negócio entra como "combinado com _[pessoa]_ em _[data]_". O leitor não tem esses arquivos.
- **Correção sempre presente**, com o efeito colateral que acompanha (o campo que muda em outro lugar, o teste que passa a valer).
- **Teste sugerido com fixture concreto** quando o defeito passou pelo spec existente.
- **Publicação só depois de revisão humana** do rascunho, pela conta do revisor humano, ancorada na última iteração do PR. Sem voto, salvo pedido explícito. Os ids das threads voltam para o cabeçalho deste arquivo.

## Comentário geral (thread sem arquivo)

> _[preencher: um parágrafo — o que foi revisado, contra o quê (spec, back, API), o que foi executado (testes, comandos) e o veredito em uma frase. Reconhecer o que está bom antes do que bloqueia.]_
>
> **Bloqueia**
> 1. _[preencher: uma linha por achado — o fato e o erro que produz, não o raciocínio]_
>
> **Ajustes**
> 2. _[preencher]_
>
> **Perguntas e registros**
> 3. _[preencher]_

## Inline 1 — `_[preencher: arquivo:linha]_` · bloqueia

> **_[preencher: a afirmação em uma frase]_**
>
> _[preencher: o que o código do PR faz neste ponto, nomeando o símbolo e de onde vem o dado]_
>
> _[preencher: o que o outro sistema faz com esse dado — nome do arquivo:linha e link para a linha no repositório]_:
>
> ```_[preencher: linguagem]_
> _[preencher: trecho literal, sem edição além de comentários curtos à direita]_
> ```
>
> ```
> _[preencher: diagrama em texto — os dois caminhos lado a lado, ou o caso concreto]_
> ```
>
> **Correção.** _[preencher: o que mudar, onde, e o que muda junto]_
>
> _[preencher: opcional — "O spec não pega porque o fixture é X. Sugiro um teste com Y afirmando Z."]_

## Inline 2 — `_[preencher: arquivo:linha]_` · ajuste

> **_[preencher: a afirmação em uma frase]_**
>
> _[preencher: mesma estrutura do Inline 1 — trecho do outro sistema, diagrama, correção]_

## Inline 3 — `_[preencher: arquivo:linha]_` · pergunta

> **_[preencher: a afirmação em uma frase]_**
>
> _[preencher: o que está implementado, o que foi combinado e com quem, e a pergunta fechada: "é entrega em duas partes? Se for, registramos como pendência da US; se não, precisa entrar aqui."]_

## Inline 4 — `_[preencher: arquivo:linha]_` · registro

> _[preencher: uma ou duas frases — o que muda fora do escopo, por que faz sentido, e o que pedir (ex.: uma linha na descrição do PR)]_
