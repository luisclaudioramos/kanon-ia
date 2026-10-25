# Templates — Esqueletos dos Artefatos do Harness

Enquanto [`skills/`](../skills) define **o que é executado** e [`process/`](../process) define **como** o sistema se comporta, esta pasta contém os **esqueletos reais** de cada documento que o pipeline gera — o que uma skill preenche quando cria um `PLAN.md`, uma `USER-STORY-01.md` ou um `RUNBOOK.md`.

Cada arquivo aqui é um `.template.md`: uma estrutura pronta para ser copiada e preenchida, com campos marcados em itálico como `_[preencher: ...]_`. Segue a formatação obrigatória de [`process/06-markdown-formatting-rules.md`](../process/06-markdown-formatting-rules.md).

## Índice

### Grupo 1 — Arquitetura e Planejamento Mestre
| Template | Gerado/usado por |
|---|---|
| [REQUIREMENT-SUMMARY.template.md](REQUIREMENT-SUMMARY.template.md) | Brief executivo, gerado por `skills/39-generate-requirement-summary` |
| [DESIGN.template.md](DESIGN.template.md) | Hard gate de ≥2 alternativas de alto nível, gerado por `skills/41-design-gate` — bloqueia os 3 abaixo até `APPROVED` |
| [PLAN.template.md](PLAN.template.md) | Plano mestre da Feature; herda a decisão já aprovada em `DESIGN.md` |
| [ARCHITECTURE.template.md](ARCHITECTURE.template.md) | Documento de arquitetura da Feature, gerado por `skills/04-architecture-assessment`; lista os ADRs que ela gerou |
| [DESIGN-REVIEW.template.md](DESIGN-REVIEW.template.md) | Rodada de revisão de design técnico (RFC, ADR e `DESIGN.md`), pelo checklist "Revisão de RFC e ADR" do `agents/AGENT-TECH-LEAD.md`: veredicto, problemas críticos, melhorias, riscos, testes em falta, perguntas ao autor |
| [DECISION-RECORD.template.md](DECISION-RECORD.template.md) | Modelo único de RFC e ADR (`reference/boas-praticas-dev/06-documentacao.md`): número, estado, contexto, decisão, alternativas, consequências, riscos, migração e rollback, critérios de aceitação. Usado por `skills/04-architecture-assessment` e por qualquer decisão técnica, com ou sem Feature |
| [FEATURE.template.md](FEATURE.template.md) | Especificação funcional, gerada por `skills/03-create-feature-artifacts`. Do título ao "Anexo A" é o modelo do item publicado, conferido pela trava de `process/18-work-item-publication-gate.md` |

### Grupo 2 — Refino e Desdobramento
| Template | Gerado/usado por |
|---|---|
| [USER-STORY.template.md](USER-STORY.template.md) | `skills/06-create-user-story-artifacts` |
| [TASK.template.md](TASK.template.md) | `skills/08-create-task-artifacts` |
| [SCREEN-VALIDATION.template.md](SCREEN-VALIDATION.template.md) | `skills/48-screen-validation` — índice, mudanças, anatomia, envios e registro de aprovações das telas, por tela e versão |
| [CHANGE-IMPACT.template.md](CHANGE-IMPACT.template.md) | `skills/49-change-impact` — impacto, alternativas, o que falta validar e as duas mensagens de um pedido de mudança |
| [DESIGN-PROFILE.template.md](DESIGN-PROFILE.template.md) | `skills/50-design-profile` — perfil de design de um sistema: itens estruturais, breakpoints, padrões por função e inventário do legado |
| [USER-STORY-INSTRUCTIONS.template.md](USER-STORY-INSTRUCTIONS.template.md) | Guia para `skills/05-refine-user-stories` |
| [FEATURE-INSTRUCTIONS.template.md](FEATURE-INSTRUCTIONS.template.md) | Guia para `skills/01-refine-feature` |

### Grupo 3 — Defeitos, Testes e Gap
| Template | Gerado/usado por |
|---|---|
| [BUG.template.md](BUG.template.md) | `skills/32-report-bug` |
| [BUG-TASK.template.md](BUG-TASK.template.md) | `skills/27-bug-task-management` |
| [BUG-INSTRUCTIONS.template.md](BUG-INSTRUCTIONS.template.md) | Guia para reportar bugs |
| [TEST-CASE.template.md](TEST-CASE.template.md) | `skills/25-test-case-authoring` |
| [TEST-REPORT.template.md](TEST-REPORT.template.md) | `skills/28-test-report` |
| [POSTMORTEM.template.md](POSTMORTEM.template.md) | Postmortem sem culpa de incidente (`reference/boas-praticas-dev/11-debugging.md`): resumo, linha temporal com os quatro marcos, impacto, causa raiz, o que funcionou e falhou, ações corretivas com item, lições aprendidas |
| [GAP-REPORT.template.md](GAP-REPORT.template.md) | Análise de lacunas para decisão go/no-go |

### Grupo 4 — Governança, Revisão e Entrega
| Template | Gerado/usado por |
|---|---|
| [CODE-REVIEW-REPORT.template.md](CODE-REVIEW-REPORT.template.md) | `skills/13-code-review`, via `agents/AGENT-CODE-REVIEWER.md` — relatório interno: Ficha da PR e problemas para a consolidação no chat, teste de mutação e envelope |
| [PR-REVIEW-ROUND.template.md](PR-REVIEW-ROUND.template.md) | `skills/13-code-review` (redação) e `skills/34-pull-request-review` (publicação) — o texto literal que vai para a PR em cada rodada: parecer na conversa, voto curto e uma thread por achado com o critério que a fecha |
| [PR-DESCRIPTION.template.md](PR-DESCRIPTION.template.md) | `skills/12-development-execution` (preenche) e `skills/34-pull-request-review` (usa ao criar a PR) — descrição de PR com as seções exigidas por `process/15-pull-request-gates.md` |
| [RUNBOOK.template.md](RUNBOOK.template.md) | `skills/19-runbook-authoring` |
| [HANDOFF.template.md](HANDOFF.template.md) | `skills/10-handoff-management`, `process/04` e `process/07` |
| [HANDOFF-DEV.template.md](HANDOFF-DEV.template.md) | `skills/46-handoff-authoring` — passagem de bastão para engenharia |
| [HANDOFF-PO.template.md](HANDOFF-PO.template.md) | `skills/46-handoff-authoring` — passagem de bastão para PO |
| [HANDOFF-NEGOCIOS.template.md](HANDOFF-NEGOCIOS.template.md) | `skills/46-handoff-authoring` — passagem de bastão para Negócios |
| [STATUS-REPORT.template.md](STATUS-REPORT.template.md) | Mensagem do tipo "Status" para liderança executiva ou gestão de entrega: estado com a régua de cor, progresso desde o último report, riscos e bloqueios, decisões necessárias e próximos marcos (data só da estimativa do time) |
| [AMBIENTE.template.md](AMBIENTE.template.md) | Fatos do ambiente de uma empresa (`process/17-company-profile.md`, `process/19-evidence-verification.md`): significado de tabelas e campos, comportamento de jobs e botões, o que está em vigor em cada ambiente, limites das ferramentas de consulta |
| [MENSAGEM.template.md](MENSAGEM.template.md) | Mensagem avulsa para um público (`reference/comunicacao/`), revisada por `agents/AGENT-COMMUNICATOR.md`: público, tipo, destino, fontes, texto e aprovação |
| [MEMORY.template.md](MEMORY.template.md) | `skills/15-memory-update` |
| [COST-OF-OWNERSHIP.template.md](COST-OF-OWNERSHIP.template.md) | `skills/30-cost-of-ownership-tco` |
| [AGENT-REPORT.template.md](AGENT-REPORT.template.md) | Auditoria de execução de agentes |

### Grupo 5 — Publicação e Integração
| Template | Gerado/usado por |
|---|---|
| [PUBLISH-SUMMARY.template.md](PUBLISH-SUMMARY.template.md) | `skills/16`, `skills/21` e `skills/26` — resumo de publicação por capacidade (`trabalho` ou `documentacao`) |
| [APPROVAL-NOTIFICATION-SUMMARY.template.md](APPROVAL-NOTIFICATION-SUMMARY.template.md) | `skills/34-pull-request-review` — rastreia a notificação de PR pela capacidade `comunicacao` |
| [SUBAGENT-DISPATCH.template.md](SUBAGENT-DISPATCH.template.md) | `skills/24-development-orchestration` |

### Grupo 6 — Padrões e Estilo
| Template | Gerado/usado por |
|---|---|
| [CODE-STYLISH.template.md](CODE-STYLISH.template.md) | Base para `skills/37-validate-code-style` |

### Grupo 7 — Subpastas específicas
| Arquivo | Propósito |
|---|---|
| [evidence/EVIDENCE.template.md](evidence/EVIDENCE.template.md) | Fonte Markdown do pacote de auditoria (`skills/33-audit-evidence`) — a geração do `.docx` final é ferramental futuro, fora do escopo desta pasta |
| [documentacao/FIXED-PAGES.md](documentacao/FIXED-PAGES.md) | Hierarquia de páginas: pasta Features obrigatória, em local informado por quem publica |
| [documentacao/PAGE-MODELS.md](documentacao/PAGE-MODELS.md) | Modelos de página: Feature (ficha + filhos `NN — Nome`), ADR (publicação do `DECISION-RECORD`), relatório mensal |
| [documentacao/STANDARDS.md](documentacao/STANDARDS.md) | Padrões de escrita: títulos, sem referência interna, fontes, situação e atualizações |

### Grupo 8 — Perfil da empresa
| Template | Gerado/usado por |
|---|---|
| [PERFIL.template.md](PERFIL.template.md) | `skills/51-company-profile` — perfil de uma empresa, área ou equipe (frontmatter estruturado + como comunicar, processos, regras locais) |
| [HISTORICO-PERFIL.template.md](HISTORICO-PERFIL.template.md) | `skills/51-company-profile` — histórico de mudanças do perfil, uma entrada por proposta |

## Convenções

- Campos a preencher aparecem como `_[preencher: descrição do que vai aqui]_`.
- Documentos que vivem dentro da pasta de uma Feature trazem uma linha de breadcrumb logo abaixo do título, conforme `process/06-markdown-formatting-rules.md`.
- Nenhum template aqui substitui o conteúdo dos agentes ([`agents/`](../agents)) ou dos processos ([`process/`](../process)) — eles apenas dão a forma; quem decide o conteúdo é o agente/skill responsável.
