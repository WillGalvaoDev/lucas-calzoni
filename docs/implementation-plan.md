# Implementation Plan — Lucas Calzoni Landing Page

Checklist ordenada para o Implementer. Cada item referencia os docs que o governam e o recurso MCP aplicável. Não pular a verificação em navegador nos itens marcados. Se um item exigir uma decisão de design/arquitetura não coberta pelos docs, parar e reportar ao Lead.

**Pré-condição (bloqueante):** confirmar que `shadcn-ui-mcp-server` e `chrome-devtools-mcp` estão conectados à sessão antes de iniciar o Item 0. `21st` não é pré-condição obrigatória — só precisa estar disponível quando um item específico exigir pesquisa de referências/componentes.

## Regra geral

Implementar apenas um item por vez. Não iniciar o próximo antes de concluir e validar o atual (checklist de saída do item, quando houver).

## Uso de recursos

- Antes de utilizar qualquer MCP, verificar se a informação já existe na documentação do projeto. Se a resposta estiver em `docs/`, não consultar o MCP correspondente.
- **`21st`** — usar apenas quando houver necessidade de pesquisar referências ou componentes; não é uso padrão em todo item.
- **`shadcn-ui`** — usar para consultar/instalar componentes existentes antes de criar algo do zero.
- **Chrome DevTools (`chrome-devtools-mcp`)** — usar apenas com a aplicação em execução (dev server ativo); não serve para inspecionar código estático.

## Fluxo por item

Implementer executa → valida o item → quando houver decisões relevantes de UX, design, arquitetura ou microinterações, solicitar revisão do Lead → item concluído. Tarefas puramente técnicas, de configuração ou infraestrutura não exigem revisão do Lead.

## Checklist

0. **Revisar toda a documentação em `docs/` antes de iniciar qualquer implementação.**
   - Docs: `product.md`, `design.md`, `design-system.md`, `architecture.md`, `implementation-plan.md` (este arquivo)

1. **Scaffold do projeto** — Vite + React + TS, Tailwind, `tsconfig` strict, path alias `@/*`.
   - Docs: `architecture.md` (Stack, Estrutura de pastas)
   - Recurso: `shadcn-ui-mcp-server` (init)
   - Checklist de saída: lint, typecheck, build

2. **Config shadcn/ui** — `components.json` + instalar componentes base necessários (button, dialog, navigation-menu, etc.).
   - Docs: `architecture.md`
   - Recurso: `shadcn-ui-mcp-server`
   - Checklist de saída: lint, typecheck, build

3. **Tokens de design** — cores, tipografia (Fraunces/Inter via `@fontsource`), espaçamento em `tailwind.config.ts`/`index.css`.
   - Docs: `design-system.md` (Cores, Tipografia, Espaçamento e grid)
   - Checklist de saída: lint, typecheck, build

4. **i18n** — `content/i18n.tsx`, `pt.ts`, `en.ts`, componente `LanguageToggle`.
   - Docs: `architecture.md` (i18n), `design-system.md` (Navbar — spec do toggle)
   - Checklist de saída: lint, typecheck, build

5. **Dados placeholder** — `data/filmography.ts`, `data/gallery.ts` tipados.
   - Docs: `architecture.md` (Dados), `design.md` (Estratégia de conteúdo placeholder)
   - Checklist de saída: lint, typecheck, build

6. **Navbar + Footer**
   - Docs: `design-system.md` (Navbar, Contato/Footer)
   - Verificação em navegador: sim (transição transparente→sólida ao rolar, toggle de idioma, links âncora)
   - Checklist de saída: lint, typecheck, build, validação em navegador

7. **Seção Hero**
   - Docs: `design.md` (Narrativa — Hero), `design-system.md` (Hero)
   - Pendência do Item 6: a Navbar usa hoje `window.innerHeight` como limiar provisório para a transição transparente→sólida (decisão registrada no Item 6, na ausência do Hero). Este item deve substituí-lo pela altura real do elemento Hero, sem mudar a API pública do componente `Navbar`.
   - Recurso: `21st-dev/magic-mcp` só pode ser usado após aprovação do Lead, e somente se houver ganho real de UX (ex.: no indicador de scroll) que shadcn/CSS puro não resolvam adequadamente — nunca como padrão.
   - Verificação em navegador: sim — full-bleed, overlay/contraste, indicador de scroll, `prefers-reduced-motion`, integração da Navbar usando a altura real do Hero (transição transparente→sólida disparando no ponto correto), responsividade (desktop/tablet/mobile), Lighthouse (Performance, Accessibility, Best Practices, SEO).
   - Checklist de saída: lint, typecheck, build, validação em navegador, Lighthouse

8. **Seção Sobre**
   - Docs: `design.md` (Narrativa — Sobre), `design-system.md` (Sobre)
   - Verificação em navegador: sim (layout 2 colunas desktop → empilhado mobile)
   - Checklist de saída: lint, typecheck, build, validação em navegador

9. **Seção Filmografia**
   - Docs: `design.md` (Narrativa — Filmografia), `design-system.md` (Filmografia)
   - Verificação em navegador: sim (colapso para cards em mobile, filtro por tipo acessível via teclado)
   - Checklist de saída: lint, typecheck, build, validação em navegador

10. **Seção Galeria + lightbox + Reel**
    - Docs: `design.md` (Narrativa — Galeria + Reel), `design-system.md` (Galeria, Reel)
    - Recurso: `magic-mcp` pode ser avaliado para a transição do lightbox, se o padrão do `Dialog` shadcn não atingir o nível de polimento esperado — decisão do Lead, não do Implementer
    - Verificação em navegador: sim (grid responsivo 2/3/4 colunas, navegação por teclado no lightbox, foco preso e retornando corretamente, reel lazy-mounted)
    - Checklist de saída: lint, typecheck, build, validação em navegador

11. **Seção Contato**
    - Docs: `design.md` (Narrativa — Contato), `design-system.md` (Contato/Footer)
    - Verificação em navegador: sim (labels acessíveis nos canais)
    - Checklist de saída: lint, typecheck, build, validação em navegador

12. **Assets placeholder** — imagens/gradientes locais para retratos e galeria.
    - Docs: `design.md` (Princípios de imagem)
    - Checklist de saída: lint, typecheck, build (quando aplicável a código de geração dos assets)

13. **Passe de responsividade e acessibilidade** — revisão cruzada de todas as seções contra a checklist de `design-system.md`.
    - Docs: `design-system.md` (Critérios de acessibilidade)
    - Verificação em navegador: sim, nos 3 viewports em todas as seções
    - Checklist de saída: lint, typecheck, build, validação em navegador

14. **Verificação final** — `chrome-devtools-mcp` nos 3 viewports em todo o site + Lighthouse (Performance/Accessibility/Best Practices/SEO, meta 90+).
    - Docs: `product.md` (Critérios de sucesso)
    - Pendência do Item 7 (SEO): Lighthouse do Item 7 apontou SEO 82/100 (desktop e mobile) por duas falhas de infraestrutura geral do site (não específicas de nenhuma seção): sem `<meta name="description">` em `index.html` e sem `public/robots.txt`. Corrigir os dois aqui e repetir o Lighthouse (desktop e mobile) para confirmar SEO 90+.

15. **README.md** — instruções de setup e guia de substituição de conteúdo placeholder por conteúdo real.
    - Docs: `product.md` (Escopo), `design.md` (Estratégia de conteúdo placeholder)

## Viewports de referência para chrome-devtools-mcp

- Mobile: 375×812
- Tablet: 768×1024
- Desktop: 1440×900
