# Design Direction — Lucas Calzoni Landing Page

Direção visual e narrativa de UX. Os tokens concretos e implementáveis (cores, tipografia, specs de componente) estão em `design-system.md` — este documento explica o *porquê* por trás deles, para que o Lead (e qualquer revisor) possa avaliar se uma implementação está fiel à intenção, não só aos números.

## Direção visual

**Editorial minimalista** com tom cinematográfico. A sensação-alvo é a de um programa de teatro impresso em papel bom: silencioso, confiante, sem urgência — o oposto de uma landing page que tenta vender algo.

**A Hero implementada e aprovada é o padrão de referência definitivo do projeto.** Toda decisão visual nas demais seções existe para confirmá-la, nunca para competir com ela. Quando houver dúvida sobre um tratamento, a pergunta correta é "isto reforça a Hero ou disputa atenção com ela?".

### DNA estabelecido pela Hero

O que a Hero fixou e que passa a valer para o site inteiro:

| Elemento | Valor estabelecido |
|---|---|
| Container | `max-w-[1440px]` centralizado + padding lateral responsivo (idêntico ao da Navbar) |
| Alinhamento | Esquerda, na espinha (ver princípio 1) |
| Display | `font-display`, entrelinha fechada, peso 500 |
| Cor de destaque | Uma única aparição — a segunda linha do nome |
| Voz secundária | Caixa alta + tracking aberto |
| Ação | Contorno fino, sem preenchimento |
| Cantos e sombras | Retos; nenhuma sombra |
| Motion | Chegada única, escalonada, executada uma vez |
| Fotografia | Full-bleed, escurecida por `brightness`, nunca animada |

### Princípios (regras do projeto)

**1. A espinha.** Existe uma linha vertical invisível na página: a coordenada onde começam o wordmark da Navbar e o nome na Hero. **Todo título de seção e todo bloco estrutural nasce nessa linha.** É o dispositivo mais forte de unidade do projeto — mais do que cor ou tipografia.
*Exceção justificada*: elementos pontuais podem ser centralizados quando houver razão funcional ou compositiva — indicadores, controles de navegação, contadores, setas, conteúdo de modal. A regra vale para a estrutura (títulos, blocos de conteúdo, colunas), não para cada elemento isolado dentro dela.

**2. O acento é assinatura, não decoração.** A Hero usa a cor de destaque exatamente uma vez. Padrão forte: **uma aparição de acento por seção**, sempre no elemento mais importante dela. Se o acento se repete, deixa de significar algo. Nunca em texto corrido. Exceções exigem justificativa compositiva explícita (ex.: um estado de interação que já usa acento por convenção de acessibilidade — foco, item ativo — não conta como a "aparição decorativa" da seção).

**3. Duas vozes tipográficas, nunca três.** A serifada fala apenas em títulos e nomes de obra. A grotesca em caixa alta com tracking aberto é a **voz do metadado** — rótulos, anos, categorias, contadores, labels. Texto corrido é grotesca normal. Não existe quarta voz.

**4. Densidade decrescente.** A Hero tem quatro elementos em uma tela inteira: essa é a densidade máxima do topo. Seções seguintes podem ser mais densas que a Hero, mas nenhuma pode parecer cheia. Se uma seção precisa de scroll interno ou abreviação para caber, corta-se conteúdo — não espaço.

**5. Arestas retas.** Sem cantos arredondados, sem sombras. Canto arredondado + sombra é vocabulário de interface de aplicativo; aresta reta é vocabulário de impresso.

**6. Contraste por luminosidade, nunca por peso.** Hierarquia se resolve com tamanho e cor de texto, não engrossando fontes. Peso 500 é o teto do display; corpo em 400.

**7. Movimento é chegada, nunca ambiente.** O único movimento é o de entrada, executado uma vez. Nada pulsa, flutua, gira ou repete. Depois que a página assenta, ela fica imóvel.

### O arco claro/escuro

O tom cinematográfico vem da estrutura de luz da página, não de elementos gráficos, gradientes decorativos ou efeitos:

```
Hero (escuro) → Sobre (claro) → Trabalhos (claro) → Galeria (escuro) → Contato (escuro) → Footer (escuro)
```

A página **abre e fecha com a mesma autoridade visual**. O miolo claro é "o dossiê" — a parte factual, de leitura longa, onde o fundo claro serve à legibilidade. O retorno ao escuro na Galeria não é uma interrupção: é a sala apagando de novo para projetar, e permanece apagada até o fim.

Referência de uso: consultar o plugin `claude-code/plugins/frontend-design` para composição, tipografia e critérios de qualidade visual ao revisar qualquer seção implementada.

## Narrativa da página

A página conta uma história em cinco tempos. Cada seção tem uma **função narrativa** — não é "mais uma seção". A transição entre elas deve parecer natural, nunca uma troca de componente.

| # | Seção | Função narrativa | Como recebe a anterior |
|---|---|---|---|
| 1 | **Hero** | *A aparição.* Estabelece presença. Diz apenas quem é. | — |
| 2 | **Sobre** | *A voz.* O rosto ganha história; primeira vez que ele "fala". | O escuro abre para a luz — acender a sala depois do trailer |
| 3 | **Trabalhos** | *A prova.* A história ganha evidência verificável. | Continuidade luminosa, um degrau de profundidade a mais |
| 4 | **Galeria** | *O corpo em cena.* Volta ao registro visual, agora como repertório. | O escuro retorna — a sala apaga para projetar |
| 5 | **Contato** | *O convite.* Fecha o círculo e chama para a ação. | Permanece no escuro; fecha com a autoridade da abertura |

### Narrativa emocional por seção

- **Hero** — impacto imediato, presença, "isto é uma estrela". Retrato full-bleed escurecido, tipografia grande, silêncio visual ao redor; o bloco de nome/subtítulo/CTA ancorado à esquerda, na espinha. Nada compete com o rosto e o nome. A referência `docs/design-references/editorial-v2.png` guiou **organização tipográfica, hierarquia, tracking, alinhamento editorial e uso de cor no nome** — nunca a estrutura da fotografia: composições em coluna dividida e fusões de imagem com o fundo por gradientes laterais foram testadas e **rejeitadas**. Elementos do mockup (laptop, celular, mesa de pedra, brilho ambiente) nunca fizeram parte do design da página.
- **Sobre** — confiança e humanidade. Texto editorial curto e bem escrito (não um bloco de bio genérico); os dados rápidos funcionam como um **bloco de créditos**, não como uma lista de atributos.
- **Trabalhos** — credibilidade profissional. Lista editorial vertical inspirada em programas de teatro/créditos — ano, título e categoria sempre visíveis; papel, direção, companhia, local e descrição revelados sob demanda. **É a seção mais autoral do projeto e serve de modelo para as demais.**
- **Galeria** — portfólio visual. Palco editorial (imagem principal grande + miniaturas de navegação), nunca uma grade genérica nem um carrossel de biblioteca — a caixa se adapta ao enquadramento de cada foto, nunca o contrário. A fotografia assenta diretamente sobre o fundo escuro, como projeção.
- **Reel** — **encerramento da Galeria**, não abertura. É a passagem das imagens estáticas para o ator em movimento, imediatamente antes do convite de contato. Deve pertencer visualmente à seção (mesma linguagem, mesmo container) sem competir com o palco fotográfico pelo papel de protagonista. Nunca autoplay, nunca som automático.
- **Contato** — direto e sóbrio, mas com presença: é o segundo momento mais forte da página, não um rodapé de contato. Sem formulários; apenas os canais certos.

## Princípios de motion

- Motion é sutil e nunca decorativo por si só — cada movimento existe para guiar atenção ou dar feedback, nunca só para "parecer moderno".
- **Sem scroll reveal generalizado.** Seções não animam ao entrar na viewport. Três razões: (a) a fronteira entre "revelar conteúdo" e "decorar" fica indefensável quando todo bloco anima; (b) é o efeito mais associado a template genérico de portfólio; (c) se tudo tem chegada, a chegada da Hero deixa de ser especial. A chegada é um gesto raro — e raro significa **uma vez por visita, no topo**.
- Hover em imagens: zoom leve.
- Todo motion respeita `prefers-reduced-motion` (reduzido/removido quando o usuário sinaliza preferência).
- **Convenção única de movimento** (tokens exatos em `design-system.md`, "Motion"): toda animação de revelação de conteúdo do site (abertura de item em Trabalhos, troca de imagem na Galeria, etc.) usa a mesma duração e o mesmo easing — nenhuma seção inventa seu próprio ritmo. Micro-interações (hover, foco) usam uma duração mais curta que revelações de conteúdo (macro).
- `21st-dev/magic-mcp` só é usado nos pontos explicitamente marcados como "avançado" em `design-system.md`/`implementation-plan.md` — nunca por padrão em componentes comuns.

## Princípios de imagem

- **Nenhum arquivo em `public/assets/` é editado.** As fotografias são materiais reais e definitivos do ator; todo tratamento visual é feito por CSS sobre a imagem intacta (enquadramento por `object-position`, escurecimento por `brightness`), nunca por recorte, conversão ou reprocessamento do arquivo.
- Tratamento consistente entre todas as fotos: **em cor, escurecidas quando servem de fundo** (Hero) e **em cor plena quando são o conteúdo** (Galeria). A direção de dessaturação/preto-e-branco cogitada no início do projeto foi abandonada — a Hero aprovada usa a fotografia colorida escurecida, e a Galeria depende de cor fiel por ser material de casting.
- Fotografia nunca é animada: sem zoom contínuo, Ken Burns ou parallax. Ela é o frame fixo sobre o qual o conteúdo chega.
- Fotografias assentam diretamente sobre o fundo, sem moldura, borda, canto arredondado ou sombra.

## Estratégia de conteúdo placeholder

> Seção histórica — o conteúdo real (bio, Trabalhos, canais de contato, fotografias) foi inserido na Sprint 2. Mantida como registro da estratégia que permitiu a substituição sem alterar layout ou componentes.

- Textos e dados fictícios claramente genéricos e neutros (ex.: "Ator brasileiro com formação em [placeholder]", filmografia com títulos fictícios de filmes/séries/peças/comerciais).
- Estruturados em `src/data/` e `src/content/` de forma que a substituição por conteúdo real não exija mudança de layout ou componentes — só edição de dados.

## Ordem de implementação aprovada (Refatoração Editorial)

Etapas pequenas, revisáveis e reversíveis. Cada uma termina com validação no navegador (cinco breakpoints) e aprovação explícita antes da próxima — mesmo protocolo usado na Hero.

| Etapa | Escopo | Risco | Situação |
|---|---|---|---|
| 0 | Decisões de direção (paleta final, posição do Reel, regra da espinha) | — | ✅ Aprovada |
| 1 | Documentação (`design.md`, `design-system.md`) | — | ✅ Concluída |
| 2 | Vocabulário compartilhado: padrão único de cabeçalho de seção + auditoria de containers | Baixo | ✅ Concluída |
| 3 | Galeria — remoção de cantos arredondados, sombras e bordas | Muito baixo | ✅ Concluída |
| 4 | Contato — espinha, declaração editorial, canais na voz do metadado, paleta escura | Médio | Em andamento |
| 5 | Sobre — assimetria de colunas, retrato sem aparência de card, dados como créditos | Médio | Pendente |
| 6 | Trabalhos — ano e categoria migram para a voz do metadado | Muito baixo | Pendente |
| 7 | Footer — wordmark, paleta escura | Muito baixo | Pendente |
| 8 | QA final — 5 breakpoints, contraste revalidado, teclado, PT/EN, `prefers-reduced-motion`, lint/typecheck/build | — | Pendente |

**Por que esta ordem**: a Etapa 2 estabelece o vocabulário que todas as seguintes consomem. A Etapa 3 vem cedo por ter a melhor relação impacto/risco do plano (remoção de classes, zero mudança estrutural). Contato antes de Sobre porque é a seção com maior distância entre o que é hoje e o que deveria ser. Trabalhos e Footer por último por exigirem o menor ajuste.

**Revalidação obrigatória de contraste** nas Etapas 4 e 7: a mudança de Contato e Footer para a paleta escura altera todas as combinações de texto/fundo dessas seções, incluindo estados de foco e hover.
