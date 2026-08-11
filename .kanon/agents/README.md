# Agentes de IA — Time Virtual de Engenharia

Coleção de 12 personas de IA que representam papéis de um time de engenharia de software. Cada uma valida o trabalho sob sua lente (arquitetura, segurança, testes, processo, etc.), com base nos princípios de [`reference/boas-praticas-dev/`](../reference/boas-praticas-dev), mas sem se limitar a eles — cada persona também traz conhecimento geral consolidado da sua função.

Cada arquivo é **autocontido**: pode ser copiado e colado como prompt de sistema em qualquer IA de chat (ChatGPT, Gemini, Cursor, Claude, etc.) ou usado como subagente no Claude Code, sem depender dos outros arquivos desta pasta. Termos técnicos estão linkados ao [Glossário](GLOSSARIO.md) na primeira ocorrência em cada arquivo.

Todos os 12 papéis operam sob o contrato operacional comum definido em [`../process/`](../process/README.md) — como agir em sequência previsível, como formatar saída, como fazer [handoff](../process/GLOSSARIO.md#handoff), e o que fazer quando algo falha.

## O time e o fluxo de trabalho

O fluxo abaixo é sequencial por padrão, mas com dois tipos de papel que atravessam todas as fases: **TECH-LEAD** e **SCRUM-MASTER** (cross-cutting), e um shift-left explícito do **QA-ENGINEER**, que entra desde a arquitetura — não só no final.

```
PO → UI-UX-DESIGNER → ARCHITECT → TECH-LEAD ─┬→ BACKEND-ENGINEER  ─┐
        │                                      ├→ FRONTEND-ENGINEER ─┼→ CODE-REVIEWER → SECURITY-ENGINEER → QA-ENGINEER (validação final) → SRE
        │                                      └→ DATA-ENGINEER      ─┘                                            │
        │                                                                                                            ▼
        └──────────────────────── QA-ENGINEER entra aqui (shift-left) ────────────────────────────────  feedback para PO
             define estratégia de testes e critérios de aceite testáveis
             junto com ARCHITECT/TECH-LEAD, antes de qualquer código existir

Cruzando todas as fases: TECH-LEAD (autoridade técnica/desempate) e SCRUM-MASTER (cadência e processo)
```

## Papéis

| Papel | Missão em uma linha | Entra em cena |
|---|---|---|
| [PO](AGENT-PO.md) | Definir o quê e o porquê, com critérios de aceite claros | Início de tudo |
| [UI-UX-DESIGNER](AGENT-UI-UX-DESIGNER.md) | Desenhar fluxo de interação, wireframes e usabilidade | Após o PO, antes do ARCHITECT |
| [ARCHITECT](AGENT-ARCHITECT.md) | Desenhar a estrutura técnica da solução | Após requisito e fluxo definidos |
| [TECH-LEAD](AGENT-TECH-LEAD.md) | Validar viabilidade técnica e ser autoridade de desempate | Transversal |
| [QA-ENGINEER](AGENT-QA-ENGINEER.md) | Garantir testabilidade desde o desenho e validar o resultado | Desde a arquitetura (shift-left) e na validação final |
| [BACKEND-ENGINEER](AGENT-BACKEND-ENGINEER.md) | Implementar a lógica de servidor/domínio | Implementação |
| [FRONTEND-ENGINEER](AGENT-FRONTEND-ENGINEER.md) | Implementar a interface e experiência do usuário | Implementação |
| [DATA-ENGINEER](AGENT-DATA-ENGINEER.md) | Construir pipelines e modelos de dados confiáveis | Implementação |
| [CODE-REVIEWER](AGENT-CODE-REVIEWER.md) | Garantir corretude, legibilidade e aderência antes do merge | Pull request |
| [SECURITY-ENGINEER](AGENT-SECURITY-ENGINEER.md) | Identificar e mitigar riscos de segurança | Pull request / contínuo |
| [SRE](AGENT-SRE.md) | Garantir deploy seguro e operação confiável em produção | Deploy / operação |
| [SCRUM-MASTER](AGENT-SCRUM-MASTER.md) | Facilitar processo, cadência e remoção de impedimentos | Transversal |

## Como usar

**Como prompt de sistema em qualquer IA de chat**: copie o conteúdo do arquivo do papel desejado e cole como instrução de sistema (ou primeira mensagem) antes de pedir para revisar/gerar código.

**Como checklist manual**: use a seção "Checklist de validação" de cada arquivo como lista de verificação humana antes de abrir um PR ou em uma revisão.

**Como subagente em ferramentas que suportam (ex.: Claude Code, Cursor)**: registre o conteúdo do arquivo como definição de subagente/regra da ferramenta. Cada arquivo já descreve, na seção "Quando agir", os três modos de disparo (proativo, sob demanda, integrado a pipeline) de forma agnóstica de ferramenta — adapte para o mecanismo de automação específico (hooks, rules, custom instructions).

## Referência

- [Glossário](GLOSSARIO.md) — termos técnicos específicos destes papéis (UX, dados, deploy, cerimônias ágeis). Termos já cobertos pelo glossário de `reference/boas-praticas-dev/` são linkados diretamente lá.

## Fonte das regras

As regras citadas com "(base: `NN-arquivo.md`)" vêm de [`reference/boas-praticas-dev/`](../reference/boas-praticas-dev). Regras sem citação são conhecimento geral e reconhecido da função, incluído para que cada persona seja útil mesmo fora deste repositório.
