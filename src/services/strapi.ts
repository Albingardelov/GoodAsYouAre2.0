import strapiApi from '../lib/axios'
import type {
  StrapiResponse,
  StrapiEntity,
  HomeHero,
  HomeTestimonial,
  PageContent,
  AboutContent,
  ACTContent,
  ToxismContent,
  ServicesContent,
  ContactContent,
  PrivacyContent,
  PrivacyPolicyContent,
  DisclaimerContent,
} from '../types/strapi'
import { getStrapiUrl } from '../config/strapi'

// Helper function to get image URL from Strapi image object
// Supports both Strapi v4 (with attributes) and v5 (flat structure)
export const getStrapiImageUrl = (image: any): string | null => {
  if (!image) {
    return null
  }
  
  // Strapi v5 structure: image.url (direct on image object when populated)
  let url: string | null = null
  if (image?.url) {
    url = image.url
  }
  // Strapi v4 structure: image.data.attributes.url
  else if (image?.data?.attributes?.url) {
    url = image.data.attributes.url
  }
  // Strapi v5 alternative: image.data.url
  else if (image?.data?.url) {
    url = image.data.url
  }
  // Direct string
  else if (typeof image === 'string') {
    url = image
  }
  
  if (!url) {
    return null
  }
  
  // If URL is relative, prepend Strapi base URL
  if (url.startsWith('/')) {
    const baseUrl = getStrapiUrl('')
    return `${baseUrl}${url}`
  }
  
  return url
}

// Fetch home page hero content
export const fetchHomeHero = async (locale: string = 'sv'): Promise<StrapiEntity<HomeHero>> => {
  try {
    const response = await strapiApi.get<
      StrapiResponse<StrapiEntity<HomeHero> | StrapiEntity<HomeHero>[]>
    >(`/home-heroes?locale=${locale}&populate=*`)
    // Strapi returns array, get first item
    const data = response.data.data
    console.log('Home hero raw data:', data)
    
    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error('No home-hero content found')
      }
      // Strapi v5 returns data directly on object, not in attributes
      const item = data[0]
      console.log('Home hero item:', item)
      console.log('Item has attributes?', !!item.attributes)
      console.log('Item title:', (item as any).title)
      
      // Strapi v5 returns data directly on object, not in attributes
      // Always wrap in attributes structure for consistency
      if (!item.attributes) {
        const wrapped = {
          id: item.id,
          attributes: {
            title: (item as any).title || '',
            subtitle: (item as any).subtitle || '',
            image: (item as any).image || null,
          },
        } as StrapiEntity<HomeHero>
        console.log('Wrapped home hero:', wrapped)
        return wrapped
      }
      // If it already has attributes, return as is
      console.log('Returning item with attributes:', item)
      return item
    }
    
    // Handle single item response (non-array)
    const item = data as any
    
    if (!item.attributes && item.title) {
      return {
        id: item.id,
        attributes: {
          title: item.title || '',
          subtitle: item.subtitle || '',
          image: item.image || null,
        },
      } as StrapiEntity<HomeHero>
    }
    
    // If it already has attributes structure, return as is
    return item as StrapiEntity<HomeHero>
  } catch (error: any) {
    console.error('Error fetching home hero:', error)
    console.error('Error details:', {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
      url: error?.config?.url,
    })
    throw error
  }
}

// Fetch home page testimonial
export const fetchHomeTestimonial =
  async (locale: string = 'sv'): Promise<StrapiEntity<HomeTestimonial>> => {
    try {
      const response = await strapiApi.get<
        StrapiResponse<StrapiEntity<HomeTestimonial> | StrapiEntity<HomeTestimonial>[]>
      >(`/home-testimonials?locale=${locale}&populate=*`)
      // Strapi returns array, get first item
      const data = response.data.data
      if (Array.isArray(data)) {
        if (data.length === 0) {
          throw new Error('No home-testimonial content found')
        }
        // Strapi v5 returns data directly on object, not in attributes
        const item = data[0]
        if (!item.attributes && (item as any).text) {
          return {
            id: item.id,
            attributes: {
              text: (item as any).text,
            },
          } as StrapiEntity<HomeTestimonial>
        }
        return item
      }
      // Handle single item response
      const item = data as StrapiEntity<HomeTestimonial>
      if (!item.attributes && (item as any).text) {
        return {
          id: item.id,
          attributes: {
            text: (item as any).text,
          },
        } as StrapiEntity<HomeTestimonial>
      }
      return item
    } catch (error: any) {
      console.error('Error fetching home testimonial:', error)
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        url: error?.config?.url,
      })
      throw error
    }
  }

// Fetch page content by slug
export const fetchPageBySlug = async (
  slug: string
): Promise<StrapiEntity<PageContent> | null> => {
  try {
    const response = await strapiApi.get<
      StrapiResponse<StrapiEntity<PageContent>[]>
    >(`/pages?filters[slug][$eq]=${slug}`)
    const pages = response.data.data
    return pages.length > 0 ? pages[0] : null
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error)
    return null
  }
}

// Fetch all pages
export const fetchAllPages = async (): Promise<
  StrapiEntity<PageContent>[]
> => {
  const response = await strapiApi.get<
    StrapiResponse<StrapiEntity<PageContent>[]>
  >('/pages')
  return response.data.data
}

// Fetch about page content
export const fetchAbout = async (locale: string = 'sv'): Promise<StrapiEntity<AboutContent>> => {
  try {
    // Use same populate syntax as home-hero (which works)
    const response = await strapiApi.get<
      StrapiResponse<StrapiEntity<AboutContent> | StrapiEntity<AboutContent>[]>
    >(`/abouts?locale=${locale}&populate=*`)
    const data = response.data.data
    console.log('About raw data:', data)
    
    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error('No about content found')
      }
      const item = data[0]
      console.log('About item:', item)
      console.log('Item has attributes?', !!item.attributes)
      console.log('Item title:', (item as any).title)
      console.log('Item keys:', Object.keys(item))
      
      // Strapi v5 returns data directly on object, not in attributes
      // Note: Strapi may return field names with capital letters (BackgroundImage, ProfileImage)
      // Always wrap in attributes structure for consistency
      if (!item.attributes) {
        const wrapped = {
          id: item.id || 0,
          attributes: {
            title: (item as any).title || (item as any).Title || '',
            section1Title: (item as any).section1Title || null,
            section1Content: (item as any).section1Content || null,
            section2Title: (item as any).section2Title || null,
            section2Content: (item as any).section2Content || null,
            // Handle both camelCase and PascalCase field names
            backgroundImage: (item as any).backgroundImage || (item as any).BackgroundImage || null,
            profileImage: (item as any).profileImage || (item as any).ProfileImage || null,
          },
        } as StrapiEntity<AboutContent>
        console.log('Wrapped about:', wrapped)
        return wrapped
      }
      // If it already has attributes, return as is
      console.log('Returning about item with attributes:', item)
      return item
    }
    
    // Handle single item response
    const item = data as any
    console.log('About item (single):', item)
    
    if (!item.attributes) {
      const wrapped = {
        id: item.id,
        attributes: {
          title: item.title || item.Title || '',
          section1Title: item.section1Title || null,
          section1Content: item.section1Content || null,
          section2Title: item.section2Title || null,
          section2Content: item.section2Content || null,
          // Handle both camelCase and PascalCase field names
          backgroundImage: item.backgroundImage || item.BackgroundImage || null,
          profileImage: item.profileImage || item.ProfileImage || null,
        },
      } as StrapiEntity<AboutContent>
      console.log('Wrapped about (single):', wrapped)
      return wrapped
    }
    
    console.log('Returning about item as is:', item)
    return item as StrapiEntity<AboutContent>
  } catch (error: any) {
    console.error('Error fetching about:', error)
    console.error('Error details:', {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
      url: error?.config?.url,
    })
    throw error
  }
}

// Fetch ACT page content
export const fetchACT = async (locale: string = 'sv'): Promise<StrapiEntity<ACTContent>> => {
  try {
    const response = await strapiApi.get<
      StrapiResponse<StrapiEntity<ACTContent> | StrapiEntity<ACTContent>[]>
    >(`/acts?locale=${locale}&populate=*`)
    const data = response.data.data
    
    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error('No ACT content found')
      }
      const item = data[0]
      
      // Strapi v5 returns data directly on object, not in attributes
      // Always wrap in attributes structure for consistency
      if (!item.attributes) {
        return {
          id: item.id || 0,
          attributes: {
            title: (item as any).title || (item as any).Title || null,
            section1Title: (item as any).section1Title || null,
            section1Content: (item as any).section1Content || null,
            section2Title: (item as any).section2Title || null,
            section2Content: (item as any).section2Content || null,
            section3Title: (item as any).section3Title || null,
            section3Content: (item as any).section3Content || null,
            section4Title: (item as any).section4Title || null,
            section4Content: (item as any).section4Content || null,
            section5Title: (item as any).section5Title || null,
            section5Content: (item as any).section5Content || null,
            section6Title: (item as any).section6Title || null,
            section6Content: (item as any).section6Content || null,
            section7Title: (item as any).section7Title || null,
            section7Content: (item as any).section7Content || null,
            section8Title: (item as any).section8Title || null,
            section8Content: (item as any).section8Content || null,
            // Handle both camelCase and PascalCase field names
            image: (item as any).image || (item as any).Image || null,
          },
        } as StrapiEntity<ACTContent>
      }
      return item
    }
    
    // Handle single item response
    const item = data as any
    
    if (!item.attributes) {
      return {
        id: item.id,
        attributes: {
          title: item.title || item.Title || null,
          section1Title: item.section1Title || null,
          section1Content: item.section1Content || null,
          section2Title: item.section2Title || null,
          section2Content: item.section2Content || null,
          section3Title: item.section3Title || null,
          section3Content: item.section3Content || null,
          section4Title: item.section4Title || null,
          section4Content: item.section4Content || null,
          section5Title: item.section5Title || null,
          section5Content: item.section5Content || null,
          section6Title: item.section6Title || null,
          section6Content: item.section6Content || null,
          section7Title: item.section7Title || null,
          section7Content: item.section7Content || null,
          section8Title: item.section8Title || null,
          section8Content: item.section8Content || null,
          image: item.image || item.Image || null,
        },
      } as StrapiEntity<ACTContent>
    }
    
    return item as StrapiEntity<ACTContent>
  } catch (error: any) {
    console.error('Error fetching ACT:', error)
    console.error('Error details:', {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
      url: error?.config?.url,
    })
    throw error
  }
}

// Fetch Toxism page content
export const fetchToxism = async (locale: string = 'sv'): Promise<StrapiEntity<ToxismContent>> => {
  try {
    const response = await strapiApi.get<
      StrapiResponse<StrapiEntity<ToxismContent> | StrapiEntity<ToxismContent>[]>
    >(`/toxisms?locale=${locale}&populate=*`)
    const data = response.data.data
    
    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error('No Toxism content found')
      }
      const item = data[0]
      
      // Strapi v5 returns data directly on object, not in attributes
      // Always wrap in attributes structure for consistency
      if (!item.attributes) {
        return {
          id: item.id || 0,
          attributes: {
            title: (item as any).title || (item as any).Title || null,
            section1Title: (item as any).section1Title || null,
            section1Content: (item as any).section1Content || null,
            section2Title: (item as any).section2Title || null,
            section2Content: (item as any).section2Content || null,
            section3Title: (item as any).section3Title || null,
            section3Content: (item as any).section3Content || null,
            section4Title: (item as any).section4Title || null,
            section4Content: (item as any).section4Content || null,
            section5Title: (item as any).section5Title || null,
            section5Content: (item as any).section5Content || null,
            section6Title: (item as any).section6Title || null,
            section6Content: (item as any).section6Content || null,
            section7Title: (item as any).section7Title || null,
            section7Content: (item as any).section7Content || null,
            section8Title: (item as any).section8Title || null,
            section8Content: (item as any).section8Content || null,
            // Handle both camelCase and PascalCase field names
            image: (item as any).image || (item as any).Image || null,
          },
        } as StrapiEntity<ToxismContent>
      }
      return item
    }
    
    // Handle single item response
    const item = data as any
    
    if (!item.attributes) {
      return {
        id: item.id,
        attributes: {
          title: item.title || item.Title || null,
          section1Title: item.section1Title || null,
          section1Content: item.section1Content || null,
          section2Title: item.section2Title || null,
          section2Content: item.section2Content || null,
          section3Title: item.section3Title || null,
          section3Content: item.section3Content || null,
          section4Title: item.section4Title || null,
          section4Content: item.section4Content || null,
          section5Title: item.section5Title || null,
          section5Content: item.section5Content || null,
          section6Title: item.section6Title || null,
          section6Content: item.section6Content || null,
          section7Title: item.section7Title || null,
          section7Content: item.section7Content || null,
          section8Title: item.section8Title || null,
          section8Content: item.section8Content || null,
          image: item.image || item.Image || null,
        },
      } as StrapiEntity<ToxismContent>
    }
    
    return item as StrapiEntity<ToxismContent>
  } catch (error: any) {
    console.error('Error fetching Toxism:', error)
    console.error('Error details:', {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
      url: error?.config?.url,
    })
    throw error
  }
}

// Fetch Services page content
export const fetchServices = async (locale: string = 'sv'): Promise<StrapiEntity<ServicesContent>> => {
  try {
    const response = await strapiApi.get<
      StrapiResponse<StrapiEntity<ServicesContent> | StrapiEntity<ServicesContent>[]>
    >(`/services?locale=${locale}&populate=*`)
    const data = response.data.data
    
    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error('No Services content found')
      }
      const item = data[0]
      
      // Strapi v5 returns data directly on object, not in attributes
      // Always wrap in attributes structure for consistency
      if (!item.attributes) {
        return {
          id: item.id || 0,
          attributes: {
            title: (item as any).title || (item as any).Title || null,
            section1Title: (item as any).section1Title || null,
            section1Content: (item as any).section1Content || null,
            section2Title: (item as any).section2Title || null,
            section2Content: (item as any).section2Content || null,
            section3Title: (item as any).section3Title || null,
            section3Content: (item as any).section3Content || null,
            // Handle both camelCase and PascalCase field names
            image: (item as any).image || (item as any).Image || null,
          },
        } as StrapiEntity<ServicesContent>
      }
      return item
    }
    
    // Handle single item response
    const item = data as any
    
    if (!item.attributes) {
      return {
        id: item.id,
        attributes: {
          title: item.title || item.Title || null,
          section1Title: item.section1Title || null,
          section1Content: item.section1Content || null,
          section2Title: item.section2Title || null,
          section2Content: item.section2Content || null,
          section3Title: item.section3Title || null,
          section3Content: item.section3Content || null,
          image: item.image || item.Image || null,
        },
      } as StrapiEntity<ServicesContent>
    }
    
    return item as StrapiEntity<ServicesContent>
  } catch (error: any) {
    console.error('Error fetching Services:', error)
    console.error('Error details:', {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
      url: error?.config?.url,
    })
    throw error
  }
}

// Fetch Contact page content
export const fetchContact = async (locale: string = 'sv'): Promise<StrapiEntity<ContactContent>> => {
  try {
    const response = await strapiApi.get<
      StrapiResponse<StrapiEntity<ContactContent> | StrapiEntity<ContactContent>[]>
    >(`/contacts?locale=${locale}&populate=*`)
    const data = response.data.data
    
    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error('No Contact content found')
      }
      const item = data[0]
      
      // Strapi v5 returns data directly on object, not in attributes
      // Always wrap in attributes structure for consistency
      if (!item.attributes) {
        return {
          id: item.id || 0,
          attributes: {
            title: (item as any).title || (item as any).Title || null,
            nameLabel: (item as any).nameLabel || null,
            emailLabel: (item as any).emailLabel || null,
            messageLabel: (item as any).messageLabel || null,
            submitButtonText: (item as any).submitButtonText || null,
            privacyPolicyText: (item as any).privacyPolicyText || null,
            successMessage: (item as any).successMessage || null,
            errorMessage: (item as any).errorMessage || null,
          },
        } as StrapiEntity<ContactContent>
      }
      return item
    }
    
    // Handle single item response
    const item = data as any
    
    if (!item.attributes) {
      return {
        id: item.id,
        attributes: {
          title: item.title || item.Title || null,
          nameLabel: item.nameLabel || null,
          emailLabel: item.emailLabel || null,
          messageLabel: item.messageLabel || null,
          submitButtonText: item.submitButtonText || null,
          privacyPolicyText: item.privacyPolicyText || null,
          successMessage: item.successMessage || null,
          errorMessage: item.errorMessage || null,
        },
      } as StrapiEntity<ContactContent>
    }
    
    return item as StrapiEntity<ContactContent>
  } catch (error: any) {
    console.error('Error fetching Contact:', error)
    console.error('Error details:', {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
      url: error?.config?.url,
    })
    throw error
  }
}

// Fetch Privacy/Disclaimer content
export const fetchPrivacy = async (locale: string = 'sv'): Promise<StrapiEntity<PrivacyContent>> => {
  try {
    const response = await strapiApi.get<
      StrapiResponse<StrapiEntity<PrivacyContent> | StrapiEntity<PrivacyContent>[]>
    >(`/privacies?locale=${locale}&populate=*`)
    const data = response.data.data
    
    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error('No Privacy content found')
      }
      const item = data[0]
      
      // Strapi v5 returns data directly on object, not in attributes
      // Always wrap in attributes structure for consistency
      if (!item.attributes) {
        return {
          id: item.id || 0,
          attributes: {
            privacyPolicyText: (item as any).privacyPolicyText || null,
            disclaimerText: (item as any).disclaimerText || null,
          },
        } as StrapiEntity<PrivacyContent>
      }
      return item
    }
    
    // Handle single item response
    const item = data as any
    
    if (!item.attributes) {
      return {
        id: item.id,
        attributes: {
          privacyPolicyText: item.privacyPolicyText || null,
          disclaimerText: item.disclaimerText || null,
        },
      } as StrapiEntity<PrivacyContent>
    }
    
    return item as StrapiEntity<PrivacyContent>
  } catch (error: any) {
    console.error('Error fetching Privacy:', error)
    console.error('Error details:', {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
      url: error?.config?.url,
    })
    throw error
  }
}

// Fetch Privacy Policy page content
export const fetchPrivacyPolicy = async (locale: string = 'en'): Promise<StrapiEntity<PrivacyPolicyContent>> => {
  try {
    const response = await strapiApi.get<
      StrapiResponse<StrapiEntity<PrivacyPolicyContent> | StrapiEntity<PrivacyPolicyContent>[]>
    >(`/privacy-policies?locale=${locale}&populate=*`)
    const data = response.data.data
    
    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error('No Privacy Policy content found')
      }
      const item = data[0]
      
      if (!item.attributes) {
        return {
          id: item.id || 0,
          attributes: {
            title: (item as any).title || null,
            content: (item as any).content || null,
          },
        } as StrapiEntity<PrivacyPolicyContent>
      }
      return item
    }
    
    const item = data as any
    
    if (!item.attributes) {
      return {
        id: item.id,
        attributes: {
          title: item.title || null,
          content: item.content || null,
        },
      } as StrapiEntity<PrivacyPolicyContent>
    }
    
    return item as StrapiEntity<PrivacyPolicyContent>
  } catch (error: any) {
    console.error('Error fetching Privacy Policy:', error)
    throw error
  }
}

// Fetch Disclaimer page content
export const fetchDisclaimer = async (locale: string = 'en'): Promise<StrapiEntity<DisclaimerContent>> => {
  try {
    const response = await strapiApi.get<
      StrapiResponse<StrapiEntity<DisclaimerContent> | StrapiEntity<DisclaimerContent>[]>
    >(`/disclaimers?locale=${locale}&populate=*`)
    const data = response.data.data
    
    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error('No Disclaimer content found')
      }
      const item = data[0]
      
      if (!item.attributes) {
        return {
          id: item.id || 0,
          attributes: {
            title: (item as any).title || null,
            content: (item as any).content || null,
          },
        } as StrapiEntity<DisclaimerContent>
      }
      return item
    }
    
    const item = data as any
    
    if (!item.attributes) {
      return {
        id: item.id,
        attributes: {
          title: item.title || null,
          content: item.content || null,
        },
      } as StrapiEntity<DisclaimerContent>
    }
    
    return item as StrapiEntity<DisclaimerContent>
  } catch (error: any) {
    console.error('Error fetching Disclaimer:', error)
    throw error
  }
}
