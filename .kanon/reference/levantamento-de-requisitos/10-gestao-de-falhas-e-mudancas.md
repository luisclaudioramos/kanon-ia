# Gestão de Falhas e Mudança de Requisitos

Mesmo com um bom processo, requisitos falham — a diferença entre um time maduro e um imaturo não é nunca falhar, é ter um plano de contenção pronto para quando acontecer.

## Plano de contenção, em ordem

```
[1. Parar o desenvolvimento] → [2. Alinhar com o cliente] → [3. Validar visualmente] → [4. Repactuar e documentar]
```

1. **Parar o desenvolvimento das partes ambíguas**: interromper a codificação da funcionalidade afetada imediatamente, para não continuar gastando esforço em cima de uma base incerta. Não é preciso parar tudo — só o que está diretamente afetado pela ambiguidade encontrada.
2. **Alinhar com o cliente/stakeholder**: reunião transparente, assumindo o gap de comunicação sem procurar culpado. O objetivo é entender onde exatamente o entendimento divergiu, não relitigar quem errou.
3. **Validar visualmente**: não tentar resolver só com palavras — desenhar um protótipo de baixa fidelidade ali mesmo, na conversa, para confirmar entendimento antes de sair da sala. Texto ambíguo gerou o problema; mais texto raramente resolve sozinho.
4. **Repactuar e documentar**: atualizar os critérios de aceite com o que foi esclarecido, coletar aprovação formal de novo (ver [11-validacao-e-homologacao.md](11-validacao-e-homologacao.md)), e ajustar prazo se o volume de retrabalho justificar.

## Gestão de mudanças não é o mesmo que falha de requisito

Requisito mudar ao longo do projeto é normal — negócio muda, aprendizado acontece. O problema não é a mudança em si, é mudança não registrada: um pedido novo aceito informalmente, sem passar de novo pela Análise (prioridade/viabilidade) e sem atualizar o critério de aceite formal. Toda mudança de requisito segue o mesmo ciclo de [01-processo-de-elicitacao.md](01-processo-de-elicitacao.md) — não é um atalho por fora dele.

## Quando o "erro" é maior que um requisito isolado

Se o mesmo sintoma de falha (ver [09-anti-padroes-e-sinais-de-alerta.md](09-anti-padroes-e-sinais-de-alerta.md)) se repete em requisitos diferentes, o problema provavelmente não está em um requisito específico — está no próprio processo de elicitação sendo pulado ou raso de forma sistemática. Vale tratar como um problema de processo, não corrigir requisito por requisito indefinidamente.
