# 13 — Code Review

## Propósito
Acionar o CODE-REVIEWER para analisar o código implementado, verificando padrões, segurança, desempenho e aderência aos Acceptance Criteria. Gera um relatório de aprovação ou apontamentos.

## Fase / Posição no fluxo
Fase 3 — Governança, Qualidade e Transições. Roda depois da implementação ([`12-development-execution`](../12-development-execution/SKILL.md)) e é pré-requisito para [`34-pull-request-review`](../34-pull-request-review/SKILL.md).

## Entradas
- Diff/PR produzido pela implementação.

## Saídas
- Relatório de achados em [`templates/CODE-REVIEW-REPORT.template.md`](../../templates/CODE-REVIEW-REPORT.template.md), envelopado no formato do return envelope (aprovação ou apontamentos com severidade).
- **Consolidação para o revisor humano** (a resposta no chat, antes do envelope): sempre abre com a **Ficha da PR** do template (link, aberta por/em, repositório e branches, US/Bug com link, resumo da descrição, iteração revisada, aprovações exigidas, quem já aprovou e quem falta) e segue com os **Problemas encontrados**, cada um com problema em texto claro, impacto e sugestão de correção. Vale também quando não há iteração nova desde a última revisão: a ficha mostra o estado atual e os problemas que seguem abertos.
- Quando o PR já existe: rascunho da rodada em [`templates/PR-REVIEW-ROUND.template.md`](../../templates/PR-REVIEW-ROUND.template.md), salvo como `REVIEW-PR-<número>.md` na pasta da Feature — o parecer da rodada (veredito, distância para a aprovação, matriz de rastreabilidade AC × código × teste, pontos fortes, achados com id `TIPO-NN` e severidade 🔴/🟠/🟡/⚪, proteções removidas, conformidade, perguntas, auditorias de teste e de banco, follow-ups, notas de execução e declaração de varredura), o corpo do voto e uma thread por achado com o critério que a fecha. Escrito para o leitor declarado, com a lógica dos outros sistemas citada dentro do texto. Rodada nova: julga cada apontamento contra o critério publicado (aceito, recusado ou reaberto) e acrescenta a seção da rodada no mesmo arquivo. O rascunho fica em `RASCUNHO` até a revisão humana; quem publica é [`34-pull-request-review`](../34-pull-request-review/SKILL.md).

## Regras principais
- Aciona [`agents/AGENT-CODE-REVIEWER.md`](../../agents/AGENT-CODE-REVIEWER.md), que segue o processo formal descrito lá: aderência à spec primeiro, depois checklist de qualidade (corretude, legibilidade, segurança, testes, arquitetura), depois quality checks automatizados do projeto-alvo.
- **Portão de entrada**: antes da aderência à spec, confere as 13 travas de [`process/15-pull-request-gates.md`](../../process/15-pull-request-gates.md) (passo 0 do processo de revisão do `AGENT-CODE-REVIEWER`). Vale para PR de qualquer autor. Cada trava 🔴 violada entra no rascunho da rodada (`PR-REVIEW-ROUND`) como achado bloqueante com o número e o nome da trava; cada 🟡 entra como alerta. "N/A" sem motivo é trava violada. PR aberta antes da vigência só é cobrada a partir da primeira iteração posterior a ela.
- **Trava 13 no diff**: lê o perfil de design dos sistemas tocados (`skills/50-design-profile`) e confere as regras de [`process/16-design-foundations.md`](../../process/16-design-foundations.md) só no que a PR introduz, citando `arquivo:linha`: literais de cor, tamanho e fonte contra os tokens (D3); componente novo contra a biblioteca e os componentes existentes (D4, D5); `max-width` e larguras fixas (D2); uso novo de uma função contra o padrão do perfil (D6); pranchas da PR (D1). Legado encontrado não vira achado: vai como sugestão de inventário, com o ok do Tech Lead.
- **Teste de mutação em toda revisão**: aciona [`agents/AGENT-QA-ENGINEER.md`](../../agents/AGENT-QA-ENGINEER.md) para rodar o teste de mutação no código alterado da PR (seção "Teste de mutação na revisão de PR" do agente). Vale para PR de qualquer autor. Mutante sobrevivente vira achado de **recomendação** com o teste sugerido; só vira **bloqueante** em código crítico (valor ou prêmio, autorização, gravação irreversível, dado pessoal). Se o teste de mutação não puder rodar, o relatório registra "não executado" com o motivo, nunca "sem sobreviventes".
- **Severidade e bloqueio** seguem `templates/PR-REVIEW-ROUND.template.md`: 🔴 e 🟠 bloqueiam; 🟡 e ⚪ vão na thread consolidada `QLD-01`, que não bloqueia; 📋 follow-up fica no parecer, sem thread. Trava 🔴 de `process/15` violada entra como achado bloqueante; trava 🟡, como item da `QLD-01`. Mutante sobrevivente: 🟡 (ou 🔴 em código crítico).
- A consolidação no chat continua abrindo com a **Ficha da PR**; o parecer publicado abre com o veredito e a distância para a aprovação.
- O CODE-REVIEWER só relata achados — nunca edita o código revisado. Correção é sempre devolvida a quem implementou.
- O revisor nunca é a mesma sessão/agente que implementou a mudança (`process/14-decision-segregation.md`).
- Cada achado é retornado no formato de [`process/07-return-envelope.md`](../../process/07-return-envelope.md).
- Roda depois de [`37-validate-code-style`](../37-validate-code-style/SKILL.md), que já filtrou problemas rasos de formatação.
- Um achado que depende de lógica de outro repositório (BFF, API, worker) só entra no rascunho de threads depois de **lido no código desse repositório**, na branch principal atualizada — nunca inferido do nome do endpoint. O trecho lido é o que vai citado no comentário (`process/12-knowledge-retrieval.md`).
- O rascunho de threads nunca cita documento interno (spec, plano, transcrição, vault). O que o leitor precisa saber vai dentro do comentário; decisão de negócio entra como "combinado com _pessoa_ em _data_" (seção "Comentários publicados no PR" de `agents/AGENT-CODE-REVIEWER.md`).

## Depende de
- `agents/AGENT-CODE-REVIEWER.md`, `agents/AGENT-QA-ENGINEER.md`, `process/07-return-envelope.md`, `process/11-subagent-anti-hallucination.md`, `process/12-knowledge-retrieval.md`, `process/14-decision-segregation.md`, `process/15-pull-request-gates.md`, `templates/CODE-REVIEW-REPORT.template.md`, `templates/PR-REVIEW-ROUND.template.md`, `37-validate-code-style`.

## Procedimento em caso de falha
Se a skill não conseguir acessar o diff completo, retorna `status: blocked` no envelope — nunca revisa "de memória" ou aprova sem ver o código real (ver `process/11-subagent-anti-hallucination.md`).
