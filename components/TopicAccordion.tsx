// components/TopicAccordion.tsx
'use client'

import { useState } from 'react'
import PortableTextContent from './PortableTextContent'
import { SanityBlock } from '@/types/sanity'
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'

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
  
  // Безопасная проверка наличия контента
  const hasActualContent = topic.hasContent && topic.content && topic.content.length > 0

  return (
    <div className="border-0 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-all duration-200 group"
        disabled={!hasActualContent} // Отключаем кнопку если нет контента
      >
        <div className="flex items-center gap-5">
          <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
            hasActualContent 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-400'
          } transition-colors`}>
            {hasActualContent ? (
              <span className="font-bold text-lg">{topic.order}</span>
            ) : (
              <FileText size={20} />
            )}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
              {topic.title}
            </h3>
            <p className={`text-sm mt-1 ${
              hasActualContent 
                ? 'text-green-600' 
                : 'text-gray-500'
            }`}>
              {hasActualContent ? '✅ Материал готов к изучению' : '⏳ Материал в разработке'}
            </p>
          </div>
        </div>
        
        {hasActualContent && (
          <div className={`p-2 rounded-lg ${
            isOpen 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-500'
          } transition-all`}>
            {isOpen ? (
              <ChevronUp size={22} />
            ) : (
              <ChevronDown size={22} />
            )}
          </div>
        )}
      </button>
      
      {isOpen && hasActualContent && (
        <div className="px-6 pb-8 pt-4 border-t border-gray-100 bg-linear-to-b from-gray-50/50 to-transparent">
          <div className="content-text">
            <PortableTextContent content={topic.content!} />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-6 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            <ChevronUp size={16} />
            Свернуть материал
          </button>
        </div>
      )}
    </div>
  )
}