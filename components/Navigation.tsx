import Link from 'next/link'
import { client } from '@/lib/sanity'
import { Section } from '@/types/sanity'

async function getSections(): Promise<Section[]> {
  const query = `*[_type == "section"] | order(title asc) {
    _id,
    title,
    slug
  }`
  return await client.fetch(query)
}

export default async function Navigation() {
  const sections = await getSections()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-xl font-bold">🛫</span>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Aviation Safety
              </div>
              <div className="text-xs text-gray-500 font-medium">Институт ГА</div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <Link
                key={section._id}
                href={`/section/${section.slug.current}`}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
              >
                {section.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
          
          <div className="md:hidden">
            <button className="p-2 text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}