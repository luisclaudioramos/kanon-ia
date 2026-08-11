# Segurança

## Princípios básicos
- Nunca confie em input do usuário — valide e sanitize sempre na borda do sistema.
- Princípio do menor privilégio: cada componente/usuário/serviço deve ter apenas as permissões estritamente necessárias.
- Defesa em profundidade: não confie em uma única camada de proteção.

## Vulnerabilidades comuns ([OWASP](GLOSSARIO.md#owasp) Top 10)
- **Injeção (SQL, comando, etc.)**: use queries parametrizadas/prepared statements; nunca monte SQL por concatenação de string.
- **[XSS](GLOSSARIO.md#xss)**: escape/sanitize saída renderizada em HTML; use frameworks que escapam por padrão.
- **Quebra de autenticação/sessão**: use bibliotecas testadas para [hash](GLOSSARIO.md#hash) de senha (bcrypt/argon2), nunca invente seu próprio esquema de auth.
- **Exposição de dados sensíveis**: criptografe dados sensíveis em trânsito ([TLS](GLOSSARIO.md#tls)) e em repouso; nunca logue senhas, tokens ou dados pessoais sensíveis.
- **[CSRF](GLOSSARIO.md#csrf)/[SSRF](GLOSSARIO.md#ssrf)**: use tokens anti-CSRF em formulários; valide destinos de requisições feitas pelo servidor.
- **Configuração insegura**: desative debug/stack traces detalhados em produção; não use credenciais padrão.

## Segredos e credenciais
- Nunca commite segredos no repositório — use variáveis de ambiente ou um cofre de segredos (Vault, AWS Secrets Manager, etc.).
- Rotacione credenciais expostas imediatamente, mesmo que o commit tenha sido revertido (o segredo já está no histórico do Git).
- Use [scanning](GLOSSARIO.md#scanning) automático de segredos no CI (gitleaks, truffleHog).

## Dependências
- Mantenha dependências atualizadas; use ferramentas de scanning de vulnerabilidades (Dependabot, Snyk, `npm audit`).
- Avalie a confiabilidade/manutenção de uma dependência antes de adicioná-la — cada dependência é superfície de ataque adicional.

## Logs e auditoria
- Logue eventos de segurança relevantes (login, falha de autenticação, mudanças de permissão) sem logar dados sensíveis.
- Tenha um plano de resposta a incidentes definido antes de precisar dele.
