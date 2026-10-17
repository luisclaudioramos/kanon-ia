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

const os = require('os');
const { rodarHook } = require('./helpers');

const TRIAGEM_OK = `# Bug — x

## Triagem

| # | Pergunta | Resposta e evidência |
|---|---|---|
| 1 | Regra | AC-02 da US-03: "grava a campanha" |
| 2 | Reproduz? | sim, passos abaixo |
| 3 | Linha | \`CampaignService.cs:88\` |
| 4 | O dado confirma? | homologação: SELECT ... = 0 linhas |
| 5 | Ambiente e configuração | versão 3.28 implantada, sem fila parada |
| 6 | Regressão? | _[preencher: "não" · ou a mudança]_ |

## Repro Steps
1. a
`;

function pasta() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-bug-'));
}
const gravar = (f, content) => ({ tool_name: 'Write', tool_input: { file_path: f, content } });

test('trava: BUG.md novo com a triagem completa passa (a pergunta 6 é opcional)', () => {
  const d = pasta();
  for (const nome of ['BUG.md', 'BUG-01-cadastro-nao-grava.md']) {
    assert.strictEqual(rodarHook('bug-triage-gate', gravar(path.join(d, nome), TRIAGEM_OK), { cwd: d }).decisao, 'allow', nome);
  }
});

test('trava: BUG.md novo sem a seção, ou com pergunta 1 a 5 em aberto, é recusado', () => {
  const d = pasta();
  const f = path.join(d, 'BUG.md');
  const sem = rodarHook('bug-triage-gate', gravar(f, '# Bug\n\n## Repro Steps\n1. a\n'), { cwd: d });
  assert.strictEqual(sem.decisao, 'deny');
  assert.match(sem.motivo, /falta a seção/);
  const tpl = ler('templates/BUG.template.md');
  const vazio = rodarHook('bug-triage-gate', gravar(f, tpl), { cwd: d });
  assert.strictEqual(vazio.decisao, 'deny');
  assert.match(vazio.motivo, /pergunta 1 sem resposta.*pergunta 5 sem resposta/);
  const quatro = TRIAGEM_OK.replace('homologação: SELECT ... = 0 linhas', '_[preencher: ambiente]_');
  assert.match(rodarHook('bug-triage-gate', gravar(f, quatro), { cwd: d }).motivo, /pergunta 4 sem resposta/);
});

test('trava: edição que apaga uma resposta da triagem é recusada; a que mexe em outra parte passa', () => {
  const d = pasta();
  const f = path.join(d, 'BUG-02.md');
  fs.writeFileSync(f, TRIAGEM_OK);
  const apaga = { tool_name: 'Edit', tool_input: { file_path: f, old_string: '`CampaignService.cs:88`', new_string: '_[preencher]_' } };
  assert.strictEqual(rodarHook('bug-triage-gate', apaga, { cwd: d }).decisao, 'deny');
  const outra = { tool_name: 'Edit', tool_input: { file_path: f, old_string: '1. a', new_string: '1. abrir a tela' } };
  assert.strictEqual(rodarHook('bug-triage-gate', outra, { cwd: d }).decisao, 'allow');
});

test('trava: bug antigo sem a seção Triagem não é cobrado; BUG-TASK, BUG-INSTRUCTIONS e o template não são bug', () => {
  const d = pasta();
  const antigo = path.join(d, 'BUG-01.md');
  fs.writeFileSync(antigo, '# Bug antigo\n\n## Repro Steps\n1. a\n');
  const ed = { tool_name: 'Edit', tool_input: { file_path: antigo, old_string: '1. a', new_string: '1. b' } };
  assert.strictEqual(rodarHook('bug-triage-gate', ed, { cwd: d }).decisao, 'allow');
  for (const nome of ['BUG-TASK-01.md', 'BUG-INSTRUCTIONS.md', 'BUG.template.md', 'NOTAS.md']) {
    assert.strictEqual(rodarHook('bug-triage-gate', gravar(path.join(d, nome), 'x'), { cwd: d }).decisao, 'allow', nome);
  }
});

test('trava ligada no settings.json para Write e Edit', () => {
  const s = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'settings.json'), 'utf8'));
  const grupo = s.hooks.PreToolUse.find((g) => g.matcher === 'Write|Edit');
  assert.ok(grupo.hooks.some((h) => h.command.includes('bug-triage-gate.js')));
});

test('quem encontra defeito aponta para a triagem da skill 32', () => {
  for (const rel of [
    'skills/12-development-execution/SKILL.md',
    'skills/13-code-review/SKILL.md',
    'skills/14-qa-validation/SKILL.md',
    'skills/43-meeting-intake/SKILL.md',
    'agents/AGENT-QA-ENGINEER.md',
    'agents/AGENT-CODE-REVIEWER.md',
  ]) {
    assert.match(ler(rel), /32-report-bug[^\n]*[Tt]riagem|[Tt]riagem[^\n]*32-report-bug/, rel);
  }
});
