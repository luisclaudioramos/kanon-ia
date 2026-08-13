# Processo de Elicitação de Requisitos

## O ciclo de 4 fases

A engenharia de requisitos não é uma etapa única — é um processo cíclico com 4 fases, mais uma gestão de mudanças contínua por cima de todas elas:

```
[Elicitação / Coleta] → [Análise / Negociação] → [Especificação / Registro] → [Validação / Homologação]
                              ↑________________ Gestão de Mudanças (contínua) ________________↑
```

1. **[Elicitação](GLOSSARIO.md#elicitacao) (Coleta)**: descoberta das necessidades junto aos [stakeholders](GLOSSARIO.md#stakeholder), sem filtro nem julgamento ainda — o objetivo aqui é coletar amplo, não decidir. Ver [02-tecnicas-de-elicitacao.md](02-tecnicas-de-elicitacao.md).
2. **Análise e Negociação**: triagem do que é viável, seguro e prioritário; resolução de conflitos de interesse entre stakeholders diferentes. É aqui que "tudo que foi pedido" vira "o que realmente vai ser feito".
3. **Especificação (Registro)**: tradução das necessidades filtradas em documento técnico legível e rastreável (User Story, Requirement Summary, RF/RNF) — nunca um calhamaço que ninguém lê, nem só a memória de quem coletou. Ver [04-criterios-de-aceite-e-rastreabilidade.md](04-criterios-de-aceite-e-rastreabilidade.md).
4. **Validação ([Homologação](GLOSSARIO.md#homologacao))**: confirmação explícita do stakeholder de que o documento reflete exatamente o que ele precisa — antes de qualquer linha de código. Ver [11-validacao-e-homologacao.md](11-validacao-e-homologacao.md).

## Por que separar as fases explicitamente

Um erro comum é colapsar Elicitação e Especificação em uma única conversa — o analista já escreve a versão "final" enquanto ainda está ouvindo, filtrando precocemente o que parece "menos importante" antes de ter o quadro completo. Isso produz requisito raso: a solução aparece rápido, mas sem o problema de negócio por trás dela documentado, e sem alternativas descartadas registradas.

## Verificação antes de começar

Antes de abrir uma nova rodada de elicitação, confirme se o problema já não passou por um levantamento anterior (outra Feature, um documento antigo, uma decisão já tomada e registrada). Repetir o levantamento do zero sem checar isso gasta tempo do stakeholder de novo e corre o risco de produzir uma versão inconsistente com o que já foi decidido antes.

## Regras de ouro

1. **Nunca assuma nada**: se uma regra de negócio parecer óbvia, valide-a mesmo assim — "óbvio" é frequentemente onde a exceção mora.
2. **O "porquê" antes do "como"**: descubra o problema de negócio antes de desenhar tela, tabela ou endpoint.
3. **Rastreabilidade total**: todo requisito funcional está atrelado a um objetivo de negócio e a um critério de aceite verificável — nunca solto.
