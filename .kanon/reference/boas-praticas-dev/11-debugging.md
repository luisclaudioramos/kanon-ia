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

## Postmortem
Modelo em [`templates/POSTMORTEM.template.md`](../../templates/POSTMORTEM.template.md): resumo, linha temporal, impacto, causa raiz, o que funcionou e o que falhou, ações corretivas e lições aprendidas.

- **Quando fazer:** o incidente afetou cliente (dado, saldo, valor ou acesso), deixou produção indisponível de forma perceptível, corrompeu ou perdeu dado, ou repete a causa de um incidente anterior. Fora disso, só quando quem decide pedir; o registro do incidente basta.
- **Quando escrever:** depois da resolução, enquanto a linha temporal ainda está fresca. O registro feito durante o incidente é a fonte; o postmortem não o substitui.
- **Sem culpa:** o texto descreve o que o sistema e o processo permitiram, nunca quem errou. Pessoa aparece só como papel.
- **Linha temporal:** os quatro marcos são obrigatórios (início, detecção, contenção, resolução), com o fuso, e dão os tempos até detectar, conter e resolver.
- **Causa raiz** inclui "por que não foi pego antes": o que faltou no teste, na revisão, no alerta ou na validação.
- **Ações corretivas:** cada uma vira um item na ferramenta de trabalho, com tipo (prevenir, detectar, conter), prioridade e dono (papel). O prazo é a data da estimativa do time ou uma data acordada; sem ela, "a estimar com o time". O postmortem só fecha quando toda ação tem item.
- **Lições:** o que vale além do incidente vai para `MEMORY.md` (`skills/23-register-lesson-learned`); decisão técnica que nasce dele vira ADR (`templates/DECISION-RECORD.template.md`).
- **Revisão e entrega:** o time revisa antes de circular (`estado: revisado`). Para outros públicos, a mensagem é do tipo "Entrega de material" (`reference/comunicacao/03-tipos-de-mensagem.md`), com o conteúdo do público certo; o postmortem fica no documento.
