'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { main } = require('../../scripts/kanon-perfil');

const HOJE = new Date('2026-10-11T12:00:00Z');

function montar() {
  const raiz = fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-cli-'));
  const empresas = path.join(raiz, 'empresas');
  const equipe = path.join(empresas, 'acme', 'vendas', 'azul');
  fs.mkdirSync(path.join(empresas, 'acme', 'kanon'), { recursive: true });
  fs.writeFileSync(path.join(empresas, 'acme', 'kanon', 'perfil.md'), '---\nnome: Acme\n---\n');
  fs.mkdirSync(path.join(equipe, 'kanon'), { recursive: true });
  fs.writeFileSync(
    path.join(equipe, 'kanon', 'perfil.md'),
    '---\nnome: Time Azul\npapeis:\n  - papel: PO\n    pessoa: Fulana\n    confirmado_em: 2026-08-27\n---\n'
  );
  const projectDir = path.join(raiz, 'kanon');
  fs.mkdirSync(path.join(projectDir, '.claude'), { recursive: true });
  return { raiz, empresas, projectDir };
}

test('sem perfil: linha de modo neutro', () => {
  const { projectDir } = montar();
  const r = main([], { projectDir, cwd: projectDir, hoje: HOJE });
  assert.strictEqual(r.code, 0);
  assert.match(r.stdout, /^Nenhum perfil de empresa encontrado — modo neutro/);
});

test('--contexto grava kanon.local.json e a linha mostra o vencido', () => {
  const { empresas, projectDir } = montar();
  const g = main(['--contexto', 'acme/vendas/azul', '--empresas', empresas], { projectDir, cwd: projectDir, hoje: HOJE });
  assert.strictEqual(g.code, 0);
  const salvo = JSON.parse(fs.readFileSync(path.join(projectDir, '.claude', 'kanon.local.json'), 'utf8'));
  assert.deepStrictEqual(salvo, { empresas, contexto: 'acme/vendas/azul' });
  const r = main([], { projectDir, cwd: projectDir, hoje: HOJE });
  assert.strictEqual(r.stdout.trim(), 'Atuando para: Acme › Time Azul — 1 dado vencido: PO (confirmado há 45 dias)');
});

test('--contexto recusa pasta inexistente e não grava nada', () => {
  const { empresas, projectDir } = montar();
  const g = main(['--contexto', 'acme/nao-existe', '--empresas', empresas], { projectDir, cwd: projectDir, hoje: HOJE });
  assert.strictEqual(g.code, 1);
  assert.match(g.stdout, /não existe/);
  assert.ok(!fs.existsSync(path.join(projectDir, '.claude', 'kanon.local.json')));
});

test('--json devolve o perfil efetivo com vencidos', () => {
  const { empresas, projectDir } = montar();
  main(['--contexto', 'acme/vendas/azul', '--empresas', empresas], { projectDir, cwd: projectDir, hoje: HOJE });
  const r = main(['--json'], { projectDir, cwd: projectDir, hoje: HOJE });
  const j = JSON.parse(r.stdout);
  assert.deepStrictEqual(j.niveis, ['Acme', 'Time Azul']);
  assert.strictEqual(j.vencidos[0].chave, 'PO');
});

test('papel sem data aparece como sem data de confirmação', () => {
  const { empresas, projectDir } = montar();
  fs.writeFileSync(
    path.join(empresas, 'acme', 'vendas', 'azul', 'kanon', 'perfil.md'),
    '---\nnome: Time Azul\npapeis:\n  - papel: PO\n    pessoa: Fulana\n---\n'
  );
  main(['--contexto', 'acme/vendas/azul', '--empresas', empresas], { projectDir, cwd: projectDir, hoje: HOJE });
  const r = main([], { projectDir, cwd: projectDir, hoje: HOJE });
  assert.match(r.stdout, /PO \(sem data de confirmação\)/);
});

// --- Revisão final ---

test('revisão: --contexto recusa ../ e reaproveita a raiz já gravada', () => {
  const { empresas, projectDir } = montar();
  assert.strictEqual(main(['--contexto', '../fora', '--empresas', empresas], { projectDir, cwd: projectDir, hoje: HOJE }).code, 1);
  main(['--contexto', 'acme', '--empresas', empresas], { projectDir, cwd: projectDir, hoje: HOJE });
  const r = main(['--contexto', 'acme/vendas/azul'], { projectDir, cwd: projectDir, hoje: HOJE });
  assert.strictEqual(r.code, 0, r.stdout);
});

test('revisão: --contexto sem perfil na cadeia grava e avisa', () => {
  const { empresas, projectDir } = montar();
  fs.mkdirSync(path.join(empresas, 'nova'), { recursive: true });
  const r = main(['--contexto', 'nova', '--empresas', empresas], { projectDir, cwd: projectDir, hoje: HOJE });
  assert.strictEqual(r.code, 0);
  assert.match(r.stdout, /nenhum perfil/i);
});

test('revisão: boot avisa proposta pendente e perfil ilegível de outra empresa', () => {
  const { empresas, projectDir } = montar();
  main(['--contexto', 'acme/vendas/azul', '--empresas', empresas], { projectDir, cwd: projectDir, hoje: HOJE });
  fs.writeFileSync(
    path.join(empresas, 'acme', 'vendas', 'azul', 'kanon', 'historico.md'),
    '## 2026-10-10 — Troca de PO: Fulana → Beltrana\n- **Decisão:** pendente\n'
  );
  fs.mkdirSync(path.join(empresas, 'outra', 'kanon'), { recursive: true });
  fs.writeFileSync(path.join(empresas, 'outra', 'kanon', 'perfil.md'), '---\nnome: Outra\n\tquebrado\n---\n');
  const r = main([], { projectDir, cwd: projectDir, hoje: HOJE });
  assert.match(r.stdout, /1 proposta pendente: Troca de PO: Fulana → Beltrana/);
  assert.match(r.stdout, /perfil ilegível: .*outra/);
});
