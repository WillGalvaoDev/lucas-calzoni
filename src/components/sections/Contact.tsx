import { contactChannels } from '@/data/contact'
import { ContactChannelItem } from '@/components/layout/ContactChannelItem'
import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'
import { SECTION_SHELL } from '@/lib/styles'

export function Contact() {
  const { dictionary } = useI18n()

  return (
    <section
      id="contact"
      // `.section-dark` fecha o arco claro/escuro da página (docs/design-
      // system.md, "Arco claro/escuro"). A seção abandona a centralização
      // anterior e adere à espinha (docs/design-system.md, "Contato") — o
      // bloco principal já não é mais o layout genérico de "área de
      // contato" (título centralizado + lista de ícones).
      // `pt-*`/`pb-*` locais (o `py-*` do SECTION_SHELL segue como base):
      // a seção ocupava 536px a 1440×900 — 60% da viewport para três canais.
      // O topo reduzido também fecha metade do vazio de 256px que separava o
      // Reel da declaração (Etapa 9).
      className={cn(
        'section-dark bg-background',
        SECTION_SHELL,
        'pt-10 pb-10 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20',
      )}
    >
      {/* Duas colunas a partir de `lg:` (2/3 para a declaração, 1/3 para os
          canais): empilhados, os dois blocos somavam 280px de altura para um
          conteúdo que cabe em 115px lado a lado. `items-baseline` alinha a
          primeira linha de base da declaração com a do primeiro canal —
          alinhar pelo topo deixaria os dois desencontrados, já que 48px e
          14px têm alturas de ascendente muito diferentes. Abaixo de `lg:`
          segue empilhado: declaração primeiro, canais depois. */}
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-10 text-left sm:gap-12 lg:grid lg:grid-cols-3 lg:items-baseline lg:gap-16">
        {/* A declaração substitui o título genérico da seção (que só repetia
            "Contato") — é o encerramento da narrativa aberta na Hero, não
            uma legenda de área de contato. A quebra em duas linhas via `<br>`
            só se aplica a partir de `sm:`; em mobile o texto flui e quebra
            naturalmente onde couber, nunca forçado no ponto editorial. */}
        <h2 className="font-display text-h2 font-medium lg:col-span-2">
          {dictionary.contact.declarationLine1}
          <br className="hidden sm:block" />{' '}
          {dictionary.contact.declarationLine2}
        </h2>

        {/* Créditos editoriais, não uma lista de links: rótulos na voz do
            metadado (voz compartilhada com o subtítulo da Hero), alinhados à
            espinha junto com a declaração acima no mobile. A partir de `lg:`,
            a coluna de canais ocupa 1/3 da grade mas o Grid a estica para
            preencher toda essa largura (`justify-items: stretch` é o padrão)
            — sem `items-end`, os links (cada um com sua própria largura de
            conteúdo) ficavam alinhados à esquerda *dentro* dessa coluna
            larga, longe da borda direita da seção. `justify-self-end` encolhe
            o bloco de volta à sua largura de conteúdo e o empurra para a
            borda direita da coluna; `items-end` faz o mesmo dentro do próprio
            `<ul>`, alinhando cada canal à direita mesmo com larguras
            diferentes entre eles (correção da Etapa 9). */}
        <ul className="flex flex-col items-start gap-4 lg:items-end lg:justify-self-end">
          {contactChannels.map((channel) => (
            <li key={channel.id}>
              <ContactChannelItem channel={channel} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
