// Classes compartilhadas por repetição real (mesma string, mesma
// responsabilidade, zero variação de intenção) — não abstrações por
// semelhança. Ver docs/design.md, auditoria da Refatoração Editorial
// (Etapa 2). Cada seção continua compondo suas próprias classes por cima
// destas; nenhuma vira componente.

// Indicador de foco acessível — idêntico em todo elemento interativo
// customizado do site (Navbar, Footer, Trabalhos, Galeria, canais de
// contato). Primitivos shadcn (Button, Switch) usam seu próprio anel de
// foco via `box-shadow` e não consomem esta constante.
export const FOCUS_RING =
  'rounded-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2'

// Parte invariante da casca de seção (Sobre, Trabalhos, Galeria, Contato):
// espaçamento vertical/horizontal e cor de texto padrão. Fundo, bordas e
// demais classes específicas de cada seção são compostas por cima via
// `cn()` — a casca nunca inclui `bg-*`, porque esse é o eixo que mais varia
// entre seções (claro/escuro, superfície).
export const SECTION_SHELL =
  'scroll-mt-16 px-6 py-16 text-foreground sm:px-10 sm:py-24 lg:px-16 lg:py-32'
