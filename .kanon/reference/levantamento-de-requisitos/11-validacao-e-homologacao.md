# Validação e Homologação

## O que a Validação confirma

Diferente da Especificação (que registra o requisito formalmente), a Validação confirma — com o stakeholder, explicitamente — que o documento reflete exatamente o que ele precisa. Um requisito bem escrito que nunca foi confirmado pelo dono do problema real ainda é uma suposição, não um requisito validado.

## Fluxo de homologação padrão

- [ ] Escrita da User Story/requisito, com critério de aceite no formato [Gherkin](GLOSSARIO.md#gherkin) (ver [04-criterios-de-aceite-e-rastreabilidade.md](04-criterios-de-aceite-e-rastreabilidade.md)).
- [ ] Revisão técnica — arquitetura/desenvolvimento confirma que é viável, sem ainda comprometer a decisão de como implementar.
- [ ] Validação do negócio — o stakeholder confirma que o entendimento está correto (a [homologação](GLOSSARIO.md#homologacao) propriamente dita).
- [ ] Critérios de aceite finais — QA/testes confirma que o cenário de sucesso descrito é realmente testável como escrito.

Cada etapa tem um dono diferente — a mesma pessoa que escreveu o requisito não é quem valida sozinha que ele está correto, pelo mesmo motivo que uma revisão de código não é feita por quem escreveu o código.

## Validação não é aprovação por omissão

"Enviei o documento e ninguém reclamou" não é validação — é ausência de objeção, o que não é a mesma coisa que confirmação ativa. A homologação exige uma resposta explícita do stakeholder, mesmo que seja rápida, confirmando que o entendimento bate com a necessidade real dele.

## Quando pular a validação parece tentador

Sob pressão de prazo, a tentação é avançar direto para desenvolvimento assumindo que "é óbvio que é isso que ele quer". Esse é exatamente o cenário que gera o sintoma "não foi isso que eu pedi" na entrega (ver [09-anti-padroes-e-sinais-de-alerta.md](09-anti-padroes-e-sinais-de-alerta.md)) — o custo de pular a validação tende a ser maior que o tempo que ela levaria.
