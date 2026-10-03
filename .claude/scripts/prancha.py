#!/usr/bin/env python3
"""Compõe as imagens de uma tela em 390, 768 e 1920 px lado a lado, com o rótulo de cada largura.

Uso: prancha.py <saida.png> <img-390> <img-768> <img-1920>  (em qualquer ordem; ordena pela largura)
Saída: 0 ok · 1 uso errado, imagem inexistente ou larguras diferentes de 390, 768 e 1920.
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

LARGURAS = ["390 px", "768 px", "1920 px"]
MARGEM = 40
ROTULO = 60


def main(args):
    if len(args) != 4:
        print("uso: prancha.py <saida.png> <img-390> <img-768> <img-1920>", file=sys.stderr)
        return 1
    saida, imagens = args[0], args[1:]
    for caminho in imagens:
        if not os.path.isfile(caminho):
            print(f"imagem inexistente: {caminho}", file=sys.stderr)
            return 1
    abertas = sorted((Image.open(c).convert("RGB") for c in imagens), key=lambda i: i.width)
    larguras = [i.width for i in abertas]
    if larguras != [390, 768, 1920]:
        print(f"larguras esperadas 390, 768 e 1920 px; recebidas {larguras}", file=sys.stderr)
        return 1
    largura = sum(i.width for i in abertas) + MARGEM * (len(abertas) + 1)
    altura = max(i.height for i in abertas) + ROTULO + 2 * MARGEM
    prancha = Image.new("RGB", (largura, altura), (255, 255, 255))
    desenho = ImageDraw.Draw(prancha)
    fonte = None
    for nome in ("DejaVuSans-Bold.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "Arial Bold.ttf", "arialbd.ttf"):
        try:
            fonte = ImageFont.truetype(nome, 32)
            break
        except OSError:
            continue
    if fonte is None:
        try:
            fonte = ImageFont.load_default(size=32)
        except TypeError:
            fonte = ImageFont.load_default()
    x = MARGEM
    for img, rotulo in zip(abertas, LARGURAS):
        desenho.text((x, MARGEM), rotulo, fill=(40, 40, 40), font=fonte)
        prancha.paste(img, (x, MARGEM + ROTULO))
        x += img.width + MARGEM
    prancha.save(saida)
    print(saida)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
