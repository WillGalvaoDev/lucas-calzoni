# Architecture — Lucas Calzoni Landing Page

Decisões técnicas, estrutura de projeto e o processo de trabalho entre os dois papéis do projeto. Este documento é a referência do Implementer para *como* construir o que `product.md`/`design.md`/`design-system.md` especificam.

## Stack

- Vite + React + TypeScript (`strict: true`)
- Tailwind CSS + shadcn/ui
- Sem react-router — site de página única, navegação por âncoras com scroll suave
- Sem biblioteca de i18n externa (ver seção i18n abaixo)

## Estrutura de pastas

```
lucas-calzoni/
├── docs/                      # este diretório — fonte da verdade de produto/design/arquitetura
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
├── components.json            # config shadcn/ui
├── public/
│   └── favicon, placeholders estáticos
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css               # tokens Tailwind + import de fontes
    ├── components/
    │   ├── ui/                 # gerado via shadcn-ui-mcp-server — não editar à mão além do necessário
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   └── LanguageToggle.tsx
    │   └── sections/
    │       ├── Hero.tsx
    │       ├── About.tsx
    │       ├── Filmography.tsx
    │       ├── Gallery.tsx
    │       └── Contact.tsx
    ├── content/
    │   ├── i18n.tsx            # tipo do dicionário + Context/Provider + hook useI18n
    │   ├── pt.ts
    │   └── en.ts
    ├── data/
    │   ├── filmography.ts      # dados tipados (placeholder)
    │   └── gallery.ts          # dados tipados (placeholder)
    ├── lib/
    │   └── utils.ts            # cn() helper (padrão shadcn)
    └── assets/
        └── placeholders/
```

## i18n

Context + hook tipado (`useI18n`), com dois dicionários (`pt.ts`, `en.ts`) tipados pela mesma `interface Dictionary`. Justificativa: conteúdo estático e pequeno — uma biblioteca como `react-i18next` adicionaria peso/complexidade desnecessários para este escopo. `useI18n()` também expõe o idioma atual para atualizar `document.documentElement.lang`.

## Dados

Arrays tipados em `src/data/` (`filmography.ts`, `gallery.ts`), com campos bilíngues onde fizer sentido (ex.: `role: { pt: string; en: string }`). Isso permite editar conteúdo sem tocar em componentes — alinhado ao critério de manutenibilidade de `product.md`.

## Tooling

- TypeScript em modo `strict`.
- ESLint + Prettier configurados para React/TS.
- Path alias `@/*` apontando para `src/*` (padrão shadcn/ui).
- Scripts em `package.json`: `dev`, `build`, `preview`, `lint`.

## Performance

- Code-splitting automático do Vite; ausência de react-router já reduz o bundle inicial.
- Imagens abaixo da dobra com `loading="lazy"` e `width`/`height` explícitos (evita layout shift).
- Fontes self-hosted via `@fontsource-variable` (um arquivo por família cobrindo toda a faixa de peso, em vez de um arquivo estático por peso) com `font-display: swap`.
- Reel como `<iframe>` lazy-mounted (só após clique do usuário).
- Meta tags básicas (title, description, Open Graph) para SEO/compartilhamento.

## Processo de trabalho: papéis e delegação

**Lead** (Product Designer + UX Designer + Software Architect) — modelo mais capaz, conduzido na conversa principal:
- Dono de todos os arquivos em `docs/`.
- Toma toda decisão de arquitetura, direção visual e design system.
- Revisa criticamente cada entrega do Implementer contra `design-system.md` e as Web Design Guidelines antes de marcar um item do `implementation-plan.md` como concluído.
- Decide quando um componente justifica `21st-dev/magic-mcp` (uso seletivo, nunca padrão).
- Faz a triagem dos achados do `chrome-devtools-mcp`: bug visual/responsivo vira tarefa de correção para o Implementer; um problema que revela lacuna no design system é resolvido pelo próprio Lead atualizando `design-system.md` antes de pedir a correção.
- **Não escreve código de implementação.**

**Implementer** (Senior Frontend Implementer) — modelo secundário, delegado via `Agent` tool com `model` explícito (mais leve que o Lead), `subagent_type: general-purpose`:
- Executa `implementation-plan.md` item por item.
- Escreve/edita código, configura ferramentas.
- Usa `jpisnice/shadcn-ui-mcp-server` como padrão para componentes base/estruturais.
- Usa `21st-dev/magic-mcp` **apenas** quando o item do `implementation-plan.md` explicitamente instruir (ex.: uma microinteração específica do Hero).
- Roda `chrome-devtools-mcp` ao final de cada etapa relevante, nos três viewports abaixo, e corrige o que encontrar antes de reportar a tarefa como concluída.
- Se uma tarefa exigir uma decisão de design/arquitetura não coberta pelos docs, **para e reporta ao Lead** em vez de decidir sozinho.

Mecânica nesta sessão: cada item do `implementation-plan.md` vira uma chamada do `Agent` tool (`model: sonnet`) com prompt autocontido referenciando as seções relevantes de `docs/`. O Lead nunca chama `Edit`/`Write` de código de produto diretamente durante a fase de implementação.

## Verificação em navegador (chrome-devtools-mcp)

Após cada etapa relevante do `implementation-plan.md`, inspecionar a página real (não só o código) nos três viewports:
- Mobile: 375×812
- Tablet: 768×1024
- Desktop: 1440×900

Checar: layout sem quebras, contraste, estados de foco/hover, comportamento do menu/lightbox/filtro, ausência de scroll horizontal indesejado.

## Pré-requisitos de ferramentas (MCP/plugins)

Os seguintes recursos precisam estar conectados à sessão antes do início da fase de implementação:
- `jpisnice/shadcn-ui-mcp-server`
- `21st-dev/magic-mcp`
- `chrome-devtools-mcp`
- Plugin `claude-code/plugins/frontend-design`

Nenhum destes estava conectado no momento em que este documento foi escrito — confirmar a conexão é o primeiro passo prático antes de delegar qualquer item do `implementation-plan.md` ao Implementer.
