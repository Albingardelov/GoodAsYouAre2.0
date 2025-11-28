import './Page.css'
import SEO from '../components/SEO'
import { usePrivacyPolicy } from '../hooks/useStrapi'

const PrivacyPolicy = () => {
  const {
    data: privacyData,
    isLoading,
    isError,
  } = usePrivacyPolicy()

  return (
    <>
      <SEO
        title="Privacy Policy - Good As You Are"
        description="Privacy Policy for Good As You Are. Learn how we collect, use, and protect your personal information."
        keywords="Privacy Policy, Data Protection, GDPR, Privacy"
        url="https://www.goodasyouare.com/privacy-policy"
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
            {privacyData?.attributes?.title && (
              <h1>{privacyData.attributes.title}</h1>
            )}
            {privacyData?.attributes?.content && (
              <div
                className="page-text"
                dangerouslySetInnerHTML={{
                  __html: privacyData.attributes.content.replace(/\n/g, '<br />'),
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

export default PrivacyPolicy

