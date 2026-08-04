import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { LanguageToggle } from './LanguageToggle'
import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'
import { scrollToId, scrollToTop } from '@/lib/scroll'
import { FOCUS_RING } from '@/lib/styles'

const NAV_LINKS = [
  { id: 'about', key: 'about' },
  { id: 'work', key: 'work' },
  { id: 'gallery', key: 'gallery' },
  { id: 'contact', key: 'contact' },
] as const

export function Navbar() {
  const { dictionary } = useI18n()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const heroElement = document.getElementById('hero')
    let ticking = false

    // Lê a geometria ao vivo a cada chamada (nunca cacheada): o Navbar deixa
    // de estar "sobre o Hero" no exato momento em que a borda inferior do
    // Hero sobe além da própria altura do header — não em um número de
    // altura fixo nem calculado uma única vez. Isso também cobre o salto por
    // âncora (scrollIntoView), que antes podia parar exatamente na fronteira
    // e nunca disparar uma comparação estrita de scrollY.
    function updateScrolled() {
      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0
      const heroBottom = heroElement?.getBoundingClientRect().bottom ?? 0
      setIsScrolled(heroBottom <= headerHeight)
      ticking = false
    }

    function handleScroll() {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateScrolled)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    scrollToId(id)
    setIsMenuOpen(false)
  }

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    scrollToTop()
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        isScrolled
          ? 'border-border bg-background text-foreground'
          : 'border-transparent bg-transparent text-background',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">
        <a
          href="#hero"
          onClick={handleLogoClick}
          className={cn(
            'font-display text-lg font-medium transition-colors',
            isScrolled ? 'hover:text-accent' : 'hover:underline',
            FOCUS_RING,
          )}
        >
          Lucas Calzoni
        </a>

        <nav
          className="hidden items-center gap-6 sm:flex"
          aria-label={dictionary.nav.menuTitle}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => handleNavClick(event, link.id)}
              className={cn(
                'text-sm font-medium transition-colors',
                // `hover:text-accent` fica abaixo do contraste AA (4.5:1)
                // quando a Navbar está transparente sobre o Hero escuro
                // (~3.94:1). Sublinhado é a alternativa que o próprio
                // docs/design.md permite ("sublinhado ou cor accent") e não
                // depende da cor do texto para ser percebido.
                isScrolled ? 'hover:text-accent' : 'hover:underline',
                FOCUS_RING,
              )}
            >
              {dictionary.nav.links[link.key]}
            </a>
          ))}
          <LanguageToggle />
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <LanguageToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={dictionary.nav.openMenu}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" showCloseButton={false}>
              <SheetTitle className="sr-only">
                {dictionary.nav.menuTitle}
              </SheetTitle>
              <SheetDescription className="sr-only">
                {dictionary.nav.menuDescription}
              </SheetDescription>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={dictionary.nav.closeMenu}
                  className="absolute top-3 right-3"
                >
                  <X />
                </Button>
              </SheetClose>
              <nav
                className="mt-12 flex flex-col gap-6 px-4"
                aria-label={dictionary.nav.menuTitle}
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(event) => handleNavClick(event, link.id)}
                    className={cn('text-lg font-medium', FOCUS_RING)}
                  >
                    {dictionary.nav.links[link.key]}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
