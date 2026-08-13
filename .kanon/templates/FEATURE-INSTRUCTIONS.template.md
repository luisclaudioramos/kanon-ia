# Guia — Como Especificar uma Feature

_Meta-template: apoia `skills/01-refine-feature` antes de usar [FEATURE.template.md](FEATURE.template.md)._

## Faça
- Separe claramente Requisitos Funcionais (RF) de Não Funcionais (RNF).
- Torne cada RF mensurável/verificável — se não dá pra testar, não está pronto para virar RF.
- Descreva o problema de negócio antes da solução (ver `agents/AGENT-PO.md`).
- Registre o glossário de termos específicos do domínio, para evitar ambiguidade entre PO, Architect e Engenheiros.

## Evite
- RNF vago ("deve ser rápido") sem um número ou limiar objetivo.
- Especificar a solução técnica dentro da Feature (isso é papel de `ARCHITECTURE.md`, não de `FEATURE.md`).
- Requisitos que dependem de uma decisão de arquitetura ainda não tomada.

## Checklist antes de avançar para `skills/03-create-feature-artifacts`
- [ ] Todo RF tem critério de aceite verificável.
- [ ] Todo RNF tem uma forma objetiva de validação.
- [ ] Glossário revisado com o time.
