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

export interface UpdateNewsPayload {
  title?: string
  content?: string
  category_id?: number
}

export async function fetchNews(filters?: {
  title?: string
  category_id?: number
  page?: number
}): Promise<{ data: News[], meta: any }> {
  try {
    const response = await api.get('/news', {
      params: {
        title: filters?.title,
        category_id: filters?.category_id,
        page: filters?.page || 1
      }
    })
    return {
      data: response.data.data,
      meta: response.data.meta
    }
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

export async function updateNews(id: number, payload: UpdateNewsPayload): Promise<News> {
  try {
    const response = await api.put(`/news/${id}`, payload)
    return response.data.data
  } catch (error: any) {
    console.error('Erro ao atualizar notícia:', error)
    throw new Error(error.response?.data?.message || 'Erro ao atualizar notícia')
  }
}

export async function deleteNews(id: number): Promise<void> {
  try {
    const response = await api.delete(`/news/${id}`)
    return response.data
  } catch (error: any) {
    console.error('Erro ao excluir notícia:', error)
    throw new Error(error.response?.data?.message || 'Erro ao excluir notícia')
  }
}
