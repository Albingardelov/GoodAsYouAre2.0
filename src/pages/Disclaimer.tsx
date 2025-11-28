import './Page.css'
import SEO from '../components/SEO'
import { useDisclaimer } from '../hooks/useStrapi'

const Disclaimer = () => {
  const {
    data: disclaimerData,
    isLoading,
    isError,
  } = useDisclaimer()

  return (
    <>
      <SEO
        title="Disclaimer - Good As You Are"
        description="Disclaimer for Good As You Are. Important information about our services and content."
        keywords="Disclaimer, Terms, Legal Information"
        url="https://www.goodasyouare.com/disclaimer"
        type="article"
      />
      <div className="page">
      <div className="page-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : isError ? (
          <div className="error">
            Error loading content. Please check that Strapi is running and content is published.
          </div>
        ) : (
          <div className="page-content">
            {disclaimerData?.attributes?.title && (
              <h1>{disclaimerData.attributes.title}</h1>
            )}
            {disclaimerData?.attributes?.content && (
              <div
                className="page-text"
                dangerouslySetInnerHTML={{
                  __html: disclaimerData.attributes.content.replace(/\n/g, '<br />'),
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Disclaimer

