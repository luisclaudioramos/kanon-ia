# CI/CD

## Pipeline mínimo
Toda mudança passa por build + lint + testes automatizados antes de poder ser mesclada (`10-ci-cd-deploy.md`) — o gate mais básico e, ao mesmo tempo, o mais frequentemente ausente em projetos que cresceram sem ele. Um pipeline configurado mas que nunca bloqueia (ex. rodado só informativamente) não é um gate — é ruído.

## Estrutura de referência
- **Jobs separados**: `lint`, `test`, `build`, `docker-build-and-push` (se aplicável), `deploy` (condicional por ambiente/branch).
- **Gatilhos**: push/PR para as branches definidas em [Ambientes e Branches](08-ambientes-e-branches.md).
- **Segredos de deploy** (credenciais de registry, cluster) via mecanismo de secrets da própria ferramenta de CI — nunca em texto plano no workflow.

## Containerização e deploy (quando aplicável)
- Dockerfile multi-stage: build da aplicação numa imagem, servida por outra menor (ex. Nginx) — evita carregar toolchain de build na imagem final.
- Kubernetes (ou equivalente) com manifests separados por ambiente, ou Helm/Kustomize para parametrizar; ConfigMaps para variáveis de ambiente.
- Terraform (ou equivalente) para infraestrutura provisionada como código, com estado remoto — nunca infraestrutura criada manualmente num console sem registro versionado.

## Adequar à ferramenta de CI real do time
Esta referência é agnóstica de provedor (GitHub Actions, Azure DevOps, GitLab CI, etc.) — a estrutura de jobs/gates se aplica a qualquer um; os detalhes de sintaxe de workflow são específicos da ferramenta realmente usada pelo projeto.
