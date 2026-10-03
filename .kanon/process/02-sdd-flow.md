# 02 — SDD Flow (Spec-Driven Development Pipeline)

## Propósito
Descrever o fluxo macro e sequencial de desenvolvimento — do Requirement Summary até o registro em `MEMORY.md` — ditando a ordem em que as skills numeradas (00 a 42) devem ser acionadas.

## Quando se aplica
Em qualquer atividade de desenvolvimento não trivial, do levantamento do requisito até o registro final de conhecimento aprendido.

## Regras
- O fluxo segue a ordem macro: **Requirement Summary → Design Gate → Especificação/Design → Plano → Implementação → Validação → Registro em `MEMORY.md`**.
- O Design Gate (`41-design-gate`) é um hard gate entre o Requirement Summary e a Feature Specification: sem `DESIGN.md` aprovado por um humano, a Feature Specification (skills 01-03) não produz artefato — reforçado por `.claude/hooks/design-gate-approval-gate.js`, não apenas por convenção.
- `48-screen-validation` roda depois de `05-refine-user-stories` em toda US com interface e **não bloqueia** `07-refine-tasks`: a cobrança é a trava 12 (alerta na PR, `15-pull-request-gates.md`) e o DoD da US (`05-definition-of-done.md`). `49-change-impact` é transversal: roda sempre que chega um pedido de mudança, antes de `18-feature-context-back-propagation` propagar a decisão.
- `30-cost-of-ownership-tco` roda em **duas passadas**: preliminar logo após `04-architecture-assessment` (informa o dimensionamento de `07-refine-tasks`), final na Fase 6 (compara estimado vs. real). Não é uma etapa só de encerramento.
- `36-knowledge-retrieval` tem três checkpoints formais obrigatórios: antes de `39-generate-requirement-summary` (evitar reelicitar um problema já levantado antes), antes de `04-architecture-assessment` e antes de cada execução de `11-quality-gate` — além do uso sob demanda a qualquer momento.
- Pull Request (`34-pull-request-review`) é mandatório para uma Feature alcançar `done`, assim como TCO final e Audit Evidence (`33-audit-evidence`) — ver `process/05-definition-of-done.md` e `process/13-external-integration-prerequisite.md` para a exceção explícita registrada quando a ferramenta externa não está disponível.
- Qualquer defeito encontrado durante a execução de qualquer skill aciona `32-report-bug` automaticamente — não é corrigido silenciosamente dentro do fluxo principal.
- Cada skill numerada (00–42) tem uma posição definida nesse pipeline; uma skill não é acionada fora de ordem sem justificativa explícita e registrada.
- `42-resolve-progress-risks` roda sob demanda na Fase 7, após `35-feature-progress-report` já ter listado os riscos de uma Feature — nunca antes, e nunca adivinhando um risco que não está na tabela.
- O pipeline mapeia para a sequência de papéis descrita em [`agents/README.md`](../agents/README.md) (PO → UI-UX-DESIGNER → ARCHITECT → ... → SRE), mas opera no nível de skills, não de papéis — uma skill pode acionar um ou mais agentes.
- Nenhuma etapa é considerada concluída sem o artefato correspondente existir de fato (Requirement Summary escrito, plano registrado, runbook gerado, etc.).
- Ao final do fluxo, o aprendizado relevante da feature é registrado em `MEMORY.md` — o fluxo não termina na implementação.

## Sinais de violação
- Uma skill de implementação sendo acionada antes de a skill de especificação correspondente ter produzido seu artefato.
- `MEMORY.md` nunca atualizado ao final do pipeline.

## Procedimento em caso de falha
Se uma etapa do pipeline não puder ser concluída (skill indisponível, artefato anterior ausente), a lacuna é registrada explicitamente e o fluxo não avança para a etapa seguinte como se ela tivesse sido cumprida.

## Exemplo concreto

**Errado** — pipeline pulando etapa:
```
Skill 14 (implementar-endpoint) acionada diretamente, sem Requirement Summary
nem plano técnico registrados.
```

**Certo** — sequência respeitada, registro final feito:
```
Skill 01 (requirement-summary) → artefato: requisito com critério de aceite
Skill 05 (design-tecnico) → artefato: ADR
Skill 14 (implementar-endpoint) → artefato: PR
Skill 30 (memory-update) → MEMORY.md atualizado com o aprendizado da feature
```
