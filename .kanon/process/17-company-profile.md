# 17 — Company Profile

## Propósito
Separar o que o kanon é do lugar onde ele trabalha. O núcleo fala em **capacidades**; o perfil de cada empresa, área e equipe diz quem ocupa cada papel, qual ferramenta atende cada capacidade, como comunicar e quais processos seguir. A empresa muda — gente, processo, ferramenta — e o perfil acompanha, sempre com confirmação humana.

## Quando se aplica
Em toda sessão (o runtime monta o perfil efetivo) e em toda skill que precise de pessoa, canal, ferramenta ou processo da empresa.

## Capacidades

| Capacidade | Chave | O que cobre |
|---|---|---|
| Trabalho | `trabalho` | work items, test cases, comentários de work item |
| Documentação | `documentacao` | documentação de longo prazo publicada |
| Comunicação | `comunicacao` | mensagens, canais, rascunhos de aviso |
| Repositório e PR | `repositorio` | repositório remoto, pull requests, votos, histórico do código e as cópias locais usadas para ler código |
| Gestão de mudança | `mudanca` | pedido, aprovação e fechamento de mudança em produção |
| Fonte de design | `design` | telas e protótipos (ver `skills/48-screen-validation`) |
| Observabilidade | `observabilidade` | logs, métricas e consulta de produção |
| Dados | `dados` | banco de dados por ambiente, para consulta só de leitura |
| Implantação | `implantacao` | versão implantada em cada ambiente, esteira de implantação e estado do ambiente (instâncias, escala, filas) |

Cada capacidade aponta para um ou mais **adaptadores** da camada de integração (no Claude Code: `.claude/integrations/<adaptador>.md`; vários como lista, ex.: `implantacao: [a, b]`), que dizem como conectar, testar, publicar, **consultar** e o caminho alternativo. Todo adaptador usado para investigar tem as seções **Como consultar**, com mais de um caminho em ordem de preferência, e **Restrições de acesso** (rede, credencial, login interativo, limites), conferidas na data registrada. Os valores da empresa (endereços, identificadores de conexão, nomes de job) ficam em `<empresa>/kanon/investigacao.md`, e as credenciais no `.env` da empresa. Nenhum arquivo de `.kanon/` cita ferramenta, empresa, pessoa ou canal pelo nome.

## Onde fica o perfil
No repositório de conteúdo, numa pasta `kanon/` em cada nível:

```
<empresa>/kanon/
<empresa>/<area>/kanon/
<empresa>/<area>/<equipe>/kanon/
    perfil.md       estado atual (template: templates/PERFIL.template.md)
    historico.md    toda mudança (template: templates/HISTORICO-PERFIL.template.md)
```

## Regras
- **Herança**: equipe herda da área, que herda da empresa. Cada nível escreve só o que difere; o mais específico prevalece. `papeis` se juntam pelo nome do papel (um papel pode ter várias pessoas no mesmo nível; o nível mais específico que cita o papel troca o conjunto inteiro dele); `ferramentas`, `branches` e `validade` se juntam chave a chave; `nomes_reservados` somam.
- **Dados estruturados no frontmatter**, numa gramática restrita para ser lida sem biblioteca: `chave: valor`; `chave: [a, b]` ou lista em bloco (`  - a`); mapa de um nível (`  sub: valor`); lista de mapas (`  - papel: PO` seguido de `    pessoa: …`). Valor com `: ` vai entre aspas. Sem comentário na mesma linha do valor. O resto do perfil é Markdown.
- **Validade padrão**: papéis 30 dias, ferramentas 180 dias, ajustável em `validade`. Papel sem `confirmado_em` conta como vencido.
- **Dado ausente ou vencido não é suposto**: a skill que depende dele pergunta antes de agir e chama `51-company-profile propor`.
- **Só a skill 51 escreve no perfil.** As demais leem o perfil efetivo e propõem.
- **Nada entra sem confirmação humana.** Proposta recusada também vai para o histórico.
- **Regra local × melhoria do núcleo**: pedido para o kanon agir diferente que só vale para aquele nível vai para "Regras locais" do perfil; pedido que valeria para qualquer empresa vira proposta de mudança no núcleo, registrada para decisão do mantenedor do kanon.
- **Públicos**: a seção "Públicos" do perfil liga cada público de `reference/comunicacao/02-publicos.md` a um papel ou grupo e a um canal. Herda como as tabelas de comunicação: o nível mais específico que cita um público troca a linha inteira dele. Público ausente em toda a cadeia é "não registrado" e a skill que precisar dele pergunta.
- **Decisões técnicas**: a pasta dos ADRs de cada projeto fica em "Processos > Decisões técnicas" do perfil; sem valor, `decisions/` na pasta do projeto (`reference/boas-praticas-dev/06-documentacao.md`).
- **`nomes_reservados`** lista os nomes próprios do nível (empresa, área, equipe, pessoas, canais) que nunca podem aparecer em `.kanon/` — a lista alimenta o Selo I ampliado (`process/10`). A skill 51 acrescenta cada pessoa e canal que registra.
- **Nunca no perfil**: segredo, token, credencial, dado pessoal além de nome e contato de trabalho, procedimento técnico de ferramenta (vai no adaptador).
- **Sem perfil**: modo neutro. Skills que não dependem da empresa rodam; as que dependem (publicar, notificar, pedir aceite) param e orientam a criação do perfil, como `process/13` faz para integração ausente.

## Sinais de violação
- Nome de empresa, pessoa, canal ou ferramenta escrito em `.kanon/`.
- Skill que pede aceite, publica ou notifica usando dado vencido sem perguntar.
- Perfil alterado sem entrada correspondente no `historico.md`.

## Procedimento em caso de falha
Perfil ilegível (frontmatter fora da gramática, arquivo sem permissão de leitura): os hooks de branch voltam ao padrão seguro; o Selo I, que lê os perfis de todas as empresas conhecidas, **bloqueia** toda escrita em `.kanon/` (fail-closed) com uma mensagem que nomeia o perfil a corrigir — tratá-lo como ausente abriria o núcleo aos nomes dele. O boot avisa os perfis ilegíveis da árvore inteira, não só os da cadeia ativa. A skill que precisava do perfil reporta a linha que não pôde ser lida e para. Contexto ativo apontando para pasta inexistente: o runtime avisa e pede um contexto válido.

## Exemplo concreto

**Errado** — skill com ferramenta e canal fixos:
```
Notificar o PR no canal #aprovacoes da ferramenta de chat X.
```

**Certo** — skill fala em capacidade; o perfil resolve:
```
Notificar o PR pela capacidade `comunicacao`, no canal que o perfil efetivo registra para "aprovação de PR".
```
