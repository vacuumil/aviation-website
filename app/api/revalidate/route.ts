import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Принудительно обновляем главную страницу
    revalidatePath('/')
    revalidatePath('/section/[slug]', 'page')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Данные обновлены',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Ошибка обновления' 
    }, { status: 500 })
  }
}