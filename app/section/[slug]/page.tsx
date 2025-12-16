// app/section/[slug]/page.tsx - СВЕТЛАЯ ТЕМА
import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import TopicAccordion from '@/components/TopicAccordion'
import { Section, Topic } from '@/types/sanity'
import { ArrowLeft, BookOpen, CheckCircle, Clock} from 'lucide-react'

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
    "hasContent": count(content) > 0
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

  const completedTopics = topics.filter(t => t.hasContent).length

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Светлый хедер с акцентным цветом */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="content-wrapper">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-8">
            <div>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">На главную</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {section.title}
              </h1>
              {section.description && (
                <p className="text-xl text-blue-100 max-w-3xl">
                  {section.description}
                </p>
              )}
            </div>
            
            {/* Статистика в светлых карточках */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-40 border border-white/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{section.topicCount}</div>
                    <div className="text-sm text-blue-100 font-medium">Всего тем</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-40 border border-white/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-emerald-500/40 rounded-lg flex items-center justify-center">
                    <CheckCircle size={20} className="text-emerald-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{completedTopics}</div>
                    <div className="text-sm text-blue-100 font-medium">Готово</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Плавный переход к светлому фону */}
        <div className="relative -mb-1">
          <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-gray-50"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-gray-50"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </div>

      {/* Основной контент на светлом фоне */}
      <div className="content-wrapper">
        {/* Заголовок секции */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Учебные материалы раздела
              </h2>
              <p className="text-gray-600 mt-2">
                Изучайте темы по порядку. Нажмите на заголовок темы, чтобы открыть материал.
              </p>
            </div>
          </div>
        </div>

        {/* Список тем */}
        <div className="space-y-6 mb-16">
          {topics.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-gray-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Темы пока не добавлены
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Преподаватель скоро добавит учебные материалы для этого раздела.
              </p>
            </div>
          ) : (
            topics.map((topic) => (
              <div key={topic._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden">
                <TopicAccordion topic={topic} />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}