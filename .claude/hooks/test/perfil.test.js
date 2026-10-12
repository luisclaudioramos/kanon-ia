'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const P = require('../lib/perfil');

function tmp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-perfil-'));
}
function escrever(arquivo, texto) {
  fs.mkdirSync(path.dirname(arquivo), { recursive: true });
  fs.writeFileSync(arquivo, texto);
}

const EMPRESA = `---
nivel: empresa
nome: Acme
nomes_reservados: [Acme]
ferramentas:
  trabalho: jira
  comunicacao: chat
ferramentas_confirmadas_em: 2026-10-01
branches:
  protegidas: [main, release/*]
  integracao: main
---
# Perfil
`;

const EQUIPE = `---
nivel: equipe
nome: Time Azul
nomes_reservados:
  - Fulana Souza
  - "#aprovacoes-azul"
papeis:
  - papel: PO
    pessoa: Fulana Souza
    contato: "@fulana"
    desde: 2026-09-15
    confirmado_em: 2026-09-01
    fonte: "daily: 2026-09-01"
  - papel: Tech Lead
    pessoa: Beltrano
ferramentas:
  comunicacao: chat-azul
validade:
  papeis: 30
---
`;

test('parseFrontmatter lê escalar, lista inline, lista em bloco, mapa e lista de mapas', () => {
  const p = P.parseFrontmatter(EQUIPE);
  assert.strictEqual(p.nome, 'Time Azul');
  assert.deepStrictEqual(p.nomes_reservados, ['Fulana Souza', '#aprovacoes-azul']);
  assert.strictEqual(p.papeis.length, 2);
  assert.strictEqual(p.papeis[0].fonte, 'daily: 2026-09-01');
  assert.strictEqual(p.papeis[1].pessoa, 'Beltrano');
  assert.deepStrictEqual(p.ferramentas, { comunicacao: 'chat-azul' });
  assert.strictEqual(p.validade.papeis, 30);
  const e = P.parseFrontmatter(EMPRESA);
  assert.deepStrictEqual(e.branches.protegidas, ['main', 'release/*']);
});

test('parseFrontmatter sem frontmatter devolve objeto vazio', () => {
  assert.deepStrictEqual(P.parseFrontmatter('# só texto\n'), {});
});

test('parseFrontmatter lança em linha fora da gramática', () => {
  assert.throws(() => P.parseFrontmatter('---\nnome: X\n\tlixo sem dois pontos\n---\n'));
});

test('mergeProfiles: mais específico prevalece, papeis por nome, nomes somam, padrões aplicados', () => {
  const ef = P.mergeProfiles([P.parseFrontmatter(EMPRESA), P.parseFrontmatter(EQUIPE)]);
  assert.deepStrictEqual(ef.niveis, ['Acme', 'Time Azul']);
  assert.deepStrictEqual(ef.ferramentas, { trabalho: 'jira', comunicacao: 'chat-azul' });
  assert.deepStrictEqual(ef.branches, { protegidas: ['main', 'release/*'], integracao: 'main' });
  assert.deepStrictEqual(ef.validade, { papeis: 30, ferramentas: 180 });
  assert.deepStrictEqual(ef.nomes_reservados, ['Acme', 'Time Azul', 'Fulana Souza', '#aprovacoes-azul']);
  const sobrescrito = P.mergeProfiles([
    { papeis: [{ papel: 'PO', pessoa: 'Antiga' }] },
    { papeis: [{ papel: 'PO', pessoa: 'Nova' }] },
  ]);
  assert.deepStrictEqual(sobrescrito.papeis, [{ papel: 'PO', pessoa: 'Nova' }]);
});

test('mergeProfiles sem branches usa o padrão', () => {
  const ef = P.mergeProfiles([{ nome: 'X' }]);
  assert.deepStrictEqual(ef.branches, P.BRANCHES_PADRAO);
});

test('vencidos: papel velho e papel sem data vencem; ferramentas dentro do prazo não', () => {
  const ef = P.mergeProfiles([P.parseFrontmatter(EMPRESA), P.parseFrontmatter(EQUIPE)]);
  const v = P.vencidos(ef, new Date('2026-10-11T12:00:00Z'));
  assert.deepStrictEqual(v, [
    { tipo: 'papel', chave: 'PO', dias: 40 },
    { tipo: 'papel', chave: 'Tech Lead', dias: Infinity },
  ]);
});

test('carregarPerfilEfetivo pelo contexto ativo', () => {
  const raiz = tmp();
  const empresas = path.join(raiz, 'empresas');
  escrever(path.join(empresas, 'acme', 'kanon', 'perfil.md'), EMPRESA);
  escrever(path.join(empresas, 'acme', 'vendas', 'azul', 'kanon', 'perfil.md'), EQUIPE);
  const projectDir = path.join(raiz, 'kanon');
  escrever(path.join(projectDir, '.claude', 'kanon.local.json'), JSON.stringify({ empresas, contexto: 'acme/vendas/azul' }));
  const ef = P.carregarPerfilEfetivo({ projectDir, cwd: projectDir });
  assert.strictEqual(ef.origem, 'contexto');
  assert.strictEqual(ef.arquivos.length, 2);
  assert.deepStrictEqual(ef.niveis, ['Acme', 'Time Azul']);
});

test('carregarPerfilEfetivo subindo pelas pastas, sem contexto', () => {
  const raiz = tmp();
  escrever(path.join(raiz, 'acme', 'kanon', 'perfil.md'), EMPRESA);
  const cwd = path.join(raiz, 'acme', 'vendas', 'azul');
  fs.mkdirSync(cwd, { recursive: true });
  const ef = P.carregarPerfilEfetivo({ projectDir: path.join(raiz, 'outro'), cwd });
  assert.strictEqual(ef.origem, 'pasta');
  assert.deepStrictEqual(ef.niveis, ['Acme']);
});

test('carregarPerfilEfetivo sem perfil devolve null', () => {
  const raiz = tmp();
  assert.strictEqual(P.carregarPerfilEfetivo({ projectDir: raiz, cwd: raiz }), null);
});

test('politicaDeBranches: perfil malformado volta ao padrão, sem lançar', () => {
  const raiz = tmp();
  escrever(path.join(raiz, 'acme', 'kanon', 'perfil.md'), '---\nnome: X\n\tquebrado\n---\n');
  const pol = P.politicaDeBranches({ projectDir: raiz, cwd: path.join(raiz, 'acme') });
  assert.strictEqual(pol.integracao, 'develop');
  assert.ok(pol.protegidas.some((re) => re.test('hotfix/x')));
});

test('politicaDeBranches converte glob', () => {
  const raiz = tmp();
  escrever(path.join(raiz, 'acme', 'kanon', 'perfil.md'), EMPRESA);
  const pol = P.politicaDeBranches({ projectDir: raiz, cwd: path.join(raiz, 'acme') });
  assert.ok(pol.protegidas.some((re) => re.test('release/2026.10')));
  assert.ok(!pol.protegidas.some((re) => re.test('develop')));
  assert.strictEqual(pol.integracao, 'main');
});

test('nomesReservados lê todos os perfis do repositório de empresas (inclusive as pessoas dos papéis)', () => {
  const raiz = tmp();
  const empresas = path.join(raiz, 'empresas');
  escrever(path.join(empresas, 'acme', 'kanon', 'perfil.md'), EMPRESA);
  escrever(path.join(empresas, 'acme', 'vendas', 'azul', 'kanon', 'perfil.md'), EQUIPE);
  escrever(path.join(empresas, 'outra', 'kanon', 'perfil.md'), '---\nnome: Outra SA\n---\n');
  const projectDir = path.join(raiz, 'kanon');
  escrever(path.join(projectDir, '.claude', 'kanon.local.json'), JSON.stringify({ empresas, contexto: 'acme' }));
  assert.deepStrictEqual(
    P.nomesReservados(projectDir).sort(),
    ['#aprovacoes-azul', 'Acme', 'Beltrano', 'Fulana Souza', 'Outra SA', 'Time Azul'].sort()
  );
});

test('nomesDeFerramentas lê o frontmatter dos adaptadores', () => {
  const raiz = tmp();
  escrever(path.join(raiz, '.claude', 'integrations', 'jira.md'), '---\nnomes: [Jira, Jira Cloud]\n---\n# Jira\n');
  escrever(path.join(raiz, '.claude', 'integrations', 'sem-frontmatter.md'), '# nada\n');
  assert.deepStrictEqual(P.nomesDeFerramentas(raiz), ['Jira', 'Jira Cloud']);
});

test('regexDeNome: sem diferenciar maiúsculas, com fronteira de palavra', () => {
  const re = P.regexDeNome('ADO');
  assert.ok(re.test('publicar no ADO.'));
  assert.ok(re.test('caminho empresas/ado/x'));
  assert.ok(!re.test('campo work_item_ado'));
  assert.ok(!re.test('aprovado'));
  assert.ok(P.regexDeNome('#aprovacoes-azul').test('canal #aprovacoes-azul hoje'));
});

test('mergeProfiles: papel com várias pessoas no mesmo nível fica inteiro; nível mais específico troca o conjunto', () => {
  const area = { nome: 'Área', papeis: [{ papel: 'Dev', pessoa: 'A' }, { papel: 'Dev', pessoa: 'B' }, { papel: 'PO', pessoa: 'P' }] };
  const ef1 = P.mergeProfiles([area]);
  assert.deepStrictEqual(ef1.papeis.filter((r) => r.papel === 'Dev').map((r) => r.pessoa), ['A', 'B']);
  const equipe = { nome: 'Equipe', papeis: [{ papel: 'Dev', pessoa: 'C' }] };
  const ef2 = P.mergeProfiles([area, equipe]);
  assert.deepStrictEqual(ef2.papeis.filter((r) => r.papel === 'Dev').map((r) => r.pessoa), ['C']);
  assert.deepStrictEqual(ef2.papeis.filter((r) => r.papel === 'PO').map((r) => r.pessoa), ['P']);
});

// --- Revisão final ---

function arvore(perfis) {
  const raiz = tmp();
  const empresas = path.join(raiz, 'empresas');
  for (const [rel, texto] of Object.entries(perfis)) escrever(path.join(empresas, rel), texto);
  const projectDir = path.join(raiz, 'kanon');
  escrever(path.join(projectDir, '.claude', 'kanon.local.json'), JSON.stringify({ empresas, contexto: 'acme' }));
  return { empresas, projectDir };
}

test('revisão: perfil ilegível de qualquer empresa gera erro que nomeia o arquivo', () => {
  const { projectDir } = arvore({
    'acme/kanon/perfil.md': '---\nnome: Acme\n---\n',
    'outra/kanon/perfil.md': '---\nnome: Outra\n# comentário solto\n---\n',
  });
  assert.throws(() => P.nomesReservados(projectDir), /perfil ilegível: .*outra.*perfil\.md/);
  const ileg = P.perfisIlegiveis(projectDir);
  assert.strictEqual(ileg.length, 1);
  assert.match(ileg[0], /outra/);
});

test('revisão: pessoas dos papéis entram nos nomes reservados; nomes com menos de 3 letras não', () => {
  const { projectDir } = arvore({
    'acme/kanon/perfil.md': '---\nnome: Acme\nnomes_reservados: [PO, QA]\npapeis:\n  - papel: Dev\n    pessoa: Fulano\n---\n',
  });
  const nomes = P.nomesReservados(projectDir);
  assert.ok(nomes.includes('Fulano'));
  assert.ok(!nomes.includes('PO') && !nomes.includes('QA'));
});

test('revisão: validade não numérica volta ao padrão; papel sem data continua vencido', () => {
  const ef = P.mergeProfiles([{ nome: 'A', validade: { papeis: '30 dias', ferramentas: -5 }, papeis: [{ papel: 'PO', pessoa: 'X' }] }]);
  assert.strictEqual(ef.validade.papeis, 30);
  assert.strictEqual(ef.validade.ferramentas, 180);
  assert.strictEqual(P.vencidos(ef, new Date('2026-10-12T00:00:00Z')).length, 1);
});

test('revisão: confirmado_em no futuro conta como vencido', () => {
  const ef = P.mergeProfiles([{ nome: 'A', papeis: [{ papel: 'PO', pessoa: 'X', confirmado_em: '2062-01-01' }] }]);
  assert.strictEqual(P.vencidos(ef, new Date('2026-10-12T00:00:00Z')).length, 1);
});

test('revisão: parser aceita BOM, lista na coluna 0, vírgula entre aspas e item com URL', () => {
  const p = P.parseFrontmatter('﻿---\nnome: Acme\ntags:\n- a\n- b\nnomes_reservados: ["B, C", D]\nlinks:\n  - https://x.example/y\n---\n');
  assert.strictEqual(p.nome, 'Acme');
  assert.deepStrictEqual(p.tags, ['a', 'b']);
  assert.deepStrictEqual(p.nomes_reservados, ['B, C', 'D']);
  assert.deepStrictEqual(p.links, ['https://x.example/y']);
});

test('revisão: item de nomes_reservados que não é texto torna o perfil ilegível', () => {
  const { projectDir } = arvore({
    'acme/kanon/perfil.md': '---\nnome: Acme\nnomes_reservados:\n  - Time: Alfa\n---\n',
  });
  assert.throws(() => P.nomesReservados(projectDir), /perfil ilegível/);
});

test('revisão: branches estranhas voltam ao padrão', () => {
  const dir = tmp();
  escrever(path.join(dir, 'kanon', 'perfil.md'), '---\nnome: A\nbranches:\n  protegidas: [,]\n  integracao: [a, b]\n---\n');
  const b = P.politicaDeBranches({ projectDir: dir, cwd: dir });
  assert.ok(b.protegidas.some((re) => re.test('develop')));
  assert.strictEqual(b.integracao, 'develop');
});

test('revisão: propostas pendentes da cadeia são lidas do historico.md', () => {
  const { empresas, projectDir } = arvore({
    'acme/kanon/perfil.md': '---\nnome: Acme\n---\n',
    'acme/kanon/historico.md':
      '# Histórico\n\n## 2026-10-01 — Troca de PO: A → B\n- **Tipo:** pessoa\n- **Decisão:** pendente\n\n## 2026-09-01 — Canal novo\n- **Decisão:** confirmada por X em 2026-09-02\n',
  });
  void empresas;
  const ef = P.carregarPerfilEfetivo({ projectDir, cwd: projectDir });
  assert.deepStrictEqual(ef.pendentes.map((x) => x.resumo), ['Troca de PO: A → B']);
});
