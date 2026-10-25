---
numero: ADR-_[preencher: NNNN, sequencial no projeto, nunca reutilizado]_
estado: proposta
data: _[preencher: AAAA-MM-DD]_
quem_decide: _[preencher: papel]_
aprovado_em: _[preencher: AAAA-MM-DD, obrigatório em "aceita"]_
substitui: _[preencher: ADR-NNNN, quando houver]_
substituida_por: _[preencher: ADR-NNNN, obrigatório em "substituída"]_
origem: _[preencher: feature, bug, incidente ou análise que levou à decisão]_
---

# ADR-_[preencher: NNNN]_: _[preencher: decisão em uma linha]_

_Modelo único de RFC e ADR (`reference/boas-praticas-dev/06-documentacao.md`). Em `proposta` o documento é uma RFC: a seção "Decisão" se chama "Proposta" e "Perguntas abertas" existe. Ao ser aceita, a mesma página vira o ADR: "Proposta" volta a ser "Decisão", "Perguntas abertas" sai e as respostas entram no texto. Estados: `proposta`, `aceita`, `rejeitada`, `substituída`._

## Contexto
_[preencher: o problema e as restrições, com fonte e data]_

## Decisão
_[preencher: o que foi decidido, em 1–3 frases]_

## Alternativas
_Só as reais: a que alguém propôs ou a que o sistema permite. Se só havia um caminho, diga isso numa linha._

| Opção | Por que foi descartada |
|---|---|
| _[preencher]_ | _[preencher]_ |

## Consequências
- Positivas: _[preencher]_
- Negativas: _[preencher]_

## Riscos e mitigação
| Risco | Mitigação |
|---|---|
| _[preencher]_ | _[preencher]_ |

## Plano de migração e rollback
_Opcional: some quando a decisão não mexe no que já está rodando._

- Homologação: _[preencher]_
- Produção: _[preencher]_
- Como voltar: _[preencher]_

## Critérios de aceitação
_[preencher: o que prova que a decisão funcionou: consulta, teste, métrica]_

## Revisões
_Uma linha por rodada (`templates/DESIGN-REVIEW.template.md`). `aceita` só com a última rodada em "aprovar" ou "aprovar com comentários" e nenhum problema crítico aberto._

| Rodada | Data | Revisor (papel) | Veredicto | Revisão |
|---|---|---|---|---|
| _[preencher: R1]_ | _[preencher: AAAA-MM-DD]_ | _[preencher]_ | _[preencher]_ | _[preencher: link do arquivo da rodada]_ |

## Perguntas abertas
_Só em `proposta`._

- [ ] _[preencher: pergunta]_ — _[preencher: quem responde]_
