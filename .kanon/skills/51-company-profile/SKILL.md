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
| `contexto <empresa>/<area>/<equipe>` | Grava o contexto ativo pela camada de integração (no Claude Code: `node .claude/scripts/kanon-perfil.js --contexto <caminho> --empresas <raiz>`). Recusa pasta inexistente. |
| `criar` | Entrevista guiada, uma pergunta por vez, seção a seção do template `PERFIL`: papéis, ferramentas por capacidade, como comunicar, processos, regras locais, validade. Pergunta só o que difere do nível de cima. Grava o perfil e uma entrada `migração` ou `criação` no histórico. |
| `propor` | Registra no histórico uma entrada com `Decisão: pendente` e apresenta a proposta a uma pessoa. Se já houver entrada recusada com a mesma mudança e a mesma fonte, não propõe de novo. |
| `confirmar` / `recusar` | Aplica (ou não) a mudança no `perfil.md`, preenche a decisão com quem e quando, e, ao confirmar, roda o tratamento de impacto. |
| `revisar` | Percorre os dados vencidos do perfil efetivo, um a um: confirma (atualiza `confirmado_em`), corrige (vira proposta) ou marca como desconhecido. |

## Regras principais
- **Gatilhos de proposta**: frase de mudança em reunião (`43-meeting-intake`, `44-topic-enrichment`): "o novo PO é…", "a partir de agora…", "vamos migrar…"; aceite ou aprovação vinda de quem não está no perfil; canal do perfil que não existe mais; dado vencido; pedido direto do usuário.
- **Proposta traz**: antes → depois, nível, fonte (`arquivo:linha` ou link) e impacto previsto. Sem fonte, não é proposta — é pergunta.
- **Tratamento de impacto**, ao confirmar:
  - troca de pessoa: US aguardando aceite da pessoa anterior → refazer o pedido; handoffs endereçados a ela → reenviar; rascunhos não enviados que a mencionam → corrigir;
  - troca de ferramenta: artefatos que ainda apontam para a ferramenta antiga;
  - troca de processo ou canal: itens em andamento que seguiam a regra antiga.
  A skill lista e propõe; não reenvia nem republica sem aceite.
- **Comunicação da mudança** segue "Como comunicar" do perfil (canal, formato, quem envia).
- **Cada pessoa e canal registrado entra em `nomes_reservados`** do mesmo nível.
- **Regra local × melhoria do núcleo** conforme `process/17`.
- Nunca grava segredo, token ou dado pessoal além de nome e contato de trabalho.

## Depende de
- `process/17-company-profile.md`, `process/13-external-integration-prerequisite.md`, `templates/PERFIL.template.md`, `templates/HISTORICO-PERFIL.template.md`, `43-meeting-intake`, `44-topic-enrichment`.

## Procedimento em caso de falha
Sem contexto ativo e fora do repositório de conteúdo, a skill pergunta qual nível atender e não escolhe sozinha. Frontmatter fora da gramática: a skill reporta a linha e não escreve até a correção. Proposta sem resposta humana fica `pendente` no histórico e reaparece no próximo `revisar`.
