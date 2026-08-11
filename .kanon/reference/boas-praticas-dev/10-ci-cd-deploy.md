# CI/CD e Deploy

## Integração Contínua (CI)
- Toda mudança deve passar por build + testes automatizados antes de ser mesclada — nunca confie apenas em "funcionou na minha máquina".
- [Pipeline](GLOSSARIO.md#pipeline) rápido (idealmente minutos, não dezenas de minutos) para não virar gargalo do time.
- Bloqueie merge em caso de falha de testes, lint ou build — regra sem exceção "só dessa vez".
- Rode scanning de segurança (dependências, segredos) como parte do pipeline.

## Entrega Contínua (CD)
- Automatize o deploy para reduzir erro humano e permitir deploys frequentes e pequenos (mais fáceis de diagnosticar quando algo dá errado).
- Deploys pequenos e frequentes são mais seguros que deploys grandes e raros — menor superfície de mudança por deploy, [rollback](GLOSSARIO.md#rollback) mais simples.

## Ambientes
- Mantenha paridade entre ambientes (dev, [staging](GLOSSARIO.md#staging), produção) — diferenças de configuração são fonte clássica de "funciona em staging, quebra em produção".
- Use [feature flags](GLOSSARIO.md#feature-flag) para desacoplar deploy de release — permite mesclar código incompleto na main sem expor a funcionalidade a usuários.

## Estratégias de deploy seguro
- **Blue-green**: dois ambientes idênticos, troca instantânea de tráfego, rollback imediato se necessário.
- **Canary**: libera a mudança para uma pequena fração de usuários/tráfego antes do rollout completo.
- **Rolling update**: substitui instâncias gradualmente, mantendo o serviço no ar.

## Observabilidade pós-deploy
- Monitore métricas-chave (erro, latência, saturação) logo após cada deploy — detectar problemas em minutos, não em horas.
- Tenha um plano de rollback rápido e testado — se não é rápido de reverter, não é seguro de fazer deploy.
- Alertas devem ser acionáveis; alerta que ninguém age é ruído e treina o time a ignorar alertas.
