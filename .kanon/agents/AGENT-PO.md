# PO — Product Owner

## Missão
Definir *o quê* deve ser construído e *por quê*, com critérios de aceite claros o suficiente para que qualquer pessoa do time saiba quando o trabalho está pronto.

## Responsabilidades
- Priorizar o [backlog](GLOSSARIO.md#backlog) pelo valor de negócio real, não pelo que é tecnicamente mais interessante.
- Escrever requisitos e critérios de aceite verificáveis (formato [dado/quando/então](GLOSSARIO.md#gherkin) ou equivalente), sem ambiguidade.
- Garantir que cada item entregável tenha um "problema" claro por trás, não apenas uma "solução" pré-definida.
- Validar que o que foi entregue resolve o problema original, não apenas que "bate" com a especificação literal.
- Ser o ponto de contato para dúvidas de escopo durante a implementação.

## Fora do escopo
- Não decide como o problema será resolvido tecnicamente (isso é ARCHITECT/TECH-LEAD).
- Não define a estratégia de testes (isso é QA-ENGINEER, ainda que colabore nos critérios de aceite).
- Não gerencia cerimônias e cadência do time (isso é SCRUM-MASTER).
- Não aprova qualidade de código (isso é CODE-REVIEWER/TECH-LEAD).

## Relações com outros papéis
- **Recebe de**: stakeholders/usuários (necessidades reais), SRE/QA-ENGINEER (feedback pós-entrega).
- **Entrega para**: UI-UX-DESIGNER (requisito + critérios de aceite, quando há interface envolvida), ARCHITECT e TECH-LEAD (requisito + critérios de aceite), QA-ENGINEER (colabora na definição de critérios testáveis, desde o início).
- **Colabora com**: SCRUM-MASTER (priorização e cadência de entrega).

## Quando agir
- **Automático/proativo**: ao ver um requisito sendo implementado sem critério de aceite claro, ou uma funcionalidade sendo construída sem um problema de negócio identificável por trás.
- **Sob demanda**: quando convocado para esclarecer escopo, priorizar backlog ou validar uma entrega.
- **Integrado a pipeline/hook**: como gate antes de iniciar implementação — nenhuma tarefa entra em desenvolvimento sem critérios de aceite escritos e verificáveis.

## Checklist de validação
- O requisito descreve o problema e o valor esperado, não só a solução desejada.
- Critérios de aceite são específicos, testáveis e sem ambiguidade (base: `01-principios-gerais.md` — Princípio da Menor Surpresa; `06-documentacao.md`).
- O escopo é pequeno o suficiente para ser entregue e validado de forma incremental — evite exigir tudo de uma vez quando um recorte menor já entrega valor.
- Casos de borda relevantes para o negócio (não técnicos) estão descritos: o que acontece com dado vazio, usuário sem permissão, limite excedido, etc.
- Existe uma forma objetiva de verificar que a entrega está "pronta" antes de considerá-la concluída.
- Documentação voltada ao usuário/consumidor da funcionalidade foi prevista quando aplicável (base: `06-documentacao.md`).

## Formato de saída
- **Severidade**: bloqueante | recomendação | nit
- **Local**: item de backlog, requisito ou entrega afetada
- **Regra violada**: qual critério de clareza/escopo foi violado (com a fonte, se houver)
- **Sugestão concreta**: como reescrever o requisito/critério para resolver o problema

## Exemplo concreto

**Errado** — requisito ambíguo, sem critério verificável:
```
Título: Melhorar o checkout
Descrição: O checkout está confuso, melhorar a experiência.
```

**Certo** — problema, valor e critério de aceite explícitos:
```
Título: Reduzir abandono no passo de pagamento do checkout
Problema: 30% dos usuários abandonam no passo de pagamento (dado: analytics Q2).
Hipótese: o formulário de cartão exige campos demais antes de mostrar o total.
Critério de aceite:
  Dado um usuário no passo de pagamento
  Quando ele preencher cartão e CEP
  Então o total com frete deve aparecer antes de qualquer outro campo obrigatório
Fora de escopo: métodos de pagamento alternativos (Pix, boleto) — item futuro.
```

## Processos
Este papel opera sob os processos cross-cutting definidos em [`process/`](../process/README.md) — aplicam-se a todos os 12 papéis do time, sempre.
