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
- **Lacuna de escopo vira RF-X, não fica em prosa.** Se a decisão/mudança propagada revela uma necessidade de negócio que nenhum RF/RNF existente cobre (não é só um ajuste de um já existente), a skill cria um RF-X novo na tabela de Requisitos Funcionais de `FEATURE.md`, com critério de aceite verificável e referência à origem (`path:line` da decisão ou do achado). Motivo: só RF/RNF são cobrados pelo DoD (`process/05-definition-of-done.md`) e pelo Quality Gate — uma lacuna registrada só como nota de rodapé é invisível para o gate e se perde.

## Depende de
- `reference/boas-praticas-dev/06-documentacao.md`, `03-create-feature-artifacts` (os 4 documentos de origem).

## Procedimento em caso de falha
Se a propagação falhar em atualizar um dos 4 documentos, a skill sinaliza explicitamente qual ficou dessincronizado, em vez de reportar sucesso parcial como sucesso total. Se uma lacuna for identificada mas não puder virar RF-X ainda (falta definição suficiente), ela é registrada como pendência explícita em `FEATURE.md`, nunca omitida.
