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

const FOCUS_RING =
  'rounded-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2'

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
      className="section-dark scroll-mt-16 bg-background px-6 py-16 text-foreground sm:px-10 sm:py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8">
        <h2 className="font-display text-h2 font-medium">{dictionary.nav.links.gallery}</h2>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
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
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={reel.posterSrc}
                alt=""
                width={1600}
                height={900}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <span
                aria-hidden="true"
                className="relative flex size-16 items-center justify-center rounded-full bg-background/90 text-foreground"
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
                alt=""
                width={1600}
                height={900}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <span className="relative flex flex-col items-center gap-2 text-foreground">
                <span
                  aria-hidden="true"
                  className="flex size-16 items-center justify-center rounded-full bg-background/90 opacity-60"
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
              className={cn(
                'group flex max-h-[80vh] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-lg border border-border bg-muted shadow-sm',
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
                  'max-h-[80vh] w-auto max-w-full object-contain transition-transform duration-[var(--motion-duration-fast)] group-hover:scale-[1.02] motion-reduce:transition-none',
                  IMAGE_REVEAL,
                )}
              />
            </button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={showPrev}
                aria-label={dictionary.gallery.previous}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={showNext}
                aria-label={dictionary.gallery.next}
              >
                <ChevronRight />
              </Button>
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
              className="text-center text-sm tabular-nums text-muted-foreground lg:text-left"
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
                        'relative block aspect-square size-18 overflow-hidden rounded-md transition-[opacity,border-color,transform] duration-[var(--motion-duration-fast)] motion-reduce:transition-none lg:size-24',
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
      </div>

      <Dialog open={lightboxOpen} onOpenChange={handleLightboxOpenChange}>
        <DialogContent
          showCloseButton={false}
          onKeyDown={handleArrowKeyDown}
          className="section-dark w-[92vw] max-w-4xl border-none bg-background p-4 text-foreground sm:max-w-4xl"
        >
          <div className="flex max-h-[80vh] w-full items-center justify-center overflow-hidden rounded-lg bg-muted">
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

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={showPrev}
              aria-label={dictionary.gallery.previous}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={showNext}
              aria-label={dictionary.gallery.next}
            >
              <ChevronRight />
            </Button>
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
