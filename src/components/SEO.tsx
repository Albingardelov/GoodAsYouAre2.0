import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  structuredData?: object
}

const SEO = ({
  title = 'Good As You Are - ACT Therapy, Motivation Coaching & Lectures on Narcissism',
  description = 'Specialized in ACT Therapy, Motivation Coaching, and Lectures on Narcissism. Helping you move toward your full potential with mindfulness and practical tools.',
  keywords = 'ACT Therapy, Motivation Coaching, Narcissism, Toxic Relationships, Mindfulness, ACT Therapist, Good As You Are, Therapy Sweden',
  image = '/og-image.jpg',
  url = 'https://www.goodasyouare.com',
  type = 'website',
  structuredData,
}: SEOProps) => {
  const fullTitle = title.includes('Good As You Are') ? title : `${title} | Good As You Are`
  const fullUrl = url.startsWith('http') ? url : `https://www.goodasyouare.com${url}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Good As You Are" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English, Swedish" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Good As You Are" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="sv_SE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO

