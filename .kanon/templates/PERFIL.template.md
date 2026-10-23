---
nivel: _[preencher: empresa | area | equipe]_
nome: _[preencher: nome de exibição do nível]_
nomes_reservados: []
papeis:
  - papel: _[preencher: ex.: PO]_
    pessoa: _[preencher]_
    contato: _[preencher: contato de trabalho]_
    desde: _[preencher: AAAA-MM-DD]_
    confirmado_em: _[preencher: AAAA-MM-DD]_
    fonte: _[preencher: onde foi confirmado]_
ferramentas:
  trabalho: _[preencher: nome do adaptador]_
  documentacao: _[preencher: nome do adaptador]_
  comunicacao: _[preencher: nome do adaptador]_
  repositorio: _[preencher: nome do adaptador]_
  mudanca: _[preencher: nome do adaptador]_
  design: _[preencher: nome do adaptador]_
  observabilidade: _[preencher: nome do adaptador]_
  dados: _[preencher: nome do adaptador]_
  implantacao: _[preencher: nome do adaptador, ou lista]_
ferramentas_confirmadas_em: _[preencher: AAAA-MM-DD]_
validade:
  papeis: 30
  ferramentas: 180
---

# Perfil — _[preencher: nome do nível]_

_Mantido por `skills/51-company-profile`. Contrato: `process/17-company-profile.md`. Escreva só o que difere do nível de cima; apague do frontmatter as chaves que este nível herda sem mudar._

## Como comunicar

| Assunto | Público | Canal | Formato | Quem envia |
|---|---|---|---|---|
| Aprovação de PR | Time técnico | _[preencher]_ | _[preencher]_ | _[preencher: kanon só rascunha / kanon envia]_ |
| Aviso de mudança | Comitê de mudança | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| Incidente | _[preencher]_ | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| Aceite do PO | PO | _[preencher]_ | _[preencher]_ | _[preencher]_ |

O que nunca vai em canal: _[preencher]_

## Públicos

Quem ocupa cada público de `reference/comunicacao/02-publicos.md` (no núcleo do kanon) neste nível e onde falar com ele. Use papéis do frontmatter ou grupos; pessoa citada aqui entra em `nomes_reservados`. Público que o nível não tem fica "não registrado": a skill que precisar dele pergunta.

| Público | Quem (papel ou grupo) | Onde | Regra local |
|---|---|---|---|
| Time técnico | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| QA | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| UI/UX | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| PO | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| Negócio | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| Dados e analistas | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| Gestão de entrega | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| Liderança executiva | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| Comitê de mudança | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| Outro time interno | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| Parceiro ou fornecedor externo | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| Segurança e compliance | _[preencher]_ | _[preencher]_ | _[preencher]_ |
| Suporte e operação | _[preencher]_ | _[preencher]_ | _[preencher]_ |

Pasta das mensagens no item: _[preencher: subpasta onde a skill 52 grava as mensagens; sem valor, `mensagens/`]_

## Processos

### Gestão de mudança
Nome local: _[preencher]_ · Janela: _[preencher]_ · Aprovadores: _[preencher]_
Pasta do item: _[preencher: pasta da mudança dentro da feature ou do bug]_ · Índice por data: _[preencher: arquivo na área de execução do projeto]_
Etapas: _[preencher]_

### Pull request e branches
Só acrescente `branches:` ao frontmatter (com `protegidas: [...]` e `integracao: ...`) se este nível diferir do de cima; sem a chave, valem `main`, `master`, `develop`, `release/*`, `hotfix/*` e integração em `develop`.
_[preencher: política de PR, aprovações exigidas, squash]_

### Homologação e aceite
_[preencher: quem aceita, em qual ambiente, como registrar]_

### Impacto por ambiente
_[preencher: o que registrar para cada ambiente]_

## Regras locais
- _[preencher: como o kanon age diferente neste nível]_
