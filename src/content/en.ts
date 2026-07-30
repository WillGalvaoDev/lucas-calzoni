import type { Dictionary } from './i18n'

export const en: Dictionary = {
  hero: {
    tagline: 'Film, Television & Theatre Actor',
  },
  about: {
    bio: 'Acting has always found a way to be part of my life. As a child, I discovered on my school’s stage a place where I could tell stories and see the world through different perspectives. Years later, in 2018, a trip to New York turned that passion into certainty. It was there that I chose to leave behind my degree in Petroleum and Gas Engineering and devote myself wholeheartedly to the path of acting.',
    quickFacts: {
      born: { label: 'Born', value: 'São Paulo, Brazil, 1993' },
      training: { label: 'Training', value: "Contemporary Belting (Tiago Bezerra), Classical Ballet (Alessandra Lona), Ivana Chubbuck's Acting Technique + Lorena Comparato's Method (Marina Figueira), Acting for TV and Film (Moisés Bittencourt), TV Prep (Marcelo Zambelli), Acting and Presenting Prep (Blad Meneghel), Musical Theatre Intensive (Reiner Tenente, Betto Serrador, Sueli Guerra, and Patrícia Carillo)" },
      representation: { label: 'Representation', value: 'Instituto das Artes Luana Lopes' },
    },
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
    reelPlayLabel: 'Watch the reel',
    reelTitle: "Actor's demo reel video",
    reelPending: '[to be defined]',
    expandLabel: 'Enlarge photo',
    previous: 'Previous photo',
    next: 'Next photo',
    closeLightbox: 'Close gallery',
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
