# 52 — Audience Message

## Propósito
Escrever uma mensagem avulsa para um público — pergunta, aviso, pedido de decisão, fechamento, incidente, entrega de material ou pedido a outro time — no formato que **quem lê** precisa para agir, com cada afirmação conferida e sem nada que não podia sair. Sem isso, cada mensagem sai no tom de quem pediu, com número sem fonte e pergunta já respondida, e o retrabalho aparece na resposta.

## Fase / Posição no fluxo
Transversal. Sob demanda (`kanon mensagem` ou `kanon audience-message`) para qualquer texto que sai do repositório para uma pessoa e não tem skill própria. As skills que já rascunham mensagens — `34-pull-request-review`, `47-handoff-delivery`, `48-screen-validation`, `49-change-impact` — podem acionar esta a partir da etapa 5.

## Entradas
- O que comunicar: o fato, a pergunta ou o pedido, com a origem (conversa, item, consulta).
- O destino: canal, conversa ou work item. Se não for informado, a skill pergunta — nunca deduz.
- Opcional: o tipo de mensagem e o item a que ela pertence (Feature, Bug, incidente).

## Saídas
- Um arquivo de [`templates/MENSAGEM.template.md`](../../templates/MENSAGEM.template.md) na pasta do item (na subpasta que o perfil registra para mensagens; sem registro, `mensagens/`), com o nome `AAAA-MM-DD-<publico>-<slug>.md` e o estado `rascunho` → `aprovado` → `enviado`.
- O texto apresentado no chat para aprovação, com o destino proposto.
- Depois do ok, um rascunho pela capacidade `comunicacao`. Nunca um envio.

## Regras principais

### Etapas
1. **Entrada.** Assunto, destino e tipo. Sem destino, pergunta. Mais de um público ou tipo, mais de uma mensagem: a skill propõe a divisão.
2. **Público.** Resolvido pelo destinatário, não por quem pediu, pela seção "Públicos" do perfil efetivo (papel ou grupo → público, [`process/17-company-profile.md`](../../process/17-company-profile.md)). Público "não registrado" ou dado vencido: pergunta a uma pessoa e propõe o registro pela `51-company-profile`.
3. **Ler antes.** Pela capacidade `comunicacao`, lê o destino desde o último envio sobre o assunto. Pergunta já respondida sai; resposta que chegou muda o texto. O que foi lido entra em "Lido antes de escrever".
4. **Verificar.** Cada afirmação de estado ("corrigido", "em produção", "aprovado") e cada número é conferido na capacidade certa (`dados`, `repositorio`, `trabalho`, `implantacao`, `observabilidade`) e anotado em `fontes` com a data. O que não pôde ser conferido vira hipótese explícita ou sai do texto ([`process/11-subagent-anti-hallucination.md`](../../process/11-subagent-anti-hallucination.md)).
5. **Escrever.** Estrutura do tipo ([`reference/comunicacao/03-tipos-de-mensagem.md`](../../reference/comunicacao/03-tipos-de-mensagem.md)), conteúdo e tom do público ([`02-publicos.md`](../../reference/comunicacao/02-publicos.md)), regras gerais ([`01-regras-gerais.md`](../../reference/comunicacao/01-regras-gerais.md)) e as regras locais do canal no perfil. Texto final, nada provisório.
6. **Revisar.** O papel [`COMMUNICATOR`](../../agents/AGENT-COMMUNICATOR.md) confere o texto. Achado bloqueante volta para a etapa 5; o texto só segue sem bloqueante.
7. **Aprovar.** O texto vai ao chat com o destino proposto, e a skill para. Aprovação vale para este texto e este destino; mudou um dos dois, pede de novo.
8. **Rascunhar.** Com o ok, cria o rascunho pela capacidade `comunicacao` (resposta numa conversa só com o identificador lido do destino) e grava `status: aprovado` e `aprovado_em`.
9. **Fechar.** Quando a pessoa envia, grava `status: enviado` e `enviado_em`. A resposta que chegar reabre a skill na etapa 3, numa mensagem nova.

### Limites
- **A skill nunca envia.** A ferramenta de envio não consta do `Depende de`, e essa ausência é o mecanismo.
- **Uma mensagem, um público, um tipo.** Pedido de decisão escondido num aviso é dividido.
- **Nada da área de uso interno** (prazo, divisão de entrega, estratégia) entra no texto, mesmo que esteja no item.
- **Nenhum nome de pessoa, canal ou ferramenta** fica nesta skill: vêm do perfil.
- **Material grande** (casos, evidências, telas, consultas longas) vai num documento compartilhável; a mensagem leva o link. Se a capacidade `comunicacao` não anexa arquivo, o rascunho sai com o texto e a pessoa anexa antes de enviar.

## Depende de
- `reference/comunicacao/`, `agents/AGENT-COMMUNICATOR.md`, `templates/MENSAGEM.template.md`.
- `process/11-subagent-anti-hallucination.md`, `process/12-knowledge-retrieval.md`, `process/13-external-integration-prerequisite.md`, `process/17-company-profile.md`.
- `51-company-profile` (público ou canal ausente vira proposta de perfil).
- Ferramentas externas: a capacidade `comunicacao` para ler o destino e criar rascunho; as capacidades de consulta (`dados`, `repositorio`, `trabalho`, `implantacao`, `observabilidade`) para verificar.

## Procedimento em caso de falha
Sem perfil, a skill roda em modo neutro: pergunta o público e o destino, escreve e revisa, e não cria rascunho. Capacidade `comunicacao` indisponível: o destino não é lido nem o rascunho criado; a mensagem fica `rascunho` no arquivo, com "Lido antes de escrever: não verificado — motivo", e o texto vai ao chat para a pessoa colar. Afirmação que não pôde ser conferida (acesso negado, consulta interrompida) não entra como fato: vira hipótese com o motivo, ou sai. Achado bloqueante que o autor não consegue resolver (falta um dado) para a skill, e ela diz qual dado falta e quem pode dá-lo.
