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
  const { ref: signatureRef, revealed: signatureRevealed } = useReveal<HTMLDivElement>()

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

        {/* Fecho do dossiê. O bloco de abertura é a única coisa da seção que
            ignora as duas verticais e rompe para a esquerda — a assinatura é
            a única outra, e rompe para a direita: a seção abre e fecha com a
            mesma licença compositiva, nas duas pontas, nunca no meio.

            Vetorizada a partir do original entregue pelo ator
            (docs/design.md, "Assinatura") — ver `Signature` abaixo para o
            porquê completo. `text-foreground`, não `--accent`: a aparição
            única de acento da seção já foi gasta em "A atuação", e assinatura
            de verdade é tinta, não folha de ouro. Reveal próprio (mesmo
            padrão de toda banda — fade + 6px, mesmo par duração/easing),
            nunca um ritmo novo; sem animação de traçado, que seria efeito
            antes de composição. */}
        <div ref={signatureRef} className="mt-14 flex justify-end lg:mt-20">
          <Signature
            className={cn(
              'w-[clamp(200px,22vw,300px)] text-foreground',
              REVEAL,
              REVEAL_DELAY,
              signatureRevealed ? REVEAL_SHOWN : REVEAL_HIDDEN,
            )}
          />
        </div>
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

// Assinatura manuscrita do ator, vetorizada a partir do arquivo original que
// ele forneceu (`lucas-calzoni-signature.png`) — a versão em `public/assets/
// images/lucas-calzoni-signature.svg` é a mesma peça, mantida como arquivo
// de referência/portfólio; esta cópia é a que o site usa de fato.
//
// Traçado por um script próprio sobre o canal ALFA do PNG (não o RGB, que
// trazia um glow e um fundo embutidos atrás de pixels transparentes):
// marching squares em nível sub-pixel, simplificação Ramer-Douglas-Peucker,
// conversão para cúbicas de Bézier via Catmull-Rom. O limiar de alfa (140) e
// a tolerância de simplificação (0.9) foram escolhidos por medição — o
// limiar reproduz a área de tinta efetiva do original (soma das opacidades
// parciais do antialiasing) com 0.4% de desvio, não por inspeção visual.
// `fill-rule="evenodd"` é o que faz os laços fechados de "L"/"u"/"a"/"o"
// virarem furos em vez de manchas sólidas.
//
// É embutida como JSX (elemento `svg` inline, não `img`) porque precisa
// herdar `currentColor`: é a mesma peça que serve como tinta
// (`--foreground`) no fecho de Sobre, sem precisar de uma segunda variante
// de arquivo.
//
// Regra a preservar: é uma **marca de ocorrência única** — nunca compõe
// texto, nunca ganha um segundo consumidor, nunca vira uma terceira voz
// tipográfica ao lado de Newsreader/Manrope (docs/design.md, princípio 3).
// Se um pedido futuro cogitar reusá-la em outro lugar (Navbar, Footer,
// favicon), é decisão de Lead, não extensão de implementação.
function Signature({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 275.3"
      role="img"
      aria-label="Lucas Calzoni"
      className={cn('h-auto', className)}
    >
      <title>Lucas Calzoni</title>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18.6 265.2C16.7 264.9 10.9 264.6 8.2 263.3C5.6 262.1 3.7 259.7 2.6 257.7C1.6 255.8 1.1 254.2 1.7 251.5C2.3 248.9 3.5 245.0 6.2 241.7C8.8 238.4 12.2 235.2 17.5 231.8C22.9 228.3 30.2 224.6 38.1 221.3C46.0 218.0 57.7 214.1 64.9 212.0C72.2 210.0 77.8 209.7 81.4 208.7C85.1 207.7 83.4 209.5 86.6 205.8C89.8 202.1 90.0 202.5 100.4 186.6C110.8 170.7 136.3 129.9 149.1 110.3C161.9 90.7 167.9 82.0 177.2 69.1C186.5 56.2 195.4 44.2 204.9 33.0C214.4 21.8 228.7 6.8 234.0 1.7C239.4 -3.3 236.4 2.0 237.1 2.8C237.8 3.5 242.3 1.2 238.3 6.2C234.2 11.2 222.3 22.0 212.9 33.0C203.6 44.0 191.0 60.1 182.0 72.2C173.1 84.2 170.9 87.5 159.3 105.2C147.8 122.9 123.5 161.9 112.7 178.4C101.9 194.8 97.3 199.7 94.5 204.1C91.7 208.6 86.4 206.2 95.9 205.1C105.4 204.0 134.5 199.2 151.5 197.5C168.6 195.9 183.0 195.5 197.9 195.4C212.9 195.2 231.4 196.0 241.2 196.6C251.0 197.2 252.6 197.7 256.7 198.8C260.8 199.8 266.2 202.8 265.6 203.1C265.1 203.4 259.4 201.4 253.6 200.6C247.8 199.9 240.4 199.0 230.9 198.7C221.5 198.4 212.4 197.9 196.9 198.7C181.4 199.6 156.2 201.5 138.1 203.7C120.1 206.0 100.0 207.1 88.7 212.0C77.4 216.8 76.3 226.9 70.3 233.0C64.3 239.1 58.5 244.2 52.6 248.7C46.7 253.2 40.6 257.4 35.1 260.1C29.5 262.8 22.3 264.1 19.5 264.9C16.8 265.8 20.4 265.5 18.6 265.2ZM504.1 204.3C501.8 204.3 494.7 204.9 490.7 204.4C486.8 203.9 483.4 202.8 480.4 201.3C477.5 199.7 475.1 198.0 473.0 194.8C470.8 191.7 468.5 186.3 467.6 182.5C466.8 178.7 467.3 175.4 467.6 172.2C468.0 168.9 468.3 167.0 469.7 162.9C471.0 158.8 473.2 152.9 476.0 147.4C478.7 141.9 482.3 135.9 486.3 129.9C490.2 123.9 494.3 118.0 499.6 111.3C504.9 104.6 512.0 96.4 518.3 89.7C524.5 82.9 530.4 77.1 537.1 70.8C543.9 64.6 550.0 58.8 558.8 52.3C567.5 45.7 581.4 36.6 589.7 31.6C597.9 26.6 601.5 25.2 608.2 22.4C614.9 19.7 624.2 16.6 629.9 15.1C635.6 13.5 638.3 13.5 642.3 13.1C646.2 12.8 650.5 12.7 653.6 13.2C656.7 13.7 658.7 14.6 660.8 16.2C663.0 17.8 665.3 20.6 666.4 22.7C667.5 24.8 667.7 26.1 667.6 28.9C667.6 31.6 667.3 35.4 666.3 39.2C665.2 43.0 663.3 47.6 661.2 51.5C659.2 55.5 657.4 58.7 653.9 62.9C650.4 67.1 643.3 74.3 640.2 76.5C637.1 78.8 635.0 77.2 635.4 76.3C635.8 75.4 639.2 74.9 642.6 71.1C646.0 67.4 652.9 58.2 656.0 53.6C659.1 49.0 659.9 46.6 661.1 43.3C662.4 40.0 663.4 37.6 663.4 34.0C663.4 30.4 662.3 24.3 661.2 21.6C660.1 19.0 659.0 18.9 656.7 18.1C654.4 17.4 653.1 16.3 647.4 16.9C641.8 17.6 629.9 19.9 622.7 22.1C615.5 24.4 611.0 26.7 604.1 30.4C597.3 34.0 589.7 38.4 581.4 44.1C573.2 49.8 562.9 57.6 554.6 64.6C546.3 71.7 539.1 78.8 531.7 86.6C524.3 94.4 516.2 103.6 510.0 111.3C503.8 119.1 498.4 127.0 494.5 133.0C490.5 139.0 488.7 142.3 486.1 147.4C483.6 152.6 480.5 158.6 478.9 163.9C477.3 169.2 476.9 175.6 476.6 179.4C476.3 183.2 476.6 184.7 476.9 186.6C477.3 188.5 477.9 189.2 478.9 190.7C479.8 192.3 481.2 194.5 482.7 195.9C484.2 197.3 485.9 198.3 487.6 199.1C489.3 199.9 490.2 200.3 492.8 200.5C495.4 200.7 496.4 201.8 503.1 200.5C509.8 199.1 523.5 195.5 533.0 192.2C542.4 189.0 550.9 185.1 559.8 180.8C568.7 176.5 577.0 172.1 586.6 166.5C596.2 160.8 610.7 151.0 617.5 147.1C624.4 143.2 624.9 143.7 627.8 143.0C630.8 142.3 632.8 142.6 635.1 143.0C637.3 143.4 639.2 143.7 641.2 145.3C643.3 146.9 646.1 150.9 647.2 152.6C648.2 154.3 648.6 153.3 647.5 155.7C646.4 158.1 642.1 164.3 640.9 167.0C639.6 169.7 639.6 170.9 640.2 172.0C640.8 173.1 642.1 173.9 644.3 173.7C646.6 173.4 648.6 173.1 653.6 170.5C658.6 168.0 666.7 165.1 674.2 158.3C681.8 151.5 692.3 136.7 698.8 129.9C705.3 123.1 708.0 121.4 713.4 117.2C718.8 113.1 725.9 107.8 730.9 105.0C735.9 102.3 740.5 101.2 743.3 100.6C746.0 100.1 746.5 100.8 747.4 101.6C748.3 102.3 750.1 102.4 748.7 105.2C747.3 107.9 745.2 112.0 739.2 117.9C733.1 123.8 722.1 133.2 712.4 140.5C702.7 147.9 686.9 156.1 680.9 161.9C675.0 167.6 677.1 172.4 676.8 175.3C676.6 178.1 678.4 178.1 679.4 178.8C680.3 179.6 680.1 180.0 682.5 179.8C684.9 179.6 689.7 179.0 693.8 177.8C697.9 176.6 702.1 175.0 707.2 172.8C712.4 170.5 717.7 168.2 724.7 164.4C731.8 160.7 745.4 152.6 749.5 150.0C753.6 147.5 750.0 149.2 749.5 149.0C749.0 148.9 750.3 148.5 746.4 149.0C742.4 149.4 729.4 151.6 725.8 151.9C722.1 152.2 724.2 151.1 724.4 150.5C724.6 149.9 723.0 149.0 726.8 148.1C730.6 147.2 742.6 145.4 747.4 145.1C752.2 144.8 753.9 145.7 755.7 146.2C757.4 146.8 757.9 147.6 758.1 148.5C758.3 149.3 761.6 148.2 756.9 151.5C752.2 154.9 734.9 165.3 729.9 168.5C724.9 171.8 727.5 170.5 727.2 171.1C726.8 171.8 723.3 173.3 727.8 172.5C732.4 171.7 746.9 168.8 754.6 166.5C762.4 164.3 769.1 161.4 774.2 159.0C779.4 156.7 782.8 153.3 785.6 152.3C788.3 151.3 789.3 152.5 790.7 153.3C792.1 154.0 792.1 156.1 793.8 156.6C795.5 157.1 797.1 156.8 801.0 156.2C805.0 155.6 813.7 154.1 817.5 153.1C821.3 152.1 822.1 150.4 823.7 150.1C825.3 149.9 826.6 150.8 827.3 151.5C828.1 152.3 829.4 152.3 828.3 154.6C827.2 157.0 817.4 166.3 820.6 165.7C823.8 165.2 842.2 153.1 847.4 151.2C852.7 149.4 852.1 152.0 852.0 154.6C852.0 157.3 847.3 164.7 847.1 167.0C846.8 169.4 848.2 169.0 850.5 168.7C852.8 168.5 857.6 166.9 860.8 165.4C864.1 164.0 867.5 161.7 870.1 160.2C872.7 158.6 873.9 158.2 876.3 156.1C878.7 154.0 882.4 148.8 884.5 147.7C886.7 146.6 889.8 146.6 889.1 149.5C888.3 152.4 881.5 161.9 880.2 164.9C878.9 168.0 880.7 167.0 881.4 167.6C882.2 168.2 877.5 169.5 884.5 168.5C891.6 167.5 913.9 163.0 923.7 161.5C933.5 159.9 932.6 159.9 943.3 159.4C954.0 158.9 978.9 158.4 987.6 158.4C996.4 158.4 994.2 159.1 995.9 159.6C997.6 160.0 1006.9 160.6 997.9 161.1C989.0 161.6 961.0 160.7 942.3 162.5C923.5 164.2 896.4 170.3 885.6 171.4C874.7 172.6 879.1 170.4 877.3 169.5C875.6 168.6 875.5 167.4 875.0 166.0C874.5 164.5 876.4 160.4 874.2 160.8C872.0 161.1 866.0 166.3 861.9 168.2C857.7 170.1 852.6 171.9 849.5 172.2C846.4 172.5 844.5 170.8 843.3 170.1C842.1 169.4 842.2 170.3 842.2 168.0C842.2 165.7 848.6 155.1 843.3 156.3C838.0 157.6 816.2 172.7 810.3 175.6C804.4 178.6 808.2 174.8 807.7 174.2C807.1 173.6 805.1 175.1 807.0 172.2C808.9 169.2 817.2 159.5 819.1 156.7C821.1 153.9 822.9 154.6 818.6 155.2C814.2 155.8 797.4 158.5 792.8 160.3C788.2 162.1 792.1 164.0 791.0 166.0C789.9 168.0 788.4 170.4 786.2 172.2C783.9 173.9 779.6 176.0 777.3 176.5C775.0 177.0 773.5 175.8 772.2 175.3C771.0 174.7 770.5 174.1 770.0 173.2C769.4 172.3 768.9 171.7 768.9 170.1C768.9 168.5 772.5 163.5 770.1 163.4C767.7 163.3 761.5 167.4 754.6 169.4C747.8 171.5 734.7 174.7 728.9 175.6C723.0 176.4 721.3 175.3 719.6 174.4C717.9 173.6 722.2 169.3 718.6 170.2C714.9 171.1 702.9 177.7 697.9 179.8C693.0 181.9 691.4 182.2 688.7 182.7C685.9 183.2 683.7 183.1 681.4 182.9C679.2 182.8 677.0 182.5 675.3 181.7C673.5 181.0 671.9 179.6 671.0 178.4C670.1 177.1 669.9 176.7 669.9 174.2C669.9 171.8 673.7 163.7 671.1 163.6C668.6 163.4 658.4 171.5 654.6 173.5C650.9 175.5 650.9 175.2 648.5 175.5C646.0 175.9 642.5 176.5 640.2 175.7C637.9 175.0 635.7 172.8 634.8 171.1C633.9 169.5 634.4 167.5 634.7 166.0C635.0 164.4 636.4 162.6 636.4 161.9C636.5 161.1 638.0 159.7 635.1 161.3C632.1 162.9 622.9 169.3 618.6 171.5C614.3 173.7 611.7 174.4 609.3 174.5C606.9 174.7 605.2 173.2 604.1 172.4C603.0 171.7 602.8 171.7 602.7 170.1C602.7 168.5 603.3 164.8 603.8 162.9C604.4 161.0 605.8 159.5 606.0 158.8C606.3 158.0 609.4 155.8 605.2 158.3C600.9 160.7 590.2 168.1 580.4 173.6C570.6 179.1 556.0 186.7 546.4 191.1C536.8 195.6 529.6 198.2 522.7 200.3C515.7 202.5 507.8 203.5 504.7 204.1C501.6 204.8 506.5 204.2 504.1 204.3ZM691.0 151.5C694.4 149.2 703.0 144.1 711.3 137.4C719.6 130.7 735.3 116.5 740.8 111.3C746.4 106.1 744.1 107.5 744.7 106.2C745.3 104.9 746.6 102.9 744.3 103.5C742.0 104.1 737.9 104.8 730.9 110.0C723.9 115.3 709.2 128.5 702.4 135.1C695.7 141.6 692.5 146.7 690.3 149.5C688.2 152.2 689.3 151.2 689.4 151.5C689.5 151.9 690.5 151.7 690.7 151.7C691.0 151.7 687.6 153.9 691.0 151.5ZM895.9 139.5C895.3 139.6 893.5 140.0 892.8 139.6C892.0 139.2 891.2 138.2 891.4 137.1C891.5 136.0 892.7 133.9 893.8 132.8C894.9 131.7 896.7 130.5 897.9 130.5C899.2 130.6 901.5 131.5 901.2 133.0C901.0 134.4 897.2 138.1 896.3 139.2C895.4 140.3 896.5 139.4 895.9 139.5ZM357.7 182.5C356.5 182.6 352.3 183.4 350.5 182.9C348.7 182.3 347.0 180.9 347.0 179.4C347.0 177.9 347.9 175.9 350.5 173.9C353.1 171.8 361.5 169.5 362.4 167.0C363.3 164.5 357.3 160.9 356.1 158.8C355.0 156.6 358.2 153.1 355.7 154.0C353.2 154.9 346.2 161.3 341.2 164.2C336.3 167.2 329.4 170.3 325.8 171.5C322.2 172.7 321.0 171.7 319.6 171.4C318.2 171.2 317.9 171.0 317.2 170.1C316.5 169.2 315.4 167.7 315.2 166.0C314.9 164.3 317.0 159.8 315.5 160.0C314.0 160.2 309.3 165.3 306.2 167.3C303.1 169.4 299.5 171.4 296.9 172.4C294.3 173.4 292.3 173.4 290.7 173.3C289.2 173.2 288.4 172.5 287.6 171.8C286.9 171.1 286.2 170.6 286.1 169.1C286.0 167.6 287.1 164.0 287.0 162.9C287.0 161.8 288.6 160.9 285.6 162.3C282.6 163.7 273.5 169.3 269.1 171.4C264.6 173.4 261.9 173.9 258.8 174.5C255.7 175.2 252.7 175.5 250.5 175.3C248.3 175.2 246.6 174.3 245.4 173.6C244.1 172.9 243.4 172.9 242.9 171.1C242.4 169.4 245.3 162.8 242.3 163.1C239.2 163.3 228.9 170.8 224.7 172.5C220.6 174.1 219.6 173.4 217.5 172.8C215.4 172.2 213.0 170.9 212.1 169.1C211.2 167.3 215.6 161.2 212.4 162.1C209.2 162.9 197.4 171.8 192.8 174.0C188.1 176.3 186.8 175.9 184.5 175.6C182.2 175.3 179.9 173.8 179.0 172.2C178.0 170.6 178.1 168.6 179.0 166.0C179.9 163.4 182.2 159.5 184.2 156.7C186.1 153.9 188.8 150.4 190.7 149.0C192.7 147.5 194.8 147.7 195.9 148.1C197.0 148.5 198.9 148.7 197.3 151.5C195.7 154.4 188.3 161.9 186.1 164.9C183.9 168.0 184.0 168.9 184.0 170.1C183.9 171.3 183.9 172.4 185.6 172.3C187.2 172.3 190.4 171.3 193.8 169.6C197.3 167.9 201.9 165.2 206.2 162.2C210.5 159.1 216.4 152.5 219.6 151.2C222.8 149.9 225.4 152.2 225.2 154.6C224.9 157.1 219.2 163.6 218.1 166.0C217.1 168.4 217.9 168.5 218.7 169.1C219.4 169.7 218.8 171.3 222.7 169.6C226.6 167.9 237.5 162.3 242.3 159.1C247.1 155.8 248.8 152.3 251.5 150.2C254.3 148.0 256.9 146.8 258.8 145.9C260.7 145.1 261.0 144.9 262.9 144.9C264.8 144.9 268.2 145.1 270.1 146.0C272.0 146.9 273.9 149.1 274.5 150.5C275.1 152.0 274.2 153.8 273.5 154.6C272.9 155.5 271.2 156.4 270.8 155.7C270.3 155.0 270.9 151.6 270.6 150.5C270.4 149.4 270.9 148.8 269.1 149.1C267.3 149.4 262.7 150.1 259.8 152.1C256.9 154.0 253.5 158.4 251.5 160.8C249.6 163.3 248.7 165.3 248.1 167.0C247.5 168.7 247.6 170.3 248.2 171.1C248.8 172.0 250.0 172.0 251.5 172.1C253.1 172.1 254.6 172.3 257.7 171.5C260.8 170.7 265.5 169.5 270.1 167.4C274.7 165.4 280.2 162.6 285.6 159.2C290.9 155.8 298.1 149.7 302.1 147.1C306.0 144.6 306.2 144.5 309.3 144.0C312.4 143.4 318.0 143.3 320.6 143.9C323.2 144.5 324.1 146.5 324.8 147.4C325.5 148.4 324.4 148.6 324.8 149.5C325.2 150.3 328.0 150.0 327.3 152.6C326.7 155.2 322.1 162.4 321.1 164.9C320.2 167.5 321.2 167.3 321.6 168.0C322.1 168.6 320.8 169.7 323.7 168.7C326.6 167.7 332.0 166.3 339.2 162.1C346.4 158.0 359.6 147.3 367.0 143.9C374.4 140.6 380.2 141.8 383.5 141.9C386.8 141.9 386.6 143.5 386.9 144.3C387.3 145.1 387.0 146.3 385.6 146.6C384.1 146.9 380.6 145.7 378.4 146.0C376.1 146.2 374.7 146.6 372.2 148.1C369.7 149.5 363.5 152.0 363.3 154.6C363.1 157.3 367.1 163.2 371.1 164.0C375.2 164.8 380.9 160.9 387.6 159.5C394.3 158.0 405.3 156.1 411.3 155.3C417.4 154.5 420.3 154.3 423.7 154.6C427.2 154.8 434.6 156.1 432.0 156.7C429.4 157.3 417.9 156.8 408.2 158.3C398.6 159.8 380.4 164.1 374.2 165.6C368.0 167.1 371.8 165.9 371.1 167.0C370.5 168.1 371.0 170.6 370.4 172.2C369.7 173.7 369.6 174.6 367.5 176.3C365.4 178.0 359.4 181.4 357.8 182.5C356.2 183.5 358.9 182.5 357.7 182.5ZM295.2 169.1C296.6 168.4 298.5 168.5 303.1 165.4C307.7 162.3 319.9 153.4 322.8 150.5C325.8 147.6 322.0 148.4 320.6 148.0C319.2 147.6 317.7 146.8 314.4 148.0C311.2 149.3 304.7 152.3 301.0 155.4C297.4 158.6 293.9 164.7 292.4 167.0C290.9 169.3 291.7 168.7 292.1 169.1C292.5 169.5 294.3 169.4 294.8 169.4C295.4 169.4 293.8 169.7 295.2 169.1ZM613.5 170.1C615.8 168.9 622.1 166.4 626.8 163.3C631.5 160.2 639.8 154.1 641.7 151.5C643.6 149.0 639.8 148.6 638.1 148.0C636.5 147.4 634.9 147.0 632.0 147.9C629.0 148.8 623.8 151.0 620.6 153.1C617.5 155.3 614.8 158.5 613.0 160.8C611.2 163.1 610.4 165.5 609.8 167.0C609.2 168.6 608.7 169.6 609.3 170.1C609.9 170.6 612.7 170.2 613.4 170.2C614.1 170.2 611.3 171.3 613.5 170.1ZM777.6 173.2C778.6 172.7 781.7 172.0 783.5 170.6C785.3 169.2 787.2 166.6 788.1 164.9C789.0 163.3 789.1 161.5 788.7 160.7C788.2 159.8 786.6 159.7 785.6 159.8C784.5 159.9 784.1 159.6 782.5 161.4C780.9 163.1 777.0 168.3 775.9 170.1C774.7 171.9 775.4 171.6 775.7 172.2C775.9 172.7 777.0 173.2 777.3 173.4C777.6 173.6 776.5 173.7 777.6 173.2ZM355.6 179.4C357.0 178.6 361.2 176.6 362.9 175.3C364.5 173.9 365.4 172.1 365.5 171.1C365.7 170.2 366.2 168.7 363.9 169.7C361.7 170.7 354.1 175.7 352.0 177.3C349.9 179.0 351.1 179.1 351.5 179.5C352.0 179.9 354.0 179.8 354.6 179.8C355.3 179.8 354.3 180.1 355.6 179.4ZM18.8 261.9C21.0 261.2 26.8 260.7 32.0 258.1C37.1 255.6 45.2 249.9 49.5 246.7C53.8 243.6 52.9 244.6 58.0 239.2C63.0 233.8 78.1 218.3 79.8 214.4C81.5 210.6 74.0 214.6 68.0 216.0C62.1 217.5 50.7 221.1 44.3 223.3C38.0 225.5 34.4 227.1 29.9 229.4C25.4 231.6 21.0 234.1 17.5 236.6C14.0 239.1 10.9 241.8 8.9 244.3C6.9 246.8 5.9 249.7 5.3 251.5C4.8 253.4 5.2 254.4 5.7 255.7C6.1 257.0 7.3 258.4 8.2 259.3C9.2 260.3 9.6 260.8 11.3 261.3C13.1 261.7 17.3 261.9 18.6 262.0C19.8 262.1 16.6 262.5 18.8 261.9ZM214.4 273.5C213.6 273.6 211.3 274.0 210.3 273.5C209.3 273.1 205.7 272.1 208.2 270.7C210.8 269.4 214.3 268.2 225.8 265.7C237.3 263.1 258.9 258.7 277.3 255.4C295.7 252.2 307.0 250.0 336.1 246.2C365.1 242.4 414.9 236.3 451.5 232.6C488.1 229.0 526.5 226.2 555.7 224.3C584.9 222.5 596.6 221.6 626.8 221.3C657.0 220.9 710.8 221.6 737.1 222.3C763.4 223.0 771.0 224.2 784.5 225.4C798.1 226.6 808.2 227.8 818.6 229.5C828.9 231.2 840.7 234.2 846.4 235.7C852.1 237.1 851.4 237.5 852.6 238.1C853.8 238.7 853.6 238.8 853.5 239.2C853.3 239.6 854.4 239.8 851.5 240.6C848.6 241.5 837.3 244.6 836.1 244.3C834.9 244.1 845.1 240.6 844.4 239.2C843.8 237.7 841.4 237.2 832.0 235.6C822.5 233.9 800.5 230.9 787.6 229.5C774.7 228.1 773.2 228.1 754.6 227.4C736.1 226.7 703.4 225.3 676.3 225.3C649.1 225.3 627.5 225.5 591.8 227.3C556.0 229.2 497.6 233.5 461.9 236.6C426.1 239.7 408.1 242.0 377.3 246.0C346.6 249.9 304.4 255.8 277.3 260.3C250.3 264.9 225.5 271.0 215.0 273.2C204.5 275.4 215.2 273.5 214.4 273.5Z"
      />
    </svg>
  )
}
