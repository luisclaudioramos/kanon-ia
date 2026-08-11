# Processos — Contrato Operacional do Time de Agentes

Enquanto [`agents/`](../agents) define **quem** faz o quê (os 12 papéis), esta pasta define **como** qualquer um desses papéis deve operar: em que ordem, em que formato, o que fazer quando falta informação, e o que fazer quando algo dá errado. Os 13 processos abaixo se aplicam a **todos** os 12 agentes, sempre — não são específicos de um papel.

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

Este índice é a "Constituição" do sistema completo: harness (`.kanon/`) + skills numeradas + agentes + hooks + `seals.manifest.json` (neste mesmo diretório). Todas essas peças já existem neste repositório — os 13 processos abaixo são lidos e aplicados por elas.

## Como usar

**Com os 12 agentes de `agents/`**: ao copiar um arquivo de papel (ex.: `AGENT-BACKEND-ENGINEER.md`) para usar em qualquer IA, cole também o conteúdo desta pasta (ou ao menos os processos 00, 05, 07 e 09, que afetam diretamente o formato e o comportamento de toda resposta) como parte do prompt de sistema.

**Como gate de revisão**: cada processo pode ser usado isoladamente como checklist de auditoria do próprio sistema de agentes — por exemplo, revisar se as respostas geradas realmente respeitam o `07-return-envelope`.

**Como sistema completo**: as skills em [`../skills/`](../skills) e os hooks em [`../../.claude/hooks/`](../../.claude/hooks) leem e aplicam estes 13 arquivos automaticamente durante a execução do pipeline.

## Relação com `agents/` e `reference/boas-praticas-dev/`

- [`reference/boas-praticas-dev/`](../reference/boas-praticas-dev) define **o que é** qualidade técnica (princípios, testes, segurança, etc.).
- [`agents/`](../agents) define **quem** aplica essas práticas, sob qual lente e em que ponto do fluxo.
- `process/` (esta pasta) define **como** o conjunto de agentes opera de forma previsível, inclusive quando algo falha.
