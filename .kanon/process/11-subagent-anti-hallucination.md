# 11 — Subagent Anti-Hallucination (Selo IV)

## Propósito
Impor restrições rigorosas para que subagentes não inventem funções, bibliotecas ou caminhos de arquivo — toda ação é baseada em artefatos existentes ou em recuperação confirmada (ver `12-knowledge-retrieval.md`).

## Quando se aplica
Sempre que um subagente referencia uma função, biblioteca, caminho de arquivo ou API.

## Regras
- Um subagente só referencia uma função/biblioteca/caminho que confirmou existir via leitura real ou recuperação (RAG) — nunca por suposição de que "provavelmente existe".
- Toda referência a `path_to_artifact` no envelope de retorno (`07-return-envelope.md`) aponta para um caminho real e verificado, nunca inferido.
- Se o subagente precisar de uma função/biblioteca que ainda não existe, ele declara isso explicitamente como uma necessidade nova — não como algo já disponível.

## Sinais de violação
- Um subagente citando uma função que não existe no código real.
- Um `path_to_artifact` no envelope de retorno que não corresponde a nada no repositório.

## Procedimento em caso de falha
Se o subagente não conseguir confirmar a existência de algo que pretendia referenciar, ele retorna `status: failure` (ou `blocked`) no envelope, explicando o que não pôde ser confirmado — nunca prossegue como se tivesse confirmado.

## Exemplo concreto

**Errado** — função inventada, apresentada como existente:
```
"Usei a função formatCurrency() já existente no projeto."
(a função não existe em lugar nenhum do repositório)
```

**Certo** — necessidade nova declarada explicitamente:
```json
{
  "status": "success",
  "evidence": ["src/utils/currency.py criado nesta execução"],
  "summary": "Não encontrei função de formatação de moeda existente; criei formatCurrency() em src/utils/currency.py.",
  "path_to_artifact": "src/utils/currency.py"
}
```
