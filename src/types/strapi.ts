// Generic Strapi response types
export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiEntity<T> {
  id: number
  attributes: T
}

export interface StrapiImage {
  data: {
    id: number
    attributes: {
      name: string
      alternativeText?: string
      caption?: string
      width: number
      height: number
      formats?: {
        thumbnail?: StrapiImageFormat
        small?: StrapiImageFormat
        medium?: StrapiImageFormat
        large?: StrapiImageFormat
      }
      hash: string
      ext: string
      mime: string
      size: number
      url: string
      previewUrl?: string
      provider: string
      createdAt: string
      updatedAt: string
    }
  } | null
}

export interface StrapiImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  path?: string
  url: string
}

// Home page content types
export interface HomeHero {
  title: string
  subtitle: string
  image?: StrapiImage
}

export interface HomeTestimonial {
  text: string
}

export interface HomeContent {
  hero: StrapiEntity<HomeHero>
  testimonial: StrapiEntity<HomeTestimonial>
  infoText: string
  ctaTitle: string
  ctaText: string
  welcomeText: string
}

// Generic page content type
export interface PageContent {
  title: string
  content: string
  slug: string
}

// About page content type
export interface AboutContent {
  title: string // Huvudrubrik (t.ex. "About me, Petra")
  section1Title?: string // Första sektionens rubrik (t.ex. "Why I became an ACT Therapist")
  section1Content?: string // Första sektionens text
  section2Title?: string // Andra sektionens rubrik (t.ex. "Specialized in narcissism and toxic personality")
  section2Content?: string // Andra sektionens text
  backgroundImage?: any // Strapi image object (v5 structure) - bakgrundsbild
  profileImage?: any // Strapi image object (v5 structure) - profilbild
}

// ACT page content type
export interface ACTContent {
  title?: string // Huvudrubrik (t.ex. "What is ACT")
  section1Title?: string
  section1Content?: string
  section2Title?: string
  section2Content?: string
  section3Title?: string
  section3Content?: string
  section4Title?: string
  section4Content?: string
  section5Title?: string
  section5Content?: string
  section6Title?: string
  section6Content?: string
  section7Title?: string
  section7Content?: string
  section8Title?: string
  section8Content?: string
  image?: any // Strapi image object (v5 structure) - valfri bild
}

// Toxism page content type
export interface ToxismContent {
  title?: string // Huvudrubrik (t.ex. "Toxism vs Narcissism")
  section1Title?: string
  section1Content?: string
  section2Title?: string
  section2Content?: string
  section3Title?: string
  section3Content?: string
  section4Title?: string
  section4Content?: string
  section5Title?: string
  section5Content?: string
  section6Title?: string
  section6Content?: string
  section7Title?: string
  section7Content?: string
  section8Title?: string
  section8Content?: string
  image?: any // Strapi image object (v5 structure) - valfri bild
}

// Services page content type
export interface ServicesContent {
  title?: string // Huvudrubrik (t.ex. "Services")
  section1Title?: string
  section1Content?: string
  section2Title?: string
  section2Content?: string
  section3Title?: string
  section3Content?: string
  image?: any // Strapi image object (v5 structure) - valfri bild
}

// Contact page content type
export interface ContactContent {
  title?: string // Huvudrubrik (t.ex. "Contact")
  nameLabel?: string // Label för namn-fält
  emailLabel?: string // Label för email-fält
  messageLabel?: string // Label för meddelande-fält
  submitButtonText?: string // Text på submit-knappen
  privacyPolicyText?: string // Text för privacy policy checkbox
  successMessage?: string // Meddelande när formulär skickats
  errorMessage?: string // Meddelande vid fel
}

// Privacy/Disclaimer content type (for footer)
export interface PrivacyContent {
  privacyPolicyText?: string // Text för Privacy Policy-länk (t.ex. "Privacy Policy" / "Integritetspolicy")
  disclaimerText?: string // Text för Disclaimer-länk (t.ex. "Disclaimer" / "Ansvarsfriskrivning")
}

// Privacy Policy page content type
export interface PrivacyPolicyContent {
  title?: string // Huvudrubrik (t.ex. "Privacy Policy")
  content?: string // Hela Privacy Policy-texten (lång text)
}

// Disclaimer page content type
export interface DisclaimerContent {
  title?: string // Huvudrubrik (t.ex. "Disclaimer")
  content?: string // Hela Disclaimer-texten (lång text)
}