'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const KANON = path.join(__dirname, '..', '..', '..', '.kanon');
const ler = (rel) => fs.readFileSync(path.join(KANON, rel), 'utf8');

test('a skill 32 tem a triagem com as seis perguntas e os destinos de cada resultado', () => {
  const skill = ler('skills/32-report-bug/SKILL.md');
  const triagem = skill.split('## Triagem: é bug de verdade?')[1];
  assert.ok(triagem, 'falta a seção de triagem');
  for (let n = 1; n <= 6; n += 1) assert.match(triagem, new RegExp(`^${n}\\. \\*\\*`, 'm'), `pergunta ${n}`);
  for (const r of ['Pedido de mudança', 'Incidente ou ajuste operacional', 'Inconclusivo', 'Bug visual']) assert.ok(triagem.includes(r), r);
});

test('o template de Bug traz uma linha da triagem para cada pergunta da skill', () => {
  const tpl = ler('templates/BUG.template.md');
  const secao = tpl.split('## Triagem')[1].split('\n## ')[0];
  for (let n = 1; n <= 6; n += 1) assert.match(secao, new RegExp(`^\\| ${n} \\|`, 'm'), `linha ${n}`);
});
