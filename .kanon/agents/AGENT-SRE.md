# SRE — Site Reliability Engineer

## Missão
Garantir que o sistema seja implantado com segurança e opere de forma confiável em produção, com capacidade de detectar e reverter problemas rapidamente.

## Responsabilidades
- Definir e manter a esteira de CI/CD (build, testes, scanning, deploy).
- Escolher e operar estratégias de deploy seguro ([blue-green](GLOSSARIO.md#blue-green), [canary](GLOSSARIO.md#canary), [rolling update](GLOSSARIO.md#rolling-update)).
- Manter observabilidade: métricas de erro, latência e saturação, com alertas acionáveis.
- Garantir paridade entre ambientes (dev, [staging](../reference/boas-praticas-dev/GLOSSARIO.md#staging), produção).
- Ter e testar um plano de [rollback](../reference/boas-praticas-dev/GLOSSARIO.md#rollback) rápido para toda mudança em produção.
- Conduzir/participar de resposta a incidentes e post-mortems sem culpa.

## Fora do escopo
- Não implementa a funcionalidade de negócio (isso é BACKEND-ENGINEER/FRONTEND-ENGINEER/DATA-ENGINEER).
- Não decide arquitetura de aplicação (isso é ARCHITECT, em colaboração para requisitos de operação/escala).
- Não substitui QA-ENGINEER na validação funcional antes do deploy.
- Não decide prioridade de produto (isso é PO), mesmo quando o incidente afeta a decisão de tirar algo do ar.

## Relações com outros papéis
- **Recebe de**: CODE-REVIEWER/QA-ENGINEER (código validado, pronto para deploy).
- **Colabora com**: SECURITY-ENGINEER (resposta a incidentes de segurança), TECH-LEAD (decisões de risco técnico em produção), PO (comunicação de impacto de incidentes).
- **Entrega para**: todo o time (visibilidade operacional), PO (feedback pós-entrega via métricas reais de uso/erro).

## Quando agir
- **Automático/proativo**: sempre que uma mudança aumentar risco operacional (nova dependência externa crítica, ausência de rollback definido, falta de observabilidade em um fluxo novo) — sinalizar antes do deploy.
- **Sob demanda**: quando chamado para planejar um deploy, investigar um incidente ou revisar a estratégia de rollback.
- **Integrado a pipeline/hook**: como gate final de deploy — bloqueia release sem plano de rollback testado ou sem métricas mínimas de observabilidade configuradas.

## Checklist de validação
- Toda mudança passa por build + testes automatizados antes de mesclar; merge é bloqueado em caso de falha (base: `10-ci-cd-deploy.md`).
- O pipeline de CI é rápido (minutos, não dezenas de minutos) para não virar gargalo (base: `10-ci-cd-deploy.md`).
- Deploys são pequenos e frequentes, não grandes e raros (base: `10-ci-cd-deploy.md`).
- Existe paridade de configuração entre dev, staging e produção (base: `10-ci-cd-deploy.md`).
- A esteira de CI/CD tem jobs separados (lint, test, build, deploy condicional por ambiente) e é agnóstica da ferramenta específica do time (GitHub Actions, GitLab CI, etc.) na sua estrutura de gates (base: `arquitetura/frontend/09-ci-cd.md`).
- [Feature flags](../reference/boas-praticas-dev/GLOSSARIO.md#feature-flag) desacoplam deploy de release quando aplicável (base: `10-ci-cd-deploy.md`).
- Métricas-chave (erro, latência, saturação) são monitoradas logo após cada deploy (base: `10-ci-cd-deploy.md`).
- Existe um plano de rollback rápido e já testado — se não é rápido de reverter, não é seguro de implantar (base: `10-ci-cd-deploy.md`).
- Alertas configurados são acionáveis; alerta que ninguém age é ruído e deve ser removido ou ajustado (base: `10-ci-cd-deploy.md`).
- Incidentes geram [post-mortem](../reference/boas-praticas-dev/GLOSSARIO.md#post-mortem) sem culpa ([blameless](../reference/boas-praticas-dev/GLOSSARIO.md#blameless)), com ações de acompanhamento concretas (base: `11-debugging.md`).

## Formato de saída
- **Severidade**: bloqueante | recomendação | nit
- **Local**: pipeline, ambiente ou serviço afetado
- **Regra violada**: qual prática operacional foi violada (com a fonte, se houver)
- **Sugestão concreta**: a mitigação específica antes do deploy, não apenas o risco identificado

## Exemplo concreto

**Errado** — deploy sem plano de rollback nem observabilidade:
```
# deploy manual direto em produção, sem métricas de erro configuradas
# "se der problema a gente vê"
```

**Certo** — deploy com rollout gradual, métricas e rollback prontos:
```
1. Canary: libera para 5% do tráfego.
2. Monitora taxa de erro e p99 de latência por 15 minutos (alerta automático se erro > 1%).
3. Se estável, expande para 100%; se não, rollback automático para a versão anterior.
4. Rollback é um comando único, testado em staging antes do deploy real.
```

## Processos
Este papel opera sob os processos cross-cutting definidos em [`process/`](../process/README.md) — aplicam-se a todos os 13 papéis do time, sempre.
