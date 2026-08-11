# Princípios Gerais

## KISS (Keep It Simple, Stupid)
Prefira sempre a solução mais simples que resolve o problema. Complexidade desnecessária aumenta custo de manutenção e probabilidade de bugs.

## DRY (Don't Repeat Yourself)
Evite duplicação de lógica. Duplicação significa múltiplos lugares para atualizar quando a regra mudar — e um deles sempre é esquecido.

- Exceção: duas coisas parecidas hoje podem divergir amanhã. Não abstraia prematuramente só porque o código "parece" repetido — abstraia quando a repetição representa a *mesma* regra de negócio.

## YAGNI (You Aren't Gonna Need It)
Não implemente funcionalidade, configuração ou abstração para um cenário hipotético futuro. Construa para o requisito de hoje.

## Single Responsibility
Cada função, classe ou módulo deve ter um único motivo para mudar. Se você descreve o que uma função faz usando "e", ela provavelmente deveria ser duas.

## Princípio da Menor Surpresa
Código deve se comportar da forma que um leitor razoável esperaria. Nomes, assinaturas e efeitos colaterais devem ser previsíveis.

## Fail Fast
Erros devem ser detectados e sinalizados o mais cedo possível — validação na borda do sistema, tipos fortes, [asserts](GLOSSARIO.md#assert) em [invariantes](GLOSSARIO.md#invariante) internas — em vez de propagar silenciosamente um estado inválido.

## Legibilidade > Esperteza
Código é lido muitas vezes mais do que é escrito. Prefira clareza a soluções "inteligentes" que exigem esforço mental extra do próximo leitor (que pode ser você mesmo, em 6 meses).

## Otimize depois de medir
Não otimize por instinto. Escreva código correto e claro primeiro; otimize partes específicas apenas quando um [profiling](GLOSSARIO.md#profiling) real mostrar que são gargalo.
