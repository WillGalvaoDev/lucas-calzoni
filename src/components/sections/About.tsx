import { Download } from 'lucide-react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { useI18n, type SheetFieldKey } from '@/content/i18n'
import { resumeFile } from '@/data/dossier'
import { cn } from '@/lib/utils'
import { useReveal } from '@/lib/reveal'
import { SECTION_SHELL } from '@/lib/styles'

// A voz do metadado — sobrancelha, rótulo de banda, rótulo de campo, legenda
// da placa e ano do repertório. É o único "ornamento" da seção: não há ícone
// decorativo, marcador de lista, numeração nem moldura em lugar nenhum.
const META = 'text-xs tracking-meta text-muted-foreground uppercase'

// As duas verticais do dossiê: a espinha (rótulos) e a vertical do conteúdo.
// Toda banda obedece às duas — é o que faz a seção ler como página de
// documento e não como coluna de texto. Abaixo de `sm:` a grade some e cada
// banda empilha rótulo sobre conteúdo (nada é ocultado no mobile: a ficha é o
// conteúdo mais valioso da página).
const BAND_GRID =
  'sm:grid sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-x-8 lg:grid-cols-[12rem_1fr] lg:gap-x-12'

// Beat de conteúdo (docs/design.md, "Motion"): fade + 6px de
// deslocamento, nunca só transform. `motion-reduce:transition-none` é
// redundante com o hook (que já nasce revelado sob movimento reduzido) e
// existe como segunda barreira caso o usuário altere a preferência com a
// página aberta.
const REVEAL =
  'transition-[opacity,transform] duration-[var(--motion-duration)] ease-[var(--motion-ease)] motion-reduce:transition-none'
const REVEAL_HIDDEN = 'translate-y-1.5 opacity-0'
const REVEAL_SHOWN = 'translate-y-0 opacity-100'

// O conteúdo entra um passo depois do fio da banda — primeiro a pauta é
// traçada, depois a folha assenta sobre ela. Reaproveita o token de
// micro-interação como intervalo, sem inventar uma constante nova.
const REVEAL_DELAY = 'delay-[var(--motion-duration-fast)]'

// Ordem de leitura da ficha técnica (4.2): idade cênica e altura primeiro
// porque são o primeiro filtro de qualquer chamada de elenco; registro e
// nascimento por último porque são conferência, não triagem. `satisfies`
// garante que um campo renomeado no dicionário quebre o typecheck aqui em vez
// de sumir silenciosamente da renderização.
const SHEET_FIELD_ORDER = [
  'playingAge',
  'height',
  'eyes',
  'hair',
  'voice',
  'languages',
  'born',
  'base',
  'union',
] as const satisfies readonly SheetFieldKey[]

export function About() {
  const { dictionary } = useI18n()
  const { bio, sheet, training, skills, representation, resume } = dictionary.about

  return (
    <section id="about" className={cn('bg-background', SECTION_SHELL)}>
      <div className="mx-auto max-w-[1440px]">
        <Opening />

        {/* A ficha vem **antes** da prosa: o diretor de elenco escaneia
            primeiro e lê depois. Essa inversão é o dispositivo de maior
            impacto funcional da seção e custa zero em pixel. */}
        <Band label={sheet.label}>
          <dl className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {SHEET_FIELD_ORDER.map((key) => {
              const field = sheet.fields[key]

              // Campo sem dado não renderiza — nem rótulo órfão, nem traço,
              // nem "[a definir]". É o que permite a seção entrar em produção
              // com um campo e crescer para nove sem tocar em componente.
              if (!field) return null

              return (
                <div key={key}>
                  <dt className={META}>{field.label}</dt>
                  <dd className="mt-1 text-base">{field.value}</dd>
                </div>
              )
            })}
          </dl>
        </Band>

        {/* A bio é a única banda sem rótulo: rotular a prosa ("BIOGRAFIA") a
            rebaixaria a mais um campo de ficha. Ela é a voz da pessoa dentro
            do documento — o que impede o dossiê de virar planilha. */}
        <Band>
          <div className="max-w-prose space-y-6">
            {bio.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-[1.65] tracking-[0.005em] sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Band>

        <Band label={training.label}>
          {/* Grade de 2 colunas no `lg:` e não `columns-2`: multi-coluna CSS
              balanceia por altura, e a altura muda entre PT e EN — a grade é
              determinística e a ordem visual bate com a ordem do DOM. Sem
              marcador e sem fio interno: a pauta das bandas já dá o ritmo, e
              um segundo ritmo de fios aqui faria o bloco virar tabela. */}
          <ul className="grid gap-y-7 lg:grid-cols-2 lg:gap-x-14">
            {training.entries.map((entry) => (
              <li key={entry.title}>
                <p className="leading-snug">{entry.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{entry.mentors}</p>
              </li>
            ))}
          </ul>
        </Band>

        {/* Banda inteira ausente enquanto não houver nenhum grupo de
            habilidades — um rótulo "HABILIDADES" sobre o vazio anunciaria uma
            lacuna em vez de escondê-la. */}
        {skills.groups.length > 0 && (
          <Band label={skills.label}>
            <dl className="space-y-6">
              {skills.groups.map((group) => (
                <div key={group.label}>
                  <dt className={META}>{group.label}</dt>
                  <dd className="mt-1 text-base">{group.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </Band>
        )}

        {/* Sem banda de repertório: a filmografia é a seção Trabalhos, que vem
            imediatamente abaixo. Um recorte aqui repetiria as mesmas linhas a
            poucos pixels de distância e enfraqueceria as duas seções — o
            dossiê descreve o ator, o catálogo lista o trabalho. */}

        {/* Representação fecha o dossiê junto do CTA: é a informação que o
            diretor de elenco usa **depois** de decidir — linha de ação, não de
            escaneamento. `closing` desenha o fio inferior que fecha a pauta. */}
        <Band label={representation.label} closing>
          <p className="text-base">{representation.value}</p>

          {resumeFile.status === 'defined' && (
            <Button asChild variant="outline" size="lg" className="mt-8 h-12 px-6">
              <a href={resumeFile.href} download>
                <Download aria-hidden="true" />
                {`${resume.label} (PDF, ${resumeFile.sizeLabel})`}
              </a>
            </Button>
          )}
        </Band>
      </div>
    </section>
  )
}

// Bloco de abertura — o único da seção que não é uma banda pautada. A
// declaração e a placa dividem a largura a partir de `sm:`; abaixo disso a
// placa desce e permanece **alinhada à esquerda**, nunca centralizada.
function Opening() {
  const { dictionary } = useI18n()
  const { statement, plate } = dictionary.about
  const { ref, revealed } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="pb-12 sm:grid sm:grid-cols-[1fr_16rem] sm:items-start sm:gap-x-10 lg:grid-cols-[1fr_20rem] lg:gap-x-16 lg:pb-20"
    >
      <div className={cn(REVEAL, revealed ? REVEAL_SHOWN : REVEAL_HIDDEN)}>
        {/* A navegação manda o visitante para "Sobre" e ele precisa da
            confirmação ao chegar. Reaproveita o rótulo do menu — nenhuma
            chave de i18n nova para isso. */}
        <p className={META}>{dictionary.nav.links.about}</p>

        {/* A declaração É o h2 da seção: um h2 "Sobre" acima dela seria um
            elemento subordinado com mais peso visual que o próprio título.
            `text-statement` (teto 60px) é o que materializa a hierarquia
            Hero 80 > Sobre 60 > Contato 48; entrelinha e tracking vêm do
            próprio token. As primeiras palavras em `--accent` são a aparição
            única de acento da seção — se aparecer um segundo `text-accent` no
            conteúdo, está errado. */}
        <h2 className="mt-5 max-w-[42rem] font-display text-statement font-medium lg:mt-8">
          <span className="text-accent">{statement.accent}</span>
          {statement.rest}
        </h2>
      </div>

      <figure
        className={cn(
          'mt-10 w-[15rem] sm:mt-0 sm:w-full sm:max-w-[16rem] lg:max-w-[20rem]',
          REVEAL,
          REVEAL_DELAY,
          revealed ? REVEAL_SHOWN : REVEAL_HIDDEN,
        )}
      >
        {/* Placa de arquivo, não foto de capa. A escala de cinza não tenta
            aproximar o fundo frio do estúdio (221–264°) da superfície quente
            da página (45°) — tentativas de casar as duas empalideceram o
            rosto. Ela declara a foto como documento, e cinza neutro sobre
            papel quente é um par legítimo de impresso.

            **Quadrada, e sem legenda.** A legenda catalográfica ("PL. 01 —
            RETRATO DE ESTÚDIO") era o que declarava a imagem como placa de
            arquivo por escrito; sem ela, a leitura documental precisa vir da
            própria forma. O quadrado é o formato mais arquivístico que existe
            — quadro de prova de contato, chapa de identificação — e é o
            oposto do enquadramento de retrato de vaidade. Como efeito
            colateral desejado, ele iguala a altura da placa à do bloco de
            texto ao lado (4:5 deixava a placa ~160px mais alta, abrindo um
            vão acidental sob a declaração).

            No hover a cor volta quase toda: o documento vira pessoa. É o
            único momento quente da seção. O variante `hover:` do Tailwind já
            compila sob `@media (hover: hover)`, então em toque a placa
            permanece estática — sem alvo interativo sem ação.

            `width`/`height` são as dimensões intrínsecas reais do arquivo; a
            caixa é governada por `aspect-square` + `w-full`, que é o que
            reserva o espaço e evita CLS. */}
        <img
          src="/assets/images/about-portrait.webp"
          alt={plate.alt}
          width={1317}
          height={1920}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full object-cover object-[50%_22%] grayscale contrast-[1.06] transition-[filter] duration-[var(--motion-duration)] ease-[var(--motion-ease)] hover:grayscale-[0.1] hover:contrast-100 motion-reduce:transition-none"
        />
      </figure>
    </div>
  )
}

// Banda do dossiê: fio de largura total no topo, rótulo na espinha e conteúdo
// na vertical do conteúdo. O rótulo é `h3` (e não `dt`) porque as bandas
// contêm conteúdo heterogêneo — lista, prosa, pares termo/valor — e o heading
// dá ao leitor de tela uma estrutura navegável do documento. O estilo continua
// sendo a voz do metadado: o nível é semântica, não tamanho.
function Band({
  label,
  closing = false,
  children,
}: {
  label?: string
  closing?: boolean
  children: ReactNode
}) {
  const { ref, revealed } = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="relative py-8 lg:py-12">
      <Rule revealed={revealed} position="top" />
      {closing && <Rule revealed={revealed} position="bottom" />}

      <div
        className={cn(
          BAND_GRID,
          REVEAL,
          REVEAL_DELAY,
          revealed ? REVEAL_SHOWN : REVEAL_HIDDEN,
        )}
      >
        {label && <h3 className={cn('mb-2 sm:mb-0', META)}>{label}</h3>}
        {/* Sem rótulo, o conteúdo cai direto na vertical do conteúdo em vez
            de ocupar a coluna da espinha. */}
        <div className={cn(!label && 'sm:col-start-2')}>{children}</div>
      </div>
    </div>
  )
}

// O fio da pauta é um elemento próprio, e não `border-t` da banda, porque
// precisa ser **desenhado** da esquerda para a direita (`scaleX`) — largura de
// borda não é animável de forma composta pela GPU. Fica fora do fluxo, então
// não interfere na grade nem no espaçamento da banda.
function Rule({ revealed, position }: { revealed: boolean; position: 'top' | 'bottom' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 h-px origin-left bg-border transition-transform duration-[var(--motion-duration)] ease-[var(--motion-ease)] motion-reduce:transition-none',
        position === 'top' ? 'top-0' : 'bottom-0',
        revealed ? 'scale-x-100' : 'scale-x-0',
      )}
    />
  )
}
