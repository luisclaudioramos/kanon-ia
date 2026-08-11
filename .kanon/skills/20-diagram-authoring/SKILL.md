# 20 — Diagram Authoring

## Propósito
Acionada sempre que um fluxo complexo é descrito. Gera diagramas Mermaid (Flowchart, Sequence) usando a paleta canônica do projeto, anexando-os aos artefatos correspondentes.

## Fase / Posição no fluxo
Transversal — acionada por qualquer skill que precise ilustrar um fluxo complexo (ex.: [`22-generate-architecture-context`](../22-generate-architecture-context/SKILL.md)).

## Entradas
- Descrição textual de um fluxo/processo complexo.

## Saídas
- Diagrama Mermaid anexado ao artefato de origem.

## Regras principais
- Usa a paleta canônica de diagramação do projeto (referência futura).
- Só gera um diagrama quando o fluxo descrito tem clareza suficiente para ser representado sem ambiguidade.

## Depende de
- `22-generate-architecture-context` e demais skills que descrevem fluxo.

## Procedimento em caso de falha
Se o fluxo descrito não tiver clareza suficiente para ser diagramado sem ambiguidade, a skill sinaliza isso em vez de gerar um diagrama especulativo ou incorreto.
