# User Story — _[preencher: US-XX - título curto]_

_Breadcrumb: [Feature](../FEATURE.md) > User Story XX_

**Estado**: `refinado` | `aprovado` | `publicado` (regra 1-1-1, ver `skills/05-refine-user-stories`)
**Story Points**: _[preencher]_ · **Aprovado por (PO)**: _[preencher]_
**Persona**: _[preencher: ex. "Cliente Premium não logado"]_ · **Prioridade (MoSCoW)**: `Must` | `Should` | `Could` | `Won't`
**Tags**: _[preencher: as tags da Feature + `US-XX`]_

> **Dependências:** _[preencher: US ou contratos de que esta US precisa para começar, com link, ou "nenhuma"]_

_Linguagem clara (trava 2, `process/15-pull-request-gates.md`): toda sigla, jargão ou nome de sistema é explicado na primeira vez em que aparece, neste documento e no item publicado._

---

## 🎯 Objetivo

**Como** _[preencher: papel]_,
**quero** _[preencher: ação]_,
**para** _[preencher: benefício]_.

_[preencher: uma ou duas frases dizendo onde a entrega acontece (sistema, tela, componente) e o que ela consome de outras US]_

---

## Como é hoje

_[preencher: o comportamento atual, visto por quem usa. Sem falar de código. Trava 1 — `process/15-pull-request-gates.md`]_

## Como deve ficar

_[preencher: o comportamento esperado depois da entrega. Trava 1]_

---

## 👤 Ator principal

**_[preencher: papel]_** — _[preencher: o que ele faz nesta US]_

## 👥 Atores secundários

- **_[preencher: sistema, componente, serviço ou API]_** — _[preencher: o papel dele no fluxo]_

---

## ⛓️ Pré-condições

- _[preencher: o que precisa estar disponível antes do fluxo começar (outra US entregue, acesso, dado)]_

---

## 🔄 Fluxo principal

1. _[preencher: passo do ator ou do sistema]_
2. _[preencher]_

_[preencher se houver: diagrama do fluxo principal, gerado por `skills/20-diagram-authoring`]_

---

## 🔁 Fluxos alternativos

### Fluxo alternativo 1 — _[preencher: nome]_

1. _[preencher]_

_[remover a seção quando não houver fluxo alternativo]_

---

## 🚧 Fluxos de exceção

### Fluxo de exceção 1 — _[preencher: nome]_

1. _[preencher: o que dá errado e como o sistema reage]_

---

## 🧪 Validações

- **_[preencher: regra]_:** _[preencher: condição e resultado]_

## Regras de negócio

- _[preencher]_

---

## 📦 Pós-condições

- _[preencher: o estado do sistema depois do fluxo principal]_

---

## ✅ Critérios de aceite

_Publicados no campo próprio de critérios de aceite do item, não na descrição._

- [ ] _[preencher: critério verificável]_

## 🧪 Cenários BDD (Gherkin)

```gherkin
Cenário: _[preencher: fluxo principal]_
  Dado _[preencher]_
  Quando _[preencher]_
  Então _[preencher]_
```

```gherkin
Cenário: _[preencher: erro ou borda]_
  Dado _[preencher]_
  Quando _[preencher]_
  Então _[preencher]_
```

---

## Fora do escopo desta US

_[preencher: quando mais estreito que o "Fora de escopo" da Feature — ver `REQUIREMENT-SUMMARY.md`. Se coincidir integralmente com o da Feature, referenciar em vez de repetir]_

## UI/UX

_[preencher apenas quando esta US envolve interface — ver `agents/AGENT-UI-UX-DESIGNER.md`, mesma condição de `skills/01-refine-feature`. Remover a seção quando não aplicável]_

**Validação de telas**: [`telas/SCREEN-VALIDATION.md`](./telas/SCREEN-VALIDATION.md) — `skills/48-screen-validation`
**Estados da interface**: _[preencher: inicial / carregando / sucesso / erro]_

| Tela | Versão aprovada | Registro |
|---|---|---|
| _[preencher: NN-nome]_ | _[preencher: vN, ou "aguardando validação"]_ | _[preencher: link da linha no registro de aprovações]_ |

_O front pode começar antes da aprovação; a US só vai a `done` com todas as telas aprovadas e a versão aprovada igual à entregue (`process/05-definition-of-done.md`)._

## Dependências e riscos

**Bloqueado por**: _[preencher: outra US/Task, ou "nenhuma"]_
**Bloqueia**: _[preencher: o que depende desta US, ou "nenhuma"]_
**Sistemas afetados** (trava 5):
- **Consome**: _[preencher: APIs, filas, bancos que a entrega usa]_
- **Quem consome o que muda**: _[preencher: sistemas ou telas afetados, ou "nenhum"]_
- **Quebra contrato?**: _[preencher: não / sim — para quem]_

**Riscos**: _[preencher: o que pode quebrar além do escopo direto (regressão em tela ou fluxo compartilhado), ou "nenhum"]_

---

## 📚 Requisitos funcionais relacionados

- _[preencher: US, RF da Feature ou trecho do escopo original que esta US atende, com link]_

## 🧭 Observações

- _[preencher: decisões desta US, convenções e cuidados de implementação]_

## 🗺️ Diagrama de atividades

_[preencher: diagrama de atividades da US, gerado por `skills/20-diagram-authoring`]_

---

## 📊 Estimativa e priorização

| Métrica | Valor | Observações |
|---|---|---|
| **Story Points** | _[preencher]_ | _[preencher: o que pesa na estimativa]_ |
| **Prioridade** | _[preencher]_ | _[preencher]_ |
| **Risco** | `baixo` \| `médio` \| `alto` | _[preencher]_ |

---

## 📋 Tasks

| ✔️ | Task | Atividade | Esforço | Observações |
|---|---|---|---|---|
| [ ] | [TSK-01 - _[preencher]_](./TASK-01.md) | Development \| Testing \| Documentation | _[preencher]_ h | _[preencher]_ |

> Total: _[preencher]_ h (= _[preencher]_ SP × 6h).

## 📝 Notas técnicas

- _[preencher: arquivos e componentes tocados, padrões do repositório a seguir]_

---

## 📎 Documentos relacionados

- [INSTRUCTIONS.md (US)](./INSTRUCTIONS.md) · [PLAN.md (US)](./PLAN.md)
- [FEATURE.md](../FEATURE.md) · [INSTRUCTIONS.md (Feature)](../INSTRUCTIONS.md)
- _[preencher se existirem: Architecture Assessment, padrões de stack, Runbook, US de que esta depende]_

## 📌 Implementation Summary

_[preencher ao final da entrega, por `skills/29-implementation-summary-update`]_

---

## Aprovação

- [ ] AC testáveis confirmados por QA-ENGINEER
- [ ] Aprovado pelo PO — libera `skills/06-create-user-story-artifacts` → `skills/07-refine-tasks`
