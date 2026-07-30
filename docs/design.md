# Design Direction — Lucas Calzoni Landing Page

Direção visual e narrativa de UX. Os tokens concretos e implementáveis (cores, tipografia, specs de componente) estão em `design-system.md` — este documento explica o *porquê* por trás deles, para que o Lead (e qualquer revisor) possa avaliar se uma implementação está fiel à intenção, não só aos números.

## Direção visual

**Editorial minimalista** com tom cinematográfico:
- Tipografia como protagonista — não ícones, não decoração.
- Muito espaço em branco, grid rigoroso, com leve assimetria pontual (texto e imagem desalinhados propositalmente em algumas seções) para fugir de um layout genérico de template.
- Tom cinematográfico obtido por **alternância de seções claras e escuras** (Hero e Galeria em fundo quase-preto, Sobre/Trabalhos/Contato em fundo off-white) — não por excesso de elementos gráficos, gradientes ou efeitos.

Referência de uso: consultar o plugin `claude-code/plugins/frontend-design` para composição, tipografia e critérios de qualidade visual ao revisar qualquer seção implementada.

## Narrativa por seção (o que cada seção deve comunicar emocionalmente)

- **Hero** — impacto imediato, presença, "isto é uma estrela". Retrato em full-bleed, tipografia grande, silêncio visual ao redor. Nada compete com o rosto/nome.
- **Sobre** — confiança e humanidade. Texto editorial curto e bem escrito (não um bloco de bio genérico), dados rápidos (formação, nascimento, representação) em lista limpa e escaneável.
- **Trabalhos** — credibilidade profissional. Lista editorial vertical inspirada em programas de teatro/créditos — ano, título e categoria discreta sempre visíveis; papel, direção, companhia, local e descrição revelados sob demanda, sem exigir esforço de leitura no estado fechado.
- **Galeria + Reel** — portfólio visual. Palco editorial (imagem principal grande + miniaturas de navegação), nunca uma grade genérica nem um carrossel de biblioteca — a caixa se adapta ao enquadramento de cada foto, nunca o contrário. Lightbox de tela cheia sem fricção ao clicar na imagem principal. O reel é peça central mas discreta — nunca autoplay, nunca som automático.
- **Contato** — direto e sóbrio. Sem formulários pesados, apenas os canais certos (e-mail, redes sociais, contato de empresário/agência).

## Princípios de motion

- Motion é sutil e nunca decorativo por si só — cada movimento existe para guiar atenção ou dar feedback, nunca só para "parecer moderno".
- Entrada de seções: fade/slide leve.
- Hover em imagens: zoom leve.
- Todo motion respeita `prefers-reduced-motion` (reduzido/removido quando o usuário sinaliza preferência).
- **Convenção única de movimento** (tokens exatos em `design-system.md`, "Motion"): toda animação de revelação de conteúdo do site (abertura de item em Trabalhos, troca de imagem na Galeria, etc.) usa a mesma duração e o mesmo easing — nenhuma seção inventa seu próprio ritmo. Micro-interações (hover, foco) usam uma duração mais curta que revelações de conteúdo (macro).
- `21st-dev/magic-mcp` só é usado nos pontos explicitamente marcados como "avançado" em `design-system.md`/`implementation-plan.md` — nunca por padrão em componentes comuns.

## Princípios de imagem

- Tratamento consistente entre todas as fotos: preto-e-branco ou dessaturada.
- Placeholders são visualmente óbvios como placeholders (nunca imagens hotlinked de serviços externos), gerados localmente, fáceis de substituir por fotos reais.

## Estratégia de conteúdo placeholder

- Textos e dados fictícios claramente genéricos e neutros (ex.: "Ator brasileiro com formação em [placeholder]", filmografia com títulos fictícios de filmes/séries/peças/comerciais).
- Estruturados em `src/data/` e `src/content/` de forma que a substituição por conteúdo real não exija mudança de layout ou componentes — só edição de dados.
