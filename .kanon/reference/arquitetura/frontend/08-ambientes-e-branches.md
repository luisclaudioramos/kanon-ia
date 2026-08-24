# Ambientes e Branches

## Política de branches de referência
- `develop` (ou equivalente) — desenvolvimento ativo.
- `staging` — pré-produção/homologação.
- `main` — produção.

Adaptar ao que o time e a ferramenta de CI/CD já usam — a política existe para dar previsibilidade a qual ambiente cada branch alimenta, não para impor um fluxo específico de Git por si só (ver `04-controle-de-versao-git.md`).

## Variáveis de ambiente
- Um `.env.example` na raiz documenta todas as variáveis necessárias, sem valores reais.
- Cada ambiente (`development`/`staging`/`production`) tem seu próprio arquivo de configuração de build, lido em tempo de build ou de execução conforme a stack.
- Segredos nunca são commitados — nem em `.env` real, nem em exemplo com valor plausível que alguém possa reusar por engano.

## Paridade entre ambientes
Diferenças de configuração entre ambientes são a fonte clássica de "funciona em staging, quebra em produção" (`10-ci-cd-deploy.md`) — manter o número de diferenças entre ambientes o menor possível, e documentar explicitamente as que forem inevitáveis.
