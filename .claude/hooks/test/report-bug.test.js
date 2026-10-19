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

const INTEGRACOES = path.join(__dirname, '..', '..', 'integrations');
const { parseFrontmatter } = require('../lib/perfil');

function capacidadesDoProcesso() {
  const p17 = ler('process/17-company-profile.md');
  const tabela = p17.split('## Capacidades')[1].split('\n## ')[0];
  return [...tabela.matchAll(/^\| [^|]+ \| `([a-z]+)` \|/gm)].map((m) => m[1]);
}

test('capacidades: process/17, o template de perfil e os adaptadores usam as mesmas chaves', () => {
  const caps = capacidadesDoProcesso();
  for (const c of ['dados', 'implantacao', 'observabilidade', 'mudanca', 'repositorio']) assert.ok(caps.includes(c), c);
  const tpl = ler('templates/PERFIL.template.md');
  for (const c of caps) assert.match(tpl, new RegExp(`^  ${c}: `, 'm'), `template de perfil sem ${c}`);
  for (const a of fs.readdirSync(INTEGRACOES).filter((f) => f.endsWith('.md'))) {
    const fm = parseFrontmatter(fs.readFileSync(path.join(INTEGRACOES, a), 'utf8'));
    for (const c of fm.capacidades || []) assert.ok(caps.includes(c), `${a}: capacidade ${c} fora do process/17`);
  }
});

test('levantamento de evidências: cada pergunta da triagem cita só capacidades do process/17', () => {
  const caps = capacidadesDoProcesso();
  const sec = ler('skills/32-report-bug/SKILL.md').split('### Como levantar cada evidência')[1].split('\n### ')[0];
  for (let n = 1; n <= 6; n += 1) {
    const linha = sec.split('\n').find((l) => l.startsWith(`| ${n} |`));
    assert.ok(linha, `pergunta ${n} sem linha`);
    const citadas = [...linha.split('|')[2].matchAll(/`([a-z]+)`/g)].map((m) => m[1]);
    assert.ok(citadas.length, `pergunta ${n} sem capacidade`);
    for (const c of citadas) assert.ok(caps.includes(c), `pergunta ${n}: ${c}`);
  }
});

test('todo adaptador de investigação tem Como consultar e Restrições de acesso, e há um para cada capacidade de investigação', () => {
  const investigar = new Set(['observabilidade', 'dados', 'implantacao', 'mudanca', 'repositorio', 'trabalho', 'documentacao']);
  const cobertas = new Set();
  for (const a of fs.readdirSync(INTEGRACOES).filter((f) => f.endsWith('.md'))) {
    const texto = fs.readFileSync(path.join(INTEGRACOES, a), 'utf8');
    const caps = (parseFrontmatter(texto).capacidades || []).filter((c) => investigar.has(c));
    if (!caps.length || a === 'notion.md') continue;
    caps.forEach((c) => cobertas.add(c));
    assert.ok(texto.includes('## Como consultar'), `${a}: falta Como consultar`);
    assert.ok(texto.includes('## Restrições de acesso'), `${a}: falta Restrições de acesso`);
  }
  for (const c of investigar) assert.ok(cobertas.has(c), `nenhum adaptador de investigação para ${c}`);
});

test('triagem replicável: a skill exige registrar como refazer e o template tem a seção', () => {
  const sec = ler('skills/32-report-bug/SKILL.md').split('### Como levantar cada evidência')[1].split('\n### ')[0];
  assert.match(sec, /\*\*Triagem replicável\*\*/);
  assert.match(sec, /roteiro de reprodução/);
  const tpl = ler('templates/BUG.template.md');
  assert.ok(tpl.includes('## Como refazer a triagem'), 'template sem a seção Como refazer a triagem');
  assert.ok(tpl.indexOf('## Como refazer a triagem') < tpl.indexOf('## Repro Steps'), 'a seção vem antes dos Repro Steps');
});

const LATENTE = TRIAGEM_OK.replace('homologação: SELECT ... = 0 linhas', 'latente: o caminho roda em produção, mas o banco não guarda o valor anterior');

test('Bug latente: a skill restringe a item já registrado e com análise; item novo continua sem BUG.md', () => {
  const triagem = ler('skills/32-report-bug/SKILL.md').split('## Triagem: é bug de verdade?')[1];
  assert.match(triagem, /\| Bug latente \|/);
  assert.match(triagem, /\*\*Bug latente\*\*.*já registrado/);
  assert.match(triagem, /\*\*Item novo\*\*.*não gera `BUG.md`/);
  const tpl = ler('templates/BUG.template.md');
  assert.match(tpl, /^\*\*Classificação\*\*: Bug \| Bug latente/m);
  assert.match(tpl, /^\*\*Item de origem\*\*:/m);
});

test('trava: pergunta 1 a 5 "não medido" é recusada', () => {
  const d = pasta();
  const f = path.join(d, 'BUG.md');
  const nm = TRIAGEM_OK.replace('homologação: SELECT ... = 0 linhas', 'não medido: banco sem rota · pedido à infra em 18/10');
  const r = rodarHook('bug-triage-gate', gravar(f, nm), { cwd: d });
  assert.strictEqual(r.decisao, 'deny');
  assert.match(r.motivo, /pergunta 4 não medida/);
});

test('trava: pergunta 4 "latente" só passa com o item de origem preenchido', () => {
  const d = pasta();
  const f = path.join(d, 'BUG.md');
  const sem = rodarHook('bug-triage-gate', gravar(f, LATENTE), { cwd: d });
  assert.strictEqual(sem.decisao, 'deny');
  assert.match(sem.motivo, /Bug latente sem o item de origem/);
  const vazio = LATENTE.replace('## Triagem', '**Item de origem**: _[preencher: id]_\n\n## Triagem');
  assert.strictEqual(rodarHook('bug-triage-gate', gravar(f, vazio), { cwd: d }).decisao, 'deny');
  const com = LATENTE.replace('## Triagem', '**Item de origem**: [177964](https://exemplo/177964)\n\n## Triagem');
  assert.strictEqual(rodarHook('bug-triage-gate', gravar(f, com), { cwd: d }).decisao, 'allow');
});

test('reprodução: local primeiro, homologação depois e produção só se nenhum dos dois der resultado, com aprovação', () => {
  const sec = ler('skills/32-report-bug/SKILL.md').split('### Como levantar cada evidência')[1].split('\n### ')[0];
  assert.match(sec, /\*\*Ordem da reprodução\*\*/);
  const ordem = sec.split('**Ordem da reprodução**')[1].split('\n- ')[0];
  const [l, h, p] = ['local', 'homologação', 'produção'].map((x) => ordem.indexOf(x));
  assert.ok(l >= 0 && l < h && h < p, 'ordem local → homologação → produção');
  assert.match(ordem, /aprovação/);
  assert.match(ler('templates/BUG.template.md'), /local primeiro/);
});

test('trava: rascunho e espelho de item da ferramenta de trabalho (BUG-<id>) não são bug local', () => {
  const d = pasta();
  for (const nome of ['BUG-177964.md', 'BUG-177964-descricao.md', 'BUG-177964-campos.md']) {
    assert.strictEqual(rodarHook('bug-triage-gate', gravar(path.join(d, nome), 'x'), { cwd: d }).decisao, 'allow', nome);
  }
  for (const nome of ['BUG.md', 'BUG-01.md', 'BUG-02-importacao.md', 'BUG-123-x.md']) {
    assert.strictEqual(rodarHook('bug-triage-gate', gravar(path.join(d, nome), 'x'), { cwd: d }).decisao, 'deny', nome);
  }
});
