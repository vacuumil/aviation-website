// Отключаем статическую генерацию - ВАЖНО для обновления данных
export const dynamic = 'force-dynamic'
export const revalidate = 0 // 0 секунд - всегда свежие данные

import { getSettings, getSections } from '@/lib/sanity'
import Link from 'next/link'
import { Section } from '@/types/sanity'

export default async function Home() {
  // Загружаем данные с отключенным кэшированием
  const [settingsData, sectionsData] = await Promise.all([
    getSettings(),
    getSections()
  ])

  // Устанавливаем значения по умолчанию если данные не загрузились
  const siteSettings = settingsData || {
    heroSubtitle: 'Профессиональные учебные материалы для студентов института гражданской авиации',
    sectionsTitle: 'Основные направления подготовки',
    sectionsSubtitle: 'Изучите ключевые аспекты безопасности через структурированные учебные материалы'
  }

  // Если разделы не загрузились, показываем заглушку
  const sections = sectionsData || []

  const getSectionColor = (index: number) => {
    const colors = [
      'bg-linear-to-br from-red-500 to-orange-500',
      'bg-linear-to-br from-blue-500 to-cyan-500',
      'bg-linear-to-br from-emerald-500 to-teal-500',
      'bg-linear-to-br from-violet-500 to-purple-500'
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="min-h-screen">
      {/* Яркая герой-секция с градиентом */}
      <div className="relative bg-linear-to-br from-sky-900 via-blue-800 to-cyan-800 text-white overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full translate-x-48 translate-y-48"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Безопасность в авиации
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
              {siteSettings.heroSubtitle}
            </p>
            
            <div className="animate-bounce">
              <div className="text-sm text-blue-200 font-medium">Изучайте материалы ниже</div>
              <div className="text-2xl mt-2">↓</div>
            </div>
          </div>
        </div>
        
        {/* Волнообразный разделитель */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current text-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current text-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current text-white"></path>
          </svg>
        </div>
      </div>

      {/* Сетка разделов на белом фоне */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-20">

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {siteSettings.sectionsTitle}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {siteSettings.sectionsSubtitle}
          </p>
        </div>

        {sections.length === 0 ? (
          // Если разделы не загрузились, показываем заглушку
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Разделы временно недоступны
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Проверьте подключение к базе данных или попробуйте обновить страницу.
            </p>
            <div className="space-y-4 max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-4">
                <Link href="/section/fires" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border border-blue-200 text-center">
                  <div className="text-lg font-medium text-blue-700">Пожары</div>
                  <div className="text-sm text-blue-600 mt-1">Материалы по пожарной безопасности</div>
                </Link>
                <Link href="/section/emergencies" className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg border border-amber-200 text-center">
                  <div className="text-lg font-medium text-amber-700">Чрезвычайные ситуации</div>
                  <div className="text-sm text-amber-600 mt-1">Действия в ЧС</div>
                </Link>
                <Link href="/section/education" className="bg-emerald-50 hover:bg-emerald-100 p-4 rounded-lg border border-emerald-200 text-center">
                  <div className="text-lg font-medium text-emerald-700">Образование</div>
                  <div className="text-sm text-emerald-600 mt-1">Учебные материалы</div>
                </Link>
                <Link href="/section/protection" className="bg-violet-50 hover:bg-violet-100 p-4 rounded-lg border border-violet-200 text-center">
                  <div className="text-lg font-medium text-violet-700">Защита</div>
                  <div className="text-sm text-violet-600 mt-1">Средства защиты</div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section: Section, index: number) => (
              <Link
                key={section._id}
                href={`/section/${section.slug.current}`}
                className="group transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden border-0">
                  <div className={`h-2 ${getSectionColor(index)}`}></div>
                  
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="relative shrink-0">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${getSectionColor(index)} text-white shadow-lg`}>
                          {section.title.includes('Пожар') ? '🔥' : 
                           section.title.includes('Чрезвычай') ? '⚠️' :
                           section.title.includes('Образование') ? '📚' : '🛡️'}
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {section.description || 'Профессиональные материалы по ключевым аспектам безопасности'}
                        </p>
                        
                        <div className="mt-8 flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                          <span>Открыть раздел</span>
                          <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}