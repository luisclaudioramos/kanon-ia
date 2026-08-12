# 30 — Cost of Ownership (TCO)

## Propósito
Estimar os custos de infraestrutura, licenciamento, manutenção e operação (SRE) da Feature, em **duas passadas**: uma estimativa preliminar que informa o dimensionamento das Tasks, e um valor final no encerramento que compara estimado vs. real.

## Fase / Posição no fluxo
**Mandatória, duas passadas**:
1. **TCO preliminar** — Fase 1/2, logo após [`04-architecture-assessment`](../04-architecture-assessment/SKILL.md) e antes de [`07-refine-tasks`](../07-refine-tasks/SKILL.md)/[`08-create-task-artifacts`](../08-create-task-artifacts/SKILL.md). Existe para que Task Refinement dimensione SP/horas com base em complexidade e custo real esperado, não só em intuição.
2. **TCO final** — Fase 6, próximo ao encerramento, com a arquitetura e operação já implementadas. Compara o estimado (passada 1) com o real, e registra o desvio.

## Entradas
- Preliminar: decisão de arquitetura (skill 04).
- Final: runbook (skill 19), dados operacionais reais, o TCO preliminar da mesma Feature.

## Saídas
- Relatório de Custo Total de Propriedade — preliminar e final, ambos rastreáveis um ao outro.

## Regras principais
- **Ownership do relatório é do TECH-LEAD** — não do PO. TECH-LEAD produz e valida a estimativa.
- [`agentes-ia/SRE.md`](../../agents/AGENT-SRE.md) fornece o dado operacional (infra, licenciamento, manutenção).
- **Engineers e QA consomem o TCO preliminar para definir prazos realistas** de execução/implementação nas Tasks — não estimam SP no vácuo quando o TCO já existe.
- [`agentes-ia/PO.md`](../../agents/AGENT-PO.md) recebe ambos os relatórios (preliminar e final) como stakeholder, mas não é quem os produz.
- Toda estimativa é declarada como estimativa, com as premissas explícitas — nunca apresentada como valor exato e garantido.
- Mandatório: uma Feature não alcança `done` sem o TCO final registrado (ver `process/05-definition-of-done.md`).

## Depende de
- `agentes-ia/SRE.md`, `agentes-ia/TECH-LEAD.md`, `agentes-ia/PO.md`, `04-architecture-assessment`, `19-runbook-authoring`, `07-refine-tasks`.

## Procedimento em caso de falha
Se faltar dado real de custo para uma parte da estimativa, a skill declara essa lacuna explicitamente, em vez de estimar sem sinalizar a incerteza. Se o TCO preliminar nunca foi feito, a passada final ainda roda, mas registra a ausência de comparação estimado-vs-real como limitação, não a esconde.
