# PR Review — _[preencher: título do PR]_

_Gerado/gerenciado por `skills/34-pull-request-review`._

**PR**: _[preencher: link]_ · **Revisores**: `AGENT-CODE-REVIEWER` + _[preencher: humanos]_
**Relatório detalhado do CODE-REVIEWER**: _[preencher: link para o `CODE-REVIEW-REPORT.template.md` gerado por `skills/13-code-review`]_

## Travas de PR (`process/15-pull-request-gates.md`)
- [ ] 1 — As-is / to-be
- [ ] 2 — Linguagem clara
- [ ] 3 — Testes unitários (ou exceção declarada)
- [ ] 4 — Como testar
- [ ] 5 — Integrações
- [ ] 6 — Tamanho (🟡 — se disparou, trava 8 exige aprovação adicional)
- [ ] 7 — Massa de teste (sintética ou anonimizada)
- [ ] 8 — Aprovações de colegas
- [ ] 9 — Documentação atualizada
- [ ] 10 — Mocks e demais testes
- [ ] 11 — Cobertura de 100% do diff

## Checklist de qualidade
- [ ] Aderência aos Acceptance Criteria da User Story
- [ ] Sem hardcode de ambiente/segredo (Selo I — `process/10-core-agnosticism-gate.md`)
- [ ] Sem duplicação evitável (DRY)
- [ ] Nomenclatura em inglês, revela intenção (`reference/boas-praticas-dev/02-estilo-de-codigo.md`)

## Apontamentos
| Severidade | Local | Descrição | Sugestão |
|---|---|---|---|
| bloqueante / recomendação / nit | _[preencher]_ | _[preencher]_ | _[preencher]_ |

## Voto final
- [ ] `APPROVED`
- [ ] `CHANGES REQUESTED`

Merge só é liberado com as aprovações da trava 8 e `skills/11-quality-gate` aprovado.
