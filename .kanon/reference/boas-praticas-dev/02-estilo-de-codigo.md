# Estilo e Qualidade de Código

## Nomenclatura
- Todo código — nomes de variáveis, funções, classes, arquivos e comentários — deve ser escrito em inglês, independente do idioma falado pelo time. Garante consistência com bibliotecas/frameworks (majoritariamente em inglês), facilita contribuição de devs de outros países e evita misturar idiomas no mesmo código-base (`getUserData`, não `getDadosUsuario` ou `pegarUserData`).
- Nomes de variáveis, funções e classes devem revelar intenção — evite abreviações obscuras (`d` vs `elapsedDaysSinceCreation`).
- Funções: verbos (`calculateTotal`, `sendEmail`). Classes: substantivos (`Order`, `DatabaseConnection`). Booleanos: prefixo `is`/`has`/`can` (`isValid`, `hasPermission`).
- Seja consistente com a convenção da linguagem/projeto (camelCase, snake_case, PascalCase).

## Funções
- Pequenas e focadas em uma única tarefa (Single Responsibility).
- Prefira poucos parâmetros; muitos parâmetros geralmente indicam que falta um objeto/estrutura agrupando os dados.
- Evite efeitos colaterais escondidos — uma função chamada `calcularTotal()` não deveria também gravar no banco.
- Prefira retornar valores a mutar parâmetros recebidos, quando possível.

## Comentários
- Código bem escrito se explica sozinho; comentários não devem descrever *o quê*, e sim *por quê* (uma decisão não óbvia, uma limitação externa, um workaround).
- Comentário desatualizado é pior que nenhum comentário — mantenha-os sincronizados com o código ou remova.
- Evite comentários que viram "ruído": código comentado, changelogs dentro do arquivo, marcações de autor/data (isso é papel do Git).

## Formatação e Linters
- Use um formatador automático (Prettier, Black, gofmt, etc.) e um [linter](GLOSSARIO.md#linter) (ESLint, Ruff, Pylint) integrados ao editor e ao CI — elimina debates de estilo e erros comuns.
- Configure regras no repositório (não no gosto individual) para manter consistência entre todos os contribuidores.

## Tratamento de Erros
- Trate erros no nível certo — não capture exceções apenas para silenciá-las.
- Mensagens de erro devem ser acionáveis: dizer o que falhou e, quando possível, como corrigir.
- Não use exceções para controle de fluxo normal.

## Controle de Complexidade
- Evite aninhamento profundo (`if` dentro de `if` dentro de `for`) — prefira early returns/[guard clauses](GLOSSARIO.md#guard-clause).
- Limite a [complexidade ciclomática](GLOSSARIO.md#ciclomatica); funções muito ramificadas são difíceis de testar e entender.
- Evite "números mágicos" e strings soltas no meio do código — extraia para constantes nomeadas.

## Consistência
- Siga o estilo já estabelecido no arquivo/projeto, mesmo que não seja o seu preferido pessoal. Consistência > preferência individual.
