---
nomes: [kubectl]
capacidades: [implantacao, observabilidade]
---
# Kubernetes — adaptador

Atende as capacidades `implantacao` (o que está rodando agora) e `observabilidade` (log do processo e eventos que não chegam ao centralizador de logs) de [`.kanon/process/17-company-profile.md`](../../.kanon/process/17-company-profile.md). Usado pela triagem de `skills/32-report-bug` (perguntas 2 e 5). Clusters, namespaces e nomes de deployment por sistema em `<empresa>/kanon/investigacao.md`.

## Como conectar
`kubectl` com o contexto do cluster, obtido pelo provedor de nuvem (ex.: `gcloud container clusters get-credentials`). O login no provedor é **interativo** e feito pela pessoa (no Claude Code: `! gcloud auth login`).

## Teste de conexão
`kubectl --context <ctx> -n <namespace> get deploy` → lista. Erro de reautenticação = a pessoa precisa refazer o login.

## Como consultar
Só verbos de leitura (`get`, `describe`, `logs`, `top`, `rollout history`):
- **Versão rodando**: `kubectl get deploy <nome> -o jsonpath='{.spec.template.spec.containers[*].image}'`; histórico com `rollout history`.
- **Instâncias, escala e reinícios**: `get pods`, `get hpa`, `describe pod` (eventos, `OOMKilled`, `CrashLoopBackOff`).
- **Log do processo**: `kubectl logs <pod> --since=<janela>`; para falha de inicialização, `logs --previous` ou `logs -f` acompanhando a próxima execução, porque o pod de execução curta some pouco depois de terminar.

Alternativa sem cluster: a versão implantada pela esteira ([`jenkins.md`](jenkins.md), [`github.md`](github.md)) e o log centralizado ([`kibana.md`](kibana.md)).

## Restrições de acesso
- Login interativo no provedor, que expira: a skill não consegue renovar sozinha.
- Pode exigir a VPN para alcançar o endereço do cluster.
- Nunca `delete`, `scale`, `rollout restart`, `edit` ou `exec` para investigar.
- Produção: só leitura e só com pedido explícito.

## Caminho alternativo
Sem login: os caminhos da seção "Alternativa sem cluster". Nunca configurado: `process/13`.
