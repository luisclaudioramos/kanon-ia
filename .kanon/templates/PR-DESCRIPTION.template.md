# _[preencher: título da PR — verbo + o que muda, ex.: "Torna celular opcional no cadastro"]_

_Gerado por `skills/12-development-execution` / `skills/34-pull-request-review`. Regras: `process/15-pull-request-gates.md`._
_Qualquer seção aceita "Não se aplica: _motivo_". "N/A" sozinho reprova._

## User Story
_[preencher: link da US]_

## Como era (as-is)
_[preencher: o que o código fazia antes, em comportamento. Trava 1]_

## Como fica (to-be)
_[preencher: o que passa a fazer. Trava 1]_

## Integrações
- **Consome**: _[preencher: APIs, filas, bancos, libs que esta mudança usa]_
- **Quem consome o que mudou**: _[preencher: sistemas ou telas afetados]_
- **Quebra contrato?**: _[preencher: não / sim — para quem e como migrar]_

_Trava 5._

## Como testar
1. **Ambiente**: _[preencher]_
2. **Pré-condição**: _[preencher]_
3. **Ação**: _[preencher]_
4. **Resultado esperado**: _[preencher]_

TEST-CASE: _[preencher: link, ou "Não se aplica: motivo"]_ · _Trava 4._

## Massa de teste
_[preencher: onde está (script, seed, payload, usuário de teste de homologação), ou "Não precisa: motivo"]_
**Sempre sintética ou anonimizada. Nunca CPF, e-mail ou telefone real de cliente (LGPD).** · _Trava 7._

## Testes
- [ ] Testes unitários do comportamento novo ou corrigido (trava 3) — ou exceção: _[preencher: só docs / só migração SQL / só versão de dependência / só HTML/CSS sem lógica]_
- [ ] Cobertura do diff: 100% de linhas e branches (trava 11) — relatório: _[preencher: link ou trecho]_ — exceções: _[preencher: código gerado / DTO sem lógica / configuração de inicialização, ou "nenhuma"]_
- [ ] Mocks e fixtures atualizados para o contrato novo (trava 10)
- [ ] Suíte completa passando: unitários, integração, E2E quando existir (trava 10) — ressalva de ambiente: _[preencher ou "nenhuma"]_
- [ ] Teste de mutação (só PR produzida pelo kanon): _[preencher: mutantes sobreviventes no código alterado = 0, ou relatório de lacunas]_ (trava 11)

## Validação de tela
_Só em PR que mexe na interface de uma US com telas (`skills/48-screen-validation`). Senão: "Não se aplica: motivo"._

| Tela | Versão aprovada | Registro | Implementada × aprovada |
|---|---|---|---|
| _[preencher: NN-nome]_ | _[preencher: vN, ou "aguardando validação — estado: enviada"]_ | _[preencher: link da linha no registro de aprovações]_ | _[preencher: print lado a lado, na mesma escala]_ |

_Trava 12 (alerta, não bloqueia o merge). Diferença entre implementada e aprovada: corrigir, ou abrir mudança pedida (`skills/49-change-impact`)._

## Documentação atualizada
_[preencher: docs do sistema atual alteradas para o to-be (README, docs do repositório, wiki), ou "Nenhuma doc descreve esse comportamento"]_ · _Trava 9._

## Alerta de tamanho
_Preencher só se a PR tiver mais de 20 arquivos ou 400 linhas, ou mexer em contrato público, migração de banco ou biblioteca compartilhada (trava 6). Nesse caso, a PR precisa de 2 aprovações (trava 8)._

**Áreas ou sistemas que podem ser afetados**: _[preencher]_
