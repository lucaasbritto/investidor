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

export interface CreateNewsPayload {
  title: string
  content: string
  category_id: number
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

export async function createNews(payload: CreateNewsPayload): Promise<News> {
  try {
    const response = await api.post('/news', payload)
    return response.data.data
  } catch (error: any) {
    console.error('Erro ao criar notícia:', error)
    throw new Error(error.response?.data?.message || 'Erro ao criar notícia')
  }
}
