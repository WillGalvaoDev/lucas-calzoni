import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'

export function About() {
  const { dictionary } = useI18n()
  const facts = dictionary.about.quickFacts

  return (
    <section
      id="about"
      className="scroll-mt-16 bg-background px-6 py-16 text-foreground sm:px-10 sm:py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-8">
          <h2 className="font-display text-h2 font-medium">{dictionary.nav.links.about}</h2>

          <p className="max-w-prose text-base leading-[1.65] tracking-[0.005em] sm:text-lg">
            {dictionary.about.bio}
          </p>

          <dl className="flex flex-col gap-4">
            {[facts.born, facts.training, facts.representation].map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm font-medium text-muted-foreground">
                  {fact.label}
                </dt>
                {/* `training` é uma lista longa de técnicas/formação (várias
                    linhas), bem mais densa que `born`/`representation` (uma
                    linha curta) — no mesmo `text-base` dos outros, ela
                    quebra a leitura de "fatos rápidos" que a lista promete,
                    porque o olho não antecipa que aquele campo é diferente
                    antes de começar a ler. Só tamanho/entrelinha mudam; a
                    cor (herdada, mesmo contraste) e a estrutura (dt/dd)
                    seguem idênticas às dos outros campos. */}
                <dd
                  className={cn(
                    'text-base',
                    fact === facts.training && 'text-sm leading-relaxed',
                  )}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-4/5 w-full overflow-hidden rounded-lg border border-border bg-muted">
          <img
            src="/assets/placeholders/about-portrait.webp"
            alt=""
            width={800}
            height={1000}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
