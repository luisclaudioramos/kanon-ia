#!/usr/bin/env bash
# Converte cada .html de uma pasta em PNG com o Chrome headless e recorta a altura útil.
# Uso: render-screens.sh <pasta-entrada> <pasta-saida> [largura=1920]
# Saída: 0 ok · 2 Chrome ausente · 3 nenhum .html na entrada · 4 Pillow ausente
set -euo pipefail
IN="${1:?uso: render-screens.sh <pasta-entrada> <pasta-saida> [largura]}"
OUT="${2:?uso: render-screens.sh <pasta-entrada> <pasta-saida> [largura]}"
W="${3:-1920}"
CHROME="${CHROME_BIN:-$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)}"
[ -n "$CHROME" ] || { echo "Chrome não encontrado (defina CHROME_BIN)" >&2; exit 2; }
python3 -c "import PIL" 2>/dev/null || { echo "Pillow não instalado (pip install pillow)" >&2; exit 4; }
shopt -s nullglob
files=("$IN"/*.html)
[ ${#files[@]} -gt 0 ] || { echo "nenhum .html em $IN" >&2; exit 3; }
mkdir -p "$OUT"
for f in "${files[@]}"; do
  name="$(basename "${f%.html}")"
  full="$OUT/$name.full.png"
  timeout 60 "$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --force-device-scale-factor=1 --virtual-time-budget=4000 \
    --window-size="$W",4000 --screenshot="$full" "file://$(realpath "$f")" >/dev/null 2>&1
  python3 - "$full" "$OUT/$name.png" <<'PY'
import sys
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB'); w, h = im.size; px = im.load()
bg = px[w - 1, h - 1]
last = 0
for y in range(h - 1, -1, -1):
    if any(px[x, y] != bg for x in range(0, w, 3)):
        last = y
        break
im.crop((0, 0, w, min(h, max(last + 48, 200)))).save(dst)
PY
  rm -f "$full"
  echo "$OUT/$name.png"
done
