# 18 — Work Item Publication Gate

## Propósito
Impedir que uma Feature ou User Story chegue à ferramenta de trabalho fora do modelo do time, com link que só abre no cofre, sem os documentos que ela cita ou com prazo e estratégia de uso interno anexados. A trava roda antes de cada criação ou atualização e recusa a publicação inteira: nada é publicado pela metade.

## Quando se aplica
Em toda criação ou atualização de Feature ou User Story feita por `skills/16-work-tracking-publication`, inclusive correção de item já publicado. Task e Bug ainda não passam por ela.

## O pacote
Antes de publicar, a skill monta um pacote (JSON) com o que vai para o item, e a trava confere só o pacote. No Claude Code: `node .claude/scripts/kanon-publicacao.js <pacote.json>` (código 0 = pode publicar; 1 = recusada, com a lista do que corrigir).

| Chave | O que é |
|---|---|
| `tipo` | `feature` ou `user-story` |
| `titulo` | título do item; a descrição começa com `# <titulo>` |
| `descricao` | arquivo com a descrição exatamente como vai para o item |
| `criterios` | (User Story) arquivo com os critérios de aceite, que vão no campo próprio |
| `anexos[]` | `nome` e `arquivo` de cada documento anexado; `revisado` (opcional) com o motivo, quando uma pessoa leu o arquivo inteiro e o trecho apontado não é prazo nem estratégia interna |
| `fora[]` | `arquivo` e `motivo` de cada documento que ficou de fora de propósito |
| `campos` | `tags`, `responsavel`, `esforco` e `iteracao`; esforço e iteração vazios só como `{ "motivo": "…" }` |
| `revisao_descricao` | (opcional) motivo, quando uma pessoa leu a descrição e o trecho apontado não é prazo nem estratégia interna |

Na descrição, o link para um anexo é escrito `{{ATT:nome}}` e o diagrama `{{DIAGRAM:nome}}`; o adaptador da ferramenta troca pelos endereços depois do upload.

## Regras

### Feature
- A descrição segue o modelo de [`templates/FEATURE.template.md`](../templates/FEATURE.template.md): do título até "Anexo A", com os mesmos títulos de seção e na mesma ordem. A trava lê o modelo do próprio template, por isso mudar o modelo é mudar o template. Seção marcada "_Opcional na publicação_" pode faltar; seção que não está no modelo é recusada.
- Todo documento de "Documentos relacionados" está anexado ao item, e todo anexo aparece em "Documentos relacionados".
- O que fica só no cofre (cabeçalho, RF, RNF, glossário, DoD da Feature) não vai para a descrição.

### User Story
- Título `USnn - camada: título` (ex.: `US01 - API do cadastro: aceitar celular opcional`).
- Descrição e critérios de aceite em campos separados, os dois em Markdown; critério de aceite dentro da descrição é recusado.
- Diagrama vai como imagem anexada, nunca como bloco Mermaid em texto.
- A última tag é o `USnn` do título.

### Para as duas
- **Sem link relativo nem âncora**: no item publicado eles não abrem. Vale link para anexo (`{{ATT:…}}`), para diagrama (`{{DIAGRAM:…}}`) e URL completa.
- **Sem referência interna do kanon** (`skills/…`, `process/…`, `templates/…`, `agents/…`), sem breadcrumb e sem texto de template não preenchido.
- **Campos**: a primeira tag é o ano; o responsável está preenchido. Esforço (SP) e iteração podem ficar vazios só com o motivo registrado (ex.: "SP a estimar com o time", "sprint não definida"); nunca com valor inventado.
- **Prazo e estratégia de uso interno ficam no cofre.** Cada anexo é **lido inteiro** antes de entrar no pacote, por quem publica, e a trava varre o arquivo inteiro e a descrição atrás de horas, prazo, data de entrega ou data limite, "comunicar data", orçamento, estratégia, folga e dias úteis. Trecho apontado: o arquivo vai para `fora`, com o motivo, ou uma pessoa confirma em `revisado` que não é prazo nem estratégia. A varredura só aponta candidatos: fala de negócio sobre o tamanho do projeto, troca de pessoas e combinados internos não têm palavra fixa, e é a leitura inteira que os pega.
- O resultado da trava (anexos, revisados, fora de propósito e campos vazios com motivo) vai para a seção "Conferência" do [`templates/PUBLISH-SUMMARY.template.md`](../templates/PUBLISH-SUMMARY.template.md).

## Sinais de violação
- Item publicado com seção a menos, com outro nome ou fora da ordem do modelo.
- "Documentos relacionados" com link que só abre no cofre, ou citando documento que não está anexado.
- Anexo com horas orçadas, data interna ou estratégia de comunicação.
- Esforço ou iteração preenchidos com um número que o time não deu.
- Publicação feita sem rodar a trava, ou com a trava recusando.

## Procedimento em caso de falha
Trava recusou: nada é publicado. A skill corrige o pacote (texto, anexos, `fora`, campos) e roda a trava de novo. Trecho apontado que a skill não sabe classificar: pergunta à pessoa, que decide entre `fora` e `revisado`; a skill nunca preenche `revisado` sozinha. Script indisponível: a skill confere a lista desta seção item a item, registra no resumo que conferiu à mão e não publica nada que falhe.

## Exemplo concreto

**Errado** — "Documentos relacionados" saído direto do cofre, com o plano que traz o orçamento interno:
```
## Documentos relacionados
- [PLAN-v1.md](./PLAN-v1.md) — plano aprovado.
```

**Certo** — link para o anexo, e o plano registrado como fora de propósito no pacote:
```
## Documentos relacionados
- 📋 [INSTRUCTIONS.md]({{ATT:INSTRUCTIONS.md}}) — instruções técnicas.

pacote.json: "fora": [{ "arquivo": "PLAN-v1.md", "motivo": "traz orçamento em horas e a estratégia de quando comunicar a data" }]
```
