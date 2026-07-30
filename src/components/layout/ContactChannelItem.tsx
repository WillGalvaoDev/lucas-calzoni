import type { ComponentType } from 'react'
import { Mail, AtSign, Briefcase } from 'lucide-react'

import type { ContactChannel, ContactChannelId } from '@/data/contact'
import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'

// lucide-react não inclui mais ícones de marca (ex.: Instagram) — AtSign é
// usado como ícone genérico de "rede social"/handle no lugar de um logo.
const CHANNEL_ICONS: Record<
  ContactChannelId,
  ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
> = {
  email: Mail,
  instagram: AtSign,
  management: Briefcase,
}

const FOCUS_RING =
  'rounded-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2'

export function ContactChannelItem({
  channel,
  className,
}: {
  channel: ContactChannel
  className?: string
}) {
  const { dictionary } = useI18n()
  const Icon = CHANNEL_ICONS[channel.id]
  const label = dictionary.footer.channels[channel.id]

  // Canal sem dado real: conteúdo não interativo — nunca <a>, nunca href
  // fictício. Não entra na ordem de tabulação (nenhum elemento focável).
  if (channel.status === 'pending') {
    return (
      <span
        className={cn(
          'flex items-center gap-2 font-medium text-muted-foreground',
          className,
        )}
      >
        <Icon className="size-4" aria-hidden={true} />
        {label}
        <span className="text-sm">{dictionary.footer.channelPending}</span>
      </span>
    )
  }

  return (
    <a
      href={channel.href}
      target={channel.external ? '_blank' : undefined}
      rel={channel.external ? 'noopener noreferrer' : undefined}
      className={cn(
        'flex items-center gap-2 font-medium transition-colors hover:text-accent',
        FOCUS_RING,
        className,
      )}
    >
      <Icon className="size-4" aria-hidden={true} />
      {label}
    </a>
  )
}
