# 00 — Runtime Contract

## Propósito
Definir como o *harness* (ambiente de execução do sistema de agentes) é inicializado — variáveis de ambiente, caminhos absolutos e permissões iniciais — antes de qualquer skill ou agente ser acionado. É o primeiro arquivo lido: garante que o sistema saiba onde está e quais são seus limites.

## Quando se aplica
No boot de qualquer sessão/execução do sistema, antes de qualquer skill, hook ou agente atuar.

## Regras
- Antes de executar qualquer skill ou agente, o harness resolve e valida: variáveis de ambiente obrigatórias, caminhos absolutos do projeto (raiz, `skills/`, `hooks/`, `.kanon/`) e o conjunto de permissões concedidas para esta execução.
- Nenhuma skill ou agente pode assumir a existência de uma variável de ambiente ou caminho que não tenha sido declarado e validado por este contrato.
- Caminhos usados internamente são absolutos, não relativos ao diretório de onde o comando foi disparado — evita comportamento diferente dependendo de onde o usuário está.
- Este contrato define os limites do sistema (o que pode e não pode ser tocado) antes que qualquer agente comece a agir.
- O perfil efetivo da empresa é montado no boot ([`process/17-company-profile.md`](17-company-profile.md)); a sessão nunca supõe para qual empresa trabalha.
- **Repositório-alvo externo**: quando uma Feature mira um repositório fora de `.kanon/` (código real de um produto), o boot verifica a branch atual contra o conjunto padrão do projeto-alvo (`main`, `master`, `staging`, `qa`, `develop`, `release/*`, `hotfix/*`, ou o que o próprio repositório documentar em `CONTRIBUTING.md`/`AGENTS.md`) e a presença de mudanças não commitadas na árvore de trabalho. Encontrada uma anomalia (branch fora do padrão, árvore suja), o harness não segue como se nada tivesse acontecido: investiga a estratégia de branching já documentada no repositório-alvo ou propõe uma explicitamente, e considera `git worktree` como forma de isolar o trabalho do harness da árvore suja pré-existente do usuário, em vez de misturar mudanças.

## Sinais de violação
- Uma skill ou agente tentando acessar uma variável de ambiente ou caminho não declarado.
- Comportamento que muda dependendo do diretório de onde o comando foi chamado.
- Uma Feature avançando sobre um repositório-alvo com branch fora do padrão ou árvore suja sem que isso tenha sido sinalizado ao usuário.

## Procedimento em caso de falha
Se uma variável de ambiente obrigatória ou um caminho essencial não estiver disponível na inicialização, o harness interrompe a execução e reporta exatamente o que falta — nunca prossegue com um estado parcial ou assumido.

## Exemplo concreto

**Errado** — skill assume um caminho sem checar:
```
skill "gerar-runbook" lê arquivos em PROJECT_ROOT/runbooks/
(PROJECT_ROOT nunca foi validado; em outro ambiente, o caminho não existe e a skill falha silenciosamente)
```

**Certo** — validação no boot, antes de qualquer skill rodar:
```
Boot do harness:
  - PROJECT_ROOT resolvido e validado como caminho absoluto existente
  - SKILLS_DIR e HOOKS_DIR confirmados
  - se qualquer um estiver ausente: abortar com "Runtime contract violado: PROJECT_ROOT não definido"
```
