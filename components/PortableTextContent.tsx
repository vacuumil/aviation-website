import { PortableText } from '@portabletext/react'
import { SanityBlock } from '@/types/sanity'

interface Props {
  content: SanityBlock[]
}

interface BlockComponentProps {
  children?: React.ReactNode
}

export default function PortableTextContent({ content }: Props) {
  if (!content || content.length === 0) return null

  const components = {
    block: {
      h1: ({ children }: BlockComponentProps) => (
        <h1 className="text-2xl font-bold mt-6 mb-3 text-gray-900">{children}</h1>
      ),
      h2: ({ children }: BlockComponentProps) => (
        <h2 className="text-xl font-bold mt-5 mb-2 text-gray-900">{children}</h2>
      ),
      normal: ({ children }: BlockComponentProps) => (
        <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: BlockComponentProps) => (
        <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
      ),
      number: ({ children }: BlockComponentProps) => (
        <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: BlockComponentProps) => (
        <li className="text-gray-700">{children}</li>
      ),
    },
  }

  return (
    <div className="prose max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
}