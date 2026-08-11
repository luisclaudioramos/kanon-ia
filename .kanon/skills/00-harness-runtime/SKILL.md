# 00 — Harness Runtime

## Propósito
Ser a primeira skill executada em qualquer sessão: valida o ambiente, carrega o contrato de runtime, verifica a integridade dos selos e prepara o terreno para o menu interativo. É o "boot" do harness.

## Fase / Posição no fluxo
Fase 0 — Inicialização. Executa antes de qualquer outra skill, inclusive antes de [`39-generate-requirement-summary`](../39-generate-requirement-summary/SKILL.md).

## Entradas
- Variáveis de ambiente e caminhos absolutos do projeto.
- Estado atual de `seals.manifest.json` (referência futura).

## Saídas
- Harness inicializado e validado.
- Menu interativo carregado e pronto para receber comandos.

## Regras principais
- Implementa exatamente o contrato de [`process/00-runtime-contract.md`](../../process/00-runtime-contract.md) — nenhuma regra de boot é definida aqui além do que já está lá.
- Verifica a integridade mínima dos 5 Selos de Identidade via [`process/09-identity-seals-gate.md`](../../process/09-identity-seals-gate.md) antes de liberar qualquer outra skill.
- Ao final, carrega o [`01-menu-map`](../../process/01-menu-map.md) para que o usuário possa emitir comandos.

## Depende de
- `process/00-runtime-contract.md`, `process/09-identity-seals-gate.md`, `process/01-menu-map.md`.

## Procedimento em caso de falha
Se qualquer validação de ambiente ou selo falhar, o harness aborta antes de carregar o menu, reportando exatamente o que não pôde ser validado — nenhuma skill roda com o boot incompleto (ver `process/00-runtime-contract.md`).
