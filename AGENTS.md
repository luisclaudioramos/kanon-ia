# AI Agent Instructions — kanon

Este repositório guarda o núcleo do harness kanon: a especificação neutra em `.kanon/` e a integração com o
Claude Code em `.claude/`. O que cada pasta faz está no [README.md](README.md). As regras abaixo valem para
qualquer agente (Claude Code, Codex, opencode, Cursor, Antigravity) que trabalhe aqui.

## Convenções

- **Fonte de verdade:** este `AGENTS.md`, para saber como trabalhar e como responder. O `CLAUDE.md` é o wrapper do
  Claude Code e só aponta para cá.
- **Conteúdo produzido com o kanon** (features, US, incidentes, revisões) não fica aqui: vai para o repositório da
  empresa, pelos caminhos do perfil dela (`process/17-company-profile.md`).
- **`.kanon/` é neutro de ambiente:** nada de URL de produção, chave, caminho absoluto de usuário ou nome de
  ferramenta da empresa. O `core-agnostic-gate` recusa a gravação.
- **Sessões concorrentes:** outras sessões usam o mesmo checkout. Confira `git status` e `git branch --show-current`
  antes de commitar e não inclua arquivos que não são seus.
- **Commit e push só com pedido explícito.**

## Respostas no chat

Vale para toda resposta ao usuário no chat: análises, investigações, incidentes, revisões, status e respostas de
uma linha.

### Idioma

**Somente português do Brasil.** Vale para a resposta, as mensagens de progresso, as perguntas, os resumos e os
relatórios. Termos técnicos, comandos e nomes de código ficam no original (`participant_stage`, `git rebase`,
`COUNT(DISTINCT)`).

### Estrutura

1. **Conclusão primeiro, em 1–2 frases.** O resultado, e não o caminho até ele. Se a pergunta for de sim/não, a
   primeira palavra é "Sim" ou "Não".
2. **Depois, blocos de pergunta e resposta.** Cada bloco começa com a pergunta que o leitor faria, em negrito,
   seguida de `→` e da resposta curta:

   ```
   **Os números batem?** → Sim. O PROD tem 1.234.567 documentos, o mesmo total dos arquivos.
   ```

   - Uma ideia por bloco, do mais importante para o menos importante.
   - A pergunta é a dúvida real do leitor ("O que muda para a call?", "Está travado?"), não um título genérico
     ("Contexto", "Detalhes").
   - Se a resposta tiver partes, use 2–5 itens curtos dentro do bloco.
3. **Último bloco: o que depende do usuário.** Aprovação, decisão ou acesso que falta, como uma pergunta direta. Se
   nada depende dele, não crie esse bloco.

### O que vai no chat e o que vai no arquivo

| No chat | No arquivo gerado (com o caminho relativo no chat) |
|---|---|
| Conclusão, números-chave, decisão pendente | SQL, scripts e comandos completos |
| Tabela curta (até ~6 linhas), quando os números são a própria resposta | Tabelas longas, logs, `arquivo:linha`, saídas de ferramenta |
| Rascunho de mensagem para aprovação, no bloco "**Qual é o texto?**" | Passo a passo de reprodução e evidências |

### Regras de conteúdo

- **Fato × hipótese:** o que não foi conferido aparece como hipótese ("hipótese, não verificada"). Número sempre
  com a fonte e o momento (arquivo de 21/10, PROD em 22/10, BigQuery D-1).
- **Status honesto:** o que falhou, foi cortado ou ficou de fora aparece na resposta, com o motivo.
- **Sem narrar o processo:** não liste os passos que você executou nem repita o pedido. Conte só o que muda a
  leitura do resultado.
- **Termo novo, explicação curta:** se o leitor pode não conhecer o termo, explique numa frase na primeira vez.
- **Sem abertura que só anuncia nem fecho genérico**, e número no lugar do vago: os cortes de
  [`04-escrita-clara.md`](.kanon/reference/comunicacao/04-escrita-clara.md) valem também no chat.
- **Caminhos relativos:** nada de caminho absoluto da máquina (`/home/...`) no chat, em notas ou mensagens.
- **Mensagem de progresso:** uma frase, em português, dizendo o que está sendo feito agora.

### Exemplo

```
A consulta no PROD terminou e os elegíveis batem com os arquivos (1.234.567). A diferença
da análise vinha de ler só uma das duas tabelas.

**Por que a análise achou menos?** → Ela contou só a `participant_eligible` (sem cadastro).
Faltou somar a `participant_stage` (com cadastro) e tirar quem está nas duas.

**O status bate?** → Sim no realizado (PF 12.345, PJ 10). Os 55 PJ da análise eram o
BigQuery de D-1, ainda com o arquivo de 19/10.

**Onde está o detalhe?** → `reproducao/README.md`: tabelas, consultas e passo a passo.

**Posso criar o rascunho no canal?** → Texto acima; falta o seu ok no texto e no canal.
```

## Mensagens por público

Vale para todo texto que sai do repositório para alguém: Slack, e-mail, comentário em work item, canvas. As skills
46 e 47 (handoff), 48 (validação de telas) e 49 (impacto de mudança) já escrevem por público; esta seção vale também
para a mensagem avulsa. Canais, pessoas e regras locais de cada empresa ficam no perfil dela e no repositório de
conteúdo.

O catálogo completo está em [`.kanon/reference/comunicacao/`](.kanon/reference/comunicacao/README.md): regras gerais,
escrita clara (o achado em quatro partes e os testes de leitura), os 13 públicos (QA, UI/UX, liderança executiva, comitê de mudança, outro time interno, parceiro externo, segurança e
suporte, além dos cinco abaixo) e os tipos de mensagem. O papel
[`COMMUNICATOR`](.kanon/agents/AGENT-COMMUNICATOR.md) revisa o texto contra ele antes da aprovação, e o esqueleto é o
[`MENSAGEM.template.md`](.kanon/templates/MENSAGEM.template.md). O fluxo completo (ler o destino, conferir,
revisar, aprovar, rascunhar) é a skill [`52-audience-message`](.kanon/skills/52-audience-message/SKILL.md), pelo
comando `/kanon mensagem`. A tabela abaixo é o resumo dos públicos mais frequentes.

### Antes de escrever

1. **Leia o canal ou a thread desde o último envio** e incorpore o que chegou. Pergunta que já foi respondida sai.
2. **Identifique o público** pelo canal e pelo destinatário (o perfil da empresa diz quem é PO, negócio, time).
3. **Confira no sistema o que vai afirmar.** "Corrigimos" só depois de ver a correção aplicada; senão, "vamos corrigir".
4. **Rascunho só com aprovação do texto e do canal**, a cada envio. O texto é o final já na primeira chamada.

### O que cada público recebe

| Público | Sai da mensagem capaz de | Entra | Não entra |
|---|---|---|---|
| **Time técnico** (dev, QA, infra) | escolher a abordagem, estimar, reproduzir | `arquivo:linha`, commit, PR, SQL, log, hipótese marcada como hipótese | prazo e estratégia internos, assunto de outro canal |
| **PO** | decidir ou encaminhar cada pendência e priorizar | impacto concreto, as opções que já existem, uma pergunta por pendência; evidência técnica só quando ela é o argumento | detalhe de implementação, nome de quem investigou, prazo interno |
| **Negócio** | responder a pergunta que trava e saber o que muda para ele | causa em linguagem simples, o que foi feito e conferido, o próximo passo dele, uma pergunta curta por ponto ambíguo | jargão, nome de dev, opção ou cenário que ele não citou, recomendação no lugar da decisão dele, prazo e estratégia |
| **Dados e analistas** | reproduzir o número do lado deles | consulta pronta para copiar, resultado esperado, fonte e momento do dado, o que cada filtro faz | caminho do repositório, dado pessoal |
| **Gestão** | acompanhar e decidir | situação em uma frase, risco, o que precisa deles | detalhe técnico |

### Regras para todos os públicos

- **O pedido ou a conclusão na primeira linha.** Quem lê só a prévia já sabe do que se trata.
- **Nada de dado pessoal, segredo ou caminho interno** (repositório, máquina). Use o link que o leitor consegue abrir.
- **Fato separado de hipótese**, e número com a fonte e o momento.
- **Assuntos separados ficam separados:** a mensagem de um canal não cita o que foi tratado em outro.
- **Pergunta ao time vai para o time.** Marcar uma pessoa só quando o usuário pedir.
- **Prazo, divisão de entrega e estratégia** ficam no repositório de conteúdo, como uso interno.
- **Material grande** (casos de teste, evidências, telas) vai num documento compartilhável e a mensagem leva o link.
- **Pergunta ao negócio parte só do que ele disse.** "Hoje é assim?" se responde com o que o sistema faz hoje, e a
  decisão volta para ele.

### Exemplo: o mesmo fato para dois públicos

```
Negócio: "Os elegíveis de outubro batem com os arquivos do banco: 7,3 milhões. A diferença
da análise vinha de olhar só uma das duas tabelas onde eles ficam. Seguem as consultas
para vocês replicarem."

Time: "PROD = arquivos: participant_eligible (1.200.000) + participant_stage (40.000)
− 5.433 nas duas = 1.234.567. Consultas em sql/03; a cópia da eligible_challenge no BQ
está incompleta (hipótese: carga incremental), conferir."
```
