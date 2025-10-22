import { defineStore } from 'pinia'
import { login as apiLogin, logout as apiLogout } from '@/api/auth'
import { getUserProfile } from '@/api/user'

export interface User {
  id: number
  name: string
  email?: string
}

interface UserState {
  user: User | null
  token: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
    userName: (state): string => state.user?.name || 'Visitante',
  },

  actions: {
    async login(email: string, password: string): Promise<void> {
      const { token, user } = await apiLogin(email, password)
      this.token = token
      this.user = user

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    async fetchUser(): Promise<void> {
      try {
        const user = await getUserProfile()
        this.user = user
        localStorage.setItem('user', JSON.stringify(user))
      } catch (err) {
        this.logout()
      }
    },

    logout(): void {
      apiLogout()
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
