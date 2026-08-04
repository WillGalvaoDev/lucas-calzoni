# Product — Lucas Calzoni

<!-- impeccable:product-schema 1 -->

Fonte da verdade sobre **o que** o site precisa fazer e **para quem**. Decisões técnicas em [`architecture.md`](./architecture.md), decisões visuais e tokens em [`design.md`](./design.md), histórico de execução em [`implementation.md`](./implementation.md).

> **Estado deste documento**: descreve o site **como ele está publicado hoje**. Onde houver divergência entre um documento e o código, o código é a verdade e o documento é corrigido — nunca o contrário.

---

## 1. Projeto

Landing page de página única para o ator **Lucas Calzoni**. Site estático, bilíngue PT/EN, publicado na Vercel.

## 2. Objetivo

Apresentar o ator de forma profissional para diretores de elenco, produtoras, imprensa e público, transmitindo sofisticação e credibilidade desde os primeiros segundos de visita.

## 3. Público-alvo

| Prioridade | Público | O que precisa |
|---|---|---|
| **Primário** | Diretores de casting, produtoras, agências de talento | Dados objetivos do ator (físico, voz, formação), evidência de trabalho e um canal direto |
| Secundário | Imprensa e público/fãs | Quem é, o que fez, onde acompanhar |

## 4. Proposta de valor

Em poucos segundos de scroll, o visitante entende quem é o ator, vê evidência concreta de trabalho e sabe exatamente como entrar em contato — sem fricção, sem ruído visual.

## 5. Positioning

**Credibilidade de elenco via prova real.** O site apresenta evidência verificável e nomeada de trabalho profissional (créditos reais de teatro musical e cinema, com papéis e produções nomeados) em tom editorial. Não é uma promessa ("sou talentoso"), é uma demonstração (aqui estão os créditos).

### A seção Sobre é o carro-chefe

Decisão de produto: **Sobre é a única seção com valor operacional para quem decide** — é onde convergem rosto, dados físicos, voz, formação e representação no formato que um diretor de elenco realmente usa. Hero seduz, Galeria mostra, Trabalhos comprova; **Sobre é onde se decide chamar o ator.**

Consequência assumida: Sobre passa a ser a seção mais longa e densa da página, e a segunda em escala tipográfica (ver hierarquia em `design.md`). Isso reordena a página — o Contato deixa de ser "o segundo momento mais forte" e passa a ser o fechamento de uma decisão já tomada em Sobre.

## 6. Escopo

**Dentro (implementado):**

- Site estático de página única (âncoras, sem roteamento).
- Bilíngue PT/EN com toggle de idioma.
- Seções: Hero, Sobre, Trabalhos, Galeria + Reel, Contato, Footer.
- Conteúdo real em todos os campos preenchidos; campos sem dado real usam estado `pending` explícito e não renderizam.
- Preparação de publicação: `<title>`, `meta description`, `canonical`, Open Graph, Twitter Card, `robots.txt`, headers de cache/segurança via `vercel.json`.

**Fora (fases futuras):**

- CMS ou painel administrativo.
- Formulário de contato com backend.
- Seção de imprensa/notícias.
- Analytics.
- `sitemap.xml` (depende de domínio definitivo).
- Testes automatizados.

## 7. Critérios de sucesso

| Critério | Situação |
|---|---|
| Qualidade visual percebida como premium/editorial | ✅ Atingido (validação visual do Lead) |
| Lighthouse 90+ em Performance, Accessibility, Best Practices e SEO | ✅ Accessibility 100; demais 90+ |
| Experiência sem quebras em mobile, tablet e desktop | ✅ Validado em 320 / 375 / 768 / 1024 / 1440 / 1920 px |
| Conteúdo isolado dos componentes, substituível sem alterar layout | ✅ Todo texto em `src/content/`, todo dado em `src/data/` |
| WCAG AA em todas as combinações de cor | ✅ Verificado par a par |

## 8. Contexto operacional

SPA 100% client-side, sem SSR, backend ou CMS, publicada na Vercel. Todo conteúdo vive em `src/data/` e `src/content/` como dados tipados versionados em Git — **qualquer atualização de conteúdo é um PR de código, não uma ação de não-desenvolvedor.** Sem formulário de contato: os canais reais apontam diretamente para o ator e sua representação.

## 9. Evidência disponível

- **Biografia e declaração** em primeira pessoa (`src/content/pt.ts` / `en.ts`).
- **7 entradas de formação** com docentes nomeados.
- **9 créditos reais** de teatro musical e cinema, com papel nomeado (`src/data/work.ts`).
- **3 canais de contato reais**: e-mail, Instagram (`@olucascalzoni`), WhatsApp da representação (`src/data/contact.ts`).
- **Reel real** embutido do YouTube (`src/data/gallery.ts`).
- **8 fotografias + retrato da Hero + pôster do Reel**, materiais reais e definitivos do ator.
- **Representação**: Instituto das Artes Luana Lopes.

**Ausência a não fabricar**: não existe hoje nenhuma citação de imprensa, prêmio, depoimento de diretor/produtora ou métrica de audiência. Não inventar nenhum desses até o ator fornecer o dado real.

## 10. Princípios do produto

1. **Provar, não afirmar** — cada seção demonstra credibilidade com fato verificável (crédito nomeado, canal real), nunca com adjetivo vazio.
2. **Silêncio como sofisticação** — a ausência de ruído (sem formulário, sem pop-up, sem prova social inventada) é parte da mensagem de profissionalismo.
3. **Sem fricção até o contato** — do primeiro scroll ao canal certo, o caminho é curto e nunca depende de um terceiro.
4. **Bilíngue por igual** — PT e EN recebem o mesmo acabamento; nenhum idioma é tradução de segunda classe.
5. **Dado real, nunca inventado** — um campo sem dado real não renderiza, ou mostra estado `pending` explícito. Nunca um placeholder disfarçado de fato.

## 11. Compromissos de marca

- Nome **Lucas Calzoni** como wordmark em texto puro (`font-display`) na Navbar, Hero e Footer — sem logotipo nem monograma nesses lugares. A ideia de um monograma "LC" foi avaliada e descartada — a composição aprovada provou não precisar dele.
- **Exceção nomeada**: a assinatura manuscrita do ator fecha o dossiê de Sobre (ver `design.md`, "Assinatura"). Não é um logotipo — é tratada como um endosso de ocorrência única, não como marca reutilizável. Não estender a nenhum outro lugar do site sem decisão de Lead.
- Handles reais e vinculantes: Instagram `@olucascalzoni`; e-mail e WhatsApp da representação em `src/data/contact.ts`.
- **Fotografias em `public/assets/images/` são ativos reais e protegidos**: nunca editar, recortar, converter ou reprocessar o arquivo. Todo tratamento visual é CSS sobre a imagem intacta. Mover ou renomear a pasta é decisão de Lead, e foi feito uma vez — a pasta se chamava `placeholders/`, nome herdado da fase de prototipagem que contradizia o conteúdo real.

## 12. Acessibilidade e inclusão

Padrão exigido: **WCAG AA** (4.5:1 para texto normal, 3:1 para texto grande e componentes de UI), formalizado em `design.md` e confirmado por Lighthouse Accessibility = 100.

- Navegação 100% funcional por teclado, incluindo lightbox, accordion de Trabalhos e toggle de idioma.
- `prefers-reduced-motion` respeitado em toda animação.
- `lang` do documento acompanha o idioma ativo.
- Nenhum conteúdo depende de animação para existir.

## 13. Pendências de conteúdo

Nenhuma é falha de implementação — todas dependem de material que o ator ainda não forneceu. A arquitetura já as absorve: **cada item abaixo é uma linha de dicionário ou de dado, sem tocar em componente.**

### 13.1 Bloqueiam o dossiê (seção Sobre)

A ficha técnica tem hoje **1 de 10 campos** preenchidos.

| Campo | Formato pedido |
|---|---|
| Idade cênica | Faixa, ex. `28 – 36` |
| Altura | Métrico e imperial (`1,84 m` / `6'0"`) — o site é bilíngue |
| Cor dos olhos e do cabelo | Palavra simples, PT e EN |
| Classificação vocal | Ex. `Barítono`, com extensão se houver |
| Idiomas e níveis | Ex. `Português (nativo) · Inglês (fluente)` |
| Cidade-base e disponibilidade | Ex. `São Paulo, SP — disponível para viagens` |
| Registro profissional (DRT) | Número + UF |
| Habilidades por grupo | Canto / Dança / Cena / Outras |
| PDF do currículo | Arquivo final para `public/` (**nunca** em `public/assets/`) |

*(Já preenchido: Nascimento.)*

### 13.2 Elevam o dossiê

| Item | Ganho |
|---|---|
| Foto de corpo inteiro | O diretor de elenco avalia corpo, não só rosto. Entra como segunda placa, mesmo tratamento. |
| Sotaques dominados | Campo de alta relevância para casting |
| Manequim e calçado | Guarda-roupa e produção pedem antes do teste |
| Instrumentos musicais e CNH | Habilidades que decidem escalações |
| Ficha técnica dos trabalhos (direção, companhia, local) | Os campos já existem no tipo de `work.ts` e estão vazios — enriquecem a seção Trabalhos |

### 13.3 Infraestrutura

| Item | Depende de |
|---|---|
| `sitemap.xml` + referência em `robots.txt` | Domínio definitivo |
| Favicon definitivo | Hoje é um `favicon.svg` genérico |
| Revisão do `og-image.png` | Confirmação do ator |
