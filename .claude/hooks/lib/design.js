'use strict';
// DESIGN.md aprovado = linha **Status** com APPROVED (sem DRAFT nem placeholder) e "Aprovado por" preenchido.
// Usado pelo design-gate-approval-gate e pelo scripts/kanon-status.
function isApproved(designMdContent) {
  const statusLine = designMdContent.split('\n').find((l) => l.includes('**Status**'));
  const approvedByLine = designMdContent.split('\n').find((l) => l.includes('Aprovado por'));
  if (!statusLine || !approvedByLine) return false;
  const statusOk = statusLine.includes('APPROVED') && !statusLine.includes('DRAFT') && !statusLine.includes('[preencher');
  const approverOk = !approvedByLine.includes('[preencher');
  return statusOk && approverOk;
}

module.exports = { isApproved };
