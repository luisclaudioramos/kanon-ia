# 50 — Design Profile

## Propósito
Descobrir e registrar o que cada sistema já tem definido de design — mobile first, tokens, design system, Atomic Design, biblioteca de componentes —, os padrões visuais por função e o legado fora deles. É esse perfil que decide quais regras de [`process/16-design-foundations.md`](../../process/16-design-foundations.md) bloqueiam e quais só incentivam. Sem ele, "obrigatório" muda de uma revisão para outra.

## Fase / Posição no fluxo
Transversal. Roda na primeira Feature que mexe em tela de um sistema sem perfil (acionada por [`05-refine-user-stories`](../05-refine-user-stories/SKILL.md)), quando a estrutura de design do sistema muda (ex.: entra um pacote de tokens) e quando o perfil tem mais de 90 dias. Também sob demanda.

## Entradas
- Código do sistema e a documentação as-is dele.
- Telas do sistema, pelas fontes de [`48-screen-validation`](../48-screen-validation/SKILL.md).

## Saídas
- `projects/<projeto>/<sistema>/DESIGN-PROFILE.md` no repositório de conteúdo (ver [`templates/DESIGN-PROFILE.template.md`](../../templates/DESIGN-PROFILE.template.md)).
- Seção "Design" na documentação as-is do sistema, resumindo o perfil e apontando para ele.
- Lista de bugs visuais propostos (um por padrão divergente), para o refinamento.

## Regras principais

### Etapas
1. **Leitura**: documentação as-is e código — arquivos de tokens e de tema, bibliotecas no manifesto de dependências, componentes compartilhados, catálogo de componentes (ex.: Storybook), media queries e breakpoints.
2. **Capturas**: telas principais em 390, 768 e 1920 px, pelas fontes da skill 48. Sem acesso, usa os prints do as-is e registra a lacuna.
3. **Proposta**: itens estruturais com evidência (`arquivo:linha` e números de uso), breakpoints, padrões por função e inventário, separando bug visual de oportunidade técnica conforme `process/16`.
4. **Confirmação**: o Tech Lead confirma cada item, padrão e linha do inventário.
5. **Gravação**: grava o perfil, a linha do "Histórico de confirmações" e a seção "Design" do as-is.
6. **Bugs visuais**: propõe um bug por padrão divergente, com a gravidade pelo efeito. A criação no work item acontece no refinamento, com o ok do Tech Lead.

### Critérios
- **`definido` exige ser a norma, não só existir.** A proposta mostra os números (ex.: "180 usos de token × 95 cores fixas") e o Tech Lead decide.
- **Padrão por função** é proposto pelo uso mais frequente; o Tech Lead confirma ou escolhe outro.
- O inventário guarda **só o legado**: o que a mudança atual introduz é cobrado por `process/16`, não inventariado.
- PR que corrige item do inventário só atualiza o estado da linha (`corrigido`, com o link da PR); não roda a skill inteira.
- Afirmações sobre o código citam `arquivo:linha` ([`process/12-knowledge-retrieval.md`](../../process/12-knowledge-retrieval.md)).

## Depende de
- `process/16-design-foundations.md`, `templates/DESIGN-PROFILE.template.md`, `48-screen-validation`, `32-report-bug`.
- `agents/AGENT-UI-UX-DESIGNER.md`, `agents/AGENT-FRONTEND-ENGINEER.md`, `process/11-subagent-anti-hallucination.md`, `process/12-knowledge-retrieval.md`, `process/13-external-integration-prerequisite.md`.

## Procedimento em caso de falha
Sem acesso ao repositório, a skill não propõe perfil: registra a exceção (`process/13`) e o sistema segue o modo "sistema sem perfil" de `process/16`. Item sem evidência suficiente é proposto como `não definido`, nunca como `definido`. Sem acesso às telas, as capturas faltantes ficam registradas como lacuna no perfil, e os bugs de D1 delas não são propostos até haver captura.
