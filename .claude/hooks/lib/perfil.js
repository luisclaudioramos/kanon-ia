// Lê o perfil da empresa (process/17-company-profile.md): frontmatter numa gramática
// restrita, herança empresa → área → equipe, dados vencidos, contexto ativo e as listas
// de nomes que o Selo I ampliado barra em .kanon/. Sem dependências.
'use strict';
const fs = require('fs');
const path = require('path');

const VALIDADE_PADRAO = { papeis: 30, ferramentas: 180 };
const BRANCHES_PADRAO = {
  protegidas: ['main', 'master', 'develop', 'release/*', 'hotfix/*'],
  integracao: 'develop',
};
const CHAVE = '([A-Za-z_][\\w-]*)';

function parseScalar(raw) {
  const v = raw.trim();
  if (/^".*"$/.test(v) || /^'.*'$/.test(v)) return v.slice(1, -1);
  if (/^-?\d+$/.test(v)) return Number(v);
  return v;
}

function parseValue(raw) {
  const v = raw.trim();
  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim();
    return inner ? inner.split(',').map(parseScalar) : [];
  }
  return parseScalar(v);
}

function parseFrontmatter(text) {
  const m = String(text).match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!m) return {};
  const out = {};
  let key = null;
  let item = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const top = line.match(new RegExp(`^${CHAVE}:\\s*(.*)$`));
    if (top) {
      key = top[1];
      item = null;
      out[key] = top[2].trim() === '' ? null : parseValue(top[2]);
      continue;
    }
    if (key === null) throw new Error(`perfil: linha fora de chave: "${line}"`);
    const itemDeMapa = line.match(new RegExp(`^ +- +${CHAVE}:\\s*(.*)$`));
    if (itemDeMapa) {
      if (out[key] === null) out[key] = [];
      if (!Array.isArray(out[key])) throw new Error(`perfil: "${key}" mistura mapa e lista`);
      item = { [itemDeMapa[1]]: parseValue(itemDeMapa[2]) };
      out[key].push(item);
      continue;
    }
    const itemSimples = line.match(/^ +- +(.*)$/);
    if (itemSimples) {
      if (out[key] === null) out[key] = [];
      if (!Array.isArray(out[key])) throw new Error(`perfil: "${key}" mistura mapa e lista`);
      out[key].push(parseScalar(itemSimples[1]));
      item = null;
      continue;
    }
    const sub = line.match(new RegExp(`^ +${CHAVE}:\\s*(.*)$`));
    if (sub) {
      if (Array.isArray(out[key]) && item) {
        item[sub[1]] = parseValue(sub[2]);
        continue;
      }
      if (out[key] === null) out[key] = {};
      if (typeof out[key] !== 'object' || Array.isArray(out[key])) {
        throw new Error(`perfil: "${key}" mistura valor e mapa`);
      }
      out[key][sub[1]] = parseValue(sub[2]);
      continue;
    }
    throw new Error(`perfil: linha não reconhecida: "${line}"`);
  }
  return out;
}

function ehMapa(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function mergeProfiles(perfis) {
  const ef = {
    niveis: [],
    papeis: [],
    ferramentas: {},
    ferramentas_confirmadas_em: null,
    branches: {},
    validade: {},
    nomes_reservados: [],
  };
  for (const p of perfis) {
    if (p.nome) ef.niveis.push(String(p.nome));
    for (const k of ['ferramentas', 'branches', 'validade']) {
      if (ehMapa(p[k])) Object.assign(ef[k], p[k]);
    }
    if (Array.isArray(p.papeis)) {
      for (const r of p.papeis) {
        const i = ef.papeis.findIndex((x) => x.papel === r.papel);
        if (i >= 0) ef.papeis[i] = r;
        else ef.papeis.push(r);
      }
    }
    if (p.ferramentas_confirmadas_em) ef.ferramentas_confirmadas_em = String(p.ferramentas_confirmadas_em);
    const nomes = [p.nome, ...(Array.isArray(p.nomes_reservados) ? p.nomes_reservados : [])];
    for (const n of nomes) {
      if (n && !ef.nomes_reservados.includes(String(n))) ef.nomes_reservados.push(String(n));
    }
  }
  ef.validade = { ...VALIDADE_PADRAO, ...ef.validade };
  ef.branches = { ...BRANCHES_PADRAO, ...ef.branches };
  return ef;
}

function diasDesde(data, hoje) {
  if (!data || !/^\d{4}-\d{2}-\d{2}$/.test(String(data))) return Infinity;
  const d = Date.parse(`${data}T00:00:00Z`);
  if (Number.isNaN(d)) return Infinity;
  const h = Date.UTC(hoje.getUTCFullYear(), hoje.getUTCMonth(), hoje.getUTCDate());
  return Math.floor((h - d) / 86400000);
}

function vencidos(ef, hoje = new Date()) {
  const out = [];
  for (const r of ef.papeis) {
    const dias = diasDesde(r.confirmado_em, hoje);
    if (dias > ef.validade.papeis) out.push({ tipo: 'papel', chave: String(r.papel), dias });
  }
  if (Object.keys(ef.ferramentas).length) {
    const dias = diasDesde(ef.ferramentas_confirmadas_em, hoje);
    if (dias > ef.validade.ferramentas) out.push({ tipo: 'ferramentas', chave: 'ferramentas', dias });
  }
  return out;
}

function lerContextoLocal(projectDir) {
  const f = path.join(projectDir, '.claude', 'kanon.local.json');
  if (!fs.existsSync(f)) return null;
  const c = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (!c || !c.empresas || !c.contexto) return null;
  return { empresas: String(c.empresas), contexto: String(c.contexto) };
}

function cadeiaDoContexto(empresas, contexto) {
  const partes = contexto.split('/').filter(Boolean);
  const arquivos = [];
  for (let i = 1; i <= partes.length; i++) {
    const f = path.join(empresas, ...partes.slice(0, i), 'kanon', 'perfil.md');
    if (fs.existsSync(f)) arquivos.push(f);
  }
  return arquivos;
}

function cadeiaSubindo(cwd) {
  const arquivos = [];
  let dir = path.resolve(cwd);
  for (;;) {
    const f = path.join(dir, 'kanon', 'perfil.md');
    if (fs.existsSync(f)) arquivos.unshift(f);
    const pai = path.dirname(dir);
    if (pai === dir) break;
    dir = pai;
  }
  return arquivos;
}

function carregarPerfilEfetivo({ projectDir, cwd }) {
  const ctx = lerContextoLocal(projectDir);
  const arquivos = ctx ? cadeiaDoContexto(ctx.empresas, ctx.contexto) : cadeiaSubindo(cwd);
  if (!arquivos.length) return null;
  const ef = mergeProfiles(arquivos.map((f) => parseFrontmatter(fs.readFileSync(f, 'utf8'))));
  ef.arquivos = arquivos;
  ef.origem = ctx ? 'contexto' : 'pasta';
  return ef;
}

function globParaRegex(g) {
  const partes = String(g).split('*').map((s) => s.replace(/[.+?^${}()|[\]\\/]/g, '\\$&'));
  return new RegExp(`^${partes.join('.*')}$`);
}

function politicaDeBranches({ projectDir, cwd }) {
  let b = BRANCHES_PADRAO;
  try {
    const ef = carregarPerfilEfetivo({ projectDir, cwd });
    if (ef) b = ef.branches;
  } catch {
    b = BRANCHES_PADRAO;
  }
  const protegidas = Array.isArray(b.protegidas) && b.protegidas.length ? b.protegidas : BRANCHES_PADRAO.protegidas;
  return {
    protegidas: protegidas.map(globParaRegex),
    integracao: b.integracao ? String(b.integracao) : BRANCHES_PADRAO.integracao,
  };
}

function perfisConhecidos(empresas) {
  const out = [];
  (function andar(dir, profundidade) {
    if (profundidade > 3) return;
    let entradas;
    try {
      entradas = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entradas) {
      if (!e.isDirectory() || e.name.startsWith('.') || e.name === 'node_modules') continue;
      const sub = path.join(dir, e.name);
      const f = path.join(sub, 'kanon', 'perfil.md');
      if (fs.existsSync(f)) out.push(f);
      andar(sub, profundidade + 1);
    }
  })(empresas, 1);
  return out;
}

function nomesReservados(projectDir) {
  const ctx = lerContextoLocal(projectDir);
  if (!ctx) return [];
  const nomes = new Set();
  for (const f of perfisConhecidos(ctx.empresas)) {
    const p = parseFrontmatter(fs.readFileSync(f, 'utf8'));
    for (const n of [p.nome, ...(Array.isArray(p.nomes_reservados) ? p.nomes_reservados : [])]) {
      if (n) nomes.add(String(n));
    }
  }
  return [...nomes];
}

function nomesDeFerramentas(projectDir) {
  const dir = path.join(projectDir, '.claude', 'integrations');
  let arquivos;
  try {
    arquivos = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
  } catch {
    return [];
  }
  const nomes = new Set();
  for (const a of arquivos) {
    const p = parseFrontmatter(fs.readFileSync(path.join(dir, a), 'utf8'));
    if (Array.isArray(p.nomes)) p.nomes.forEach((n) => nomes.add(String(n)));
  }
  return [...nomes];
}

function regexDeNome(nome) {
  const esc = String(nome).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|[^\\p{L}\\p{N}_])${esc}(?=$|[^\\p{L}\\p{N}_])`, 'iu');
}

module.exports = {
  VALIDADE_PADRAO,
  BRANCHES_PADRAO,
  parseFrontmatter,
  mergeProfiles,
  vencidos,
  lerContextoLocal,
  carregarPerfilEfetivo,
  politicaDeBranches,
  nomesReservados,
  nomesDeFerramentas,
  regexDeNome,
};
