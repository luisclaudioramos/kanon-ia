# 05 — Definition of Done (DoD) Global

## Propósito
Listar os critérios objetivos e imutáveis para que qualquer artefato (User Story, Task ou Bug) seja considerado "pronto", independente de qual agente o produziu.

## Quando se aplica
Antes de qualquer artefato ser marcado como `done` na máquina de estados (`03-state-management.md`).

## Regras
- Critérios globais e imutáveis, que não variam por agente nem por pressa de prazo: testes passando, code review aprovado, runbook gerado, sem achado bloqueante de segurança aberto.
- Os critérios são objetivos e verificáveis — checagens binárias (passou/não passou), não uma impressão de "parece pronto".
- A lista de critérios é a mesma para todo tipo de artefato (User Story, Task, Bug); tipos diferentes podem ter critérios *adicionais*, nunca menos exigentes.
- Para uma **Feature** especificamente, o DoD inclui também: Pull Request real associado (`process/13-external-integration-prerequisite.md`, exceto exceção explícita registrada), TCO final registrado (`30-cost-of-ownership-tco`) e pacote de Audit Evidence gerado (`33-audit-evidence`).
- **RNF em estado indeterminado não é tratado como "passou" nem trava o fluxo à força**: se um RNF não pôde ser confirmado nem como verde nem como falho (ambiente indisponível, acesso insuficiente, dependência externa quebrada, causa desconhecida), isso aciona `32-report-bug` com a causa classificada, e o artefato avança como "aprovado com ressalva registrada" — nunca como "aprovado" liso. O usuário é notificado explicitamente e decide o próximo passo.

## Sinais de violação
- Um artefato marcado "pronto" sem runbook gerado.
- Um bug fechado sem teste de regressão comprovando a correção.
- Uma Feature em `done` sem PR, sem TCO final, ou sem Audit Evidence — e sem exceção explícita registrada para a ausência.
- Um RNF indeterminado apresentado como "passou" ou usado para bloquear o fluxo principal sem notificar o usuário.

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
