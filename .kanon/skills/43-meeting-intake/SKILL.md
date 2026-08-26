# 43 — Meeting Intake

## Propósito
Varrer as transcrições de um dia e produzir três coisas: os assuntos capturados em `docs/assuntos/`, um extrato do dia, e uma rodada de esclarecimento que interroga o usuário sobre o que a skill não entendeu. É o estágio que faltava antes de `39-generate-requirement-summary`, que hoje se recusa a formalizar ideação incompleta.

## Fase / Posição no fluxo
Fase 0 — Inicialização e Contexto, antes de `skills/39-generate-requirement-summary`. Alimenta `skills/44-topic-enrichment` (assuntos) e `skills/45-knowledge-promotion` (respostas da rodada de esclarecimento).

## Entradas
- Uma pasta de dia em `docs/transcription/`, nomeada `dd-mm-yyyy`, contendo uma ou mais transcrições de reunião em `.md`.
- Opcionalmente, `resumo-pessoal.md` na mesma pasta: as anotações do próprio usuário sobre o dia.

## Saídas
- Notas de assunto em `docs/assuntos/`, com `status: capturado` e apenas o esqueleto preenchido (`templates/ASSUNTO.template.md`).
- Um extrato do dia: decisões, fatos ditos e participantes.
- Uma rodada de esclarecimento apresentada ao usuário (ver Regras principais).
- `docs/assuntos/README.md` regenerado.

## Regras principais
- Opera sobre a pasta de um dia inteiro, nunca sobre um arquivo isolado — o mesmo assunto costuma aparecer em mais de uma reunião do mesmo dia.
- Lê `resumo-pessoal.md` primeiro, quando existir, e o trata como fonte de maior precedência que a transcrição em caso de conflito.
- Não escreve nota de conhecimento a partir de transcrição. Captura o que foi dito, com timestamp; a promoção é de `skills/45-knowledge-promotion`.
- Deduplica contra os assuntos existentes antes de criar. Um assunto levantado em três reuniões é um assunto com três entradas em `origem`, não três notas. Na dúvida sobre fundir, pergunta em vez de fundir.
- A data de uma transcrição vem do nome da pasta e do cabeçalho do documento, **nunca** do `eid` do link de convite — em evento recorrente o `eid` aponta para uma ocorrência da série, não para a data da gravação. Divergência entre pasta e cabeçalho vira pergunta na rodada de esclarecimento, não correção automática.
- Reuniões distintas no mesmo dia são identificadas pelo id do documento de transcrição, não pelo nome do arquivo.
- **Rodada de esclarecimento (obrigatória).** Após a varredura, apresenta ao usuário três listas, cada item citando arquivo e timestamp: (1) o que a skill entendeu, para confirmação ou correção; (2) o que não entendeu — trecho ambíguo, sigla, termo, sistema ou pessoa ausente do corpus; (3) o que parece aberto ou contraditório — pergunta feita na reunião sem resposta, falas que se contradizem, decisão sem dono.
- A rodada tem no máximo 7 perguntas, ordenadas por bloqueio: o que trava um assunto vem antes do que é curiosidade. Rodada longa não é respondida.
- Nunca preenche uma resposta que o usuário não deu. Pergunta não respondida vira lacuna com dono nomeado na nota de assunto correspondente.
- As respostas do usuário são encaminhadas a `skills/45-knowledge-promotion` com o respondente e a data da sessão como fonte.
- **Conteúdo sensível.** De uma reunião 1:1, extrai apenas itens de trabalho. Conteúdo pessoal, de saúde e de gestão de pessoas nunca vira nota de assunto nem de conhecimento — e a skill declara explicitamente que ignorou conteúdo dessa natureza, em vez de omitir em silêncio.
- Toda nota escrita passa por `tools/validate_notes.py` antes do encerramento da skill.

## Depende de
- `templates/ASSUNTO.template.md`, `skills/45-knowledge-promotion`, `process/06-markdown-formatting-rules.md`, `process/11-subagent-anti-hallucination.md`.

## Procedimento em caso de falha
Se a pasta do dia não contiver nenhuma transcrição `.md`, a skill declara isso e encerra — não cria nota vazia. Se nenhuma transcrição contiver item acionável, declara "nenhum assunto capturado" e ainda assim executa a rodada de esclarecimento, que é útil mesmo sem assunto novo. Se `tools/validate_notes.py` acusar erro, a nota não é considerada entregue e a skill reporta o erro literal.
