# 13 — External Integration Prerequisite

## Propósito
Impedir que uma Feature alcance a etapa de Publicação (`skills/16`, `21`, `26`) ou de Pull Request (`skills/34`) sem que a ferramenta externa correspondente esteja configurada — e, quando não estiver, orientar ativamente a configuração em vez de pular a etapa em silêncio.

## Quando se aplica
Antes de qualquer skill de publicação (capacidades `trabalho` e `documentacao`), antes de `34-pull-request-review` tentar criar um PR real ou notificar pela capacidade `comunicacao`, e antes de `48-screen-validation` buscar telas numa fonte externa.

## Regras
- Publicação exige pelo menos uma integração configurada (uma capacidade de publicação registrada no perfil e com adaptador configurado) — ver `skills/setup/SKILL.md` para o procedimento de configuração.
- Pull Request exige acesso funcional ao repositório remoto (adaptador da capacidade `repositorio`) — sem isso, `34-pull-request-review` não tem como abrir um PR real.
- Notificação de aprovação (dentro de `34-pull-request-review`) exige a capacidade `comunicacao` configurada — diferente do PR em si, essa integração **não é bloqueante** para a Feature alcançar `done`: sem ela, a skill orienta a configuração, mas registra a notificação como pendente em `APPROVAL-NOTIFICATION-SUMMARY.md` em vez de bloquear.
- **Fontes de tela** (`skills/48-screen-validation`): cada fonte (acesso ao sistema, ferramenta de design, link publicado) depende da sua integração. Se faltar, a skill orienta a configuração **ou** usa o caminho alternativo — exportar a tela em imagem ou PDF e tratar como print. **Não é bloqueante**: a falta é registrada como exceção e revalidada na sessão seguinte, como as demais. A lista concreta de fontes, ferramentas e testes de conexão fica na camada de integração (no Claude Code: `.claude/integrations/screen-sources.md`).
- Se a integração/acesso não estiver disponível, o harness não pula a etapa silenciosamente: orienta ativamente a configuração, com os passos concretos necessários.
- Se, mesmo orientado, o usuário decidir prosseguir sem configurar agora, isso é aceito como **exceção explícita e registrada** — mesmo padrão de `05-definition-of-done.md`: quem decidiu, quando, e o item pendente listado. Nunca um skip que não deixa rastro.
- Pull Request deixa de ser opcional para o encerramento de uma Feature: `09-feature-state-management` não move uma Feature para `done` sem um PR real associado, a menos que a exceção acima tenha sido registrada.
- **Uma exceção registrada por falta de integração/acesso é revalidada no início de cada nova sessão antes de ser tratada como ainda válida** — configurar uma ferramenta (ex.: adicionar um servidor MCP) numa sessão não garante que ela já esteja utilizável nessa mesma sessão (ex.: MCP só carrega numa reconexão); a exceção não é permanente por padrão, é "válida até a próxima checagem". Reabrir a checagem é barato (tentar a ferramenta de novo); deixar a exceção parada por sessões inteiras sem revisitar não é. _Origem: uma Feature real em que a integração de trabalho foi configurada numa sessão, mas o PR só foi aberto na sessão seguinte, porque ninguém tinha revisitado a exceção entre elas._
- **Sem perfil da empresa**, nenhuma capacidade está configurada: as skills que dependem dela orientam a criação do perfil (`51-company-profile criar`) antes de orientar a ferramenta.

## Sinais de violação
- Uma Feature em `done` sem PR e sem exceção registrada.
- Uma skill de publicação relatando "pulado" sem ter oferecido o caminho de configuração primeiro.
- Uma exceção registrada há mais de uma sessão que nunca foi revisitada, mesmo com a integração potencialmente já disponível.

## Procedimento em caso de falha
Se a ferramenta/acesso não estiver disponível e o usuário não configurar nem registrar uma exceção explícita, a skill correspondente fica bloqueada nessa etapa — não avança como se a publicação/PR tivesse acontecido.

## Exemplo concreto

**Errado** — pulo silencioso:
```
Etapa de Publicação: sem a capacidade `trabalho` configurada.
(segue para a etapa seguinte sem avisar nem registrar nada)
```

**Certo** — orientação, depois exceção explícita se for o caso:
```
Etapa de Publicação: nenhuma integração configurada.
→ Oferece registrar a ferramenta da capacidade no perfil e configurar o adaptador agora (skills/51-company-profile, skills/setup/SKILL.md).
→ Usuário decide não configurar agora.
→ Exceção registrada: "Publicação adiada — decisão de <usuário>, <data>, motivo: sem acesso à conta corporativa nesta sessão."
```
