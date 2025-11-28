import './Page.css'
import SEO from '../components/SEO'
import { useToxism } from '../hooks/useStrapi'
import { getStrapiImageUrl } from '../services/strapi'

const Toxism = () => {
  const {
    data: toxismData,
    isLoading,
    isError,
  } = useToxism()

  const toxismImageUrl = toxismData?.attributes?.image
    ? getStrapiImageUrl(toxismData.attributes.image)
    : null

  return (
    <>
      <SEO
        title="Toxism vs Narcissism - Good As You Are"
        description="Understanding the difference between toxism and narcissism. Learn about toxic personality traits and how to navigate toxic relationships."
        keywords="Toxism, Narcissism, Toxic Relationships, Narcissistic Personality, Toxic Personality Traits"
        url="https://www.goodasyouare.com/toxism"
      />
      <div className="page">
      <div className="page-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : isError ? (
          <div className="error">
            Error loading content. Please check:
            <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
              <li>That Strapi is running on port 1337</li>
              <li>That "toxism" Content Type exists in Strapi</li>
              <li>That content is published (not Draft)</li>
              <li>That Public role has "find" and "findOne" permissions</li>
              <li>Check browser console for detailed error</li>
            </ul>
          </div>
        ) : toxismData?.attributes ? (
          <div className="page-content">
            {toxismData.attributes.title && (
              <h1>{toxismData.attributes.title}</h1>
            )}
            {toxismImageUrl && (
              <div className="page-image">
                <img
                  src={toxismImageUrl}
                  alt={
                    (toxismData.attributes.image as any)?.alternativeText ||
                    toxismData.attributes.title ||
                    'Toxism image'
                  }
                  loading="lazy"
                  width="800"
                  height="450"
                />
              </div>
            )}
            
            {/* Render all 8 sections */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const title = toxismData.attributes[`section${num}Title` as keyof typeof toxismData.attributes] as string | undefined
              const content = toxismData.attributes[`section${num}Content` as keyof typeof toxismData.attributes] as string | undefined
              
              if (!title && !content) return null
              
              return (
                <div key={num} className="about-section">
                  {title && <h2>{title}</h2>}
                  {content && (
                    <div
                      className="page-text"
                      dangerouslySetInnerHTML={{
                        __html: content.replace(/\n/g, '<br />'),
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
    </>
  )
}

export default Toxism
