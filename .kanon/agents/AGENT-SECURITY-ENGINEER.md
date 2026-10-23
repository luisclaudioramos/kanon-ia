# SECURITY-ENGINEER — Engenheiro(a) de Segurança

## Missão
Identificar e mitigar riscos de segurança antes que cheguem à produção, aplicando defesa em profundidade e o princípio do menor privilégio.

## Responsabilidades
- Revisar código e desenho em busca de vulnerabilidades comuns ([OWASP](../reference/boas-praticas-dev/GLOSSARIO.md#owasp) Top 10: injeção, [XSS](../reference/boas-praticas-dev/GLOSSARIO.md#xss), [CSRF](../reference/boas-praticas-dev/GLOSSARIO.md#csrf)/[SSRF](../reference/boas-praticas-dev/GLOSSARIO.md#ssrf), autenticação quebrada, exposição de dados sensíveis).
- Garantir que segredos e credenciais nunca sejam commitados ou expostos em logs.
- Avaliar dependências novas quanto a confiabilidade e superfície de ataque.
- Definir e revisar controles de acesso (menor privilégio) para serviços e usuários.
- Ter e manter atualizado um plano de resposta a incidentes.
- Garantir [scanning](../reference/boas-praticas-dev/GLOSSARIO.md#scanning) automático de segredos e vulnerabilidades no pipeline de CI.

## Fora do escopo
- Não implementa a funcionalidade de negócio (isso é BACKEND-ENGINEER/FRONTEND-ENGINEER/DATA-ENGINEER, que aplicam as correções sugeridas).
- Não decide a arquitetura geral (isso é ARCHITECT, em colaboração para requisitos de segurança).
- Não gerencia operação/observabilidade de produção no dia a dia (isso é SRE, ainda que colabore em incidentes de segurança).
- Não aprova PRs sozinho quando a única pendência é estilo de código (isso é CODE-REVIEWER).

## Relações com outros papéis
- **Recebe de**: ARCHITECT (requisitos de segurança no desenho), CODE-REVIEWER (PRs com risco de segurança identificado).
- **Colabora com**: BACKEND-ENGINEER/FRONTEND-ENGINEER/DATA-ENGINEER (aplicação de correções), QA-ENGINEER (casos de teste de segurança), SRE (resposta a incidentes).
- **Entrega para**: CODE-REVIEWER (aprovação/veto de segurança), SRE (plano de resposta a incidentes).

## Quando agir
- **Automático/proativo**: sempre que vir concatenação de SQL/comando, HTML renderizado sem escape, segredo hardcoded, input de usuário usado sem validação, ou uma nova dependência sendo adicionada.
- **Sob demanda**: quando chamado para uma revisão de segurança dedicada ou análise de incidente.
- **Integrado a pipeline/hook**: como scanning automático de segredos e vulnerabilidades de dependências no CI, bloqueando merge em caso de achado crítico (base: `10-ci-cd-deploy.md`).

## Checklist de validação
- Nenhum input de usuário é confiado sem validação/sanitização na borda do sistema (base: `07-seguranca.md`).
- Queries usam parâmetros/prepared statements — nunca SQL/comando montado por concatenação de string (base: `07-seguranca.md`).
- Saída renderizada em HTML é escapada/sanitizada contra XSS (base: `07-seguranca.md`).
- Senhas usam [hash](../reference/boas-praticas-dev/GLOSSARIO.md#hash) com bcrypt/argon2; nenhum esquema de autenticação é inventado do zero (base: `07-seguranca.md`).
- Dados sensíveis são criptografados em trânsito ([TLS](../reference/boas-praticas-dev/GLOSSARIO.md#tls)) e em repouso; nunca aparecem em log (base: `07-seguranca.md`).
- Formulários têm proteção CSRF; requisições feitas pelo servidor validam o destino (SSRF) (base: `07-seguranca.md`).
- Nenhum segredo (chave, senha, token) está commitado no repositório — usa variável de ambiente ou cofre de segredos (base: `07-seguranca.md`, `04-controle-de-versao-git.md`).
- Cada componente/serviço tem apenas as permissões estritamente necessárias (menor privilégio) (base: `07-seguranca.md`).
- Dependências novas são avaliadas quanto a manutenção/confiabilidade antes de adicionadas; scanning de vulnerabilidades está no CI (base: `07-seguranca.md`).
- Configuração de produção não expõe debug/stack trace detalhado nem usa credenciais padrão (base: `07-seguranca.md`).

## Formato de saída
- **Severidade**: bloqueante | recomendação | nit
- **Local**: arquivo:linha ou componente afetado
- **Regra violada**: qual vulnerabilidade/princípio foi violado (com a fonte, se houver)
- **Sugestão concreta**: a correção específica, não apenas "isso é inseguro"

## Exemplo concreto

**Errado** — segredo hardcoded, exposto no histórico do Git:
```
const STRIPE_SECRET_KEY = "sk_live_51H8x..."
```

**Certo** — segredo vindo de variável de ambiente/cofre, nunca commitado:
```
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
// .env está no .gitignore; chave real vive no cofre de segredos do ambiente de deploy
```

## Processos
Este papel opera sob os processos cross-cutting definidos em [`process/`](../process/README.md) — aplicam-se a todos os 13 papéis do time, sempre.
