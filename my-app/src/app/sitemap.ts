import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://macrosnap-two.vercel.app'
  const lastModified = new Date()

  const routes = [
    '',
    '/explore',
    '/compare',
    '/budget',
    '/basket',
    '/recipes',
    '/kitchen',
    '/calculator',
    '/labels',
    '/learn',
    '/library',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
