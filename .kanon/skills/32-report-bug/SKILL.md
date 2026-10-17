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

1. **O que deveria acontecer, e onde está escrito?** Critério de aceite da US, regra de negócio da Feature, contrato da API ou comportamento documentado, com o link. Sem regra escrita, não é Bug: é divergência de expectativa, e quem decide é o PO.
2. **Reproduz?** Mesmos passos, usuário, dado e ambiente, com o resultado obtido e o esperado. Não reproduziu: procurar a ocorrência nos logs (capacidade `observabilidade` do perfil) pelo horário e pelo identificador antes de descartar, porque concorrência, fila e cache produzem falha intermitente.
3. **O código faz isso?** A linha que produz o comportamento, com `arquivo:linha` ([`process/12-knowledge-retrieval.md`](../../process/12-knowledge-retrieval.md)). Código que cumpre a regra escolhida pelo time não é defeito, mesmo que o resultado surpreenda.
4. **O dado confirma?** Consulta no banco do ambiente afetado, de preferência homologação; produção só com pedido explícito e somente leitura. A tela pode divergir do banco por cache, versão antiga do front ou processamento assíncrono que ainda não rodou.
5. **É defeito ou ambiente e configuração?** Versão implantada, configuração do sistema, serviço fora do ar, escala e fila parada. Problema real, mas a correção é operacional, não de código.
6. **É regressão?** Se já funcionou, qual mudança (PR, versão, mudança em produção) alterou o comportamento: isso define quem corrige e a urgência.

| Resultado da triagem | O que é | Destino |
|---|---|---|
| Regra escrita, reproduz e causa no código | Bug | `BUG.md` desta skill, com a triagem preenchida |
| O sistema cumpre a regra, mas alguém esperava outra coisa | Pedido de mudança | o PO decide; [`49-change-impact`](../49-change-impact/SKILL.md) quando afeta telas ou decisão registrada |
| Causa em configuração, dado ou infraestrutura | Incidente ou ajuste operacional | correção registrada com o passo executado e a conferência depois dele, sem `BUG.md` de código |
| Não reproduz e não há rastro nos logs | Inconclusivo | pedir ao relator horário, usuário, identificador e print; não cria `BUG.md` |
| Defeito visível ao usuário em tela | Bug visual | um Bug por padrão divergente, com a lista de ocorrências ([`process/16-design-foundations.md`](../../process/16-design-foundations.md)) |

- **Nada de "é bug" ou "corrigido" pelo relato.** A afirmação vem depois da pergunta 4; "corrigido" só depois de conferir no dado, no mesmo ambiente.
- **Um Bug por causa, não por ocorrência.** Dez ocorrências da mesma causa são um Bug com a lista das dez.
- **Trava**: `bug-triage-gate` recusa gravar um `BUG.md` (ou `BUG-NN-*.md`) novo sem a seção Triagem ou com as perguntas 1 a 5 sem resposta; a 6 é opcional. Bug antigo, sem a seção, não é cobrado ao ser editado.
- Quem encontra defeitos aponta para esta triagem: `12-development-execution`, `13-code-review`, `14-qa-validation`, `43-meeting-intake`, `AGENT-QA-ENGINEER` e `AGENT-CODE-REVIEWER`.
- O acionamento automático da regra acima passa pela mesma triagem: a skill que achou o defeito entrega o que já mediu, e esta skill completa o que falta.

## Depende de
- `reference/boas-praticas-dev/11-debugging.md`, `27-bug-task-management`, `49-change-impact`, `process/12-knowledge-retrieval.md`, `process/16-design-foundations.md`.

## Procedimento em caso de falha
Se os Repro Steps estiverem incompletos ou não reprodutíveis, a skill pede mais informação antes de criar o artefato — não cria um `BUG.md` que ninguém consegue reproduzir depois. Triagem que termina em pedido de mudança, ajuste operacional ou inconclusivo é reportada com o resultado e a evidência, e não gera `BUG.md`.
