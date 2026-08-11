# 12 — Knowledge Retrieval (Selo IV)

## Propósito
Definir o mecanismo obrigatório de busca (BM25 sobre o corpus local) e a regra de ouro — recuperar e citar `path:line` antes de afirmar — para embasar qualquer decisão em conhecimento real do repositório.

## Quando se aplica
Sempre que uma decisão ou afirmação precisar se apoiar em conhecimento existente no repositório (regra, código, documentação).

## Regras
- Antes de afirmar algo sobre o estado do repositório, o agente executa uma busca (BM25 sobre o corpus local) e recupera o trecho relevante.
- Toda afirmação embasada em conhecimento recuperado cita o `path:line` exato de onde veio — nunca uma afirmação genérica sem origem rastreável.
- Se a busca não retornar nenhum resultado relevante, isso é reportado explicitamente como "não encontrado no corpus" — não é preenchido com suposição (ver `11-subagent-anti-hallucination.md`).

## Sinais de violação
- Uma afirmação sobre uma regra do projeto sem `path:line` citado.
- Uma citação de `path:line` que não corresponde ao conteúdo real naquele ponto.

## Procedimento em caso de falha
Se o mecanismo de busca estiver indisponível ou não encontrar nada relevante, o agente declara essa limitação explicitamente e trata a afirmação como não verificada, em vez de citar uma fonte inventada.

## Exemplo concreto

**Errado** — afirmação sem origem rastreável:
```
"O projeto já valida CPF em algum lugar."
```

**Certo** — recuperação e citação de path:line:
```
Busca no corpus local (BM25) por "validação CPF" → resultado em src/validators/cpf.py:12.
"Validação de CPF confirmada em src/validators/cpf.py:12."
```
