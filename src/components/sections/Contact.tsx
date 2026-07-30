import { contactChannels } from '@/data/contact'
import { ContactChannelItem } from '@/components/layout/ContactChannelItem'
import { useI18n } from '@/content/i18n'

export function Contact() {
  const { dictionary } = useI18n()

  return (
    <section
      id="contact"
      className="scroll-mt-16 bg-background px-6 py-16 text-foreground sm:px-10 sm:py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 text-center">
        <h2 className="font-display text-h2 font-medium">{dictionary.nav.links.contact}</h2>

        <ul className="flex flex-col items-center gap-6">
          {contactChannels.map((channel) => (
            <li key={channel.id}>
              <ContactChannelItem channel={channel} className="text-lg" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
