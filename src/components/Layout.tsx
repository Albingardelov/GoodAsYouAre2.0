import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { usePrivacy } from '../hooks/useStrapi'
import { navigationTranslations } from '../translations/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import logotyp from '../../assets/Logotyp4.svg'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const { language } = useLanguage()
  const t = navigationTranslations[language]
  const { data: privacyData } = usePrivacy()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            <img src={logotyp} alt="Good As You Are" className="logo-image" />
          </Link>
          <ul className="nav-links">
            <li>
              <LanguageSwitcher />
            </li>
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}>
                {t.home}
              </Link>
            </li>
            <li>
              <Link to="/about" className={isActive('/about') ? 'active' : ''}>
                {t.about}
              </Link>
            </li>
            <li>
              <Link to="/act" className={isActive('/act') ? 'active' : ''}>
                {t.act}
              </Link>
            </li>
            <li>
              <Link
                to="/toxism"
                className={isActive('/toxism') ? 'active' : ''}
              >
                {t.toxism}
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={isActive('/services') ? 'active' : ''}
              >
                {t.services}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={isActive('/contact') ? 'active' : ''}
              >
                {t.contact}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <div className="footer-content">
          <p>
            <Link to="/privacy-policy" style={{ color: 'white', textDecoration: 'underline' }}>
              {privacyData?.attributes?.privacyPolicyText || t.privacyPolicy}
            </Link>
            {' – '}
            <Link to="/disclaimer" style={{ color: 'white', textDecoration: 'underline' }}>
              {privacyData?.attributes?.disclaimerText || t.disclaimer}
            </Link>
          </p>
          <p>&copy; {new Date().getFullYear()} {t.logo}</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
