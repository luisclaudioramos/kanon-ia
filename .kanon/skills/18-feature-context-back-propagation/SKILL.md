# 18 — Feature Context Back-Propagation

## Propósito
Cada vez que uma decisão técnica é tomada ou um Acceptance Criterion é alterado durante o desenvolvimento, esta skill propaga a mudança de volta para os 4 documentos mestres da Feature (`PLAN`, `FEATURE`, `INSTRUCTIONS`, `ARCHITECTURE`), mantendo-os sempre sincronizados.

## Fase / Posição no fluxo
Transversal — acionada durante toda a Fase 4 (Desenvolvimento), sempre que uma decisão ou AC muda em relação ao que foi documentado antes.

## Entradas
- Decisão técnica nova ou alteração de AC feita durante a implementação.

## Saídas
- Documentos mestres (`PLAN`, `FEATURE`, `INSTRUCTIONS`, `ARCHITECTURE`) atualizados.

## Regras principais
- Nenhum documento mestre fica desatualizado silenciosamente — documentação desatualizada é pior que ausência de documentação (base: `reference/boas-praticas-dev/06-documentacao.md`).
- Propaga para os 4 documentos, não apenas para o mais óbvio — uma mudança de arquitetura também pode afetar `INSTRUCTIONS.md`, por exemplo.

## Depende de
- `reference/boas-praticas-dev/06-documentacao.md`, `03-create-feature-artifacts` (os 4 documentos de origem).

## Procedimento em caso de falha
Se a propagação falhar em atualizar um dos 4 documentos, a skill sinaliza explicitamente qual ficou dessincronizado, em vez de reportar sucesso parcial como sucesso total.
