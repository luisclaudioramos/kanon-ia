# Outline — Modelos de Página

Templates prontos para criação de páginas no Outline, usados por `skills/31-getoutline-integration`. Regras de escrita em [`STANDARDS.md`](STANDARDS.md); onde a Feature fica em [`FIXED-PAGES.md`](FIXED-PAGES.md).

## Modelo de Feature

Uma Feature é publicada como **uma ficha** (página pai) e **documentos filhos** `NN — Nome`. A ficha é para quem chega sem contexto; os filhos aprofundam um assunto cada. O plano detalhado, quando existe, é sempre o último filho — a tabela-resumo de tasks fica num filho anterior.

### Ficha (página pai)

Título: `_[preencher: nome da Feature, em linguagem de negócio]_`

```
> **Situação:** _[preencher: Em validação com _pessoa_ · Aprovado em AAAA-MM-DD · Entregue em AAAA-MM-DD]_

_[preencher: 1º parágrafo — o que a Feature faz, para quem e por quê, sem jargão]_

_[preencher: 2º parágrafo — como funciona hoje e o que muda, com os nomes de sistema e de tabela explicados]_

> **Base da varredura.** Código lido em AAAA-MM-DD — _[preencher: repositório, branch, commit; um por sistema]_. Banco consultado em _[preencher: homologação ou produção]_, _[preencher: só leitura / como]_.

> **Atualização de AAAA-MM-DD — _[preencher: resumo em uma linha]_.** _[preencher: o que mudou e em qual documento está o detalhe]_

## Para quem está validando

_[preencher: o que mais precisa de olhar, apontando o documento — ex.: o modelo de dados (`03`) e a ordem de deploy (`05`)]_

## Índice

| Documento | Conteúdo |
|-----------|----------|
| 01 — _[preencher]_ | _[preencher: uma linha]_ |

## Materiais de referência

* _[preencher: reuniões com data, Feature e work items, PRs, repositórios — sem caminho de pasta local]_

## Glossário

| Termo | Significado |
|-------|-------------|
| _[preencher]_ | _[preencher]_ |
```

Seção opcional ao fim da ficha: `## Resumo da arquitetura` (diagrama de uma tela com o fluxo hoje × pretendido), quando a Feature atravessa vários sistemas.

### Documentos filhos — sequência sugerida

Use só os que a Feature precisa, na ordem abaixo, renumerando sem buracos.

| Documento | Seções |
|-----------|--------|
| `NN — Contexto e Decisões` | Objetivo (com o critério de sucesso) · Por que hoje não funciona · Decisões confirmadas (tabela # · Decisão · Origem) · Alternativas descartadas (tabela Alternativa · Por que saiu) · Fora do escopo |
| `NN — Como Funciona Hoje` | Um `##` por assunto, cada afirmação com `arquivo:linha` ou consulta |
| `NN — Arquitetura` ou `NN — Modelo de Dados e Regras` | Fluxo hoje × pretendido (diagrama), tabelas e campos, regras e erros |
| `NN — Contratos` | Rotas, campos novos, compatibilidade com quem consome |
| `NN — <Sistema>` | Um documento por sistema afetado, quando o detalhe não cabe em Arquitetura |
| `NN — Implantação` | Etapas de deploy, migração de dados, convivência e volta |
| `NN — Tasks e Cronograma` | Cronograma (tabela Data · Marco) · Tasks (tabela # · Task · Sistema · Etapa · Estado) · ordem de deploy |
| `NN — Pendências e Riscos` | Perguntas em aberto (# · Pergunta · Para quem · O que trava) · Riscos (Risco · Mitigação) · Já resolvido |
| `NN — Consultas de Verificação` | Uma `##` por consulta: o SQL, o ambiente, o resultado e o que ela comprova |
| `NN — Plano de Execução Detalhado` | Sempre o último: cada task com arquivos, interfaces, testes e código |

Modelo de um filho:

```
_[preencher: 1 parágrafo — o que este documento responde]_

## _[preencher: seção]_

_[preencher: texto, tabela ou diagrama Mermaid; citar arquivo:linha ou a consulta]_
```

## Modelo de Decision Record (ADR)
```
# ADR-_[preencher]_: _[preencher: título da decisão]_
Contexto: _[preencher]_
Decisão: _[preencher]_
Alternativas consideradas: _[preencher]_
Consequências: _[preencher]_
```

## Modelo de Monthly Report
```
# Relatório Mensal — _[preencher: mês/ano]_
Features concluídas: _[preencher]_
Bugs abertos/fechados: _[preencher]_
Principais decisões arquiteturais: _[preencher]_
```
