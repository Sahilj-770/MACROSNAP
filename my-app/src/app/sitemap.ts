import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://macrosnap-two.vercel.app'
  const routes = [
    '',
    '/explore',
    '/budget',
    '/calculator',
    '/learn',
    '/compare',
    '/recipes',
    '/kitchen',
    '/labels',
    '/library',
    '/basket',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))
}
