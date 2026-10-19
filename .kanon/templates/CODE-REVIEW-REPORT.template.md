# Code Review Report — _[preencher: Feature/User Story/Task revisada]_

_Gerado/gerenciado por `skills/13-code-review`, seguindo `agents/AGENT-CODE-REVIEWER.md`. Relatório interno: é a base da consolidação no chat (Ficha da PR + problemas) e do envelope de retorno. O que vai para a PR — parecer, travas, matriz de rastreabilidade, auditorias, declaração de varredura e threads — fica em `PR-REVIEW-ROUND.template.md`, e este relatório não repete._

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
| Triagem do Bug | _[preencher: só quando a história é Bug — `BUG.md` com a classificação e a data da triagem, e a regra vigente em uma linha; "sem triagem" quando não há; "não se aplica" para US]_ |
| Descrição | _[preencher: resumo em 1–3 linhas do que a descrição diz, ou "vazia" / "template sem preencher"]_ |
| Iteração revisada | _[preencher: commit/iteração e data do último push]_ |
| Aprovações exigidas | _[preencher: número, pela trava 8 de `process/15-pull-request-gates.md`, com o motivo — ex.: "2: destino master" ou "não cobrada: aberta antes da vigência e sem push depois"]_ |
| Já aprovaram | _[preencher: nome = voto, ou "ninguém"]_ |
| Falta aprovar | _[preencher: quantas aprovações ainda faltam e de quem se espera; o voto do autor não conta]_ |

## Problemas encontrados
_Um por linha, do mais grave ao mais leve. Escrito para quem decide o voto sem abrir o código: o problema em linguagem clara (o que acontece, com um exemplo concreto quando ajudar), o impacto (quem ou o que é afetado, em que situação) e a correção sugerida. "Nenhum" quando não houver._

| Id | Severidade | Problema | Impacto | Sugestão de correção | Local (arquivo:linha) | Regra violada |
|---|---|---|---|---|---|---|
| _[preencher: `TIPO-NN`, o mesmo da thread]_ | 🔴 crítico / 🟠 importante / 🟡 menor / ⚪ nitpick (`PR-REVIEW-ROUND.template.md`) | _[preencher: o que está errado, sem jargão]_ | _[preencher: consequência real — ex.: "quem for desativado continua disparando resgate pela API"]_ | _[preencher: o que mudar e onde]_ | _[preencher]_ | _[preencher: trava, AC ou prática, com fonte]_ |

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
