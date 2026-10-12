# Documentação — Padrões de Escrita

Regras de escrita para conteúdo publicado na ferramenta de documentação, além do que já vale para todo Markdown do sistema (ver [`process/06-markdown-formatting-rules.md`](../../process/06-markdown-formatting-rules.md)). O leitor é quem não participou do trabalho: um engenheiro de outro time, o PO, alguém na primeira semana de empresa.

## Títulos
- Regras de título e quebra de linha próprias da ferramenta estão no adaptador da capacidade `documentacao`.
- Documentos filhos de uma Feature são nomeados `NN — Nome` (dois dígitos, travessão, nome com iniciais maiúsculas): `01 — Contexto e Decisões`.
- `##` para as seções; `###` só para subdividir uma seção longa.

## Texto
- Sigla, jargão ou nome de sistema é explicado na primeira ocorrência (trava 2 de `process/15-pull-request-gates.md`). Termos que se repetem vão para o **Glossário** da ficha.
- **Nada de referência interna**: link de wiki local (`[[...]]`), caminho de pasta local, nome de arquivo de anotação, memória ou transcrição. Outro documento da mesma Feature é citado pelo título entre crases (`` `05 — Virada e Histórico` ``).
- Decisão de negócio entra como "combinado com _pessoa_ em _data_", ou numa tabela de decisões com a coluna **Origem** (pessoa, data).
- Mostrar, não descrever: tabela "hoje × depois", exemplo com valores concretos, diagrama Mermaid no corpo da página (nunca imagem exportada).
- Dados sempre sintéticos ou agregados: nunca CPF, CNPJ, e-mail, telefone ou nome real de cliente (LGPD, mesma regra da trava 7 de `process/15-pull-request-gates.md`).

## Fontes
- Toda afirmação sobre código cita `arquivo:linha` do repositório; sobre banco, a consulta e o ambiente (homologação ou produção) — Selo IV, `process/12-knowledge-retrieval.md`.
- A ficha declara a **base da varredura**: repositórios, branch e commit lidos, banco e ambiente consultados, e a data. Quem lê sabe de quando é o retrato.
- Links entre páginas são relativos ao workspace; nunca URL absoluta de ambiente no núcleo (`process/10-core-agnosticism-gate.md`). Links para work item, PR ou repositório entram no conteúdo da Feature, não nos templates.

## Situação e atualizações
- A ficha abre com a **situação** do documento: `Em validação`, `Aprovado` ou `Entregue`. Publicar em validação é permitido, desde que a situação diga isso e quem valida.
- Mudança depois da publicação entra como aviso `> **Atualização de AAAA-MM-DD — _resumo_.**` no topo da ficha (o mais recente primeiro) e, se for o caso, no documento afetado. O texto superado fica marcado como superado, não apagado sem rastro.
- Na entrega da Feature, a situação passa a `Entregue em AAAA-MM-DD` e o conteúdo é revisado para descrever o sistema como ficou (documentação do sistema atual atualizada para o to-be — `process/05-definition-of-done.md` e trava 9 de `process/15-pull-request-gates.md`).
