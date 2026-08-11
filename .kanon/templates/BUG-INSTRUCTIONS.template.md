# Guia — Como Reportar um Bug

_Meta-template: apoia `skills/32-report-bug` antes de usar [BUG.template.md](BUG.template.md)._

## Faça
- Descreva o ambiente com precisão (versão, SO, navegador, dados de entrada usados).
- Sempre anexar logs/prints como evidência.
- Escreva Repro Steps que qualquer pessoa consiga seguir sem contexto adicional.
- Reproduza o problema antes de reportar — sem reprodução confiável, a correção não pode ser confirmada (base: `boas-praticas-dev/11-debugging.md`).

## Evite
- Descrever o sintoma sem os passos que levam a ele.
- Reportar "às vezes acontece" sem tentar isolar a condição que dispara o bug.
- Misturar mais de um problema no mesmo `BUG.md`.

## Checklist antes de submeter
- [ ] Repro Steps testados por outra pessoa além de quem reportou.
- [ ] System Info completo.
- [ ] Severidade classificada.
