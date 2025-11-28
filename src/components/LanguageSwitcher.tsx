import { useLanguage } from '../contexts/LanguageContext'
import './LanguageSwitcher.css'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="language-switcher">
      <button
        className={`lang-button ${language === 'sv' ? 'active' : ''}`}
        onClick={() => setLanguage('sv')}
        aria-label="Switch to Swedish"
      >
        SV
      </button>
      <button
        className={`lang-button ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  )
}

export default LanguageSwitcher

