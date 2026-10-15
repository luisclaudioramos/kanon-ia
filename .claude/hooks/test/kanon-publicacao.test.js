'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { main, secoesDoModelo } = require('../../scripts/kanon-publicacao');

const REPO = path.join(__dirname, '..', '..', '..');

const MODELO = [
  'Documentos relacionados',
  'Description',
  'Business Request',
  'Impacted Systems',
  'Priority',
  'Risk',
  'Effort',
  'User Stories',
  'Decisions',
  'Pending Issues',
  'Implementation Summary',
  'User Stories Status',
  'Anexo A — Documento de escopo original',
];

function descricaoFeature({ sem = [], extra = '', docs = '- 📋 [INSTRUCTIONS.md]({{ATT:INSTRUCTIONS.md}}) — instruções técnicas.' } = {}) {
  const partes = ['# FT01 - Cadastro simplificado', ''];
  for (const s of MODELO) {
    if (sem.includes(s)) continue;
    partes.push(`## ${s}`, '', s === 'Documentos relacionados' ? docs : `Texto de ${s}.`, '');
  }
  return partes.join('\n') + extra;
}

function pacote(arquivos, manifesto) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-publicacao-'));
  for (const [rel, conteudo] of Object.entries(arquivos)) {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), conteudo);
  }
  const p = path.join(dir, 'pacote.json');
  fs.writeFileSync(p, JSON.stringify(manifesto));
  return p;
}

const CAMPOS = { tags: '2026; Cadastro; fase-1', responsavel: 'Fulana', esforco: 13, iteracao: 'Sprint 40' };

function feature({ descricao = descricaoFeature(), anexos, campos = CAMPOS, arquivos = {}, ...resto } = {}) {
  return pacote(
    { 'FEATURE-ado.md': descricao, 'INSTRUCTIONS.md': '# Instruções\n\nComo implementar.\n', ...arquivos },
    {
      tipo: 'feature',
      titulo: 'FT01 - Cadastro simplificado',
      descricao: 'FEATURE-ado.md',
      anexos: anexos || [{ nome: 'INSTRUCTIONS.md', arquivo: 'INSTRUCTIONS.md' }],
      campos,
      ...resto,
    }
  );
}

const rodar = (p) => main([p], { projectDir: REPO });

test('o modelo de seções sai do template da Feature, na ordem do item publicado', () => {
  assert.deepStrictEqual(
    secoesDoModelo(REPO).map((s) => s.titulo),
    MODELO
  );
  assert.deepStrictEqual(
    secoesDoModelo(REPO).filter((s) => s.opcional).map((s) => s.titulo),
    ['Pending Issues']
  );
});

test('feature no modelo, com anexos e campos: pode publicar', () => {
  const r = rodar(feature());
  assert.strictEqual(r.code, 0, r.stdout);
  assert.match(r.stdout, /PODE PUBLICAR/);
  assert.match(r.stdout, /Anexos \(1\): INSTRUCTIONS\.md/);
});

test('seção opcional ausente não recusa', () => {
  const r = rodar(feature({ descricao: descricaoFeature({ sem: ['Pending Issues'] }) }));
  assert.strictEqual(r.code, 0, r.stdout);
});

test('falta seção do modelo: recusa citando a seção', () => {
  const r = rodar(feature({ descricao: descricaoFeature({ sem: ['Business Request'] }) }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /RECUSADA/);
  assert.match(r.stdout, /falta a seção "Business Request"/);
});

test('seção fora da ordem do modelo: recusa', () => {
  const d = descricaoFeature().replace('## Priority', '## TEMP').replace('## Risk', '## Priority').replace('## TEMP', '## Risk');
  const r = rodar(feature({ descricao: d }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /fora da ordem do modelo/);
});

test('seção que não existe no modelo: recusa', () => {
  const r = rodar(feature({ descricao: descricaoFeature({ extra: '\n## Requisitos Funcionais (RF)\n\nRF-01.\n' }) }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /"Requisitos Funcionais \(RF\)" não existe no modelo/);
});

test('título da descrição diferente do título do item: recusa', () => {
  const r = rodar(feature({ descricao: descricaoFeature().replace('# FT01 - Cadastro simplificado', '# Feature — Cadastro') }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /primeira linha/);
});

test('link relativo ou âncora na descrição: recusa', () => {
  const r = rodar(feature({ descricao: descricaoFeature({ extra: '\nVer [o plano](./PLAN-v1.md) e [o anexo](#anexo-a).\n' }) }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /link relativo "\.\/PLAN-v1\.md"/);
  assert.match(r.stdout, /link relativo "#anexo-a"/);
});

test('documento relacionado que não está anexado: recusa', () => {
  const docs = '- [INSTRUCTIONS.md]({{ATT:INSTRUCTIONS.md}}) — x.\n- [Runbook]({{ATT:RUNBOOK.md}}) — y.';
  const r = rodar(feature({ descricao: descricaoFeature({ docs }) }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /"RUNBOOK\.md" está em Documentos relacionados e não está na lista de anexos/);
});

test('anexo que não é citado em Documentos relacionados, ou cujo arquivo não existe: recusa', () => {
  const r = rodar(
    feature({
      anexos: [
        { nome: 'INSTRUCTIONS.md', arquivo: 'INSTRUCTIONS.md' },
        { nome: 'DESIGN.md', arquivo: 'nao-existe/DESIGN.md' },
      ],
    })
  );
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /anexo "DESIGN\.md" não aparece em Documentos relacionados/);
  assert.match(r.stdout, /arquivo do anexo "DESIGN\.md" não existe/);
});

test('tags sem o ano na frente e sem responsável: recusa', () => {
  const r = rodar(feature({ campos: { ...CAMPOS, tags: 'Cadastro; 2026', responsavel: ' ' } }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /a primeira tag precisa ser o ano/);
  assert.match(r.stdout, /falta o responsável/);
});

test('esforço e iteração vazios: recusa sem motivo, aceita com motivo e mostra o motivo', () => {
  const sem = rodar(feature({ campos: { ...CAMPOS, esforco: '', iteracao: null } }));
  assert.strictEqual(sem.code, 1);
  assert.match(sem.stdout, /esforço vazio sem motivo/);
  assert.match(sem.stdout, /iteração vazia sem motivo/);

  const com = rodar(
    feature({ campos: { ...CAMPOS, esforco: { motivo: 'SP a estimar com o time' }, iteracao: { motivo: 'sprint não definida' } } })
  );
  assert.strictEqual(com.code, 0, com.stdout);
  assert.match(com.stdout, /esforço: SP a estimar com o time/);
  assert.match(com.stdout, /iteração: sprint não definida/);
});

test('anexo com prazo ou estratégia interna: recusa listando arquivo e linha', () => {
  const plano = '# Plano\n\nOrçamento de 100 h contra a estimativa do time.\nSó então comunicar data ao negócio.\n';
  const r = rodar(
    feature({
      descricao: descricaoFeature({ docs: '- [INSTRUCTIONS.md]({{ATT:INSTRUCTIONS.md}}) — x.\n- [Plano]({{ATT:PLAN-v1.md}}) — y.' }),
      anexos: [
        { nome: 'INSTRUCTIONS.md', arquivo: 'INSTRUCTIONS.md' },
        { nome: 'PLAN-v1.md', arquivo: 'PLAN-v1.md' },
      ],
      arquivos: { 'PLAN-v1.md': plano },
    })
  );
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /PLAN-v1\.md:3 .*100 h/);
  assert.match(r.stdout, /PLAN-v1\.md:4 .*comunicar data/);
});

test('arquivo deixado de fora, com motivo: pode publicar e lista o que ficou de fora', () => {
  const r = rodar(
    feature({ fora: [{ arquivo: 'PLAN-v1.md', motivo: 'traz orçamento e estratégia de comunicação de data' }] })
  );
  assert.strictEqual(r.code, 0, r.stdout);
  assert.match(r.stdout, /Fora, de propósito:\n {2}- PLAN-v1\.md — traz orçamento e estratégia de comunicação de data/);
});

test('arquivo deixado de fora sem motivo: recusa', () => {
  const r = rodar(feature({ fora: [{ arquivo: 'TCO.md' }] }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /"TCO\.md" ficou de fora sem motivo/);
});

test('trecho suspeito revisado por pessoa, com motivo: pode publicar e mostra a revisão', () => {
  const arq = '# Arquitetura\n\nO token tem prazo de expiração de 30 minutos.\n';
  const r = rodar(
    feature({
      descricao: descricaoFeature({ docs: '- [INSTRUCTIONS.md]({{ATT:INSTRUCTIONS.md}}) — x.\n- [ADR]({{ATT:ARCHITECTURE.md}}) — y.' }),
      anexos: [
        { nome: 'INSTRUCTIONS.md', arquivo: 'INSTRUCTIONS.md' },
        { nome: 'ARCHITECTURE.md', arquivo: 'ARCHITECTURE.md', revisado: 'prazo de expiração do token, regra técnica' },
      ],
      arquivos: { 'ARCHITECTURE.md': arq },
    })
  );
  assert.strictEqual(r.code, 0, r.stdout);
  assert.match(r.stdout, /ARCHITECTURE\.md — revisado: prazo de expiração do token, regra técnica/);
});

test('descrição com prazo interno também recusa', () => {
  const r = rodar(feature({ descricao: descricaoFeature({ extra: '\nEntrega até 15/10, com folga de 1 dia.\n' }) }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /descrição:\d+ /);
});

test('texto de template ou referência interna do kanon: recusa', () => {
  const r = rodar(feature({ descricao: descricaoFeature({ extra: '\n_[preencher: algo]_\nGerado por `skills/29-implementation-summary-update`.\n' }) }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /texto de template não preenchido/);
  assert.match(r.stdout, /referência interna do kanon "skills\/29-implementation-summary-update"/);
});

test('caminho de repositório que só lembra uma pasta do kanon não é referência interna', () => {
  const r = rodar(feature({ descricao: descricaoFeature({ extra: '\nO e-mail sai de `templates/email.html` e de `src/agents/notify.ts`.\n' }) }));
  assert.strictEqual(r.code, 0, r.stdout);
});

test('manifesto ilegível ou sem tipo: recusa com orientação', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-publicacao-'));
  fs.writeFileSync(path.join(dir, 'p.json'), '{');
  assert.strictEqual(rodar(path.join(dir, 'p.json')).code, 1);
  assert.strictEqual(main([], { projectDir: REPO }).code, 1);
  const r = rodar(pacote({}, { tipo: 'epico' }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /tipo "epico"/);
});

// ---------- User Story ----------

const DESC_US = '# US01 - API do cadastro: aceitar celular opcional\n\n## Objetivo\n\nTexto.\n';
const AC_US = '- [ ] Cadastro sem celular e com e-mail é aceito.\n';

function us({ titulo = 'US01 - API do cadastro: aceitar celular opcional', descricao = DESC_US, criterios = AC_US, campos } = {}) {
  return pacote(
    { 'US01.desc.md': descricao, 'US01.ac.md': criterios },
    {
      tipo: 'user-story',
      titulo,
      descricao: 'US01.desc.md',
      criterios: 'US01.ac.md',
      anexos: [],
      campos: campos || { ...CAMPOS, tags: '2026; Cadastro; fase-1; US01', esforco: 5 },
    }
  );
}

test('US no modelo: pode publicar', () => {
  const r = rodar(us());
  assert.strictEqual(r.code, 0, r.stdout);
});

test('US com título fora de "USnn - camada: título": recusa', () => {
  const r = rodar(us({ titulo: 'US-01 - aceitar celular', descricao: DESC_US.replace(/^# .*$/m, '# US-01 - aceitar celular') }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /USnn - camada: título/);
});

test('US sem a tag USnn no fim, ou com outra US: recusa', () => {
  const r = rodar(us({ campos: { ...CAMPOS, tags: '2026; Cadastro; US02' } }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /a última tag precisa ser "US01"/);
});

test('US com Mermaid em texto, critérios vazios ou critérios dentro da descrição: recusa', () => {
  const desc = DESC_US + '\n```mermaid\nflowchart LR\nA-->B\n```\n\n## ✅ Critérios de aceite\n\n- [ ] x\n';
  const r = rodar(us({ descricao: desc, criterios: '  \n' }));
  assert.strictEqual(r.code, 1);
  assert.match(r.stdout, /diagrama Mermaid em texto/);
  assert.match(r.stdout, /critérios de aceite vazios/);
  assert.match(r.stdout, /critérios de aceite dentro da descrição/);
});
