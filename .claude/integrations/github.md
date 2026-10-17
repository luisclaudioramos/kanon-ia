---
nomes: []
capacidades: [repositorio, implantacao]
---
# GitHub — adaptador

Atende as capacidades `repositorio` e `implantacao` de [`.kanon/process/17-company-profile.md`](../../.kanon/process/17-company-profile.md) para os sistemas hospedados no GitHub. Usado por `skills/13-code-review`, `34-pull-request-review` e pela triagem de `skills/32-report-bug` (perguntas 3, 5 e 6). Repositórios e workflows por sistema em `<empresa>/kanon/investigacao.md`.

## Como conectar
`gh` autenticado com a conta de quem usa o kanon, com acesso à organização.

## Teste de conexão
`gh auth status` e `gh repo view <org>/<repo>` → sem erro.

## Como consultar
- **Código**: cópia local em `<empresa>/kanon/investigacao.md`, atualizada com `git fetch`; ler na versão implantada (`git show <sha>:<arquivo>`). Sem cópia: `gh api repos/<org>/<repo>/contents/<arquivo>?ref=<sha>`.
- **Histórico** (pergunta 6): `git log -S`/`git log -L` na cópia local, `gh pr list --state merged --search <termo>`.
- **Versão implantada** quando a implantação é por workflow: `gh run list -R <org>/<repo> --workflow <workflow de implantação> -L 5 --json headSha,conclusion,createdAt`; o `headSha` da última execução com sucesso é o commit implantado. O workflow de mudança em produção, quando existe, liga o merge ao registro de mudança.

## Restrições de acesso
- Rede pública; não depende de VPN.
- A busca do GitHub recusa alguns filtros por usuário de outra conta; nesse caso, listar por repositório.
- Disparar workflow, comentar ou votar é escrita: só com pedido explícito.

## Caminho alternativo
Sem acesso ao repositório: pedir a cópia ou o acesso. Nunca configurado: `process/13`.
