# Controle de Versão (Git)

## Commits
- Mensagens de commit sempre em inglês, mesmo que a comunicação do time seja em outro idioma — mantém consistência com o código (ver [Estilo de Código](02-estilo-de-codigo.md)) e com o histórico legível por qualquer colaborador ou ferramenta externa.
- Commits pequenos e atômicos: cada commit representa uma mudança lógica completa e coerente.
- Mensagens de commit no imperativo, explicando o *porquê*, não apenas o *o quê* (`git diff` já mostra o quê).
  - Formato sugerido: linha de resumo (~50 caracteres) + linha em branco + corpo explicando motivação/contexto quando necessário.
- Não misture mudanças não relacionadas no mesmo commit (ex.: refactor + feature nova).
- Evite commits "WIP", "fix", "ajuste" sem contexto — se usar, faça [squash](GLOSSARIO.md#squash) antes de mesclar.

## Branches
- Nomes de branch em inglês, seguindo o mesmo padrão do código e dos commits (`feature/checkout-pix`, `fix/race-condition-cache`).
- Uma branch por feature/fix, com nome descritivo.
- Mantenha branches curtas em duração — branches longas divergem muito da main e geram merges dolorosos.
- Sincronize com frequência ([`rebase`](GLOSSARIO.md#rebase)/`merge` da main) para evitar conflitos grandes no final.

## Pull Requests
- [PRs](GLOSSARIO.md#pr) pequenos e focados são revisados mais rápido e com mais qualidade do que PRs enormes.
- Descreva o *quê* e o *porquê* na descrição do PR; inclua como testar.
- Não deixe PRs abertos por muito tempo — quanto mais tempo aberto, maior a chance de conflito e mais difícil o contexto fica para revisar.

## Boas práticas gerais
- Nunca commite segredos (chaves de API, senhas, tokens) — use `.gitignore` e ferramentas de scanning de segredo.
- Nunca reescreva histórico de branches compartilhadas ([`push --force`](GLOSSARIO.md#force-push)) sem alinhar com o time.
- Use tags/releases semânticas (`v1.2.0`) para marcar versões publicadas.
- Prefira `git revert` a `git reset --hard` em código já compartilhado — reverter preserva histórico e é seguro em branches públicas.

## Convenções úteis
- [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`) padronizam mensagens e permitem gerar changelog automaticamente.
- `.gitignore` bem configurado desde o início do projeto evita lixo (node_modules, build, .env) no histórico.
