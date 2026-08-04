import { Accordion as AccordionPrimitive } from 'radix-ui'

import { work } from '@/data/work'
import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'
import { FOCUS_RING, SECTION_SHELL } from '@/lib/styles'

// Radix Collapsible (base do Accordion) só anima o fechamento se detectar uma
// `animation` CSS nomeada — por isso a revelação em cortina usa `animate-[...]`
// com os `@keyframes` de src/index.css, não `transition`. Duração/easing vêm
// dos tokens únicos de motion (docs/design.md, "Motion").
const CURTAIN_OPEN =
  'data-[state=open]:animate-[curtain-reveal-open_var(--motion-duration)_var(--motion-ease)]'
const CURTAIN_CLOSE =
  'data-[state=closed]:animate-[curtain-reveal-close_var(--motion-duration)_var(--motion-ease)]'

function WorkField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      {/* Voz do metadado (mesmo token de tracking do Sobre/Contato, Etapa 4) —
          alinha os rótulos do painel expandido ao vocabulário já estabelecido
          nas demais seções (docs/design.md, "Trabalhos", Etapa 6). */}
      <dt className="text-xs tracking-meta text-muted-foreground uppercase">{label}</dt>
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
      // (docs/design.md, "Superfícies").
      className={cn('border-t border-border bg-surface', SECTION_SHELL)}
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
                {/* Sem `hover:text-accent`: o acento sobre `bg-surface` mede
                    4.25:1, abaixo do mínimo de 4.5:1 para texto (mesma regra
                    já aplicada no Contato). O sinal de hover vira um filete
                    sob o título (`decoration-*` + `group-hover`), não uma
                    troca de cor de texto — `cursor-pointer` supre o feedback
                    de interatividade que a mudança de cor da linha inteira
                    dava antes (botões não têm `cursor: pointer` nativo em
                    todo navegador). */}
                <AccordionPrimitive.Trigger
                  className={cn(
                    'group grid w-full cursor-pointer grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-1 py-5 text-left transition-colors duration-[var(--motion-duration-fast)] sm:grid-cols-[4rem_1fr_8rem]',
                    FOCUS_RING,
                  )}
                >
                  <span className="text-xs tracking-meta text-muted-foreground uppercase">
                    {entry.year}
                  </span>
                  {/* `transition-colors` próprio (não herdado do Trigger): uma
                      transição CSS só anima as propriedades do elemento em
                      que está declarada — o filete muda `text-decoration-color`
                      neste `span`, não no `button` pai, então precisa da sua
                      própria transição para animar em vez de trocar
                      instantaneamente. Mesmo token de duração do resto da
                      seção. */}
                  <span className="font-display text-list-title font-medium underline decoration-1 decoration-transparent underline-offset-[0.25em] transition-colors duration-[var(--motion-duration-fast)] group-hover:decoration-accent">
                    {entry.title[language]}
                  </span>
                  <span className="col-start-2 text-xs tracking-meta text-muted-foreground uppercase sm:col-start-3 sm:text-right">
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
                    // Cromo decorativo removido (docs/design.md,
                    // "Trabalhos", Etapa 6) — `aspect-4/5`/`overflow-hidden`/
                    // `object-cover` seguem por serem funcionais (reservam
                    // layout estável antes da imagem carregar), não
                    // decorativos.
                    <div className="relative aspect-4/5 w-full max-w-56 overflow-hidden">
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
