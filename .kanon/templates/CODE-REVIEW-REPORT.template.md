# Code Review Report — _[preencher: Feature/User Story/Task revisada]_

_Gerado/gerenciado por `skills/13-code-review`, seguindo `agents/AGENT-CODE-REVIEWER.md`. Relatório detalhado da revisão — o resumo enxuto para o próprio PR fica em `PR-REVIEW.template.md` (skill 34), que pode referenciar este arquivo._

**Revisor**: `AGENT-CODE-REVIEWER` (independente de quem implementou — `process/14-decision-segregation.md`)
**Escopo**: _[preencher: PR/diff/commits revisados]_

## Ficha da PR
_Lida da própria PR (pela capacidade `repositorio` do perfil) no momento da revisão. É a primeira coisa que o revisor humano vê na consolidação._

| Campo | Valor |
|---|---|
| PR | _[preencher: número + título, com link para abrir a PR]_ |
| Repositório e branches | _[preencher: repositório · `origem` → `destino`]_ |
| Aberta por / em | _[preencher: autor · data de abertura]_ |
| US / Bug | _[preencher: número e título, com link do work item; "nenhum vinculado" se não houver]_ |
| Descrição | _[preencher: resumo em 1–3 linhas do que a descrição diz, ou "vazia" / "template sem preencher"]_ |
| Iteração revisada | _[preencher: commit/iteração e data do último push]_ |
| Aprovações exigidas | _[preencher: número, pela trava 8 de `process/15-pull-request-gates.md`, com o motivo — ex.: "2: destino master" ou "não cobrada: aberta antes da vigência e sem push depois"]_ |
| Já aprovaram | _[preencher: nome = voto, ou "ninguém"]_ |
| Falta aprovar | _[preencher: quantas aprovações ainda faltam e de quem se espera; o voto do autor não conta]_ |

## Arquivos revisados
- _[preencher: cada arquivo lido, agrupado por camada/tipo]_

## Spec Compliance
- **Status geral**: Atende integralmente / Atende parcialmente — ver lacunas / Diverge — ver desvios
- **Lacunas encontradas** (Acceptance Criteria não cobertos): _[preencher ou "nenhuma"]_
- **Fora do escopo combinado**: _[preencher ou "nenhum"]_
- **Melhorias justificadas sobre a spec**: _[preencher ou "nenhuma"]_
- **Ambiguidades na spec** (escaladas para PO/TECH-LEAD, não resolvidas pelo revisor): _[preencher ou "nenhuma"]_

## Problemas encontrados
_Um por linha, do mais grave ao mais leve. Escrito para quem decide o voto sem abrir o código: o problema em linguagem clara (o que acontece, com um exemplo concreto quando ajudar), o impacto (quem ou o que é afetado, em que situação) e a correção sugerida. "Nenhum" quando não houver._

| # | Severidade | Problema | Impacto | Sugestão de correção | Local (arquivo:linha) | Regra violada |
|---|---|---|---|---|---|---|
| 1 | bloqueante / recomendação / nit | _[preencher: o que está errado, sem jargão]_ | _[preencher: consequência real — ex.: "quem for desativado continua disparando resgate pela API"]_ | _[preencher: o que mudar e onde]_ | _[preencher]_ | _[preencher: trava, AC ou prática, com fonte]_ |

## Resultado dos Quality Checks
- **Comandos executados**: _[preencher: comandos de teste/build já existentes no projeto-alvo, nunca inventados — `process/11-subagent-anti-hallucination.md`]_
- **Testes**: [PASS/FAIL] — _[preencher: N passando / N total]_
- **Build**: [PASS/FAIL]
- **Falhas pré-existentes sem relação com o diff revisado**: _[preencher ou "nenhuma"]_
- **Teste de mutação no código alterado** (`AGENT-QA-ENGINEER`): _[preencher: comando; mutantes gerados / mortos / sobreviventes; cada sobrevivente com local, crítico (bloqueante) ou não (recomendação) e o teste sugerido — ou "não executado: motivo"]_

## Return Envelope final
```json
{
  "status": "success | failure | blocked",
  "evidence": ["_[preencher]_"],
  "summary": "_[preencher]_",
  "path_to_artifact": "_[preencher: caminho deste relatório]_"
}
```
