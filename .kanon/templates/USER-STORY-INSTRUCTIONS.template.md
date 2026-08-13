# Guia — Como Escrever uma Boa User Story

_Meta-template: apoia `skills/05-refine-user-stories` antes de usar [USER-STORY.template.md](USER-STORY.template.md)._

## Faça
- Escreva a narrativa do ponto de vista do usuário final, não do sistema.
- Inclua cenários de erro/borda nos Acceptance Criteria, não só o caminho feliz.
- Mantenha a US pequena o suficiente para caber em poucas tasks (ver `agents/AGENT-PO.md` — escopo incremental).
- Valide os AC com QA-ENGINEER antes de marcar como `aprovado`.

## Evite
- Jargão técnico na narrativa ("Como usuário, quero um endpoint REST..." — isso é detalhe de implementação, não de valor).
- AC vagos ("deve funcionar bem") sem forma de verificação objetiva.
- Misturar duas funcionalidades não relacionadas na mesma US.

## Anti-padrões comuns
| Anti-padrão | Por que é um problema | Alternativa |
|---|---|---|
| US sem critério de aceite | Impossível saber quando está pronta | Sempre incluir Gherkin |
| US gigante ("Épico disfarçado") | Difícil de estimar e entregar | Quebrar em US menores |
| AC copiado do requisito sem adaptar | Não cobre casos de borda reais | Derivar AC pensando em erro/vazio/limite |
