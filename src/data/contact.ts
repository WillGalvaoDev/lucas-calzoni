// Rótulos visíveis vêm do dicionário i18n (footer.channels), não daqui, já
// que URL/e-mail não mudam com o idioma.
//
// Um canal sem dado real (status: 'pending') não deve renderizar link algum
// — o componente de renderização já lida com os dois estados
// automaticamente, nenhuma mudança de código é necessária ao trocar entre
// eles:
//   { id: 'email', status: 'defined', href: 'mailto:real@dominio.com', external: false }

export type ContactChannelId = 'email' | 'instagram' | 'management'

export interface DefinedContactChannel {
  id: ContactChannelId
  status: 'defined'
  href: string
  external: boolean
}

export interface PendingContactChannel {
  id: ContactChannelId
  status: 'pending'
}

export type ContactChannel = DefinedContactChannel | PendingContactChannel

export const contactChannels: ContactChannel[] = [
  {
    id: 'email',
    status: 'defined',
    href: 'mailto:lucascalzoni@hotmail.com',
    external: false,
  },
  {
    id: 'instagram',
    status: 'defined',
    href: 'https://instagram.com/olucascalzoni',
    external: true,
  },
  {
    id: 'management',
    status: 'defined',
    href: 'https://wa.me/5511971296222',
    external: true,
  },
]
