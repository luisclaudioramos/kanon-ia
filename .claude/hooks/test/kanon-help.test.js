'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { main, agentes, skills } = require('../../scripts/kanon-help');

const RAIZ = path.join(__dirname, '..', '..', '..');

function vazio() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-help-'));
}

test('ajuda lista os comandos e os 13 agentes, sem nenhuma skill', () => {
  const r = main([], { projectDir: RAIZ, cwd: RAIZ });
  assert.strictEqual(r.code, 0);
  for (const c of ['/kanon --help', '/kanon contexto', '/kanon skills', '/kanon status', '/kanon <skill>']) {
    assert.ok(r.stdout.includes(c), c);
  }
  const ag = agentes(RAIZ);
  assert.strictEqual(ag.length, 13);
  for (const a of ag) assert.ok(r.stdout.includes(a.nome), a.nome);
  for (const s of skills(RAIZ).flatMap((f) => f.itens)) {
    assert.ok(!new RegExp(`\\b${s.nome}\\b`).test(r.stdout), `skill ${s.nome} não deveria aparecer na ajuda`);
  }
});

test('--help, help e -h dão a mesma saída que sem argumento', () => {
  const base = main([], { projectDir: RAIZ, cwd: RAIZ }).stdout;
  for (const a of ['--help', 'help', '-h']) {
    assert.strictEqual(main([a], { projectDir: RAIZ, cwd: RAIZ }).stdout, base, a);
  }
});

test('skills lista por fase, sem o número, e todo comando tem pasta em .kanon/skills/', () => {
  const r = main(['skills'], { projectDir: RAIZ, cwd: RAIZ });
  assert.strictEqual(r.code, 0);
  const fases = skills(RAIZ);
  assert.ok(fases.length >= 8);
  const pastas = fs.readdirSync(path.join(RAIZ, '.kanon', 'skills'));
  for (const s of fases.flatMap((f) => f.itens)) {
    assert.ok(!/^\d/.test(s.nome), s.nome);
    assert.ok(pastas.some((p) => p.replace(/^\d+-/, '') === s.nome), `sem pasta para ${s.nome}`);
    assert.ok(r.stdout.includes(s.nome), s.nome);
  }
  assert.ok(r.stdout.includes('refine-feature'));
  assert.ok(r.stdout.includes('setup'));
});

test('sem perfil de empresa a ajuda mostra o modo neutro', () => {
  const dir = vazio();
  fs.cpSync(path.join(RAIZ, '.kanon', 'agents', 'README.md'), path.join(dir, '.kanon', 'agents', 'README.md'), { recursive: true });
  const r = main([], { projectDir: dir, cwd: dir });
  assert.match(r.stdout, /modo neutro/);
});

test('argumento desconhecido falha e aponta para a ajuda', () => {
  const r = main(['xpto'], { projectDir: RAIZ, cwd: RAIZ });
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /\/kanon --help/);
});
