import './Home.css'
import SEO from '../components/SEO'
import { useHomeHero, useHomeTestimonial } from '../hooks/useStrapi'
import { getStrapiImageUrl } from '../services/strapi'

const Home = () => {
  const {
    data: heroData,
    isLoading: heroLoading,
    isError: heroError,
  } = useHomeHero()

  const {
    data: testimonialData,
    isLoading: testimonialLoading,
    isError: testimonialError,
  } = useHomeTestimonial()

  // Get hero image URL from Strapi
  const heroImageUrl = heroData?.attributes?.image
    ? getStrapiImageUrl(heroData.attributes.image)
    : null

  // Split testimonial text into paragraphs (split by double newlines or periods followed by space)
  const testimonialParagraphs = testimonialData?.attributes?.text
    ? testimonialData.attributes.text
        .split(/\n\n+|\.\s+(?=[A-Z"])/)
        .filter((p) => p.trim().length > 0)
    : []

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Good As You Are',
    description: 'Specialized in ACT Therapy, Motivation Coaching, and Lectures on Narcissism',
    url: 'https://www.goodasyouare.com',
    serviceType: ['ACT Therapy', 'Motivation Coaching', 'Lectures on Narcissism'],
    areaServed: {
      '@type': 'Country',
      name: 'Sweden',
    },
  }

  return (
    <>
      <SEO
        title="Good As You Are - ACT Therapy, Motivation Coaching & Lectures on Narcissism"
        description="Specialized in ACT Therapy, Motivation Coaching, and Lectures on Narcissism. Helping you move toward your full potential with mindfulness and practical tools."
        keywords="ACT Therapy, Motivation Coaching, Narcissism, Toxic Relationships, Mindfulness, ACT Therapist, Good As You Are, Therapy Sweden, goodasyouare"
        url="https://www.goodasyouare.com"
        structuredData={structuredData}
      />
      <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            {heroLoading ? (
              <div className="loading">Loading...</div>
            ) : heroError ? (
              <div className="error">Error loading content</div>
            ) : heroData?.attributes?.title ? (
              <>
                <h1 className="hero-title">
                  {heroData.attributes.title
                    .replace(/\\n/g, '\n') // Replace escaped \n with actual newlines
                    .split('\n')
                    .map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                </h1>
                {heroData.attributes.subtitle && (
                  <p className="hero-subtitle">
                    {heroData.attributes.subtitle}
                  </p>
                )}
              </>
            ) : null}
          </div>
          {heroImageUrl && (
            <div className="hero-image">
              <img
                src={heroImageUrl}
                alt={
                  (heroData?.attributes?.image as any)?.alternativeText ||
                  'Hero image'
                }
                loading="eager"
                fetchPriority="high"
                width="800"
                height="450"
              />
            </div>
          )}
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="testimonial">
            {testimonialLoading ? (
              <div className="loading">Loading testimonial...</div>
            ) : testimonialError ? (
              <div className="error">Error loading testimonial</div>
            ) : testimonialParagraphs.length > 0 ? (
              testimonialParagraphs.map((paragraph, index) => (
                <p key={index} className="testimonial-text">
                  {paragraph.trim()}
                </p>
              ))
            ) : null}
          </div>

        </div>
      </section>
    </div>
    </>
  )
}

export default Home
