import { useQuery } from '@tanstack/react-query'
import { useLanguage } from '../contexts/LanguageContext'
import {
  fetchHomeHero,
  fetchHomeTestimonial,
  fetchPageBySlug,
  fetchAbout,
  fetchACT,
  fetchToxism,
  fetchServices,
  fetchContact,
  fetchPrivacy,
  fetchPrivacyPolicy,
  fetchDisclaimer,
} from '../services/strapi'
import type {
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

// Hook to fetch home hero with caching
export const useHomeHero = () => {
  const { language } = useLanguage()
  return useQuery<StrapiEntity<HomeHero>, Error>({
    queryKey: ['home', 'hero', language],
    queryFn: () => fetchHomeHero(language),
    staleTime: 10 * 60 * 1000, // 10 minutes - hero changes rarely
    gcTime: 60 * 60 * 1000, // 1 hour cache
  })
}

// Hook to fetch home testimonial with caching
export const useHomeTestimonial = () => {
  const { language } = useLanguage()
  return useQuery<StrapiEntity<HomeTestimonial>, Error>({
    queryKey: ['home', 'testimonial', language],
    queryFn: () => fetchHomeTestimonial(language),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour cache
  })
}

// Hook to fetch page by slug with caching
export const usePageBySlug = (slug: string) => {
  return useQuery<StrapiEntity<PageContent> | null, Error>({
    queryKey: ['page', slug],
    queryFn: () => fetchPageBySlug(slug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    enabled: !!slug, // Only fetch if slug is provided
  })
}

// Hook to fetch about page with caching
export const useAbout = () => {
  const { language } = useLanguage()
  return useQuery<StrapiEntity<AboutContent>, Error>({
    queryKey: ['about', language],
    queryFn: () => fetchAbout(language),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
  })
}

// Hook to fetch ACT page with caching
export const useACT = () => {
  const { language } = useLanguage()
  return useQuery<StrapiEntity<ACTContent>, Error>({
    queryKey: ['act', language],
    queryFn: () => fetchACT(language),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
  })
}

// Hook to fetch Toxism page with caching
export const useToxism = () => {
  const { language } = useLanguage()
  return useQuery<StrapiEntity<ToxismContent>, Error>({
    queryKey: ['toxism', language],
    queryFn: () => fetchToxism(language),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
  })
}

// Hook to fetch Services page with caching
export const useServices = () => {
  const { language } = useLanguage()
  return useQuery<StrapiEntity<ServicesContent>, Error>({
    queryKey: ['services', language],
    queryFn: () => fetchServices(language),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
  })
}

// Hook to fetch Contact page with caching
export const useContact = () => {
  const { language } = useLanguage()
  return useQuery<StrapiEntity<ContactContent>, Error>({
    queryKey: ['contact', language],
    queryFn: () => fetchContact(language),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    retry: false, // Don't retry if Content Type doesn't exist
    throwOnError: false, // Don't throw error, just return undefined
  })
}

// Hook to fetch Privacy/Disclaimer content with caching
export const usePrivacy = () => {
  const { language } = useLanguage()
  return useQuery<StrapiEntity<PrivacyContent>, Error>({
    queryKey: ['privacy', language],
    queryFn: () => fetchPrivacy(language),
    staleTime: 10 * 60 * 1000, // 10 minutes - changes rarely
    gcTime: 60 * 60 * 1000, // 1 hour cache
  })
}

// Hook to fetch Privacy Policy page with caching
export const usePrivacyPolicy = () => {
  // Privacy Policy is only in English for now
  return useQuery<StrapiEntity<PrivacyPolicyContent>, Error>({
    queryKey: ['privacy-policy', 'en'],
    queryFn: () => fetchPrivacyPolicy('en'),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour cache
  })
}

// Hook to fetch Disclaimer page with caching
export const useDisclaimer = () => {
  // Disclaimer is only in English for now
  return useQuery<StrapiEntity<DisclaimerContent>, Error>({
    queryKey: ['disclaimer', 'en'],
    queryFn: () => fetchDisclaimer('en'),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour cache
  })
}
