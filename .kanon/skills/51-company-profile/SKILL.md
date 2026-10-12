# 51 — Company Profile

## Propósito
Manter o perfil de cada empresa, área e equipe atendida — quem ocupa cada papel, qual ferramenta atende cada capacidade, como comunicar, quais processos seguir — e acompanhar as mudanças da empresa sem que nada entre no perfil sem confirmação humana. É a única skill que escreve no perfil.

## Fase / Posição no fluxo
Transversal. `criar` roda na primeira vez que o kanon atende um nível sem perfil; `propor` é chamada por qualquer skill que perceba uma mudança; `revisar` roda quando o runtime aponta dado vencido; `contexto` define para quem o kanon trabalha nesta máquina.

## Entradas
- O contexto ativo ou o caminho do nível (`<empresa>/<area>/<equipe>`).
- Para `propor`: o que muda, o nível, a fonte e o impacto previsto.

## Saídas
- `kanon/perfil.md` e `kanon/historico.md` do nível, no repositório de conteúdo (templates `PERFIL` e `HISTORICO-PERFIL`).
- Lista de itens a redirecionar quando uma mudança é confirmada.
- Rascunho de aviso à equipe, quando "Como comunicar" do perfil pedir.

## Ações

| Ação | O que faz |
|---|---|
| `contexto <empresa>/<area>/<equipe>` | Grava o contexto ativo pela camada de integração (no Claude Code: `node .claude/scripts/kanon-perfil.js --contexto <caminho> [--empresas <raiz>]`; sem `--empresas`, reaproveita a raiz já gravada). Recusa pasta inexistente e caminho com `.` ou `..`; numa cadeia ainda sem perfil, grava e avisa que o próximo passo é `criar`. |
| `criar` | Entrevista guiada, uma pergunta por vez, seção a seção do template `PERFIL`: papéis, ferramentas por capacidade, como comunicar, processos, regras locais, validade. Pergunta só o que difere do nível de cima. Grava o perfil e uma entrada `migração` ou `criação` no histórico. |
| `propor` | Registra no histórico uma entrada com `Decisão: pendente` e apresenta a proposta a uma pessoa. Se já houver entrada recusada com a mesma mudança e a mesma fonte, não propõe de novo. |
| `confirmar` / `recusar` | Aplica (ou não) a mudança no `perfil.md`, preenche a decisão com quem e quando, e, ao confirmar, roda o tratamento de impacto. |
| `revisar` | Percorre primeiro as propostas `pendente` da cadeia (decidir: confirmar, recusar ou manter pendente com motivo) e depois os dados vencidos do perfil efetivo, um a um: confirma (atualiza `confirmado_em`), corrige (vira proposta) ou marca como desconhecido. |

## Regras principais
- **Gatilhos de proposta**: frase de mudança em reunião (`43-meeting-intake`, `44-topic-enrichment`): "o novo PO é…", "a partir de agora…", "vamos migrar…"; aceite ou aprovação vinda de quem não está no perfil; canal do perfil que não existe mais; dado vencido; pedido direto do usuário.
- **Proposta traz**: antes → depois, nível, fonte (`arquivo:linha`, link, ou a fala com reunião e data) e impacto previsto (campo próprio no histórico). Sem fonte, não é proposta — é pergunta.
- **Proposta pendente trava o dado**: enquanto houver proposta `pendente` sobre um papel, ferramenta, canal ou processo, a skill que depende dele pergunta a uma pessoa antes de agir (ex.: a quem pedir o aceite) — nunca segue com o valor antigo em silêncio. O runtime lista as pendentes no boot.
- **Tratamento de impacto**, ao confirmar:
  - troca de pessoa: US aguardando aceite de **qualquer ocupante anterior do papel** (não só o último — o histórico diz quem foram) → refazer o pedido; handoffs endereçados a eles → reenviar; rascunhos não enviados que os mencionam → corrigir; uma mesma pessoa pode ocupar outros papéis, então só entra o que depende dela **no papel que mudou**;
  - troca de ferramenta: artefatos que ainda apontam para a ferramenta antiga;
  - troca de processo ou canal: itens em andamento que seguiam a regra antiga.
  A skill lista e propõe; não reenvia nem republica sem aceite. No histórico, "Impacto tratado" registra o que foi listado e, item a item, o que já foi redirecionado; o que ainda não foi fica como pendência explícita.
- **Comunicação da mudança** segue "Como comunicar" do perfil (canal, formato, quem envia).
- **Cada pessoa e canal registrado entra em `nomes_reservados`** do mesmo nível, inclusive variantes e apelidos conhecidos (as pessoas de `papeis` já são barradas automaticamente). **Quem sai nunca é removido** — removê-lo reabriria o nome no núcleo.
- Não reservar nome de papel nem termo com menos de 3 letras ("PO", "QA": o gate os ignora) nem palavra comum da língua; ao registrar um nome que também é palavra comum, avisar que o Selo I passará a barrá-la em `.kanon/`.
- **Contato ausente** na fonte: o campo fica sem valor e a proposta pergunta o contato de trabalho; nunca se reaproveita o da pessoa anterior. `desde` é a data da fonte; `confirmado_em`, a da confirmação.
- **Regra local × melhoria do núcleo** conforme `process/17`.
- Nunca grava segredo, token ou dado pessoal além de nome e contato de trabalho.

## Depende de
- `process/17-company-profile.md`, `process/13-external-integration-prerequisite.md`, `templates/PERFIL.template.md`, `templates/HISTORICO-PERFIL.template.md`, `43-meeting-intake`, `44-topic-enrichment`.

## Procedimento em caso de falha
Sem contexto ativo e fora do repositório de conteúdo, a skill pergunta qual nível atender e não escolhe sozinha. Frontmatter fora da gramática: a skill reporta a linha e não escreve até a correção. Proposta sem resposta humana fica `pendente` no histórico, aparece na linha do boot e é a primeira coisa do próximo `revisar`.
