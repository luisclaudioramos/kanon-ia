# 10 — Core-Agnosticism Gate (Selo I)

## Propósito
Garantir que nenhum código/artefato gerado contenha hardcodes de ambiente (URLs de produção, chaves de API específicas), separando o núcleo `.kanon/` das configurações de ambiente externas. Desde 2026-10-11, o núcleo também não carrega nome de empresa, área, equipe, pessoa, canal ou ferramenta: esses nomes vivem no perfil da empresa e nos adaptadores ([`17-company-profile.md`](17-company-profile.md)).

## Quando se aplica
Sobre todo artefato de código gerado, antes de ser aceito como entregue.

## Regras
- Nenhum valor de ambiente específico (URL de produção, chave de API, credencial, hostname interno) aparece hardcoded em código gerado — sempre via variável de ambiente ou configuração externa ao núcleo.
- O núcleo `.kanon/` nunca referencia diretamente um valor de um ambiente específico; ele conhece apenas o *nome* da configuração, não o valor.
- Esta regra vale mesmo em exemplos/testes gerados — nenhum artefato, nem de exemplo, deve conter um segredo ou endpoint real.
- Nenhum nome próprio de empresa, área, equipe, pessoa ou canal, nem nome de ferramenta com adaptador na camada de integração, aparece em `.kanon/` — nem como exemplo. A lista é derivada dos perfis conhecidos (`nomes_reservados`) e dos adaptadores (`nomes`), nunca escrita no gate. Vale também para `agents/` e `templates/`.

## Sinais de violação
- Uma URL de produção aparecendo direto no código gerado.
- Uma chave de API literal em um artefato, mesmo que apresentada como "só de exemplo".
- Uma skill citando a ferramenta de trabalho ou o canal de uma empresa pelo nome.

## Procedimento em caso de falha
Se o gate detectar um hardcode de ambiente, o artefato é rejeitado e devolvido ao agente que o gerou, com o local exato do hardcode — nunca aceito com uma ressalva.

## Exemplo concreto

**Errado** — valor de ambiente hardcoded:
```
const API_URL = "https://api.acme-corp.com/v2"
```

**Certo** — valor real vive fora do núcleo:
```
const API_URL = process.env.API_URL
// .kanon/ conhece apenas o nome API_URL; o valor real vive na configuração do ambiente de deploy
```
