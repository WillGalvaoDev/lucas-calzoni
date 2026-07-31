import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { galleryPhotos, reel } from '@/data/gallery'
import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'
import { FOCUS_RING, SECTION_SHELL } from '@/lib/styles'

// Entrada da foto (palco e lightbox) — mesmos tokens de duração/easing de
// "Motion" (docs/design-system.md) já usados em Trabalhos.
const IMAGE_REVEAL =
  'animate-[gallery-image-reveal_var(--motion-duration)_var(--motion-ease)] motion-reduce:animate-none'

// Largura real da scrollbar do navegador/SO atual — nunca assumida como um
// valor fixo (varia entre navegador, SO e configuração de acessibilidade; é 0
// em scrollbars overlay que não ocupam espaço de layout). Sonda dedicada,
// desacoplada da coluna de miniaturas, para não depender de nenhum estado de
// scroll da própria Galeria.
function measureScrollbarWidth() {
  const probe = document.createElement('div')
  probe.style.cssText =
    'position:absolute;top:-9999px;left:-9999px;width:100px;height:100px;overflow:scroll;'
  document.body.appendChild(probe)
  const width = probe.offsetWidth - probe.clientWidth
  document.body.removeChild(probe)
  return width
}

// Controle próprio, não o `Button` shadcn: sem fundo, borda ou canto
// arredondado com aparência de componente — só o ícone e o `FOCUS_RING`,
// discreto o bastante para não competir com a fotografia (Etapa 7). `size-11`
// (44px) é a área de toque mínima recomendada, mesmo o ícone visível sendo
// menor. Usado no palco e no lightbox — mesmo controle, duas instâncias.
function GalleryArrowButton({
  direction,
  onClick,
  label,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  label: string
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex size-11 cursor-pointer items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-duration-fast)] hover:text-foreground',
        FOCUS_RING,
      )}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  )
}

export function Gallery() {
  const { dictionary, language } = useI18n()
  const [reelPlaying, setReelPlaying] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  const total = galleryPhotos.length
  const activePhoto = galleryPhotos[activeIndex]

  // Inicializador preguiçoso: mede uma única vez, de forma síncrona, antes do
  // primeiro paint — sem o ciclo extra de render de um efeito e sem o
  // encadeamento de `setState` dentro de um efeito (evitado de propósito).
  const [scrollbarWidth] = useState(measureScrollbarWidth)

  // Sinal semântico — só vira `true` dentro de um handler de interação real
  // (seta, teclado ou clique em miniatura), nunca dentro do próprio efeito.
  // Um guard baseado em contar execuções do efeito (ex.: um `isInitialMount`
  // zerado na primeira chamada) não é robusto em desenvolvimento: o
  // StrictMode roda o `useEffect` duas vezes seguidas na montagem (efeito →
  // cleanup → efeito de novo) para o mesmo componente, sem recriar o
  // `useRef` — a segunda chamada já veria o guard "consumido" pela primeira
  // e disparia o scroll mesmo sem interação nenhuma. Esse duplo ciclo não
  // existe no build de produção, por isso o bug só aparecia no `npm run dev`.
  const hasUserInteracted = useRef(false)

  // Garante que a miniatura ativa nunca fique permanentemente fora da área
  // visível da coluna/faixa. Só roda depois de uma interação real (setas,
  // teclado ou clique em miniatura) — nunca na montagem/remontagem: abaixo do
  // breakpoint `lg` a faixa de miniaturas não tem contenção vertical própria
  // (só `overflow-x-auto`), então um `scrollIntoView` disparado sem
  // interação rolaria a página inteira até a Galeria em vez do topo da Hero.
  useEffect(() => {
    if (!hasUserInteracted.current) return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    thumbnailRefs.current[activeIndex]?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [activeIndex])

  function showPrev() {
    hasUserInteracted.current = true
    setActiveIndex((current) => (current - 1 + total) % total)
  }

  function showNext() {
    hasUserInteracted.current = true
    setActiveIndex((current) => (current + 1) % total)
  }

  function handleArrowKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPrev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      showNext()
    }
  }

  function openLightbox(event: MouseEvent<HTMLButtonElement>) {
    lightboxTriggerRef.current = event.currentTarget
    setLightboxOpen(true)
  }

  function handleLightboxOpenChange(open: boolean) {
    setLightboxOpen(open)
    if (!open) {
      // Mesmo cuidado de timing do lightbox anterior: adiado para vencer a
      // limpeza de foco do próprio Radix (FocusScope) durante o desmonte.
      const trigger = lightboxTriggerRef.current
      window.setTimeout(() => trigger?.focus(), 0)
    }
  }

  return (
    <section
      id="gallery"
      // `pb-*` local reduz só o rodapé da seção (o `py-*` do SECTION_SHELL
      // segue governando o topo): entre o fim do Reel e a declaração do
      // Contato havia 256px de vazio a 1440px — 128px do `lg:py-32` daqui
      // somados a 128px do `lg:py-32` de lá. Como as duas seções compartilham
      // o mesmo fundo escuro, esse vazio era a única coisa entre elas e as
      // fazia parecer dois blocos desconectados (Etapa 9).
      className={cn('section-dark bg-background', SECTION_SHELL, 'pb-10 sm:pb-16 lg:pb-20')}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8">
        <h2 className="font-display text-h2 font-medium">{dictionary.nav.links.gallery}</h2>

        <div
          role="group"
          aria-label={dictionary.nav.links.gallery}
          onKeyDown={handleArrowKeyDown}
          className="flex flex-col gap-4 lg:flex-row lg:items-start"
        >
          <div className="flex flex-1 flex-col gap-3">
            <button
              type="button"
              onClick={openLightbox}
              aria-label={dictionary.gallery.expandLabel}
              // `aspect-ratio` inline, calculado da proporção real da foto
              // ativa (dado já existente em `galleryPhotos`, nunca inventado):
              // reserva a altura correta do palco *antes* da imagem carregar,
              // eliminando o CLS medido na auditoria da Etapa 7. Verificado
              // empiricamente (não só na teoria) que isso só funciona com a
              // imagem posicionada em `absolute` dentro de um wrapper `block`
              // — dentro do `flex items-center justify-center` anterior, o
              // navegador não tinha uma dimensão definida de onde derivar o
              // `aspect-ratio` e a caixa colapsava para 0×0 até o load. Com
              // `width` definida (100%) + `aspect-ratio` + `max-height`, o
              // navegador resolve corretamente os dois casos: quando a altura
              // implícita excede 80vh (desktop, recorte por altura) e quando
              // não excede (mobile, a proporção real da foto governa) — sem
              // nenhuma largura fixa e sem recortar a foto.
              style={{ aspectRatio: `${activePhoto.width} / ${activePhoto.height}` }}
              className={cn(
                // Cantos, contorno, sombra e o fundo de preenchimento do
                // palco foram removidos: a foto agora assenta diretamente
                // sobre o fundo escuro da seção, como uma projeção — não como
                // um cartão (docs/design-system.md, "Galeria", Refatoração
                // Editorial). A contenção de conteúdo transbordante segue
                // presente por ser funcional (não decorativa): mantém o
                // efeito de zoom leve no hover contido dentro da própria
                // caixa, sem alterar esse comportamento.
                'group relative block max-h-[80vh] w-full cursor-zoom-in overflow-hidden',
                FOCUS_RING,
              )}
            >
              <img
                key={activePhoto.id}
                src={activePhoto.src}
                alt={activePhoto.alt[language]}
                width={activePhoto.width}
                height={activePhoto.height}
                loading="lazy"
                className={cn(
                  'absolute inset-0 size-full object-contain transition-transform duration-[var(--motion-duration-fast)] group-hover:scale-[1.02] motion-reduce:transition-none',
                  IMAGE_REVEAL,
                )}
              />
            </button>

            <div className="flex items-center gap-1">
              <GalleryArrowButton
                direction="prev"
                onClick={showPrev}
                label={dictionary.gallery.previous}
              />
              <GalleryArrowButton
                direction="next"
                onClick={showNext}
                label={dictionary.gallery.next}
              />
            </div>

            {activePhoto.caption && (
              <p className="text-sm text-muted-foreground">{activePhoto.caption[language]}</p>
            )}
          </div>

          {/* A coluna fica `scrollbarWidth`px mais larga que as miniaturas
              (lg:size-24 = 6rem) só em telas ≥lg — o suficiente para a
              scrollbar vertical (quando existir) ocupar espaço próprio sem
              cobrir a borda direita das miniaturas, que continuam com o
              mesmo tamanho visual. Antes de medida (scrollbarWidth=0 no
              primeiro render), o `calc` resolve para exatamente `lg:w-24`,
              idêntico ao comportamento anterior. */}
          <div
            className="flex flex-col gap-2 lg:w-[calc(6rem+var(--gallery-scrollbar-w,0px))] lg:flex-none"
            style={{ '--gallery-scrollbar-w': `${scrollbarWidth}px` } as CSSProperties}
          >
            <span
              aria-hidden="true"
              className="text-center text-xs tracking-meta tabular-nums text-muted-foreground uppercase lg:text-left"
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            {/* `lg:overflow-x-hidden` (não `visible`): a especificação CSS
                Overflow força overflow-x a virar "auto" sempre que ele é
                "visible" e overflow-y não é — combinação que nunca se
                sustenta como escrita. Isso criava uma scrollbar horizontal
                indevida (o conteúdo só tinha ~15px de overflow real, do
                tamanho da própria scrollbar vertical). `hidden` é uma
                combinação válida com `overflow-y-auto` e não reintroduz o
                scroll horizontal em telas grandes, onde a coluna já é
                vertical. */}
            <ul className="flex gap-4 overflow-x-auto pb-1 lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0 lg:max-h-[80vh]">
              {galleryPhotos.map((photo, index) => {
                const isActive = index === activeIndex
                return (
                  <li key={photo.id} className="shrink-0">
                    <button
                      ref={(node) => {
                        thumbnailRefs.current[index] = node
                      }}
                      type="button"
                      onClick={() => {
                        hasUserInteracted.current = true
                        setActiveIndex(index)
                      }}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative block aspect-square size-18 cursor-pointer overflow-hidden rounded-md transition-[opacity,border-color,transform] duration-[var(--motion-duration-fast)] motion-reduce:transition-none lg:size-24',
                        isActive
                          ? 'border-2 border-accent opacity-100 -translate-y-1'
                          : 'translate-y-0 border border-border opacity-60 hover:opacity-90',
                        FOCUS_RING,
                      )}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt[language]}
                        loading="lazy"
                        style={{ objectPosition: photo.thumbnailPosition }}
                        className="absolute inset-0 size-full object-cover"
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Reel como último movimento da Galeria (não seção própria):
            separado das fotografias por um único fio estrutural — mesmo
            vocabulário do ledger de Sobre/Trabalhos, não um dispositivo novo
            — e anunciado só pelo rótulo "REEL" na voz do metadado, sem H3
            nem frase editorial (docs/design-system.md, "Reel", Etapa 7). */}
        <div className="flex flex-col gap-4 border-t border-border pt-10 lg:pt-16">
          <span className="text-xs tracking-meta text-muted-foreground uppercase">
            {dictionary.gallery.reelLabel}
          </span>

          {/* Sem `max-w-*` (Etapa 9, correção): qualquer teto fixo (testados
              `2xl`, `3xl`, `4xl`) deixa uma sobra lateral vazia à direita do
              vídeo que lê como "espaço reservado para mais conteúdo" — o
              problema não era o valor do teto, era ter um teto. `w-full`
              sozinho já é contido pela espinha da seção (`max-w-[1440px]` +
              padding do `SECTION_SHELL`), então o Reel ocupa 100% da largura
              útil sem nunca virar full-bleed da viewport. Alinhado à
              esquerda por padrão (sem `mx-auto`). Cromo removido (cantos,
              borda, fundo de preenchimento) — pendência registrada na
              Etapa 3, resolvida junto do reposicionamento na Etapa 7. */}
          <div className="relative aspect-video w-full overflow-hidden">
            {reelPlaying && reel.status === 'defined' ? (
              <iframe
                src={reel.embedUrl}
                title={dictionary.gallery.reelTitle}
                className="absolute inset-0 size-full"
                allow="fullscreen"
              />
            ) : reel.status === 'defined' ? (
              <button
                type="button"
                onClick={() => setReelPlaying(true)}
                aria-label={dictionary.gallery.reelPlayLabel}
                className={cn(
                  'absolute inset-0 flex cursor-pointer items-center justify-center',
                  FOCUS_RING,
                )}
              >
                <img
                  src={reel.posterSrc}
                  alt={reel.posterAlt[language]}
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="relative flex size-12 items-center justify-center rounded-full bg-background/90 text-foreground sm:size-16"
                >
                  <Play className="ml-1 size-6" />
                </span>
              </button>
            ) : (
              // Sem embed real ainda: nenhum elemento interativo e nenhum
              // <iframe> é montado (evita disparar uma requisição de rede real
              // para uma URL fictícia) — mesmo princípio do Item 11 para
              // canais de contato pendentes.
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={reel.posterSrc}
                  alt={reel.posterAlt[language]}
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
                <span className="relative flex flex-col items-center gap-2 text-foreground">
                  <span
                    aria-hidden="true"
                    className="flex size-12 items-center justify-center rounded-full bg-background/90 opacity-60 sm:size-16"
                  >
                    <Play className="ml-1 size-6" />
                  </span>
                  <span className="rounded bg-background/90 px-2 py-1 text-sm font-medium">
                    {dictionary.gallery.reelPending}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={lightboxOpen} onOpenChange={handleLightboxOpenChange}>
        <DialogContent
          showCloseButton={false}
          onKeyDown={handleArrowKeyDown}
          className="section-dark w-[92vw] max-w-4xl border-none bg-background p-4 text-foreground sm:max-w-4xl"
        >
          <div className="flex max-h-[80vh] w-full items-center justify-center overflow-hidden">
            <img
              key={activePhoto.id}
              src={activePhoto.src}
              alt={activePhoto.alt[language]}
              width={activePhoto.width}
              height={activePhoto.height}
              className={cn('max-h-[80vh] w-auto max-w-full object-contain', IMAGE_REVEAL)}
            />
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <DialogTitle className="text-lg font-medium">
              {activePhoto.alt[language]}
            </DialogTitle>
            <DialogDescription>
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </DialogDescription>
          </div>

          <div className="flex items-center justify-center gap-2">
            <GalleryArrowButton
              direction="prev"
              onClick={showPrev}
              label={dictionary.gallery.previous}
            />
            <GalleryArrowButton
              direction="next"
              onClick={showNext}
              label={dictionary.gallery.next}
            />
          </div>

          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-3 right-3"
              aria-label={dictionary.gallery.closeLightbox}
            >
              <X />
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </section>
  )
}
