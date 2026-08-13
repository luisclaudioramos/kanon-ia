# Glossário

Termos técnicos usados nos documentos desta pasta, para consulta rápida durante a leitura. Os arquivos principais linkam a primeira ocorrência de cada termo aqui.

<a id="analise-de-negocio"></a>
### Análise de Negócio (Business Analysis)
Disciplina que avalia o fluxo de valor de toda a organização — não só o software — para garantir que um requisito esteja alinhado a um objetivo estratégico real, e não apenas a um pedido pontual de um stakeholder. Ver [08](08-visao-estrategica-business-analysis.md).

<a id="brownfield"></a>
### Brownfield
Projeto que evolui ou substitui um sistema já existente, com usuários, dados e regras de negócio acumulados — em oposição a [Greenfield](#greenfield). Ver [07](07-sistemas-legados-brownfield.md).

<a id="data-mapping"></a>
### Data Mapping (Mapeamento de Dados)
Técnica de documentar o fluxo de informação entre sistemas — de onde um dado vem, por onde passa e onde é usado — essencial antes de alterar uma integração existente sem entender todos os seus consumidores.

<a id="design-thinking"></a>
### Design Thinking
Abordagem centrada no usuário para explorar um problema antes de definir a solução — envolve empatia com quem vive o problema, ideação ampla antes de convergir, e validação com protótipos de baixo custo.

<a id="discovery"></a>
### Discovery
Fase inicial e exploratória de um projeto (comum em Ágil e Design Thinking) em que o time investiga o problema de negócio a fundo antes de qualquer definição técnica — o objetivo é entender o que realmente precisa ser construído, não ainda como. Ver [06](06-sistemas-novos-greenfield.md).

<a id="elicitacao"></a>
### Elicitação de Requisitos
Ato de descobrir e coletar as necessidades reais de um stakeholder através de técnicas de comunicação (entrevista, observação, workshop) — a primeira fase do processo de engenharia de requisitos. Ver [01](01-processo-de-elicitacao.md).

<a id="engenharia-reversa"></a>
### Engenharia Reversa (Reverse Engineering)
Técnica de extrair a lógica e as regras de negócio ocultas em um sistema legado — analisando código, banco de dados e logs — quando não há documentação confiável de como ele realmente se comporta. Ver [07](07-sistemas-legados-brownfield.md).

<a id="gherkin"></a>
### Gherkin (Dado/Quando/Então)
Formato estruturado de critério de aceite: `Dado` um contexto inicial, `Quando` uma ação acontece, `Então` um resultado observável é esperado. Torna o requisito testável e sem ambiguidade. Ver [04](04-criterios-de-aceite-e-rastreabilidade.md).

<a id="greenfield"></a>
### Greenfield
Projeto novo, sem sistema legado nem base de usuários existente — o oposto de [Brownfield](#brownfield). Alta incerteza; usuários muitas vezes não sabem o que querem até verem algo pronto. Ver [06](06-sistemas-novos-greenfield.md).

<a id="homologacao"></a>
### Homologação
Confirmação formal, pelo stakeholder/cliente, de que um requisito documentado reflete exatamente o que ele precisa — o "carimbo" que autoriza a especificação a seguir para desenvolvimento. Ver [11](11-validacao-e-homologacao.md).

<a id="invest"></a>
### INVEST
Checklist de qualidade para uma User Story: Independente, Negociável, Valiosa (de negócio), Estimável, pequena (Small) e Testável. Uma story que falha em algum desses critérios geralmente precisa ser reescrita ou dividida.

<a id="mvp"></a>
### MVP (Minimum Viable Product / Mínimo Produto Viável)
O menor recorte de escopo que já entrega valor real e permite validar uma hipótese, evitando construir tudo de uma vez antes de saber se está no caminho certo. Ver [05](05-delimitacao-de-escopo.md).

<a id="rastreabilidade"></a>
### Rastreabilidade
Capacidade de seguir a linha entre um requisito, o objetivo de negócio que o motivou e o critério de aceite que o valida — sem essa linha, é impossível justificar por que algo está sendo construído ou confirmar que resolve o problema certo.

<a id="scope-creep"></a>
### Scope Creep
Crescimento não controlado do escopo de um projeto/entrega ao longo do tempo, geralmente por pedidos incrementais aceitos sem reavaliar prazo/custo — sintoma de delimitação de escopo fraca desde o início. Ver [05](05-delimitacao-de-escopo.md).

<a id="shadowing"></a>
### Shadowing
Técnica de observação direta: acompanhar o usuário final operando o sistema no dia a dia, em vez de só perguntar como ele trabalha — revela atalhos, planilhas paralelas e "gambiarras" operacionais que uma entrevista sozinha não capturaria.

<a id="stakeholder"></a>
### Stakeholder
Qualquer pessoa ou grupo com interesse legítimo no resultado de um projeto — usuário final, gestor, área de negócio, equipe de suporte — nem sempre é quem pede o requisito diretamente.

<a id="user-story-mapping"></a>
### User Story Mapping
Técnica visual de organizar User Stories ao longo da jornada do usuário (não só em uma lista de backlog plana), facilitando enxergar o fluxo completo e onde cortar um MVP.
