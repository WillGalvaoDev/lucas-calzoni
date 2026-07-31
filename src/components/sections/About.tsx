import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'
import { SECTION_SHELL } from '@/lib/styles'

export function About() {
  const { dictionary } = useI18n()
  const facts = dictionary.about.quickFacts

  return (
    <section
      id="about"
      className={cn('bg-background', SECTION_SHELL)}
    >
      {/* Título em linha própria, na espinha — mesmo padrão de cabeçalho das
          outras três seções (docs/design-system.md, "Cabeçalho de seção").
          Antes vivia dentro da coluna de texto, sozinho, quebrando esse
          padrão sem necessidade. */}
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 lg:gap-16">
        <h2 className="font-display text-h2 font-medium">{dictionary.nav.links.about}</h2>

        {/* 2 colunas de 3 (não 1 de 2): a bio é protagonista, o retrato
            acompanha — nunca metade a metade (docs/design-system.md,
            "Sobre", Etapa 5). `items-start` alinha os topos em vez de
            centralizar verticalmente: o retrato é mais alto que o bloco de
            texto por usar sua proporção natural (ver `img` abaixo), então
            centralizar deixaria o excesso de altura repartido acima e
            abaixo — alinhar ao topo concentra esse espaço sobrando embaixo,
            que é onde a composição tem menos conteúdo competindo. */}
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <p className="max-w-prose text-base leading-[1.65] tracking-[0.005em] sm:text-lg">
              {dictionary.about.bio}
            </p>

            {/* Ledger editorial, não lista de fatos: cada entrada é uma linha
                de crédito separada por um fio de 1px, rótulo na voz do
                metadado (mesmo token de tracking da Etapa 4) à esquerda e
                valor à direita a partir de `sm:` — empilhado abaixo disso.
                O `<div>` por entrada é HTML válido dentro de `dl` (agrupa um
                par dt/dd) e é o que permite o fio ficar no wrapper, não em
                cada filho — funciona igual empilhado (mobile) ou lado a lado
                (grid, sm+), sem duplicar a borda. */}
            <dl className="flex flex-col">
              {[facts.born, facts.training, facts.representation].map((fact) => (
                <div
                  key={fact.label}
                  className="border-t border-border py-4 sm:grid sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-x-6"
                >
                  <dt className="text-xs tracking-meta text-muted-foreground uppercase">
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

          {/* Sem contêiner-moldura: antes havia uma `div` com razão de
              aspecto forçada (`aspect-4/5`) recortando a foto real (1317×1920,
              razão 0.686) para caber num 4:5 (0.8) — cerca de 7% cortado no
              topo e na base. Agora a imagem é o único elemento, na sua
              proporção natural (`width`/`height` reais, sem `object-cover`):
              zero recorte, e os atributos continuam reservando o espaço de
              layout (sem CLS) mesmo sem o wrapper. Limitada por `max-w-*` no
              mobile/tablet para não dominar a composição antes do `lg:`, onde
              a proporção natural já fica contida pela própria coluna de 1/3. */}
          <img
            src="/assets/placeholders/about-portrait.webp"
            alt=""
            width={1317}
            height={1920}
            loading="lazy"
            className="h-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none"
          />
        </div>
      </div>
    </section>
  )
}
