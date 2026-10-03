# Fontes de tela — integração no Claude Code

Implementa a etapa 0 da [`skills/48-screen-validation`](../../.kanon/skills/48-screen-validation/SKILL.md) e a regra de fontes de tela de [`process/13`](../../.kanon/process/13-external-integration-prerequisite.md). O núcleo `.kanon/` cita só o tipo de fonte; aqui ficam as ferramentas.

## Fontes

| Fonte | Ferramenta | Como testar | Caminho alternativo |
|---|---|---|---|
| Print | leitura de imagem; `slack_read_file` para print enviado no Slack | — | — |
| Acesso ao sistema | MCP `claude-in-chrome`, ou Playwright MCP | `list_connected_browsers` (lista vazia = nenhum navegador conectado) | instalar o Playwright MCP: `claude mcp add playwright -- npx @playwright/mcp@latest`; ou print |
| Google Stitch | MCP `stitch` | `list_projects` (vazio = sem projetos próprios; pedir compartilhamento) | exportar PNG |
| Figma | MCP Figma do claude.ai | `whoami` — assento View tem limite baixo de chamadas | exportar PNG do Figma |
| Claude Design | leitura de artefato pelo link | abrir o link | exportar PNG ou HTML |
| Link publicado (v0, Lovable e outros) | Chrome headless | `command -v google-chrome` | print |
| Protótipo gerado | `.claude/scripts/render-screens.sh` | `command -v google-chrome` e `python3 -c "import PIL"` | print |

## Limitações

- **Anexos no Slack**: o MCP do Slack não anexa arquivos. A skill cria um rascunho (`slack_send_message_draft`, um por canal); o Tech Lead anexa as imagens e envia; a skill lê o canal depois para registrar o link do envio.
- **Login**: a IA nunca digita senha. Em sistema com SSO, o Tech Lead faz o login no navegador, e só depois a IA navega e captura.
- **Escala**: desktop em 1920 px de largura. Capturas em outra largura são registradas com a largura real na seção "Fontes" e não entram no comparativo.
