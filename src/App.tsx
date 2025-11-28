import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import ACT from './pages/ACT'
import Toxism from './pages/Toxism'
import Services from './pages/Services'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Disclaimer from './pages/Disclaimer'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/act" element={<ACT />} />
            <Route path="/toxism" element={<Toxism />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  )
}

export default App
