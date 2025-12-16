// lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

// Конфигурация для продакшена
const projectId = '6jv9b90p'
const dataset = 'production'
const apiVersion = '2025-12-15'
const token = process.env.SANITY_API_READ_TOKEN

// Создаем два клиента: один для CDN (без токена), другой для запросов с токеном
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: token || undefined,
})

// Отдельный клиент для запросов, которые точно требуют свежих данных
export const authenticatedClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Всегда свежие данные
  token: token || undefined,
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

// Используем authenticatedClient для настроек и разделов
export async function getSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "settings"][0] {
    title,
    heroSubtitle,
    sectionsTitle,
    sectionsSubtitle
  }`

  try {
    return await client.fetch(query) 
  } catch (error) {
    console.error('Error fetching settings:', error)
    return {
      title: 'Безопасность в авиации',
      heroSubtitle: 'Профессиональные учебные материалы для студентов института гражданской авиации',
      sectionsTitle: 'Основные направления подготовки',
      sectionsSubtitle: 'Изучите ключевые аспекты безопасности через структурированные учебные материалы'
    }
  }
}

export async function getSections() {
  const query = `*[_type == "section"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }`

  try {
    return await client.fetch(query)  
  } catch (error) {
    console.error('Error fetching sections:', error)
    return []
  }
}

// Универсальная функция для получения тем раздела
export async function getTopics(slug: string) {
  const query = `*[_type == "topic" && section->slug.current == $slug] | order(order asc) {
    _id,
    title,
    content,
    order,
    "hasContent": count(content) > 0
  }`

  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching topics:', error)
    return []
  }
}

// Функция для получения конкретного раздела
export async function getSection(slug: string) {
  const query = `*[_type == "section" && slug.current == $slug][0] {
    _id,
    title,
    description,
    "topicCount": count(*[_type == "topic" && references(^._id)])
  }`

  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching section:', error)
    return null
  }
}