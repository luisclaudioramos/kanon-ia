#!/usr/bin/env node
// Monta o perfil efetivo da empresa para o runtime (skills/00-harness-runtime) e grava o
// contexto ativo (skills/51-company-profile contexto). Ver .kanon/process/17-company-profile.md.
//   node .claude/scripts/kanon-perfil.js                 linha "Atuando para"
//   node .claude/scripts/kanon-perfil.js --json          perfil efetivo + vencidos
//   node .claude/scripts/kanon-perfil.js --contexto <empresa>/<area>/<equipe> --empresas <raiz>
'use strict';
const fs = require('fs');
const path = require('path');
const { carregarPerfilEfetivo, vencidos } = require('../hooks/lib/perfil');

const NEUTRO = 'Nenhum perfil de empresa encontrado — modo neutro (defina com /kanon contexto <empresa>/<area>/<equipe>)';

function descrever(v) {
  if (v.tipo === 'papel') {
    return v.dias === Infinity ? `${v.chave} (sem data de confirmação)` : `${v.chave} (confirmado há ${v.dias} dias)`;
  }
  return v.dias === Infinity ? 'ferramentas (sem data de confirmação)' : `ferramentas (confirmadas há ${v.dias} dias)`;
}

function gravarContexto(argv, projectDir) {
  const contexto = argv[argv.indexOf('--contexto') + 1];
  const iEmp = argv.indexOf('--empresas');
  const empresas = iEmp >= 0 ? argv[iEmp + 1] : null;
  if (!contexto || !empresas) {
    return { code: 1, stdout: 'Uso: --contexto <empresa>/<area>/<equipe> --empresas <raiz do repositório de empresas>\n' };
  }
  const alvo = path.join(path.resolve(empresas), ...contexto.split('/').filter(Boolean));
  if (!fs.existsSync(alvo) || !fs.statSync(alvo).isDirectory()) {
    return { code: 1, stdout: `A pasta ${alvo} não existe — contexto não gravado.\n` };
  }
  const arquivo = path.join(projectDir, '.claude', 'kanon.local.json');
  fs.mkdirSync(path.dirname(arquivo), { recursive: true });
  fs.writeFileSync(arquivo, `${JSON.stringify({ empresas: path.resolve(empresas), contexto }, null, 2)}\n`);
  return { code: 0, stdout: `Contexto ativo gravado: ${contexto}\n` };
}

function main(argv, { projectDir, cwd, hoje = new Date() }) {
  if (argv.includes('--contexto')) return gravarContexto(argv, projectDir);
  let ef;
  try {
    ef = carregarPerfilEfetivo({ projectDir, cwd });
  } catch (err) {
    return { code: 1, stdout: `Perfil ilegível: ${err.message}\n` };
  }
  if (!ef) return { code: 0, stdout: argv.includes('--json') ? 'null\n' : `${NEUTRO}\n` };
  const v = vencidos(ef, hoje);
  if (argv.includes('--json')) {
    return { code: 0, stdout: `${JSON.stringify({ ...ef, vencidos: v }, null, 2)}\n` };
  }
  const resumo = v.length
    ? `${v.length} dado${v.length > 1 ? 's' : ''} vencido${v.length > 1 ? 's' : ''}: ${v.map(descrever).join(', ')}`
    : 'nenhum dado vencido';
  return { code: 0, stdout: `Atuando para: ${ef.niveis.join(' › ')} — ${resumo}\n` };
}

if (require.main === module) {
  const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const r = main(process.argv.slice(2), { projectDir, cwd: process.cwd() });
  process.stdout.write(r.stdout);
  process.exit(r.code);
}

module.exports = { main };
