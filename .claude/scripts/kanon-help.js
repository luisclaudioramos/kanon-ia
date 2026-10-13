#!/usr/bin/env node
// Ajuda do /kanon (.kanon/commands/kanon.md). Deriva do menu, nunca o contrário (process/01-menu-map):
// os agentes vêm da tabela de .kanon/agents/README.md e as skills das tabelas de .kanon/skills/README.md.
//   node .claude/scripts/kanon-help.js            comandos + agentes (também --help, help, -h)
//   node .claude/scripts/kanon-help.js skills     skills por fase
'use strict';
const fs = require('fs');
const path = require('path');
const perfil = require('./kanon-perfil');

const AJUDA = ['', '--help', 'help', '-h'];

const COMANDOS = [
  ['/kanon', 'mostra esta ajuda'],
  ['/kanon --help | help | -h', 'mostra esta ajuda'],
  ['/kanon skills', 'lista as skills por fase'],
  ['/kanon status <projeto|feature>', 'em que etapa está e qual é o próximo passo'],
  ['/kanon <skill> [contexto]', 'executa uma skill (nomes em /kanon skills)'],
  ['/kanon contexto <empresa>/<area>/<equipe>', 'troca para quem o kanon trabalha nesta máquina'],
];

function limpar(texto) {
  return texto.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\*/g, '').trim();
}

function linhasDeTabela(md) {
  return md
    .split('\n')
    .filter((l) => /^\|\s*\[/.test(l))
    .map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
}

function agentes(projectDir) {
  const md = fs.readFileSync(path.join(projectDir, '.kanon', 'agents', 'README.md'), 'utf8');
  return linhasDeTabela(md).map(([papel, missao]) => ({ nome: limpar(papel), missao: limpar(missao) }));
}

function skills(projectDir) {
  const md = fs.readFileSync(path.join(projectDir, '.kanon', 'skills', 'README.md'), 'utf8');
  const fases = [];
  for (const linha of md.split('\n')) {
    const fase = linha.match(/^###\s+(.*)$/);
    if (fase) {
      fases.push({ fase: fase[1].trim(), itens: [] });
      continue;
    }
    const m = linha.match(/^\|\s*\[([^\]]+)\]\([^)]*\)([^|]*)\|([^|]*)\|/);
    if (!m || !fases.length) continue;
    const nome = m[1].replace(/\/$/, '').replace(/^\d+-/, '');
    const nota = limpar(m[2]);
    fases[fases.length - 1].itens.push({ nome, proposito: limpar(m[3]) + (nota ? ` ${nota}` : '') });
  }
  return fases.filter((f) => f.itens.length);
}

function colunas(pares, recuo = '  ') {
  const largura = Math.max(...pares.map(([a]) => a.length));
  return pares.map(([a, b]) => `${recuo}${a.padEnd(largura)}  ${b}`).join('\n');
}

function statusDoPerfil(projectDir, cwd) {
  return perfil.main([], { projectDir, cwd }).stdout.trimEnd();
}

function main(argv, { projectDir, cwd }) {
  const arg = argv[0] || '';
  if (AJUDA.includes(arg)) {
    const ag = agentes(projectDir).map((a) => [a.nome, a.missao]);
    const texto = [
      'Kanon — harness de spec-driven development',
      statusDoPerfil(projectDir, cwd),
      '',
      'Comandos',
      colunas(COMANDOS),
      '',
      'Agentes (acionados pelas skills)',
      colunas(ag),
    ].join('\n');
    return { code: 0, stdout: `${texto}\n` };
  }
  if (arg === 'skills') {
    const blocos = skills(projectDir).map((f) => `${f.fase}\n${colunas(f.itens.map((s) => [s.nome, s.proposito]))}`);
    return { code: 0, stdout: `Skills do kanon — execute com /kanon <skill> [contexto]\n\n${blocos.join('\n\n')}\n` };
  }
  return { code: 1, stdout: `Argumento "${arg}" não reconhecido — veja /kanon --help.\n` };
}

if (require.main === module) {
  const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const r = main(process.argv.slice(2), { projectDir, cwd: process.cwd() });
  process.stdout.write(r.stdout);
  process.exit(r.code);
}

module.exports = { main, agentes, skills };
