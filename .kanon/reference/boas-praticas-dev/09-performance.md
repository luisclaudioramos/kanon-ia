# Performance

## Meça antes de otimizar
- Nunca otimize por intuição. Use [profiling](GLOSSARIO.md#profiling) real (CPU, memória, [I/O](GLOSSARIO.md#io)) para identificar o gargalo de fato antes de mudar código.
- Otimização prematura frequentemente piora a legibilidade sem ganho real de performance.

## Onde o tempo geralmente vai
- **I/O e rede** costumam dominar (chamadas a banco, APIs externas, disco) — geralmente o maior ganho está aqui, não em micro-otimizações de CPU.
- **Queries de banco**: evite [N+1 queries](GLOSSARIO.md#n1), use índices adequados, carregue apenas os dados necessários (evite `SELECT *`).
- **Alocações desnecessárias**: evite criar objetos/estruturas grandes dentro de loops quentes.

## Estratégias comuns
- [Cache](GLOSSARIO.md#cache): aplique em dados caros de calcular/buscar e que mudam pouco. Defina invalidação clara — cache mal invalidado é fonte clássica de bugs difíceis de rastrear.
- Paginação/streaming: nunca carregue coleções ilimitadas em memória de uma vez.
- Processamento assíncrono/filas: mova trabalho pesado e não urgente para fora do caminho crítico da requisição.
- Concorrência: paralelize operações independentes (chamadas de I/O), mas tenha cuidado com [condições de corrida](GLOSSARIO.md#race-condition) e overhead de sincronização.

## Escalabilidade
- Prefira soluções [stateless](GLOSSARIO.md#stateless) quando possível — facilita escalar horizontalmente.
- Identifique gargalos antes de escalar: adicionar mais instâncias não resolve uma query O(n²) ou um [lock](GLOSSARIO.md#lock) mal projetado.

## Trade-offs
- Toda otimização tem um custo (complexidade, legibilidade, tempo de desenvolvimento). Otimize o que o negócio realmente sente (latência percebida pelo usuário, custo de infraestrutura) — não métricas que não importam para ninguém.
