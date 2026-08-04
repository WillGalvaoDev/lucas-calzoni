import type { Dictionary } from './i18n'

export const en: Dictionary = {
  hero: {
    tagline: 'Film, Television & Theatre Actor',
    ctaLabel: 'See Work',
  },
  about: {
    statement: {
      accent: 'Acting',
      rest: ' has always found a way to be part of my life.',
    },
    plate: {
      alt: 'Black-and-white studio portrait of Lucas Calzoni looking into the camera.',
    },
    bio: [
      'As a child, I discovered on my school’s stage a place where I could tell stories and see the world through different perspectives.',
      'Years later, in 2018, a trip to New York turned that passion into certainty. It was there that I chose to leave behind my degree in Petroleum and Gas Engineering and devote myself wholeheartedly to the path of acting.',
    ],
    // Ver comentário equivalente em pt.ts: só `born` existe hoje; os demais
    // campos entram quando o ator enviar os dados.
    sheet: {
      label: 'Casting sheet',
      fields: {
        born: { label: 'Born', value: 'São Paulo, Brazil, 1993' },
      },
    },
    training: {
      label: 'Training',
      entries: [
        { title: 'Contemporary Belting', mentors: 'Tiago Bezerra' },
        { title: 'Classical Ballet', mentors: 'Alessandra Lona' },
        {
          title: "Ivana Chubbuck's Acting Technique + Lorena Comparato's Method",
          mentors: 'Marina Figueira',
        },
        { title: 'Acting for TV and Film', mentors: 'Moisés Bittencourt' },
        { title: 'TV Prep', mentors: 'Marcelo Zambelli' },
        { title: 'Acting and Presenting Prep', mentors: 'Blad Meneghel' },
        {
          title: 'Musical Theatre Intensive',
          mentors: 'Reiner Tenente, Betto Serrador, Sueli Guerra, and Patrícia Carillo',
        },
      ],
    },
    skills: { label: 'Skills', groups: [] },
    representation: { label: 'Representation', value: 'Instituto das Artes Luana Lopes' },
    resume: { label: 'Download résumé' },
  },
  work: {
    categories: {
      theater: 'Theater',
      film: 'Film',
      tv: 'TV',
      advertising: 'Advertising',
      voice: 'Voice',
    },
    fields: {
      role: 'Role',
      director: 'Direction',
      company: 'Company',
      venue: 'Venue',
    },
  },
  gallery: {
    reelLabel: 'Reel',
    reelPlayLabel: 'Watch the reel',
    reelTitle: "Actor's demo reel video",
    reelPending: '[to be defined]',
    expandLabel: 'Enlarge photo',
    previous: 'Previous photo',
    next: 'Next photo',
    closeLightbox: 'Close gallery',
  },
  contact: {
    declarationLine1: 'The next story',
    declarationLine2: 'could start here.',
  },
  nav: {
    languageToggleLabel: 'Switch to Portuguese',
    links: {
      about: 'About',
      work: 'Work',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuTitle: 'Navigation menu',
    menuDescription: 'Navigation links and language toggle.',
  },
  footer: {
    backToTop: 'Back to top',
    developedByPrefix: 'Developed by',
    channelPending: '[to be defined]',
    channels: {
      email: 'Email',
      instagram: 'Instagram',
      management: 'Management',
    },
  },
}
