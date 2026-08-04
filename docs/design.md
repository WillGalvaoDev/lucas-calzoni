# Design — Lucas Calzoni

Direção visual, narrativa de UX e o design system completo (tokens e specs concretos). Este documento absorveu o antigo `design-system.md`: o *porquê* e o *quanto* moram no mesmo lugar, porque separá-los foi a origem da maioria das divergências históricas do projeto.

> **Estado deste documento**: descreve o site **como ele está hoje**. Onde este documento divergia do código, o código foi tratado como verdade e o texto foi corrigido — as divergências resolvidas estão listadas na seção 10.
>
> **Objetivo operacional**: o Implementer não deveria precisar tomar nenhuma decisão visual não coberta aqui. Se um caso não estiver previsto, a tarefa para e volta para o Lead.

---

# 1. Direção visual

**Editorial minimalista** com tom cinematográfico. A sensação-alvo é a de um programa de teatro impresso em papel bom: silencioso, confiante, sem urgência — o oposto de uma landing page que tenta vender algo.

**Tom obrigatório**: editorial, cinematográfico, elegante, premium, minimalista, silencioso, sofisticado, intencional. Nunca chamativo por chamar atenção — **qualquer elemento que pareça "efeito" antes de parecer "composição" está errado.**

## 1.1 O DNA estabelecido pela Hero

A Hero é o padrão de referência do projeto. O que ela fixou vale para o site inteiro:

| Elemento | Valor estabelecido |
|---|---|
| Container | `max-w-[1440px]` centralizado + padding lateral responsivo, idêntico ao da Navbar |
| Alinhamento | Esquerda, na espinha |
| Display | `font-display`, entrelinha fechada, peso 500 |
| Cor de destaque | Uma única aparição, no elemento mais importante |
| Voz secundária | Caixa alta + tracking aberto |
| Ação | Contorno fino, sem preenchimento |
| Cantos e sombras | Retos; nenhuma sombra |
| Motion | Chegada única, escalonada, executada uma vez |
| Fotografia | Full-bleed, escurecida por `brightness`, nunca animada |

Alterações na Hero exigem decisão explícita de Lead, não ajuste de polish.

## 1.2 Princípios

**1. A espinha.** Existe uma linha vertical invisível na página: a coordenada onde começam o wordmark da Navbar e o nome na Hero. **Todo título de seção e todo bloco estrutural nasce nessa linha.** É o dispositivo mais forte de unidade do projeto — mais do que cor ou tipografia.

*Exceção justificada*: podem ser centralizados, com razão funcional ou compositiva, elementos pontuais — indicadores (seta de scroll), controles de navegação (setas, contador), conteúdo de modal. A regra governa a **estrutura**, não cada elemento isolado dentro dela. O que **não** é exceção aceitável é centralizar o conteúdo principal de uma seção inteira por falta de composição melhor — foi exatamente isso que tornou o Contato a seção mais genérica do projeto antes da refatoração.

**2. O acento é assinatura, não decoração.** Uma aparição de acento por seção, sempre no elemento mais importante dela. Se o acento se repete dentro de uma seção, deixa de significar algo.
- Nunca em texto corrido.
- **Não contam como "a aparição"** os usos convencionais de estado — anel de foco, borda de item ativo, hover de link. Esses são feedback, não ênfase editorial, e podem coexistir.
- Exceções exigem justificativa compositiva explícita, registrada aqui.

**3. Duas vozes tipográficas, nunca três.** A serifada fala em títulos e nomes de obra. A grotesca em caixa alta com tracking aberto é a **voz do metadado**. Texto corrido é grotesca normal. Não existe quarta voz. Um degrau tonal (mesma família, cor secundária) **não** conta como voz nova — é o recurso correto para hierarquia interna.

*Exceção nomeada*: a assinatura manuscrita do ator, no fecho de Sobre (ver "Assinatura" na spec da seção), não é uma voz tipográfica — é uma **marca de ocorrência única**, da mesma natureza de um selo ou carimbo. Nunca compõe texto, nunca ganha um segundo consumidor. Não abre precedente para nenhum script futuro; se algo cogitar reusá-la ou introduzir um segundo elemento manuscrito, é decisão de Lead, não extensão de implementação.

**4. Densidade decrescente.** A Hero tem quatro elementos em uma tela inteira: essa é a densidade máxima do topo. Seções seguintes podem ser mais densas que a Hero, mas nenhuma pode parecer cheia. Se uma seção precisa de scroll interno ou abreviação para caber, corta-se conteúdo — não espaço.

**5. Arestas retas.** Sem cantos arredondados, sem sombras. Canto arredondado + sombra é vocabulário de interface de aplicativo; aresta reta é vocabulário de impresso.

**6. Contraste por luminosidade, nunca por peso.** Hierarquia se resolve com tamanho e cor, não engrossando fontes. Peso 500 é o teto do display; corpo em 400.

**7. Movimento é chegada, nunca ambiente.** Nada pulsa, flutua, gira ou repete. Depois que a página assenta, ela fica imóvel. *(Ver a exceção única e justificada da seção Sobre em 7.3.)*

## 1.3 O arco claro/escuro

O tom cinematográfico vem da estrutura de luz da página, não de elementos gráficos, gradientes ou efeitos:

```
Hero (escuro) → Sobre (claro) → Trabalhos (claro) → Galeria (escuro) → Contato (escuro) → Footer (escuro)
```

A página **abre e fecha com a mesma autoridade visual**. O miolo claro é o dossiê — a parte factual, de leitura longa, onde o fundo claro serve à legibilidade. O retorno ao escuro na Galeria não é interrupção: é a sala apagando de novo para projetar, e permanece apagada até o fim.

---

# 2. Narrativa da página

A página conta uma história em cinco tempos. Cada seção tem uma **função narrativa** — não é "mais uma seção".

| # | Seção | Função narrativa | Como recebe a anterior |
|---|---|---|---|
| 1 | **Hero** | *A aparição.* Estabelece presença. Diz apenas quem é. | — |
| 2 | **Sobre** | *O dossiê.* O rosto ganha ficha, história e voz. **É o carro-chefe.** | O escuro abre para a luz — acender a sala depois do trailer |
| 3 | **Trabalhos** | *A prova.* A história ganha evidência verificável. | Continuidade luminosa, um degrau de profundidade a mais |
| 4 | **Galeria** | *O corpo em cena.* Volta ao registro visual, agora como repertório. | O escuro retorna — a sala apaga para projetar |
| 5 | **Contato** | *O convite.* Fecha o círculo e chama para a ação. | Permanece no escuro; fecha com a autoridade da abertura |

## 2.1 Narrativa emocional por seção

- **Hero** — impacto imediato, presença. Retrato full-bleed escurecido, tipografia grande, silêncio ao redor. Nada compete com o rosto e o nome. A referência `design-references/editorial-v2.webp` guiou **organização tipográfica, hierarquia, tracking, alinhamento e uso de cor no nome** — nunca a estrutura da fotografia. Elementos do mockup (laptop, celular, mesa de pedra, brilho ambiente) nunca fizeram parte do design.
- **Sobre** — **o documento de trabalho.** Deixa de ser "um texto sobre uma pessoa" e passa a ser o dossiê que o diretor de elenco levaria impresso para a sala de audição: declaração em primeira pessoa, placa fotográfica de arquivo, ficha técnica, biografia, formação, habilidades e representação, em bandas separadas por fios de largura total. É a seção mais longa e densa da página.
- **Trabalhos** — credibilidade profissional. Lista editorial vertical inspirada em programas de teatro: ano, título e categoria sempre visíveis; papel, direção, companhia, local e descrição revelados sob demanda. **É a seção mais autoral do projeto e sua estrutura não deve ser refeita.**
- **Galeria** — ensaio fotográfico, não visualizador de arquivos. Palco editorial (imagem principal grande + miniaturas de navegação), nunca grade genérica nem carrossel de biblioteca. A caixa se adapta ao enquadramento de cada foto, nunca o contrário.
- **Reel** — **encerramento da Galeria**, não abertura nem seção própria. É a passagem das imagens estáticas para o ator em movimento, imediatamente antes do convite de contato.
- **Contato** — direto e sóbrio, com presença. Sem formulários; apenas os canais certos.

## 2.2 Hierarquia tipográfica da página

Consequência de Sobre ter virado carro-chefe. Verificável em pixels:

| Posição | Elemento | Escala máxima |
|---|---|---|
| 1º | Nome na Hero (H1) | **80px** |
| 2º | Declaração de Sobre | **60px** |
| 3º | Declaração do Contato (H2) | **48px** |
| 4º | Títulos de item em Trabalhos | **28px** |

Sobre não vence a Hero em tamanho — **vence em permanência**. É a seção mais longa, mais densa e a única que o visitante volta a consultar.

---

# 3. Cores

Nenhuma cor nova pode ser introduzida.

**Modo claro** (Sobre, Trabalhos):

| Token | Hex | Uso |
|---|---|---|
| `background` | `#FAF9F6` | Fundo de seção |
| `foreground` | `#171614` | Texto principal |
| `muted-foreground` | `#6B675F` | Texto secundário, rótulos, legendas |
| `border` | `#E4E1DA` | Divisores, bordas sutis |
| `accent` | `#8A6D4E` | Links, hover, foco, estado ativo, sublinhados — **uso esparso, nunca como fundo grande** |

**Modo escuro** (Hero, Galeria, Contato, Footer), aplicado pela classe `.section-dark`:

| Token | Hex | Uso |
|---|---|---|
| `background` | `#111110` | Fundo de seção |
| `foreground` | `#FAF9F6` | Texto principal |
| `muted-foreground` | `#8F8B83` | Texto secundário. **5.57:1** sobre `#111110`. |
| `border` | derivado por `color-mix` | Fios estruturais |
| `accent` | `#8A6D4E` | Mesmo acento, mantém identidade entre seções |

**`--muted-foreground` no escuro é um valor explícito, não um `color-mix`.** O token nunca havia sido redefinido para fundos escuros e herdava o valor calibrado para fundo claro (`#6B675F`), caindo para 3.35:1 — abaixo do mínimo AA. Qualquer consumidor de `text-muted-foreground` dentro de `.section-dark` passa a usar `#8F8B83` automaticamente.

## 3.1 Restrições de cor

- **Sem `--accent-muted`**: usos discretos do acento se resolvem com opacidade nativa do Tailwind (`accent/6`, `accent/10`). Um segundo tom só se justifica se for **reutilizável em múltiplas seções** — nunca com escopo de uma seção só.
- **O acento nunca é cor de texto sobre fundo escuro** (mede 3.94:1 sobre `#111110`) nem sobre `--surface` (4.25:1). Nesses contextos o sinal vira um filete/borda, que precisa apenas de 3:1 como componente de UI. Sobre `--background` (`#FAF9F6`) ele mede **4.56:1** e pode ser texto.
- **Gradientes decorativos são proibidos.** O único gradiente permitido é funcional: o overlay vertical de legibilidade sobre a fotografia da Hero (preto 30–50%, nunca cor do acento). Gradientes **laterais** sobre fotografia foram testados e rejeitados.

## 3.2 Superfícies

Profundidade entre seções claras é criada **apenas** por passos de luminosidade dentro do mesmo matiz — nunca por cor nova, gradiente, vinheta, textura ou sombra.

| Token | Hex | Uso |
|---|---|---|
| `surface` | `#F3F1EB` | Primeiro passo de profundidade (Trabalhos) |
| `surface-muted` | `#ECE9E2` | Segundo passo — **sem consumidor hoje**; mantido como passo válido da escala |

---

# 4. Tipografia

Direção "Cinematográfico Contemporâneo".

- **Display/headlines**: **Newsreader Variable** (serifada literária, eixo de peso + eixo ótico), self-hosted via `@fontsource-variable/newsreader` (build `standard.css`, que inclui o `opsz`). Peso **500** em todos os títulos — a família não usa 600, fica pesada demais para o tom pretendido.
- **Corpo/UI**: **Manrope Variable** (grotesca contemporânea), self-hosted. Pesos: 400 (corpo/UI), 500 (labels/botões), 600 (reservado, sem uso atual).
- **Itálico**: recurso opcional, nunca padrão de nenhum elemento. Não é pré-carregado — importar `standard-italic.css` só quando um uso pontual for aprovado.

## 4.1 As duas vozes (vocabulário obrigatório)

Toda decisão de tipografia começa identificando em qual voz o texto se enquadra:

| Voz | Família | Tratamento | Onde |
|---|---|---|---|
| **Display** | Newsreader | Peso 500, entrelinha fechada, sem caixa alta | Nome na Hero, declaração de Sobre, títulos de seção, títulos de item em Trabalhos, declaração do Contato, wordmark do Footer |
| **Metadado** | Manrope | **Caixa alta + `tracking-meta`**, tamanho pequeno | Subtítulo da Hero, sobrancelha e rótulos de Sobre, anos e categorias em Trabalhos, contador e rótulo do Reel na Galeria, rótulos de canal no Contato, créditos do Footer |
| *(corpo)* | Manrope | Caixa normal, entrelinha ~1.65 | Biografia, descrições de trabalho — texto para ler, não para escanear |

A voz do metadado foi estabelecida pelo subtítulo da Hero e é a voz única de toda informação secundária/estrutural do site. É o que faz um ano em Trabalhos e um rótulo de contato pertencerem visivelmente à mesma página.

## 4.2 Escala

Todos os tokens vivem em `@theme inline` (`src/index.css`).

| Token | Valor | Consumidor |
|---|---|---|
| `--text-h1` | `clamp(2.75rem, 2rem + 5vw, 5rem)` | Nome na Hero |
| `--text-h2` | `clamp(1.75rem, 3.5vw, 3rem)` | Título de seção; declaração do Contato |
| `--text-h3` | `clamp(1.125rem, 1.5vw, 1.5rem)` | Rubrica genérica de subtítulo — **sem consumidor hoje**, reservada |
| `--text-statement` | `clamp(1.75rem, 3.6vw + 0.5rem, 3.75rem)` | **Exclusivo da declaração de Sobre** |
| `--text-list-title` | `clamp(1.25rem, 2.2vw, 1.75rem)` | Título de item de lista editorial (Trabalhos) |
| `--text-hero-tagline` | `clamp(1.125rem, 1.9vw, 1.375rem)` | Tagline da Hero |
| `--tracking-meta` | `0.15em` | Voz do metadado |

- Corpo de prosa: `1rem`–`1.125rem`. Legenda/meta: `0.875rem`. Rótulos: `0.75rem`.
- Line-height: 1.15 em H1; 1.2 em H2/H3; 1.05 na declaração de Sobre; **~1.65 em parágrafos de prosa** — aplicado só nesses parágrafos, nunca em elementos de UI que também usam `text-base`/`text-sm`.
- Letter-spacing: `-0.015em` em H1/H2/declaração; `0.005em` em prosa; normal em UI/rótulos.

### Três regras de escala aprendidas por defeito

Cada uma nasceu de um bug real e existe para não se repetir:

1. **Um valor fixo ao lado de um `clamp()` é uma armadilha silenciosa.** Parece correto na largura em que foi calibrado a olho e quebra nas outras. Qualquer elemento que acompanhe visualmente um título fluido precisa **ou ser fluido também, ou ter sua proporção verificada em 2–3 larguras**. Origem: a tagline da Hero usava dois valores fixos ao lado de um H1 fluido, e a razão H1:tagline ia de ~2.5x em mobile a ~4.4x em desktop sozinha.

2. **Espaçamento vertical junto de tipografia fluida deve escalar junto** (ainda que em degraus, sem precisar de `clamp()`). Origem: `gap-4` fixo entre nome e tagline representava ~40% da altura do H1 em mobile e ~17% em desktop.

3. **Um `clamp()` cujo termo `vw` só ultrapassa o piso em larguras grandes é, na prática, um valor fixo.** `--text-h3` fica achatado em 18px abaixo de 1200px de viewport — ou seja, em quase todo mobile, tablet e desktop comum ele nunca chega a ser maior que o corpo de texto. Por isso Trabalhos ganhou `--text-list-title` próprio em vez de alargar `--text-h3`: **papéis tipográficos diferentes não compartilham token só porque coincidem em valor.** Antes de reaproveitar `--text-h3`, confirmar que o papel é mesmo "subtítulo de prosa", não "título de item de lista".

---

# 5. Espaçamento, grid e composição

- Grid de 12 colunas, `max-width` de conteúdo **1440px**, padding lateral responsivo: `1.5rem` mobile, `2.5rem` tablet, `4rem` desktop.
- Breakpoints: mobile `<640px`, tablet `640–1024px`, desktop `>1024px`.
- Padding vertical de seção: `4rem` mobile, `6rem` tablet, `8rem` desktop — consistente em todas as seções, sem variação arbitrária.

## 5.1 A espinha — regra estrutural

O container é **idêntico** em Navbar, Hero e em todas as seções:

```
mx-auto  +  max-w-[1440px]  +  px-6 sm:px-10 lg:px-16
```

**Os três elementos são obrigatórios juntos.** Omitir `mx-auto max-w-[1440px]` e manter só o padding **parece correto até 1440px e quebra acima disso** — o conteúdo cola na borda real da viewport enquanto a Navbar continua centralizada. Foi exatamente esse o defeito encontrado na Hero. **Toda seção nova deve ser verificada acima de 1440px**, não só nos breakpoints padrão.

## 5.2 Arestas, sombras e divisores

Vocabulário de impresso, não de interface de aplicativo:

- **Cantos**: retos. Sem `rounded-*` em fotografias, contêineres de seção ou blocos de conteúdo. *Exceção*: controles de terceiros já instalados (switch do toggle de idioma) mantêm seu raio próprio — são controles, não superfície editorial.
- **Sombras**: nenhuma. Profundidade vem de luminosidade de superfície.
- **Divisores**: fios de 1px na cor `border` do tema vigente. Nunca 2px, nunca tracejado, nunca duplo.
- **Fotografias**: assentam diretamente sobre o fundo, sem moldura, borda ou cartão.

---

# 6. Princípios de imagem

- **Nenhum arquivo em `public/assets/` é editado.** As fotografias são materiais reais e definitivos do ator; todo tratamento é CSS sobre a imagem intacta (`object-position`, `brightness`, `grayscale`), nunca recorte, conversão ou reprocessamento do arquivo.
- **Fotografia nunca é animada**: sem zoom contínuo, Ken Burns ou parallax. Ela é o frame fixo sobre o qual o conteúdo chega.
- Fotografias assentam diretamente sobre o fundo, sem moldura, borda, canto arredondado ou sombra.

## 6.1 Os três tratamentos, e apenas três

| Tratamento | Onde | Por quê |
|---|---|---|
| **Cor, escurecida** (`brightness-50`) | Hero | A foto é fundo; o escurecimento é o único recurso de contraste/atmosfera da seção |
| **Cor plena** | Galeria, pôster do Reel | A foto é o conteúdo. Material de casting depende de cor fiel |
| **Escala de cinza** (`grayscale(1) contrast(1.06)`) | **Apenas a placa de Sobre** | A foto é um *documento*, não uma imagem |

**Por que a escala de cinza existe e é restrita a um lugar.** Todo o material fotográfico do ator foi feito em estúdio sobre fundo frio (matiz 221–264°); a superfície de Sobre é quente (45°). Tentativas de **aproximar** o fundo da foto da cor da página falharam por medição: o canal vermelho da pele (186) está *acima* do canal mais escuro do fundo (182), então nenhuma curva tonal global separa os dois — 93 combinações de `brightness`/`contrast` foram varridas, e toda curva que leva o fundo ao branco leva o rosto junto. A escala de cinza **não tenta casar**: ela declara a foto como documento, e cinza neutro sobre papel quente é um par legítimo de impresso.

**Regra a preservar**: correção cromática de fotografia **nunca é validada por média de amostra** — só por inspeção da imagem inteira, e **o critério de reprovação é sempre o sujeito, nunca o fundo.** Se o rosto perde presença, o tratamento está reprovado mesmo que o fundo tenha "casado".

---

# 7. Motion

Convenção única, obrigatória em toda animação do site. Nenhuma seção define seu próprio ritmo.

| Token | Valor | Uso |
|---|---|---|
| `--motion-ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | Easing único de todo o site — desaceleração pronunciada, sem bounce nem overshoot |
| `--motion-duration` | `400ms` | Revelações de conteúdo (macro) |
| `--motion-duration-fast` | `200ms` | Micro-interações: hover, foco, mudança de estado |

## 7.1 Princípios

- Toda animação existe para **revelar conteúdo ou dar feedback** — nunca decorativa ou contínua. Sem loops, sem autoplay de movimento.
- Intensidade contida: deslocamentos no máximo **~8px**, zoom no máximo `scale(1.04)`, sempre combinados com `opacity` — nunca só `transform`.
- Escalonamento usa os **próprios tokens como valores de atraso** (0 / 200ms / 400ms), em vez de inventar uma constante de intervalo nova.
- Revelações que precisam animar entrada **e saída** (Radix Collapsible/Accordion) usam `@keyframes` referenciando os tokens — `transition` sozinha não anima o desmonte.
- `prefers-reduced-motion: reduce` remove a animação ou troca por uma transição instantânea. **Nunca deixa o usuário sem indicação de mudança de estado.**
- **Nenhuma animação carrega informação.** Se todo o motion for removido, nada é perdido.

## 7.2 A chegada da Hero

Nome, tagline, CTA e indicador de scroll surgem uma única vez ao carregar: fade + deslocamento vertical de 4px (menor que o padrão — aqui o foco é o easing, não a distância), escalonados em 0 / 140ms / 280ms, com duração própria de **1000ms**.

A duração é maior que `--motion-duration` porque este é um evento **único por visita**, diferente das revelações por interação repetida de Trabalhos e Galeria. Depois da chegada, **nenhum elemento da Hero permanece animado**. O indicador de scroll deixou de usar `animate-bounce` (fora do vocabulário do site): participa da chegada e depois fica estático.

## 7.3 Scroll reveal — a exceção única

**Regra geral: seções não animam ao entrar na viewport.** Três razões: (a) a fronteira entre "revelar conteúdo" e "decorar" fica indefensável quando todo bloco anima; (b) é o efeito mais associado a template genérico de portfólio; (c) se tudo tem chegada, a chegada da Hero deixa de ser especial.

**A exceção é a seção Sobre, e apenas ela**, por decisão explícita de Lead ao promovê-la a carro-chefe. É a única seção que se anuncia. A narrativa do movimento é *o dossiê sendo montado sobre a mesa*: primeiro a pauta é traçada, depois a folha assenta.

| # | Elemento | De → Para | Duração | Atraso |
|---|---|---|---|---|
| 1 | Sobrancelha + declaração | `opacity 0`, `translateY 6px` → estado final | 400ms | 0 |
| 2 | Placa | idem | 400ms | 200ms |
| 3 | Fio da banda | `scaleX(0)` → `scaleX(1)`, origem à esquerda | 400ms | 0 |
| 4 | Conteúdo da banda | `opacity 0`, `translateY 6px` → estado final | 400ms | 200ms |

- Cada banda anima quando **ela** entra na viewport; não há escalonamento entre bandas (escalonar bandas já visíveis produz espera artificial).
- Cada revelação acontece **uma vez por visita** e não re-anima.
- O fio é um elemento próprio, não `border-t` da banda: largura de borda não é animável de forma composta pela GPU.
- Sob `prefers-reduced-motion`, **todos os beats são desligados** — tudo já no estado final, sem fade de substituição (não há mudança de estado a comunicar).

## 7.4 Interações

| Interação | Comportamento | Duração |
|---|---|---|
| Hover em imagem/card clicável | Zoom leve `scale(1.02–1.04)` | 200ms |
| Hover em link de texto | Sublinhado ou filete; cor `accent` **apenas onde o contraste permite** (ver 3.1) | 200ms |
| **Placa de Sobre, ponteiro fino** | `grayscale(1)` → `grayscale(0.1)` — *o documento vira pessoa* | 400ms |
| Foco | `FOCUS_RING`: contorno `accent` 2px, offset 2px, nunca cortando o texto | Instantâneo |
| Item ativo/aberto | Fundo `accent` 10–15% ou borda `accent` — **nunca só mudança de peso de fonte** | 200ms |

O beat da placa é enriquecimento puro, sob `@media (hover: hover)` (o variante `hover:` do Tailwind já compila assim). Em toque a placa permanece estática — **não criar equivalente de toque**: um tap na foto seria um alvo interativo sem ação.

---

# 8. Specs por seção

## Navbar

- Fixa. Transparente (texto claro) sobre o Hero; ao rolar além dele, transiciona para `background` sólido + `border-bottom` de 1px, texto passa a `foreground`.
- O limiar é **medido ao vivo** (`getBoundingClientRect` sobre o elemento Hero), nunca uma altura fixa — robusto a navegação por âncora e a diferenças de conteúdo entre idiomas.
- Menu mobile via `Sheet`. Toggle de idioma: `Switch` de dois estados com `aria-label` descrevendo idioma atual e ação.
- Links âncora: Sobre, Trabalhos, Galeria, Contato — scroll suave via `src/lib/scroll.ts`, sem alterar a URL.
- **Regra a preservar**: qualquer pedido de "dar mais presença" à Navbar se resolve por tipografia (peso, tracking, cor) antes de se cogitar tamanho/altura. Aumentar a Navbar é mudança estrutural e volta para decisão de Lead.

## Hero — padrão de referência

- **Fotografia**: retrato full-bleed único, cobrindo a seção inteira em todos os breakpoints, escurecido por `brightness-50` aplicado direto na imagem.
- **Enquadramento**: `object-position: 65% center` abaixo de `sm` (a foto é paisagem, 1672×941, bem mais larga que qualquer viewport de celular), centro padrão a partir daí.
- **Overlay**: um único gradiente vertical para legibilidade do texto no terço inferior.
- **Bloco de conteúdo**: ancorado no terço inferior, alinhado à esquerda, no container padrão. Nome → subtítulo → CTA.
- **Nome (H1)**: duas linhas, `leading-[0.9]`. A segunda linha usa `--accent` — é a aparição única de acento da seção e o gesto de assinatura do projeto.
- **Subtítulo**: voz do metadado, largura de leitura limitada.
- **CTA**: `Button` `variant="outline"` com altura/padding ampliados via `className` — sem criar variante nova. Texto em `--foreground` (não no acento): evita depender do acento para contraste de texto normal; borda e hover usam acento, onde o requisito é 3:1.
- **Espaçamento nome→tagline**: `gap-4 sm:gap-5 lg:gap-6`, nunca fixo.
- **Indicador de scroll**: centralizado na viewport — exceção justificada (é indicador, não conteúdo estrutural).

## Sobre — "O Dossiê"

**Objetivo**: ser o documento de trabalho que o diretor de elenco levaria para a sala. É a seção mais longa e densa da página.

**Os quatro dispositivos**, em ordem de importância:

1. **A ficha antes da prosa.** O recrutador escaneia primeiro e lê depois — a ficha técnica sobe para logo abaixo da declaração e a biografia desce. Maior impacto funcional do plano, custo zero em pixel.
2. **A placa fotográfica quadrada em escala de cinza.** Pequena (máx. `20rem`), à direita da declaração, sem legenda e sem moldura. O quadrado é o formato mais arquivístico que existe — quadro de prova de contato, chapa de identificação — e é o oposto do enquadramento de retrato de vaidade. **A leitura de documento vem da forma e do tratamento, nunca de um rótulo escrito.**
3. **A pauta de largura total.** Fios de 1px atravessando **todo o container**, não só a coluna de texto. É o dispositivo que transforma "coluna de conteúdo" em "página de documento" — não reduzir de volta ao escopo da coluna.
4. **O salto de escala.** Rótulo de 12px em caixa alta ↔ declaração de até 60px em display.

**Estrutura**: abertura (sobrancelha + declaração + placa), quatro bandas — Ficha técnica, Biografia (sem rótulo), Formação, Representação — e a assinatura como fecho. A banda de Habilidades entra automaticamente quando houver dados.

| Elemento | Spec |
|---|---|
| Sobrancelha | Voz do metadado. Reaproveita `nav.links.about` — nenhuma chave de i18n nova |
| **Declaração** | É o `<h2>` da seção — **não existe título "Sobre" em display**. `--text-statement`, `max-w-[42rem]`, entrelinha 1.05 |
| Acento | As primeiras palavras da declaração — aparição única da seção. Rima com a Hero: lá o sobrenome (quem é), aqui a vocação (o que faz) |
| Placa | `aspect-square`, `object-[50%_22%]`, `grayscale contrast-[1.06]`, `20rem`/`16rem`/`15rem` por breakpoint. Alinhada à esquerda no mobile, nunca centralizada |
| Duas verticais | Espinha (rótulos, `10rem` em `sm:`, `12rem` em `lg:`) e vertical do conteúdo. Toda banda obedece às duas |
| Rótulos de banda | `<h3>` estilizado na voz do metadado — o nível é semântica (navegação por leitor de tela), não tamanho |
| Ficha técnica | `<dl>` real, grade de 1/2/3 colunas. **Campo sem valor não renderiza** — nem rótulo órfão, nem traço, nem "[a definir]" |
| Biografia | Dois parágrafos, `max-w-prose`, **sem rótulo** — rotular a prosa a rebaixaria a mais um campo de ficha |
| Formação | `{ title, mentors }[]` renderizado como `ul`/`li`. Grade de 2 colunas em `lg:` — **`grid`, nunca `columns-2`** |
| **Assinatura** | Manuscrita, vetorizada a partir do original do ator. `w-[clamp(200px,22vw,300px)]`, `text-foreground` (tinta, não acento), alinhada à direita, `mt-14` após o fio de fechamento da última banda |

**Assinatura — o fecho do dossiê.** O bloco de abertura é a única coisa da seção que ignora as duas verticais e rompe para a esquerda; a assinatura é a única outra exceção, e rompe para a direita — a seção abre e fecha com a mesma licença compositiva, nas duas pontas, nunca no meio.

- **Cor**: `--foreground`, nunca `--accent`. Dois motivos convergem: a aparição única de acento da seção já foi gasta em "A atuação" (abertura); e uma assinatura de verdade é feita de tinta, não de folha de ouro — script dourado sobre papel leria como convite, não como documento assinado.
- **Por que ela e não uma logo**: uma logo identifica; uma assinatura *endossa* — "eu respondo por isto". Sobre é a única seção do site sem nenhuma enunciação do nome do ator em texto (a bio fala em "eu", nunca se identifica); a assinatura é a primeira vez que ele diz o próprio nome no carro-chefe do site, e diz com a mão.
- **Onde não vai**: Navbar (abaixo de ~260px o traço serrilha; e cursiva em cabeçalho fixo lê como papelaria de casamento, não casting), Hero (o nome em 80px já é a declaração de identidade — duplicar é gaguejar), Footer (o wordmark ali é link de "voltar ao topo"; assinatura como controle de navegação está semanticamente errado).
- **Motion**: reveal próprio (mesmo `useReveal` de toda banda — fade + 6px, mesmo par duração/easing), nunca um ritmo novo. **Proibido animar o traçado como se estivesse sendo escrito** — é o efeito óbvio para SVG de assinatura e é exatamente o que a seção 1.2 proíbe: "qualquer elemento que pareça efeito antes de parecer composição está errado". Uma assinatura que se desenha sozinha diz "olha meu CSS"; uma que simplesmente está lá diz "eu assinei isto".
- **Implementação**: `src/components/sections/About.tsx`, componente local `Signature` — embutida como JSX (não `<img>`) porque precisa herdar `currentColor`. Path vetorizado por script próprio sobre o canal alfa do PNG original (ferramentas automáticas de vetorização travavam no ambiente); ver comentário do componente para o processo completo.

**Por que a declaração é o `<h2>`**: um `<h2>` "Sobre" acima de uma declaração maior seria um elemento subordinado com mais peso visual que seu próprio título. As duas seções em que o ator **fala** (Sobre, Contato) abrem com declaração; as duas que **catalogam** (Trabalhos, Galeria) abrem com rótulo.

**Por que `grid` e nunca `columns-2`**: multi-coluna CSS balanceia por altura, e a altura muda entre PT e EN — a ordem visual deixa de bater com a ordem do DOM. A grade é determinística.

**Regra a preservar**: um campo cujo valor seja uma **enumeração** recebe estrutura de lista e tipo de dado próprio; nunca um ajuste de tamanho de fonte sobre uma string concatenada. Ajuste tipográfico só resolve campo-outlier que seja realmente prosa.

**Evitar nesta seção**: rótulo na bio; centralização; ícones decorativos; cartões; numeração de itens; segundo uso de acento; **qualquer dado de filmografia** (ver 10, R-02).

## Trabalhos

**Estrutura preservada — não refazer.**

- Lista editorial vertical, sem filtros e sem categorias, inspirada em programas de teatro. Um único componente para todos os breakpoints (não colapsa para cards).
- **Estado fechado**: ano à esquerda (voz do metadado), título em destaque (`--text-list-title`), categoria discreta à direita. Em mobile a categoria desce para uma segunda linha via grid — **nunca é ocultada** (é informação real, não decorativa). Separador `border-b` entre itens.
- **Estado expandido**: mostra apenas os campos existentes no dado. Nenhum campo vazio é renderizado.
- Implementado sobre a primitiva `Accordion` do `radix-ui` (`type="single" collapsible`): `Trigger`/`Content` já fornecem `button`, `aria-expanded` e `aria-controls` — **não reimplementar esse comportamento manualmente**.
- **Revelação em cortina**: máscara horizontal (`clip-path: inset()`) lembrando a abertura de uma cortina. Exige `@keyframes`, não apenas `transition`.
- Sinal de hover: filete sob o título (`decoration-*` + `group-hover`), **não** troca de cor de texto — o acento sobre `--surface` mede 4.25:1. `cursor-pointer` supre o feedback de interatividade.
- `src/data/work.ts` está preparado para `theater | film | tv | advertising | voice`, mas a UI nunca mostra filtro nem categoria sem itens — a lista é sempre `dado.map(...)`, nunca uma grade fixa de categorias.
- **Evitar**: converter em cards; imagens de capa por item; filtros ou abas; qualquer coisa que quebre a leitura em lista corrida.

## Galeria

**Mecânica preservada — não refazer.**

- Palco editorial: uma imagem principal grande (`object-contain`, **nunca corta cabeça/braços/corpo** — a caixa se adapta à foto, nunca o contrário) + miniaturas de navegação (`object-cover`; só miniaturas podem cortar). Coluna vertical no desktop, faixa horizontal rolável no mobile.
- **Sem cromo**: sem cantos arredondados, sem sombra, sem borda em volta do palco. A fotografia assenta direto sobre o fundo escuro, como projeção.
- Com o cromo removido, a **borda `accent` da miniatura ativa** é o sinal visual dominante e a aparição única de acento da seção.
- Miniatura ativa indicada por **três sinais simultâneos**: opacidade cheia, borda `accent` e `aria-current="true"`. A rolagem nunca esconde permanentemente a ativa.
- Contador discreto (`aria-hidden`) e setas anterior/próxima ao lado do palco.
- **Lightbox**: `Dialog` do shadcn reaproveitado — `object-contain`, setas e `ArrowLeft`/`ArrowRight` sincronizadas com o palco, `Esc` fecha, focus trap, foco devolvido ao elemento que abriu.
- `thumbnailPosition` (opcional, por foto) ajusta só o recorte da miniatura, nunca da imagem principal.
- A largura do wrapper da coluna de miniaturas é `6rem` **+ a largura real da scrollbar, medida em runtime** — nunca um valor fixo assumido, já que varia por navegador/SO e é `0` em scrollbars overlay.
- **Evitar**: qualquer moldura; grade de fotos; legendas sobre a imagem; zoom em hover no palco.

## Reel

- **Posição**: último movimento da Galeria — não abertura, não seção própria.
- Separado das fotografias por um único fio estrutural, anunciado só pelo rótulo "REEL" na voz do metadado — sem H3 nem frase editorial.
- Pôster estático com botão de play centralizado (centralização justificada: é um controle). Mesmo acabamento do palco: sem borda, canto arredondado ou sombra.
- **Sem `max-w-*`**: qualquer teto fixo deixa uma sobra lateral que lê como "espaço reservado para mais conteúdo". `w-full` já é contido pela espinha da seção.
- O `<iframe>` só é montado após o clique. Nunca autoplay, nunca som automático. Sem embed real (`status: 'pending'`), nenhum elemento interativo e nenhum `<iframe>` são montados.

## Contato

- **Paleta escura**, aderindo à espinha — abandonou a centralização genérica anterior (título centralizado + três itens com ícone é o layout padrão de qualquer template gratuito).
- Composição: **declaração editorial** curta na voz display (`--text-h2`, 2/3 da largura em `lg:`) + canais listados em coluna (1/3, `justify-self-end`), com rótulos na voz do metadado. `items-baseline` alinha a primeira linha de base da declaração com a do primeiro canal — alinhar pelo topo os deixaria desencontrados, já que 48px e 14px têm ascendentes muito diferentes.
- A quebra em duas linhas da declaração só se aplica a partir de `sm:`; em mobile o texto flui e quebra naturalmente.
- Canais mantêm ícone + texto visível — nunca ícone sozinho sem `aria-label` e texto acessível.
- Padding vertical reduzido em relação ao `SECTION_SHELL` padrão: a seção ocupava 60% da viewport para três canais.
- **Evitar**: centralização do bloco principal; grade de cards; formulário; ícones grandes; qualquer sensação de "rodapé de contato".

## Footer

- **Paleta escura**, contínua com o Contato, separado dele por um único `border-t` — o fio resolve para o `--border` de `.section-dark`, mais visível que o claro.
- Encerramento discreto, **não uma sexta seção**: uma única linha, altura mínima.
- **Wordmark à esquerda**, fechando o loop com a Navbar — a página termina dizendo o mesmo nome com que começou. `text-base` e não `text-lg`: é eco, não repetição.
- Crédito de desenvolvimento e "voltar ao topo" à direita, na voz do metadado. O acento nunca é cor de texto aqui — só um filete sob o link. `py-1` amplia a área de toque acima de 24px sem alterar o tamanho do texto.
- **Evitar**: virar seção de conteúdo; múltiplas colunas de links; repetir os canais de contato.

---

# 9. Acessibilidade

- **Contraste AA** em todas as combinações: 4.5:1 para texto normal, 3:1 para texto grande e componentes de UI. Medido com ferramenta, **nunca assumido**.
- Toda ação só-ícone tem `aria-label` descritivo — nunca genérico como "botão".
- Navegação 100% por teclado, incluindo lightbox, accordion de Trabalhos e toggle de idioma.
- Hierarquia de headings coerente, sem nível pulado.
- `prefers-reduced-motion: reduce` remove ou reduz toda animação de entrada, zoom de hover e revelação em cortina.
- `lang` do `<html>` reflete o idioma ativo dinamicamente.
- `scroll-mt-16` nas seções evita conteúdo escondido atrás da Navbar fixa.
- Imagens sempre com `alt` descritivo — descrever o que a foto mostra, nunca "placeholder". Imagem puramente decorativa (retrato da Hero) usa `alt=""`.
- **Conteúdo nunca depende de animação para existir.**

---

# 10. Decisões registradas — não reabrir sem decisão nova

Cada item abaixo foi implementado, avaliado e revertido. Reabrir exige decisão explícita de Lead, não ajuste de implementação.

| # | O que foi testado | Por que foi rejeitado |
|---|---|---|
| **H-01** | Hero em duas colunas (foto ocupando 45–55%) | Produzia divisão visível entre "coluna escura" e "fotografia" |
| **H-02** | Fusão da foto da Hero com o fundo por gradiente lateral | Chegou a interceptar o braço do ator com um degradê evidente — o oposto do efeito pretendido |
| **H-03** | `mask-image` na Hero | Complexidade sem ganho perceptível |
| **H-04** | Glow radial da Hero | Testado e removido: efeito antes de composição |
| **H-05** | Monograma "LC" | A composição aprovada provou não precisar dele |
| **H-06** | `tracking-[0.02em]` no wordmark da Navbar | Sem confirmação visual de ganho perceptível; revertido |
| **S-01** | Retrato de Sobre com correção cromática (`saturate`/`sepia`) e sangria à direita | A correção calibrada pelo fundo empalideceu o rosto; ampliar um headshot de casting o torna dominante, não integrado. Substituído pela placa quadrada em escala de cinza (ver 6.1) |
| **S-02** | Sobre sem fotografia nenhuma | Vigorou por uma etapa. Revertido quando Sobre virou carro-chefe: o dossiê tem um rosto |
| **R-01** | Legenda catalográfica sob a placa ("PL. 01 — RETRATO DE ESTÚDIO") | Removida por decisão de Lead. A leitura documental passou a vir da forma (placa quadrada), não de um rótulo escrito |
| **R-02** | Recorte de repertório em Sobre (3 papéis + link para Trabalhos) | Implementado e validado no navegador; as mesmas linhas reapareciam idênticas ~600px abaixo, na seção Trabalhos adjacente. **O dossiê descreve o ator; o catálogo lista o trabalho.** |
| **G-01** | Grade de fotos na Galeria | As fotografias reais são majoritariamente verticais; a grade cortava enquadramento |
| **G-02** | `max-w-*` no Reel (`2xl`, `3xl`, `4xl`) | O problema não era o valor do teto, era ter um teto — toda sobra lateral lia como espaço vazio reservado |
| **C-01** | Contato centralizado com ícones grandes | Era o layout padrão de qualquer template gratuito e a única seção que quebrava a espinha |
| **N-01** | Numeração de seções (`01`, `02`…) e de itens de lista | Soa gimmick |

## 10.1 Divergências resolvidas nesta compilação

Registradas porque o texto anterior afirmava o contrário do que o site faz:

| Afirmação antiga | Verdade atual |
|---|---|
| "Sobre é uma seção puramente tipográfica, sem fotografia" | Sobre tem a placa quadrada em escala de cinza (6.1, seção 8) |
| "A direção de preto-e-branco foi abandonada" | A escala de cinza existe, restrita à placa de Sobre |
| "Sem scroll reveal — nenhuma seção anima ao entrar na viewport" | Vale para todas as seções **exceto Sobre**, exceção justificada em 7.3 |
| "A declaração de Sobre nunca passa de `--text-h2`" | Usa `--text-statement` (teto 60px) desde a promoção a carro-chefe (2.2) |
| "Contato é o segundo momento mais forte da página" | É o terceiro em escala; Sobre é o segundo (2.2) |
| "Contato e Footer ainda não implementados" | Ambos implementados na paleta escura |
| "Pendência: cromo antigo no pôster do Reel" | Resolvida junto do reposicionamento do Reel |
| "Etapas 4–8 pendentes/em andamento" | Todas concluídas — ver `implementation.md` |
