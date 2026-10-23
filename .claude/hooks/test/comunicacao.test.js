'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { main, skills } = require('../../scripts/kanon-help');

const RAIZ = path.join(__dirname, '..', '..', '..');
const ler = (rel) => fs.readFileSync(path.join(RAIZ, rel), 'utf8');

function publicosDoCatalogo() {
  return ler('.kanon/reference/comunicacao/02-publicos.md')
    .split('\n')
    .map((l) => l.match(/^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|/))
    .filter(Boolean)
    .map((m) => m[2]);
}

function secao(md, titulo) {
  const inicio = md.indexOf(`## ${titulo}`);
  assert.ok(inicio >= 0, `seção ${titulo}`);
  const resto = md.slice(inicio + 3);
  const fim = resto.search(/\n## /);
  return fim < 0 ? resto : resto.slice(0, fim);
}

test('catálogo tem os 13 públicos, cada um com a própria seção', () => {
  const publicos = publicosDoCatalogo();
  assert.strictEqual(publicos.length, 13);
  const md = ler('.kanon/reference/comunicacao/02-publicos.md');
  publicos.forEach((p, i) => assert.ok(md.includes(`## ${i + 1}. ${p}`), p));
});

test('template do perfil lista os mesmos públicos, na mesma ordem', () => {
  const tabela = secao(ler('.kanon/templates/PERFIL.template.md'), 'Públicos')
    .split('\n')
    .map((l) => l.match(/^\|\s*([^|]+?)\s*\|/))
    .filter(Boolean)
    .map((m) => m[1])
    .filter((c) => c !== 'Público' && !/^-+$/.test(c));
  assert.deepStrictEqual(tabela, publicosDoCatalogo());
});

test('skill 52 está no índice, no menu e no atalho /kanon mensagem', () => {
  assert.ok(fs.existsSync(path.join(RAIZ, '.kanon/skills/52-audience-message/SKILL.md')));
  assert.ok(skills(RAIZ).flatMap((f) => f.itens).some((s) => s.nome === 'audience-message'));
  assert.ok(main([], { projectDir: RAIZ, cwd: RAIZ }).stdout.includes('/kanon mensagem'));
  assert.ok(ler('.claude/commands/kanon.md').includes('`mensagem`'));
  assert.ok(ler('.kanon/commands/kanon.md').includes('`mensagem`'));
});

test('skill 52 rascunha e nunca envia: a ferramenta de envio não aparece', () => {
  const md = ler('.kanon/skills/52-audience-message/SKILL.md');
  assert.ok(/nunca envia/i.test(md));
  assert.ok(!/send_message\b|slack/i.test(md));
});

test('template de mensagem guarda público, tipo, destino, fontes e estado', () => {
  const fm = ler('.kanon/templates/MENSAGEM.template.md').split('---')[1];
  for (const chave of ['publico', 'tipo', 'destino', 'fontes', 'status', 'aprovado_em', 'enviado_em']) {
    assert.ok(new RegExp(`^${chave}:`, 'm').test(fm), chave);
  }
});

test('skills que rascunham mensagem passam pela revisão da 52 e do COMMUNICATOR', () => {
  for (const s of ['34-pull-request-review', '47-handoff-delivery', '48-screen-validation', '49-change-impact']) {
    const md = ler(`.kanon/skills/${s}/SKILL.md`);
    assert.ok(md.includes('52-audience-message'), `${s} cita a skill 52`);
    assert.ok(md.includes('AGENT-COMMUNICATOR'), `${s} cita o COMMUNICATOR`);
  }
});
