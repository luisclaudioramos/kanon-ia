# Subagent Dispatch — _[preencher: nome da execução em fan-out]_

_Manifesto de fan-out (Selo III). Gerado por `skills/24-development-orchestration`, assinado pelo Tech Lead._

**Disparado por**: _[preencher: TECH-LEAD]_ · **Autorização**: ver `process/04-handoff-protocol.md` (quem pode disparar fan-out)

## Subagentes convocados
| Subagente | Task atribuída | Tier de modelo | Timeout |
|---|---|---|---|
| _[preencher]_ | _[preencher]_ | Forte/Intermediário/Rápido (`process/08-model-orchestration.md`) | _[preencher]_ |

## Schema de retorno esperado
Todos os subagentes devem devolver o Return Envelope de `process/07-return-envelope.md`:
```json
{
  "status": "success | failure | blocked",
  "evidence": ["..."],
  "summary": "...",
  "path_to_artifact": "..."
}
```

## Resolução de conflitos
_[preencher: como conflitos de arquivo entre subagentes serão resolvidos — autoridade do Tech Lead, `process/08-model-orchestration.md`]_
