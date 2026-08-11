# 01 — Menu Map

## Propósito
Mapear todos os comandos interativos disponíveis para o usuário (ex.: `/kanon refine-feature`) e vinculá-los diretamente às skills numeradas da pasta `skills/` — o índice de navegação do usuário dentro do harness.

## Quando se aplica
Sempre que o usuário invoca um comando nomeado do sistema, antes de decidir qual skill/agente executar.

## Regras
- Todo comando exposto ao usuário tem uma entrada única neste mapa, apontando para exatamente uma skill numerada (ex.: `skills/04-refine-feature.md`).
- Nenhum comando aciona uma skill ou agente "por fora" do mapa — se não está no menu, não é um comando suportado pelo sistema.
- O menu é a fonte da verdade sobre quais comandos existem; documentação de usuário (README, help) deriva dele, nunca o contrário.
- Cada entrada do menu também indica, quando aplicável, qual(is) agente(s) de [`agents/`](../agents) a skill correspondente aciona.

## Sinais de violação
- Um comando documentado em algum lugar que não existe de fato no menu.
- Duas entradas do menu apontando para skills conflitantes ou sobrepostas.

## Procedimento em caso de falha
Se o usuário invocar um comando não mapeado, o sistema reporta explicitamente que o comando não existe e, quando possível, sugere o comando válido mais próximo — nunca tenta adivinhar ou executar uma skill não vinculada a esse comando.

## Exemplo concreto

**Errado** — comando executando algo por inferência:
```
Usuário: /kanon refine
Sistema: (assume que quis dizer refine-feature e executa skills/09-outra-coisa.md)
```

**Certo** — mapeamento explícito, falha clara quando não existe:
```
/kanon refine-feature → skills/04-refine-feature.md (aciona PO + UI-UX-DESIGNER)

Usuário: /kanon refine
Sistema: Comando "refine" não reconhecido. Você quis dizer "/kanon refine-feature"?
```
