import type { ComponentType } from 'react'
import { Mail, AtSign, Briefcase } from 'lucide-react'

import type { ContactChannel, ContactChannelId } from '@/data/contact'
import { useI18n } from '@/content/i18n'
import { cn } from '@/lib/utils'
import { FOCUS_RING } from '@/lib/styles'

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
          'flex items-center gap-2 text-sm font-medium tracking-meta text-muted-foreground uppercase',
          className,
        )}
      >
        <Icon className="size-3.5" aria-hidden={true} />
        {label}
        <span className="normal-case">{dictionary.footer.channelPending}</span>
      </span>
    )
  }

  return (
    <a
      href={channel.href}
      target={channel.external ? '_blank' : undefined}
      rel={channel.external ? 'noopener noreferrer' : undefined}
      // Sem `hover:text-accent`: o acento sobre `.section-dark` mede 3.95:1,
      // abaixo do mínimo de 4.5:1 para texto (docs/design-system.md,
      // "Regra de uso do acento"). O sinal de hover/foco vem de um filete
      // (`border-b`), que só precisa do mínimo de 3:1 de componente de UI —
      // o texto permanece sempre em `text-foreground`, de alto contraste.
      className={cn(
        'flex items-center gap-2 border-b border-transparent pb-0.5 text-sm font-medium tracking-meta uppercase transition-colors hover:border-accent',
        FOCUS_RING,
        className,
      )}
    >
      <Icon className="size-3.5 text-muted-foreground" aria-hidden={true} />
      {label}
    </a>
  )
}
