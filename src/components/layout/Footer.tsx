import type { MouseEvent } from 'react'

import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'
import { scrollToTop } from '@/lib/scroll'

const FOCUS_RING =
  'rounded-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2'

const DEVELOPER_LINKEDIN_URL = 'https://www.linkedin.com/in/williamsrmgalvao/'

export function Footer() {
  const { dictionary } = useI18n()

  function handleBackToTop(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    scrollToTop()
  }

  return (
    <footer className="border-t border-border bg-surface-muted px-6 py-12 text-foreground sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* `text-foreground` (herdado, sem classe extra) em vez de
            `text-muted-foreground`: sobre --surface-muted o contraste do
            texto secundário cai para 4.64:1 (ainda AA, mas com margem
            pequena) — para o crédito do Footer preferimos a folga maior do
            texto principal em vez de arriscar legibilidade nessa margem. */}
        <p className="text-sm font-medium">
          {dictionary.footer.developedByPrefix}{' '}
          <a
            href={DEVELOPER_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('transition-colors hover:text-accent', FOCUS_RING)}
          >
            William Galvão
          </a>
        </p>

        <a
          href="#top"
          onClick={handleBackToTop}
          className={cn(
            'text-sm font-medium transition-colors hover:text-accent',
            FOCUS_RING,
          )}
        >
          {dictionary.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
