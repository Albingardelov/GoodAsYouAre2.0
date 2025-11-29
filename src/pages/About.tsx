import './Page.css'
import SEO from '../components/SEO'
import { useAbout } from '../hooks/useStrapi'
import { getStrapiImageUrl } from '../services/strapi'

const About = () => {
  const {
    data: aboutData,
    isLoading,
    isError,
  } = useAbout()

  const backgroundImageUrl = aboutData?.attributes?.backgroundImage
    ? getStrapiImageUrl(aboutData.attributes.backgroundImage)
    : null

  const profileImageUrl = aboutData?.attributes?.profileImage
    ? getStrapiImageUrl(aboutData.attributes.profileImage)
    : null

  return (
    <>
      <SEO
        title="About Me - Good As You Are"
        description="Why I became an ACT Therapist. Specialized in narcissism and toxic personality. Learn about my journey and approach to therapy."
        keywords="ACT Therapist, About, Narcissism Specialist, Toxic Relationships, ACT Therapy Sweden"
        url="https://www.goodasyouare.com/about"
      />
      <div 
        className="page about-page"
      style={
        backgroundImageUrl
          ? {
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
    >
      <div className="page-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : isError ? (
          <div className="error">
            Error loading content. Please check:
            <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
              <li>That Strapi is running on port 1337</li>
              <li>That "about" Content Type exists in Strapi</li>
              <li>That content is published (not Draft)</li>
              <li>That Public role has "find" and "findOne" permissions</li>
              <li>Check browser console for detailed error</li>
            </ul>
          </div>
        ) : aboutData?.attributes ? (
          <div className="page-content">
            {aboutData.attributes.title && (
              <h1>{aboutData.attributes.title}</h1>
            )}
            {profileImageUrl && (
              <div className="profile-image">
                <img
                  src={profileImageUrl}
                  alt={
                    (aboutData.attributes.profileImage as any)?.alternativeText ||
                    'Profile image'
                  }
                  loading="lazy"
                  width="200"
                  height="200"
                />
              </div>
            )}
            
            {/* Första sektionen */}
            {aboutData.attributes.section1Title && (
              <div className="about-section">
                <h2>{aboutData.attributes.section1Title}</h2>
                {aboutData.attributes.section1Content && (
                  <div
                    className="page-text"
                    dangerouslySetInnerHTML={{
                      __html: aboutData.attributes.section1Content.replace(/\n/g, '<br />'),
                    }}
                  />
                )}
              </div>
            )}
            
            {/* Andra sektionen */}
            {aboutData.attributes.section2Title && (
              <div className="about-section">
                <h2>{aboutData.attributes.section2Title}</h2>
                {aboutData.attributes.section2Content && (
                  <div
                    className="page-text"
                    dangerouslySetInnerHTML={{
                      __html: aboutData.attributes.section2Content.replace(/\n/g, '<br />'),
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
    </>
  )
}

export default About
