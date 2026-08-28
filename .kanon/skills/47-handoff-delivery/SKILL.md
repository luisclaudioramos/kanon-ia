# 47 — Handoff Delivery

## Propósito
Levar as três passagens de bastão de um assunto até quem precisa delas: o handoff de engenharia vira comentário no work item que já existe, e cada perfil recebe um rascunho de mensagem dirigido a ele. Sem isso, o handoff fica escrito e não chega — e quem precisa lê-lo não abre a base de conhecimento.

## Fase / Posição no fluxo
Fase 5 — Publicação e Integrações. Roda depois que `skills/46-handoff-authoring` gerou os três handoffs e que `skills/16-azure-devops-integration-sm` publicou a US. É acionada por pedido explícito do usuário, nunca em sequência automática com a skill anterior.

## Entradas
- Um assunto de `docs/assuntos/` com `work_item_ado` no front-matter.
- A pasta `docs/handoffs/<id-do-assunto>/` com `dev.md`, `po.md` e `negocios.md`.
- Os três destinatários, informados pelo usuário no momento do encaminhamento.
- A base da URL de work item, registrada no arquivo do projeto em `projects/`.

## Saídas
- Um comentário no work item, com o handoff de engenharia inteiro e o bloco do que está travado.
- Três rascunhos de mensagem no Slack, um por perfil, cada um com o link do work item.
- No assunto, `rascunho_criado: <data>`.

## Regras principais
- **A skill nunca envia.** Ela cria rascunho e para. Quem envia é uma pessoa, depois de revisar. A ferramenta de envio não consta do `Depende de`, e essa ausência é o mecanismo — não a intenção.
- **A skill nunca cria work item.** Sem `work_item_ado` no assunto, ela declara a falta e encerra, apontando `skills/16-azure-devops-integration-sm`. Não cria, não improvisa, não anexa.
- **Destinatário não se adivinha.** Nenhum cadastro, nenhuma dedução a partir dos donos das lacunas. Os donos vivem dentro dos documentos e continuam lá; eles não viram endereço.
- **O handoff de Negócios não vai para o work item.** Ele é dirigido a quem não abre work item, e engordaria o registro permanente sem alcançar leitor nenhum.
- **O texto composto é validado, não só os arquivos que o originaram.** A junção é um documento novo: nome de pessoa pode entrar na costura, e é esse texto que sai da empresa. `tools/compor_comentario.py` bloqueia os nomes que o assunto declara — `solicitante` e os `quem:` de `origem` no front-matter; um nome de terceiro citado numa transcrição, mas ausente dessas duas fontes, não é conhecido pelo bloqueio (ver DESIGN.md §6.2).
- **O front-matter do assunto não atravessa para o comentário.** É onde mora o nome do solicitante.
- **Referência à base de conhecimento vira conteúdo embutido, nunca link.** Um link que o destinatário não abre promete contexto e entrega nada.
- **Republicar edita o mesmo comentário.** A primeira linha do comentário é `<!-- handoff:<id-do-assunto> -->`; a skill procura esse marcador antes de escrever. Achou, edita; não achou, cria. Marcador em mais de um comentário é estado ambíguo: a skill para.
- **Comentário primeiro, rascunhos depois.** Se a escrita no work item falhar, nenhum rascunho é criado — mensagem que aponta para link sem conteúdo é pior que mensagem nenhuma.
- **Rascunho duplicado é avisado, não deduplicado.** Repetir a rodada cria uma segunda cópia; o dano é pequeno e visível, e a skill diz isso em vez de inventar mecanismo.
- **A skill nunca registra que a mensagem foi enviada.** O conhecimento dela termina no rascunho: o assunto grava `rascunho_criado`, e nada além. Quem envia sabe que enviou.
- **Cada mensagem passa por `tools/validate_mensagem.py` antes de virar rascunho.** Erro bloqueia.

## Depende de
- `skills/46-handoff-authoring`, `skills/16-azure-devops-integration-sm`, `tools/compor_comentario.py`, `tools/validate_mensagem.py`, `tools/validate_handoffs.py`, `process/11-subagent-anti-hallucination.md`.
- Ferramentas externas: `slack_send_message_draft` para os rascunhos; a integração de work items para ler comentários, criar e editar comentário.

## Procedimento em caso de falha
Se o assunto não tiver `work_item_ado`, a skill declara a falta, nomeia `skills/16-azure-devops-integration-sm` como o caminho, e encerra. Se faltar handoff na pasta, ela nomeia qual e encerra. Se `tools/compor_comentario.py` acusar erro, nada é publicado — nem parcialmente — e a skill reporta os erros literais. Se a escrita do comentário falhar, a skill para antes de qualquer rascunho e diz que nenhuma mensagem foi criada. Se um rascunho falhar no meio, ela relata exatamente quais foram criados e encerra sem repetir a rodada, porque repetir duplica. Se o marcador aparecer em mais de um comentário do mesmo work item, a skill para e pede resolução humana, em vez de escolher um.
