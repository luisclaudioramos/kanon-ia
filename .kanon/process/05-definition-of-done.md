# 05 — Definition of Done (DoD) Global

## Propósito
Listar os critérios objetivos e imutáveis para que qualquer artefato (User Story, Task ou Bug) seja considerado "pronto", independente de qual agente o produziu.

## Quando se aplica
Antes de qualquer artefato ser marcado como `done` na máquina de estados (`03-state-management.md`).

## Regras
- Critérios globais e imutáveis, que não variam por agente nem por pressa de prazo: testes passando, code review aprovado, runbook gerado, sem achado bloqueante de segurança aberto.
- Os critérios são objetivos e verificáveis — checagens binárias (passou/não passou), não uma impressão de "parece pronto".
- A lista de critérios é a mesma para todo tipo de artefato (User Story, Task, Bug); tipos diferentes podem ter critérios *adicionais*, nunca menos exigentes.

## Sinais de violação
- Um artefato marcado "pronto" sem runbook gerado.
- Um bug fechado sem teste de regressão comprovando a correção.

## Procedimento em caso de falha
Se um artefato precisar avançar sem satisfazer 100% do DoD (ex.: incidente crítico), isso é uma exceção explícita e registrada, com o item pendente listado — o artefato não é considerado `done` de fato até o item ser completado.

## Exemplo concreto

**Errado** — marcado pronto sem satisfazer o critério:
```
User Story "desconto-por-cep": done.
(código mesclado, mas sem runbook gerado nem code review registrado)
```

**Certo** — cada critério confirmado antes de done:
```
User Story "desconto-por-cep":
  [x] testes passando
  [x] code review aprovado
  [x] runbook gerado
  [x] sem achado bloqueante de segurança aberto
→ done
```
