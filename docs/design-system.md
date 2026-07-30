# Design System — Lucas Calzoni Landing Page

Tokens e specs concretos. Objetivo: o Implementer não deveria precisar tomar nenhuma decisão visual não coberta aqui. Se um caso não estiver previsto, a tarefa para e volta para o Lead — não decidir por conta própria.

## Cores

Modo claro (seções padrão: Sobre, Trabalhos, Contato):
| Token | Hex | Uso |
|---|---|---|
| `background` | `#FAF9F6` | Fundo de seção |
| `foreground` | `#171614` | Texto principal |
| `muted` | `#6B675F` | Texto secundário/legendas |
| `border` | `#E4E1DA` | Divisores, bordas sutis |
| `accent` | `#8A6D4E` | Links, hover, foco, estado ativo, sublinhados — uso esparso, nunca como cor de fundo grande |

Modo escuro (seções cinematográficas: Hero, Galeria):
| Token | Hex | Uso |
|---|---|---|
| `background-dark` | `#111110` | Fundo de seção |
| `foreground-dark` | `#FAF9F6` | Texto principal |
| `muted-foreground-dark` | `#8F8B83` | Texto secundário/legendas em fundo escuro (ex.: contador da Galeria) — contraste de **5.57:1** sobre `#111110` (mínimo AA exigido: 4.5:1). Corrigido no QA final: o valor claro (`#6B675F`, calibrado só para `#FAF9F6`) nunca havia sido redefinido para `.section-dark` e media 3.35:1 sobre fundo escuro. Mesmo matiz neutro-quente da paleta, sem cor nova. |
| `accent` | `#8A6D4E` | Mesmo acento, mantém identidade entre seções |

Não introduzir novas cores. Não usar gradientes decorativos. Overlays sobre imagens (para contraste de texto no Hero) usam preto a 30–50% de opacidade, nunca cor do acento.

## Superfícies

Profundidade e hierarquia entre as seções claras são criadas **apenas** por passos de luminosidade dentro do mesmo matiz de `background`/`border` — nunca por cor nova, gradiente, vinheta, textura ou sombra decorativa.

| Token | Hex | Uso |
|---|---|---|
| `surface` | `#F3F1EB` | Primeiro passo de profundidade (Trabalhos) |
| `surface-muted` | `#ECE9E2` | Segundo passo, mais recolhido (Footer) |

Atribuição por seção (ritmo: `background` → `surface` → *[Galeria escura interrompe]* → `background` → `surface-muted`):
- **Sobre**: `background` — âncora/tom-base logo após a Hero.
- **Trabalhos**: `surface`, com um divisor `border-t border-border` no topo da seção — primeira fronteira visual entre Sobre e Trabalhos.
- **Galeria**: inalterada (`.section-dark`), fora do escopo desta convenção.
- **Contato**: `background` — reset de ritmo após a quebra forte da Galeria escura.
- **Footer**: `surface-muted`, reforçando o `border-t` já existente como limite com o Contato.

Contraste de texto verificado (WCAG AA, mínimo 4.5:1): `foreground` sobre `surface-muted` = 14.9:1; `muted-foreground` sobre `surface-muted` = 4.64:1 (passa, mas com margem pequena — preferir `foreground` para qualquer texto novo sobre `surface-muted` em vez de `muted-foreground`).

## Tipografia

Direção "Cinematográfico Contemporâneo" — sprint de tipografia (ver histórico da sessão). Substitui o par Fraunces/Inter mantendo a mesma arquitetura de tokens (`--font-display`/`--font-sans`, escala `--text-h1/h2/h3` em `@theme inline`).

- **Display/headlines**: "Newsreader" (serifada literária, variável — eixo de peso + eixo ótico), self-hosted via `@fontsource-variable/newsreader` (build `standard.css`, que inclui o eixo ótico automático além do peso — ver "Performance" abaixo). Nome de família registrado: `'Newsreader Variable'`. Peso: **500** para H1/H2/H3 (a família não usa 600 — fica pesada demais para o tom literário pretendido).
- **Itálico**: recurso tipográfico **opcional**, nunca padrão de nenhum elemento (a tagline do Hero usa estilo normal). Se um uso pontual for aprovado no futuro (ex. uma citação de imprensa), importar `@fontsource-variable/newsreader/standard-italic.css` só nesse momento — não pré-carregado hoje, para não pagar peso de download por um eixo sem uso atual.
- **Corpo/UI**: "Manrope" (grotesca contemporânea, variável — eixo de peso), self-hosted via `@fontsource-variable/manrope`. Nome de família registrado: `'Manrope Variable'`. Pesos: 400 (corpo/UI padrão), 500 (labels/botões, já em uso), 600 (ênfase pontual, reservado — nenhum uso atual exige).
- Escala fluida com `clamp()`, referência:
  - H1 (Hero): `clamp(2.5rem, 5.5vw, 5rem)` (teto reduzido em relação ao par anterior — Newsreader tem x-height maior, pesa mais visualmente no mesmo tamanho)
  - H2 (título de seção): `clamp(1.75rem, 3.5vw, 3rem)` (inalterado)
  - H3 (subtítulo/nome de item): `clamp(1.125rem, 1.5vw, 1.5rem)` (inalterado)
  - Corpo (parágrafos de prosa — bio, tagline, descrição de Trabalhos): `1rem`–`1.125rem`
  - Legenda/meta: `0.875rem` (inalterado)
  - **Tagline da Hero** (`--text-hero-tagline`): `clamp(1rem, 1.9vw, 1.375rem)`.
    **Por quê**: antes, a tagline usava dois valores fixos (`text-base`/`sm:text-lg`, 16px→18px), enquanto o H1 acima dela é fluido (`clamp` + `vw`). Isso fazia a *razão* H1:tagline mudar sozinha conforme a viewport crescia — ~2.5x em mobile (proporção editorial saudável entre título e deque) até ~4.4x em desktop grande (a tagline "encolhia" relativamente sem nenhuma mudança de valor nela mesma, só porque o H1 continuava crescendo e ela não). O risco de regressão a evitar no futuro: **qualquer elemento que acompanhe visualmente um título fluido (`--text-h1`/`--text-h2`) precisa ou ser fluido também, ou ter sua proporção verificada explicitamente em pelo menos 2-3 larguras de viewport** — um valor fixo ao lado de um `clamp()` é uma armadilha silenciosa, porque parece correto em mobile (onde foi provavelmente calibrado) e só quebra em telas maiores.
  - **Título de item de lista editorial** (`--text-list-title`, hoje só Trabalhos): `clamp(1.25rem, 2.2vw, 1.75rem)`.
    **Por quê**: o candidato óbvio era alargar `--text-h3` (o token que o título já usava). Investigação mostrou que `--text-h3` (`clamp(1.125rem, 1.5vw, 1.5rem)`) fica **achatado em 18px abaixo de 1200px de largura de viewport** — ou seja, na prática, em quase todo mobile/tablet/desktop comum, o "H3" nunca chega a ser maior que o próprio corpo de texto (`sm:text-lg` também é 18px), comprometendo a leitura rápida ano/título/categoria que a seção depende. A correção certa **não** era alargar `--text-h3` diretamente: esse token é a rubrica genérica de subtítulo da escala H1>H2>H3, hoje sem nenhum outro consumidor no código, mas reservada para qualquer subtítulo futuro fora de uma lista — alargá-la para resolver um problema específico de Trabalhos faria qualquer subtítulo genérico futuro herdar uma curva dimensionada para outra finalidade (título de linha competindo com metadados), sem ter pedido isso. **Regra a preservar**: um título que existe para ser o elemento dominante de uma linha de lista/tabela editorial (compete com metadados ao lado) é um papel tipográfico diferente de um subtítulo de prosa — mesmo que hoje só exista um caso de cada, eles não devem compartilhar token só porque coincidem em valor. Antes de reaproveitar `--text-h3` em qualquer novo lugar, confirmar que o papel é realmente "subtítulo de seção", não "título de item de lista" — nesse segundo caso, usar (ou estender) `--text-list-title`.
- Line-height: 1.15 em H1, 1.2 em H2/H3 (Newsreader pede um pouco mais de espaço vertical que a família anterior); ~1.65 em parágrafos de prosa — aplicado só nesses parágrafos (`leading-[1.65]`), não em elementos de UI/rótulo que também usam `text-base`/`text-sm`/`text-lg` (botões, nav, badges), para não alterar o ritmo vertical desses componentes.
- Letter-spacing: `-0.015em` em H1/H2 (levemente menos negativo que antes); `0.005em` em parágrafos de prosa (mesmo critério de escopo do line-height acima); normal em UI/rótulos.

## Espaçamento e grid

- Grid de 12 colunas, `max-width` de conteúdo: `1440px`, com padding lateral responsivo (`1.5rem` mobile, `2.5rem` tablet, `4rem` desktop).
- Breakpoints: `mobile <640px`, `tablet 640–1024px`, `desktop >1024px`.
- Padding vertical entre seções: `4rem` mobile, `6rem` tablet, `8rem` desktop (usar consistentemente em todas as seções, não variar arbitrariamente).

## Componentes e specs

**Navbar**
- Transparente (texto claro) sobre o Hero; ao rolar além da altura do Hero, transiciona para `background` sólido + `border-bottom` de 1px `border`, texto passa a `foreground`.
- Toggle de idioma: switch de dois estados (PT/EN), `aria-label` descrevendo o idioma atual e a ação ("Mudar para inglês"/"Switch to Portuguese").
- Links âncora: Sobre, Trabalhos, Galeria, Contato — scroll suave, sem mudança de URL/hash necessária.
- Wordmark ("Lucas Calzoni"): testado no Editorial Polish (Post-Freeze) um `tracking-[0.02em]` para dar mais presença editorial sem alterar tamanho/altura — revertido por falta de confirmação visual de ganho perceptível (nenhuma ferramenta de inspeção de navegador disponível na sessão). **Regra a preservar**: qualquer pedido futuro de "dar mais presença" à Navbar deve ser resolvido por tipografia (peso, tracking, cor) antes de se cogitar tamanho/altura — aumentar a Navbar em si é uma mudança estrutural que precisa voltar para uma decisão de Lead, não um microajuste de polish.

**Hero**
- Imagem de retrato full-bleed (cover), overlay escuro sutil para contraste — a fotografia em si nunca é animada (sem zoom contínuo/Ken Burns, sem parallax): ela é o "frame" fixo sobre o qual o conteúdo chega.
- Nome (H1), tagline (corpo) e indicador de scroll surgem uma única vez ao carregar a página — fade + deslocamento vertical quase imperceptível (4px, menor que o deslocamento padrão de "Motion" porque aqui o foco é o easing/ritmo, não a distância), em leve escalonamento (nome → tagline → indicador) que os faz se sobrepor durante quase toda a entrada, em vez de parecerem etapas separadas. Reutiliza o mesmo easing autoral (`--motion-ease`), mas com duração/atraso próprios (1000ms; atrasos de 140ms/280ms) — mais lentos que `--motion-duration`/`--motion-duration-fast` porque este é um evento único por visita, diferente das revelações por interação repetida de Trabalhos/Galeria, que continuam usando os tokens compartilhados normalmente.
- Depois dessa chegada, **nenhum elemento da Hero permanece animado**: sem zoom, sem parallax, sem loop, sem efeito decorativo contínuo. O indicador de scroll deixou de usar uma animação de "bounce" genérica (fora do vocabulário de motion do site) — ele participa só da chegada inicial e depois fica estático, coerente com o princípio de que movimento na Hero existe apenas como introdução, nunca como decoração contínua.
- `prefers-reduced-motion: reduce` remove a chegada por completo — todo o conteúdo aparece já no estado final, sem nenhum deslocamento.
- Espaçamento nome→tagline: `gap-4 sm:gap-5 lg:gap-6` (16px→20px→24px), não um valor fixo.
  **Por quê**: mesma causa raiz do item acima (tagline fluida) — o H1 varia de ~40px (mobile) a ~80px de altura visual (desktop), e um `gap-4` fixo representa ~40% dessa altura em mobile mas só ~17% em desktop, ficando proporcionalmente mais apertado exatamente onde a composição tem mais peso para equilibrar. **Regra a preservar**: espaçamento vertical entre um elemento que escala com a viewport e o elemento logo abaixo dele deve escalar junto (ainda que em degraus, não precisa ser `clamp()`) — um gap fixo ao lado de um título fluido tende a "funcionar" só na largura em que foi originalmente ajustado a olho.

**Sobre**
- Layout em duas colunas no desktop (texto + imagem secundária), empilhado no mobile.
- Lista de "dados rápidos" (ex.: nascimento, formação, representação) como definition list (`dl`/`dt`/`dd`), não tabela.
- O campo "Formação" (`training`) recebe `text-sm leading-relaxed` no valor (`dd`), diferente dos outros dois campos (`text-base` padrão).
  **Por quê**: a lista promete "fatos rápidos" — mas o valor de `training` é uma enumeração longa de técnicas/formação (várias linhas), enquanto `born`/`representation` são uma linha curta. No mesmo `text-base` que os outros, o olho não tem nenhum sinal de que aquele campo é diferente antes de começar a ler, quebrando a expectativa de escaneabilidade que o próprio formato `dl` cria. O ajuste é só tipográfico (tamanho/entrelinha) — a estrutura (`dl`/`dt`/`dd`), a cor (herdada, mesmo contraste) e o conteúdo não mudam. **Regra a preservar**: se um novo campo for adicionado a esta lista no futuro e seu valor for significativamente mais longo/denso que os demais (mais de ~1 linha de diferença), aplicar o mesmo tratamento (`text-sm leading-relaxed`) por padrão, comparando o fato por referência (`fact === facts.<campo>`) dentro do `.map` — não é um caso especial de `training`, é um princípio geral para qualquer campo-outlier dessa lista.

**Trabalhos**
- Lista editorial vertical, sem filtros e sem categorias — inspirada em programas de teatro e créditos editoriais. Um único componente para todos os breakpoints (não colapsa para cards).
- Estado fechado (linha, sempre visível): ano à esquerda, título em destaque no centro, categoria discreta à direita — em mobile a categoria desce para uma segunda linha (via grid), nunca é ocultada da tela (a categoria é informação real, não decorativa); separador `border-b border-border` entre itens.
- Estado expandido (revelado por clique/teclado no cabeçalho da linha): mostra apenas os campos existentes no dado (`role`, `director`, `company`, `venue`, `description`, `imageSrc`/`imageAlt`) — nenhum campo vazio é renderizado.
- Implementado sobre a primitiva `Accordion` do pacote `radix-ui` (já instalado, sem dependência nova): `type="single" collapsible"` garante que só um item fica aberto por vez; `Trigger`/`Content` do Radix já fornecem `button`, `aria-expanded` e `aria-controls` automaticamente — não reimplementar esse comportamento manualmente.
- Revelação visual: máscara horizontal (`clip-path: inset()`) do conteúdo expandido, lembrando a abertura de uma cortina — ver tokens de duração/easing em "Motion". Requer `@keyframes` (não apenas `transition`), pois o Radix Collapsible só anima o fechamento se detectar uma `animation` CSS nomeada.
- Estrutura de dados (`src/data/work.ts`) já preparada para `theater | film | tv | advertising | voice`, mas a UI nunca mostra filtro nem categoria sem itens — categorias sem entradas simplesmente não aparecem, pois a lista é sempre `dado.map(...)`, nunca uma grade fixa de categorias.

**Galeria**
- Palco editorial, não grade: uma imagem principal grande (`object-contain`, nunca corta cabeça/braços/corpo — a caixa se adapta à foto, nunca o contrário) acompanhada de miniaturas de navegação (`object-cover`, só miniaturas podem cortar). Coluna vertical de miniaturas no desktop, faixa horizontal rolável no mobile — mesma lista, responsiva.
- Miniatura ativa: indicação por três sinais simultâneos — opacidade cheia, borda/traço `accent` e `aria-current="true"`. A rolagem da coluna/faixa nunca esconde permanentemente a miniatura ativa (ela é trazida para a área visível quando muda por teclado/seta).
- Contador discreto (`aria-hidden`, ex. "03 / 08") e setas anterior/próxima (`Button` já existente) ao lado do palco — navegam a imagem em destaque sem abrir o lightbox.
- Clique ou `Enter`/`Space` na imagem principal abre a mesma foto em um lightbox de tela cheia (`Dialog` do shadcn/ui, reaproveitado — não uma solução manual nova): `object-contain`, nunca corta; setas anterior/próxima e `ArrowLeft`/`ArrowRight` sincronizadas com o palco; `Esc` fecha; foco preso dentro do modal enquanto aberto (focus trap); foco retorna ao elemento que abriu ao fechar.
- `thumbnailPosition` (opcional, por foto): só ajusta o recorte visual da miniatura (`object-position`) — nunca da imagem principal.
- Troca de imagem (no palco e no lightbox): `clip-path` + fade + leve deslocamento (`transform`), reaproveitando os tokens de "Motion" (`--motion-duration`, `--motion-ease`); `motion-reduce:` remove a animação.
- Coluna de miniaturas em desktop (`lg`): a largura do wrapper é `6rem` (tamanho da miniatura) **+ a largura real da scrollbar vertical**, medida em tempo de execução (`measureScrollbarWidth()`, `src/components/sections/Gallery.tsx`) — nunca um valor fixo assumido, já que varia por navegador/SO e é `0` em scrollbars overlay. **Nota técnica**: essa medição usa APIs de DOM (`document.createElement`/`appendChild`) e pressupõe execução client-side — não funciona em SSR/renderização no servidor (não é o caso deste projeto, que é uma SPA 100% client-side, mas fica registrado caso a arquitetura mude no futuro).

**Reel**
- Thumbnail estático com botão de play centralizado sobre a imagem.
- O `<iframe>` do vídeo só é montado no DOM após o clique (lazy) — nunca carregado no load inicial da página.

**Contato/Footer**
- Lista de canais (e-mail, redes sociais, contato de empresário) com ícone + texto visível — nunca ícone sozinho sem `aria-label` e texto acessível.
- Link "voltar ao topo" no footer.

## Estados de interação

- Hover: leve zoom (`scale(1.02–1.04)`) em imagens/cards clicáveis; sublinhado ou cor `accent` em links de texto.
- Foco: outline visível na cor `accent`, `outline-offset` suficiente para não cortar em cima do texto — aplicado a todo elemento interativo (links, botões, campos, itens de lista expansível).
- Active/selected (ex. item aberto em Trabalhos): fundo `accent` a 10–15% de opacidade ou borda `accent`, nunca só mudança de peso de fonte (insuficiente para indicar estado).

## Motion

Convenção única, obrigatória em toda animação nova do site (Trabalhos, Galeria e qualquer seção futura) — nenhuma seção define seu próprio ritmo. Tokens em `src/index.css`:

| Token CSS | Valor | Uso |
|---|---|---|
| `--motion-ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | Easing único de todo o site — desaceleração suave ("ease-out" pronunciado), sem bounce/overshoot |
| `--motion-duration` | `400ms` | Revelações de conteúdo (macro): abertura de item em Trabalhos, troca de imagem na Galeria |
| `--motion-duration-fast` | `200ms` | Micro-interações: hover, foco, mudança de cor/estado |

Princípios:
- Toda animação existe para revelar conteúdo ou dar feedback — nunca decorativa/contínua (sem loops, sem autoplay de movimento).
- Intensidade contida: deslocamentos (`translate`) no máximo ~8px, zoom no máximo `scale(1.04)`, sempre combinados com `opacity` (nunca só transform).
- `prefers-reduced-motion: reduce` (via variant `motion-reduce:` do Tailwind) remove a animação/máscara e troca por uma transição instantânea ou um fade curto (~100–150ms) — nunca deixa o usuário sem nenhuma indicação de mudança de estado.
- Revelações que precisam animar tanto entrada quanto saída (ex. Radix Collapsible/Accordion) usam `@keyframes` referenciando `--motion-duration`/`--motion-ease`, não apenas `transition` (transition sozinha não anima o desmonte).
- Escalonamento (ex. chegada da Hero): usar os próprios `--motion-duration-fast`/`--motion-duration` como valores de atraso entre elementos (0 / rápido / cheio), em vez de inventar uma nova constante de intervalo — mantém o ritmo derivado do mesmo par de tokens em vez de um terceiro valor novo.

## Critérios de acessibilidade (Web Design Guidelines aplicadas)

- Contraste mínimo **AA** (4.5:1 para texto normal, 3:1 para texto grande/títulos) em todas as combinações de cor, incluindo as seções escuras — validar especificamente `foreground-dark` sobre `background-dark` e `accent` sobre ambos os fundos.
- Toda ação só-ícone tem `aria-label` descritivo (não genérico como "botão").
- Navegação 100% possível por teclado, incluindo lightbox, expandir/recolher itens de Trabalhos e toggle de idioma.
- `prefers-reduced-motion: reduce` remove/reduz animações de entrada, zoom de hover, a revelação em cortina de Trabalhos/Galeria e o indicador de scroll do Hero.
- `lang` do `<html>` reflete o idioma ativo (PT/EN) dinamicamente.
- Imagens sempre com `alt` descritivo (inclusive placeholders — descrever o que a foto representaria, não "placeholder image").
