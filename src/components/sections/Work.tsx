import { Accordion as AccordionPrimitive } from 'radix-ui'

import { work } from '@/data/work'
import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'

const FOCUS_RING =
  'rounded-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2'

// Radix Collapsible (base do Accordion) só anima o fechamento se detectar uma
// `animation` CSS nomeada — por isso a revelação em cortina usa `animate-[...]`
// com os `@keyframes` de src/index.css, não `transition`. Duração/easing vêm
// dos tokens únicos de motion (docs/design-system.md, "Motion").
const CURTAIN_OPEN =
  'data-[state=open]:animate-[curtain-reveal-open_var(--motion-duration)_var(--motion-ease)]'
const CURTAIN_CLOSE =
  'data-[state=closed]:animate-[curtain-reveal-close_var(--motion-duration)_var(--motion-ease)]'

function WorkField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-base">{value}</dd>
    </div>
  )
}

export function Work() {
  const { dictionary, language } = useI18n()
  const fields = dictionary.work.fields

  return (
    <section
      id="work"
      // `border-t` aqui é o divisor editorial entre Sobre e Trabalhos — antes
      // não existia nenhuma fronteira visual entre as duas seções claras
      // (docs/design-system.md, "Superfícies").
      className="scroll-mt-16 border-t border-border bg-surface px-6 py-16 text-foreground sm:px-10 sm:py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8">
        <h2 className="font-display text-h2 font-medium">{dictionary.nav.links.work}</h2>

        <AccordionPrimitive.Root
          type="single"
          collapsible
          className="flex flex-col border-t border-border"
        >
          {work.map((entry) => (
            <AccordionPrimitive.Item
              key={entry.id}
              value={entry.id}
              className="border-b border-border"
            >
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger
                  className={cn(
                    'grid w-full grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-1 py-5 text-left transition-colors duration-[var(--motion-duration-fast)] hover:text-accent sm:grid-cols-[4rem_1fr_8rem]',
                    FOCUS_RING,
                  )}
                >
                  <span className="text-sm text-muted-foreground">{entry.year}</span>
                  <span className="font-display text-list-title font-medium">
                    {entry.title[language]}
                  </span>
                  <span className="col-start-2 text-sm text-muted-foreground sm:col-start-3 sm:text-right">
                    {dictionary.work.categories[entry.category]}
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>

              <AccordionPrimitive.Content
                className={cn(
                  'overflow-hidden motion-reduce:animate-none',
                  CURTAIN_OPEN,
                  CURTAIN_CLOSE,
                )}
              >
                <div className="flex flex-col gap-4 pb-6 sm:pl-20">
                  <dl className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
                    {entry.role && <WorkField label={fields.role} value={entry.role[language]} />}
                    {entry.director && (
                      <WorkField label={fields.director} value={entry.director[language]} />
                    )}
                    {entry.company && (
                      <WorkField label={fields.company} value={entry.company[language]} />
                    )}
                    {entry.venue && <WorkField label={fields.venue} value={entry.venue[language]} />}
                  </dl>

                  {entry.description && (
                    <p className="max-w-prose text-base leading-[1.65] tracking-[0.005em]">
                      {entry.description[language]}
                    </p>
                  )}

                  {entry.imageSrc && (
                    <div className="relative aspect-4/5 w-full max-w-56 overflow-hidden rounded-lg border border-border bg-muted">
                      <img
                        src={entry.imageSrc}
                        alt={entry.imageAlt?.[language] ?? ''}
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  )
}
