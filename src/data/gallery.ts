// `src`/`posterSrc` apontam para os assets reais gerados no Item 12, servidos
// de `public/assets/images/` (caminho estático direto, sem processamento
// do bundler — necessário porque são strings simples guardadas em dado, não
// imports de módulo).

import type { BilingualText } from './types'

export interface GalleryPhoto {
  id: string
  src: string
  // Dimensões intrínsecas reais do arquivo (não um aspect ratio inventado —
  // os arquivos não compartilham todos a mesma proporção, ver comentário
  // nas entradas abaixo). Repassadas como `width`/`height` da tag <img> no
  // palco e no lightbox, para que o navegador reserve o espaço correto antes
  // do download — sem isso, o container colapsa para ~0px sob rede lenta.
  width: number
  height: number
  alt: BilingualText
  caption?: BilingualText
  // Ajusta só o `object-position` da miniatura (navegação) — nunca afeta a
  // imagem principal, que sempre respeita o enquadramento original.
  thumbnailPosition?: string
}

interface ReelBase {
  posterSrc: string
  posterAlt: BilingualText
}

// Assim como `ContactChannel` (src/data/contact.ts), o reel distingue um
// embed real de um pendente: sem isso, o player tentaria montar um <iframe>
// apontando para uma URL fictícia, gerando uma requisição de rede real que
// falha (404) e um player quebrado — o mesmo problema que o Item 11 corrigiu
// para os canais de contato.
export type Reel =
  | (ReelBase & { status: 'defined'; embedUrl: string })
  | (ReelBase & { status: 'pending' })

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'foto-exemplo-1',
    src: '/assets/images/gallery-01.webp',
    width: 4640,
    height: 6960,
    alt: {
      pt: 'Headshot',
      en: 'Headshot',
    },
  },
  {
    id: 'foto-exemplo-2',
    src: '/assets/images/gallery-02.webp',
    width: 4640,
    height: 6960,
    alt: {
      pt: 'Corpo Inteiro',
      en: 'Full Body',
    },
  },
  {
    id: 'foto-exemplo-3',
    src: '/assets/images/gallery-03.webp',
    width: 4640,
    height: 6960,
    alt: {
      pt: 'Meio Corpo',
      en: 'Three-Quarter Portrait',
    },
  },
  {
    id: 'foto-exemplo-4',
    src: '/assets/images/gallery-04.webp',
    width: 4640,
    height: 6960,
    alt: {
      pt: 'Retrato de Casting',
      en: 'Casting Portrait',
    },
  },
  {
    id: 'foto-exemplo-5',
    src: '/assets/images/gallery-05.webp',
    width: 4640,
    height: 6960,
    alt: {
      pt: 'Retrato Comercial',
      en: 'Commercial Portrait',
    },
  },
  {
    id: 'foto-exemplo-6',
    src: '/assets/images/gallery-06.webp',
    width: 4640,
    height: 6960,
    alt: {
      pt: 'Corpo Inteiro',
      en: 'Full Body',
    },
  },
  {
    id: 'foto-exemplo-7',
    src: '/assets/images/gallery-07.webp',
    width: 1474,
    height: 1920,
    alt: {
      pt: 'Retrato Editorial',
      en: 'Editorial Portrait',
    },
  },
  {
    id: 'foto-exemplo-8',
    src: '/assets/images/gallery-08.webp',
    width: 1440,
    height: 1920,
    alt: {
      pt: 'Retrato Dramático',
      en: 'Dramatic Portrait',
    },
  },
]

export const reel: Reel = {
  status: 'defined',
  posterSrc: '/assets/images/reel-poster.webp',
  embedUrl: 'https://www.youtube.com/embed/e7COm5EI14Q?si=ogYi_WM2NXBBWEmi',
  posterAlt: {
    pt: 'Performance musical em estúdio',
    en: "Studio Music Performance",
  },
}
