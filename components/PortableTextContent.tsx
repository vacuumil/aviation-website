// components/PortableTextContent.tsx - ИСПРАВЛЕННАЯ ВЕРСИЯ
import { PortableText } from '@portabletext/react'
import { SanityBlock } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import type { PortableTextComponents } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url'

interface Props {
  content: SanityBlock[]
}

interface BlockProps {
  children?: React.ReactNode
}

interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }: BlockProps) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">
        {children}
      </h1>
    ),
    h2: ({ children }: BlockProps) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800">
        {children}
      </h2>
    ),
    h3: ({ children }: BlockProps) => (
      <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-800">
        {children}
      </h3>
    ),
    normal: ({ children }: BlockProps) => (
      <p className="mb-5 text-gray-700 leading-relaxed">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: BlockProps) => (
      <ul className="mb-5 pl-5 space-y-2 list-disc">
        {children}
      </ul>
    ),
    number: ({ children }: BlockProps) => (
      <ol className="mb-5 pl-5 space-y-2 list-decimal">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: BlockProps) => (
      <li className="text-gray-700 pl-1 marker:text-blue-500">
        {children}
      </li>
    ),
    number: ({ children }: BlockProps) => (
      <li className="text-gray-700 pl-1">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: BlockProps) => (
      <strong className="font-semibold text-gray-900">
        {children}
      </strong>
    ),
    em: ({ children }: BlockProps) => (
      <em className="italic text-gray-700">
        {children}
      </em>
    ),
    code: ({ children }: BlockProps) => (
      <code className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset?._ref) {
        console.warn('Invalid image data:', value)
        return null
      }
      
      const imageSource: SanityImageSource = {
        _type: 'image',
        asset: {
          _ref: value.asset._ref,
          _type: 'reference'
        }
      }
      
      const imageUrl = urlFor(imageSource)
        .width(800)
        .height(450)
        .fit('max')
        .auto('format')
        .quality(85)
        .url()

      return (
        <figure className="my-8">
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={imageUrl}
              alt={value.alt || 'Изображение'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export default function PortableTextContent({ content }: Props) {
  if (!content || content.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Материал находится в разработке
      </div>
    )
  }

  return (
    <div className="content-text"> {/* Используем класс для хорошей читаемости */}
      <PortableText value={content} components={components} />
    </div>
  )
}