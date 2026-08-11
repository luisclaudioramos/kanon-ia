# 09 — Identity Seals Gate

## Propósito
Ser o gate mestre que valida se um artefato atende aos pré-requisitos mínimos de integridade (os 5 Selos de Identidade, catalogados em `seals.manifest.json`) antes de qualquer hook específico ser acionado — o "guardião da entrada" do sistema.

## Quando se aplica
Antes de qualquer outro gate/hook especializado (`10-core-agnosticism-gate.md`, entre outros) processar um artefato.

## Regras
- Um artefato só passa para os gates específicos depois de satisfazer os pré-requisitos mínimos de integridade definidos pelos 5 Selos (identidade do agente que o produziu, rastreabilidade da origem, entre outros catalogados em `seals.manifest.json`).
- Este gate não avalia o conteúdo específico de cada selo — isso é papel dos gates 10–12 e demais hooks; ele apenas garante que o artefato está em condição mínima de ser avaliado.
- Um artefato que falha neste gate é rejeitado antes mesmo de chegar aos gates especializados, evitando gastar processamento validando algo estruturalmente inválido.

## Sinais de violação
- Um artefato sem identificação de origem sendo processado por um gate especializado.
- Um hook específico rodando sobre um artefato que nunca passou por este gate mestre.

## Procedimento em caso de falha
Se um artefato falhar neste gate, ele é rejeitado imediatamente com a lista de pré-requisitos não satisfeitos — não é encaminhado "mesmo assim" para os gates seguintes.

## Exemplo concreto

**Errado** — artefato sem identidade seguindo direto para gate especializado:
```
Artefato sem campo de origem → processado por 10-core-agnosticism-gate.md
(pula a checagem mestre de integridade)
```

**Certo** — rejeição no gate mestre, antes de qualquer gate especializado:
```
[09-identity-seals-gate] Rejeitado: artefato sem identificação do agente de origem.
Pré-requisitos não satisfeitos: Selo I (identidade). Não encaminhado para gates seguintes.
```
