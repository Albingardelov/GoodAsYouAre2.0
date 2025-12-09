import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'sv' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Get initial language from localStorage or default to 'sv'
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language
    return saved === 'sv' || saved === 'en' ? saved : 'sv'
  })

  // Save to localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language)
    // Trigger storage event so cookie banner can update
    window.dispatchEvent(new Event('storage'))
    // Also trigger custom event for cookie banner
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }))
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

