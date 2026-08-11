# 03 — Create Feature Artifacts

## Propósito
Criar a estrutura de pastas da Feature e os primeiros documentos obrigatórios (`PLAN-vx.md`, `FEATURE.md`, `INSTRUCTIONS.md`), populando com os dados refinados na skill 01.

## Fase / Posição no fluxo
Fase 1 — Arquitetura e Especificação. Roda após [`02-discover-context`](../02-discover-context/SKILL.md) e antes de [`04-architecture-assessment`](../04-architecture-assessment/SKILL.md).

## Entradas
- Dados refinados da Feature (skill 01) e relatório de contexto (skill 02).

## Saídas
- Pasta da Feature com `PLAN-vx.md`, `FEATURE.md` e `INSTRUCTIONS.md`.

## Regras principais
- Os 3 documentos mestres seguem a sintaxe obrigatória de [`process/06-markdown-formatting-rules.md`](../../process/06-markdown-formatting-rules.md).
- Ao criar os documentos, aciona [`17-navigable-links`](../17-navigable-links/SKILL.md) para linká-los entre si desde o início.
- Usa os templates da pasta `templates/` (referência futura — ver `38-create-template`).

## Depende de
- `process/06-markdown-formatting-rules.md`, `17-navigable-links`.

## Procedimento em caso de falha
Se algum dado obrigatório da skill 01 estiver ausente, a skill não cria os 3 artefatos parcialmente — bloqueia e sinaliza exatamente o que falta antes de gerar qualquer arquivo.
