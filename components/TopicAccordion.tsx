'use client'

import { useState } from 'react'
import PortableTextContent from './PortableTextContent'
import { SanityBlock } from '@/types/sanity'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface TopicAccordionProps {
  topic: {
    _id: string
    title: string
    content?: SanityBlock[]
    order: number
    hasContent?: boolean
  }
}

export default function TopicAccordion({ topic }: TopicAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-4">
          <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
            topic.hasContent ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'
          }`}>
            <span className="font-semibold">{topic.order}</span>
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900">
              {topic.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {topic.hasContent ? 'Материал готов к изучению' : 'Материал в разработке'}
            </p>
          </div>
        </div>
        
        <div className="text-gray-400">
          {isOpen ? (
            <ChevronUp size={22} />
          ) : (
            <ChevronDown size={22} />
          )}
        </div>
      </button>
      
      {isOpen && topic.content && topic.content.length > 0 && (
        <div className="px-5 pb-5 pt-3 border-t border-gray-100">
          <PortableTextContent content={topic.content} />
          <button
            onClick={() => setIsOpen(false)}
            className="text-sm text-gray-500 hover:text-gray-700 mt-4"
          >
            Свернуть материал
          </button>
        </div>
      )}
    </div>
  )
}