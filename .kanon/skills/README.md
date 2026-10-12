# Skills — Pipeline Executável do Harness

Enquanto [`process/`](../process/README.md) define **como** o sistema deve se comportar (contratos, gates, formatos) e [`agents/`](../agents) define **quem** aplica cada lente de qualidade, esta pasta define **o que é executado, passo a passo** — as skills que compõem o pipeline completo de uma Feature, do requisito bruto até o encerramento.

Cada skill é uma **pasta** contendo um `SKILL.md` (+ arquivos de apoio quando necessário) com: Propósito, Fase/Posição no fluxo, Entradas, Saídas, Regras principais, Depende de (processos/agentes/outras skills), Procedimento em caso de falha.

Esta pasta implementa o pipeline do sistema "Kanon" (harness + skills + agentes + hooks + integrações). As integrações externas são escolhidas por capacidade no perfil da empresa (`process/17-company-profile.md`) e implementadas por adaptadores na camada de integração — as skills abaixo já descrevem o papel delas para quando forem construídas (ver `.kanon/skills/setup/SKILL.md`). Publicação e Pull Request são obrigatórios por padrão (`process/13-external-integration-prerequisite.md`); rodar sem essas integrações exige uma exceção explícita e registrada, não um pulo silencioso.

## Índice por fase

### Fase 0 — Inicialização e Contexto
| Skill | Propósito |
|---|---|
| [00-harness-runtime](00-harness-runtime/SKILL.md) | Boot do harness: valida ambiente, carrega o runtime contract, prepara o menu |
| [43-meeting-intake](43-meeting-intake/SKILL.md) | Varre as transcrições de um dia, captura assuntos e interroga o usuário sobre o que não entendeu |
| [44-topic-enrichment](44-topic-enrichment/SKILL.md) | Levanta o que já se sabe de um assunto e separa isso das lacunas que só um humano responde |
| [45-knowledge-promotion](45-knowledge-promotion/SKILL.md) | Promove fato verificado para `docs/knowledge/` e marca como superada a nota que deixou de valer |
| [41-design-gate](41-design-gate/SKILL.md) | Hard gate: ≥2 alternativas de alto nível + aprovação humana, antes de especificar a Feature (roda após 39, antes de 01) |
| [01-refine-feature](01-refine-feature/SKILL.md) | Transforma ideação crua em estrutura inicial de Feature |
| [02-discover-context](02-discover-context/SKILL.md) | Varre codebase/memória por padrões e decisões relacionadas |

### Fase 1 — Arquitetura e Especificação
| Skill | Propósito |
|---|---|
| [03-create-feature-artifacts](03-create-feature-artifacts/SKILL.md) | Cria a estrutura de pastas e os 3 documentos mestres da Feature |
| [04-architecture-assessment](04-architecture-assessment/SKILL.md) | Avalia 2 alternativas de arquitetura e decide o tech-stack |
| [22-generate-architecture-context](22-generate-architecture-context/SKILL.md) | Gera diagramas C4 e contexto técnico detalhado |
| [30-cost-of-ownership-tco](30-cost-of-ownership-tco/SKILL.md) *(1ª passada)* | TCO preliminar — informa o dimensionamento de `07-refine-tasks` |

### Fase 2 — Refino de Usuário e Tarefas
| Skill | Propósito |
|---|---|
| [05-refine-user-stories](05-refine-user-stories/SKILL.md) | Quebra a Feature em User Stories com Acceptance Criteria |
| [06-create-user-story-artifacts](06-create-user-story-artifacts/SKILL.md) | Materializa `USER-STORY-XX.md` |
| [07-refine-tasks](07-refine-tasks/SKILL.md) | Divide User Stories em tasks técnicas atômicas (SPx6h) |
| [08-create-task-artifacts](08-create-task-artifacts/SKILL.md) | Materializa `TASK-XX.md` |
| [48-screen-validation](48-screen-validation/SKILL.md) | Valida as telas de uma US com o PO e o negócio, por tela e versão, e registra a aprovação — não bloqueia o front; cobra na entrega |

### Fase 3 — Governança, Qualidade e Transições
| Skill | Propósito |
|---|---|
| [09-feature-state-management](09-feature-state-management/SKILL.md) | Move a Feature entre `backlog/ready/doing/done` |
| [10-handoff-management](10-handoff-management/SKILL.md) | Controla a passagem de bastão entre agentes |
| [11-quality-gate](11-quality-gate/SKILL.md) | Executa a bateria de validações da Definition of Done |
| [13-code-review](13-code-review/SKILL.md) | Aciona CODE-REVIEWER para revisão sistemática |
| [14-qa-validation](14-qa-validation/SKILL.md) | Valida a implementação contra os Acceptance Criteria |
| [46-handoff-authoring](46-handoff-authoring/SKILL.md) | Gera três passagens de bastão de um assunto — engenharia, PO e Negócios — cada uma escrita para o que aquele leitor precisa decidir |
| [47-handoff-delivery](47-handoff-delivery/SKILL.md) | Leva o handoff de engenharia ao comentário do work item e cria três rascunhos pela capacidade `comunicacao` — nunca envia, nunca cria work item |

### Fase 4 — Desenvolvimento e Testes
| Skill | Propósito |
|---|---|
| [12-development-execution](12-development-execution/SKILL.md) | Aciona o engenheiro (Backend/Frontend/Data) para implementar uma Task |
| [24-development-orchestration](24-development-orchestration/SKILL.md) | Orquestra fan-out de até 12 engenheiros em paralelo |
| [25-test-case-authoring](25-test-case-authoring/SKILL.md) | Gera casos de teste em Gherkin a partir dos AC |
| [26-test-case-publication](26-test-case-publication/SKILL.md) | Publica casos de teste na ferramenta de trabalho do perfil |
| [27-bug-task-management](27-bug-task-management/SKILL.md) | Gerencia tasks corretivas vinculadas a um Bug |
| [28-test-report](28-test-report/SKILL.md) | Compila relatório de execução de testes com evidências |
| [29-implementation-summary-update](29-implementation-summary-update/SKILL.md) | Mantém o resumo de implementação atualizado |

### Fase 5 — Publicação e Integrações
| Skill | Propósito |
|---|---|
| [16-work-tracking-publication](16-work-tracking-publication/SKILL.md) | Sincroniza artefatos com a ferramenta de trabalho do perfil (capacidade `trabalho`) |
| [21-documentation-publication](21-documentation-publication/SKILL.md) | Publica conhecimento de longo prazo na ferramenta de documentação do perfil (capacidade `documentacao`) |

_A skill 31 foi aposentada em 2026-10-11 (absorvida pela 21); o número não é reaproveitado._

### Fase 6 — Memória, Custo e Encerramento
| Skill | Propósito |
|---|---|
| [15-memory-update](15-memory-update/SKILL.md) | Compila lições aprendidas em `MEMORY.md` |
| [23-register-lesson-learned](23-register-lesson-learned/SKILL.md) | Registra uma lição isolada, sem encerramento completo |
| [30-cost-of-ownership-tco](30-cost-of-ownership-tco/SKILL.md) *(2ª passada, final)* | Compara TCO estimado vs. real, mandatório para `done` |
| [32-report-bug](32-report-bug/SKILL.md) | Cria um Bug estruturado e dispara o fluxo corretivo paralelo — inclusive quando acionada automaticamente por outra skill que encontrou um defeito |

### Fase 7 — Auditoria, Governança e Consolidação
| Skill | Propósito |
|---|---|
| [33-audit-evidence](33-audit-evidence/SKILL.md) | Gera pacote formal de evidência para auditoria — mandatório para `done` |
| [34-pull-request-review](34-pull-request-review/SKILL.md) | Orquestra criação, revisão e merge do Pull Request — mandatório para `done` |
| [35-feature-progress-report](35-feature-progress-report/SKILL.md) | Compila dashboard executivo de progresso; risco/lacuna sem RF/RNF vira RF-X |
| [36-knowledge-retrieval](36-knowledge-retrieval/SKILL.md) | Busca ativa (RAG); checkpoint formal obrigatório antes de 04 e de cada 11, além de sob demanda |
| [37-validate-code-style](37-validate-code-style/SKILL.md) | Linter semântico de estilo, antes do code review |
| [38-create-template](38-create-template/SKILL.md) | Cria e registra um novo template do sistema |
| [39-generate-requirement-summary](39-generate-requirement-summary/SKILL.md) | Transforma anotação crua no primeiro artefato formal |
| [40-show-feature-memory](40-show-feature-memory/SKILL.md) | Exibe a memória consolidada da Feature |
| [42-resolve-progress-risks](42-resolve-progress-risks/SKILL.md) | Age sobre os riscos listados em `PROGRESS-REPORT.md` (skill 35) — fecha, investiga ou mantém em aberto cada um, com evidência |

### Transversais e contínuas
| Skill | Propósito |
|---|---|
| [17-navigable-links](17-navigable-links/SKILL.md) | Insere breadcrumbs e links bidirecionais entre artefatos |
| [18-feature-context-back-propagation](18-feature-context-back-propagation/SKILL.md) | Propaga decisões/mudanças de volta aos documentos mestres; lacuna sem RF/RNF vira RF-X |
| [49-change-impact](49-change-impact/SKILL.md) | Analisa um pedido de mudança antes da decisão: impacto, alternativas, o que falta validar e duas mensagens (negócio e time), sem prazo |
| [50-design-profile](50-design-profile/SKILL.md) | Propõe o perfil de design de um sistema (o que é obrigatório e o que é incentivo), os padrões por função e o inventário do legado; o Tech Lead confirma |
| [51-company-profile](51-company-profile/SKILL.md) | Mantém o perfil vivo da empresa, área e equipe atendida (papéis, ferramentas por capacidade, comunicação, processos); propõe mudanças e trata o impacto, sempre com confirmação humana |
| [19-runbook-authoring](19-runbook-authoring/SKILL.md) | Gera o runbook de produção que bloqueia/libera o deploy |
| [20-diagram-authoring](20-diagram-authoring/SKILL.md) | Gera diagramas Mermaid para fluxos complexos |

### Setup
| | Propósito |
|---|---|
| [setup/](setup/SKILL.md) | Instalação única do harness — não é uma skill numerada, é uma pasta de configuração |

## Relação com `agents/` e `process/`

- Uma skill **executa** um passo do pipeline; um **agente** de `agents/` é quem a skill aciona para aplicar julgamento especializado; um **processo** de `process/` é a regra que rege como a skill se comporta (formato, estado, handoff, falha).
- A ordem macro de todas as skills é definida por [`process/02-sdd-flow.md`](../process/02-sdd-flow.md).
