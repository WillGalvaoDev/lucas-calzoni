import type { MouseEvent } from 'react'

import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'
import { scrollToTop } from '@/lib/scroll'
import { FOCUS_RING } from '@/lib/styles'

const DEVELOPER_LINKEDIN_URL = 'https://www.linkedin.com/in/williamsrmgalvao/'

// Mesmo filete do Contato e de Trabalhos: o acento nunca é cor de texto
// (mede 3.94:1 sobre `.section-dark`, abaixo do mínimo de 4.5:1 para texto),
// só um traço sob o link, que precisa apenas do mínimo de 3:1 de componente
// de UI. `py-1` amplia a área de toque do link para acima de 24px, mantendo
// o texto no mesmo tamanho.
const FOOTER_LINK =
  'border-b border-transparent py-1 transition-colors duration-[var(--motion-duration-fast)] hover:border-accent'

export function Footer() {
  const { dictionary } = useI18n()

  function handleBackToTop(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    scrollToTop()
  }

  return (
    <footer
      // Mesma paleta do Contato — o arco da página fecha sem quebra de tom
      // (docs/design-system.md, "Arco claro/escuro", "Footer"). O
      // `border-t border-border` resolve para o `--border` de `.section-dark`
      // (mais visível que o `--border` claro anterior): é o único fio
      // estrutural entre Contato e Footer, decisão explícita da Etapa 8.
      className="section-dark border-t border-border bg-background px-6 py-10 text-foreground sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between">
        {/* Wordmark: ecoa o nome da Navbar (mesma voz display), fechando o
            loop — a página termina dizendo o mesmo nome com que começou.
            `text-base` (não `text-lg` da Navbar): eco, não repetição — o
            Footer não compete com o cabeçalho fixo. */}
        <span className="font-display text-base font-medium">Lucas Calzoni</span>

        {/* Crédito e "voltar ao topo" na voz do metadado — mesmo vocabulário
            secundário/estrutural do resto do site, nunca uma terceira voz. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
          <span className="text-xs tracking-meta text-muted-foreground uppercase">
            © {new Date().getFullYear()} · {dictionary.footer.developedByPrefix}{' '}
            <a
              href={DEVELOPER_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(FOOTER_LINK, FOCUS_RING)}
            >
              William Galvão
            </a>
          </span>

          <a
            href="#top"
            onClick={handleBackToTop}
            className={cn(
              'text-xs tracking-meta text-muted-foreground uppercase',
              FOOTER_LINK,
              FOCUS_RING,
            )}
          >
            {dictionary.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  )
}
