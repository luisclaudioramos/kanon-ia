# 46 — Handoff Authoring

## Propósito
Gerar, a partir de um assunto, três passagens de bastão escritas para públicos diferentes — engenharia, PO e Negócios — de modo que cada lacuna nomeada no assunto chegue a quem pode resolvê-la. Sem isso, lacunas ficam abertas por falta de destinatário, não por falta de resposta.

## Fase / Posição no fluxo
Fase 3 — Governança, Qualidade e Transições. Roda após `skills/44-topic-enrichment` ter preenchido o dossiê, e pode rodar de novo a cada mudança do assunto.

## Entradas
- Um assunto de `docs/assuntos/` com a seção `## Dossiê` preenchida.
- Os templates `templates/HANDOFF-DEV.template.md`, `templates/HANDOFF-PO.template.md` e `templates/HANDOFF-NEGOCIOS.template.md`.

## Saídas
- Uma pasta `docs/handoffs/<id-do-assunto>/` com `dev.md`, `po.md` e `negocios.md`.
- Para cada handoff, o texto da mensagem de encaminhamento, que é apresentado ao usuário e não gravado no documento.

## Regras principais
- **Fonte única.** Os três leem o mesmo assunto e o corpus. Nenhum carrega fato ausente do dossiê — se faltar, a skill declara a falta e não preenche (`process/11-subagent-anti-hallucination.md`). Esta regra não é verificada por máquina: o validador de mensagens e handoffs da camada de integração (no Claude Code: `node .claude/scripts/kanon-mensagem.js <pasta>`) confere forma, dado proibido, nomes e caminhos, não aterramento factual. Ela depende de disciplina do agente gerador mais a revisão humana obrigatória antes do envio.
- **Regeneração é reescrita.** Quando o assunto muda, os três são reescritos do zero. A skill nunca remenda um handoff existente, porque remendo desalinha da fonte em silêncio.
- **Cada perfil é definido pelo que o leitor precisa conseguir fazer**, não pelo cargo: engenharia sai capaz de escolher a abordagem e estimar; PO sai capaz de rotear cada pendência; Negócios sai capaz de responder a pergunta que trava o assunto.
- **Papéis, nunca nomes, no documento.** Os nomes existem no assunto e continuam lá — a omissão é um ato da externalização, não um apagamento na origem. O nome próprio aparece apenas na mensagem de encaminhamento.
- **Nenhum caminho da base de conhecimento no documento.** Cada handoff é auto-contido: a evidência que cita, ele carrega.
- **No handoff de engenharia, nada de imperativo dirigido ao leitor.** A skill oferece leituras, não ordens; não proíbe verificação; não define régua de entrega; e não concede decisões que já são de quem constrói.
- **No handoff de PO, evidência técnica entra apenas quando ela é o argumento.** Se o detalhe não muda nada que o PO decida, fica fora.
- **No handoff de Negócios, custo técnico entra apenas quando uma opção é desproporcionalmente mais cara**, e como alerta, nunca como tabela de preços.
- **Toda pasta gerada passa pelo validador de mensagens e handoffs antes do encerramento da skill.** Erro bloqueia a entrega; aviso é reportado e não bloqueia.
- **Revisão humana obrigatória antes de qualquer envio externo.** A skill entrega os três documentos e as mensagens de encaminhamento para revisão; publicar e enviar não são responsabilidade dela.

## Depende de
- `templates/HANDOFF-DEV.template.md`, `templates/HANDOFF-PO.template.md`, `templates/HANDOFF-NEGOCIOS.template.md`, `skills/44-topic-enrichment`, `process/06-markdown-formatting-rules.md`, `process/11-subagent-anti-hallucination.md`.

## Procedimento em caso de falha
Se o assunto não tiver `## Dossiê` preenchido, a skill declara isso e encerra — não gera handoff a partir de assunto apenas capturado. Se um fato necessário a um dos perfis não existir no assunto, a skill escreve o handoff sem ele e registra a ausência explicitamente no documento, em vez de preencher com suposição. Se não conseguir sustentar uma afirmação no dossiê, a skill omite a afirmação e registra a omissão no próprio handoff — nunca a mantém contando que alguém perceba depois. Se o validador acusar erro, os handoffs não são considerados entregues e a skill reporta o erro literal.
