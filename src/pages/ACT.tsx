import './Page.css'
import SEO from '../components/SEO'
import { useACT } from '../hooks/useStrapi'
import { getStrapiImageUrl } from '../services/strapi'

const ACT = () => {
  const {
    data: actData,
    isLoading,
    isError,
  } = useACT()

  const actImageUrl = actData?.attributes?.image
    ? getStrapiImageUrl(actData.attributes.image)
    : null

  return (
    <>
      <SEO
        title="What is ACT - Good As You Are"
        description="Learn about ACT (Acceptance and Commitment Therapy) - a mindfulness-based behavioral therapy that helps you live a meaningful life."
        keywords="ACT Therapy, Acceptance and Commitment Therapy, Mindfulness, ACT Sweden, Behavioral Therapy"
        url="https://www.goodasyouare.com/act"
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
              <li>That "act" Content Type exists in Strapi</li>
              <li>That content is published (not Draft)</li>
              <li>That Public role has "find" and "findOne" permissions</li>
              <li>Check browser console for detailed error</li>
            </ul>
          </div>
        ) : actData?.attributes ? (
          <div className="page-content">
            {actData.attributes.title && (
              <h1>{actData.attributes.title}</h1>
            )}
            {actImageUrl && (
              <div className="page-image">
                <img
                  src={actImageUrl}
                  alt={
                    (actData.attributes.image as any)?.alternativeText ||
                    actData.attributes.title ||
                    'ACT image'
                  }
                  loading="lazy"
                  width="800"
                  height="450"
                />
              </div>
            )}
            
            {/* Render all 8 sections */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const title = actData.attributes[`section${num}Title` as keyof typeof actData.attributes] as string | undefined
              const content = actData.attributes[`section${num}Content` as keyof typeof actData.attributes] as string | undefined
              
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

export default ACT
