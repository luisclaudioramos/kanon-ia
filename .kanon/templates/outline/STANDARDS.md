# Outline — Padrões de Documentação

Regras de formatação específicas para conteúdo publicado no Outline, além do que já vale para todo Markdown do sistema (ver [`process/06-markdown-formatting-rules.md`](../../process/06-markdown-formatting-rules.md)).

## Regras
- Títulos usam apenas `#` e `##` como níveis principais — o Outline já adiciona sua própria navegação lateral, níveis mais profundos viram ruído.
- Links entre páginas são sempre relativos ao workspace, nunca URLs absolutas hardcoded (ver `process/10-core-agnosticism-gate.md`).
- Diagramas Mermaid são incorporados diretamente no corpo da página, não como imagem exportada.
- Toda página tem metadados no topo: ID, data da última atualização, responsável.
- Toda afirmação que cita uma decisão ou regra do projeto inclui a fonte (`path:line` ou link do documento de origem) — mesma exigência de `process/12-knowledge-retrieval.md` (Selo IV).

## Metadados obrigatórios (topo da página)
```
ID: _[preencher]_
Última atualização: _[preencher]_
Responsável: _[preencher]_
```
