#!/usr/bin/env node
// Modo consulta da skills/09-feature-state-management (/kanon status <projeto|feature>): diz em que
// etapa a Feature está e qual é o próximo passo, só pelos artefatos da pasta (process/03-state-management,
// marcos na ordem de process/02-sdd-flow). Procura o nome dentro da pasta do contexto ativo.
//   node .claude/scripts/kanon-status.js <nome>
'use strict';
const fs = require('fs');
const path = require('path');
const { lerContextoLocal } = require('../hooks/lib/perfil');
const { isApproved } = require('../hooks/lib/design');

const algum = (re) => (nomes) => nomes.some((n) => re.test(n));

// Ordem de process/03-state-management.md, seção "Marcos da consulta de estado". `comandos` são as skills
// que geram o marco, na ordem em que rodam; a primeira é o próximo passo quando o marco falta.
const MARCOS = [
  { nome: 'Requisito', comandos: ['generate-requirement-summary'], prova: 'REQUIREMENT-SUMMARY.md', ok: algum(/^REQUIREMENT-SUMMARY\.md$/i) },
  { nome: 'Design Gate', comandos: ['design-gate'], prova: 'DESIGN.md aprovado', ok: (_, dir) => designAprovado(dir) },
  {
    nome: 'Especificação',
    comandos: ['create-feature-artifacts'],
    prova: 'FEATURE.md, PLAN-v*.md e INSTRUCTIONS.md',
    ok: (n) => algum(/^FEATURE\.md$/i)(n) && algum(/^PLAN-v.*\.md$/i)(n) && algum(/^INSTRUCTIONS\.md$/i)(n),
  },
  {
    nome: 'Arquitetura',
    comandos: ['architecture-assessment'],
    prova: 'ARCHITECTURE.md ou reports/architecture-assessment.md',
    ok: (n, dir) => algum(/^ARCHITECTURE\.md$/i)(n) || fs.existsSync(path.join(dir, 'reports', 'architecture-assessment.md')),
  },
  { nome: 'TCO preliminar', comandos: ['cost-of-ownership-tco'], prova: 'TCO.md', ok: algum(/^(TCO|COST-OF-OWNERSHIP).*\.md$/i) },
  { nome: 'User Stories', comandos: ['refine-user-stories', 'create-user-story-artifacts'], prova: 'USER-STORY-*.md ou user-stories/', ok: algum(/^(USER-STORY-.*\.md|US-\d+.*\.md|user-stories)$/i) },
  {
    nome: 'Validação de telas',
    comandos: ['screen-validation'],
    prova: 'telas/SCREEN-VALIDATION.md com as telas aprovadas',
    ok: (_, dir) => telas(dir).ok,
    naoSeAplica: (dir) => telas(dir).naoSeAplica,
    detalhe: (dir) => telas(dir).detalhe,
  },
  { nome: 'Tasks', comandos: ['refine-tasks', 'create-task-artifacts'], prova: 'TASK-*.md ou tasks/', ok: (n, dir) => temTasks(n) || tasksAninhadas(dir) },
  { nome: 'Casos de teste', comandos: ['test-case-authoring'], prova: 'TEST-CASE*.md ou test-cases/', ok: algum(/^(TEST-CASE.*\.md|test-cases)$/i) },
  {
    nome: 'Code review / PR',
    comandos: ['code-review', 'pull-request-review'],
    prova: 'REVIEW-PR*, PR-REVIEW* ou CODE-REVIEW*, ou reviews/ na raiz, nas US ou nos bugs',
    ok: (n, dir) => temRevisao(n) || revisoesAninhadas(dir),
  },
  { nome: 'Quality gate', comandos: ['test-report', 'quality-gate'], prova: 'quality-gate-feature.md ou TEST-REPORT*.md', ok: algum(/^(quality-gate-feature|TEST-REPORT).*\.md$/i) },
  { nome: 'Runbook', comandos: ['runbook-authoring'], prova: 'RUNBOOK*.md', ok: algum(/^RUNBOOK.*\.md$/i) },
  { nome: 'Auditoria', comandos: ['audit-evidence'], prova: 'AUDIT-EVIDENCE* ou Evidence-*', ok: algum(/^(AUDIT-EVIDENCE|Evidence-)/i) },
  { nome: 'Memória', comandos: ['memory-update'], prova: 'MEMORY.md', ok: algum(/^MEMORY\.md$/i) },
];

// to-be/feature e to-be/proposals: layout as-is / execution / to-be dos projetos (proposta ainda sem feature no board).
const CONTEINERES = [['feature'], ['features'], ['to-be', 'feature'], ['to-be', 'proposals']];
const IGNORAR = new Set(['.git', 'node_modules', '.obsidian', 'kanon']);
const NAO_VERIFICADO = 'Fora da pasta (não verificado): estado da PR, do work item e do deploy.';
// skills/32-report-bug corre em paralelo e pode ser disparada em qualquer etapa: não é marco, aparece à parte.
const RELATO_BUG = '<relato do problema>';

const temTasks = algum(/^(TASK-.*\.md|tasks)$/i);

// Layout por US e bug: tasks dentro de user-stories/<us>/, bugs/<bug>/ e user-stories/<us>/bugs/<bug>/.
function subpastas(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => path.join(dir, e.name));
  } catch {
    return [];
  }
}

function pastasDeItem(dir) {
  const us = subpastas(path.join(dir, 'user-stories'));
  const bugs = [path.join(dir, 'bugs'), ...us.map((u) => path.join(u, 'bugs'))].flatMap(subpastas);
  return [...us, ...bugs];
}

function tasksAninhadas(dir) {
  return pastasDeItem(dir).some((p) => temTasks(fs.readdirSync(p)));
}

// Revisão de PR no item que a PR entrega: reviews/ na raiz (PR de várias US), na US ou no bug.
const temRevisao = algum(/^(.*REVIEW-PR|PR-REVIEW|CODE-REVIEW).*\.md$/i);

function revisoesAninhadas(dir) {
  return [dir, ...pastasDeItem(dir)].some((p) => {
    const r = path.join(p, 'reviews');
    try {
      return fs.readdirSync(r).some((n) => /\.md$/i.test(n));
    } catch {
      return false;
    }
  });
}

function designAprovado(dir) {
  const f = path.join(dir, 'DESIGN.md');
  return fs.existsSync(f) && isApproved(fs.readFileSync(f, 'utf8'));
}

// skills/48-screen-validation: vale para Feature com interface. A FEATURE.md declara "Não se aplica" na linha
// "Aprovadores de tela" quando não há tela; senão, o marco só fecha com todas as telas do índice em `aprovada`
// ou `aprovada com ressalvas` (process/05-definition-of-done).
function telas(dir) {
  const feature = path.join(dir, 'FEATURE.md');
  const linha = fs.existsSync(feature) ? fs.readFileSync(feature, 'utf8').split('\n').find((l) => /Aprovadores de tela/i.test(l)) : null;
  if (linha && /Não se aplica/i.test(linha)) return { ok: true, naoSeAplica: true, detalhe: 'não se aplica: a Feature não tem interface' };
  const f = path.join(dir, 'telas', 'SCREEN-VALIDATION.md');
  if (!fs.existsSync(f)) return { ok: false, naoSeAplica: false, detalhe: null };
  const indice = (fs.readFileSync(f, 'utf8').split(/^## Índice\s*$/m)[1] || '').split(/^## /m)[0];
  const linhas = indice.split('\n').filter((l) => l.startsWith('|') && !/^\|[\s|:-]+$/.test(l) && !l.includes('[preencher'));
  const estados = linhas.slice(1).map((l) => (l.split('|')[4] || '').replace(/`/g, '').trim());
  const aprovadas = estados.filter((e) => /^aprovada/i.test(e)).length;
  if (!estados.length) return { ok: false, naoSeAplica: false, detalhe: 'índice sem telas' };
  if (aprovadas === estados.length) return { ok: true, naoSeAplica: false, detalhe: null };
  return { ok: false, naoSeAplica: false, detalhe: `${aprovadas} de ${estados.length} telas aprovadas` };
}

function avaliarFeature(dir) {
  const nomes = fs.readdirSync(dir);
  const cumpridos = MARCOS.map((m) => Boolean(m.ok(nomes, dir)));
  let etapa = 0;
  while (etapa < MARCOS.length && cumpridos[etapa]) etapa += 1;
  const ultimo = cumpridos.lastIndexOf(true);
  const lacunas = MARCOS.filter((_, i) => i > etapa && i < ultimo && !cumpridos[i]).map((m) => m.nome);
  const proximo = MARCOS[etapa] || null;
  const designRascunho = proximo && proximo.comandos[0] === 'design-gate' && fs.existsSync(path.join(dir, 'DESIGN.md'));
  return { dir, cumpridos, etapa, lacunas, proximo, designRascunho, foraDoFormato: ultimo < 0 };
}

function featuresDoProjeto(dir) {
  const out = [];
  for (const partes of CONTEINERES) {
    const c = path.join(dir, ...partes);
    if (!fs.existsSync(c) || !fs.statSync(c).isDirectory()) continue;
    for (const e of fs.readdirSync(c, { withFileTypes: true })) {
      if (e.isDirectory()) out.push(path.join(c, e.name));
    }
  }
  return out;
}

function buscar(raiz, nome) {
  const exatas = [];
  const parciais = [];
  const pilha = [raiz];
  while (pilha.length) {
    const atual = pilha.pop();
    let entradas;
    try {
      entradas = fs.readdirSync(atual, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entradas) {
      if (!e.isDirectory() || IGNORAR.has(e.name) || e.name.startsWith('.')) continue;
      const p = path.join(atual, e.name);
      const n = e.name.toLowerCase();
      if (n === nome.toLowerCase()) exatas.push(p);
      else if (n.includes(nome.toLowerCase())) parciais.push(p);
      pilha.push(p);
    }
  }
  return (exatas.length ? exatas : parciais).sort();
}

function etapaCurta(a) {
  if (a.foraDoFormato) return `0/${MARCOS.length} fora do formato`;
  if (a.etapa === 0) return `0/${MARCOS.length} sem requisito`;
  return `${a.etapa}/${MARCOS.length} ${MARCOS[a.etapa - 1].nome}`;
}

function proximoCurto(a) {
  if (!a.proximo) return 'candidata a done';
  return a.designRascunho ? 'design-gate (aguardando aprovação humana)' : a.proximo.comandos[0];
}

function relatorioFeature(a, raiz) {
  const linhas = [`${path.basename(a.dir)} — ${path.relative(raiz, a.dir)}`];
  if (a.foraDoFormato) {
    linhas.push(`Etapa: 0/${MARCOS.length} — pasta fora do formato do kanon (nenhum artefato do pipeline)`);
  } else if (a.etapa === 0) {
    linhas.push(`Etapa: 0/${MARCOS.length} — sem REQUIREMENT-SUMMARY.md`);
  } else {
    linhas.push(`Etapa: ${a.etapa}/${MARCOS.length} — ${MARCOS[a.etapa - 1].nome}`);
  }
  if (!a.proximo) {
    linhas.push('Próximo: todos os marcos cumpridos — candidata a done (/kanon feature-state-management)');
  } else if (a.designRascunho) {
    linhas.push('Próximo: /kanon design-gate — DESIGN.md existe, aguardando aprovação humana (Status APPROVED e "Aprovado por")');
  } else {
    const det = a.proximo.detalhe && a.proximo.detalhe(a.dir);
    linhas.push(`Próximo: /kanon ${a.proximo.comandos[0]} — falta ${a.proximo.prova}${det ? ` (${det})` : ''}`);
  }
  if (a.lacunas.length) linhas.push(`Lacunas: ${a.lacunas.join(', ')} (há marco posterior sem estes)`);
  linhas.push('', 'Marcos');
  const feature = path.basename(a.dir);
  MARCOS.forEach((m, i) => {
    const na = m.naoSeAplica && m.naoSeAplica(a.dir);
    const det = m.detalhe && m.detalhe(a.dir);
    const marca = na ? '-' : a.cumpridos[i] ? 'x' : ' ';
    linhas.push(`  [${marca}] ${String(i + 1).padStart(2)} ${m.nome.padEnd(18)} ${m.prova}${det ? ` — ${det}` : ''}`);
    for (const c of m.comandos) linhas.push(`         /kanon ${c} ${feature}`);
  });
  linhas.push('', 'Fluxo paralelo (a qualquer momento)', `  Bug: /kanon report-bug ${feature} ${RELATO_BUG}`);
  linhas.push('', NAO_VERIFICADO);
  return linhas.join('\n');
}

function relatorioProjeto(dir, features, raiz) {
  const avs = features.map(avaliarFeature);
  const largura = Math.max(...avs.map((a) => path.basename(a.dir).length));
  const linhas = [`${path.basename(dir)} — projeto com ${avs.length} feature${avs.length > 1 ? 's' : ''} (${path.relative(raiz, dir)})`];
  for (const a of avs) {
    const lac = a.lacunas.length ? ` · ${a.lacunas.length} lacuna${a.lacunas.length > 1 ? 's' : ''}` : '';
    linhas.push(`  ${path.basename(a.dir).padEnd(largura)}  ${etapaCurta(a)} · próximo: ${proximoCurto(a)}${lac}`);
  }
  linhas.push('', 'Detalhe de uma feature: /kanon status <feature>', `Bug em qualquer etapa: /kanon report-bug <feature> ${RELATO_BUG}`, NAO_VERIFICADO);
  return linhas.join('\n');
}

function main(argv, { projectDir }) {
  const nome = (argv[0] || '').trim();
  if (!nome) return { code: 1, stdout: 'Uso: /kanon status <projeto|feature>\n' };
  let ctx = null;
  try {
    ctx = lerContextoLocal(projectDir);
  } catch {
    ctx = null;
  }
  if (!ctx) return { code: 1, stdout: 'Sem contexto ativo — defina com /kanon contexto <empresa>/<area>/<equipe>.\n' };
  const raiz = path.join(ctx.empresas, ...ctx.contexto.split('/'));
  const achados = buscar(raiz, nome);
  if (!achados.length) return { code: 1, stdout: `Nenhuma pasta "${nome}" em ${raiz}.\n` };
  if (achados.length > 1) {
    const lista = achados.map((p) => `  ${path.relative(raiz, p)}`).join('\n');
    return { code: 1, stdout: `"${nome}" corresponde a mais de uma pasta — use o nome completo:\n${lista}\n` };
  }
  const dir = achados[0];
  const features = featuresDoProjeto(dir);
  const texto = features.length ? relatorioProjeto(dir, features, raiz) : relatorioFeature(avaliarFeature(dir), raiz);
  return { code: 0, stdout: `${texto}\n` };
}

if (require.main === module) {
  const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const r = main(process.argv.slice(2), { projectDir });
  process.stdout.write(r.stdout);
  process.exit(r.code);
}

module.exports = { main, avaliarFeature, MARCOS };
