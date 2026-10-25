# Processos — Contrato Operacional do Time de Agentes

Enquanto [`agents/`](../agents) define **quem** faz o quê (os 13 papéis), esta pasta define **como** qualquer um desses papéis deve operar: em que ordem, em que formato, o que fazer quando falta informação, e o que fazer quando algo dá errado. Os 19 processos abaixo se aplicam a **todos** os 13 agentes, sempre — não são específicos de um papel.

Cada arquivo é autocontido e segue o mesmo template: Propósito, Quando se aplica, Regras, Sinais de violação, Procedimento em caso de falha, Exemplo concreto.

## Índice

| # | Processo | Resolve |
|---|---|---|
| [00](00-runtime-contract.md) | Runtime Contract | Como o harness inicializa (variáveis de ambiente, caminhos absolutos, permissões) antes de qualquer agente atuar |
| [01](01-menu-map.md) | Menu Map | O índice de navegação: qual comando do usuário aciona qual skill/agente |
| [02](02-sdd-flow.md) | SDD Flow | O pipeline macro de Spec-Driven Development, do requisito até o registro em memória |
| [03](03-state-management.md) | State Management | A máquina de estados de uma feature (backlog → ready → doing → done) e suas regras de transição/rollback |
| [04](04-handoff-protocol.md) | Handoff Protocol | Como a responsabilidade é transferida entre agentes e quem pode disparar execução em paralelo (fan-out) |
| [05](05-definition-of-done.md) | Definition of Done | Os critérios objetivos e imutáveis para qualquer artefato ser considerado pronto |
| [06](06-markdown-formatting-rules.md) | Markdown Formatting Rules | A sintaxe Markdown obrigatória para que hooks de validação consigam parsear os artefatos |
| [07](07-return-envelope.md) | Return Envelope | O schema JSON obrigatório que todo subagente em fan-out devolve ao orquestrador |
| [08](08-model-orchestration.md) | Model Orchestration | A matriz de roteamento entre tier de modelo e tier de esforço da tarefa |
| [09](09-identity-seals-gate.md) | Identity Seals Gate | O gate mestre que valida a integridade mínima de um artefato antes de qualquer hook específico |
| [10](10-core-agnosticism-gate.md) | Core-Agnosticism Gate | Como impedir hardcode de valores de ambiente (URLs, chaves) em artefatos gerados |
| [11](11-subagent-anti-hallucination.md) | Subagent Anti-Hallucination | Como impedir que um subagente invente função, biblioteca ou caminho de arquivo |
| [12](12-knowledge-retrieval.md) | Knowledge Retrieval | O mecanismo obrigatório de busca (RAG) e a regra de citar `path:line` antes de afirmar |
| [13](13-external-integration-prerequisite.md) | External Integration Prerequisite | Publicação e Pull Request exigem a ferramenta externa configurada — bloqueio orientado, exceção só com registro explícito |
| [14](14-decision-segregation.md) | Decision Segregation | Quality Gate e Code Review não podem ser aprovados pela mesma janela de contexto que produziu o artefato |
| [15](15-pull-request-gates.md) | Pull Request Gates | As 14 travas que toda PR cumpre: onde cada uma nasce, o que a PR confere, o que bloqueia e as exceções |
| [16](16-design-foundations.md) | Design Foundations | As regras D1–D6 de interface: obrigatórias quando o perfil de design as define, incentivo quando não; bug visual × oportunidade técnica |
| [17](17-company-profile.md) | Company Profile | O núcleo fala em capacidades; o perfil vivo de cada empresa, área e equipe diz papéis, ferramentas, comunicação e processos, sempre com confirmação humana |
| [18](18-work-item-publication-gate.md) | Work Item Publication Gate | Feature e User Story só vão para a ferramenta de trabalho no modelo do template, com os documentos anexados, sem link relativo e sem prazo ou estratégia interna |
| [19](19-evidence-verification.md) | Evidence Verification | Nenhum número ou conclusão sai do chat sem o significado dos campos conferido, hipóteses concorrentes, validação, pre-mortem e conferência independente; conclusão que cai é corrigida por adendo em todo lugar onde passou |

Este índice é a "Constituição" do sistema completo: harness (`.kanon/`) + skills numeradas + agentes + hooks + `seals.manifest.json` (neste mesmo diretório). Todas essas peças já existem neste repositório — os 19 processos abaixo são lidos e aplicados por elas.

## Como usar

**Com os 13 agentes de `agents/`**: ao copiar um arquivo de papel (ex.: `AGENT-BACKEND-ENGINEER.md`) para usar em qualquer IA, cole também o conteúdo desta pasta (ou ao menos os processos 00, 05, 07 e 09, que afetam diretamente o formato e o comportamento de toda resposta) como parte do prompt de sistema.

**Como gate de revisão**: cada processo pode ser usado isoladamente como checklist de auditoria do próprio sistema de agentes — por exemplo, revisar se as respostas geradas realmente respeitam o `07-return-envelope`.

**Como sistema completo**: as skills em [`../skills/`](../skills) e os hooks em [`../../.claude/hooks/`](../../.claude/hooks) leem e aplicam estes 19 arquivos automaticamente durante a execução do pipeline.

## Relação com `agents/` e `reference/boas-praticas-dev/`

- [`reference/boas-praticas-dev/`](../reference/boas-praticas-dev) define **o que é** qualidade técnica (princípios, testes, segurança, etc.).
- [`agents/`](../agents) define **quem** aplica essas práticas, sob qual lente e em que ponto do fluxo.
- `process/` (esta pasta) define **como** o conjunto de agentes opera de forma previsível, inclusive quando algo falha.

## Glossário

[`GLOSSARIO.md`](GLOSSARIO.md) cobre o vocabulário específico do mecanismo do harness (Selo, Gate, Fan-out, Handoff, Envelope de Retorno, RAG, BM25, Tier de Modelo, etc.) — termos que `skills/`, `agents/` e `templates/` usam sem redefinir. Termos de engenharia de software em geral estão em [`reference/boas-praticas-dev/GLOSSARIO.md`](../reference/boas-praticas-dev/GLOSSARIO.md); termos de produto/UX/dados estão em [`agents/GLOSSARIO.md`](../agents/GLOSSARIO.md).
