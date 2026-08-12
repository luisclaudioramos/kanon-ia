# 13 — External Integration Prerequisite

## Propósito
Impedir que uma Feature alcance a etapa de Publicação (`skills/16`, `21`, `31`) ou de Pull Request (`skills/34`) sem que a ferramenta externa correspondente esteja configurada — e, quando não estiver, orientar ativamente a configuração em vez de pular a etapa em silêncio.

## Quando se aplica
Antes de qualquer skill de publicação (Azure DevOps, Notion, Outline) e antes de `34-pull-request-review` tentar criar um PR real.

## Regras
- Publicação exige pelo menos uma integração configurada (Azure DevOps, Notion ou Outline) — ver `skills/setup/SKILL.md` para o procedimento de configuração.
- Pull Request exige acesso funcional ao repositório remoto (MCP de git/DevOps, ou CLI autenticado como `gh`/`az repos`) — sem isso, `34-pull-request-review` não tem como abrir um PR real.
- Se a integração/acesso não estiver disponível, o harness não pula a etapa silenciosamente: orienta ativamente a configuração, com os passos concretos necessários.
- Se, mesmo orientado, o usuário decidir prosseguir sem configurar agora, isso é aceito como **exceção explícita e registrada** — mesmo padrão de `05-definition-of-done.md`: quem decidiu, quando, e o item pendente listado. Nunca um skip que não deixa rastro.
- Pull Request deixa de ser opcional para o encerramento de uma Feature: `09-feature-state-management` não move uma Feature para `done` sem um PR real associado, a menos que a exceção acima tenha sido registrada.

## Sinais de violação
- Uma Feature em `done` sem PR e sem exceção registrada.
- Uma skill de publicação relatando "pulado" sem ter oferecido o caminho de configuração primeiro.

## Procedimento em caso de falha
Se a ferramenta/acesso não estiver disponível e o usuário não configurar nem registrar uma exceção explícita, a skill correspondente fica bloqueada nessa etapa — não avança como se a publicação/PR tivesse acontecido.

## Exemplo concreto

**Errado** — pulo silencioso:
```
Etapa de Publicação: sem Azure DevOps configurado.
(segue para a etapa seguinte sem avisar nem registrar nada)
```

**Certo** — orientação, depois exceção explícita se for o caso:
```
Etapa de Publicação: nenhuma integração configurada.
→ Oferece configurar Azure DevOps, Notion ou Outline agora (skills/setup/SKILL.md).
→ Usuário decide não configurar agora.
→ Exceção registrada: "Publicação adiada — decisão de <usuário>, <data>, motivo: sem acesso à conta corporativa nesta sessão."
```
