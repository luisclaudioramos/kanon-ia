# Públicos

Cada público é definido pelo que o leitor precisa **conseguir fazer** depois de ler, não pelo cargo. Quem ocupa cada
público numa empresa está no perfil dela (papel → público). Uma pessoa pode ser de públicos diferentes em mensagens
diferentes: um Tech Lead lê como "time técnico" uma dúvida de código e como "gestão de entrega" um risco de prazo.

## Resumo

| # | Público | Sai da mensagem capaz de |
|---|---|---|
| 1 | Time técnico | escolher a abordagem, estimar, reproduzir |
| 2 | QA | montar e executar o teste |
| 3 | UI/UX | ajustar ou aprovar a tela e o fluxo |
| 4 | PO | decidir ou encaminhar cada pendência e priorizar |
| 5 | Negócio | responder a pergunta que trava e saber o que muda para ele |
| 6 | Dados e analistas | reproduzir o número do lado deles |
| 7 | Gestão de entrega | acompanhar, remover impedimento e decidir alocação |
| 8 | Liderança executiva | decidir investimento, risco e direção |
| 9 | Comitê de mudança | aprovar ou recusar a mudança em produção |
| 10 | Outro time interno | atender o pedido sem precisar de reunião |
| 11 | Parceiro ou fornecedor externo | agir do lado dele, dentro do que o contrato cobre |
| 12 | Segurança e compliance | avaliar a exposição e acompanhar a contenção |
| 13 | Suporte e operação | responder o cliente e saber quando escalar |

## 1. Time técnico

Dev, engenharia, arquitetura da própria equipe.
- **Entra:** `arquivo:linha`, commit, PR, consulta, log, contrato de API, passos de reprodução numerados, hipótese
  marcada como hipótese.
- **Não entra:** prazo e estratégia internos, assunto de outro canal, imperativo sobre decisão que é de quem
  implementa.
- **Tom:** direto e pragmático. **Formato:** conclusão + evidência + pergunta técnica concreta.
- **Exemplo:** "O filtro de fases lê só a `participant_stage`; os 5.433 que estão nas duas tabelas somem. Evidência
  na consulta 03. Alguém sabe se a leitura da outra tabela foi retirada de propósito?"

## 2. QA

Quem testa e valida a entrega.
- **Entra:** o que mudou em termos de comportamento, ambiente, massa de teste, critério de aceite, casos de borda,
  o que ficou fora do teste e por quê.
- **Não entra:** detalhe de implementação que não muda o teste; dado pessoal real como massa.
- **Tom:** objetivo. **Formato:** casos num documento compartilhável e a mensagem com o link e o resumo
  (passou / falhou / bloqueado).
- **Exemplo:** "Liberado para teste em homologação: liberação manual do prêmio. 19 casos no documento (link), massa
  com o prefixo QA_. Fora do teste: depósito, desligado neste ambiente."

## 3. UI/UX

Quem desenha telas, fluxos e o sistema de design.
- **Entra:** a tela ou o estado em questão (carregando, erro, vazio), o componente do sistema de design afetado, a
  restrição técnica que limita a solução, acessibilidade, a captura na largura de referência.
- **Não entra:** detalhe de back-end que não muda a tela; protótipo que não foi conferido contra o sistema real.
- **Tom:** colaborativo e visual. **Formato:** imagem ou link + o ponto a decidir.
- **Exemplo:** "Na tela de público, o upload hoje é página e não modal (captura anexa). Mantemos página ou vale
  migrar para o padrão de modal do sistema de design?"

## 4. PO

Quem prioriza e responde pelo escopo.
- **Entra:** impacto concreto, as opções que já existem, uma pergunta por pendência, o que cada pendência trava;
  evidência técnica só quando ela é o argumento.
- **Não entra:** detalhe de implementação, nome de quem investigou, prazo interno.
- **Tom:** estruturado. **Formato:** lista de pendências (decisão, quem decide, o que trava).
- **Exemplo:** "Duas decisões travam a entrega: (1) prêmio PJ com produto PF, manter ou bloquear? Trava 3 clientes.
  (2) …"

## 5. Negócio

Quem é dono da regra e do resultado para o cliente.
- **Entra:** causa em linguagem simples, o que foi feito e conferido, o que muda para ele, o próximo passo dele, uma
  pergunta curta por ponto ambíguo.
- **Não entra:** jargão, nome de dev, opção ou cenário que ele não citou, recomendação no lugar da decisão dele,
  prazo e estratégia internos, tabela de custo técnico (custo só entra como alerta quando uma opção é
  desproporcionalmente mais cara).
- **Tom:** direto, sem jargão. **Formato:** 2–4 frases + a pergunta.
- **Exemplo:** "Os elegíveis de outubro batem com os arquivos (7,3 milhões). A diferença vinha de olhar só uma das
  duas tabelas. Seguem as consultas para vocês replicarem."

## 6. Dados e analistas

Quem cruza bases, monta relatório e responde por indicador.
- **Entra:** consulta pronta para copiar, resultado esperado, fonte e momento do dado (produção ou cópia analítica,
  qual dia), o que cada filtro faz, armadilhas da fonte (versões repetidas, atraso da carga).
- **Não entra:** caminho do repositório, dado pessoal, consulta que não foi executada.
- **Tom:** técnico de dados. **Formato:** consulta em bloco de código + resultado + explicação por filtro.
- **Exemplo:** "A cópia analítica guarda uma linha por versão do mesmo registro. Use o `QUALIFY` abaixo para ficar
  com a mais recente: saem 35.000 linhas, 1 por cliente."

## 7. Gestão de entrega

Engineering manager, coordenação, Tech Lead no papel de gestão.
- **Entra:** situação em uma frase, risco, gargalo, o que precisa deles (alocação, desbloqueio, decisão),
  capacidade e esforço quando vierem do time.
- **Não entra:** detalhe técnico que não muda a decisão deles, estimativa feita sem o time.
- **Tom:** gestor. **Formato:** situação + risco + pedido.
- **Exemplo:** "Projeto de cadastro: tela 01 aprovada, 3 dúvidas de regra abertas com o PO. Risco: sem resposta até quinta,
  a US-05 para. Precisamos de ajuda para priorizar com o PO."

## 8. Liderança executiva

CTO, diretoria, quem decide investimento e direção.
- **Entra:** a decisão pedida, o impacto no negócio, custo e risco em ordem de grandeza, as alternativas com o
  trade-off (custo × tempo × qualidade × escala), o que acontece se nada for feito.
- **Não entra:** detalhe técnico, histórico do problema, lista de tarefas.
- **Tom:** estratégico. **Formato:** resumo executivo de até 5 linhas + anexo para quem quiser o detalhe.
- **Exemplo:** "Pedimos decisão sobre manter a cópia analítica diária ou passar a horária: a diária atrasa relatórios
  em 1 dia; a horária custa ~3x de processamento. Sem decisão, seguimos com a diária."

## 9. Comitê de mudança

Quem aprova mudança em produção.
- **Entra:** o formato fixo do comitê (contexto, problema, mudança, itens, PRs, responsáveis), a ordem de
  implantação, o plano de volta, o impacto por ambiente, a janela.
- **Não entra:** discussão técnica aberta, pendência de escopo, texto livre fora do formato.
- **Tom:** formal e completo. **Formato:** o modelo registrado no perfil da empresa.
- **Exemplo:** "Contexto / Problema / Mudança implementada / Itens / PRs / Responsáveis / Ordem de implantação /
  Volta: reverter a versão N para N-1."

## 10. Outro time interno

Infra, plataforma, arquitetura corporativa, observabilidade, outra equipe de produto.
- **Entra:** o pedido na primeira linha, o contexto mínimo para atender sem reunião, o ambiente, a evidência
  (erro, horário, recurso), a urgência real e o porquê.
- **Não entra:** estratégia e prazo internos da equipe, conversa de outro canal, cobrança de pessoa.
- **Tom:** cordial e objetivo. **Formato:** pedido + contexto + evidência.
- **Exemplo:** "Pedido: escalar o consumer de reservas para 2 pods em produção. Hoje está com 1 (captura anexa) e
  a fila acumula 40 mil mensagens no pico das 20h."

## 11. Parceiro ou fornecedor externo

Empresa parceira, fornecedor, cliente corporativo.
- **Entra:** só o que é deles: o arquivo, a chamada, o contrato, a evidência do lado deles (horário, identificador
  técnico), o pedido claro, o prazo contratual quando existir.
- **Não entra:** nada interno (sistema, pessoas, problemas de outra área, estratégia), dado de cliente fora do
  canal acordado em contrato, opinião sobre o sistema deles.
- **Tom:** formal e cordial. **Formato:** pedido + evidência + o que esperamos de volta.
- **Exemplo:** "O arquivo de elegíveis PJ de 19/10 tem 10.200 documentos; o resumo enviado por vocês indica
  10.500. Podem confirmar qual é o total correto?"

## 12. Segurança e compliance

Segurança da informação, privacidade, jurídico, auditoria.
- **Entra:** o que ficou exposto (tipo do dado ou da credencial, nunca o valor), desde quando, quem pode ter acesso,
  o que já foi contido, o que falta e quem é o dono.
- **Não entra:** o segredo, mesmo parcial; dado pessoal do caso; especulação apresentada como fato.
- **Tom:** factual. **Formato:** exposição + contenção + pendência com dono.
- **Exemplo:** "Uma chave de serviço da nuvem estava no repositório desde 03/2025. Removida do código em 21/10; a
  chave segue ativa e a troca não tem responsável definido."

## 13. Suporte e operação

Atendimento ao cliente, operação de negócio.
- **Entra:** o que o cliente está vendo, a orientação a dar, o contorno se houver, quando escalar e para quem, a
  previsão só quando confirmada.
- **Não entra:** causa técnica detalhada, nome de dev, previsão não confirmada.
- **Tom:** claro e prático. **Formato:** sintoma + resposta ao cliente + quando escalar.
- **Exemplo:** "Clientes PJ não veem a fase de outubro no site. Orientar que o resultado aparece até sexta; se o
  cliente tiver resgatado antes, escalar ao PO."
