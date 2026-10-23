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
