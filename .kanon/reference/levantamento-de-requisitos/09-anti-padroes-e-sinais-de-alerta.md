# Anti-padrões e Sinais de Alerta

Sintomas que costumam aparecer *antes* do requisito virar problema em produção — vale checar ativamente por eles, não só reagir quando já deram errado.

## Na escrita do requisito

- **Termos vagos e não mensuráveis**: "o sistema deve ser rápido", "interface intuitiva", "fácil de usar". Nenhum desses dá para verificar como verdadeiro ou falso. A pergunta de correção é sempre "comparado a quê, e quanto é suficiente?" — ver [03-evidencias-e-metricas.md](03-evidencias-e-metricas.md).
- **Solução sem problema**: descreve a tela/botão/campo desejado, mas nunca o problema de negócio por trás. Sinal de que a fase de Elicitação foi pulada e foi direto para Especificação.
- **Ausência de "fora de escopo"**: presume-se implicitamente que tudo que não foi proibido está incluso — ver [05-delimitacao-de-escopo.md](05-delimitacao-de-escopo.md).

## No processo de coleta

- **Reunião de escopo sem o usuário final**: só liderança/gerência na sala, quem realmente vai operar o sistema no dia a dia ausente. Reduz o requisito à perspectiva de quem manda, não de quem usa.
- **Aceitar passivamente o pedido literal**: "ele quer uma tela X" sem investigar a dor de negócio por trás — o pedido do stakeholder é um sintoma, não necessariamente a solução certa.
- **Resistência da equipe técnica em validar viabilidade**: se ninguém do time técnico está disposto a confirmar se o que está sendo mapeado é factível, o levantamento segue com um risco de viabilidade não verificado até tarde demais.

## Durante o desenvolvimento (sinal de que o requisito já falhou antes de chegar aqui)

- Desenvolvedores fazendo muitas perguntas óbvias durante a codificação — o requisito não respondia o que precisava.
- O cliente diz "não foi isso que eu pedi" na entrega ou homologação.
- Explosão de bugs de lógica no ambiente de teste, concentrados numa mesma área — geralmente aponta para uma regra de negócio mal levantada, não para um erro de implementação isolado.

Se algum desses sintomas aparecer, ver [10-gestao-de-falhas-e-mudancas.md](10-gestao-de-falhas-e-mudancas.md) para o plano de contenção.
