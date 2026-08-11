# 02 — SDD Flow (Spec-Driven Development Pipeline)

## Propósito
Descrever o fluxo macro e sequencial de desenvolvimento — do Requirement Summary até o registro em `MEMORY.md` — ditando a ordem em que as skills numeradas (01 a 32) devem ser acionadas.

## Quando se aplica
Em qualquer atividade de desenvolvimento não trivial, do levantamento do requisito até o registro final de conhecimento aprendido.

## Regras
- O fluxo segue a ordem macro: **Requirement Summary → Especificação/Design → Plano → Implementação → Validação → Registro em `MEMORY.md`**.
- Cada skill numerada (01–32) tem uma posição definida nesse pipeline; uma skill não é acionada fora de ordem sem justificativa explícita e registrada.
- O pipeline mapeia para a sequência de papéis descrita em [`agentes-ia/README.md`](../agents/README.md) (PO → UI-UX-DESIGNER → ARCHITECT → ... → SRE), mas opera no nível de skills, não de papéis — uma skill pode acionar um ou mais agentes.
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
