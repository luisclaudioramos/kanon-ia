# Arquitetura e Design Patterns

## Princípios SOLID
- **S**ingle Responsibility: uma classe, um motivo para mudar.
- **O**pen/Closed: aberto para extensão, fechado para modificação — estenda comportamento sem alterar código existente e testado.
- **L**iskov Substitution: uma subclasse deve poder substituir sua classe base sem quebrar o comportamento esperado.
- **I**nterface Segregation: prefira interfaces pequenas e específicas a uma única interface genérica e inchada.
- **D**ependency Inversion: dependa de abstrações, não de implementações concretas — facilita testes e troca de implementação.

## Separação de responsabilidades
- Separe lógica de negócio de infraestrutura (banco, HTTP, filesystem) — facilita testes unitários e troca de tecnologia.
- Camadas comuns: apresentação (UI/API) → aplicação (casos de uso) → domínio (regras de negócio) → infraestrutura (persistência, integrações externas).

## Acoplamento e coesão
- Busque alta coesão (elementos relacionados ficam juntos) e baixo acoplamento (módulos dependem pouco uns dos outros).
- Prefira composição a herança quando possível — herança profunda cria acoplamento rígido e difícil de refatorar.

## Design Patterns — quando usar
- [Patterns](GLOSSARIO.md#design-pattern) resolvem problemas recorrentes conhecidos (Factory, Strategy, Observer, Repository, etc.) — mas não force um padrão onde a solução simples já resolve.
- Um pattern mal aplicado adiciona complexidade sem benefício. Use quando o problema real exigir a flexibilidade que o padrão oferece.

## Decisões arquiteturais
- Escolha a arquitetura ([monolito](GLOSSARIO.md#monolito), [microsserviços](GLOSSARIO.md#microsservicos), [serverless](GLOSSARIO.md#serverless)) pelo problema e pelo tamanho do time — não pela moda. Monolito bem modularizado costuma ser a escolha certa para times pequenos/médios.
- Evite otimização prematura de arquitetura para escala que o produto ainda não tem ("você não é o Google").
- Documente decisões importantes com ADRs (ver [Documentação](06-documentacao.md)).

## Design para mudança
- Sistemas de software mudam constantemente — projete para que mudanças de requisito sejam localizadas, não espalhadas por todo o código.
- Isole decisões voláteis (integrações externas, regras que mudam com frequência) atrás de interfaces estáveis.
