# 15 — Memory Update

## Propósito
Compilar todas as lições aprendidas, decisões arquiteturais, bugs críticos e padrões novos descobertos durante a Feature, e adicioná-los ao `MEMORY.md` correto — servindo como base de RAG para trabalho futuro.

## Fase / Posição no fluxo
Fase 6 — Memória, Custo e Encerramento. Roda ao final do ciclo de vida de uma Feature, antes de [`40-show-feature-memory`](../40-show-feature-memory/SKILL.md). Também roda sob demanda, fora do encerramento, sempre que uma lição de valor real surge no meio do trabalho (não só no fechamento).

## Entradas
- Histórico da Feature: decisões, bugs, padrões descobertos ao longo de todas as fases.

## Saídas
- `features/<feature>/MEMORY.md` e/ou [`MEMORY.md` do núcleo](../../MEMORY.md) atualizados, conforme o critério de roteamento abaixo.

## Regras principais
- Alimenta o mecanismo de busca de [`process/12-knowledge-retrieval.md`](../../process/12-knowledge-retrieval.md) — toda entrada cita a Feature/decisão de origem, para permitir citação de `path:line` no futuro.
- Só registra lições com valor real de reaproveitamento, não um resumo genérico da Feature.
- **Critério de roteamento (obrigatório, decidido por lição, não por Feature inteira)**: uma lição vai para `features/<feature>/MEMORY.md` quando só faz sentido no contexto desta Feature específica (decisão de negócio, evento/métrica específico, escolha de arquitetura local). Vai para o [`MEMORY.md` do núcleo](../../MEMORY.md) quando continuaria valendo numa Feature diferente, mesmo em outro repositório — um padrão de linguagem/framework, um comportamento de ferramenta (MCP, CLI, compilador), um método de investigação reaproveitável. Teste prático: "se eu abrisse uma Feature nova amanhã, sem relação nenhuma com esta, essa lição ainda me pouparia um erro?" — se sim, núcleo.
- Uma lição promovida ao núcleo não é duplicada por extenso no `MEMORY.md` da Feature — a Feature guarda só uma linha de referência apontando para o núcleo (ver `features/ga4-eventos-exemplo/MEMORY.md` como exemplo).

## Depende de
- `process/12-knowledge-retrieval.md`, [`MEMORY.md` do núcleo](../../MEMORY.md).

## Procedimento em caso de falha
Se não houver lição clara e específica a registrar, a skill não força uma entrada artificial em `MEMORY.md` só para "não ficar vazia".
