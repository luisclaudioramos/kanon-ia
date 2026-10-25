# 19 — Evidence Verification

## Propósito
Impedir que um número ou uma conclusão saia do chat antes de ser verificado. Uma consulta certa sobre um campo de significado errado produz um número preciso e falso; uma regra dita com segurança numa conversa pode estar errada; uma coincidência no tempo parece causa. Este processo define o que conferir antes de afirmar, como uma segunda leitura independente confere a primeira, e o que fazer quando uma conclusão já publicada cai.

## Quando se aplica
- A pergunta 4 da triagem de bug (`skills/32-report-bug`), sempre que a resposta for "Sim".
- Todo número de impacto (quantos clientes, registros, valores ou eventos foram afetados) e toda conclusão de causa que vai para fora do chat: item na ferramenta de trabalho, mensagem a qualquer público (`skills/52-audience-message`), análise, postmortem, status report.
- Investigação de incidente (`agents/AGENT-SRE.md`).
- Não se aplica a hipótese marcada como hipótese, nem a número que só descreve o próprio arquivo ou a própria consulta (linhas lidas, tempo de execução).

## Regras

Antes de afirmar, os dez passos abaixo. O resultado vai num bloco **Verificação** ao lado da conclusão (no `BUG.md`, logo depois da Triagem; nos demais artefatos, numa seção com esse nome).

1. **Fatos do ambiente lidos antes.** O arquivo de fatos do ambiente da empresa (`process/17-company-profile.md`, "Fatos do ambiente") é lido antes da primeira consulta. Fato vencido é premissa a reconferir.
2. **Significado de cada campo.** Todo campo usado em filtro, junção, corte de data ou contagem tem o significado conferido: de onde vem o valor (o código que grava, a documentação ou um fato do ambiente) e uma amostra que confirma. O nome do campo não é o significado (`created` pode ser a criação de outra etapa). Campo não conferido entra como premissa não verificada, e a conclusão não passa de "plausível".
3. **Correlação não é atribuição.** Coincidir no tempo, no identificador ou no campo é pista. Atribuir uma causa exige o mecanismo, no código ou no dado.
4. **Hipóteses concorrentes, com a evidência que refuta.** Pelo menos duas hipóteses, sempre incluindo "a consulta ou o campo está errado" e "é o comportamento esperado". Para cada uma, a consulta ou o teste que a derrubaria, e o resultado. Sobra a hipótese com menos evidência contra, não a com mais evidência a favor.
5. **Cadeia causal sem lacuna.** Do gatilho ao sintoma, passo a passo, cada passo com a evidência. "De algum jeito X leva a Y" é lacuna.
6. **Força da evidência e rótulo da conclusão.** Cada evidência é direta (o dado ou o teste mostra o fato), correlacional, testemunhal (alguém disse) ou ausência (não achou). Regra dita numa conversa é testemunhal até o código ou quem tem autoridade confirmar. A conclusão sai rotulada: **confirmada** (evidência direta, nenhuma contrária), **plausível**, **refutada** ou **inconclusiva**.
7. **Validação antes de declarar.** Cinco perguntas, com a resposta escrita:
   - Provei o mecanismo, ou só o tempo e a correlação?
   - O que me provaria errado, e testei isso?
   - Que premissas da cadeia não testei?
   - Há uma explicação mais simples que não descartei?
   - O que está em vigor no ambiente (versão implantada, configuração, jobs, cache) é o que eu li?
8. **Pre-mortem.** Supor que a conclusão está errada e escrever o motivo mais provável. Se o motivo não foi testado, testá-lo antes de seguir.
9. **Conferência independente.** Antes de declarar "confirmada", um segundo agente, em outra janela de contexto e sem a hipótese do primeiro (`process/14-decision-segregation.md`), recebe só a pergunta, a consulta ou o script, os dados de entrada e os fatos do ambiente usados, e responde se o resultado sustenta a conclusão e o que a derrubaria. O despacho segue `templates/SUBAGENT-DISPATCH.template.md`, e o retorno, `process/07-return-envelope.md`. Divergência volta para o passo 4. Sem a conferência, a conclusão fica "plausível".
10. **Limite com direção.** "Piso", "teto" ou "estimativa" só com o motivo e a direção do erro possível. Um número chamado de piso precisa de um argumento de que não pode estar alto demais.

**Quando uma conclusão cai** (revisão, conferência ou fato novo):
- Listar todo lugar por onde ela passou: triagem, `BUG.md`, item publicado, campos derivados dela (severidade, prioridade), rascunhos e mensagens enviadas.
- Cada lugar ganha um **adendo datado** ("Corrigido em AAAA-MM-DD: …", com o que mudou e por quê). O texto original fica: corrigir não é reescrever.
- Item já publicado e mensagem já enviada são corrigidos pela mesma regra de publicação e de envio que valeu para o original (aprovação de quem usa o kanon).
- O fato que causou o erro vira fato do ambiente, na hora.

**Fato descoberto vira fato do ambiente na hora**, com a fonte e a data, não no fim da investigação.

## Sinais de violação
- Conclusão "confirmada" sem o bloco Verificação, ou com o bloco sem a conferência independente.
- Campo usado em corte de data ou junção sem a origem do valor registrada.
- Uma hipótese só, ou hipóteses sem a evidência que as refutaria.
- "Piso" ou "estimativa" sem o motivo e a direção do erro.
- Conclusão corrigida num lugar e mantida em outro; texto original reescrito sem adendo.

## Procedimento em caso de falha
Se um passo não pode ser cumprido (campo sem origem conhecida, ambiente sem acesso, conferência sem agente disponível), a conclusão fica "plausível" ou "inconclusiva", com o passo que faltou e o pedido em aberto, e não sai como confirmada. Na triagem, isso significa "latente" (item já registrado) ou inconclusivo (`skills/32-report-bug`).

## Exemplo concreto

**Errado** — número publicado com um campo de significado não conferido:
```
Pergunta 4: Sim. 800 desafios caíram de 1 para 0 depois do resgate (resgate criado
antes do arquivo, redemption.created). É um piso.
```

**Certo** — o campo conferido derruba a hipótese antes de publicar:
```
Verificação
- Campos: redemption.created = data da reserva (código que grava + amostra: 500
  criados em 01/09 00:01, conversão das reservas fixas). Data do resgate = primeiro
  registro em redemption_processing_history.
- Hipóteses: H1 bug derrubou desafio resgatado; H2 a queda veio com só reserva
  (esperado); H3 a consulta está errada. Refutação de H1: nenhum resgate tinha
  registro de processamento antes da queda. Sobra H2.
- Conclusão: refutada para impacto; defeito no código segue (latente).
- Conferência independente: outro agente refez o cruzamento com as mesmas entradas
  e chegou a 0 casos.
```
