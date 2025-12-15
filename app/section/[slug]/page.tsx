import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import TopicAccordion from '@/components/TopicAccordion'
import { Section, Topic } from '@/types/sanity'
import { ArrowLeft, BookOpen } from 'lucide-react'

async function getSection(slug: string): Promise<Section & { topicCount: number } | null> {
  const query = `*[_type == "section" && slug.current == $slug][0] {
    _id,
    title,
    description,
    "topicCount": count(*[_type == "topic" && references(^._id)])
  }`
  
  return await client.fetch(query, { slug })
}

async function getTopics(slug: string): Promise<Topic[]> {
  const query = `*[_type == "topic" && section->slug.current == $slug] | order(order asc) {
    _id,
    title,
    content,
    order,
    _createdAt,
    "hasContent": defined(content) && count(content) > 0
  }`
  
  return await client.fetch(query, { slug })
}

export default async function SectionPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const section = await getSection(slug)
  const topics = await getTopics(slug)

  if (!section) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Чистая навигация */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">На главную</span>
            </Link>
            <div className="text-sm text-gray-500">
              Раздел • {section.title}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Простая шапка раздела */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-600" size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{section.title}</h1>
              {section.description && (
                <p className="text-gray-600 mt-2">{section.description}</p>
              )}
            </div>
          </div>
          
          {/* Простая статистика */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 inline-block">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{section.topicCount}</div>
                <div className="text-sm text-gray-500">Всего тем</div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {topics.filter(t => t.hasContent).length}
                </div>
                <div className="text-sm text-gray-500">С материалами</div>
              </div>
            </div>
          </div>
        </div>

        {/* Чистый список тем */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Учебные материалы</h2>
            <p className="text-gray-500 text-sm mt-1">
              Изучайте темы по порядку, нажимая на заголовки
            </p>
          </div>
          
          <div className="p-6">
            {topics.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Темы пока не добавлены
                </h3>
                <p className="text-gray-500">
                  Материалы будут добавлены позже
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {topics.map((topic) => (
                  <TopicAccordion key={topic._id} topic={topic} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}