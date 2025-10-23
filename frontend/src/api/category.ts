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

export async function createCategory(data: { name: string }): Promise<Category> {
  const response = await api.post('/categories', data)
  return response.data.data
}

export async function updateCategory(id: number, data: { name: string }): Promise<Category> {
  const response = await api.put(`/categories/${id}`, data)
  return response.data.data
}

export async function deleteCategory(id: number): Promise<void> {
  await api.delete(`/categories/${id}`)
}
