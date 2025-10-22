import api from './index'

export interface News {
  id: number
  title: string
  content: string
  category: {
    id: number
    name: string
  }
}

export async function fetchNews(): Promise<News[]> {
  try {
    const response = await api.get('/news')
    return response.data.data
  } catch (error: any) {
    console.error('Erro ao buscar notícias:', error)
    throw new Error(error.response?.data?.message || 'Erro ao buscar notícias')
  }
}
