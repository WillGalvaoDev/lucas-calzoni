# Implementation — Lucas Calzoni

Histórico de execução, estado real de cada seção, defeitos corrigidos e pendências. Substitui os antigos `implementation-plan.md` (checklist de construção, integralmente concluída) e `project-status.md` (registro de sprint).

Para **o que** construir, ver [`product.md`](./product.md); para **como**, [`architecture.md`](./architecture.md); para **qual aparência**, [`design.md`](./design.md).

---

# 1. Estado atual

**Todas as seções estão implementadas, validadas e publicadas.** Não há item de construção em aberto — as pendências restantes (seção 6) dependem de conteúdo que o ator ainda não forneceu, não de código.

| Seção | Estado | Paleta |
|---|---|---|
| Navbar | ✅ Completa | Transparente → sólida |
| Hero | ✅ Completa — padrão de referência congelado | Escura |
| Sobre | ✅ Completa — reconstruída como dossiê (carro-chefe) | Clara |
| Trabalhos | ✅ Completa | Clara (`surface`) |
| Galeria + Reel | ✅ Completa | Escura |
| Contato | ✅ Completa | Escura |
| Footer | ✅ Completo | Escura |

---

# 2. Linha do tempo

## 2.1 Sprint 1 — Construção

Scaffold (Vite + React + TS strict + Tailwind v4 + path alias), configuração shadcn/ui, tokens de design, i18n, dados tipados, e depois cada seção em sequência: Navbar/Footer → Hero → Sobre → Trabalhos → Galeria + lightbox + Reel → Contato → assets → passe de responsividade e acessibilidade.

Encerrada em Feature Freeze. A checklist original de 16 itens foi cumprida integralmente e não é mais reproduzida aqui — o que ela produziu está descrito em `design.md` (specs) e `architecture.md` (estrutura).

**Trocas de rota relevantes durante a construção:**

- **"Filmografia" → "Trabalhos"**: a seção foi planejada como tabela com filtro por tipo e colapso para cards em mobile. Virou **lista editorial em accordion, sem filtro** — o ator só tem créditos de teatro e cinema, e um filtro exibiria categorias vazias. Renomeada em todo o projeto (`work.ts`, `Work.tsx`, `#work`).
- **Fraunces/Inter → Newsreader/Manrope**: o par tipográfico original foi substituído no sprint de tipografia, mantendo a mesma arquitetura de tokens.
- **Galeria: grade → palco + miniaturas**: a grade responsiva de 2/3/4 colunas cortava o enquadramento das fotos reais, majoritariamente verticais.

## 2.2 Editorial Polish (pós-freeze)

Rodada de refinamento tipográfico escopada como exceção pontual. **Causa raiz comum das três mudanças aprovadas**: elementos estáticos ao lado de elementos fluidos, fazendo a proporção do sistema variar sozinha entre telas.

- **Hero** — tagline com escala fluida própria (`--text-hero-tagline`) e gap responsivo entre nome e tagline.
- **Trabalhos** — novo token `--text-list-title`, em vez de alargar `--text-h3` (que ficaria dimensionado para outra finalidade).
- **Navbar** — ajuste de tracking no wordmark testado e **revertido** por falta de confirmação visual de ganho.

## 2.3 Refatoração Editorial

Reescrita do arco visual da página em etapas pequenas, revisáveis e reversíveis.

| Etapa | Escopo | Situação |
|---|---|---|
| 0 | Decisões de direção: paleta final, posição do Reel, regra da espinha | ✅ |
| 1 | Documentação | ✅ |
| 2 | Vocabulário compartilhado: cabeçalho de seção + auditoria de containers | ✅ |
| 3 | Galeria — remoção de cantos arredondados, sombras e bordas | ✅ |
| 4 | Contato — espinha, declaração editorial, canais na voz do metadado, paleta escura | ✅ |
| 5 | Sobre — dados como créditos | ✅ |
| 6 | Trabalhos — ano e categoria migram para a voz do metadado | ✅ |
| 7 | Footer — wordmark, paleta escura; Reel reposicionado como encerramento da Galeria | ✅ |
| 8 | QA de contraste, teclado, PT/EN, `prefers-reduced-motion` | ✅ |
| 9 | Densidade do Contato e largura do Reel | ✅ |
| 10 | Sobre — retrato com correção cromática + sangria | ❌ **Revertida** (ver `design.md`, S-01) |
| 11 | Sobre — reconstrução tipográfica sem retrato | ✅ (depois superada pela 12) |
| 12 | **Sobre — reconstrução como dossiê; promoção a carro-chefe** | ✅ |

**Por que essa ordem**: a Etapa 2 estabelece o vocabulário que todas as seguintes consomem. A Etapa 3 vem cedo por ter a melhor relação impacto/risco (remoção de classes, zero mudança estrutural). Contato antes de Sobre porque era a seção com maior distância entre o que era e o que deveria ser.

## 2.4 Sprint 2 — QA final e preparação para deploy

QA executado com Chrome DevTools sobre o **build de produção** (`npm run build` + `npm run preview`), não sobre o dev server.

Correções pré-deploy em 2.4 e detalhes técnicos em 3.

## 2.5 Etapa 12 — Sobre como dossiê

Reconstrução completa a partir do mandato "transformar Sobre no carro-chefe, porque o currículo contém tudo o que interessa ao diretor de elenco".

**Entregue**: token `--text-statement`; contrato de dados da ficha técnica (9 campos, só o existente obrigatório); `src/data/dossier.ts`; hook `src/lib/reveal.ts`; `About.tsx` reconstruído com abertura + bandas pautadas.

**Duas remoções posteriores por decisão de Lead**, com a consequência conceitual resolvida:

- **A legenda catalográfica da placa saiu.** Era o que declarava a fotografia como placa de arquivo por escrito. A leitura documental passou a vir da forma: **a placa virou quadrada**. Efeito colateral desejado — a proporção 4:5 deixava a placa ~160px mais alta que o bloco de texto ao lado, abrindo um vão acidental sob a declaração; o quadrado empata as duas alturas (medido: 84px de diferença, contra ~290px antes).
- **A banda de Repertório saiu inteira.** Confirmou um achado da validação visual: as três linhas do recorte reapareciam idênticas ~600px abaixo, na seção Trabalhos adjacente.

## 2.6 Limpeza e compilação da documentação

- Removidos `src/components/ui/toggle.tsx` e `toggle-group.tsx` — primitivas shadcn instaladas e nunca consumidas. **CSS de produção caiu de 54,76 kB para 51,32 kB.**
- `.impeccable/` (cache local de ferramenta) adicionado ao `.gitignore`.
- Oito arquivos em `docs/` compilados em quatro, com todas as contradições resolvidas contra o código.
- `public/assets/placeholders/` renomeada para `public/assets/images/` — o nome antigo contradizia o conteúdo (fotografias reais, não placeholders).
- `docs/design-references/editorial-v2.png` (1748 kB) comprimido para `.webp` (57 kB) sem redimensionar.

## 2.7 Assinatura do ator — fecho do dossiê

O ator forneceu uma assinatura manuscrita (`lucas-calzoni-signature.png`). Um primeiro arquivo enviado como `lucas-calzoni.svg.svg` acabou sendo outro conceito — um wordmark tipográfico com fundo sólido e três cores fora da paleta — e foi descartado da implementação (permanece na pasta, não referenciado).

**Vetorização**: as ferramentas automáticas disponíveis no ambiente (`vtracer`) travavam com qualquer parâmetro nomeado. Escrito um tracer próprio sobre o **canal alfa** do PNG (o RGB trazia um glow e um fundo embutidos atrás de pixels transparentes): marching squares em nível sub-pixel, simplificação Ramer-Douglas-Peucker, conversão para cúbicas de Bézier via Catmull-Rom. Limiar de alfa (140) e tolerância de simplificação (0.9) escolhidos por medição — o limiar reproduz a área de tinta efetiva do original com 0,4% de desvio. Resultado: 396 nós, 11 subpaths, 14 kB (5,8 kB em gzip) — o PNG original tinha 2035 kB.

**Colocação**: fecho da seção Sobre, alinhada à direita, abaixo do fio de fechamento da última banda — a única outra exceção à grade de duas verticais além do bloco de abertura (que rompe para a esquerda; a assinatura rompe para a direita). Cor `--foreground` (tinta), não `--accent`: a aparição única de acento da seção já é gasta na declaração de abertura, e o registro é o de que assinatura de verdade é tinta, não folha de ouro.

Embutida como componente JSX local em `About.tsx` (não `<img>`), porque precisa herdar `currentColor`. Reveal reaproveita o mesmo hook e os mesmos tokens de toda banda — sem animação de traçado, que seria efeito antes de composição. Ver `docs/design.md`, "Sobre" e princípio 3, para a especificação e a exceção nomeada à regra de duas vozes tipográficas.

---

# 3. Defeitos corrigidos — registro técnico

Cada entrada existe para que a causa não se repita.

## 3.1 Layout e responsividade

**CLS da Galeria.** As imagens do palco e do lightbox não tinham `width`/`height`, colapsando o container para ~2px sob rede lenta. Corrigido armazenando as **dimensões intrínsecas reais de cada fotografia** em `gallery.ts` — não uma proporção única inventada, já que os arquivos têm razões diferentes. Validado sob emulação "Slow 3G": altura estável desde o primeiro frame.

**Scrollbar horizontal indevida na coluna de miniaturas** (≥1024px). Causada por uma combinação que a especificação CSS nunca sustenta: `overflow-x: visible` é forçado a `auto` pelo navegador quando `overflow-y` não é `visible`. Corrigido para `overflow-x: hidden`.

**Scrollbar vertical sobrepondo a borda das miniaturas.** Achado revelado pela correção acima. A largura real da scrollbar é **medida em runtime** e somada à largura do wrapper via `calc()` — nunca assumida como valor fixo, já que varia por navegador/SO e é `0` em scrollbars overlay.

**Conteúdo colando na borda da viewport acima de 1440px.** Container com padding lateral mas sem `mx-auto max-w-[1440px]`. Parece correto até 1440px e quebra acima. **Verificar toda seção nova em 1920px.**

## 3.2 Acessibilidade

**Contraste insuficiente em `.section-dark`.** `--muted-foreground` nunca havia sido redefinido para fundos escuros e herdava o valor calibrado para fundo claro — 3.35:1 sobre `#111110`. Adicionado token explícito `#8F8B83` (5.57:1). Lighthouse Accessibility: **96 → 100**.

**`<html lang="en">` estático incorreto.** Corrigido para `lang="pt"`, preservando o comportamento dinâmico do `I18nProvider`.

## 3.3 Comportamento

**Galeria rolava a página inteira ao carregar.** Um `useEffect` que mantém a miniatura ativa visível chamava `scrollIntoView` também na montagem inicial, não só em mudanças de índice por interação. Corrigido com um guard que ignora a primeira execução.

**Hero com animação em loop.** O indicador de scroll usava `animate-bounce` genérico, fora do vocabulário de motion do site. Passou a participar só da chegada única e ficar estático depois.

**A revelação de Sobre não funcionava.** A rede de segurança de 1200ms disparava **incondicionalmente**, revelando a seção inteira 1,2s após o carregamento, antes de qualquer rolagem. Corrigida para distinguir *observador morto* (revela tudo) de *alvo ainda não alcançado* (continua esperando).

**Conteúdo preso invisível ao carregar num fragmento abaixo da seção** (`/#contact`). O `IntersectionObserver` **não emite notificação quando a razão de interseção vai de 0 a 0** — um salto instantâneo passa despercebido. Severidade real baixa (conteúdo só fica oculto enquanto está fora da tela, e rolar de volta dispara o observador normalmente), mas a condição "já ultrapassado" foi registrada no código. Detalhes em `architecture.md` §6.

## 3.4 Conteúdo e metadados

Meta description desatualizada ("filmografia" → "trabalhos"); comentário desatualizado em `contact.ts` que afirmava que nenhum canal tinha dado real; `README.md` reescrito como documentação de engenharia.

---

# 4. Validações realizadas

| Eixo | Resultado |
|---|---|
| **Build** | `lint`, `typecheck` e `build` de produção limpos em todas as rodadas |
| **Acessibilidade** | Lighthouse Accessibility **100**. Navegação completa por teclado testada (Navbar, wordmark→topo, accordion, lightbox com setas/`Esc`, focus trap e devolução de foco) sem falhas |
| **Console e rede** | Zero mensagens de console e zero requisições 4xx/5xx em todas as interações e larguras |
| **Responsividade** | 320 / 375 / 768 / 1024 / 1440 / 1920 px — sem overflow horizontal, sem crop novo, sem sobreposição |
| **Contraste** | Todos os pares texto/fundo verificados par a par, incluindo estados de foco e hover nas seções escuras |
| **PT/EN** | Alternância validada em todas as seções; nenhuma string literal fora do dicionário |
| **Detector de design** | Sem achados determinísticos em `About.tsx` |

## 4.1 Medições de referência da seção Sobre (1440×900, PT)

Registradas para servirem de linha de base em qualquer alteração futura:

| Medida | Valor |
|---|---|
| Container em 1920px | 233 → 1673 (1440px), idêntico ao da Navbar |
| Fios da pauta | 1440px cada — param na borda do container, nunca da viewport |
| Declaração | 60px, entrelinha 63px, Newsreader. 3 linhas em PT, 2 em EN |
| Fim do texto → fim da placa | 84px de diferença |
| Aparições de acento | Exatamente 1 (`rgb(138,109,78)`) |
| Headings | H2 + 4× H3, sem nível pulado |
| Focáveis | 0 hoje (o CTA de PDF só existe quando o arquivo existir) |
| Altura da seção | ~1570px |

---

# 5. Protocolo para alterações futuras

1. **Ler o doc relevante em `docs/` antes de tocar em código.**
2. Se o doc cobre a decisão → implementar conforme especificado. Se não cobre → **reportar a lacuna ao Lead**, não decidir sozinho.
3. Nunca alterar um doc para encaixar uma implementação já feita. A exceção é uma decisão nova e explícita do Lead, registrada com o raciocínio.
4. Rodar `npm run lint`, `npm run typecheck` e `npm run build` — sem pular etapas.
5. Validar em navegador nos viewports de referência **375×812 / 768×1024 / 1440×900**, mais **1920** para o teste do container.
6. **Se a ferramenta de inspeção de navegador não estiver disponível**, declarar explicitamente que só houve validação estática e pedir confirmação visual. Nunca descrever capturas que não foram tiradas.

---

# 6. Pendências

Nenhuma é falha de implementação. Todas dependem de material do ator ou de decisão de infraestrutura.

## 6.1 Conteúdo

A lista completa e o formato pedido de cada campo estão em [`product.md` §13](./product.md). Resumo: **a ficha técnica do dossiê tem 1 de 10 campos preenchidos** (falta idade cênica, altura, olhos, cabelo, voz, idiomas, base/disponibilidade, DRT e habilidades), além do **PDF do currículo** e de uma **foto de corpo inteiro**.

Enquanto não chegam: campos ausentes não renderizam, a banda de Habilidades não renderiza inteira, e o CTA de PDF não renderiza. Nada quebra e nada aparece pela metade.

## 6.2 Infraestrutura

| Item | Depende de |
|---|---|
| `sitemap.xml` + referência em `robots.txt` | Domínio definitivo |
| Favicon definitivo | Hoje é um `favicon.svg` genérico |
| Revisão do `og-image.png` | Confirmação do ator |

## 6.3 Decisão de design em aberto

**Rótulos empilhados no mobile na seção Sobre.** Abaixo de `sm:`, o rótulo de banda (`FICHA TÉCNICA`) e o rótulo de campo (`NASCIMENTO`) caem um sobre o outro no mesmo estilo de metadado, com 8px entre eles — o `<h3>` não lê como cabeçalho de banda.

*Correção sugerida*: degrau tonal — rótulo de banda em `--foreground`, rótulo de campo em `--muted-foreground`. Resolve em todos os breakpoints sem criar uma terceira voz tipográfica. **Aguardando decisão do Lead.**

---

# 7. Checklist para produção

- [x] Conteúdo real inserido (bio, Trabalhos, contatos, Reel)
- [x] Fotografias finais confirmadas e inseridas
- [x] Traduções PT/EN revisadas
- [x] SEO: `title` e `meta description` finais
- [x] `canonical`
- [x] Open Graph e Twitter Card
- [x] `robots.txt`
- [x] Testes responsivos (375×812 / 768×1024 / 1440×900 / 1920)
- [x] Testes de acessibilidade (teclado, contraste, Lighthouse)
- [x] Auditoria Lighthouse (Performance / Accessibility / Best Practices / SEO)
- [x] Headers de cache e segurança (`vercel.json`)
- [x] `README.md` como documentação de engenharia
- [x] Repositório Git inicializado
- [x] `lint` / `typecheck` / `build` finais limpos
- [x] Deploy
- [ ] `sitemap.xml` *(depende de domínio definitivo)*
- [ ] Favicon definitivo *(depende do ator)*
- [ ] Ficha técnica do dossiê completa *(depende do ator)*
