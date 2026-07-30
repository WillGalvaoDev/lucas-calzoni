import { ChevronDown } from 'lucide-react'

import { useI18n } from '@/content/i18n'

// Chegada única da Hero: nome, tagline e indicador de scroll usam o mesmo
// keyframe (`hero-reveal`, src/index.css) e o mesmo easing autoral
// (`--motion-ease`), mas com duração/atraso próprios da Hero (1000ms, em vez
// do token compartilhado de 400ms) — um evento único por visita pode ser
// mais lento e refinado sem afetar a cadência das revelações por interação
// em Trabalhos/Galeria, que continuam usando --motion-duration normalmente.
// Atrasos curtos em relação à duração (140ms/280ms) fazem os três elementos
// se sobreporem durante quase toda a entrada, em vez de parecerem etapas
// separadas. Depois dessa chegada nenhum dos três permanece animado.
const HERO_REVEAL_NAME =
  'animate-[hero-reveal_1000ms_var(--motion-ease)_both] motion-reduce:animate-none'
const HERO_REVEAL_TAGLINE =
  'animate-[hero-reveal_1000ms_var(--motion-ease)_140ms_both] motion-reduce:animate-none'
const HERO_REVEAL_INDICATOR =
  'animate-[hero-reveal_1000ms_var(--motion-ease)_280ms_both] motion-reduce:animate-none'

export function Hero() {
  const { dictionary } = useI18n()

  return (
    <section
      id="hero"
      className="section-dark relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground"
    >
      <img
        src="/assets/placeholders/hero-portrait.webp"
        alt=""
        width={1200}
        height={1800}
        // A foto original enquadra o ator à direita do centro (espaço à
        // esquerda reservado para o texto no desktop). Em telas mobile, muito
        // mais estreitas que a proporção da foto, um crop central (50%)
        // corta a largura de forma tão agressiva que o rosto acaba quase na
        // borda direita da viewport. 65% desloca a janela de corte para a
        // direita o suficiente para centralizar o rosto, sem afetar a altura
        // (a imagem já preenche 100% da altura do container em qualquer
        // proporção mobile testada, então não há corte vertical). A partir de
        // `sm` (mesmo breakpoint mobile/tablet do design system), o
        // enquadramento volta ao centro padrão já aprovado para desktop.
        className="absolute inset-0 size-full object-cover [object-position:65%_center] brightness-50 sm:object-center"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-black/40"
      />

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center sm:gap-5 lg:gap-6">
        <h1 className={`font-display text-h1 font-medium ${HERO_REVEAL_NAME}`}>
          Lucas Calzoni
        </h1>
        <p
          className={`max-w-md text-hero-tagline leading-[1.65] tracking-[0.005em] ${HERO_REVEAL_TAGLINE}`}
        >
          {dictionary.hero.tagline}
        </p>
      </div>

      <ChevronDown
        aria-hidden="true"
        className={`absolute bottom-8 z-10 size-6 ${HERO_REVEAL_INDICATOR}`}
      />
    </section>
  )
}
