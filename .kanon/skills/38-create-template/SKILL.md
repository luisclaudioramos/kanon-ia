# 38 — Create Template

## Propósito
Skill utilitária que permite a extensão do harness: cria um novo `.template.md` dentro da pasta `templates/`, aplica a estrutura mínima obrigatória e registra o novo template no `seals.manifest.json` para que seja reconhecido pelas outras skills.

## Fase / Posição no fluxo
Fase 7 — Auditoria, Governança e Consolidação. Acionada sob demanda, sempre que um novo tipo de artefato precisar de um template padronizado.

## Entradas
- Especificação do novo template (nome, seções desejadas, propósito).

## Saídas
- Novo arquivo `.template.md` em `templates/` e entrada correspondente em `seals.manifest.json` (referências futuras).

## Regras principais
- Aplica a estrutura mínima obrigatória: cabeçalho, breadcrumbs, seções padrão (ver [`process/06-markdown-formatting-rules.md`](../../process/06-markdown-formatting-rules.md)).
- Todo template criado é registrado no manifesto — um template não registrado não é reconhecido pelas demais skills.

## Depende de
- `process/06-markdown-formatting-rules.md`, `seals.manifest.json` (referência futura).

## Procedimento em caso de falha
Um template proposto sem a estrutura mínima obrigatória não é aceito nem registrado — a skill retorna o que precisa ser ajustado.
