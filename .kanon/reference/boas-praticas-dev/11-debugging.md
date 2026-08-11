# Debugging e Resolução de Problemas

## Depuração sistemática
- Reproduza o problema de forma confiável antes de tentar corrigir — sem reprodução, é impossível confirmar que a correção funcionou.
- Formule uma hipótese sobre a causa raiz antes de mexer no código; mudanças aleatórias ("tentar e ver") desperdiçam tempo e mascaram a causa real.
- Isole a variável: reduza o problema ao menor caso possível que ainda reproduz o bug ([bisecção](GLOSSARIO.md#bisseccao), remoção de partes do sistema).
- Não pare no primeiro sintoma — pergunte "por quê" repetidamente até chegar à causa raiz, não apenas ao ponto onde o erro aparece.

## Ferramentas
- Prefira [debugger](GLOSSARIO.md#debugger) e logs estruturados a `print`/`console.log` espalhados — mais fácil de remover e mais informativo.
- Use bisecção de commits (`git bisect`) para encontrar quando um bug foi introduzido.
- Reproduza em isolamento (teste unitário mínimo) sempre que possível — vira teste de [regressão](GLOSSARIO.md#regressao) automaticamente.

## Ao corrigir
- Corrija a causa raiz, não o sintoma. Um `try/catch` silenciando uma exceção não é uma correção.
- Adicione um teste de regressão que comprove que o bug foi corrigido e não vai voltar despercebido.
- Documente causas raízes não óbvias (na PR, no commit ou em um [post-mortem](GLOSSARIO.md#post-mortem)) — bugs sutis tendem a se repetir se a causa não for entendida pelo time.

## Incidentes em produção
- Priorize estancar o impacto ([rollback](GLOSSARIO.md#rollback), feature flag off, escala) antes de investigar a causa raiz com calma.
- Faça post-mortem sem culpa ([blameless](GLOSSARIO.md#blameless)): o objetivo é entender falhas de sistema/processo, não apontar culpados.
- Registre ações de acompanhamento concretas (o que muda no sistema/processo para o incidente não se repetir).
