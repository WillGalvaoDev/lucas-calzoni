# Architecture — Lucas Calzoni

Decisões técnicas, estrutura real do projeto e processo de trabalho. Este documento descreve **como** o site é construído; o **que** ele precisa fazer está em [`product.md`](./product.md), o **porquê visual** em [`design.md`](./design.md), o **histórico de execução** em [`implementation.md`](./implementation.md).

> **Estado deste documento**: reflete a árvore de arquivos e as dependências realmente presentes no repositório. Nada aqui é aspiracional.

---

## 1. Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Build | **Vite 8** | Dev server instantâneo, build enxuto, zero config para SPA |
| UI | **React 19** | `StrictMode` ativo; nenhum recurso de servidor usado |
| Linguagem | **TypeScript** (`strict`) | `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` ligados |
| Estilo | **Tailwind CSS v4** via `@tailwindcss/vite` | Tokens declarados em CSS (`@theme inline`), sem `tailwind.config.ts` |
| Primitivas | **shadcn/ui** sobre o pacote unificado `radix-ui` | Componentes copiados para o repositório, não uma dependência de UI |
| Ícones | **lucide-react** | Já exigido pelas primitivas shadcn |
| Fontes | **@fontsource-variable** (Newsreader, Manrope) | Self-hosted, um arquivo por família cobrindo toda a faixa de peso |

**Deliberadamente ausentes:**

- **Sem `react-router`** — página única, navegação por âncoras com scroll suave. Elimina o maior item do bundle inicial de um SPA típico.
- **Sem biblioteca de i18n** — ver seção 4.
- **Sem biblioteca de animação** — toda animação é CSS/Tailwind ou primitiva Radix já instalada.
- **Sem `tailwind.config.ts` / `postcss.config.js`** — Tailwind v4 lê os tokens do próprio CSS.

## 2. Estrutura de pastas

```
lucas-calzoni/
├── docs/                       # Especificação: product, design, architecture, implementation
│   └── design-references/       # Referência visual usada na direção de arte
├── public/
│   ├── assets/
│   │   ├── og-image.png
│   │   └── images/              # Fotografias reais e definitivas do ator — read-only
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── main.tsx                 # Entry: StrictMode + I18nProvider
│   ├── App.tsx                  # Composição das seções — sem lógica
│   ├── index.css                # Tokens (@theme inline), @keyframes, .section-dark
│   ├── components/
│   │   ├── ui/                  # Primitivas shadcn — button, dialog, sheet, switch
│   │   ├── layout/              # Navbar, Footer, LanguageToggle, ContactChannelItem
│   │   └── sections/            # Hero, About, Work, Gallery, Contact
│   ├── content/
│   │   ├── i18n.tsx             # interface Dictionary + Provider + hook useI18n
│   │   ├── pt.ts
│   │   └── en.ts
│   ├── data/
│   │   ├── types.ts             # BilingualText
│   │   ├── work.ts              # 9 créditos + enum de categorias
│   │   ├── gallery.ts           # 8 fotos (com dimensões intrínsecas) + reel
│   │   ├── contact.ts           # canais com estado defined | pending
│   │   └── dossier.ts           # estado do PDF do currículo (defined | pending)
│   └── lib/
│       ├── utils.ts             # cn()
│       ├── styles.ts            # FOCUS_RING, SECTION_SHELL
│       ├── scroll.ts            # scrollToId, scrollToTop
│       └── reveal.ts            # useReveal — revelação por viewport
├── index.html                   # SEO, Open Graph, Twitter Card, canonical
├── vercel.json                  # Headers de cache e segurança
├── components.json              # Config shadcn/ui
├── eslint.config.js
├── .prettierrc
├── tsconfig.json / .app.json / .node.json
└── package.json
```

**Regra de `src/components/ui/`**: são primitivas shadcn copiadas para o repositório. Editar só o necessário; o acabamento editorial (remoção de cantos, sombras, cromo) é feito **por composição no consumidor**, nunca alterando a primitiva. Componentes shadcn instalados e não usados são removidos — `toggle` e `toggle-group` foram excluídos por esse motivo.

## 3. Composição de componentes

`App.tsx` não tem lógica: monta `Navbar`, um `<main>` com as cinco seções na ordem narrativa, e `Footer`. Toda seção é autossuficiente — lê o dicionário via `useI18n()` e seus próprios dados de `src/data/`.

**Não existem componentes compartilhados de seção.** O que se repete são *strings de classe* em `src/lib/styles.ts`, extraídas por repetição literal (mesma string, mesma responsabilidade), não por semelhança:

| Constante | Responsabilidade |
|---|---|
| `SECTION_SHELL` | Espaçamento vertical/horizontal e cor de texto da casca de seção. **Nunca inclui `bg-*`** — o fundo é o eixo que mais varia entre seções. |
| `FOCUS_RING` | Indicador de foco idêntico em todo elemento interativo customizado. Primitivas shadcn usam seu próprio anel via `box-shadow` e não consomem esta constante. |

## 4. i18n

Context + hook tipado (`useI18n`), com dois dicionários (`pt.ts`, `en.ts`) tipados pela mesma `interface Dictionary`.

**Por que não `react-i18next`**: o conteúdo é estático, pequeno e conhecido em tempo de compilação. Uma biblioteca adicionaria peso e uma camada de indireção sem resolver nenhum problema que este site tenha (sem pluralização complexa, sem interpolação, sem carregamento assíncrono de namespaces).

**O `typecheck` é o guarda-costas da tradução**: adicionar uma chave à `interface Dictionary` quebra `pt.ts` e `en.ts` até os dois estarem completos. Nenhuma chave é marcada opcional para "não quebrar o build" — a opcionalidade só existe onde o **dado ainda não existe** (ficha técnica do dossiê), e nesse caso a chave é omitida por inteiro, nunca preenchida com string vazia.

`I18nProvider` também sincroniza `document.documentElement.lang` com o idioma ativo.

## 5. Dados

Arrays e objetos tipados em `src/data/`, com campos bilíngues via `BilingualText` onde o valor muda de idioma. Isso permite editar conteúdo sem tocar em componentes.

### 5.1 O padrão `defined | pending`

Três recursos do site dependem de material que pode não existir: o reel, os canais de contato e o PDF do currículo. Todos usam a **mesma união discriminada**:

```
{ status: 'defined', ...dados } | { status: 'pending' }
```

Consequência: **um recurso sem dado real não renderiza controle nenhum.** Nada de link quebrado, `<iframe>` apontando para URL fictícia (que geraria uma requisição real e um 404), botão inerte ou elemento oculto por CSS. Trocar `pending` por `defined` é uma linha de dado — nenhum componente muda.

### 5.2 Campo ausente não renderiza

Regra transversal, aplicada em Trabalhos (`role`, `director`, `company`, `venue`, `description`) e na ficha técnica de Sobre: a UI percorre uma ordem declarada de campos e **omite silenciosamente** os ausentes. Nunca rótulo órfão, traço ou "[a definir]" no conteúdo.

### 5.3 Fonte única

`src/data/work.ts` é a única fonte da filmografia. **A seção Sobre não importa nada dele** — um recorte de repertório foi implementado, validado no navegador e removido por duplicar visualmente as primeiras linhas de Trabalhos, seção adjacente.

## 6. Revelação por viewport (`src/lib/reveal.ts`)

Único hook de comportamento do projeto. Usado **apenas pela seção Sobre** (ver a exceção justificada em `design.md`).

- **Um `IntersectionObserver` compartilhado** por todos os alvos, não um por elemento. Registro em `Map<Element, Subscriber>`; o observador é criado no primeiro alvo e destruído quando o último se desinscreve.
- Cada alvo é desinscrito no primeiro cruzamento — a revelação acontece **uma vez por visita** e não re-anima ao sair e voltar.
- `threshold: 0.2`, `rootMargin: '0px 0px -10% 0px'`.
- **Nasce revelado** sob `prefers-reduced-motion: reduce` ou em navegador sem `IntersectionObserver` — decidido na inicialização do estado, não dentro do efeito (setState síncrono em efeito causa render em cascata).
- **Rede de segurança condicional** (1200 ms), que distingue dois motivos para um alvo ainda estar oculto:
  1. *o observador nunca entregou nada* (API morta) → revela incondicionalmente;
  2. *o observador está vivo mas o alvo não cruzou o limiar* → só revela se o alvo já estiver **acima** da viewport.

  A segunda condição existe porque o `IntersectionObserver` **não emite notificação quando a razão de interseção vai de 0 a 0** — um salto instantâneo (carregar a página já num fragmento abaixo da seção) passa despercebido. Sem ela, uma rede de segurança incondicional revelaria a seção inteira ~1s após o carregamento, anulando a revelação.

**Princípio inegociável**: conteúdo nunca depende de animação para existir.

## 7. Tooling

- **TypeScript** em projeto composto (`tsconfig.app.json` para `src/`, `tsconfig.node.json` para `vite.config.ts`), `strict` + `noUnusedLocals` + `noUnusedParameters` + `erasableSyntaxOnly`.
- **ESLint 10** flat config: `js.recommended` + `typescript-eslint` + `react-hooks` + `react-refresh` + `eslint-config-prettier`.
- **Prettier**: sem ponto e vírgula, aspas simples, vírgula final, 80 colunas.
- **Path alias** `@/*` → `src/*`, declarado em `vite.config.ts` e nos `tsconfig`.

**Scripts**: `dev`, `build` (`tsc -b && vite build`), `preview`, `lint`, `typecheck`.

## 8. Performance

- **Sem `react-router`**; code-splitting automático do Vite.
- **Fontes self-hosted variáveis**: um arquivo por família cobre toda a faixa de peso. O `standard.css` do Newsreader inclui o eixo ótico (`opsz`), que dá o ajuste automático entre display grande e texto menor sem CSS extra. O itálico não é importado — não tem consumidor.
- **Imagens**: `loading="lazy"` abaixo da dobra, `decoding="async"`, e `width`/`height` com as **dimensões intrínsecas reais** de cada arquivo (não uma proporção única inventada — as fotos têm razões diferentes). Sem isso o container da Galeria colapsava para ~2px sob rede lenta.
- **Reel**: o `<iframe>` só é montado no DOM após o clique. Nunca no load inicial, nunca autoplay, nunca som automático.
- **Animação restrita a `opacity` e `transform`** (compostas pela GPU). A única exceção é o `filter` da placa de Sobre, em um elemento, apenas sob hover.
- **Headers de cache** (`vercel.json`): `max-age=31536000, immutable` para `/assets/*.{js,css,woff2}` — todos com hash no nome. Imagens não hasheadas ficam deliberadamente fora dessa regra.

## 9. Segurança e publicação

- `vercel.json` aplica `X-Content-Type-Options: nosniff` e `Referrer-Policy: strict-origin-when-cross-origin` a todas as rotas.
- Links externos usam `target="_blank"` + `rel="noopener noreferrer"`.
- Nenhuma chave, token ou dado pessoal em código, commit ou log. `.mcp.json` usa variável de ambiente (`${API_KEY_21ST}`) — manter esse padrão.
- Nenhuma requisição de rede a terceiros no load inicial; o único domínio externo é o YouTube, e só após clique.

## 10. Limitações conhecidas

- **Sem testes automatizados** — não foram solicitados nesta fase. A validação é `lint` + `typecheck` + `build` + inspeção em navegador.
- **A medição de largura da scrollbar** na coluna de miniaturas da Galeria usa APIs de DOM e pressupõe execução client-side. Sem impacto nesta SPA, mas registrado caso a arquitetura mude.
- **`--surface-muted` não tem consumidor** desde que o Footer passou para a paleta escura. Mantido como passo válido da escala de superfícies claras, não removido.

## 11. Processo de trabalho

O projeto é conduzido por dois papéis:

**Lead** (Product Designer + UX Designer + Software Architect)
- Dono de todos os arquivos em `docs/`.
- Toma toda decisão de arquitetura, direção visual e design system.
- Revisa criticamente cada entrega contra `design.md` antes de aprová-la.
- Faz a triagem de achados de navegador: bug vira tarefa de correção; lacuna de design vira atualização de doc **antes** da correção.
- **Não escreve código de implementação.**

**Implementer** (Senior Frontend Implementer)
- Executa item a item, escreve e corrige código, configura ferramentas.
- Se travar numa decisão de design/arquitetura fora do escopo dos docs, **para e escala para o Lead** em vez de improvisar.

**Fluxo docs-first** (regra que governa os dois):

1. Toda tarefa começa lendo o doc relevante.
2. Se o doc cobre a decisão → implementar conforme especificado.
3. Se o doc não cobre → reportar a lacuna; o Lead resolve atualizando o doc.
4. **Nunca alterar um doc para "encaixar" uma implementação já feita** — o doc lidera, o código segue. A exceção é uma decisão nova e explícita do Lead, que é então registrada no doc com o raciocínio.

### Prioridades transversais

Nesta ordem quando houver conflito:

**segurança e privacidade > correção > acessibilidade > simplicidade > manutenibilidade** — acima de qualquer ganho estético ou atalho de conveniência.

### Validação obrigatória

Antes de concluir qualquer alteração: `npm run lint`, `npm run typecheck`, `npm run build`. Nenhuma etapa é pulada para economizar tempo.

Validação visual em navegador nos viewports de referência — **375×812**, **768×1024**, **1440×900**, mais **1920** para confirmar que o container para em `max-w-[1440px]` e não vaza para a borda da viewport.

**Regra de honestidade**: se a ferramenta de inspeção de navegador não estiver disponível na sessão, declarar explicitamente que só houve validação estática (lint/typecheck/build) e pedir confirmação visual. **Nunca descrever capturas de tela que não foram tiradas.**
