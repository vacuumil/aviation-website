import { Lock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-3">
              Aviation Safety Platform
            </h3>
            <p className="text-gray-400 max-w-md">
              Образовательная платформа для студентов института гражданской авиации
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <a
                href="https://aviation-safety-studio.sanity.studio" // ← ИЗМЕНИТЬ ЗДЕСЬ
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors group"
                >
                <Lock size={18} />
                <span>Доступ для преподавателя</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <p className="text-gray-500 text-sm text-center md:text-right max-w-xs">
              Требуется авторизация. Доступ только для преподавательского состава
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>Институт гражданской авиации • {new Date().getFullYear()}</p>
          <p className="mt-1">Все материалы защищены авторским правом</p>
        </div>
      </div>
    </footer>
  )
}