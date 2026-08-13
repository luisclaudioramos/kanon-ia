# Técnicas de Elicitação

Nenhuma técnica sozinha cobre todos os cenários — a escolha depende de quem é o [stakeholder](GLOSSARIO.md#stakeholder), do quanto o problema já é conhecido, e de quanto tempo/acesso existe. Combine mais de uma sempre que possível.

## Comunicação direta
- **Entrevista individual**: conversa 1-a-1 com um stakeholder específico — boa para aprofundar em um papel, ruim para capturar conflito de interesse entre áreas diferentes.
- **Workshop/sessão em grupo**: reúne stakeholders com visões diferentes na mesma sala — expõe conflitos cedo (melhor descobrir agora do que no meio do desenvolvimento), mas exige facilitação ativa para não virar reunião sem direção.
- **Brainstorming**: geração ampla de ideias sem filtro, útil na fase de [Discovery](GLOSSARIO.md#discovery) — a triagem do que é viável vem depois, na fase de Análise, nunca durante o brainstorm.

## Observação
- **[Shadowing](GLOSSARIO.md#shadowing)**: acompanhar o usuário final operando o sistema de verdade — revela atalhos, planilhas paralelas e processos informais que ele não mencionaria numa entrevista, porque nem percebe que faz.
- **Engenharia Reversa**: quando não há stakeholder disponível para explicar uma regra (sistema antigo, dono original saiu da empresa), a fonte da verdade vira o próprio código/banco/logs. Ver [07-sistemas-legados-brownfield.md](07-sistemas-legados-brownfield.md).

## Visualização e prototipagem
- **Protótipo/Mockup de baixa fidelidade**: desenhar a solução (mesmo que em papel ou wireframe simples) antes de escrever qualquer linha de código — muito mais barato de corrigir um desenho errado do que uma implementação errada.
- **[User Story Mapping](GLOSSARIO.md#user-story-mapping)**: organizar as necessidades ao longo da jornada do usuário, não como lista plana — ajuda a enxergar onde cortar um [MVP](GLOSSARIO.md#mvp) sem quebrar o fluxo.

## Análise documental
- **Revisão de documentação/artefatos existentes**: tickets antigos, especificações anteriores, e-mails, planilhas de referência — sempre checar antes de assumir que o requisito é inédito (ver "Verificação antes de começar" em [01-processo-de-elicitacao.md](01-processo-de-elicitacao.md)).
- **[Data Mapping](GLOSSARIO.md#data-mapping)**: para requisitos que envolvem integração entre sistemas, mapear de onde o dado vem e para onde vai antes de propor mudança.

## Como escolher

| Situação | Técnica mais indicada |
|---|---|
| Problema novo, ninguém sabe a solução ainda | Brainstorming + Protótipo + workshop com [Design Thinking](GLOSSARIO.md#design-thinking) |
| Sistema legado sem documentação confiável | Engenharia Reversa + Shadowing |
| Múltiplas áreas com interesses conflitantes | Workshop em grupo (expõe o conflito) antes de entrevistas 1-a-1 |
| Requisito de integração entre sistemas | Data Mapping antes de qualquer entrevista |
| Requisito pontual, dono claro, baixo risco | Entrevista individual + revisão documental |
