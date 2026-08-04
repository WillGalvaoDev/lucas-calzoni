import type { Dictionary } from './i18n'

export const pt: Dictionary = {
  hero: {
    tagline: 'Ator de Cinema, TV e Teatro',
    ctaLabel: 'Ver Trabalhos',
  },
  about: {
    statement: {
      accent: 'A atuação',
      rest: ' sempre encontrou um jeito de fazer parte da minha vida.',
    },
    plate: {
      alt: 'Retrato de estúdio de Lucas Calzoni, em preto e branco, olhando para a câmera.',
    },
    bio: [
      'Ainda criança, descobri nos palcos da escola um lugar onde eu podia contar histórias e experimentar diferentes formas de enxergar o mundo.',
      'Anos depois, em 2018, uma viagem a Nova Iorque transformou essa paixão em certeza. Foi ali que decidi deixar para trás o bacharelado em Petróleo e Gás e seguir, de corpo e alma, o caminho da arte.',
    ],
    // Só `born` existe hoje. Os demais campos da ficha (idade cênica, altura,
    // olhos, cabelo, voz, idiomas, base, registro) entram aqui à medida que o
    // ator enviar os dados — ver docs/product.md, "Pendências de conteúdo".
    // Campo ausente não renderiza; nunca preencher com "[a definir]".
    sheet: {
      label: 'Ficha técnica',
      fields: {
        born: { label: 'Nascimento', value: 'São Paulo, Brasil, 1993' },
      },
    },
    training: {
      label: 'Formação',
      entries: [
        { title: 'Belting Contemporâneo', mentors: 'Tiago Bezerra' },
        { title: 'Ballet Clássico', mentors: 'Alessandra Lona' },
        {
          title: 'A Técnica do Ator de Ivana Chubbuck + Método Comparato de Lorena Comparato',
          mentors: 'Marina Figueira',
        },
        { title: 'Atuação para TV e Cinema', mentors: 'Moisés Bittencourt' },
        { title: 'Preparatório para TV', mentors: 'Marcelo Zambelli' },
        { title: 'Preparatório para Atores e Apresentadores', mentors: 'Blad Meneghel' },
        {
          title: 'Intensivo de Teatro Musical',
          mentors: 'Reiner Tenente, Betto Serrador, Sueli Guerra e Patrícia Carillo',
        },
      ],
    },
    skills: { label: 'Habilidades', groups: [] },
    representation: { label: 'Representação', value: 'Instituto das Artes Luana Lopes' },
    resume: { label: 'Baixar currículo' },
  },
  work: {
    categories: {
      theater: 'Teatro',
      film: 'Cinema',
      tv: 'TV',
      advertising: 'Publicidade',
      voice: 'Voz',
    },
    fields: {
      role: 'Personagem',
      director: 'Direção',
      company: 'Companhia',
      venue: 'Local',
    },
  },
  gallery: {
    reelLabel: 'Reel',
    reelPlayLabel: 'Assistir ao reel',
    reelTitle: 'Vídeo de apresentação do ator',
    reelPending: '[a definir]',
    expandLabel: 'Ampliar foto',
    previous: 'Foto anterior',
    next: 'Próxima foto',
    closeLightbox: 'Fechar galeria',
  },
  contact: {
    declarationLine1: 'A próxima história',
    declarationLine2: 'pode começar aqui.',
  },
  nav: {
    languageToggleLabel: 'Mudar para inglês',
    links: {
      about: 'Sobre',
      work: 'Trabalhos',
      gallery: 'Galeria',
      contact: 'Contato',
    },
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    menuTitle: 'Menu de navegação',
    menuDescription: 'Links de navegação e alternância de idioma.',
  },
  footer: {
    backToTop: 'Voltar ao topo',
    developedByPrefix: 'Desenvolvido por',
    channelPending: '[a definir]',
    channels: {
      email: 'E-mail',
      instagram: 'Instagram',
      management: 'Empresário',
    },
  },
}
