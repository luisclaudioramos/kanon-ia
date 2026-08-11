# 32 — Report Bug (Fluxo Paralelo)

## Propósito
Disparar a criação estruturada de um Bug (`BUG.md`), com Repro Steps, System Info e Knowledge Base, acionando o fluxo de correção paralelo sem interromper o fluxo principal da Feature.

## Fase / Posição no fluxo
Fase 6 — Memória, Custo e Encerramento (classificada aqui, mas pode ser disparada a qualquer momento). Alimenta [`27-bug-task-management`](../27-bug-task-management/SKILL.md) e [`25-test-case-authoring`](../25-test-case-authoring/SKILL.md).

## Entradas
- Relato do problema: passos de reprodução, informação do sistema/ambiente.

## Saídas
- `BUG.md` estruturado.

## Regras principais
- Um bug só é aceito como `BUG.md` válido se tiver Repro Steps reprodutíveis (base: `boas-praticas-dev/11-debugging.md` — reproduzir antes de corrigir).
- Não interrompe o fluxo principal de nenhuma Feature em andamento — corre em paralelo.

## Depende de
- `boas-praticas-dev/11-debugging.md`, `27-bug-task-management`.

## Procedimento em caso de falha
Se os Repro Steps estiverem incompletos ou não reprodutíveis, a skill pede mais informação antes de criar o artefato — não cria um `BUG.md` que ninguém consegue reproduzir depois.
