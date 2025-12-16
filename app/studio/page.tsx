'use client'

import { useState, useEffect } from 'react'
import { Lock, Shield, AlertCircle, Check } from 'lucide-react'
import Link from 'next/link'

export default function StudioLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [hasCheckedSession, setHasCheckedSession] = useState(false)

  // Используем пароль из env или дефолтный
  const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_TEACHER_PASSWORD || 'авиация2024'

  // Первая проверка сессии при монтировании
  useEffect(() => {
    const checkSession = () => {
      if (typeof window === 'undefined') return
      
      const auth = sessionStorage.getItem('studio-auth')
      const timestamp = sessionStorage.getItem('auth-timestamp')
      
      if (auth === 'true' && timestamp) {
        const authTime = parseInt(timestamp)
        const now = Date.now()
        const hoursPassed = (now - authTime) / (1000 * 60 * 60)
        
        if (hoursPassed < 8) {
          // Перенаправляем на админку
          window.location.href = 'https://aviation-safety-studio.sanity.studio'
          return
        }
      }
      
      setHasCheckedSession(true)
    }
    
    checkSession()
  }, [])

  const clearAuth = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('studio-auth')
      sessionStorage.removeItem('auth-timestamp')
    }
    setPassword('')
    setError('')
    setSuccess(false)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        setSuccess(true)
        
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('studio-auth', 'true')
          sessionStorage.setItem('auth-timestamp', Date.now().toString())
        }
        
        setTimeout(() => {
          window.location.href = 'https://aviation-safety-studio.sanity.studio'
        }, 1000)
      } else {
        setError('Неверный пароль. Попробуйте снова.')
        setIsLoading(false)
      }
    }, 600)
  }

  if (!hasCheckedSession) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Проверка сессии...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Логотип и заголовок */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Aviation Safety Platform
          </h1>
          <p className="text-gray-600">
            Панель управления для преподавателей
          </p>
        </div>

        {/* Карточка входа */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Lock size={20} />
                Вход в админ-панель
              </h2>
              <p className="text-gray-500 text-sm">
                Введите пароль, предоставленный администратором системы
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Пароль доступа
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Введите пароль..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={isLoading || success}
                  required
                  autoFocus
                />
                {error && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                    <Check size={16} />
                    <span>Пароль верный! Перенаправляем...</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || success || !password}
                className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Проверка...</span>
                  </>
                ) : success ? (
                  <>
                    <Check size={20} />
                    <span>Успешно!</span>
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    <span>Войти в админ-панель</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <button
                  onClick={clearAuth}
                  className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Сбросить авторизацию
                </button>
              </div>
            </div>
          </div>

          {/* Информационная панель */}
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Безопасный доступ
                  </h4>
                  <p className="text-xs text-gray-600">
                    Пароль обновляется каждые 6 месяцев
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Автоматический выход
                  </h4>
                  <p className="text-xs text-gray-600">
                    Сессия завершается через 8 часов
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Инструкция для преподавателя */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            При возникновении проблем с доступом обратитесь к администратору системы
          </p>
          <Link 
            href="/" 
            className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            ← Вернуться на главную страницу
          </Link>
        </div>
      </div>
    </div>
  )
}