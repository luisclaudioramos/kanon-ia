# 44 — Topic Enrichment

## Propósito
Levantar o que já se sabe sobre um assunto capturado e separar isso do que continua desconhecido, até que o assunto tenha informação suficiente para alimentar `39-generate-requirement-summary` — ou fique explícito que não tem.

## Fase / Posição no fluxo
Fase 0 — Inicialização e Contexto. Roda após `skills/43-meeting-intake` e antes de `skills/39-generate-requirement-summary`.

## Entradas
- Uma nota de assunto em `docs/assuntos/`, com `status: capturado` ou `em-levantamento`.

## Saídas
- A seção `## Dossiê` da nota preenchida, com duas listas separadas.
- A seção `## Lacunas abertas` atualizada, cada item com dono nomeado.
- `status` atualizado para `em-levantamento` ou `pronto-para-39`.
- Fatos confirmados encaminhados a `skills/45-knowledge-promotion`.

## Regras principais
- Aciona `skills/36-knowledge-retrieval` sobre três corpora: `docs/knowledge/`, as transcrições em `docs/transcription/` e o código dos projetos.
- **O código não está na vault.** A pasta `projects/` é um registro de ponteiros: cada `.md` aponta para o clone local e para o repositório remoto do projeto. A skill resolve o projeto pelo registro `projects/README.md` antes de buscar, e nunca assume que `projects/<nome>/` contém código.
- Para consultar e validar implementação, usa o repositório remoto indicado no registro, via os MCPs de Azure DevOps ou o remoto de GitHub quando for o caso. Não exige clone atualizado e reflete o branch principal.
- Para localizar o código a ser alterado depois, usa o caminho local indicado no registro. **Levantamento nunca altera código** — quem altera são as skills de desenvolvimento que consomem o assunto adiante.
- O dossiê separa obrigatoriamente duas listas: **o que foi encontrado**, cada item com fonte e nível de confiança, e **lacunas que só um humano responde**, cada uma com dono nomeado.
- Uma pergunta feita em reunião não conta como respondida só porque alguém falou depois dela. A skill compara a pergunta com a resposta e, se a resposta cobrir apenas o caso geral, registra a lacuna como aberta.
- `status` só avança para `pronto-para-39` quando não há lacuna bloqueante em aberto. `tools/validate_notes.py` recusa a combinação `pronto-para-39` com item não marcado em `## Lacunas abertas`.
- Backfill em transcrição antiga é dirigido, nunca varredura: busca-se o que a lacuna apontou. Fato recuperado de reunião antiga o bastante para o sistema ter mudado desde então nasce com `confianca` rebaixada.
- Se a busca não retornar nada relevante, declara "não encontrado no corpus" — nunca preenche com suposição (`process/12-knowledge-retrieval.md`).

## Depende de
- `skills/36-knowledge-retrieval`, `skills/43-meeting-intake`, `skills/45-knowledge-promotion`, `process/12-knowledge-retrieval.md`, `process/11-subagent-anti-hallucination.md`, registro de projetos em `projects/README.md`.

## Procedimento em caso de falha
Se a nota de assunto não existir ou não tiver front-matter válido, a skill reporta o erro do validador e não escreve. Se todas as lacunas dependerem de resposta humana indisponível no momento, o assunto permanece em `em-levantamento` com as lacunas nomeadas — nunca é promovido a `pronto-para-39` para desbloquear o fluxo.
