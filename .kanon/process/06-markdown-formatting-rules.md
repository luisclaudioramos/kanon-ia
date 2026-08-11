# 06 — Markdown Formatting Rules

## Propósito
Padronizar a sintaxe Markdown obrigatória de todos os artefatos gerados pelo sistema, garantindo que os hooks de validação consigam parsear os arquivos corretamente.

## Quando se aplica
Sempre que um agente ou skill gera um artefato em Markdown (requisito, plano, relatório, runbook).

## Regras
- Títulos seguem hierarquia estrita de headings (`#`, `##`, `###`), sem pular níveis, para que parsers baseados em heading consigam navegar a estrutura.
- Listas de verificação usam a sintaxe padrão de checkbox (`- [ ]` / `- [x]`), nunca uma variação informal, para que hooks consigam contar itens pendentes/concluídos.
- Blocos de código sempre usam cerca de código (\`\`\`), com a linguagem declarada quando aplicável.
- Breadcrumbs de navegação, quando presentes, seguem um formato fixo e previsivelmente parseável (ex.: `[Home](../README.md) > [Feature](README.md) > Task`).
- Um artefato que não segue essas regras é considerado malformado e não deve ser aceito por um hook de validação.

## Sinais de violação
- Checklist escrita como texto corrido em vez de checkbox.
- Heading pulando de `#` direto para `###`.

## Procedimento em caso de falha
Se um hook de validação não conseguir parsear um artefato por causa de formatação incorreta, o artefato é rejeitado e devolvido ao agente que o gerou para correção — nunca aceito "quase certo".

## Exemplo concreto

**Errado** — checklist como texto corrido, não parseável:
```
Feito: implementar login, ainda falta testar login.
```

**Certo** — checkbox padrão, parseável por hook:
```
- [x] Implementar login
- [ ] Testar login
```
