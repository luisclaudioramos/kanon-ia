# 08 — Model Orchestration (Selo II)

## Propósito
Definir a matriz de roteamento de modelos — qual tier de modelo (Forte, Intermediário, Rápido) deve ser usado para cada tier de esforço (High, Medium, Low) de uma tarefa.

## Quando se aplica
Antes de disparar qualquer agente/skill, para decidir qual modelo executa a tarefa.

## Regras
- Tarefas são classificadas por tier de esforço:
  - **High**: ex. análise de arquitetura, decisão de segurança crítica.
  - **Medium**: ex. implementação de lógica de negócio.
  - **Low**: ex. gerar links navegáveis, formatação.
- Cada tier de esforço tem um tier de modelo mínimo obrigatório: **High → Forte**, **Medium → Intermediário**, **Low → Rápido**. Usar um modelo mais fraco que o mínimo exigido não é permitido.
- É permitido usar um modelo mais forte que o mínimo exigido (por disponibilidade/custo), nunca mais fraco.
- Fan-outs (`04-handoff-protocol.md`) podem distribuir subagentes em diferentes tiers de modelo, desde que cada um respeite o mínimo exigido pela própria tarefa.

## Sinais de violação
- Uma análise de arquitetura sendo delegada a um modelo do tier Rápido.
- Uso indiscriminado do tier Forte para tarefas triviais (desperdício de custo, ainda que não seja uma violação de segurança).

## Procedimento em caso de falha
Se o modelo do tier exigido não estiver disponível no momento, a tarefa é registrada como bloqueada até o tier correto estar disponível — nunca rebaixada silenciosamente para um tier insuficiente.

## Exemplo concreto

**Errado** — tarefa crítica rebaixada por custo:
```
"Análise de arquitetura de migração de banco" executada no tier Rápido
porque o tier Forte estava sob alta demanda.
```

**Certo** — tarefa aguarda o tier correto; tarefa trivial roda imediatamente:
```
"Análise de arquitetura de migração de banco" (High) → bloqueada até tier Forte disponível.
"Gerar breadcrumbs de navegação do runbook" (Low) → tier Rápido, executa imediatamente.
```
