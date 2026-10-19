'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const KANON = path.join(__dirname, '..', '..', '..', '.kanon');
const ler = (rel) => fs.readFileSync(path.join(KANON, rel), 'utf8');

test('QA roda em homologação; cenário que homologação não monta roda local na versão de homologação, com motivo e ressalva', () => {
  const s14 = ler('skills/14-qa-validation/SKILL.md');
  assert.ok(s14.includes('**Onde cada cenário roda**'));
  assert.match(s14, /local na versão de homologação/);
  assert.match(s14, /Fica para UAT/);
  assert.match(s14, /só a suíte não conta/);
  const tc = ler('templates/TEST-CASE.template.md');
  assert.match(tc, /\*\*Onde roda\*\*/);
  assert.match(tc, /- Ambiente e versão:/);
  const tr = ler('templates/TEST-REPORT.template.md');
  assert.match(tr, /\| Test Case \| Ambiente \| Versão \|/);
  assert.match(tr, /## Cenários que homologação não monta/);
  assert.match(ler('skills/25-test-case-authoring/SKILL.md'), /Onde roda/);
  assert.match(ler('skills/28-test-report/SKILL.md'), /Cenários que homologação não monta/);
  assert.match(ler('skills/11-quality-gate/SKILL.md'), /atestado local/);
});
