import api from './index'

export interface Category {
  id: number
  name: string
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await api.get('/categories')
    return response.data.data
  } catch (error: any) {
    console.error('Erro ao buscar categorias:', error)
    throw new Error(error.response?.data?.message || 'Erro ao buscar categorias')
  }
}
