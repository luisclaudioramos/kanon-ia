# kanon

Núcleo do harness kanon: especificação em `.kanon/` e integração com o Claude Code em `.claude/` (ver o
[README.md](README.md)).

**Como trabalhar e como responder: leia o [AGENTS.md](AGENTS.md).** Ele é a fonte de verdade e este arquivo não
repete as regras. Em especial, a seção "Respostas no chat" define o padrão de toda resposta:

- **somente em português do Brasil** (termos técnicos e nomes de código no original);
- conclusão em 1–2 frases, depois blocos "**Pergunta?** → resposta curta";
- SQL, `arquivo:linha`, logs e tabelas longas no arquivo gerado, com o caminho relativo no chat.

## Claude Code

- Comando de entrada: `/kanon` (`.claude/commands/kanon.md`).
- Gates em `.claude/hooks/`, ligados no `.claude/settings.json`; testes com `node --test ".claude/hooks/test/*.test.js"`.
