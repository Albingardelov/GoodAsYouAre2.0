import './Page.css'
import SEO from '../components/SEO'
import { useServices } from '../hooks/useStrapi'
import { getStrapiImageUrl } from '../services/strapi'

const Services = () => {
  const {
    data: servicesData,
    isLoading,
    isError,
  } = useServices()

  const servicesImageUrl = servicesData?.attributes?.image
    ? getStrapiImageUrl(servicesData.attributes.image)
    : null

  return (
    <>
      <SEO
        title="Services - Good As You Are"
        description="Professional services including ACT Therapy, Motivation Coaching, and Lectures on Narcissism. Book a session today."
        keywords="ACT Therapy Services, Motivation Coaching, Therapy Sessions, Narcissism Lectures, Good As You Are Services"
        url="https://www.goodasyouare.com/services"
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
              <li>That "service" Content Type exists in Strapi</li>
              <li>That content is published (not Draft)</li>
              <li>That Public role has "find" and "findOne" permissions</li>
              <li>Check browser console for detailed error</li>
            </ul>
          </div>
        ) : servicesData?.attributes ? (
          <div className="page-content">
            {servicesData.attributes.title && (
              <h1>{servicesData.attributes.title}</h1>
            )}
            {servicesImageUrl && (
              <div className="page-image">
                <img
                  src={servicesImageUrl}
                  alt={
                    (servicesData.attributes.image as any)?.alternativeText ||
                    servicesData.attributes.title ||
                    'Services image'
                  }
                  loading="lazy"
                  width="800"
                  height="450"
                />
              </div>
            )}
            
            {/* Render all 3 sections */}
            {[1, 2, 3].map((num) => {
              const title = servicesData.attributes[`section${num}Title` as keyof typeof servicesData.attributes] as string | undefined
              const content = servicesData.attributes[`section${num}Content` as keyof typeof servicesData.attributes] as string | undefined
              
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

export default Services
