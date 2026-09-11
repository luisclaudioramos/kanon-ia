# Documentação

## README
Todo projeto — e, num [monorepo](GLOSSARIO.md#monorepo), todo pacote/app publicável — tem um README próprio. Um README que só explica "o que isto faz" é insuficiente para código que outras pessoas vão estender: sem instrução de como rodar isolado, como testar e como expandir, cada novo consumidor reaprende por tentativa e erro o que o autor original já sabia.

**Seções esperadas:**

- **O que é** — o que faz, por que existe e, quando houver risco de confusão, o que **não** é (ex.: "não é o backend de produção").
- **Como executar isoladamente** — comando de dev, porta, variáveis de ambiente obrigatórias e onde obtê-las (`.env.example`), pré-requisitos (versão de runtime, outro serviço que precisa estar no ar).
- **Como rodar os testes** — comando exato por tipo (unitário, integração, E2E) e o que cada um cobre.
- **Como expandir** — passo a passo para adicionar o próximo item do mesmo tipo que já existe (nova rota, novo endpoint, novo token) — não uma lista de features futuras.
- **Testes e mocks** — onde ficam os testes, e a política de [mock](GLOSSARIO.md#mock) do projeto (quando precisa, onde fica, como criar) seguindo [Testes](03-testes.md). O README aponta a convenção adotada; o padrão em si ([AAA](GLOSSARIO.md#aaa), determinismo) vive em `03-testes.md`, não é reescrito aqui.
- **Segurança** — os pontos de atenção específicos deste código: sanitização de saída, segredos nunca embutidos no artefato distribuído, validação de entrada em qualquer superfície exposta (ver [Segurança](07-seguranca.md)).
- **Validação de CI/CD** — o que precisa passar antes de um merge que toque este código (lint, build, testes). Se ainda não há [pipeline](GLOSSARIO.md#pipeline) configurado, dizer isso como lacuna conhecida em vez de deixar implícito.
- **Casos de borda** — o que já foi conscientemente tratado (com o teste que cobre) e o que ficou conscientemente de fora, com o motivo. Uma lacuna registrada é uma decisão; uma lacuna silenciosa parece cobertura completa.
- **Como contribuir** — se aplicável.

**Omissão explícita:** nem toda seção se aplica a todo projeto. Omitir uma seção que não faz sentido é correto — pular uma que se aplica, sem dizer por quê, não. Quando uma seção não se aplica, uma linha dizendo isso vale mais que o silêncio (ex.: "sem SEO: todas as rotas exigem autenticação").

## Documentação de código
- Prefira código autoexplicativo a documentação extensa — nomes claros substituem muitos comentários.
- Documente APIs públicas (assinatura, parâmetros, retorno, exceções) especialmente em bibliotecas/serviços consumidos por outros times.
- [Docstrings](GLOSSARIO.md#docstring) devem explicar contrato e comportamento, não reimplementar o código em prosa.

## Decisões arquiteturais (ADRs)
Para decisões importantes e não óbvias (escolha de banco, padrão arquitetural, troca de biblioteca crítica), registre um ADR (Architecture Decision Record) curto: contexto, decisão, alternativas consideradas, consequências. Evita que a mesma discussão se repita meses depois.

## Documentação viva
- Documentação desatualizada é pior que ausência de documentação — gera confiança falsa.
- Mantenha docs próximas ao código (no próprio repositório) para que mudanças de código lembrem de atualizar a doc.
- Prefira gerar documentação a partir do código quando possível (ex.: OpenAPI/Swagger a partir de anotações) para evitar divergência.

## Comunicação de mudanças
- [Changelog](GLOSSARIO.md#changelog) (`CHANGELOG.md`) para consumidores externos da API/biblioteca.
- [Runbooks](GLOSSARIO.md#runbook) para operações comuns (deploy, [rollback](GLOSSARIO.md#rollback), troubleshooting de incidentes).
