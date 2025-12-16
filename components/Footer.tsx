import { Lock, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-3">
              Aviation Safety Platform
            </h3>
            <p className="text-gray-400 max-w-md">
              Образовательная платформа института гражданской авиации
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Институт гражданской авиации</p>
              <p className="mt-1">Кафедра экологии и безопасности</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-4">
            {/* Кнопка для преподавателя */}
            <a
              href="/studio"
              className="inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Lock size={18} />
              </div>
              <div className="text-left">
                <div className="font-bold">Для преподавателей</div>
                <div className="text-xs text-blue-200">Требуется авторизация</div>
              </div>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            
            {/* Контактная информация */}
            <div className="text-center lg:text-right">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={14} />
                <span>support@civil-aviation.edu</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Техническая поддержка: Пн-Пт 9:00-18:00
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-500">
            <div>
              <p className="font-medium text-gray-400 mb-1">Разделы обучения</p>
              <p>Пожары • Чрезвычайные ситуации • Образование • Защита</p>
            </div>
            <div>
              <p className="font-medium text-gray-400 mb-1">Доступность</p>
              <p>Круглосуточный доступ • Адаптивный дизайн • Без ограничений</p>
            </div>
            <div>
              <p className="font-medium text-gray-400 mb-1">Безопасность</p>
              <p>Защищённое соединение • Резервное копирование • Контроль доступа</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}