# 05 — Definition of Done (DoD) Global

## Propósito
Listar os critérios objetivos e imutáveis para que qualquer artefato (User Story, Task ou Bug) seja considerado "pronto", independente de qual agente o produziu.

## Quando se aplica
Antes de qualquer artefato ser marcado como `done` na máquina de estados (`03-state-management.md`).

## Regras
- Critérios globais e imutáveis, que não variam por agente nem por pressa de prazo: testes passando (suíte completa, incluindo integração e E2E quando existirem), cobertura de 100% do código novo ou alterado, documentação do sistema atual atualizada para o to-be, code review aprovado com o mínimo de aprovações de colegas, runbook gerado, sem achado bloqueante de segurança aberto. Critérios detalhados das travas de PR em [`15-pull-request-gates.md`](15-pull-request-gates.md).
- **User Story com telas** (`skills/48-screen-validation`): só vai a `done` com todas as telas em `aprovada` ou `aprovada com ressalvas` — no desenho ou no teste — e a versão aprovada igual à entregue. A evidência é o índice e o registro de aprovações de `telas/SCREEN-VALIDATION.md`, conferidos por `11-quality-gate`. A trava 12 de [`15-pull-request-gates.md`](15-pull-request-gates.md) só alerta na PR; o bloqueio é aqui.
- **User Story com interface** ([`16-design-foundations.md`](16-design-foundations.md)): além das telas aprovadas, o QA conferiu a tela em homologação nas larguras 390, 768 e 1920 (D1, com as pranchas da homologação); os bugs visuais ligados à US no refinamento estão corrigidos ou abertos por decisão registrada do PO; e nenhuma regra 🔴 da trava 13 está pendente.
- Os critérios são objetivos e verificáveis — checagens binárias (passou/não passou), não uma impressão de "parece pronto".
- A lista de critérios é a mesma para todo tipo de artefato (User Story, Task, Bug); tipos diferentes podem ter critérios *adicionais*, nunca menos exigentes.
- Para uma **Feature** especificamente, o DoD inclui também: Pull Request real associado (`process/13-external-integration-prerequisite.md`, exceto exceção explícita registrada), TCO final registrado (`30-cost-of-ownership-tco`) e pacote de Audit Evidence gerado (`33-audit-evidence`).
- **RNF em estado indeterminado não é tratado como "passou" nem trava o fluxo à força**: se um RNF não pôde ser confirmado nem como verde nem como falho (ambiente indisponível, acesso insuficiente, dependência externa quebrada, causa desconhecida), isso aciona `32-report-bug` com a causa classificada, e o artefato avança como "aprovado com ressalva registrada" — nunca como "aprovado" liso. O usuário é notificado explicitamente e decide o próximo passo.
- **O checklist do próprio artefato (sub-tasks e "Definition of Done da Task" em `TASK-XX.md`, Acceptance Criteria em `USER-STORY-XX.md`) é marcado no mesmo momento em que `11-quality-gate` aprova o trabalho** — a aprovação e o registro do checklist são uma única ação atômica, nunca duas ações separadas que podem dessincronizar. Não é aceitável que o trabalho esteja aceito no DoD da Feature enquanto o checklist granular do artefato continua com `[ ]`, à espera de uma auditoria posterior (`35-feature-progress-report`) reconciliar. _Origem: risco R-1 registrado no `PROGRESS-REPORT.md` da Feature FEAT-01, onde os 8 checklists de Task só foram marcados retroativamente numa auditoria, dias depois do trabalho estar completo. (Feature vive fora do Kanon, em `docs/<projeto>/features/`; este processo não referencia arquivos externos diretamente.)_

## Sinais de violação
- Um artefato marcado "pronto" sem runbook gerado.
- Um bug fechado sem teste de regressão comprovando a correção.
- Uma Feature em `done` sem PR, sem TCO final, ou sem Audit Evidence — e sem exceção explícita registrada para a ausência.
- Um RNF indeterminado apresentado como "passou" ou usado para bloquear o fluxo principal sem notificar o usuário.
- Um artefato com trabalho aceito no DoD da Feature, mas o checklist do próprio artefato (Task/User Story) ainda com itens `[ ]` — sinal de que `11-quality-gate` aprovou sem fechar o loop, não só um detalhe de rastreamento a corrigir depois.
- Um artefato marcado "pronto" com cobertura do diff abaixo de 100% sem exceção declarada, ou com documentação do sistema atual descrevendo o comportamento antigo.
- Uma PR mergeada com menos aprovações de colegas do que `15-pull-request-gates.md` exige.
- Uma User Story com telas em `done` com tela sem aprovação do PO e do negócio, ou com a versão entregue diferente da aprovada.
- Uma User Story com interface em `done` sem a conferência nas três larguras, ou com bug visual ligado a ela aberto sem decisão registrada do PO.

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
  [x] testes passando (suíte completa)
  [x] cobertura de 100% do código alterado
  [x] documentação atualizada para o to-be
  [x] code review aprovado (aprovações mínimas de colegas)
  [x] runbook gerado
  [x] sem achado bloqueante de segurança aberto
→ done
```
