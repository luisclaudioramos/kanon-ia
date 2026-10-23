'use strict';
// O que nunca sai num texto para uma pessoa (.kanon/reference/comunicacao/01-regras-gerais.md,
// "O que nunca entra"). Usado pela trava de envio (message-send-gate.js) e pelo validador de
// mensagens e handoffs (scripts/kanon-mensagem.js), para os dois nunca divergirem.
const fs = require('fs');
const path = require('path');

const DADO_PROIBIDO = [
  { nome: 'CPF', re: /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/ },
  { nome: 'CNPJ', re: /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/ },
  { nome: 'documento ou telefone sem máscara (11 ou 14 dígitos)', re: /(?<![\d.,])(?:\d{14}|\d{11})(?![\d]|[.,]\d)/ },
  { nome: 'caminho absoluto da máquina', re: /\/home\/[a-zA-Z0-9_-]+\/|\/Users\/[a-zA-Z0-9_-]+\/|C:\\Users\\[a-zA-Z0-9_-]+/ },
  { nome: 'chave de nuvem', re: /AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|"private_key"\s*:/ },
  { nome: 'token', re: /\bxox[abposr]-[A-Za-z0-9-]{10,}|\bgh[pousr]_[A-Za-z0-9]{20,}|\bgithub_pat_[A-Za-z0-9_]{20,}|\beyJ[\w-]{10,}\.[\w-]{10,}\.[\w-]{5,}/ },
  { nome: 'credencial', re: /\bBearer\s+[A-Za-z0-9._~+/-]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|(?:api[_-]?key|secret|password|senha|pwd)\s*[:=]\s*["']?[^\s"']{8,}/i },
  { nome: 'string de conexão com senha', re: /\b[a-z][a-z0-9+]*:\/\/[^\s:/@]+:[^\s@]+@|;\s*Password\s*=/i },
];

function dadosProibidos(texto) {
  const achados = [];
  for (const { nome, re } of DADO_PROIBIDO) {
    const m = String(texto).match(re);
    if (m) achados.push({ nome, trecho: m[0] });
  }
  return achados;
}

// Junta todo texto de um tool_input (o campo da mensagem muda de ferramenta para ferramenta).
function textos(valor) {
  if (typeof valor === 'string') return [valor];
  if (Array.isArray(valor)) return valor.flatMap(textos);
  if (valor && typeof valor === 'object') return Object.values(valor).flatMap(textos);
  return [];
}

// Os públicos e os tipos saem do próprio catálogo, para catálogo e validador nunca divergirem.
function publicos(projectDir) {
  const md = fs.readFileSync(path.join(projectDir, '.kanon', 'reference', 'comunicacao', '02-publicos.md'), 'utf8');
  return md
    .split('\n')
    .map((l) => l.match(/^\|\s*\d+\s*\|\s*([^|]+?)\s*\|/))
    .filter(Boolean)
    .map((m) => m[1]);
}

function tiposDeMensagem(projectDir) {
  const md = fs.readFileSync(path.join(projectDir, '.kanon', 'reference', 'comunicacao', '03-tipos-de-mensagem.md'), 'utf8');
  return md
    .split('\n')
    .map((l) => l.match(/^\|\s*([^|]+?)\s*\|/))
    .filter(Boolean)
    .map((m) => m[1])
    .filter((c) => c !== 'Tipo' && !/^-+$/.test(c));
}

module.exports = { DADO_PROIBIDO, dadosProibidos, textos, publicos, tiposDeMensagem };
