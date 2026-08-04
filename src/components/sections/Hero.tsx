import { ArrowRight, ChevronDown } from 'lucide-react'
import type { MouseEvent } from 'react'

import { Button } from '@/components/ui/button'
import { useI18n } from '@/content/i18n'
import { scrollToId } from '@/lib/scroll'

// Chegada única da Hero: nome, tagline, CTA e indicador de scroll usam o
// mesmo keyframe (`hero-reveal`, src/index.css) e o mesmo easing autoral
// (`--motion-ease`), mas com duração/atraso próprios da Hero (1000ms, em vez
// do token compartilhado de 400ms) — um evento único por visita pode ser
// mais lento e refinado sem afetar a cadência das revelações por interação
// em Trabalhos/Galeria, que continuam usando --motion-duration normalmente.
// CTA e indicador dividem o mesmo atraso (280ms) em vez de ganhar um terceiro
// valor novo — os dois fecham a mesma "onda" final da entrada (docs/design-
// system.md, "Motion": reutilizar os próprios tokens como atraso, nunca
// inventar uma nova constante de intervalo).
const HERO_REVEAL_NAME =
  'animate-[hero-reveal_1000ms_var(--motion-ease)_both] motion-reduce:animate-none'
const HERO_REVEAL_TAGLINE =
  'animate-[hero-reveal_1000ms_var(--motion-ease)_140ms_both] motion-reduce:animate-none'
const HERO_REVEAL_LATE =
  'animate-[hero-reveal_1000ms_var(--motion-ease)_280ms_both] motion-reduce:animate-none'

export function Hero() {
  const { dictionary } = useI18n()

  function handleCtaClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    scrollToId('work')
  }

  return (
    <section
      id="hero"
      className="section-dark relative min-h-screen overflow-hidden bg-background text-foreground"
    >
      {/* Retrato full-bleed único — sem coluna, sem overlay lateral, sem
          glow. `brightness-50` (direto na imagem) é o único recurso de
          contraste/atmosfera, como na composição original. Recorte já
          validado: 65% centraliza o rosto em telas estreitas (a foto é
          paisagem, 1672×941 — bem mais larga que qualquer viewport de
          celular); a partir de `sm` volta ao centro padrão. */}
      <img
        src="/assets/images/hero-portrait.webp"
        alt=""
        width={1672}
        height={941}
        className="absolute inset-0 size-full object-cover [object-position:65%_center] brightness-50 sm:object-center"
      />

      {/* Overlay vertical simples (não lateral) — só reforça a legibilidade
          do texto no terço inferior, onde ele agora fica ancorado em todos
          os breakpoints. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-black/40"
      />

      {/* Conteúdo — ancorado no terço inferior, alinhado à esquerda, em
          todos os breakpoints (a foto voltou a ser full-bleed em todos, não
          só mobile). Organização/hierarquia inspirada na referência: nome em
          duas linhas com entrelinha fechada, subtítulo em caixa alta com
          tracking aberto, CTA discreto — sem copiar a composição dividida.
          `mx-auto max-w-[1440px]` + os mesmos `px-6 sm:px-10 lg:px-16` da
          Navbar (`src/components/layout/Navbar.tsx`) — mesmo sistema de
          container dos dois, para que "Lucas Calzoni" da Hero comece
          exatamente sob o wordmark da Navbar em qualquer largura de tela,
          inclusive acima de 1440px (onde a Navbar já centralizava seu
          conteúdo, mas a Hero, sem o `max-w`, ficava colada à borda real da
          viewport). */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col justify-end px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
        <div className="flex flex-col items-start gap-5 text-left sm:gap-6 lg:gap-8">
          <h1
            className={`font-display text-h1 leading-[0.9] font-medium ${HERO_REVEAL_NAME}`}
          >
            <span className="block">Lucas</span>
            {/* --accent (valor atual, inalterado) para contraste discreto
                entre as duas partes do nome — não é uma cor nova, é o mesmo
                acento já usado em links/foco/borda do CTA logo abaixo. */}
            <span className="block text-accent">Calzoni</span>
          </h1>

          <p
            className={`max-w-md text-hero-tagline uppercase tracking-[0.15em] ${HERO_REVEAL_TAGLINE}`}
          >
            {dictionary.hero.tagline}
          </p>

          {/* Tamanho/área clicável aumentados sobre a base do Button
              (`variant="outline" size="lg"` continua fornecendo a mecânica
              de foco/hover) — `size="lg"` do componente compartilhado usa
              `text-sm`/`h-9` fixos em todas as variantes de tamanho (não há
              um "xl"); aqui apenas o necessário para o CTA ganhar presença
              nesta seção é sobrescrito via className, sem editar o
              componente `Button` em si. */}
          <Button
            asChild
            variant="outline"
            size="lg"
            className={`h-12 gap-2.5 px-6 text-base border-accent bg-transparent text-foreground hover:bg-accent/10 ${HERO_REVEAL_LATE}`}
          >
            <a href="#work" onClick={handleCtaClick}>
              {dictionary.hero.ctaLabel}
              <ArrowRight data-icon="inline-end" className="size-5" />
            </a>
          </Button>
        </div>
      </div>

      <ChevronDown
        aria-hidden="true"
        className={`absolute bottom-8 left-1/2 z-10 size-6 -translate-x-1/2 ${HERO_REVEAL_LATE}`}
      />
    </section>
  )
}
