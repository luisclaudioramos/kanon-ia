# Code Review

## Para quem está enviando o código
- Abra [PRs](GLOSSARIO.md#pr) pequenos e com escopo único — mais fáceis e rápidos de revisar bem.
- Descreva contexto: o problema, a solução escolhida, alternativas descartadas e como testar.
- Revise seu próprio [diff](GLOSSARIO.md#diff) antes de pedir revisão — muitos erros óbvios são pegos nessa autorrevisão.
- Responda comentários com dados/raciocínio, não na defensiva. Discorde tecnicamente, não pessoalmente.

## Para quem está revisando
- Foque em: corretude, legibilidade, segurança, cobertura de testes e aderência à arquitetura do projeto — nessa ordem de prioridade.
- Separe comentários bloqueantes de sugestões estilísticas (ex.: prefixe com "[nit](GLOSSARIO.md#nit):" para não-bloqueantes).
- Critique o código, não a pessoa: "essa função pode falhar quando X" em vez de "você esqueceu de tratar X".
- Aprovar não significa "perfeito", significa "seguro para mesclar". Não segure PRs por preferências pessoais menores.
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
