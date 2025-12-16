// lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url' // ИЗМЕНЕНО: из корня пакета

export const client = createClient({
  projectId: '6jv9b90p',
  dataset: 'production',
  apiVersion: '2025-12-15',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
})

// Билдер для изображений
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

interface SiteSettings {
  title?: string
  heroSubtitle?: string
  sectionsTitle?: string
  sectionsSubtitle?: string
}

const cache = new Map<string, SiteSettings | null>()

export async function getSettings(): Promise<SiteSettings | null> {
  const cacheKey = 'settings'

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!
  }

  const query = `*[_type == "settings"][0] {
    title,
    heroSubtitle,
    sectionsTitle,
    sectionsSubtitle
  }`

  try {
    const settings = await client.fetch<SiteSettings>(query)
    cache.set(cacheKey, settings)
    setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000)
    return settings
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}