import api from './index'
import type { User } from '@/stores/user'

export async function getUserProfile(): Promise<User> {
  const response = await api.get('/me')
  return response.data as User
}
