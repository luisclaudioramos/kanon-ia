# Setup — Configuração Inicial do Harness

## Propósito
Diferente das 43 skills numeradas, `setup` não é uma skill de pipeline — é a instalação única do sistema, executada apenas na primeira inicialização do ambiente. Por isso vive como pasta (`skills/setup/`), não como um `.md` numerado solto.

## Quando se aplica
Uma única vez, antes de [`00-harness-runtime`](../00-harness-runtime/SKILL.md) rodar pela primeira vez em um ambiente novo.

## O que esta etapa cria (especificação — ainda não implementado neste repositório)
- A árvore de diretórios `.kanon/`, se não existir.
- O arquivo `seals.manifest.json`, inicializado com os 5 Selos de Identidade.
- Dependências de integração externas: APIs do Azure DevOps, Notion, Outline.
- Os hooks do Claude, instalados em `.claude/hooks/`.
- Validação das permissões de acesso necessárias para o harness operar.

## Regras principais
- Não é reexecutado automaticamente — rodar de novo é uma ação explícita e consciente (ex.: reconfigurar integrações), não parte do fluxo normal do pipeline.
- Nenhuma outra skill assume que `.kanon/`, `seals.manifest.json` ou os hooks existem antes de `setup` ter sido executado (ver [`process/00-runtime-contract.md`](../../process/00-runtime-contract.md)).
- Segredos e credenciais de integração (Azure, Notion, Outline) nunca são gravados dentro de `.kanon/` — apenas o *nome* da configuração é conhecido pelo núcleo (ver [`process/10-core-agnosticism-gate.md`](../../process/10-core-agnosticism-gate.md)).

## Depende de
- `process/00-runtime-contract.md`, `process/10-core-agnosticism-gate.md`.

## Procedimento em caso de falha
Se qualquer etapa do setup falhar (permissão negada, dependência indisponível), o processo é interrompido e reportado antes de `00-harness-runtime` ser liberado para rodar — o sistema nunca opera em um ambiente parcialmente configurado.

## Estado atual neste repositório
Esta pasta hoje contém apenas esta especificação. A construção real de `.kanon/`, `seals.manifest.json`, `.claude/hooks/` e as integrações externas é escopo futuro, fora desta etapa.
