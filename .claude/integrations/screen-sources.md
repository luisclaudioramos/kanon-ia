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
| Link publicado (v0, Lovable e outros) | Chrome headless | `$CHROME_BIN`, ou `command -v google-chrome chromium chromium-browser` | print |
| Protótipo gerado | `.claude/scripts/render-screens.sh` | o mesmo Chrome da linha acima e `python3 -c "import PIL"` | print |

## Limitações

- **Anexos no Slack**: o MCP do Slack não anexa arquivos. A skill cria um rascunho (`slack_send_message_draft`, um por canal); o Tech Lead anexa as imagens e envia; a skill lê o canal depois para registrar o link do envio.
- **Login**: a IA nunca digita senha. Em sistema com SSO, o Tech Lead faz o login no navegador, e só depois a IA navega e captura.
- **Larguras**: toda tela em 390, 768 e 1920 px (`process/16-design-foundations.md`, D1). No `claude-in-chrome`, redimensionar a janela para cada largura (`resize_window`) antes de capturar; no Playwright, definir o viewport. Protótipo gerado: `render-screens.sh <entrada> <saída> 390,768,1920`, que também monta a prancha. Prints soltos: `prancha.py <saída> <390> <768> <1920>`.
