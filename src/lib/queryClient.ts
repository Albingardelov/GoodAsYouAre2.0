import { QueryClient } from '@tanstack/react-query'

// Create QueryClient with cache configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Cache data for 30 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
      // Retry failed requests once
      retry: 1,
      // Refetch on window focus (optional, can be disabled)
      refetchOnWindowFocus: false,
    },
  },
})
