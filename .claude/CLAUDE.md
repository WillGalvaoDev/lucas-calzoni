# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Objetivo do projeto

Landing page premium, cinematográfica e editorial-minimalista para o ator Lucas Calzoni: apresentação, sobre, filmografia, galeria + reel e contato. Página única (âncoras), bilíngue PT/EN, conteúdo placeholder nesta fase.

## Stack técnica prevista

React + Vite + TypeScript (strict) + Tailwind CSS + shadcn/ui. Sem react-router. i18n via Context/hook tipado próprio (sem lib externa). Ver `docs/architecture.md` para a estrutura de pastas completa.

## Fontes de verdade — `docs/`

Antes de qualquer decisão, consultar:
- `docs/product.md` — objetivo, público, escopo, critérios de sucesso, pendências de conteúdo.
- `docs/design.md` — direção visual, narrativa por seção **e o design system completo** (cores, tipografia, motion, imagem, specs de componente, acessibilidade).
- `docs/architecture.md` — stack, pastas, i18n, dados, performance, deploy, processo.
- `docs/implementation.md` — estado de cada seção, defeitos corrigidos, validações e pendências.

São exatamente quatro. Não criar documento novo em `docs/` sem decisão explícita do Lead — a fragmentação anterior (oito arquivos) foi a origem da maioria das contradições do projeto.

**Estes documentos não são sugestões — são a especificação.** Não implementar, alterar comportamento ou reinterpretar requisitos sem checá-los primeiro. Se uma tarefa exigir uma decisão não coberta por eles, parar e perguntar em vez de assumir.

## Fluxo docs-first

1. Toda tarefa começa lendo o(s) doc(s) relevante(s) em `docs/`.
2. Se o doc já cobre a decisão → implementar conforme especificado.
3. Se o doc não cobre → não decidir sozinho: reportar a lacuna (o Lead resolve, atualizando o doc antes de seguir).
4. Nunca alterar um arquivo em `docs/` para "encaixar" uma implementação já feita — o doc lidera, o código segue.

## Divisão de responsabilidades

**Lead** (Product Designer + UX Designer + Software Architect) — **Opus 5**, usado somente para:
- Planejamento, decisões de arquitetura e de design system.
- Revisão crítica do que foi implementado (contra `design.md` e as diretrizes de UX/acessibilidade).
- Triagem de achados de Chrome DevTools (bug → tarefa de correção; lacuna de design → atualização do doc).
- Não escreve código de implementação.

**Implementer** (Senior Frontend Implementer) — **Sonnet 5**, usado para:
- Implementação, testes e correções de código.
- Configuração de ferramentas; registra o que entregou em `implementation.md`.
- Se travar numa decisão de design/arquitetura fora do escopo dos docs, para e escala para o Lead em vez de improvisar.

## Prioridades transversais

Nesta ordem de importância quando houver conflito: **segurança e privacidade > correção > acessibilidade > simplicidade > manutenibilidade** — sobre qualquer ganho estético ou atalho de conveniência.

## Regras de trabalho

- Explicar cada bloco de código relevante ao implementá-lo (o quê e, principalmente, por quê — não só narrar o óbvio).
- Nunca diagnosticar um problema sem evidência concreta (log, mensagem de erro, reprodução observada). Não "chutar" causa.
- Nunca expor chaves, tokens ou dados pessoais em código, commits ou logs — `.mcp.json` já usa variável de ambiente (`${API_KEY_21ST}`), manter esse padrão.

## Uso das ferramentas de design/MCP

- **`frontend-design`** (skill) — consultar para decisões visuais (composição, tipografia, direção estética), alinhado a `design.md`.
- **`21st`** (MCP) — usar para pesquisar referências e componentes de inspiração, não para gerar UI final sem revisão contra o design system.
- **`shadcn-ui`** (MCP) — usar para consultar e instalar componentes base adequados; consultar antes de criar componentes de UI comuns que possam já existir no shadcn.
- **Chrome DevTools MCP** — usar **somente com a aplicação rodando** (`npm run dev` ativo), para validação visual, responsividade (mobile 375×812 / tablet 768×1024 / desktop 1440×900), console, rede e performance. Não usar para inspecionar código estático.
- Evitar chamadas desnecessárias a qualquer MCP — cada chamada consome créditos; só invocar quando a tarefa concreta exigir.

## Validação antes de concluir

Rodar os scripts disponíveis e aplicáveis à alteração: `lint`, `typecheck` (ou `tsc --noEmit`), `test` e `build`. Não pular etapas de validação existentes para economizar tempo.
