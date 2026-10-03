#!/usr/bin/env bash
# Converte cada .html de uma pasta em PNG com o Chrome headless e recorta a altura útil.
# Uso: render-screens.sh <pasta-entrada> <pasta-saida> [larguras=1920]  (ex.: 390,768,1920)
# Com uma largura: <nome>.png. Com várias: <nome>.<largura>.png; com 390,768,1920 também <nome>.prancha.png.
# Saída: 0 ok · 1 largura inválida · 2 Chrome ausente · 3 entrada inexistente ou sem .html · 4 Pillow ausente · 5 falha do Chrome ao renderizar
# Avisa no stderr quando a página passa de 4000 px e foi cortada.
set -euo pipefail
IN="${1:?uso: render-screens.sh <pasta-entrada> <pasta-saida> [largura]}"
OUT="${2:?uso: render-screens.sh <pasta-entrada> <pasta-saida> [largura]}"
WIDTHS="${3:-1920}"
[[ "$WIDTHS" =~ ^[0-9]+(,[0-9]+)*$ ]] || { echo "larguras inválidas: $WIDTHS (ex.: 1920 ou 390,768,1920)" >&2; exit 1; }
IFS=, read -r -a WLIST <<< "$WIDTHS"
[ -d "$IN" ] || { echo "pasta de entrada não existe: $IN" >&2; exit 3; }
CHROME="${CHROME_BIN:-$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)}"
[ -n "$CHROME" ] && [ -x "$CHROME" ] || { echo "Chrome não encontrado ou não executável: ${CHROME:-nenhum} (defina CHROME_BIN)" >&2; exit 2; }
python3 -c "import PIL" 2>/dev/null || { echo "Pillow não instalado (pip install pillow)" >&2; exit 4; }
shopt -s nullglob
files=("$IN"/*.html)
[ ${#files[@]} -gt 0 ] || { echo "nenhum .html em $IN" >&2; exit 3; }
mkdir -p "$OUT"
for f in "${files[@]}"; do
  name="$(basename "${f%.html}")"
  for W in "${WLIST[@]}"; do
    if [ ${#WLIST[@]} -eq 1 ]; then dst="$OUT/$name.png"; else dst="$OUT/$name.$W.png"; fi
    full="$dst.full.png"
    if ! timeout 60 "$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
      --force-device-scale-factor=1 --virtual-time-budget=4000 \
      --window-size="$W",4000 --screenshot="$full" "file://$(realpath "$f")" >/dev/null 2>&1 || [ ! -s "$full" ]; then
      echo "falha do Chrome ao renderizar $f em $W px" >&2; rm -f "$full"; exit 5
    fi
    python3 - "$full" "$dst" <<'PY'
import sys
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB'); w, h = im.size; px = im.load()
bottom = {px[x, h - 1] for x in range(0, w, 3)}
last = h - 1
if len(bottom) == 1:
    bg = bottom.pop()
    last = 0
    for y in range(h - 1, -1, -1):
        if any(px[x, y] != bg for x in range(0, w, 3)):
            last = y
            break
if last >= h - 48:
    print(f'aviso: {dst} foi cortada em {h} px (a página é maior)', file=sys.stderr)
im.crop((0, 0, w, min(h, max(last + 48, 200)))).save(dst)
PY
    rm -f "$full"
    echo "$dst"
  done
  if [ "$WIDTHS" = "390,768,1920" ]; then
    python3 "$(dirname "$0")/prancha.py" "$OUT/$name.prancha.png" "$OUT/$name.390.png" "$OUT/$name.768.png" "$OUT/$name.1920.png"
  fi
done
