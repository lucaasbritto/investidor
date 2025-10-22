import api from './index'
import type { User } from '@/stores/user'

interface LoginResponse {
  token: string
  user: User
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post('/login', { email, password })

    return {
      token: response.data.access_token,
      user: response.data.user
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erro ao tentar fazer login')
  }
}

export function logout(): void {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
