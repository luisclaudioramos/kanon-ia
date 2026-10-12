---
nomes: [Outline, GetOutline, getoutline]
capacidades: [documentacao]
---
# Outline — adaptador

Atende a capacidade `documentacao` de [`.kanon/process/17-company-profile.md`](../../.kanon/process/17-company-profile.md). Usado por `skills/21-documentation-publication` e `44-topic-enrichment`. Modelos e padrões neutros em [`.kanon/templates/documentacao/`](../../.kanon/templates/documentacao).

## Como conectar
Endereço e token na configuração do ambiente (variável de ambiente ou `.env` da empresa), nunca em `.kanon/`.

## Teste de conexão
Listar as coleções do workspace pela API; lista vazia ou erro de autenticação = não configurado.

## Como publicar
1. **Perguntar o local** da pasta Features. Nunca usar um local padrão nem o de uma publicação anterior sem confirmação. Pasta inexistente no local: perguntar antes de criar.
2. **Montar a cópia local** em `outline/`: ficha e filhos `NN — Nome` conforme `PAGE-MODELS.md`, aplicando `STANDARDS.md` (sem referência interna, linhas desfeitas, siglas explicadas, base da varredura, situação).
3. **Conferir antes de publicar** — ver "Conferência" abaixo.
4. **Mostrar o rascunho** a quem pediu a publicação e só publicar com o aceite.
5. **Publicar** a ficha sob Features e depois os filhos, em ordem, sob a ficha.
6. **Conferir a ordem** dos filhos no Outline e reordenar se precisar (repetir a passada se a ordem não pegar).
7. **Registrar** o resumo de publicação, com o link permanente de cada documento.

Atualização de uma Feature já publicada: editar a cópia local, acrescentar o aviso `Atualização de AAAA-MM-DD` na ficha e republicar só os documentos alterados, mantendo os links.

## Conferência
Antes de publicar, confere e reporta cada item como atende / não atende:
- [ ] Ficha com situação, dois parágrafos de contexto, base da varredura, índice e glossário.
- [ ] Filhos nomeados `NN — Nome`, sem buraco na numeração, plano detalhado (se houver) por último.
- [ ] Corpo sem `#`; nenhum `####`.
- [ ] Nenhum `[[link]]`, caminho de pasta local ou referência a anotação, memória ou transcrição.
- [ ] Siglas e nomes de sistema explicados na primeira ocorrência (trava 2 de `process/15-pull-request-gates.md`).
- [ ] Toda afirmação sobre código ou banco com `arquivo:linha` ou consulta; toda decisão com origem (pessoa, data).
- [ ] Nenhum dado real de cliente (CPF, CNPJ, e-mail, telefone, nome).
- [ ] Nenhum parágrafo quebrado em várias linhas.

## Caminho alternativo
Outline temporariamente indisponível: a documentação permanece local e a pendência é registrada no `PUBLISH-SUMMARY` — não é considerada publicada sem confirmação. Nunca configurado: `process/13`.

## Particularidades
- O título da página é o título do documento no Outline e conta como o nível `#`. O corpo **não repete o título** e começa em `##`.
- Nunca `####` — o Outline já tem navegação lateral, níveis mais profundos viram ruído.
- **Desfazer a quebra de linha fixa** do Markdown local antes de publicar: o Outline mostra cada quebra como uma linha nova. Um parágrafo é uma linha só.
- A versão publicada fica numa pasta `outline/` da Feature, um arquivo por documento (`README.md` = ficha, `NN-nome.md` = filhos). Publicar e atualizar sempre a partir dela, para que a cópia local e o Outline não divirjam. Na cópia local, o título fica no nome do arquivo e no resumo de publicação, não no corpo.
- **Toda citação de Outline carrega a revisão**, montada por `tools/outline_consulta.py` (repositório de conteúdo). Sem revisão a citação não é fixável.
