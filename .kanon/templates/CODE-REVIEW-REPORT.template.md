# Code Review Report — _[preencher: Feature/User Story/Task revisada]_

_Gerado/gerenciado por `skills/13-code-review`, seguindo `agents/AGENT-CODE-REVIEWER.md`. Relatório detalhado da revisão — o resumo enxuto para o próprio PR fica em `PR-REVIEW.template.md` (skill 34), que pode referenciar este arquivo._

**Revisor**: `AGENT-CODE-REVIEWER` (independente de quem implementou — `process/14-decision-segregation.md`)
**Escopo**: _[preencher: PR/diff/commits revisados]_

## Arquivos revisados
- _[preencher: cada arquivo lido, agrupado por camada/tipo]_

## Spec Compliance
- **Status geral**: Atende integralmente / Atende parcialmente — ver lacunas / Diverge — ver desvios
- **Lacunas encontradas** (Acceptance Criteria não cobertos): _[preencher ou "nenhuma"]_
- **Fora do escopo combinado**: _[preencher ou "nenhum"]_
- **Melhorias justificadas sobre a spec**: _[preencher ou "nenhuma"]_
- **Ambiguidades na spec** (escaladas para PO/TECH-LEAD, não resolvidas pelo revisor): _[preencher ou "nenhuma"]_

## Achados
| # | Severidade | Área | Local (arquivo:linha) | Regra violada | Sugestão concreta |
|---|---|---|---|---|---|
| 1 | bloqueante / recomendação / nit | spec / corretude / legibilidade / segurança / testes / arquitetura | _[preencher]_ | _[preencher, com fonte se houver]_ | _[preencher]_ |

## Resultado dos Quality Checks
- **Comandos executados**: _[preencher: comandos de teste/build já existentes no projeto-alvo, nunca inventados — `process/11-subagent-anti-hallucination.md`]_
- **Testes**: [PASS/FAIL] — _[preencher: N passando / N total]_
- **Build**: [PASS/FAIL]
- **Falhas pré-existentes sem relação com o diff revisado**: _[preencher ou "nenhuma"]_

## Return Envelope final
```json
{
  "status": "success | failure | blocked",
  "evidence": ["_[preencher]_"],
  "summary": "_[preencher]_",
  "path_to_artifact": "_[preencher: caminho deste relatório]_"
}
```
