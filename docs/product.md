# Product Brief — Lucas Calzoni Landing Page

<!-- impeccable:product-schema 1 -->

Este documento é a fonte da verdade sobre **o que** o site precisa fazer e **para quem**. Decisões de arquitetura vivem em `architecture.md`, decisões visuais em `design.md`/`design-system.md`. Este arquivo não deve ser reinterpretado pelo Implementer — dúvidas de escopo voltam para o Lead.

## Projeto

Landing page de página única para o ator Lucas Calzoni.

## Objetivo

Apresentar o ator de forma profissional para diretores de elenco, produtoras, imprensa e público em geral, transmitindo sofisticação e credibilidade desde os primeiros segundos de visita.

## Público-alvo

- **Primário**: diretores de casting, produtoras, agências de talento.
- **Secundário**: imprensa e público/fãs.

## Proposta de valor

Em poucos segundos de scroll, o visitante entende quem é o ator, vê evidência concreta de trabalho (Trabalhos) e sabe exatamente como entrar em contato — sem fricção, sem ruído visual.

## Positioning

**Credibilidade de elenco via prova real.** O que um portfólio genérico de ator não consegue copiar com honestidade: este site apresenta evidência verificável e nomeada de trabalho profissional (créditos reais de teatro musical e cinema, com papéis e produções nomeados) em tom editorial — um dossiê que já convence um diretor de elenco pela evidência, antes mesmo do contato. Não é uma promessa ("sou talentoso"), é uma demonstração (aqui estão os créditos).

## Escopo desta fase

**Dentro:**
- Site estático de página única (âncoras, sem roteamento).
- Bilíngue PT/EN com toggle de idioma.
- Seções: Hero, Sobre, Trabalhos, Galeria + Reel, Contato.
- Conteúdo real (não mais placeholder — ver "Evidência disponível"), estruturado desde o início para substituição sem alterar layout/componentes.
- Preparação de publicação (Open Graph, canonical, headers de cache/segurança via `vercel.json`) — concluída; deploy em si depende de aprovação fora deste documento.

**Fora (fases futuras):**
- CMS/painel administrativo.
- Formulário de contato com backend/envio de e-mail real.
- Seção de imprensa/notícias.
- Analytics.

## Critérios de sucesso

- Qualidade visual percebida como premium/editorial, à altura de um portfólio profissional de talento.
- Lighthouse 90+ em Performance, Accessibility, Best Practices e SEO.
- Experiência fluida e sem quebras em mobile, tablet e desktop.
- Conteúdo placeholder isolado dos componentes, permitindo substituição por conteúdo real sem alterar layout ou código.

## Papéis do processo

Este projeto é executado por dois papéis (detalhados em `architecture.md`):
- **Lead** (Product Designer + UX Designer + Software Architect): dono deste documento e dos demais em `docs/`, decisões de design/arquitetura, revisão crítica.
- **Implementer** (Senior Frontend Implementer): executa `implementation-plan.md` sem tomar decisões de design não cobertas pelos docs.

## Contexto operacional

Site estático (SPA 100% client-side, sem SSR/backend/CMS), publicado na Vercel. Todo conteúdo vive em `src/data/`/`src/content/` como dados tipados versionados em Git — qualquer atualização de conteúdo real (novo crédito, novo canal de contato) é um PR de código, não uma ação de não-desenvolvedor. Sem formulário de contato: os canais reais (e-mail, Instagram, WhatsApp) apontam diretamente para o ator/representação.

## Evidência disponível

- **Conteúdo real já inserido — a fase de placeholder está encerrada**: bio e dados rápidos (`src/content/pt.ts`/`en.ts`), 9 créditos reais de trabalho em teatro musical e cinema (`src/data/work.ts`), 3 canais de contato reais — e-mail, Instagram, WhatsApp do empresário/representação (`src/data/contact.ts`), reel real embutido do YouTube (`src/data/gallery.ts`).
- Fotografias em `public/assets/` são materiais reais e definitivos do ator, fornecidos diretamente por ele — nunca editadas, nunca placeholder (mesmo a pasta ainda se chamar `placeholders/` por herança de nome; ver `design.md`, "Princípios de imagem").
- Representação: Instituto das Artes Luana Lopes.
- **Ausência a não fabricar**: nenhuma citação de imprensa, prêmio, depoimento de diretor/produtora ou métrica de audiência existe hoje — não inventar nenhum desses até o ator fornecer o dado real.

## Princípios do produto

1. **Provar, não afirmar** — cada seção existe para demonstrar credibilidade com fato verificável (crédito nomeado, canal real), nunca com adjetivo vazio.
2. **Silêncio como sofisticação** — ausência de ruído visual/comercial (sem formulário, sem pop-up, sem prova social inventada) é, em si, parte da mensagem de profissionalismo.
3. **Sem fricção até o contato** — do primeiro scroll ao canal certo, o caminho é curto e nunca depende de uma ação de terceiro (agência) para funcionar.
4. **Bilíngue por igual** — PT e EN recebem o mesmo nível de acabamento; nenhum idioma é "tradução de segunda classe".
5. **Dado real, nunca inventado** — toda evidência (crédito, canal, imagem) é real; um campo sem dado real mostra estado `pending` explícito, nunca um placeholder disfarçado de fato.

## Compromissos de marca

- Nome: **Lucas Calzoni** — wordmark em texto simples (`font-display`), sem logotipo/monograma.
- Handles reais e vinculantes: Instagram `@olucascalzoni`; e-mail e WhatsApp de representação em `src/data/contact.ts` (ver "Evidência disponível").
- Fotografias em `public/assets/` são ativos reais e protegidos — nunca editar, recortar ou reprocessar o arquivo; todo tratamento visual é só CSS (ver `design.md`, "Princípios de imagem").

## Acessibilidade e inclusão

Padrão exigido: **WCAG AA** (contraste mínimo 4.5:1 texto normal), formalizado em `design-system.md` e validado via Lighthouse Accessibility = 100. Navegação 100% funcional por teclado (incluindo lightbox e toggle de idioma) e `prefers-reduced-motion` respeitado em toda animação — requisitos confirmados, não apenas aspiracionais.
