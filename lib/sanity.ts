import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '6jv9b90p', // Ваш Project ID
  dataset: 'production',
  apiVersion: '2025-12-15', // Используйте текущую дату
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN
})