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

export interface Dictionary {
  hero: {
    tagline: string
  }
  about: {
    bio: string
    quickFacts: {
      born: QuickFact
      training: QuickFact
      representation: QuickFact
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
    reelPlayLabel: string
    reelTitle: string
    reelPending: string
    expandLabel: string
    previous: string
    next: string
    closeLightbox: string
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
