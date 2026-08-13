# Sistemas Legados (Brownfield) e Engenharia Reversa

## O desafio específico

Em um projeto [brownfield](GLOSSARIO.md#brownfield), o problema raramente é falta de opções — é o oposto: vícios de uso acumulados, regras de negócio ocultas dentro do código (não documentadas em lugar nenhum), documentação desatualizada ou inexistente, e resistência cultural a qualquer mudança de um processo que "sempre funcionou assim".

## Foco da abordagem

- **[Engenharia Reversa](GLOSSARIO.md#engenharia-reversa)**: quando ninguém consegue explicar com confiança uma regra de negócio, a fonte da verdade vira o código, o banco de dados e os logs de produção — não a memória de quem ainda está na empresa.
- **[Shadowing](GLOSSARIO.md#shadowing)**: observar o usuário operando o sistema revela as "gambiarras" operacionais que existem por fora do sistema formal — planilhas paralelas, passos manuais, atalhos não documentados — que uma entrevista sozinha dificilmente capturaria, porque o próprio usuário nem percebe que aquilo é uma adaptação.
- **[Data Mapping](GLOSSARIO.md#data-mapping)**: mapeamento crítico de todas as integrações antes de qualquer mudança, para não quebrar um consumidor downstream que ninguém lembrava que existia.

## Antes de assumir que uma regra é a regra certa

Uma regra encontrada no código de um sistema legado pode ser: (a) a regra de negócio real e intencional, (b) um bug antigo que virou comportamento esperado por acidente, ou (c) código morto que já não importa mais. Engenharia Reversa sozinha não distingue essas três coisas — validar com quem opera o sistema (via [shadowing](GLOSSARIO.md#shadowing) ou entrevista) é o que confirma qual das três é.

## Cuidado com resistência cultural

Resistência a mudar um processo legado nem sempre é resistência à mudança em si — às vezes é sinal de que o processo atual resolve um problema que o novo levantamento ainda não enxergou. Tratar a resistência como objeção a ser vencida, sem investigar a causa, é como um requisito real acaba ficando de fora do levantamento.
