# 45 — Knowledge Promotion

## Propósito
Promover fatos verificados para o corpus descritivo em `docs/knowledge/`, e marcar como superada a nota que deixou de valer. É o único caminho pelo qual um fato vira conhecimento consultável — nem `43-meeting-intake` nem `44-topic-enrichment` escrevem em `docs/knowledge/` diretamente.

## Fase / Posição no fluxo
Transversal. Roda em dois momentos distintos: (1) após `44-topic-enrichment`, quando o levantamento confirma um fato reutilizável; (2) após a entrega da US originada do assunto, quando a regra mudou e a nota anterior precisa ser superada. O segundo momento é o que impede o corpus de apodrecer.

## Entradas
- Um dossiê de assunto com fatos confirmados (`docs/assuntos/<id>/assunto.md`, seção `## Dossiê`), ou
- Respostas de uma rodada de esclarecimento (`skills/43-meeting-intake`, seção 5.1.1 do design), ou
- Uma US entregue cuja mudança invalida nota existente.

## Saídas
- Notas criadas ou atualizadas em `docs/knowledge/<tipo>/`, conforme `templates/CONHECIMENTO.template.md`.
- Quando houver supersessão: a nota anterior com `supersedido_por` preenchido, apontando para a nova.

## Regras principais
- Nunca promove fato sem `fontes`. Lista vazia ou ausente aborta a promoção (`process/11-subagent-anti-hallucination.md`, `process/12-knowledge-retrieval.md`).
- Fato originado apenas de transcrição, sem confirmação em código ou por pessoa, nasce com `confianca: relatado`. `confirmado` exige verificação no contrato autoritativo (o código-fonte real do sistema) ou confirmação explícita de alguém nomeado — evidência de mock, fixture ou stub de teste nunca sustenta `confirmado`, porque mostra o que o time espera do contrato, não o contrato.
- `confianca` gradua a afirmação mais forte da nota, não a mais bem sustentada. Nota que mistura afirmações com lastros diferentes se divide em duas notas, cada uma com o seu grau.
- Fato originado de rodada de esclarecimento nasce com o respondente citado em `fontes`, com data da sessão.
- Nunca apaga nota. Conhecimento que deixou de valer recebe `supersedido_por` e permanece — o histórico é o que permite auditar uma decisão antiga.
- Antes de criar nota nova, busca no corpus por nota equivalente (`skills/36-knowledge-retrieval`). Se existir, atualiza em vez de duplicar.
- Toda nota escrita passa por `tools/validate_notes.py` antes do encerramento da skill; erro de validação bloqueia a entrega.
- Para verificar um fato contra código, consulta o repositório remoto conforme o registro `projects/README.md` — nunca altera código.

## Depende de
- `templates/CONHECIMENTO.template.md`, `skills/36-knowledge-retrieval`, `process/11-subagent-anti-hallucination.md`, `process/12-knowledge-retrieval.md`, `process/06-markdown-formatting-rules.md`, registro de projetos em `projects/README.md`.

## Procedimento em caso de falha
Se um fato candidato não tiver fonte rastreável, a skill declara explicitamente "fato sem fonte — não promovido" e segue para o próximo, em vez de promover com fonte inventada ou genérica. Se `tools/validate_notes.py` acusar erro, a nota não é considerada entregue e a skill reporta o erro literal. Se não conseguir identificar com confiança qual nota existente é superada por uma mudança de regra, a skill declara a ambigüidade e pede esclarecimento. Se não conseguir determinar se uma nota equivalente já existe no corpus, a skill interrompe a promoção e pede confirmação.
