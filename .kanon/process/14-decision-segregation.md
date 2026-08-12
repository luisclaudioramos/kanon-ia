# 14 — Decision Segregation

## Propósito
Impedir que a mesma janela de contexto/agente que produziu um artefato seja também quem o aprova em um gate — Quality Gate e Code Review precisam de um revisor genuinamente independente, não do mesmo raciocínio revisando a si mesmo.

## Quando se aplica
Em qualquer gate de aprovação: `11-quality-gate` (pré-dev e da Feature) e `13-code-review`. Não se aplica a etapas que não são gate (ex.: a própria implementação, discovery, refinamento).

## Regras
- Quem implementou/gerou o artefato não é quem o aprova no gate correspondente — a revisão roda como subagente independente (fan-out de 1), mecanismo já definido pelo Selo III (`process/09-identity-seals-gate.md`, `seals.manifest.json`).
- O subagente revisor recebe o artefato e o critério de aprovação (DoD, AC, checklist) — não recebe o raciocínio ou o histórico de decisões de quem implementou, para não herdar o viés de confirmação de quem já decidiu que "está pronto".
- Quando não há um segundo agente/subagente disponível para segregar (ex.: sessão sem suporte a fan-out), isso é registrado explicitamente como limitação do gate — o resultado é "aprovado sem segregação de decisão", nunca apresentado como equivalente a uma revisão independente.
- Design Gate (`41-design-gate`) já satisfaz esta regra por natureza — a aprovação ali é sempre humana, nunca do mesmo agente.

## Sinais de violação
- Um Quality Gate "aprovado" sem nenhum subagente/fan-out disparado para revisão, e sem a limitação registrada.
- Um Code Review no qual o mesmo agente que implementou lista os próprios achados e já os marca como resolvidos, sem segunda leitura.

## Procedimento em caso de falha
Se não for possível disparar um subagente independente, o gate não é apresentado como aprovação plena — é registrado como "aprovado sem segregação de decisão (limitação de ambiente)", para que quem lê o resultado saiba que não houve segunda perspectiva.

## Exemplo concreto

**Errado** — o mesmo agente implementa e aprova:
```
[TECH-LEAD, mesma sessão] Implementei a correção.
[TECH-LEAD, mesma sessão] Revisei minha própria implementação: aprovado.
```

**Certo** — subagente independente revisa, sem herdar o raciocínio de quem implementou:
```
[TECH-LEAD] Implementação concluída, artefato X pronto para Quality Gate.
[fan-out → subagente revisor, recebe só o artefato + critério] Revisão independente: aprovado / apontamentos.
```
