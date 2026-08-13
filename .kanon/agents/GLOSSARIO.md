# Glossário

Termos técnicos usados nos arquivos de `agents/`, para consulta rápida. Cada arquivo linka a primeira ocorrência de cada termo aqui.

Termos que já existem no glossário de [`boas-praticas-dev/`](../reference/boas-praticas-dev/GLOSSARIO.md) (ex.: ADR, XSS, N+1, PR) são linkados diretamente lá, para não duplicar definição. Este arquivo cobre apenas termos específicos do domínio de produto/UX/dados que ainda não estavam cobertos.

<a id="aria"></a>
### ARIA (Accessible Rich Internet Applications)
Conjunto de atributos HTML (`aria-*`) que descrevem papel, estado e propriedades de elementos de interface para tecnologias assistivas, como leitores de tela, quando a semântica nativa do HTML não é suficiente.

<a id="backlog"></a>
### Backlog
Lista priorizada de tudo que pode ser feito em um produto (funcionalidades, correções, melhorias), ainda não necessariamente planejado para uma entrega específica.

<a id="blue-green"></a>
### Blue-Green Deployment
Estratégia de deploy que mantém dois ambientes de produção idênticos ("blue" e "green"); o tráfego é trocado instantaneamente de um para o outro após o deploy, permitindo rollback imediato se algo der errado.

<a id="canary"></a>
### Canary (Deployment)
Estratégia de deploy que libera uma mudança para uma pequena fração de usuários/tráfego antes do rollout completo, permitindo detectar problemas com impacto limitado.

<a id="contrato-de-dados"></a>
### Contrato de Dados (Data Contract)
Acordo formal (schema, frequência de atualização, garantias de qualidade) entre quem produz e quem consome um conjunto de dados, para que mudanças não quebrem consumidores silenciosamente.

<a id="daily"></a>
### Daily (Daily Standup)
Cerimônia ágil curta e diária em que o time sincroniza o que foi feito, o que será feito e quais impedimentos existem — não é uma reunião de status para um gestor.

<a id="design-system"></a>
### Design System
Conjunto documentado de componentes, padrões visuais (cores, tipografia, espaçamento) e regras de uso, compartilhado entre design e desenvolvimento para manter consistência entre telas.

<a id="etl"></a>
### ETL / ELT
Sigla para Extract-Transform-Load (ou Extract-Load-Transform): processo de extrair dados de uma origem, transformá-los e carregá-los em um destino (banco, data warehouse), diferindo na ordem em que a transformação acontece.

<a id="gherkin"></a>
### Gherkin (Dado/Quando/Então)
Formato de escrita de critérios de aceite e testes de comportamento no padrão "Dado [contexto], Quando [ação], Então [resultado esperado]", usado para descrever comportamento sem ambiguidade e de forma legível por não programadores.

<a id="heuristica"></a>
### Heurística de Usabilidade
Princípio geral e testado empiricamente (ex.: as heurísticas de Nielsen) usado para avaliar a usabilidade de uma interface sem precisar de um teste com usuários reais a cada mudança pequena.

<a id="idempotencia"></a>
### Idempotência
Propriedade de uma operação que produz o mesmo resultado final não importa quantas vezes seja executada com a mesma entrada — essencial em pipelines de dados e APIs que podem ser reexecutados após falha.

<a id="pii"></a>
### PII (Personally Identifiable Information)
Qualquer dado que possa identificar uma pessoa, direta ou indiretamente (nome, CPF, e-mail, endereço IP combinado a outros dados). Exige proteção especial em trânsito, em repouso e em logs.

<a id="retrospectiva"></a>
### Retrospectiva
Cerimônia ágil ao final de uma iteração em que o time discute o que funcionou, o que não funcionou e define ações concretas de melhoria para o próximo ciclo.

<a id="rolling-update"></a>
### Rolling Update
Estratégia de deploy que substitui instâncias antigas por novas gradualmente, mantendo o serviço no ar durante toda a transição.

<a id="shift-left"></a>
### Shift-Left
Prática de mover atividades de qualidade, segurança ou teste para o início do processo de desenvolvimento (ex.: definir testes antes de codificar), em vez de deixá-las só para o final.

<a id="skeleton-screen"></a>
### Skeleton Screen
Interface de carregamento que mostra uma versão "esqueleto" (blocos no formato do conteúdo final) enquanto os dados reais carregam, em vez de um spinner genérico.

<a id="upsert"></a>
### Upsert
Operação de banco de dados que insere um registro novo ou atualiza um já existente, dependendo se ele já existe (combinação de "update" + "insert"). Útil para tornar cargas de dados idempotentes.

<a id="user-flow"></a>
### User Flow (Fluxo de Usuário)
Representação do caminho que um usuário percorre em uma interface para completar uma tarefa, passo a passo, incluindo decisões e desvios possíveis (erro, cancelamento, etc.).

<a id="wireframe"></a>
### Wireframe
Esboço estrutural de baixa fidelidade de uma tela, focado em layout e hierarquia de informação, sem se preocupar com cores ou estilo visual final.
