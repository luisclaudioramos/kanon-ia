# 21 — Notion Integration (Scrum Master)

## Propósito
Publicar os artefatos aprovados no Notion, criando páginas estruturadas com os templates padrão e atualizando o banco de dados central de documentação do time.

## Fase / Posição no fluxo
Fase 5 — Publicação e Integrações. Roda após um artefato atingir o estado `aprovado`/`publicado` (ver skill 05).

## Entradas
- Artefato aprovado (Feature, US, ADR, etc.).

## Saídas
- Página estruturada no Notion, banco de documentação atualizado.

## Regras principais
- Aciona [`agentes-ia/SCRUM-MASTER.md`](../../agents/AGENT-SCRUM-MASTER.md).
- Usa os templates da pasta `templates/` (referência futura).
- Só publica artefato em estado `aprovado` ou posterior — nunca um rascunho (`refinado`).

## Depende de
- `agentes-ia/SCRUM-MASTER.md`, `05-refine-user-stories` (regra de estado 1-1-1), `process/13-external-integration-prerequisite.md`.

## Procedimento em caso de falha
Se o artefato ainda estiver em rascunho, a skill aguarda a aprovação em vez de publicar antecipadamente. Se o Notion nunca foi configurado, segue `process/13-external-integration-prerequisite.md`: orienta a configuração e só aceita pular com exceção explícita e registrada.
