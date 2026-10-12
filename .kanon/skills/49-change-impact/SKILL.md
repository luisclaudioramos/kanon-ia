# 49 — Change Impact

## Propósito
Analisar um pedido de mudança **antes** de ele virar requisito: o que muda em cada sistema e artefato, quais caminhos existem, o que falta perguntar, e como comunicar isso ao negócio e ao time. Sem isso, um pedido aceito no chat muda o escopo em silêncio, e o custo só aparece quando a entrega atrasa.

## Fase / Posição no fluxo
Transversal. Acionada por [`48-screen-validation`](../48-screen-validation/SKILL.md) quando uma tela recebe `mudança pedida`, e sob demanda para qualquer pedido de mudança: mensagem de PO, decisão de reunião (inclusive vinda de [`43-meeting-intake`](../43-meeting-intake/SKILL.md)), e-mail. Trabalha antes da decisão; depois dela, quem propaga é [`18-feature-context-back-propagation`](../18-feature-context-back-propagation/SKILL.md).

## Entradas
- O pedido de mudança, com link para a origem.
- A Feature e as US afetadas, e o código dos sistemas envolvidos.

## Saídas
- `impactos/CHANGE-IMPACT-AAAA-MM-DD-<tema>.md` na pasta da Feature (ver [`templates/CHANGE-IMPACT.template.md`](../../templates/CHANGE-IMPACT.template.md)), com estado `em análise` → `enviado` → `decidido`.
- Dois rascunhos de mensagem: negócio e time.

## Regras principais

### Etapas
1. **Pedidos**: cada pedido numerado, com autor, link e trecho curto. Pedido ambíguo é marcado como ambíguo, nunca interpretado por conta própria.
2. **Como é hoje**: para cada pedido, o comportamento atual, conferido no código, com `arquivo:linha` ([`process/12-knowledge-retrieval.md`](../../process/12-knowledge-retrieval.md)).
3. **Impacto**: por sistema (API, front, site, BFF, banco, processos) e por artefato (US, Bugs, telas `NN`, Feature).
4. **Alternativas**: de 2 a 3 quando há escolha real, com a recomendação. "Sem alternativa: motivo" quando há um caminho só.
5. **A validar**: perguntas por pedido, em duas listas — negócio, em linguagem simples, e time, técnica.
6. **Uso interno**: prazo, divisão de entrega e estratégia de negociação ficam na seção "Uso interno — não vai para mensagem".
7. **Mensagens**: dois rascunhos.
   - **Negócio**: impacto concreto por pedido, sem jargão, **sem prazo**, com as perguntas.
   - **Time**: impacto, alternativas e o que falta validar, **sem prazo** e sem citar arquivo que o time não acessa.
8. **Depois da decisão**: o Tech Lead registra a decisão de cada pedido em "Decisões". A skill então aciona `18-feature-context-back-propagation` (Feature e US), `48-screen-validation` (telas afetadas ganham nova versão em `rascunho`) e prepara as atualizações do work item ([`16-work-tracking-publication`](../16-work-tracking-publication/SKILL.md)) e da documentação ([`21-documentation-publication`](../21-documentation-publication/SKILL.md)).

### Comunicação
- **Nada da seção "Uso interno" entra em mensagem.** Antes de propor um rascunho, a skill confere que ele não cita prazo, data de entrega nem divisão de entrega.
- Nenhuma mensagem é enviada sem o ok do Tech Lead. Antes de enviar, a skill lê o canal desde o último envio e incorpora o que chegou.
- Quando o Tech Lead separar os temas, uma mensagem não cita o assunto da outra.
- Sugestão de valor ou regra enviada ao time é conferida contra o validador e um exemplo real de dados antes do envio.
- Atualizações do work item e da documentação também esperam o ok do Tech Lead.

## Depende de
- `templates/CHANGE-IMPACT.template.md`, `18-feature-context-back-propagation`, `48-screen-validation`, `16-work-tracking-publication`, `21-documentation-publication`.
- `agents/AGENT-PO.md`, `agents/AGENT-ARCHITECT.md`, `process/11-subagent-anti-hallucination.md`, `process/12-knowledge-retrieval.md`, `process/14-decision-segregation.md`.

## Procedimento em caso de falha
Pedido que não pode ser conferido no código (repositório inacessível) entra com "Como é hoje: não verificado — motivo", nunca com uma suposição. Se o Tech Lead não decidir um pedido, ele continua em `enviado` e nada é propagado. Se uma propagação falhar (US, telas, work item, documentação), a skill lista exatamente o que ficou desatualizado em vez de declarar o pedido `decidido` por inteiro.
