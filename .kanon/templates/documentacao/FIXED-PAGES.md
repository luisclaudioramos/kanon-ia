# Documentação — Hierarquia de Páginas

Onde cada tipo de página fica no espaço de documentação da empresa, publicada por `skills/21-documentation-publication`.

## Pasta Features (obrigatória)

Toda Feature publicada vira uma subpágina da pasta **Features**. **Onde a pasta Features fica é informado por quem publica, a cada publicação** — o núcleo não tem valor padrão nem adivinha o local (ver `process/10-core-agnosticism-gate.md`).

```
<local informado por quem publica>      — ex.: coleção da área ou da equipe
└── Features
    └── <Nome da Feature>               — ficha (ver PAGE-MODELS.md)
        ├── 01 — <Nome>
        ├── 02 — <Nome>
        └── NN — <Nome>
```

## Demais pastas (sugestão para um workspace novo)

Para quem monta o espaço de documentação do zero, a sugestão é:

```
/Home
/Standards          — padrões de documentação e código (ver STANDARDS.md, boas-praticas-dev/)
/Architecture       — ADRs e diagramas de contexto (ARCHITECTURE.template.md)
/Runbooks           — runbooks de produção (RUNBOOK.template.md)
/Memory             — lições aprendidas consolidadas (MEMORY.template.md)
/Features           — uma subpágina por Feature publicada
/Reports            — TCO, progresso, auditoria
```

Num workspace que já tem organização própria, ela prevalece: só a pasta Features é obrigatória.

## Regras
- Nenhuma Feature é publicada fora de uma pasta Features — nunca solta na raiz nem direto na página da área.
- O local da pasta Features é perguntado antes de publicar. Se a pasta não existir no local informado, a skill pergunta antes de criá-la.
- Os documentos de uma Feature (`NN — Nome`) são filhos da ficha, nunca irmãos dela.
- A árvore de páginas própria de cada empresa fica no perfil dela (seção "Processos" do `perfil.md`, `process/17-company-profile.md`).
