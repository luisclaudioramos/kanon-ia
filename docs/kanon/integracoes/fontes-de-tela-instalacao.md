# Fontes de tela — instalação das ferramentas para as IAs

Como deixar cada fonte de tela da `skills/48-screen-validation` e da `skills/50-design-profile` disponível para a IA. A lista de fontes e o teste de cada uma ficam em [`.claude/integrations/screen-sources.md`](../../../.claude/integrations/screen-sources.md); aqui fica **como instalar**, no Claude Code e em outras IAs que falam MCP (Model Context Protocol, o padrão que liga a IA a ferramentas externas).

_Conferido em 2026-10-03 nesta máquina (Linux, Node 22, Claude Code). Versões e telas de configuração mudam: confira a documentação do fornecedor quando um comando falhar._

## Resumo

| Fonte | O que instalar | Precisa de conta ou chave? | Obrigatório? |
|---|---|---|---|
| Print | nada — a IA lê imagem; print do Slack vem pelo MCP do Slack | não | — |
| Acesso ao sistema | **Playwright MCP** (recomendado) ou **Claude in Chrome** | não; o login no sistema é feito por você | recomendado |
| Protótipo gerado | Google Chrome + Python 3 com Pillow (scripts `render-screens.sh` e `prancha.py`) | não | sim, para gerar telas |
| Google Stitch | MCP do Stitch (HTTP) | chave de API do Google | só se o time usar Stitch |
| Figma | MCP do Figma (remoto ou do app desktop) | conta Figma; assento View limita as chamadas | só se o time usar Figma |
| Claude Design | nada — leitura de artefato pelo link | conta claude.ai | — |
| Outras (v0, Lovable, Canva, Penpot) | nada — usar o link publicado no Chrome headless, ou exportar PNG | — | — |

## Pré-requisitos da máquina

1. **Node.js 18 ou mais novo** (`node --version`). O Playwright MCP roda com `npx`.
2. **Google Chrome** (`command -v google-chrome`) ou Chromium. Para outro caminho, defina `CHROME_BIN`.
3. **Python 3 com Pillow**: `python3 -c "import PIL"`; se faltar, `pip install pillow`.
4. **Certificado da rede corporativa para o Node.** Na rede da empresa (proxy ou WARP), o `npm`/`npx` falha com `SELF_SIGNED_CERT_IN_CHAIN`. O sistema já confia no certificado; falta apontar o Node para ele. No `~/.bashrc` (ou equivalente):
   ```bash
   export NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
   ```
   Teste: `npm view @playwright/mcp version` devolve um número (ex.: `0.0.83`).
5. **Chaves nunca no repositório.** Chave de API fica em variável de ambiente ou no arquivo de configuração do usuário (`~/.claude.json`, `~/.codex/config.toml` etc.), nunca em arquivo versionado.

## Claude Code

| Ferramenta | Instalação | Teste |
|---|---|---|
| Playwright MCP | `claude mcp add -s user playwright -e NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt -- npx @playwright/mcp@latest` — `-s user` deixa o servidor em todos os projetos; a variável do certificado fica na configuração do servidor e não depende do terminal; o `-e` vem **depois** do nome (antes dele, o CLI lê o nome como variável) | `claude mcp list` mostra `playwright ... Connected`; numa sessão nova, as ferramentas `mcp__playwright__*` aparecem |
| Claude in Chrome | instalar a extensão **Claude** no Chrome, entrar com a mesma conta e iniciar o Claude Code com `claude --chrome` (ou ativar pelo `/chrome` na sessão) | `list_connected_browsers` não vem vazio |
| Google Stitch | `claude mcp add --transport http stitch https://stitch.googleapis.com/mcp --header "X-Goog-Api-Key: $STITCH_API_KEY"` | `list_projects` responde (lista vazia = sem projetos próprios) |
| Figma (remoto) | conector **Figma** no claude.ai (Configurações → Conectores), que o Claude Code usa com a mesma conta; ou `claude mcp add --transport http figma https://mcp.figma.com/mcp` e autorizar no navegador | `whoami` mostra o usuário e o assento |
| Figma (app desktop) | no app Figma, ativar o servidor MCP do Dev Mode; depois `claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp` | `get_screenshot` de um quadro aberto no app |
| Chrome headless e scripts | já vêm no repositório: `.claude/scripts/render-screens.sh` e `.claude/scripts/prancha.py` | `.claude/scripts/render-screens.sh <pasta-com-html> /tmp/saida 390,768,1920` gera as três imagens e a prancha |

**Depois de instalar um MCP, abra uma sessão nova**: o servidor só carrega no início da sessão. Enquanto isso, a falta fica registrada como exceção (`process/13`) e é revalidada na sessão seguinte.

**Captura em 390 px**: janela de navegador tem largura mínima (em geral uns 500 px). Com o Playwright, defina o viewport; com o Claude in Chrome, use o modo de dispositivo do DevTools. Confira `window.innerWidth` antes de capturar.

## Outras IAs

O servidor é o mesmo; muda só o arquivo de configuração. Os blocos abaixo instalam o **Playwright MCP**; para servidores remotos (Stitch, Figma), use a forma HTTP da ferramenta, quando houver, ou a ponte `mcp-remote`.

### Claude Desktop

Arquivo `claude_desktop_config.json` (Configurações → Desenvolvedor → Editar configuração):
```json
{
  "mcpServers": {
    "playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] }
  }
}
```
Figma, Canva e outros conectores oficiais: Configurações → Conectores, na conta do claude.ai.

### Codex CLI (OpenAI)

Arquivo `~/.codex/config.toml`:
```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest"]

[mcp_servers.stitch]
command = "npx"
args = ["mcp-remote", "https://stitch.googleapis.com/mcp", "--header", "X-Goog-Api-Key:${STITCH_API_KEY}"]
env = { STITCH_API_KEY = "<sua chave>" }
```

### Gemini CLI

Arquivo `~/.gemini/settings.json`:
```json
{
  "mcpServers": {
    "playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] },
    "stitch": {
      "httpUrl": "https://stitch.googleapis.com/mcp",
      "headers": { "X-Goog-Api-Key": "$STITCH_API_KEY" }
    }
  }
}
```

### Cursor

Arquivo `~/.cursor/mcp.json` (ou `.cursor/mcp.json` no projeto, sem chaves):
```json
{
  "mcpServers": {
    "playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] },
    "figma": { "url": "https://mcp.figma.com/mcp" }
  }
}
```

### Qualquer outra IA com MCP

- Servidor local (stdio): `npx @playwright/mcp@latest`.
- Servidor remoto (HTTP): a URL do fornecedor (`https://stitch.googleapis.com/mcp`, `https://mcp.figma.com/mcp`), com o cabeçalho de chave quando pedir. Se a IA só aceita servidor local, use `npx mcp-remote <url>` como ponte.
- Sem MCP nenhum: a IA ainda valida telas por print — exportar PNG da ferramenta de design ou capturar a tela e anexar.

## Regras que valem para qualquer IA

- **A IA nunca digita senha.** Em sistema com login (SSO), quem entra é você, no navegador que a IA vai usar; só depois ela navega e captura.
- **Três larguras**: 390, 768 e 1920 px (`process/16-design-foundations.md`, D1).
- **Fonte faltando não trava o trabalho**: usar o caminho alternativo (print) e registrar a exceção, como manda `process/13`.
