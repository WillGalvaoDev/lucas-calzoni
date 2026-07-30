import type { BilingualText } from './types'

// Enum preparado para categorias que o ator ainda não possui (Cinema, TV,
// Publicidade, Voz) — a UI nunca renderiza uma categoria sem entradas
// correspondentes em `work` (sem filtro, sem grade fixa de categorias), então
// adicionar entradas dessas categorias no futuro não exige mudança de tipo.
export const workCategories = ['theater', 'film', 'tv', 'advertising', 'voice'] as const

export type WorkCategory = (typeof workCategories)[number]

export interface WorkEntry {
  id: string
  year: number
  title: BilingualText
  category: WorkCategory
  role?: BilingualText
  director?: BilingualText
  company?: BilingualText
  venue?: BilingualText
  description?: BilingualText
  imageSrc?: string
  imageAlt?: BilingualText
}

export const work: WorkEntry[] = [
  {
    id: 'ciclosemfim',
    year: 2025,
    title: { pt: 'Ciclo Sem Fim', en: 'Circle of Life' },
    category: 'theater',
    role: { pt: 'Mufasa', en: 'Mufasa' },
  },
  {
    id: 'casedesucesso',
    year: 2022,
    title: { pt: 'Case de Sucesso', en: 'Success Story' },
    category: 'film',
    role: { pt: 'Lucas Fortes', en: 'Lucas Fortes' },
  },
  {
    id: 'aladdin',
    year: 2021,
    title: { pt: 'Aladdin', en: 'Aladdin' },
    category: 'theater',
    role: { pt: 'Sultão', en: 'Sultan' },
  },
  {
    id: 'aorigemdosguardioes',
    year: 2020,
    title: { pt: 'A Origem dos Guardiões', en: 'Rise of the Guardians' },
    category: 'theater',
    role: { pt: 'Breu', en: 'Pitch Black' },
  },
  {
    id: 'vivaavidaeumafesta',
    year: 2019,
    title: { pt: 'Viva: A Vida é uma Festa', en: 'Coco' },
    category: 'theater',
    role: { pt: 'Pai do Miguel', en: "Papá (Miguel's father)" },
  },
  {
    id: 'hairspray',
    year: 2019,
    title: { pt: 'Hairspray', en: 'Hairspray' },
    category: 'theater',
    role: { pt: 'Corny Collins', en: 'Corny Collins' },
  },
  {
    id: 'moana',
    year: 2018,
    title: { pt: 'Moana', en: 'Moana' },
    category: 'theater',
    role: { pt: 'Coro', en: 'Ensemble' },
  },
  {
    id: 'oreidoshow',
    year: 2018,
    title: { pt: 'O Rei do Show', en: 'The Greatest Showman' },
    category: 'theater',
    role: { pt: 'Sr. Carlyle (Pai do Phillip Carlyle)', en: "Mr. Carlyle (Phillip Carlyle's father)" },
  },
  {
    id: 'mammamia',
    year: 2018,
    title: { pt: 'Mamma Mia!', en: 'Mamma Mia!' },
    category: 'theater',
    role: { pt: 'Harry Bright', en: 'Harry Bright' },
  },
]
