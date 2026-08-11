# Documentação

## README
Todo projeto deve ter um README com, no mínimo:
- O que o projeto faz e por que existe.
- Como instalar/rodar localmente (setup, dependências, variáveis de ambiente).
- Como rodar os testes.
- Como contribuir (se aplicável).

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
