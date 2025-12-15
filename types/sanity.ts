// types/sanity.ts
export interface SanityBlock {
  _type: string
  _key: string
  children: Array<{
    _type: string
    text: string
    marks?: string[]
  }>
  markDefs?: unknown[]
  style?: string
}

export interface Section {
  _id: string
  title: string
  slug: { current: string }
  description?: string
}

export interface Topic {
  _id: string
  title: string
  slug: { current: string }
  section: { _ref: string; _type: 'reference' }
  order: number
  content?: SanityBlock[]
  _createdAt?: string
  hasContent?: boolean
}