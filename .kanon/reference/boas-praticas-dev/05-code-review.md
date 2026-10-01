# Code Review

## Para quem está enviando o código
- Abra [PRs](GLOSSARIO.md#pr) pequenos e com escopo único — mais fáceis e rápidos de revisar bem.
- Descreva a mudança seguindo as travas de [`process/15-pull-request-gates.md`](../../process/15-pull-request-gates.md): como era e como fica, integrações, como testar, massa de teste, testes e documentação atualizada. O esqueleto está em [`templates/PR-DESCRIPTION.template.md`](../../templates/PR-DESCRIPTION.template.md).
- Revise seu próprio [diff](GLOSSARIO.md#diff) antes de pedir revisão — muitos erros óbvios são pegos nessa autorrevisão.
- Responda comentários com dados/raciocínio, não na defensiva. Discorde tecnicamente, não pessoalmente.

## Para quem está revisando
- Foque em: corretude, legibilidade, segurança, cobertura de testes e aderência à arquitetura do projeto — nessa ordem de prioridade.
- Separe comentários bloqueantes de sugestões estilísticas (ex.: prefixe com "[nit](GLOSSARIO.md#nit):" para não-bloqueantes).
- Critique o código, não a pessoa: "essa função pode falhar quando X" em vez de "você esqueceu de tratar X".
- Aprovar não significa "perfeito", significa "seguro para mesclar". Não segure PRs por preferências pessoais menores.
- Escreva cada comentário para quem vai lê-lo, com o que ele tem à mão. Se o achado depende de outro sistema (BFF, API, banco), copie o trecho relevante para dentro do comentário, com `arquivo:linha` e link — não mande a pessoa "conferir no back" que ela talvez nem consiga abrir.
- Abra o comentário com a afirmação em uma frase; mostre o caminho que funciona ao lado do que quebra (um diagrama em texto basta) e um exemplo com valores concretos; feche com a correção e, se o defeito passou pelos testes, o teste que o pegaria.
- Não cite documentos que o autor do PR não tem (spec interna, ata, plano). O que ele precisa saber cabe no comentário; decisão de negócio entra como "combinado com _pessoa_ em _data_".
- Revise em até 24h (ou o [SLA](GLOSSARIO.md#sla) do time) — revisão lenta é um dos maiores gargalos de produtividade em times.

## O que observar em uma review
- A mudança resolve o problema descrito, sem introduzir regressões?
- Existem testes cobrindo o novo comportamento e casos de borda?
- Há duplicação que poderia reaproveitar código existente?
- Há riscos de segurança (input não validado, segredo exposto, injeção)?
- O nome das variáveis/funções comunica bem a intenção?
- A complexidade adicionada é proporcional ao problema resolvido?

## Cultura
- Code review é colaboração, não [gatekeeping](GLOSSARIO.md#gatekeeping). O objetivo é código melhor para o time, não "vencer" uma discussão.
- Reviews frequentes e pequenas > reviews raras e gigantes.
