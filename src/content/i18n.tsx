import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { pt } from './pt'
import { en } from './en'

export type Language = 'pt' | 'en'

interface QuickFact {
  label: string
  value: string
}

interface TrainingEntry {
  title: string
  mentors: string
}

interface TrainingFact {
  label: string
  entries: readonly TrainingEntry[]
}

interface SkillGroup {
  label: string
  items: readonly string[]
}

interface Statement {
  /** Primeiras palavras da declaração — recebem a aparição única de acento da seção. */
  accent: string
  /** Restante da frase, incluindo o espaço inicial que a separa do trecho acentuado. */
  rest: string
}

/**
 * Campos da ficha técnica do dossiê, na ordem de leitura definida em
 * docs/design.md ("Sobre"). Obrigatório = dado que já existe
 * hoje; opcional = dado que o ator ainda não enviou.
 *
 * A opcionalidade aqui não é conveniência de build: um campo ausente é
 * **omitido do dicionário**, nunca preenchido com string vazia ou "[a
 * definir]", porque a seção não renderiza rótulo sem valor. Quando o
 * dado chegar, basta acrescentar a chave nos dois dicionários — nenhum
 * componente muda.
 */
interface SheetFields {
  playingAge?: QuickFact
  height?: QuickFact
  eyes?: QuickFact
  hair?: QuickFact
  voice?: QuickFact
  languages?: QuickFact
  born: QuickFact
  base?: QuickFact
  union?: QuickFact
}

export type SheetFieldKey = keyof SheetFields

export interface Dictionary {
  hero: {
    tagline: string
    ctaLabel: string
  }
  about: {
    statement: Statement
    plate: {
      alt: string
    }
    bio: readonly string[]
    sheet: {
      label: string
      fields: SheetFields
    }
    training: TrainingFact
    /** `groups` vazio enquanto o ator não enviar as habilidades — a banda
        inteira deixa de renderizar nesse caso. */
    skills: {
      label: string
      groups: readonly SkillGroup[]
    }
    representation: QuickFact
    /** Rótulo do CTA. A existência do arquivo é decidida em `src/data/dossier.ts`. */
    resume: {
      label: string
    }
  }
  work: {
    categories: {
      theater: string
      film: string
      tv: string
      advertising: string
      voice: string
    }
    fields: {
      role: string
      director: string
      company: string
      venue: string
    }
  }
  gallery: {
    reelLabel: string
    reelPlayLabel: string
    reelTitle: string
    reelPending: string
    expandLabel: string
    previous: string
    next: string
    closeLightbox: string
  }
  contact: {
    declarationLine1: string
    declarationLine2: string
  }
  nav: {
    languageToggleLabel: string
    links: {
      about: string
      work: string
      gallery: string
      contact: string
    }
    openMenu: string
    closeMenu: string
    menuTitle: string
    menuDescription: string
  }
  footer: {
    backToTop: string
    developedByPrefix: string
    channelPending: string
    channels: {
      email: string
      instagram: string
      management: string
    }
  }
}

const dictionaries: Record<Language, Dictionary> = { pt, en }

interface I18nContextValue {
  language: Language
  dictionary: Dictionary
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt')

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      dictionary: dictionaries[language],
      setLanguage,
      toggleLanguage: () =>
        setLanguage((current) => (current === 'pt' ? 'en' : 'pt')),
    }),
    [language],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
