# Outline — Hierarquia Fixa de Páginas

Estrutura de pastas obrigatória do workspace de documentação no Outline, publicada por `skills/31-getoutline-integration`.

```
/Home
/Standards          — padrões de documentação e código (ver STANDARDS.md, boas-praticas-dev/)
/Architecture        — ADRs e diagramas de contexto (ARCHITECTURE.template.md)
/Runbooks            — runbooks de produção (RUNBOOK.template.md)
/Memory              — lições aprendidas consolidadas (MEMORY.template.md)
/Features            — uma subpágina por Feature publicada
/Reports             — TCO, progresso, auditoria
```

## Regras
- Nenhuma página é criada fora desta hierarquia — uma nova categoria exige atualizar este arquivo primeiro.
- Cada Feature publicada vira uma subpágina de `/Features`, nunca solta na raiz.
