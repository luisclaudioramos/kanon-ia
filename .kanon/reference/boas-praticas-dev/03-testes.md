# Testes

## Pirâmide de Testes
- **Unitários** (muitos, rápidos, isolados): testam uma função/classe isoladamente, sem [I/O](GLOSSARIO.md#io) real.
- **Integração** (menos): testam a interação entre módulos reais (banco, filas, APIs internas).
- **End-to-end / E2E** (poucos, mais lentos e caros): testam o fluxo completo do ponto de vista do usuário.

Evite a "pirâmide invertida" (muitos E2E, poucos unitários) — E2E é lento, frágil e caro de manter.

## TDD (Test-Driven Development)
Ciclo red-green-refactor: escreva um teste que falha, implemente o mínimo para passar, depois refatore com a rede de segurança dos testes. Ajuda a projetar APIs mais simples e evita testes escritos "depois, só para bater cobertura".

## O que testar
- Regras de negócio e casos de borda (limites, valores nulos/vazios, condições de erro).
- Comportamento observável (entrada → saída), não detalhes de implementação — testes acoplados a implementação quebram a cada refactor.
- Bugs corrigidos merecem um teste de [regressão](GLOSSARIO.md#regressao) que comprove que não voltam.

## Estrutura de um teste — padrão [AAA](GLOSSARIO.md#aaa)
Todo teste se organiza em três blocos visíveis, nessa ordem:

- **Arrange** — prepara o estado e as entradas (nada de asserção aqui).
- **Act** — executa **uma** ação: a que está sendo testada.
- **Assert** — verifica o resultado observável.

Se o Act tem mais de uma ação, provavelmente são dois testes. Se o Arrange é longo demais para caber na cabeça, geralmente é sinal de que o código sob teste tem dependências demais — o teste está denunciando um problema de design, não sendo chato.

## Boas práticas
- Testes devem ser determinísticos: mesma entrada, mesmo resultado sempre. Nada de dependência de horário do sistema, ordem de execução ou rede real sem necessidade.
- Um teste, uma [asserção](GLOSSARIO.md#assert) lógica — testes que verificam múltiplas coisas dificultam saber o que quebrou.
- Nomeie testes descrevendo o comportamento esperado (`deveRejeitarEmailInvalido`, não `teste1`).
- Mantenha os testes rápidos; suíte lenta é suíte que as pessoas param de rodar.

## [Mocks](GLOSSARIO.md#mock) — quando, onde, como

**Quando precisa:** quando a dependência real tornaria o teste não determinístico ou lento — rede, outro serviço, relógio/data, sistema de arquivos, geração aleatória. Nunca por preguiça de configurar o caso real: mockar o que dava para usar de verdade transforma o teste em uma verificação de que o mock funciona.

**O que não mockar:** aquilo de que você não é dono, ao ponto de o teste deixar de provar algo real (bibliotecas e serviços internos críticos). Para essas fronteiras, prefira teste de integração.

**Onde fica:** colocalizado com o teste que o usa. Só promova a uma pasta compartilhada (`__mocks__/`, `fixtures/`) quando mais de um teste usar o mesmo mock — mock compartilhado cedo demais vira acoplamento entre testes que deveriam ser independentes.

**Como criar:** o mock reflete o contrato real da dependência — mesmo formato de resposta **e de erro**. Um mock que diverge do contrato real é pior que nenhum mock: ele faz o teste passar exatamente enquanto a integração real está quebrada. Quando o contrato é de outro time/serviço, um teste de contrato (ou o schema real versionado) deve ser a fonte do formato do mock, não a memória de quem escreveu o teste.

## Cobertura
- Cobertura de código é um indicador, não um objetivo. 100% de cobertura não garante ausência de bugs; cobertura baixa em código crítico é um sinal de alerta real.
- Priorize cobrir lógica de negócio complexa e código com histórico de bugs.

## Testes como documentação
Um bom teste comunica o comportamento esperado do sistema mais claramente do que um comentário — deve ser possível entender a regra de negócio lendo os testes.
