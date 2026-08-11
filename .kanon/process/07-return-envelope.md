# 07 — Return Envelope (Selo III)

## Propósito
Especificar o schema JSON obrigatório que todo subagente executado em *fan-out* (paralelo) devolve ao orquestrador, permitindo o roteamento de volta seguro dos resultados.

## Quando se aplica
Sempre que um agente for executado como subagente dentro de um fan-out disparado conforme `04-handoff-protocol.md`.

## Regras
- Todo retorno de subagente é um objeto JSON com, no mínimo, os campos:
  - `status`: `success` | `failure` | `blocked`
  - `evidence[]`: lista de evidências/artefatos que sustentam o resultado
  - `summary`: resumo objetivo do que foi feito
  - `path_to_artifact`: caminho para o artefato produzido, quando houver
- O orquestrador não aceita retorno de subagente fora desse schema — um retorno malformado é tratado como falha do próprio subagente, não interpretado "na tentativa".
- `evidence[]` nunca vem vazio quando `status` é `success` — todo sucesso precisa de evidência concreta (ver `11-subagent-anti-hallucination.md`).

## Sinais de violação
- Subagente retornando texto livre em vez do JSON esperado.
- `status: success` sem nenhuma evidência associada em `evidence[]`.

## Procedimento em caso de falha
Se o subagente não conseguir preencher um campo obrigatório do envelope, ele retorna `status: failure` (ou `blocked`) com o campo `summary` explicando o motivo — nunca omite o campo ou entrega um envelope incompleto como se fosse válido.

## Exemplo concreto

**Errado** — retorno fora do schema:
```
"Terminei, deu tudo certo."
```

**Certo** — envelope completo e válido:
```json
{
  "status": "success",
  "evidence": ["tests/checkout_test.py::test_valid_cep passed"],
  "summary": "Implementado desconto por CEP com validação de formato.",
  "path_to_artifact": "src/checkout/discount.py"
}
```
