# Glossário — Termos do Harness Kanon

Termos técnicos específicos do funcionamento interno do harness Kanon (mecanismo, não domínio de produto). Os 13 processos desta pasta, as skills, os agentes e os templates linkam a primeira ocorrência de cada termo aqui.

Termos de engenharia de software em geral (ADR, PR, XSS, N+1 etc.) estão em [`reference/boas-praticas-dev/GLOSSARIO.md`](../reference/boas-praticas-dev/GLOSSARIO.md). Termos de produto/UX/dados estão em [`agents/GLOSSARIO.md`](../agents/GLOSSARIO.md). Este arquivo cobre apenas o vocabulário do próprio harness — como as peças se encaixam e se comunicam.

<a id="bm25"></a>
### BM25
Algoritmo de busca por relevância textual (ranking de resultados por sobreposição de termos, sem embeddings) usado como mecanismo obrigatório de recuperação sobre o corpus local antes de qualquer afirmação sobre o estado do repositório. Ver [`12-knowledge-retrieval.md`](12-knowledge-retrieval.md).

<a id="breadcrumb"></a>
### Breadcrumb (Navegação)
Trilha de links no topo de um artefato indicando o caminho hierárquico até ele (ex.: `[Home](../README.md) > [Feature](README.md) > Task`), em formato fixo e parseável por hook. Ver [`06-markdown-formatting-rules.md`](06-markdown-formatting-rules.md) e `skills/17-navigable-links`.

<a id="c4-model"></a>
### C4 Model
Notação de diagramação de arquitetura de software em quatro níveis de zoom (Contexto, Container, Componente, Código). O harness usa apenas os níveis de Contexto/Container para documentar a arquitetura de uma Feature. Ver `skills/22-generate-architecture-context`.

<a id="corpus"></a>
### Corpus (Local)
O conjunto de arquivos do repositório (código, artefatos, documentação) sobre o qual a busca [BM25](#bm25) é executada. "Não encontrado no corpus" é a resposta obrigatória quando a busca não retorna nada relevante — nunca é preenchido com suposição. Ver [`12-knowledge-retrieval.md`](12-knowledge-retrieval.md).

<a id="dod"></a>
### DoD (Definition of Done)
Lista de critérios objetivos e imutáveis (testes passando, code review aprovado, runbook gerado, sem achado bloqueante de segurança) que qualquer artefato precisa satisfazer antes de ser marcado `done` na [máquina de estados](03-state-management.md). Os mesmos critérios valem para todo tipo de artefato — tipos diferentes podem somar critérios, nunca reduzir. Ver [`05-definition-of-done.md`](05-definition-of-done.md).

<a id="envelope-de-retorno"></a>
### Envelope de Retorno (Return Envelope)
Schema JSON obrigatório (`status`, `evidence[]`, `summary`, `path_to_artifact`) que todo subagente despachado em [fan-out](#fan-out) devolve ao orquestrador. Um retorno fora desse formato é tratado como falha do próprio subagente. Ver [`07-return-envelope.md`](07-return-envelope.md).

<a id="fan-out"></a>
### Fan-out
Disparo de múltiplos subagentes em paralelo a partir de um [handoff](#handoff), normalmente por um papel com autoridade definida (ex.: TECH-LEAD). Cada subagente do fan-out devolve um [Envelope de Retorno](#envelope-de-retorno). Ver [`04-handoff-protocol.md`](04-handoff-protocol.md).

<a id="gate"></a>
### Gate
Checkpoint de validação que aceita ou rejeita um artefato antes que ele avance no pipeline — implementado como [hook](#hook) `PreToolUse`. O [`09-identity-seals-gate.md`](09-identity-seals-gate.md) é o gate mestre, executado antes de qualquer gate especializado (ex.: [`10-core-agnosticism-gate.md`](10-core-agnosticism-gate.md)). Um artefato rejeitado por um gate volta para quem o gerou, nunca segue adiante "com ressalva".

<a id="handoff"></a>
### Handoff
Transferência de responsabilidade de um agente para outro (ex.: PO → ARCHITECT), condicionada à existência dos artefatos obrigatórios daquela transição. Todo handoff é rastreável: de quem veio, para quem foi, com quais artefatos. Ver [`04-handoff-protocol.md`](04-handoff-protocol.md).

<a id="harness"></a>
### Harness
O ambiente de execução do sistema de agentes como um todo: skills numeradas + agentes + processos + hooks + templates, operando sob o contrato definido em [`00-runtime-contract.md`](00-runtime-contract.md). "Harness Kanon" é o nome deste sistema.

<a id="hook"></a>
### Hook (PreToolUse)
Código funcional (fora de `.kanon/`, em `.claude/hooks/`) que aplica um [gate](#gate) na prática, negando a ação em caso de violação (fail-closed). Cada hook implementa exatamente um processo/selo — ex.: `core-agnostic-gate.js` implementa o [Selo I](#selo). Ver `seals.manifest.json`.

<a id="mermaid"></a>
### Mermaid
Linguagem de diagramação baseada em texto (flowcharts, sequence diagrams) usada pelo harness para ilustrar fluxos complexos, com paleta visual canônica do projeto. Ver `skills/20-diagram-authoring`.

<a id="nucleo-agnostico"></a>
### Núcleo Agnóstico (Core-Agnosticism)
Princípio de que `.kanon/` nunca contém um valor de ambiente específico (URL de produção, chave de API, path absoluto de usuário) — apenas o *nome* da configuração. Garante que o núcleo possa ser copiado para outro projeto/IA sem vazar dado de ambiente. Ver [`10-core-agnosticism-gate.md`](10-core-agnosticism-gate.md) e [Selo I](#selo).

<a id="orquestrador"></a>
### Orquestrador
O agente (normalmente TECH-LEAD) que dispara um [fan-out](#fan-out) e recebe de volta o [Envelope de Retorno](#envelope-de-retorno) de cada subagente, roteando os resultados. Ver [`07-return-envelope.md`](07-return-envelope.md).

<a id="path-line"></a>
### path:line
Formato obrigatório de citação (ex.: `src/validators/cpf.py:12`) para qualquer afirmação embasada em conhecimento recuperado do [corpus](#corpus) — nunca uma afirmação genérica sem origem rastreável. Ver [`12-knowledge-retrieval.md`](12-knowledge-retrieval.md).

<a id="rag"></a>
### RAG (Retrieval-Augmented Generation)
Recuperação de informação real do [corpus](#corpus) (via [BM25](#bm25)) antes de embasar qualquer afirmação, em vez de responder "de memória". É o mecanismo por trás do [Selo IV](#selo). Ver [`12-knowledge-retrieval.md`](12-knowledge-retrieval.md).

<a id="runtime-contract"></a>
### Runtime Contract
Contrato de inicialização do [harness](#harness) — variáveis de ambiente, caminhos absolutos e permissões — validado antes de qualquer skill, hook ou agente atuar. É o primeiro arquivo lido em qualquer sessão. Ver [`00-runtime-contract.md`](00-runtime-contract.md).

<a id="sdd"></a>
### SDD (Spec-Driven Development)
Fluxo de desenvolvimento em que a especificação (Requirement Summary, arquitetura, User Stories, Tasks) precede e governa a implementação, ao invés de o código ser escrito antes de o requisito estar claro. É o pipeline macro que ordena as 41 skills. Ver [`02-sdd-flow.md`](02-sdd-flow.md).

<a id="selo"></a>
### Selo (Selo de Identidade)
Um dos 5 pré-requisitos mínimos de integridade que todo artefato do harness precisa satisfazer, catalogados em `seals.manifest.json` e validados pelo gate mestre ([`09-identity-seals-gate.md`](09-identity-seals-gate.md)): **I** Guardião da Integridade (agnosticismo), **II** Model Routing, **III** Multi-agente/Envelope, **IV** RAG–Recuperação, **V** Substituição na Falha (anti-alucinação).

<a id="tco"></a>
### TCO (Total Cost of Ownership)
Estimativa dos custos de infraestrutura, licenciamento, manutenção e operação de uma Feature já implementada, compilada para o PO e stakeholders ao final do ciclo. Ver `skills/30-cost-of-ownership-tco`.

<a id="tier"></a>
### Tier de Modelo / Tier de Esforço
Classificação de toda tarefa por esforço exigido (**High/Medium/Low**), roteada para o tier de modelo mínimo correspondente (**Forte/Intermediário/Rápido**) — nunca para um tier mais fraco que o exigido. É o mecanismo por trás do [Selo II](#selo). Ver [`08-model-orchestration.md`](08-model-orchestration.md).
