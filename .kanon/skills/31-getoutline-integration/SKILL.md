# 31 — GetOutline Integration

## Propósito
Publicar os artefatos de conhecimento (Features, arquitetura, decisões, runbooks) no Outline, garantindo que a documentação de longo prazo fique acessível e versionada para toda a organização.

## Fase / Posição no fluxo
Fase 5 — Publicação e Integrações. Roda após artefatos de conhecimento existirem (ex.: ADR da skill 04, runbook da skill 19) e de novo na entrega da Feature, para a documentação passar a descrever o sistema como ficou.

## Entradas
- Artefatos de conhecimento (arquitetura, decisões, runbooks, plano).
- **Local da pasta Features**, informado por quem publica (ver [`templates/outline/FIXED-PAGES.md`](../../templates/outline/FIXED-PAGES.md)).

## Saídas
- Documentação publicada e versionada no Outline, no formato de [`templates/outline/PAGE-MODELS.md`](../../templates/outline/PAGE-MODELS.md).
- Cópia local publicada na pasta `outline/` da Feature.
- [`templates/OUTLINE-PUBLISH-SUMMARY.template.md`](../../templates/OUTLINE-PUBLISH-SUMMARY.template.md) preenchido.

## Procedimento
1. **Perguntar o local** da pasta Features. Nunca usar um local padrão nem o de uma publicação anterior sem confirmação. Pasta inexistente no local: perguntar antes de criar.
2. **Montar a cópia local** em `outline/`: ficha e filhos `NN — Nome` conforme `PAGE-MODELS.md`, aplicando `STANDARDS.md` (sem referência interna, linhas desfeitas, siglas explicadas, base da varredura, situação).
3. **Conferir antes de publicar** — ver "Conferência" abaixo.
4. **Mostrar o rascunho** a quem pediu a publicação e só publicar com o aceite.
5. **Publicar** a ficha sob Features e depois os filhos, em ordem, sob a ficha.
6. **Conferir a ordem** dos filhos no Outline e reordenar se precisar (repetir a passada se a ordem não pegar).
7. **Registrar** o resumo de publicação, com o link permanente de cada documento.

Atualização de uma Feature já publicada: editar a cópia local, acrescentar o aviso `Atualização de AAAA-MM-DD` na ficha e republicar só os documentos alterados, mantendo os links.

## Conferência
Antes de publicar, a skill confere e reporta cada item como atende / não atende:
- [ ] Ficha com situação, dois parágrafos de contexto, base da varredura, índice e glossário.
- [ ] Filhos nomeados `NN — Nome`, sem buraco na numeração, plano detalhado (se houver) por último.
- [ ] Corpo sem `#`; nenhum `####`.
- [ ] Nenhum `[[link]]`, caminho de pasta local ou referência a anotação, memória ou transcrição.
- [ ] Siglas e nomes de sistema explicados na primeira ocorrência (trava 2 de `process/15-pull-request-gates.md`).
- [ ] Toda afirmação sobre código ou banco com `arquivo:linha` ou consulta; toda decisão com origem (pessoa, data).
- [ ] Nenhum dado real de cliente (CPF, CNPJ, e-mail, telefone, nome).
- [ ] Nenhum parágrafo quebrado em várias linhas.

## Regras principais
- Publica conhecimento consolidado ou **em validação declarada**: documento em validação diz na situação quem valida. Nunca publica rascunho sem situação.
- Na entrega da Feature, atualiza a situação para `Entregue em AAAA-MM-DD` e revisa o conteúdo para o to-be — é a documentação que a trava 9 de `process/15-pull-request-gates.md` e o DoD de `process/05-definition-of-done.md` cobram, e o link entra na seção Documentação da PR.
- Integração externa — configuração e pré-requisito regidos por [`process/13-external-integration-prerequisite.md`](../../process/13-external-integration-prerequisite.md). O endereço e o token do Outline vivem na configuração do ambiente, nunca em `.kanon/`.

## Depende de
- `04-architecture-assessment`, `19-runbook-authoring`, `setup/`, `process/13-external-integration-prerequisite.md`, `templates/outline/`.

## Procedimento em caso de falha
Se o Outline estiver temporariamente indisponível, a documentação permanece local e a skill sinaliza a pendência de publicação — não é perdida nem considerada "publicada" sem confirmação. Se o Outline nunca foi configurado, segue `process/13`: orienta a configuração e só aceita pular com exceção explícita e registrada. Item da conferência que não atende: a skill lista o item e o documento, e só publica depois da correção ou de uma exceção registrada por quem pediu.
