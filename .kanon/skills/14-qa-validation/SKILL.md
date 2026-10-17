# 14 — Qualification (Testes Executivos)

## Propósito
Validar a implementação contra os Acceptance Criteria da User Story, executando cenários de teste e atestando a qualidade funcional.

## Fase / Posição no fluxo
Fase 3 — Governança, Qualidade e Transições. Roda depois de [`13-code-review`](../13-code-review/SKILL.md), usando os casos de teste gerados por [`25-test-case-authoring`](../25-test-case-authoring/SKILL.md).

## Entradas
- `TEST-CASE.md` (skill 25) e a implementação já revisada.

## Saídas
- Atestado de qualidade funcional: AC cumpridos ou não, com evidência.

## Regras principais
- Aciona [`agents/AGENT-QA-ENGINEER.md`](../../agents/AGENT-QA-ENGINEER.md) para validar contra os AC.
- Nenhum AC é atestado como cumprido sem o cenário de teste correspondente ter sido de fato executado (ver `process/11-subagent-anti-hallucination.md`).
- Em US com telas, compara em homologação a tela implementada com a versão aprovada em `telas/SCREEN-VALIDATION.md` ([`48-screen-validation`](../48-screen-validation/SKILL.md)), nas três larguras, prancha implementada ao lado da prancha aprovada. Diferença vira achado ou mudança pedida ([`49-change-impact`](../49-change-impact/SKILL.md)).
- Confere a tela em homologação nas larguras 390, 768 e 1920 ([`process/16-design-foundations.md`](../../process/16-design-foundations.md), D1) e gera a prancha da homologação. Defeito encontrado é classificado como bug visual ou oportunidade técnica, conforme `process/16`.
- **Cenário que falha** passa pela triagem de [`32-report-bug`](../32-report-bug/SKILL.md) ("Triagem: é bug de verdade?") antes de virar Bug: o AC descumprido é a pergunta 1, o passo do caso de teste é a 2, e o QA completa código, dado e ambiente. Resultado diferente de Bug (pedido de mudança, ajuste operacional, inconclusivo) é registrado no relatório de teste com a evidência, sem `BUG.md`.
- Tela que chega ao teste sem aprovação pode ser aprovada no teste: a validação do PO e do negócio em homologação conta, com a regra da skill 48 (a IA propõe, o Tech Lead confirma). O print da homologação entra como `vN+1` em `telas/proposta/`, registrado com a origem "teste"; a versão anterior vai para `telas/historico/` — nunca sobrescreve a versão existente.

## Depende de
- `agents/AGENT-QA-ENGINEER.md`, `25-test-case-authoring`, `48-screen-validation`, `process/11-subagent-anti-hallucination.md`, `process/16-design-foundations.md`, `32-report-bug`.

## Procedimento em caso de falha
Se um cenário de teste não puder ser executado, a skill reporta isso explicitamente como "não executado" — nunca simula um resultado de sucesso.
