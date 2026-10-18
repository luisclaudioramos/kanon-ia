# 32 — Report Bug (Fluxo Paralelo)

## Propósito
Disparar a criação estruturada de um Bug (`BUG.md`), com Repro Steps, System Info e Knowledge Base, acionando o fluxo de correção paralelo sem interromper o fluxo principal da Feature.

## Fase / Posição no fluxo
Fase 6 — Memória, Custo e Encerramento (classificada aqui, mas pode ser disparada a qualquer momento). Alimenta [`27-bug-task-management`](../27-bug-task-management/SKILL.md) e [`25-test-case-authoring`](../25-test-case-authoring/SKILL.md).

## Entradas
- Relato do problema: passos de reprodução, informação do sistema/ambiente.

## Saídas
- `BUG.md` estruturado.

## Regras principais
- Um bug só é aceito como `BUG.md` válido se tiver Repro Steps reprodutíveis (base: `reference/boas-praticas-dev/11-debugging.md` — reproduzir antes de corrigir).
- Não interrompe o fluxo principal de nenhuma Feature em andamento — corre em paralelo.
- **Acionamento automático, não só sob relato do usuário**: qualquer defeito ou divergência encontrada durante a execução de qualquer skill (ex.: uma inconsistência achada em `12-development-execution`, um RNF indeterminado em `11-quality-gate`) aciona esta skill automaticamente, gerando `BUG.md` vinculado à Feature de origem. Corrigir o defeito silenciosamente por dentro da Feature, sem `BUG.md`, deixa de ser um caminho válido — mesmo quando a correção é pequena e imediata (base: transparência, `reference/boas-praticas-dev/01-principios-gerais.md`).

## Triagem: é bug de verdade?
Antes de criar o `BUG.md`, o relato passa por seis perguntas, na ordem. Cada resposta vai para a seção **Triagem** do `BUG.md` com a evidência (trecho da regra, passos, `arquivo:linha`, consulta e resultado), nunca com "parece". Um relato só vira Bug com as perguntas 1 a 3 respondidas e a 4 e a 5 descartando outra causa.

1. **O que deveria acontecer, e onde está escrito?** Critério de aceite da US, regra de negócio da Feature, contrato da API ou comportamento documentado, com o link. Sem regra escrita, não é Bug: é divergência de expectativa, e quem decide é o PO. Regra decidida em conversa (mensagem, ata, comentário) conta como escrita quando tem autor com autoridade sobre a regra (PO ou negócio, conforme o perfil), data e link. Se ela contradiz a US ou a Feature, registre a divergência e peça ao PO que atualize o artefato: a triagem segue com a regra mais recente, e o Bug cita as duas.
2. **Reproduz?** Mesmos passos, usuário, dado e ambiente, com o resultado obtido e o esperado. Não reproduziu: procurar a ocorrência nos logs (capacidade `observabilidade` do perfil) pelo horário e pelo identificador antes de descartar, porque concorrência, fila e cache produzem falha intermitente. Quando reproduzir no ambiente exige mudar estado (subir arquivo, reativar job), ou o ambiente está parado, vale a **reprodução local**: o código da versão implantada, rodado contra a DDL real do ambiente (`SHOW CREATE TABLE`, com chaves e índices), num banco descartável. A DDL dos scripts do repositório não basta, porque chave única criada direto no banco muda o comportamento de um upsert.
3. **O código faz isso?** A linha que produz o comportamento, com `arquivo:linha` ([`process/12-knowledge-retrieval.md`](../../process/12-knowledge-retrieval.md)). Código que cumpre a regra escolhida pelo time não é defeito, mesmo que o resultado surpreenda.
4. **O dado confirma?** Consulta no banco do ambiente afetado, de preferência homologação; produção só com pedido explícito e somente leitura. A tela pode divergir do banco por cache, versão antiga do front ou processamento assíncrono que ainda não rodou.
5. **É defeito ou ambiente e configuração?** Versão implantada, configuração do sistema, serviço fora do ar, escala e fila parada. Problema real, mas a correção é operacional, não de código.
6. **É regressão?** Se já funcionou, qual mudança (PR, versão, mudança em produção) alterou o comportamento: isso define quem corrige e a urgência.

### Como levantar cada evidência
Cada pergunta tem uma fonte no perfil da empresa (capacidades de [`process/17-company-profile.md`](../../process/17-company-profile.md)). O adaptador de cada capacidade diz como consultar, por mais de um caminho, e quais restrições de acesso valem.

| # | Capacidade | O que medir | Evidência registrada | Sem acesso |
|---|---|---|---|---|
| 1 | pasta da Feature, `trabalho`, `documentacao`; contrato da API em `repositorio` | o critério de aceite, a regra ou o contrato que vale para o caso, na versão vigente | trecho literal, link e data | perguntar ao PO qual é a regra; a resposta vira a evidência, com autor e data |
| 2 | ambiente de homologação (API, tela por `design`), `observabilidade`; reprodução local com `repositorio` e a DDL de `dados` | os passos executados em homologação; em produção, a ocorrência nos logs pelo horário e pelo identificador; fora do ambiente, o código implantado contra a DDL real | passos, requisição e resposta sem dado pessoal, a consulta de log com o filtro e o total, ou o script local com a versão do código, a versão do banco e o antes e depois | pedir ao relator horário, identificador e print; ou escrever a consulta de log para uma pessoa rodar |
| 3 | `repositorio` (cópia local atualizada) | a linha que produz o comportamento, **na versão implantada** (pergunta 5), não só na branch principal | `arquivo:linha` e o commit lido | pedir a cópia ou o acesso; sem código, a pergunta fica "não medido" |
| 4 | `dados` | consulta só de leitura no ambiente afetado | a consulta e o resultado agregado, sem dado pessoal | escrever a consulta para uma pessoa rodar e registrar o resultado com autor e data |
| 5 | `implantacao`, `mudanca`, `observabilidade`; configuração em `dados` | versão implantada × versão do código lido; mudanças recentes; instâncias, escala e filas; a configuração usada pelo caso | versão ou commit implantado, id da mudança, métrica com horário | idem |
| 6 | histórico em `repositorio`, `implantacao`, `mudanca` | o que mudou entre a última versão boa e a atual | PR, commit ou mudança em produção | "não sei" é resposta válida |

- **Antes de investigar, testar o acesso** só às capacidades que o caso usa, pelo teste de conexão do adaptador, e listar as restrições encontradas (rede privada, credencial, login interativo). Acesso que falta segue [`process/13-external-integration-prerequisite.md`](../../process/13-external-integration-prerequisite.md): registra a exceção e usa o caminho alternativo, nunca "pulado".
- **Ordem das fontes**: a que não depende de pessoa (API com a credencial da configuração) → a ferramenta com a sessão de uma pessoa (navegador logado) → uma pessoa roda a consulta escrita pela skill e devolve o resultado.
- **Produção é só leitura e só com pedido explícito** de quem usa o kanon, para aquela investigação; a única escrita é a reprodução de último recurso, pela ordem abaixo. Quando o perfil registra que produção é operada por uma pessoa, a skill escreve a consulta e pede que ela rode (como em `skills/44-topic-enrichment`).
- **Investigar não muda estado**: não reinicia serviço, não dispara implantação nem reprocessamento, não altera dado, e não desliga acesso (rede, sessão) que outra pessoa ou sessão está usando.
- **Ordem da reprodução**: primeiro a local (código implantado contra a DDL real, num banco descartável), que não muda nenhum ambiente; depois a homologação, pela exceção abaixo; e só se nenhuma das duas der resultado (não reproduz, ou o ambiente não permite), a produção, com aprovação explícita de quem usa o kanon para aquele caso, registrada com autor e data, e as mesmas condições da exceção (aviso, dado de teste, antes e depois, devolução). Sem a aprovação, a reprodução fica "não medido" com o pedido em aberto. O roteiro de reprodução registra as três, nessa ordem, com o resultado de cada uma.
- **Exceção: reprodução que muda estado**, como subir um arquivo ou criar um registro para ver o sistema reagir. Em homologação, e em produção só pela ordem acima, e sempre com pedido explícito de quem usa o kanon para aquele caso. Antes, avise quem usa o ambiente: o time pode estar testando outra coisa. Use dado de teste (participante, cliente ou registro criado para o teste, sem dado pessoal real). Registre o estado antes de cada passo e confira depois. No fim, devolva o dado ao estado de antes e registre a devolução. Reativar job, escalar serviço ou mudar configuração para viabilizar o teste é decisão de quem opera o ambiente, não desta skill.
- **Dado pessoal fica fora da evidência**: contagens, identificadores internos e valores mascarados.
- Pergunta sem evidência fica "não medido: _motivo_ · pedido a _quem_ em _data_". A triagem com pergunta 1 a 5 não medida termina como **inconclusivo**, com os pedidos em aberto, e não gera `BUG.md`. A exceção é o **Bug latente** (em Resultado), só para item já registrado.
- **Triagem replicável**: o resultado vem acompanhado de como refazê-lo. Para cada pergunta, registre a ferramenta, a conexão (pelo nome do valor do perfil, nunca a credencial) e o comando ou a consulta exata, como foi rodada, inclusive a versão em partes, quando a inteira não coube. Junte os scripts (consulta, schema mínimo, script de reprodução local) e o roteiro de reprodução: local, quando houver, e no ambiente, com os passos, o esperado com o defeito e o que depende de pedido. Tudo fica ao lado do resultado, na pasta da Feature (`BUG.md` ou triagem e uma pasta com os scripts), e nunca só na área temporária da sessão. Sem dado pessoal: participante fictício e resultados agregados.
- **Quem investiga**: o agente da camada do sistema (`agents/AGENT-BACKEND-ENGINEER.md`, `agents/AGENT-FRONTEND-ENGINEER.md`, `agents/AGENT-DATA-ENGINEER.md`), com `agents/AGENT-QA-ENGINEER.md` na reprodução e `agents/AGENT-SRE.md` na pergunta 5.

### Resultado
| Resultado da triagem | O que é | Destino |
|---|---|---|
| Regra escrita, reproduz e causa no código | Bug | `BUG.md` desta skill, com a triagem preenchida |
| O sistema cumpre a regra, mas alguém esperava outra coisa | Pedido de mudança | o PO decide; [`49-change-impact`](../49-change-impact/SKILL.md) quando afeta telas ou decisão registrada |
| Causa em configuração, dado ou infraestrutura | Incidente ou ajuste operacional | correção registrada com o passo executado e a conferência depois dele, sem `BUG.md` de código |
| Regra escrita, reproduz com o código implantado e causa no código, mas o dado não prova nem descarta ocorrência; item já registrado | Bug latente | `BUG.md` com **Classificação** Bug latente e **Item de origem**; a pergunta 4 começa com "latente:" |
| Não reproduz e não há rastro nos logs | Inconclusivo | pedir ao relator horário, usuário, identificador e print; não cria `BUG.md` |
| Defeito visível ao usuário em tela | Bug visual | um Bug por padrão divergente, com a lista de ocorrências ([`process/16-design-foundations.md`](../../process/16-design-foundations.md)) |

- **Bug latente**: só para item já registrado na ferramenta de trabalho (`trabalho`), com análise feita por alguém do time, quando a triagem confirma o defeito no código e o reproduz com a versão implantada e a DDL real (local ou homologação), mas o banco não guarda o histórico que provaria ou descartaria a ocorrência. A pergunta 4 registra o que foi medido e por que não prova; as perguntas 1, 2, 3 e 5 seguem obrigatórias. A validação inclui a conferência no ambiente (homologação, pela exceção de reprodução que muda estado) e, quando possível, a medição do impacto.
- **Item novo** (sem registro na ferramenta de trabalho, encontrado na revisão de código, na conversa ou nesta triagem): a pergunta 4 precisa confirmar no dado. Sem isso o resultado é inconclusivo, e não gera `BUG.md`; o defeito vai como achado com a evidência para quem decide abrir o item.
- **Nada de "é bug" ou "corrigido" pelo relato.** A afirmação vem depois da pergunta 4; "corrigido" só depois de conferir no dado, no mesmo ambiente.
- **Um Bug por causa, não por ocorrência.** Dez ocorrências da mesma causa são um Bug com a lista das dez.
- **Trava**: `bug-triage-gate` recusa gravar um `BUG.md` (ou `BUG-NN-*.md`) novo sem a seção Triagem, com as perguntas 1 a 5 sem resposta ou "não medido", ou com a pergunta 4 "latente" sem o **Item de origem**; a 6 é opcional. Bug antigo, sem a seção, não é cobrado ao ser editado.
- Quem encontra defeitos aponta para esta triagem: `12-development-execution`, `13-code-review`, `14-qa-validation`, `43-meeting-intake`, `AGENT-QA-ENGINEER` e `AGENT-CODE-REVIEWER`.
- O acionamento automático da regra acima passa pela mesma triagem: a skill que achou o defeito entrega o que já mediu, e esta skill completa o que falta.

## Depende de
- `reference/boas-praticas-dev/11-debugging.md`, `27-bug-task-management`, `49-change-impact`, `process/13-external-integration-prerequisite.md`, `process/17-company-profile.md`, `process/12-knowledge-retrieval.md`, `process/16-design-foundations.md`.

## Procedimento em caso de falha
Se os Repro Steps estiverem incompletos ou não reprodutíveis, a skill pede mais informação antes de criar o artefato — não cria um `BUG.md` que ninguém consegue reproduzir depois. Triagem que termina em pedido de mudança, ajuste operacional ou inconclusivo é reportada com o resultado e a evidência, e não gera `BUG.md`.
