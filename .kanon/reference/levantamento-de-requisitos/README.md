# Levantamento de Requisitos

Coleção de referências rápidas sobre engenharia/elicitação de requisitos: como descobrir, analisar, especificar e validar o que precisa ser construído, antes de qualquer decisão técnica.

Separada de [`boas-praticas-dev/`](../boas-praticas-dev) de propósito: aquela pasta é sobre **escrever, revisar, testar e manter código**; esta é sobre **descobrir e formalizar o requisito** que o código vai atender — uma disciplina de produto/negócio, não de desenvolvimento.

## Índice

### Processo
_O ciclo completo, do levantamento bruto à validação formal._
1. [Processo de Elicitação de Requisitos](01-processo-de-elicitacao.md)
2. [Técnicas de Elicitação](02-tecnicas-de-elicitacao.md)

### Qualidade do Requisito
_O que separa um requisito maduro de uma ideia solta._
3. [Evidências e Métricas](03-evidencias-e-metricas.md)
4. [Critérios de Aceite e Rastreabilidade](04-criterios-de-aceite-e-rastreabilidade.md)
5. [Delimitação de Escopo](05-delimitacao-de-escopo.md)

### Contexto do Projeto
_A abordagem certa muda conforme o tipo de projeto — nenhuma técnica serve para todos os cenários._
6. [Sistemas Novos (Greenfield) e Discovery](06-sistemas-novos-greenfield.md)
7. [Sistemas Legados (Brownfield) e Engenharia Reversa](07-sistemas-legados-brownfield.md)
8. [Visão Estratégica e Análise de Negócio](08-visao-estrategica-business-analysis.md)

### Governança
_O que fazer quando o requisito falha, e como saber que não falhou._
9. [Anti-padrões e Sinais de Alerta](09-anti-padroes-e-sinais-de-alerta.md)
10. [Gestão de Falhas e Mudança de Requisitos](10-gestao-de-falhas-e-mudancas.md)
11. [Validação e Homologação](11-validacao-e-homologacao.md)

### Referência
- [Glossário](GLOSSARIO.md) — definição dos termos técnicos usados nos arquivos acima.

## Como usar

Cada arquivo é independente e pode ser lido isoladamente. Use como checklist ao iniciar o levantamento de uma Feature, ao decidir qual técnica de elicitação cabe no contexto, ou como referência ao revisar se um `REQUIREMENT-SUMMARY.md`/`FEATURE.md` está maduro o suficiente para seguir adiante. Termos técnicos estão linkados ao [Glossário](GLOSSARIO.md) na primeira ocorrência em cada arquivo.

## Origem

Esta pasta nasceu de uma proposta de aprimoramento do fluxo de `skills/39-generate-requirement-summary`/`skills/01-refine-feature` (`reference/Aprimoramento do REQUERIMENT_SUMMARY.md`, vault raiz) e de um levantamento inicial de boas práticas de mercado (`reference/boas práticas de levantamento de requisitos de software.md`, vault raiz). É o primeiro passo: consolidar a base de conhecimento aqui, antes de decidir quais skills/agentes do harness Kanon vão efetivamente citá-la.
