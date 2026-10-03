# 16 — Design Foundations

## Propósito
Definir, num lugar só, as seis regras de interface (D1 a D6) que todo trabalho com tela cumpre: o que cada uma exige, quando bloqueia e quando só incentiva, e como separar defeito visível ao usuário de melhoria interna. Skills, agentes, travas e templates apontam para este arquivo em vez de copiar as regras.

## Quando se aplica
- Em todo trabalho que cria ou altera interface: refinamento (`skills/05-refine-user-stories`, `skills/07-refine-tasks`), validação de telas (`skills/48-screen-validation`), desenvolvimento (`skills/12-development-execution`), revisão (`skills/13-code-review`, trava 13 de [`15-pull-request-gates.md`](15-pull-request-gates.md)) e teste (`skills/14-qa-validation`).
- Cobra **só o que é novo ou alterado**. O que já existia fora da regra (legado) vai para o inventário do perfil de design (`skills/50-design-profile`) e não bloqueia quem não o criou.

## Regras
- **O perfil de design do sistema decide o modo.** Cada item estrutural (mobile first no código, design tokens, design system, Atomic Design, biblioteca de componentes) é `definido` ou `não definido` no `DESIGN-PROFILE.md` do sistema, confirmado pelo Tech Lead. `definido` → a regra é 🔴 (bloqueia). `não definido` → 🟡 (incentivo: a oportunidade é registrada e não bloqueia). Exceto D4, que segue a regra abaixo: basta o sistema ter biblioteca de componentes.
- **D1, D4 (quando o sistema tem biblioteca de componentes) e D6 são 🔴 sempre**, com ou sem perfil.
- **Sistema sem perfil**: alerta 🟡 recomendando `skills/50-design-profile`; D1 continua 🔴; D4 continua 🔴 quando o manifesto de dependências mostra biblioteca de componentes; as demais viram 🟡; D6 compara com as telas que a própria mudança toca.
- **Exceção com motivo**: qualquer regra aceita "Não se aplica: _motivo_" ou desvio com motivo em uma frase (ex.: "componente próprio porque a biblioteca não tem seletor de período por mês"). Sem motivo, é violação.
- **Larguras de conferência**: 390, 768 e 1920 px, em qualquer sistema, inclusive administrativo. Não são breakpoints.
- **Breakpoints sugeridos**, quando o perfil não define outros: base (celular) a partir de 0, `md` a partir de 768, `lg` a partir de 1280, `xl` a partir de 1440.

## As regras

| # | Regra | O que é conferido | Tipo |
|---|---|---|---|
| D1 | Responsividade | Toda tela nova ou alterada funciona em 390, 768 e 1920 px, sem corte, rolagem lateral ou sobreposição | 🔴 sempre |
| D2 | Mobile first no código | Estilos partem do celular e crescem com `min-width` nos breakpoints nomeados do perfil; sem largura fixa em px nos contêineres | 🔴 se `definido` · 🟡 se não |
| D3 | Tokens | Nenhuma cor, espaçamento, fonte, raio ou sombra com valor fixo quando há token. Sem tokens: valor fixo repetido vira oportunidade (ex.: "este #E35205 aparece 14 vezes") | 🔴 se `definido` · 🟡 se não |
| D4 | Biblioteca primeiro | Usar o componente da biblioteca do sistema (ex.: Angular Material) ou do design system antes de criar um. Componente próprio só com o motivo registrado | 🔴 sempre que o sistema tiver biblioteca |
| D5 | Reuso e Atomic Design | Componente novo no nível certo (átomo, molécula, organismo) e na pasta compartilhada quando houver segundo uso; componente quase igual a outro existente é sinalizado. Sem design system: o segundo uso de um trecho vira oportunidade de extrair componente | 🔴 se `definido` · 🟡 se não |
| D6 | Consistência entre telas | Elemento com a mesma função segue o **padrão por função** do perfil (componente, cor, tamanho, ícone). Divergência nova barra; a antiga fica no inventário | 🔴 sempre |

## Bug visual × oportunidade técnica

| Tipo | O que é | Exemplos | Destino |
|---|---|---|---|
| Bug visual | Defeito que o usuário enxerga | Botão com cor e tamanho diferentes entre telas; tela que quebra no celular ou no tablet; texto sem contraste; mesmo componente se comportando diferente | Bug no work item (`skills/32-report-bug`), proposto no refinamento e criado só com o ok do Tech Lead; o PO prioriza |
| Oportunidade técnica | Problema interno, invisível ao usuário | Cor fixa igual a um token; componente próprio igual ao da biblioteca; componente copiado em dois lugares | Inventário do perfil; sugerida quando uma US mexer no ponto |

- **Gravidade pelo efeito**: o usuário não consegue usar a tela no celular → alta; divergência só de aparência → média ou baixa.
- **Um bug por padrão divergente**, com a lista de ocorrências, nunca um por ocorrência.

## Sinais de violação
- PR que introduz cor fixa, componente próprio ou divergência de padrão sem motivo, num item `definido` ou numa regra 🔴 sempre.
- PR barrada por problema de legado que ela não criou.
- Item cobrado como 🔴 com o perfil marcando `não definido`.
- Skill ou template repetindo a tabela de regras deste arquivo em vez de apontar para ela.
- Inventário com um bug por ocorrência em vez de um por padrão.

## Procedimento em caso de falha
- Regra 🔴 violada: achado bloqueante na revisão (trava 13) ou tela de volta a `rascunho` na validação (skill 48), citando o número e o nome da regra.
- Regra 🟡: oportunidade registrada no inventário do perfil, com o ok do Tech Lead; não bloqueia.
- Perfil inexistente: segue o modo "sistema sem perfil" e recomenda `skills/50-design-profile`.
- Perfil com mais de 90 dias: continua valendo como está, com alerta 🟡 para rodar `skills/50-design-profile` de novo.

## Exemplo concreto

**Errado** — legado barrando e regra não definida cobrada:
```
PR #812 (altera só o rodapé da listagem):
  🔴 D3: 95 cores fixas em styles/ (já existiam antes da PR)
  🔴 D5: projeto sem design system, componente novo fora de atoms/
```

**Certo** — só o novo, no modo do perfil:
```
PR #812 (altera só o rodapé da listagem) — perfil: tokens definido, design system não definido
  🔴 D3: footer.component.scss:14 usa #E35205; o token é --color-primary
  🟡 D5: botão do rodapé repete o do cabeçalho; oportunidade INV-07 registrada
  ✓ D1: pranchas 390/768/1920 sem corte
```
