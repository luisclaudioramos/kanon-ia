# 08 — Model Orchestration (Selo II)

## Propósito
Definir a matriz de roteamento de modelos — qual tier de modelo (Forte, Intermediário, Rápido) deve ser usado para cada tier de esforço (XHigh, High, Medium, Low) de uma tarefa.

## Quando se aplica
Antes de disparar qualquer agente/skill, para decidir qual modelo executa a tarefa.

## Regras
- Tarefas são classificadas por tier de esforço:
  - **XHigh**: decisões de governança do próprio pipeline — ex. `41-design-gate`, `09-identity-seals-gate`. Nunca delegada, nunca roda em paralelo com fallback de tier.
  - **High**: ex. análise de arquitetura, decisão de segurança crítica.
  - **Medium**: ex. implementação de lógica de negócio.
  - **Low**: ex. gerar links navegáveis, formatação.
- Cada tier de esforço tem um tier de modelo mínimo obrigatório: **XHigh → Forte**, **High → Forte**, **Medium → Intermediário**, **Low → Rápido**. Usar um modelo mais fraco que o mínimo exigido não é permitido.
- XHigh e High roteiam para o mesmo tier de modelo (Forte) — a distinção entre eles é de disciplina de execução (XHigh nunca aceita substituição de tier sob indisponibilidade, ver Sinais de violação), não de qual modelo é usado.
- É permitido usar um modelo mais forte que o mínimo exigido (por disponibilidade/custo), nunca mais fraco.
- O tier de esforço e o tier de modelo usados em uma atividade não ficam implícitos — são anunciados ao usuário (ex.: "executando em tier Forte/High") antes ou junto do resultado, para que a decisão de roteamento seja auditável, não uma caixa-preta.
- Fan-outs (`04-handoff-protocol.md`) podem distribuir subagentes em diferentes tiers de modelo, desde que cada um respeite o mínimo exigido pela própria tarefa.

## Sinais de violação
- Uma análise de arquitetura sendo delegada a um modelo do tier Rápido.
- Uso indiscriminado do tier Forte para tarefas triviais (desperdício de custo, ainda que não seja uma violação de segurança).
- Uma tarefa XHigh (ex. Design Gate) executada com fallback de tier por indisponibilidade — XHigh bloqueia e espera, nunca substitui silenciosamente.
- Um resultado entregue sem indicar em qual tier de esforço/modelo rodou, obrigando o usuário a perguntar ou assumir.

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
