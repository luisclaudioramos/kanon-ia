# Evidências e Métricas

Um requisito sem evidência é uma opinião. "O checkout está confuso" não é um problema documentado — é uma impressão. A pergunta que separa as duas coisas: **como eu sei que isso é verdade, e o quanto?**

## O que contar como evidência

- **Logs e dados de erro**: taxa de falha real de uma funcionalidade, não a percepção de que ela "falha bastante".
- **Reclamações recorrentes**: um padrão em tickets de suporte/atendimento — um caso isolado não é padrão, três casos parecidos na mesma semana já é sinal.
- **Métricas de performance atual**: tempo médio de resolução, taxa de abandono, taxa de conversão — o "antes", contra o qual o "depois" (pós-entrega) será comparado.
- **Gargalos observados diretamente**: encontrados via [shadowing](GLOSSARIO.md#shadowing) ou revisão de processo, não apenas relatados de segunda mão.

## Por que isso importa além de "parecer mais rigoroso"

1. **Justifica prioridade**: sem dado, é impossível comparar o valor de dois requisitos concorrentes — vira debate de opinião, não de impacto.
2. **Define a métrica de sucesso**: se o problema é "30% de abandono no pagamento", o critério de sucesso da entrega já nasce claro — reduzir esse número, mensuravelmente. Sem o dado de partida, não há como confirmar que a entrega funcionou.
3. **Evita resolver o sintoma errado**: às vezes o dado revela que o problema não é onde o stakeholder apontou primeiro.

## Quando a evidência não existe ainda

Nem todo requisito tem métrica pronta — às vezes o problema é novo o suficiente para não ter dado histórico. Nesse caso:
- Registre explicitamente que a evidência é qualitativa/anedótica (ex.: "relatado por 2 usuários em sessão de suporte, sem dado quantitativo ainda") — não finja um número que não existe.
- Defina qual métrica **vai** ser coletada a partir de agora, para que a próxima decisão sobre esse requisito já tenha dado real.
- Isso não bloqueia o levantamento — mas o documento final precisa deixar claro que é uma exceção registrada, não uma evidência forte tratada como se fosse.

## Anti-padrão

Aceitar "o sistema deve ser rápido" ou "interface intuitiva" como requisito final. Esses termos não são mensuráveis — a pergunta de volta é sempre "rápido comparado a quê, e quanto é rápido o suficiente?" (ex.: "resposta em até 2s no p95"). Ver também [09-anti-padroes-e-sinais-de-alerta.md](09-anti-padroes-e-sinais-de-alerta.md).
