# _[preencher: FTXX - nome da Feature]_

_Breadcrumb: [Home](../README.md) > Feature_

**ID**: _[preencher]_ · **Status**: `backlog` | `ready` | `doing` | `done` (ver `process/03-state-management.md`)
**PO responsável**: _[preencher]_ · **Responsável no item publicado**: _[preencher: quem responde pela Feature na ferramenta de trabalho]_
**Aprovadores de tela** (`skills/48-screen-validation`): PO _[preencher: nome]_ · Negócio _[preencher: nome; um representante vale pelo negócio quando listado aqui]_ — ou "Não se aplica: a Feature não tem interface"
**Tags**: _[preencher: o ano primeiro, depois produto e tema — repetidas nas US e Tasks da Feature]_
**Esforço (SP)**: _[preencher: total, ou o motivo de estar vazio, ex. "a estimar com o time"]_ · **Iteração**: _[preencher: sprint, ou o motivo, ex. "sprint não definida"]_ · **Prioridade**: _[preencher]_

_Linguagem clara (trava 2, `process/15-pull-request-gates.md`): toda sigla, jargão ou nome de sistema é explicado na primeira vez em que aparece, neste documento e no item publicado._

_Publicação (`process/18-work-item-publication-gate.md`): do título até o "Anexo A" é a descrição do item publicado, com estes títulos e nesta ordem. O cabeçalho acima e as seções depois do marcador do fim ficam só no cofre._

## Documentos relacionados
_Cada documento vai **anexado** ao item publicado, nesta ordem, com uma linha dizendo o que é. No cofre o link é relativo; no item publicado ele aponta para o anexo. Documento que traz prazo ou estratégia de uso interno não é anexado (trava de publicação)._

- 📋 [INSTRUCTIONS.md](./INSTRUCTIONS.md) — instruções técnicas consolidadas da Feature.
- 🗺️ [PLAN.md](./PLAN.md) — plano aprovado de arquitetura e execução (herda a decisão do Design Gate).
- 🧾 _[preencher: escopo original do negócio, o arquivo recebido da área de Negócios]_ — pedido da área de Negócios, preservado no Anexo A.
- 🏛️ [Architecture Assessment](./reports/architecture-assessment.md) — avaliação arquitetural.
- ✅ _[preencher se existir: Quality Gate (data) — resultado da auditoria]_
- 📐 _[preencher se existir: padrões de stack do repositório (tech-stack) — leitura obrigatória]_
- 🛟 _[preencher se existir: Runbook operacional — estado e seções]_

## Description
_[preencher: o problema real e o valor de negócio esperado em um parágrafo — não a solução]_

Nesta Feature:

- _[preencher: cada comportamento entregue, visto por quem usa, com os campos ou regras principais]_

**Fora do escopo:** _[preencher: o que fica de fora e com quem fica]_

## Business Request
_[preencher: o pedido da área de Negócios nas palavras dela, em citação, separado por fase quando houver]_

> **Fase 1:** _[preencher]_
>
> **Regras-chave:** _[preencher]_

> Documento de escopo integral preservado no Anexo A.

## Impacted Systems
_[preencher por `skills/04-architecture-assessment` — repositórios/serviços tocados por esta Feature]_

| Sistema | Tipo | Impacto | Ambiente/Projeto | Observações |
|---|---|---|---|---|
| _[preencher]_ | _[preencher: API/UI/Data/BFF...]_ | baixo / médio / alto | _[preencher]_ | _[preencher: o que muda nele]_ |

> _[preencher: confirmação de quais sistemas entram e quais ficam de fora, com data e quem confirmou]_

## Priority
_[preencher: nível]_ — _[preencher: justificativa curta, ex. impacto em conversão/receita/risco operacional]_

## Risk
`baixo` | `médio` | `alto` — _[preencher: principais fontes de risco desta Feature e a mitigação de cada uma]_

## Effort
**_[preencher: SP total, ou "SP a estimar com o time"]_** · _[preencher: nº]_ User Stories · _[preencher: nº]_ Tasks · _[preencher: nº]_ repositórios

_[preencher progressivamente por `skills/05-refine-user-stories`/`06-create-user-story-artifacts` conforme cada US é refinada]_

| US | Repo | SP | Foco |
|---|---|---:|---|
| _[preencher]_ | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| **Total** | — | _[preencher]_ | — |

## User Stories
_[preencher e mantido por `skills/06-create-user-story-artifacts` conforme cada US é aprovada e materializada. No item publicado, cada linha aponta para o item da US.]_

- [ ] [US-01 - _[preencher]_](./USER-STORY-01.md)

## Decisions
_[preencher: decisões de negócio/arquitetura tomadas durante o refinamento desta Feature, registradas por `skills/01`, `04`, `05` conforme ocorrem. Diferente de `claude-memory/Decisions/`, que registra decisões sobre como o harness deve se comportar — não decisões de conteúdo desta Feature.]_

| Data | Decisão | Justificativa | Quem |
|---|---|---|---|
| _[preencher]_ | _[preencher]_ | _[preencher]_ | _[preencher: quem decidiu (PO, Tech Lead, usuário) e em qual US]_ |

## Pending Issues
_Opcional na publicação: só quando houver pendência aberta. Remover a seção quando não houver._

| ID | Pendência | Responsável | Bloqueia |
|---|---|---|---|
| _[preencher]_ | _[preencher]_ | _[preencher]_ | _[preencher]_ |

## Implementation Summary
_[preencher ao final da entrega, atualizado por `skills/29-implementation-summary-update` a cada User Story homologada]_

## User Stories Status
_[mantido por `skills/06-create-user-story-artifacts` e `skills/35-feature-progress-report`. No item publicado, cada linha aponta para o item da US e traz o estado dela.]_

- [ ] [US-01 - _[preencher]_](./USER-STORY-01.md) — **_[preencher: estado]_** · PLAN _[preencher: versão e aprovação]_ · _[preencher: nº]_ tasks (_[preencher]_ h)

---

## Anexo A — Documento de escopo original
_[preencher: o pedido original da área de Negócios, preservado integralmente; o arquivo original também vai anexado]_

<!-- kanon:fim-da-publicacao -->

_Daqui para baixo, só no cofre: não vai para a descrição do item publicado._

## Requisitos Funcionais (RF)
| ID | Descrição | Critério de aceite (Gherkin) |
|---|---|---|
| RF-01 | _[preencher]_ | Dado ..., Quando ..., Então ... |

## Requisitos Não Funcionais (RNF)
| ID | Descrição | Como validar |
|---|---|---|
| RNF-01 | _[preencher: ex. performance, segurança]_ | _[preencher]_ |

## Glossário de linguagem ubíqua
| Termo | Significado neste contexto |
|---|---|
| _[preencher]_ | _[preencher]_ |

## Definition of Done específica da Feature
Além do DoD global (`process/05-definition-of-done.md`):
- [ ] _[preencher: critério adicional específico desta Feature, se houver]_
