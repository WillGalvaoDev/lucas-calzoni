# Design System — Lucas Calzoni Landing Page

Tokens e specs concretos. Objetivo: o Implementer não deveria precisar tomar nenhuma decisão visual não coberta aqui. Se um caso não estiver previsto, a tarefa para e volta para o Lead — não decidir por conta própria.

## Cores

Modo claro (seções de leitura longa: Sobre, Trabalhos):
| Token | Hex | Uso |
|---|---|---|
| `background` | `#FAF9F6` | Fundo de seção |
| `foreground` | `#171614` | Texto principal |
| `muted` | `#6B675F` | Texto secundário/legendas |
| `border` | `#E4E1DA` | Divisores, bordas sutis |
| `accent` | `#8A6D4E` | Links, hover, foco, estado ativo, sublinhados — uso esparso, nunca como cor de fundo grande |

Modo escuro (seções cinematográficas: **Hero, Galeria, Contato, Footer**):
| Token | Hex | Uso |
|---|---|---|
| `background-dark` | `#111110` | Fundo de seção |
| `foreground-dark` | `#FAF9F6` | Texto principal |
| `muted-foreground-dark` | `#8F8B83` | Texto secundário/legendas em fundo escuro (ex.: contador da Galeria) — contraste de **5.57:1** sobre `#111110` (mínimo AA exigido: 4.5:1). Corrigido no QA final: o valor claro (`#6B675F`, calibrado só para `#FAF9F6`) nunca havia sido redefinido para `.section-dark` e media 3.35:1 sobre fundo escuro. Mesmo matiz neutro-quente da paleta, sem cor nova. |
| `accent` | `#8A6D4E` | Mesmo acento, mantém identidade entre seções |

> **Estudo técnico — nenhum valor aplicado.** Os números abaixo (incluindo o candidato `#977550`) **não representam o token atual nem uma mudança pendente**. É só um registro de contraste para consulta futura. O `--accent` em uso continua sendo `#8A6D4E`, sem nenhuma alteração.
>
> O valor atual é assimétrico — 4.56:1 sobre `#FAF9F6` (passa texto normal) mas só 3.94:1 sobre `#111110` (só passa texto grande/UI, nunca texto normal). Um candidato hipotético (`#977550`, mesmo matiz/saturação, levemente mais claro e mais quente) chegaria a 4.48:1 sobre `#111110` mantendo 4.01:1 sobre `#FAF9F6` — **mas isso é só um estudo, não uma proposta ativa**. Decisão do Lead: manter a paleta atual até a Hero estar completamente implementada e validada visualmente; só então uma revisão global da identidade visual (não uma mudança pontual da Hero) decide se o `--accent` muda ou não.

**Sem `--accent-muted`**: usos "discretos" do acento (glow, hover suave) são resolvidos com o próprio `--accent` em opacidade baixa (ex. `accent/6`, `accent/10` — sintaxe nativa do Tailwind), sem precisar de um segundo valor de cor. Se um caso futuro exigir genuinamente um segundo tom **reutilizável em múltiplas seções** (não um ajuste local de opacidade), criar `--accent-muted` seguindo esse nome — nunca um token com escopo de uma seção só.

### Regra de uso do acento

**O acento é assinatura, não decoração.** A Hero usa a cor de destaque exatamente uma vez — na segunda linha do nome. Padrão forte para todas as seções: **uma aparição de acento por seção**, sempre no elemento mais importante dela. Se o acento se repete dentro de uma seção, ele deixa de significar algo.

- Nunca em texto corrido.
- **Não contam como "a aparição"** os usos convencionais de estado, que seguem regras próprias de acessibilidade e podem coexistir: anel de foco, borda de item ativo, hover de link. Esses são feedback, não ênfase editorial.
- Exceções à regra de uma aparição exigem justificativa compositiva explícita, registrada aqui.

Não introduzir novas cores. **Gradientes decorativos são proibidos** — a exceção que existia (glow radial da Hero) foi testada e removida na Refatoração Editorial; não há exceção ativa. O único gradiente permitido é funcional: o overlay vertical de legibilidade sobre a fotografia da Hero (preto a 30–50% de opacidade, nunca cor do acento). Gradientes **laterais** sobre fotografia foram testados e rejeitados (produziam divisão visível e cortavam o corpo do ator) — não reintroduzir.

## Superfícies

Profundidade e hierarquia entre as seções claras são criadas **apenas** por passos de luminosidade dentro do mesmo matiz de `background`/`border` — nunca por cor nova, gradiente, vinheta, textura ou sombra decorativa.

| Token | Hex | Uso |
|---|---|---|
| `surface` | `#F3F1EB` | Primeiro passo de profundidade (Trabalhos) |
| `surface-muted` | `#ECE9E2` | Segundo passo, mais recolhido — **sem consumidor após a Refatoração Editorial** (ver abaixo) |

### Arco claro/escuro da página (Refatoração Editorial)

A página **abre e fecha no escuro**, com um miolo claro de leitura longa:

```
Hero (escuro) → Sobre (claro) → Trabalhos (claro) → Galeria (escuro) → Contato (escuro) → Footer (escuro)
```

- **Hero**: `.section-dark`.
- **Sobre**: `background` — âncora/tom-base; o claro entra a serviço da legibilidade da biografia.
- **Trabalhos**: `surface`, com um divisor `border-t border-border` no topo da seção — primeira fronteira visual entre Sobre e Trabalhos.
- **Galeria**: `.section-dark`. A sala apaga para projetar — e permanece apagada até o fim da página.
- **Contato**: `.section-dark` *(alterado — era `background`)*. Fecha com a mesma autoridade visual da abertura.
- **Footer**: `.section-dark` *(alterado — era `surface-muted`)*. Encerramento contínuo, sem quebra de tom com o Contato.

**Por quê**: no arco anterior (`claro → escuro → claro`), a página desbotava logo depois do seu momento mais cinematográfico e terminava pálida — o convite de contato acontecia no ponto mais fraco da narrativa. Fechar no escuro dá simetria (abre e fecha com a mesma voz) e preserva o sistema de superfícies claras exatamente onde ele resolve um problema real: texto longo em Sobre e Trabalhos.

**Consequências a validar na implementação** (Etapas 4 e 7): todas as combinações de texto/fundo de Contato e Footer mudam, incluindo estados de foco, hover e o contraste dos ícones de canal. `--muted-foreground` dentro de `.section-dark` já tem valor próprio (`#8F8B83`, 5.57:1) e passa a valer também nessas duas seções automaticamente. `surface-muted` fica sem consumidor — mantido como token documentado, não removido, por ser um passo válido da escala de superfícies claras caso uma seção clara futura precise dele.

Contraste de texto verificado (WCAG AA, mínimo 4.5:1): `foreground` sobre `surface-muted` = 14.9:1; `muted-foreground` sobre `surface-muted` = 4.64:1 (passa, mas com margem pequena — preferir `foreground` para qualquer texto novo sobre `surface-muted` em vez de `muted-foreground`).

## Tipografia

Direção "Cinematográfico Contemporâneo" — sprint de tipografia (ver histórico da sessão). Substitui o par Fraunces/Inter mantendo a mesma arquitetura de tokens (`--font-display`/`--font-sans`, escala `--text-h1/h2/h3` em `@theme inline`).

- **Display/headlines**: "Newsreader" (serifada literária, variável — eixo de peso + eixo ótico), self-hosted via `@fontsource-variable/newsreader` (build `standard.css`, que inclui o eixo ótico automático além do peso — ver "Performance" abaixo). Nome de família registrado: `'Newsreader Variable'`. Peso: **500** para H1/H2/H3 (a família não usa 600 — fica pesada demais para o tom literário pretendido).
- **Itálico**: recurso tipográfico **opcional**, nunca padrão de nenhum elemento (a tagline do Hero usa estilo normal). Se um uso pontual for aprovado no futuro (ex. uma citação de imprensa), importar `@fontsource-variable/newsreader/standard-italic.css` só nesse momento — não pré-carregado hoje, para não pagar peso de download por um eixo sem uso atual.
- **Corpo/UI**: "Manrope" (grotesca contemporânea, variável — eixo de peso), self-hosted via `@fontsource-variable/manrope`. Nome de família registrado: `'Manrope Variable'`. Pesos: 400 (corpo/UI padrão), 500 (labels/botões, já em uso), 600 (ênfase pontual, reservado — nenhum uso atual exige).
### As duas vozes (vocabulário obrigatório)

Existem **duas vozes tipográficas no site, nunca três**. Toda decisão de tipografia começa identificando em qual delas o texto se enquadra:

| Voz | Família | Tratamento | Onde |
|---|---|---|---|
| **Display** | Newsreader (serifada) | Peso 500, entrelinha fechada, sem caixa alta | Nome na Hero, títulos de seção (H2), títulos de item em Trabalhos, declaração do Contato |
| **Metadado** | Manrope (grotesca) | **Caixa alta + tracking aberto**, tamanho pequeno | Subtítulo da Hero, anos e categorias em Trabalhos, rótulos dos créditos em Sobre, contador da Galeria, rótulos de canal no Contato |
| *(corpo)* | Manrope (grotesca) | Caixa normal, entrelinha ~1.65 | Biografia, descrições de trabalho — texto para ler, não para escanear |

A **voz do metadado** foi estabelecida pelo subtítulo da Hero e passa a ser a voz única de toda informação secundária/estrutural do site. É o que faz um ano em Trabalhos e um rótulo de contato pertencerem visivelmente à mesma página.

### Escala

- Escala fluida com `clamp()`, referência:
  - H1 (Hero): `clamp(2.75rem, 2rem + 5vw, 5rem)` — a curva anterior (`clamp(2.5rem, 5.5vw, 5rem)`) ficava **travada no piso de 40px em toda largura abaixo de ~727px**, porque o termo `5.5vw` sozinho nunca ultrapassava o piso antes disso: na prática o H1 era um valor fixo em todo o mobile e boa parte do tablet, pequeno demais para ser o ponto focal ao lado da fotografia. O termo combinado `2rem + 5vw` cresce desde a largura mínima real (48px em 320px, ~54px em 430px) e mantém o mesmo teto de 80px em desktop.
  - H2 (título de seção): `clamp(1.75rem, 3.5vw, 3rem)` (inalterado)
  - H3 (subtítulo/nome de item): `clamp(1.125rem, 1.5vw, 1.5rem)` (inalterado)
  - Corpo (parágrafos de prosa — bio, descrição de Trabalhos): `1rem`–`1.125rem`
  - Legenda/meta: `0.875rem` (inalterado)
  - **Tagline da Hero** (`--text-hero-tagline`): `clamp(1.125rem, 1.9vw, 1.375rem)`.
    **Por quê**: antes, a tagline usava dois valores fixos (`text-base`/`sm:text-lg`, 16px→18px), enquanto o H1 acima dela é fluido (`clamp` + `vw`). Isso fazia a *razão* H1:tagline mudar sozinha conforme a viewport crescia — ~2.5x em mobile (proporção editorial saudável entre título e deque) até ~4.4x em desktop grande (a tagline "encolhia" relativamente sem nenhuma mudança de valor nela mesma, só porque o H1 continuava crescendo e ela não). O risco de regressão a evitar no futuro: **qualquer elemento que acompanhe visualmente um título fluido (`--text-h1`/`--text-h2`) precisa ou ser fluido também, ou ter sua proporção verificada explicitamente em pelo menos 2-3 larguras de viewport** — um valor fixo ao lado de um `clamp()` é uma armadilha silenciosa, porque parece correto em mobile (onde foi provavelmente calibrado) e só quebra em telas maiores.
  - **Título de item de lista editorial** (`--text-list-title`, hoje só Trabalhos): `clamp(1.25rem, 2.2vw, 1.75rem)`.
    **Por quê**: o candidato óbvio era alargar `--text-h3` (o token que o título já usava). Investigação mostrou que `--text-h3` (`clamp(1.125rem, 1.5vw, 1.5rem)`) fica **achatado em 18px abaixo de 1200px de largura de viewport** — ou seja, na prática, em quase todo mobile/tablet/desktop comum, o "H3" nunca chega a ser maior que o próprio corpo de texto (`sm:text-lg` também é 18px), comprometendo a leitura rápida ano/título/categoria que a seção depende. A correção certa **não** era alargar `--text-h3` diretamente: esse token é a rubrica genérica de subtítulo da escala H1>H2>H3, hoje sem nenhum outro consumidor no código, mas reservada para qualquer subtítulo futuro fora de uma lista — alargá-la para resolver um problema específico de Trabalhos faria qualquer subtítulo genérico futuro herdar uma curva dimensionada para outra finalidade (título de linha competindo com metadados), sem ter pedido isso. **Regra a preservar**: um título que existe para ser o elemento dominante de uma linha de lista/tabela editorial (compete com metadados ao lado) é um papel tipográfico diferente de um subtítulo de prosa — mesmo que hoje só exista um caso de cada, eles não devem compartilhar token só porque coincidem em valor. Antes de reaproveitar `--text-h3` em qualquer novo lugar, confirmar que o papel é realmente "subtítulo de seção", não "título de item de lista" — nesse segundo caso, usar (ou estender) `--text-list-title`.
- Line-height: 1.15 em H1, 1.2 em H2/H3 (Newsreader pede um pouco mais de espaço vertical que a família anterior); ~1.65 em parágrafos de prosa — aplicado só nesses parágrafos (`leading-[1.65]`), não em elementos de UI/rótulo que também usam `text-base`/`text-sm`/`text-lg` (botões, nav, badges), para não alterar o ritmo vertical desses componentes.
- Letter-spacing: `-0.015em` em H1/H2 (levemente menos negativo que antes); `0.005em` em parágrafos de prosa (mesmo critério de escopo do line-height acima); normal em UI/rótulos.

## Espaçamento e grid

- Grid de 12 colunas, `max-width` de conteúdo: `1440px`, com padding lateral responsivo (`1.5rem` mobile, `2.5rem` tablet, `4rem` desktop).
- Breakpoints: `mobile <640px`, `tablet 640–1024px`, `desktop >1024px`.
- Padding vertical entre seções: `4rem` mobile, `6rem` tablet, `8rem` desktop (usar consistentemente em todas as seções, não variar arbitrariamente).

## Composição e alinhamento — a espinha

**Regra estrutural**: existe uma única linha vertical invisível na página, definida pelo container da Navbar. **Todo título de seção e todo bloco estrutural nasce nessa linha.**

O container é idêntico em Navbar, Hero e em todas as seções:

```
mx-auto  +  max-w-[1440px]  +  px-6 sm:px-10 lg:px-16
```

Os três elementos são obrigatórios juntos. Omitir `mx-auto max-w-[1440px]` e manter só o padding **parece correto até 1440px e quebra acima disso** — o conteúdo cola na borda real da viewport enquanto a Navbar continua centralizada. Foi exatamente esse o defeito encontrado na Hero e corrigido: em 1920px o nome ficava fora da margem do wordmark. Qualquer seção nova deve ser verificada em uma largura **acima de 1440px**, não só nos breakpoints padrão.

### Exceções justificadas ao alinhamento

A espinha governa a **estrutura** — títulos, blocos de conteúdo, colunas. Não governa cada elemento isolado dentro dela. Podem ser centralizados, com justificativa funcional ou compositiva:

- indicadores (ex.: seta de scroll da Hero);
- controles de navegação (setas de galeria, contador);
- conteúdo dentro de modal/lightbox;
- qualquer elemento cuja função exija relação com o eixo da viewport, não com a coluna de texto.

O que **não** é exceção aceitável: centralizar o conteúdo principal de uma seção inteira por falta de composição melhor — foi o que tornou o Contato a seção mais genérica do projeto.

## Arestas, sombras e divisores

Vocabulário de impresso, não de interface de aplicativo:

- **Cantos**: retos. Sem `rounded-*` em fotografias, contêineres de seção ou blocos de conteúdo. *Exceção*: componentes de UI de terceiros já instalados (switch do toggle de idioma, controles do shadcn) mantêm seu raio próprio — são controles, não superfície editorial.
- **Sombras**: nenhuma. Profundidade vem de luminosidade de superfície, nunca de `shadow-*`.
- **Divisores**: fios de 1px na cor `border` do tema vigente. Nunca 2px, nunca tracejado, nunca duplo.
- **Fotografias**: assentam diretamente sobre o fundo, sem moldura, borda ou cartão.

## Componentes e specs

**Navbar**
- Transparente (texto claro) sobre o Hero; ao rolar além da altura do Hero, transiciona para `background` sólido + `border-bottom` de 1px `border`, texto passa a `foreground`.
- Toggle de idioma: switch de dois estados (PT/EN), `aria-label` descrevendo o idioma atual e a ação ("Mudar para inglês"/"Switch to Portuguese").
- Links âncora: Sobre, Trabalhos, Galeria, Contato — scroll suave, sem mudança de URL/hash necessária.
- Wordmark ("Lucas Calzoni"): testado no Editorial Polish (Post-Freeze) um `tracking-[0.02em]` para dar mais presença editorial sem alterar tamanho/altura — revertido por falta de confirmação visual de ganho perceptível (nenhuma ferramenta de inspeção de navegador disponível na sessão). **Regra a preservar**: qualquer pedido futuro de "dar mais presença" à Navbar deve ser resolvido por tipografia (peso, tracking, cor) antes de se cogitar tamanho/altura — aumentar a Navbar em si é uma mudança estrutural que precisa voltar para uma decisão de Lead, não um microajuste de polish.

**Hero — padrão de referência definitivo do projeto**

Esta é a seção aprovada e congelada. Toda decisão visual das demais seções deriva dela. Alterações aqui exigem decisão explícita de Lead, não ajuste de polish.

- **Fotografia**: retrato **full-bleed único**, cobrindo a seção inteira em todos os breakpoints, escurecido por `brightness-50` aplicado diretamente na imagem. É o único recurso de contraste/atmosfera da seção.
  **Abordagens testadas e rejeitadas** (não reintroduzir sem nova decisão): composição em duas colunas com a foto ocupando 45–55% da largura; fusão da foto com o fundo por gradiente lateral extenso; `mask-image`. As duas primeiras produziram uma divisão visível entre "coluna escura" e "fotografia", chegando a interceptar o braço do ator com um degradê evidente — o oposto do efeito pretendido. A terceira foi descartada por complexidade sem ganho perceptível.
- **Enquadramento**: `object-position: 65% center` abaixo de `sm`, centro padrão a partir daí. O rosto é o ponto focal em todos os breakpoints.
- **Overlay**: um único gradiente **vertical** (`transparent → preto ~40%`), exclusivamente para legibilidade do texto no terço inferior. **Nenhum gradiente lateral, nenhum glow radial** — ambos foram testados e removidos.
- **Bloco de conteúdo**: ancorado no terço inferior, alinhado à esquerda, no container padrão (ver "Composição e alinhamento"). Nome → subtítulo → CTA, nesta ordem, com espaçamento que escala por breakpoint.
- **Nome (H1)**: duas linhas, entrelinha fechada (`leading-[0.9]`), voz display. A segunda linha ("Calzoni") usa `--accent` — **é a aparição única de acento da seção** e o gesto de assinatura do projeto inteiro.
- **Subtítulo**: voz do metadado (caixa alta + `tracking-[0.15em]`), largura de leitura limitada.
- **CTA "Ver Trabalhos"**: `Button` existente (`variant="outline"`, `size="lg"`) com altura e padding ampliados via `className` — sem criar variante nova no componente compartilhado. Texto no `--foreground` (não no `--accent`): evita depender do acento para contraste de texto normal; borda e hover usam `--accent`, onde o requisito é de 3:1 (contraste de UI), coberto com folga. Navega para `#work` pela lógica de scroll compartilhada (`src/lib/scroll.ts`), não duplicada.
- **Indicador de scroll**: centralizado na viewport — exceção justificada à espinha (é um indicador, não conteúdo estrutural).
- **Monograma "LC"**: **adiado**. A composição aprovada provou não precisar dele. Só reavaliar se houver motivo concreto, nunca por completude do plano original.
- **Tom geral obrigatório**: editorial, cinematográfico, elegante, premium, minimalista, silencioso, sofisticado, intencional. Nunca chamativo por chamar atenção — qualquer elemento que pareça "efeito" antes de parecer "composição" está errado.
- Imagem de retrato nunca é animada (sem zoom contínuo/Ken Burns, sem parallax): ela é o "frame" fixo sobre o qual o conteúdo chega.
- Nome (H1), tagline (corpo), CTA e indicador de scroll surgem uma única vez ao carregar a página — fade + deslocamento vertical quase imperceptível (4px, menor que o deslocamento padrão de "Motion" porque aqui o foco é o easing/ritmo, não a distância), em leve escalonamento que os faz se sobrepor durante quase toda a entrada, em vez de parecerem etapas separadas. Reutiliza o mesmo easing autoral (`--motion-ease`), mas com duração/atraso próprios (1000ms; atrasos derivados do mesmo padrão de 140ms/280ms, estendido para o CTA como quarto elemento) — mais lentos que `--motion-duration`/`--motion-duration-fast` porque este é um evento único por visita, diferente das revelações por interação repetida de Trabalhos/Galeria, que continuam usando os tokens compartilhados normalmente.
- Depois dessa chegada, **nenhum elemento da Hero permanece animado**: sem zoom, sem parallax, sem loop, sem efeito decorativo contínuo. O indicador de scroll deixou de usar uma animação de "bounce" genérica (fora do vocabulário de motion do site) — ele participa só da chegada inicial e depois fica estático, coerente com o princípio de que movimento na Hero existe apenas como introdução, nunca como decoração contínua.
- `prefers-reduced-motion: reduce` remove a chegada por completo — todo o conteúdo aparece já no estado final, sem nenhum deslocamento.
- Espaçamento nome→tagline: `gap-4 sm:gap-5 lg:gap-6` (16px→20px→24px), não um valor fixo.
  **Por quê**: mesma causa raiz do item acima (tagline fluida) — o H1 varia de ~40px (mobile) a ~80px de altura visual (desktop), e um `gap-4` fixo representa ~40% dessa altura em mobile mas só ~17% em desktop, ficando proporcionalmente mais apertado exatamente onde a composição tem mais peso para equilibrar. **Regra a preservar**: espaçamento vertical entre um elemento que escala com a viewport e o elemento logo abaixo dele deve escalar junto (ainda que em degraus, não precisa ser `clamp()`) — um gap fixo ao lado de um título fluido tende a "funcionar" só na largura em que foi originalmente ajustado a olho.

**Cabeçalho de seção** *(padrão compartilhado — Etapa 2)*
- Um único padrão para as quatro seções (Sobre, Trabalhos, Galeria, Contato). Nasce na espinha, alinhado à esquerda, nunca centralizado.
- Título na voz display (H2). Sem numeração de seção (`01`, `02`…) — avaliado e recusado por soar gimmick.
- É o ponto onde a consistência entre seções é mais visível: se os quatro cabeçalhos forem idênticos em tratamento e posição, as seções pertencem à mesma página mesmo tendo composições internas muito diferentes.

**Sobre** *(direção da Etapa 5 — ainda não implementada)*
- **Objetivo**: humanizar. É a única seção onde ele fala em primeira pessoa; deve parecer página de revista, não "card sobre nós".
- Layout em duas colunas no desktop, **em proporção assimétrica** — a biografia é protagonista, o retrato acompanha. Não dividir o espaço meio a meio. Empilhado no mobile.
- **Retrato sem aparência de card**: sem borda, sem canto arredondado, sem sombra. Preferir que sangre até a borda da seção — uma fotografia que toca a borda pertence à página; uma fotografia emoldurada está *colada* na página.
- Biografia com medida de leitura confortável, nunca ocupando 100% da largura.
- Lista de "dados rápidos" (nascimento, formação, representação) como definition list (`dl`/`dt`/`dd`), não tabela — **tratada visualmente como bloco de créditos**: rótulos na voz do metadado (caixa alta + tracking), valores em corpo normal, separados por fios de 1px. Sem ícones.
- **Evitar**: retrato em cartão; ícones ao lado dos dados; colunas de largura igual; biografia em largura total.
- O campo "Formação" (`training`) recebe `text-sm leading-relaxed` no valor (`dd`), diferente dos outros dois campos (`text-base` padrão).
  **Por quê**: a lista promete "fatos rápidos" — mas o valor de `training` é uma enumeração longa de técnicas/formação (várias linhas), enquanto `born`/`representation` são uma linha curta. No mesmo `text-base` que os outros, o olho não tem nenhum sinal de que aquele campo é diferente antes de começar a ler, quebrando a expectativa de escaneabilidade que o próprio formato `dl` cria. O ajuste é só tipográfico (tamanho/entrelinha) — a estrutura (`dl`/`dt`/`dd`), a cor (herdada, mesmo contraste) e o conteúdo não mudam. **Regra a preservar**: se um novo campo for adicionado a esta lista no futuro e seu valor for significativamente mais longo/denso que os demais (mais de ~1 linha de diferença), aplicar o mesmo tratamento (`text-sm leading-relaxed`) por padrão, comparando o fato por referência (`fact === facts.<campo>`) dentro do `.map` — não é um caso especial de `training`, é um princípio geral para qualquer campo-outlier dessa lista.

**Trabalhos** *(estrutura preservada — só ajuste de vocabulário na Etapa 6)*
- **É a seção mais autoral do projeto e serve de modelo para as demais.** Sua estrutura não deve ser refeita.
- **Único ajuste previsto**: ano e categoria migram para a **voz do metadado** (caixa alta + tracking), que hoje não usam — alinha a seção ao vocabulário estabelecido pela Hero sem alterar composição, densidade ou comportamento.
- **Evitar**: converter em cards; imagens de capa por item; filtros ou abas; qualquer coisa que quebre a leitura em lista corrida.
- Lista editorial vertical, sem filtros e sem categorias — inspirada em programas de teatro e créditos editoriais. Um único componente para todos os breakpoints (não colapsa para cards).
- Estado fechado (linha, sempre visível): ano à esquerda, título em destaque no centro, categoria discreta à direita — em mobile a categoria desce para uma segunda linha (via grid), nunca é ocultada da tela (a categoria é informação real, não decorativa); separador `border-b border-border` entre itens.
- Estado expandido (revelado por clique/teclado no cabeçalho da linha): mostra apenas os campos existentes no dado (`role`, `director`, `company`, `venue`, `description`, `imageSrc`/`imageAlt`) — nenhum campo vazio é renderizado.
- Implementado sobre a primitiva `Accordion` do pacote `radix-ui` (já instalado, sem dependência nova): `type="single" collapsible"` garante que só um item fica aberto por vez; `Trigger`/`Content` do Radix já fornecem `button`, `aria-expanded` e `aria-controls` automaticamente — não reimplementar esse comportamento manualmente.
- Revelação visual: máscara horizontal (`clip-path: inset()`) do conteúdo expandido, lembrando a abertura de uma cortina — ver tokens de duração/easing em "Motion". Requer `@keyframes` (não apenas `transition`), pois o Radix Collapsible só anima o fechamento se detectar uma `animation` CSS nomeada.
- Estrutura de dados (`src/data/work.ts`) já preparada para `theater | film | tv | advertising | voice`, mas a UI nunca mostra filtro nem categoria sem itens — categorias sem entradas simplesmente não aparecem, pois a lista é sempre `dado.map(...)`, nunca uma grade fixa de categorias.

**Galeria** *(mecânica preservada — acabamento revisto na Etapa 3)*
- **Objetivo**: ensaio fotográfico, não visualizador de arquivos. A mecânica atual (palco + miniaturas + lightbox) está correta e não deve ser refeita — o que a trai é o acabamento.
- **Remoção de cromo (Etapa 3)**: sem cantos arredondados, sem sombra, sem borda em volta do palco. A fotografia assenta diretamente sobre o fundo escuro, como uma projeção. É a mudança de maior impacto visual e menor risco técnico do plano.
- Com o cromo removido, a **borda `accent` da miniatura ativa** passa a ser o sinal visual dominante da seção — e é a aparição única de acento aqui.
- **Ordem interna da seção** *(decisão aprovada)*: cabeçalho → palco fotográfico + miniaturas → **Reel como encerramento**. O Reel não abre a seção nem flutua solto: fecha a Galeria como a passagem das imagens estáticas para o ator em movimento, imediatamente antes do convite de Contato. Deve pertencer visualmente à seção (mesmo container, mesma linguagem) sem disputar com o palco o papel de protagonista.
- **Evitar**: qualquer moldura; grade de fotos; legendas sobre a imagem; zoom em hover no palco principal.
- Palco editorial, não grade: uma imagem principal grande (`object-contain`, nunca corta cabeça/braços/corpo — a caixa se adapta à foto, nunca o contrário) acompanhada de miniaturas de navegação (`object-cover`, só miniaturas podem cortar). Coluna vertical de miniaturas no desktop, faixa horizontal rolável no mobile — mesma lista, responsiva.
- Miniatura ativa: indicação por três sinais simultâneos — opacidade cheia, borda/traço `accent` e `aria-current="true"`. A rolagem da coluna/faixa nunca esconde permanentemente a miniatura ativa (ela é trazida para a área visível quando muda por teclado/seta).
- Contador discreto (`aria-hidden`, ex. "03 / 08") e setas anterior/próxima (`Button` já existente) ao lado do palco — navegam a imagem em destaque sem abrir o lightbox.
- Clique ou `Enter`/`Space` na imagem principal abre a mesma foto em um lightbox de tela cheia (`Dialog` do shadcn/ui, reaproveitado — não uma solução manual nova): `object-contain`, nunca corta; setas anterior/próxima e `ArrowLeft`/`ArrowRight` sincronizadas com o palco; `Esc` fecha; foco preso dentro do modal enquanto aberto (focus trap); foco retorna ao elemento que abriu ao fechar.
- `thumbnailPosition` (opcional, por foto): só ajusta o recorte visual da miniatura (`object-position`) — nunca da imagem principal.
- Troca de imagem (no palco e no lightbox): `clip-path` + fade + leve deslocamento (`transform`), reaproveitando os tokens de "Motion" (`--motion-duration`, `--motion-ease`); `motion-reduce:` remove a animação.
- Coluna de miniaturas em desktop (`lg`): a largura do wrapper é `6rem` (tamanho da miniatura) **+ a largura real da scrollbar vertical**, medida em tempo de execução (`measureScrollbarWidth()`, `src/components/sections/Gallery.tsx`) — nunca um valor fixo assumido, já que varia por navegador/SO e é `0` em scrollbars overlay. **Nota técnica**: essa medição usa APIs de DOM (`document.createElement`/`appendChild`) e pressupõe execução client-side — não funciona em SSR/renderização no servidor (não é o caso deste projeto, que é uma SPA 100% client-side, mas fica registrado caso a arquitetura mude no futuro).

**Reel**
- **Posição**: encerramento da Galeria (ver "Galeria" acima) — não abertura, não seção própria.
- Thumbnail estático com botão de play centralizado sobre a imagem (centralização justificada: é um controle).
- Mesmo tratamento de acabamento do palco: sem borda, sem canto arredondado, sem sombra.
- **Pendência de implementação** *(registrada na Etapa 3, ainda não aplicada)*: o pôster do Reel hoje ainda mantém o cromo antigo do palco (cantos arredondados, borda, fundo de preenchimento, sombra), que já foi removido do palco principal na Etapa 3. Decisão deliberada: não corrigir isoladamente agora — essa mudança acontece junto do reposicionamento do Reel como encerramento da Galeria, para que acabamento e composição sejam revisados no mesmo momento, não em duas passagens separadas.
- O `<iframe>` do vídeo só é montado no DOM após o clique (lazy) — nunca carregado no load inicial da página. Nunca autoplay, nunca som automático.

**Contato** *(direção da Etapa 4 — ainda não implementada)*
- **Objetivo**: fechar com a mesma autoridade da abertura. É o **segundo momento mais forte da página**, não um rodapé de contato.
- **Paleta escura** (`.section-dark`) — ver "Arco claro/escuro da página".
- **Abandona a centralização atual** e adere à espinha. Hoje é a seção mais genérica do projeto (título centralizado + três itens com ícone é o layout padrão de qualquer template gratuito) e a única que quebra o alinhamento estrutural.
- Composição: uma **declaração editorial** curta e direta na voz display, com presença tipográfica real; canais listados abaixo, com rótulos na voz do metadado.
- Ícones: discretos ou ausentes. Hoje eles são a única coisa que dá caráter à seção — sintoma de que a tipografia não está fazendo o trabalho dela.
- Espaço negativo alto; ritmo de leitura rápido e conclusivo (o usuário deve saber em dois segundos como agir).
- **Evitar**: centralização do bloco principal; grade de cards de contato; formulário; ícones grandes; qualquer sensação de "rodapé de contato".
- Canais mantêm ícone + texto visível quando houver ícone — nunca ícone sozinho sem `aria-label` e texto acessível.

**Footer** *(direção da Etapa 7 — ainda não implementada)*
- **Paleta escura** (`.section-dark`), contínua com o Contato — sem quebra de tom entre os dois.
- Encerramento discreto, **não uma sexta seção**: uma única linha, altura mínima.
- **Wordmark à esquerda**, fechando o loop com a Navbar — a página termina dizendo o mesmo nome com que começou. Crédito de desenvolvimento e "voltar ao topo" à direita.
- **Evitar**: virar seção de conteúdo; múltiplas colunas de links; repetir os canais de contato (já resolvidos logo acima).

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
- **Sem scroll reveal generalizado** *(decisão da Refatoração Editorial)*: seções não animam ao entrar na viewport. A chegada é um gesto raro — acontece **uma vez por visita, no topo**. Se toda seção animasse ao aparecer, (a) a fronteira entre "revelar conteúdo" e "decorar" ficaria indefensável, (b) o efeito é o mais associado a template genérico de portfólio, e (c) a chegada da Hero deixaria de ser especial. Movimento nas demais seções existe apenas como resposta a interação (abrir item em Trabalhos, trocar foto na Galeria).
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
