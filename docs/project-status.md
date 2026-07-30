# Project Status — Sprint 1 (Feature Freeze)

Registro oficial do estado aprovado do projeto ao final da Sprint 1. Este documento reflete apenas o que já foi implementado e aprovado — não contém ideias futuras nem sugestões de melhoria. A partir deste ponto o projeto entra em Feature Freeze: nenhuma mudança estrutural, de arquitetura, UX, direção de arte, tipografia, motion ou responsividade deve ser proposta ou aplicada sem aprovação explícita de uma nova sprint.

# Projeto

- **Objetivo do site**: landing page de página única para o ator Lucas Calzoni, apresentando-o profissionalmente para diretores de elenco, produtoras, agências e público em geral, com identidade cinematográfica/editorial.
- **Stack utilizada**: React 19 + Vite + TypeScript (`strict`) + Tailwind CSS v4 + shadcn/ui (via pacote unificado `radix-ui`). Sem `react-router` — navegação por âncoras com scroll suave. i18n PT/EN via Context/hook próprio (`useI18n`), sem biblioteca externa.
- **Arquitetura geral**: `src/components/ui` (primitivas shadcn: button, dialog, sheet, switch, toggle/toggle-group), `src/components/layout` (Navbar, Footer, LanguageToggle, ContactChannelItem), `src/components/sections` (Hero, About, Work, Gallery, Contact), `src/content` (i18n.tsx, pt.ts, en.ts), `src/data` (types.ts, work.ts, gallery.ts, contact.ts — dados tipados, bilíngues onde aplicável), `src/lib/utils.ts` (`cn()`), `src/index.css` (tokens de cor/tipografia/motion). Documentação de especificação em `docs/` (product, design, design-system, architecture).

# Funcionalidades implementadas

- **Navbar**: fixa; transparente sobre o Hero, transiciona para sólida ao sair dele usando medição ao vivo (`getBoundingClientRect`, sem alturas fixas/hardcoded); menu mobile via `Sheet`; toggle de idioma PT/EN (`Switch` com estados `data-state` corretos e contraste adequado); links âncora para Sobre/Trabalhos/Galeria/Contato.
- **Hero**: retrato full-bleed com overlay, nome (H1) e tagline; chegada única animada ao carregar (fade + deslocamento sutil, nome → tagline → indicador de scroll, escalonados); nenhum elemento permanece animado depois — sem zoom contínuo, parallax ou loop; indicador de scroll estático após a chegada.
- **Sobre**: bio + lista de dados rápidos (`dl`) + retrato secundário.
- **Trabalhos**: lista editorial vertical em accordion (Radix `Accordion`, sem lib nova) — estado fechado mostra ano/título/categoria; estado expandido revela só os campos existentes (papel, direção, companhia, local, descrição, imagem); só um item aberto por vez; revelação em "cortina" (`clip-path` + altura animada via `--radix-accordion-content-height`); dataset tipado para as categorias Teatro/Cinema/TV/Publicidade/Voz, sem filtro nem categoria vazia visível.
- **Galeria**: palco editorial (imagem principal grande, `object-contain`, nunca corta) + navegação por miniaturas (coluna vertical no desktop, faixa horizontal no mobile, `object-cover`, `thumbnailPosition` opcional, indicação da ativa por opacidade/borda/`aria-current`, auto-scroll para a miniatura ativa) + setas anterior/próxima + contador discreto + lightbox de tela cheia (`Dialog` do shadcn reaproveitado — focus trap, `Esc`, devolução de foco — sincronizado com o palco). Showreel com estado `defined`/`pending`: o `<iframe>` só monta após clique do usuário, nunca aponta para URL fictícia.
- **Contato/Footer**: lista de canais com estado `defined`/`pending` (nunca renderiza link para dado inexistente); link "voltar ao topo".
- **i18n**: dicionário PT/EN completo e tipado para todo o conteúdo textual do site.
- **Tokens de design**: cores, tipografia e motion centralizados em `src/index.css`, documentados em `docs/design-system.md`.

# Decisões de UX

- Hero permanece essencialmente estática — a fotografia nunca é animada; movimento existe só como chegada única do conteúdo, nunca como decoração contínua.
- Trabalhos usa lista/accordion editorial em vez de tabela com filtro — elimina categorias vazias (o ator só tem trabalhos de teatro registrados até o momento).
- Galeria usa palco + miniaturas em vez de grade fixa — necessário porque as fotografias reais são majoritariamente verticais e a grade anterior cortava enquadramento.
- `object-contain` obrigatório na imagem principal da Galeria (palco e lightbox) — nenhuma fotografia pode ser cortada; `object-cover` só é aceitável em miniaturas, que são puramente navegação.
- Lightbox preservado (não substituído por uma solução manual) — o `Dialog` do shadcn já resolve foco/teclado/acessibilidade corretamente.
- Navbar minimalista, com estado calculado a partir de geometria real da página (nunca de números fixos), robusta a navegação por âncora e a diferenças de conteúdo entre idiomas.
- Conteúdo ainda não definido é representado por um estado `pending` explícito (Showreel, canais de contato) — nunca por um link quebrado, elemento oculto ou dado fictício.

# Decisões de direção de arte

- Identidade cinematográfica/editorial minimalista, com alternância deliberada entre seções claras (Sobre, Trabalhos, Contato) e escuras (Hero, Galeria) — sem gradientes decorativos, sem cores novas além da paleta documentada.
- Tipografia: **Newsreader Variable** (display/títulos) + **Manrope Variable** (interface/corpo), self-hosted via `@fontsource-variable`. Peso 500 nos títulos; itálico do Newsreader disponível como recurso opcional, nunca padrão de nenhum elemento.
- Linguagem de motion única para todo o site: mesmos tokens de duração/easing (`--motion-duration`, `--motion-duration-fast`, `--motion-ease`) reaproveitados em Trabalhos, Galeria e Hero; a Hero usa uma duração própria mais lenta (1000ms) por ser um evento único por visita, não repetido por interação. Toda animação existe para revelar conteúdo ou dar feedback — nunca decorativa/contínua; `prefers-reduced-motion` sempre respeitado.
- Princípios visuais: tipografia como protagonista, espaço em branco generoso, grid de 12 colunas, imagens sempre com enquadramento integral preservado (nunca corta cabeça/braços/corpo).

# Decisões técnicas

- Fontes via `@fontsource-variable` (um arquivo por família cobrindo toda a faixa de peso, incluindo o eixo ótico do Newsreader) em vez de múltiplos arquivos estáticos por peso — menos requisições e, no total, payload líquido menor que o par de fontes anterior (Fraunces/Inter), apesar do Newsreader isoladamente ser mais pesado por incluir o eixo ótico.
- Hero sem loops: o indicador de scroll deixou de usar animação contínua (`animate-bounce` genérico) — participa só da chegada única e depois fica estático.
- Bug corrigido: um `useEffect` da Galeria que mantém a miniatura ativa visível chamava `scrollIntoView` também na montagem inicial (não só em mudanças de índice por interação), o que rolava a página inteira até a Galeria em qualquer largura abaixo do breakpoint `lg`. Corrigido com um guard que ignora a primeira execução.
- Acessibilidade: `aria-expanded`/`aria-controls` via Radix (Trabalhos), `aria-current` na miniatura ativa (Galeria), foco visível em todo elemento interativo customizado, focus trap + devolução de foco no lightbox, `scroll-mt-16` nas seções (evita conteúdo escondido atrás da Navbar fixa), `alt` descritivo em todas as imagens, `lang` do documento atualizado dinamicamente com o idioma ativo.
- Performance: imagens abaixo da dobra com `loading="lazy"` e dimensões explícitas; `<iframe>` do reel só montado após clique; sem `react-router`; sem dependências de animação externas (toda animação é CSS/Tailwind + primitivas Radix já instaladas).
- Nenhuma dependência nova foi instalada além dos pacotes de fonte (`@fontsource-variable/newsreader`, `@fontsource-variable/manrope`), que substituíram os pacotes estáticos anteriores.

# Limitações conhecidas

- O projeto **não é um repositório Git** no momento (`git status` retorna "not a git repository").
- `chrome-devtools-mcp` esteve indisponível durante toda a Sprint 1 — nenhuma validação visual automatizada foi realizada; toda validação visual foi feita manualmente pelo usuário no `npm run preview`.
- `README.md` (linha 3) ainda menciona "filmografia" na descrição do site — não foi atualizado para "Trabalhos" após o rename da seção. Não corrigido ainda (fora do escopo desta sprint).
- Não há testes automatizados (unitários ou end-to-end) — não foram solicitados nem implementados nesta fase.
- Não há tags Open Graph (`og:title`, `og:image`, etc.) nem `sitemap.xml` em `index.html`/`public/` — só `<meta name="description">` básica e `robots.txt` (`User-agent: * / Allow: /`, sem `Sitemap:`).
- Os arquivos de imagem em `public/assets/placeholders/` foram descritos em instruções anteriores do usuário como fotografias reais e definitivas do ator — mas o nome da pasta e os comentários no código (`gallery.ts`, `Reel`) ainda os tratam como placeholder. Essa nomenclatura não foi resolvida.

# Pendências

- Confirmar se as fotografias em `public/assets/placeholders/` são as definitivas ou serão substituídas (ver "Limitações conhecidas" acima).
- Preencher a biografia real em `src/content/pt.ts`/`en.ts` (`about.bio`, `quickFacts` — hoje com `[a definir]`/`[to be defined]`).
- Preencher os Trabalhos reais em `src/data/work.ts` (hoje só 2 registros de teatro com títulos placeholder: "Peça Exemplo I/II").
- Confirmar ou substituir o Showreel definitivo em `src/data/gallery.ts` (`reel.embedUrl` já aponta para um vídeo real do YouTube, mas não confirmado como o reel definitivo do ator).
- Atualizar os canais de contato reais em `src/data/contact.ts` (hoje todos `status: 'pending'`: e-mail, Instagram, empresário/agência).
- Revisar as traduções PT/EN com o conteúdo definitivo (a estrutura já existe; falta o conteúdo real).
- Atualizar SEO com conteúdo definitivo: `<title>`/`<meta description>` finais, tags Open Graph, `sitemap.xml`.
- Gerar e inserir a imagem Open Graph definitiva.
- Corrigir a menção desatualizada a "filmografia" no `README.md`.
- Decidir se um repositório Git será inicializado antes do deploy.

# Checklist para Produção

- [ ] Conteúdo final inserido (bio, Trabalhos, contatos, Showreel)
- [ ] Fotografias finais confirmadas/inseridas
- [ ] Traduções PT/EN revisadas com o conteúdo definitivo
- [ ] SEO revisado (`title`/`description` finais)
- [ ] Tags Open Graph adicionadas
- [ ] Imagem Open Graph definitiva gerada
- [ ] `sitemap.xml` criado e referenciado em `robots.txt`
- [ ] `robots.txt` revisado para produção
- [ ] Favicon revisado (hoje `favicon.svg` genérico)
- [ ] Testes responsivos (375×812 / 768×1024 / 1440×900)
- [ ] Testes de acessibilidade (navegação por teclado, leitor de tela, contraste)
- [ ] Auditoria Lighthouse (Performance/Accessibility/Best Practices/SEO)
- [ ] `README.md` atualizado (remover menção a "filmografia")
- [ ] `npm run lint` / `npm run typecheck` / `npm run build` finais limpos
- [ ] Repositório Git inicializado (decisão pendente)
- [ ] Deploy

# Editorial Polish (Post-Freeze)

Registro de uma rodada de refinamento tipográfico/visual realizada **depois** do encerramento oficial da Sprint 1. Não reabre a Sprint 1 nem altera seu status — o Feature Freeze continua valendo para qualquer proposta de layout estrutural, novos componentes, novas animações ou mudança de paleta. Esta rodada foi escopada e aprovada explicitamente como exceção pontual de direção de arte, não como retomada de desenvolvimento de funcionalidades.

**Motivação**: revisão crítica do sistema tipográfico/hierárquico da página (Hero, Sobre, Trabalhos, Navbar), levantando hipóteses técnicas sobre proporção, escaneabilidade e consistência de escala — não uma busca por "ficar mais bonito", mas por inconsistências reais entre um sistema de tipografia fluida (`clamp()`) e valores fixos que não acompanhavam essa fluidez.

**Decisões implementadas**:
- **Hero** — tagline com escala fluida própria (`--text-hero-tagline`) e gap responsivo (`gap-4 sm:gap-5 lg:gap-6`) entre nome e tagline.
- **Sobre** — refinamento tipográfico isolado do campo "Formação" (`text-sm leading-relaxed`), sem alterar estrutura/conteúdo.
- **Trabalhos** — novo token `--text-list-title`, dedicado ao título de item de lista editorial, substituindo o uso de `--text-h3` (mantido intacto e reservado para uso genérico futuro).
- **Navbar** — ajuste de tracking no wordmark testado e **revertido**: sem confirmação visual de ganho perceptível (nenhuma ferramenta de inspeção de navegador disponível na sessão), aplicada a regra de fallback definida na aprovação — Navbar permanece exatamente como estava antes desta rodada.

**Rationale resumido**: a causa raiz comum das três mudanças aprovadas é a mesma — elementos estáticos (tagline em breakpoints fixos, gap fixo, título em `--text-h3` com curva achatada abaixo de 1200px) ao lado de elementos fluidos (`--text-h1`, viewport), fazendo a proporção do sistema variar sozinha entre telas em vez de se manter coerente. Rationale completo, com "por quê" e regras de prevenção de regressão futura, em `docs/design-system.md` (seções "Tipografia", "Hero", "Sobre", "Navbar" em "Componentes e specs").

**Impacto esperado**: hierarquia mais forte entre ano/título/categoria em Trabalhos; proporção Hero mantida entre mobile e desktop (hoje ~2.5x–3.6x, antes chegava a ~4.4x); escaneabilidade melhorada no bloco "Formação" de Sobre; Navbar visualmente idêntica à sua última versão aprovada.

**Confirmação**: nenhuma funcionalidade nova foi adicionada, nenhum layout estrutural foi alterado, nenhum componente novo foi criado, nenhuma animação nova foi introduzida, a paleta aprovada não mudou, e nenhum arquivo em `public/assets/` foi tocado. `lint`, `typecheck` e `build` executados limpos após a consolidação.

# Sprint 2 — QA Final e Preparação para Deploy (Concluída)

QA final de produção executado com Chrome DevTools MCP sobre o **build de produção** (`npm run build` + `npm run preview`), não sobre `npm run dev`. Objetivo: encontrar apenas problemas reais (funcionais, visuais, acessibilidade, console/rede, SEO técnico, performance) antes do deploy — sem redesign nem refatorações opcionais.

**Correções pré-deploy implementadas**:
- **CLS da Galeria**: imagem do palco principal e do lightbox não tinham `width`/`height`, colapsando o container para ~2px sob rede lenta antes do carregamento. Corrigido armazenando as dimensões intrínsecas reais de cada fotografia (`src/data/gallery.ts` — não uma proporção única inventada; os arquivos têm aspect ratios diferentes) e repassando-as às duas tags `<img>`. Validado sob emulação "Slow 3G": altura estável (~560px) desde o primeiro frame, sem colapso.
- **Scrollbar horizontal indevida na coluna de miniaturas** (≥1024px): causada por uma combinação de `overflow-x`/`overflow-y` que a especificação CSS nunca sustenta como escrita (`overflow-x:visible` é forçado a `auto` pelo navegador quando `overflow-y` não é `visible`). Corrigido trocando para `overflow-x:hidden` (combinação válida com `overflow-y:auto`).
- **Sobreposição da scrollbar vertical sobre a borda das miniaturas**: achado adicional revelado após a correção acima. A largura real da scrollbar (medida em runtime, nunca assumida como valor fixo) é somada à largura do wrapper da coluna via `calc()`, preservando o tamanho visual das miniaturas (96px, inalterado) e eliminando a sobreposição.
- **Contraste insuficiente em `.section-dark`**: `--muted-foreground` nunca havia sido redefinido para fundos escuros (herdava o valor calibrado para fundo claro, 3.35:1 sobre `#111110`). Adicionado token explícito `#8F8B83` (5.57:1 sobre `#111110`), documentado em `docs/design-system.md`.
- **`<html lang="en">` estático incorreto**: corrigido para `lang="pt"` (idioma padrão real da aplicação); comportamento dinâmico do `I18nProvider` ao trocar idioma preservado e validado.
- **Meta description desatualizada** ("filmografia" → "trabalhos").
- **Comentário desatualizado em `src/data/contact.ts`** (dizia que nenhum canal tinha dado real; os 3 já estão `defined`).

**Resultados de validação**:
- **Acessibilidade**: Lighthouse Accessibility **96 → 100** após a correção de contraste; navegação completa por teclado testada (Navbar, wordmark→topo, accordion de Trabalhos, lightbox com `ArrowLeft`/`ArrowRight`/`Esc`, focus trap e devolução de foco) sem falhas.
- **Console e rede**: zero mensagens de console e zero requisições 4xx/5xx em todas as interações testadas, em todas as larguras.
- **Responsividade**: testado em 320px, 375px, 768px, 1024px e 1440px — sem overflow horizontal, sem crop novo, sem sobreposição, layouts mobile/tablet preservados.
- **Build**: `lint --max-warnings 0`, `typecheck` e `build` de produção limpos em todas as rodadas de correção.

**Pendências intencionais** (dependem de domínio definitivo ou de conteúdo/ativos ainda não fornecidos — **não são falhas de implementação**, são decisões corretas de não inventar informação):
- `canonical`
- Open Graph
- Twitter Card
- `sitemap.xml`
- referência de `Sitemap:` em `robots.txt`
- eventual substituição de favicon, fotos da Galeria ou Reel, caso ainda não sejam as versões definitivas do ator

**Nota técnica**: a medição de largura da scrollbar (correção da coluna de miniaturas) usa APIs de DOM e pressupõe execução client-side — não funciona em SSR. Sem impacto nesta aplicação, que é uma SPA 100% client-side, mas registrado para referência caso a arquitetura mude no futuro.

**Status**: Sprint 2 concluída. **GO aprovado para deploy** — ver `docs/product.md`/histórico de sessão para o registro de aprovação.
