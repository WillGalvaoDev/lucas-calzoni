# Product Brief — Lucas Calzoni Landing Page

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

## Escopo desta fase

**Dentro:**
- Site estático de página única (âncoras, sem roteamento).
- Bilíngue PT/EN com toggle de idioma.
- Seções: Hero, Sobre, Trabalhos, Galeria + Reel, Contato.
- Conteúdo placeholder de alta qualidade, estruturado para fácil substituição futura.

**Fora (fases futuras):**
- CMS/painel administrativo.
- Formulário de contato com backend/envio de e-mail real.
- Seção de imprensa/notícias.
- Analytics.
- Deploy e domínio.

## Critérios de sucesso

- Qualidade visual percebida como premium/editorial, à altura de um portfólio profissional de talento.
- Lighthouse 90+ em Performance, Accessibility, Best Practices e SEO.
- Experiência fluida e sem quebras em mobile, tablet e desktop.
- Conteúdo placeholder isolado dos componentes, permitindo substituição por conteúdo real sem alterar layout ou código.

## Papéis do processo

Este projeto é executado por dois papéis (detalhados em `architecture.md`):
- **Lead** (Product Designer + UX Designer + Software Architect): dono deste documento e dos demais em `docs/`, decisões de design/arquitetura, revisão crítica.
- **Implementer** (Senior Frontend Implementer): executa `implementation-plan.md` sem tomar decisões de design não cobertas pelos docs.
