# 44 — Topic Enrichment

## Propósito
Levantar o que já se sabe sobre um assunto capturado e separar isso do que continua desconhecido, até que o assunto tenha informação suficiente para alimentar `39-generate-requirement-summary` — ou fique explícito que não tem.

## Fase / Posição no fluxo
Fase 0 — Inicialização e Contexto. Roda após `skills/43-meeting-intake` e antes de `skills/39-generate-requirement-summary`.

## Entradas
- Uma nota de assunto em `docs/assuntos/`, com `status: capturado` ou `em-levantamento`.
- Opcionalmente, acesso ao banco de homologação do projeto e ao Outline, quando a lacuna for respondível por consulta. Ambos exigem VPN; a ausência deles não impede a skill de rodar.

## Saídas
- A seção `## Dossiê` da nota preenchida, com duas listas separadas.
- A seção `## Lacunas abertas` atualizada, cada item com dono nomeado.
- `status` atualizado para `em-levantamento` ou `consolidado`.
- Fatos confirmados encaminhados a `skills/45-knowledge-promotion`.
- Quando uma lacuna for fechada por consulta, o achado entra no `## Dossiê` com a consulta executada e a citação da fonte.

## Regras principais
- Aciona `skills/36-knowledge-retrieval` sobre três corpora: `docs/knowledge/`, as transcrições em `docs/transcription/` e o código dos projetos (36 cobre `docs/knowledge/` sob o "corpus local" genérico de `process/12-knowledge-retrieval.md`, ainda que o `SKILL.md` de 36 não enumere o caminho).
- **O código não está na vault.** A pasta `projects/` é um registro de ponteiros: cada `.md` aponta para o clone local e para o repositório remoto do projeto. A skill resolve o projeto pelo registro `projects/README.md` antes de buscar, e nunca assume que `projects/<nome>/` contém código.
- Para consultar e validar implementação, usa o repositório remoto indicado no registro, via os MCPs de Azure DevOps ou o remoto de GitHub quando for o caso. Não exige clone atualizado e reflete o branch principal.
- Para localizar o código a ser alterado depois, usa o caminho local indicado no registro. **Levantamento nunca altera código** — quem altera são as skills de desenvolvimento que consomem o assunto adiante.
- O dossiê separa obrigatoriamente duas listas: **o que foi encontrado**, cada item com fonte e nível de confiança, e **lacunas que só um humano responde**, cada uma com dono nomeado.
- Uma pergunta feita em reunião não conta como respondida só porque alguém falou depois dela. A skill compara a pergunta com a resposta e, se a resposta cobrir apenas o caso geral, registra a lacuna como aberta.
- `status` só avança para `consolidado` quando não há lacuna bloqueante em aberto. `tools/validate_notes.py` recusa a combinação `consolidado` com item não marcado em `## Lacunas abertas`.
- Backfill em transcrição antiga é dirigido, nunca varredura: busca-se o que a lacuna apontou. Fato recuperado de reunião antiga o bastante para o sistema ter mudado desde então nasce com `confianca` rebaixada.
- Se a busca não retornar nada relevante, declara "não encontrado no corpus" — nunca preenche com suposição (`process/12-knowledge-retrieval.md`).
- **Consulta a banco passa por `tools/valida_consulta.py` antes de executar.** O guard só deixa passar um comando de leitura. Ele analisa o texto do SQL, não a permissão da conexão, e nada na ferramenta de execução obriga a chamá-lo — a regra vive aqui, e é por isso que ela está escrita.
- **O texto que roda no banco é o que `validar()` devolveu, não o original.** `validar()` devolve o SQL sem comentário; é esse texto — não o que foi digitado antes do guard — que vai para a ferramenta de execução.
- **A skill não escolhe sozinha o que perguntar ao banco.** A lacuna já diz o que precisa ser confirmado; a skill traduz lacuna em consulta e não sai pescando.
- **Só homologação.** Produção é somente leitura pelo SQLPad do usuário, no navegador. Quando a lacuna só tiver resposta lá, a skill emite a consulta e pede que o usuário a rode, registrando o resultado como resposta dele.
- **O ambiente entra no corpo do fato, não só na fonte.** "A tabela tem chave única" e "a tabela tem chave única no ambiente de homologação" são afirmações diferentes, e a consulta só alcança a segunda. Se a estrutura de homologação vale para produção é `suposto`.
- **Documentação do Outline sustenta `relatado`, nunca `confirmado`.** Ela diz o que alguém escreveu sobre o sistema, não o que o sistema faz — mesmo estatuto de uma transcrição, com a vantagem de citar revisão. Código lido é que sustenta `confirmado`.
- **Toda citação de Outline carrega a revisão**, montada por `tools/outline_consulta.py`. Sem revisão a citação não é fixável, e uma citação não fixável promete conferibilidade que não entrega.
- **Resultado de consulta não traz linha de dado pessoal para a nota.** O corpus é versionado: o que entrar fica no histórico para sempre. Registra-se o fato estrutural ou o agregado; se responder à lacuna exigiu olhar linha individual, a nota diz que olhou e o que concluiu, sem transcrever.
- **Consulta vazia é resposta, não ausência de resposta.** "Nenhuma linha" e "a restrição não existe" são conclusões diferentes, e passar de uma para a outra depende de a consulta ter sido a certa — o que é julgamento humano.
- **Toda virada de fase entra no `historico.md` do assunto, que só cresce.** O log é a autoridade sobre a fase; o `status` do front-matter é cache do log.
- **A máquina leva o assunto até `consolidado` e para ali.** `virou-us`, `virou-feature` e `descartado` só um humano dispara.
- **Lacuna bloqueante nova num assunto já consolidado gera alerta, não retrocesso.** Entra uma linha no log com origem e destino vazios, porque nada se moveu, e o alerta aparece no dossiê. O dashboard ainda não lê `historico.md` — ver DESIGN.md §6.2. Rebaixar a fase é decisão de quem lê.

## Depende de
- `skills/36-knowledge-retrieval`, `skills/43-meeting-intake`, `skills/45-knowledge-promotion`, `process/12-knowledge-retrieval.md`, `process/11-subagent-anti-hallucination.md`, registro de projetos em `projects/README.md`.
- `tools/valida_consulta.py`, `tools/outline_consulta.py`.

## Procedimento em caso de falha
Se a nota de assunto não existir ou não tiver front-matter válido, a skill reporta o erro do validador e não escreve. Se todas as lacunas dependerem de resposta humana indisponível no momento, o assunto permanece em `em-levantamento` com as lacunas nomeadas — nunca é promovido a `consolidado` para desbloquear o fluxo.

Se o banco ou o Outline estiverem inalcançáveis, a skill declara isso e a lacuna correspondente permanece aberta — inalcançável nunca vira "não encontrei, logo não existe". Se `tools/valida_consulta.py` recusar a consulta, ela não é executada e a skill reporta a recusa literal.
