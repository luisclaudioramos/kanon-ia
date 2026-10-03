# 48 — Screen Validation

## Propósito
Levar cada tela de uma User Story com interface do desenho até a aprovação do PO **e** do negócio, por tela e por versão, e registrar essa aprovação no próprio sistema — porque o PO e o negócio aprovam onde conversam (normalmente o chat), não no work item. Sem isso, a tela é desenvolvida sobre um desenho que ninguém aprovou, e a divergência só aparece na entrega.

## Fase / Posição no fluxo
Fase 2 — Refino de Usuário e Tarefas. Roda depois de [`05-refine-user-stories`](../05-refine-user-stories/SKILL.md) em toda US com interface (quando [`agents/AGENT-UI-UX-DESIGNER.md`](../../agents/AGENT-UI-UX-DESIGNER.md) é acionado). **Não bloqueia** [`07-refine-tasks`](../07-refine-tasks/SKILL.md): o front pode desenvolver em paralelo. A cobrança está na trava 12 de [`process/15-pull-request-gates.md`](../../process/15-pull-request-gates.md) (alerta na PR) e no DoD da US em [`process/05-definition-of-done.md`](../../process/05-definition-of-done.md) (bloqueio no fechamento). Também roda sob demanda e quando [`49-change-impact`](../49-change-impact/SKILL.md) decide uma mudança que afeta telas.

## Entradas
- A User Story refinada e a lista de aprovadores (PO e negócio) da `FEATURE.md`.
- As telas, de qualquer um destes tipos de fonte: print, acesso ao sistema, ferramenta de design, link publicado, protótipo gerado. A lista concreta de ferramentas e como testar cada uma fica na camada de integração (no Claude Code: `.claude/integrations/screen-sources.md`).

## Saídas
- `telas/SCREEN-VALIDATION.md` na pasta da Feature (ver [`templates/SCREEN-VALIDATION.template.md`](../../templates/SCREEN-VALIDATION.template.md)).
- As imagens em `telas/atual/`, `telas/proposta/`, `telas/anatomia/`, `telas/comparativo/` e `telas/historico/`; o protótipo e seus scripts, quando houver, em `telas/gerador/`.
- A seção UI/UX da US com a versão aprovada de cada tela.
- Comentário no work item da US com a aprovação (via [`16-azure-devops-integration-sm`](../16-azure-devops-integration-sm/SKILL.md)).

## Regras principais

### Etapas
0. **Checagem das fontes**: testa só as fontes que a US vai usar. Para a que faltar, oferece configurar ou usar o caminho alternativo (exportar a tela em imagem ou PDF e tratar como print); a falta é registrada como exceção, conforme [`process/13-external-integration-prerequisite.md`](../../process/13-external-integration-prerequisite.md).
1. **Entrada das telas**: para cada tela, confere sistema, rota, estado mostrado (com dados, vazio, erro, carregando), fonte, data, se é a tela atual ou uma proposta, e as larguras: toda versão de tela tem três imagens, em 390, 768 e 1920 px (D1 de [`process/16-design-foundations.md`](../../process/16-design-foundations.md)). O que faltar é perguntado, nunca suposto.
2. **Tela atual**: captura de como a tela é hoje, em `telas/atual/`, nas três larguras quando há acesso ao sistema. O que quebrar em 390 ou 768 entra no inventário do perfil de design (`50-design-profile`) como bug visual de D1. Em tela nova, registra "não existe".
3. **Proposta**: da ferramenta de design (pedir os quadros de celular e tablet), ou gerada como protótipo no visual do sistema, com o gerador guardado em `telas/gerador/`. Se a ferramenta só tiver desktop, a IA gera as versões de 390 e 768 no protótipo e a seção "Fontes" registra "gerada a partir do desktop".
4. **Anatomia**: obrigatória em toda tela que mostra ou grava dados. Cada elemento recebe a origem: 🟩 vem da API · ⬜ fixo no código · 🟨 calculado no front · 🟦 campo novo ou ajuste no back. A origem é conferida no código, com `arquivo:linha` ([`process/12-knowledge-retrieval.md`](../../process/12-knowledge-retrieval.md)). Cada 🟦 vira pendência para o back-end na fila de perguntas ao time. Cada elemento também recebe a **classificação** (token, componente da biblioteca, do design system ou próprio — D3, D4) e o **padrão por função** do perfil que segue, ou "diverge" (D6). A seção "Comportamento responsivo" diz o que acontece com cada elemento em 390, 768 e 1920.
5. **Comparativo**: tela atual e proposta lado a lado, uma imagem por largura, com as mudanças numeradas. Só quando a tela atual existe.
6. **Lista de mudanças**: por tela, como é hoje, a proposta e o motivo; os estados de carregando, vazio e erro; e a seção "Simplificações do protótipo — não são mudanças".
7. **Envio**: mensagem ao PO e ao negócio, sem jargão, sem prazo nem divisão de entrega, com as telas e perguntas objetivas. Cada tela vai como uma **prancha**: uma imagem com 390, 768 e 1920 lado a lado e o nome da largura em cima, gerada a partir das três imagens. O Tech Lead aprova o texto antes de qualquer envio. Quando a ferramenta de mensagem não anexa arquivos, a skill cria um rascunho e o Tech Lead anexa as imagens. O link do envio vai para a seção "Envios" e as telas passam a `enviada`.
8. **Retorno**: a skill lê a conversa desde o envio registrado (ou o link que o Tech Lead indicar) e **propõe**, por tela e versão: aprovada, aprovada com ressalvas, mudança pedida ou não é aprovação — com trecho curto, autor, data e link. O Tech Lead confirma. Só então registra.

### Versões e estados
- Estados: `rascunho` → `enviada` → `aprovada` | `aprovada com ressalvas` | `mudança pedida`. Depois de `mudança pedida`, a nova versão recomeça em `rascunho`.
- Nomes dos arquivos: `NN-nome.vN.390.png`, `NN-nome.vN.768.png`, `NN-nome.vN.1920.png` e a prancha `NN-nome.vN.prancha.png`. A versão só é enviada com as três larguras; faltando uma, fica em `rascunho`. A aprovação vale para as três juntas, e mudança pedida em qualquer largura gera `vN+1`. `NN` é o número fixo da tela na Feature: nunca muda e nunca é reaproveitado. Cada tela pertence a uma US, indicada no índice.
- Enquanto a tela não foi enviada, ajustes são feitos no lugar, sem versão nova.
- Mudança visual em tela já enviada gera `vN+1`; a versão anterior vai para `telas/historico/` com a anatomia e o comparativo dela.
- Aprovação no teste (`14-qa-validation`): o print da homologação entra como `vN+1`, com origem "teste", e a versão anterior vai para `telas/historico/`.
- **A versão aprovada nunca é sobrescrita.** PR e teste comparam com ela. Se precisar mudar, a versão nova volta a `rascunho` e a aprovação anterior fica no histórico.

### Aprovação
- Só conta mensagem de quem está na lista de aprovadores da `FEATURE.md`. Um representante do negócio vale pelo negócio quando está nessa lista.
- Uma versão só fica `aprovada` com aprovação do PO **e** do negócio para aquela versão. Enquanto falta uma, o índice mostra o parcial ("PO ✓ · negócio pendente") e o estado continua `enviada`.
- **Pedido de mudança não é aprovação.** Resposta que aprova e pede mudança ao mesmo tempo é `mudança pedida` e aciona [`49-change-impact`](../49-change-impact/SKILL.md).
- Ressalva que não muda a tela vira critério de aceite ou pendência na US, e a tela conta como `aprovada com ressalvas`. Ressalva que muda a tela é `mudança pedida`.
- Resposta ambígua é proposta como "não é aprovação" até o Tech Lead decidir.
- Uma confirmação do Tech Lead cobre a classificação e as três escritas: a linha em "Registro de aprovações" (só acréscimo), a tabela da seção UI/UX da US local e o comentário no work item da US com trecho, autor, link e a imagem da versão aprovada.

## Depende de
- `agents/AGENT-UI-UX-DESIGNER.md` (conduz), `agents/AGENT-FRONTEND-ENGINEER.md` e `agents/AGENT-BACKEND-ENGINEER.md` (anatomia), `agents/AGENT-PO.md` (envio e retorno).
- `templates/SCREEN-VALIDATION.template.md`, `49-change-impact`, `16-azure-devops-integration-sm`, `50-design-profile`, `process/16-design-foundations.md`.
- `process/05-definition-of-done.md`, `process/11-subagent-anti-hallucination.md`, `process/12-knowledge-retrieval.md`, `process/13-external-integration-prerequisite.md`, `process/15-pull-request-gates.md`.

## Procedimento em caso de falha
Tela sem sistema, rota ou estado identificados não segue para a anatomia: a skill pergunta e espera. Fonte indisponível sem caminho alternativo fica registrada como exceção, nunca como "pulada". Retorno ambíguo é "não é aprovação" até o Tech Lead decidir. Se a escrita no work item falhar, a linha do registro local fica com a nota "ADO pendente" e a skill reporta a falha — nunca declara a aprovação publicada. Nenhuma mensagem é enviada nem aprovação registrada sem a confirmação do Tech Lead.
