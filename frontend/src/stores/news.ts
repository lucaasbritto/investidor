import { defineStore } from 'pinia'
import { fetchNews, type News } from '@/api/news'

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [] as News[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async loadNews() {
      this.loading = true
      this.error = null

      try {
        this.news = await fetchNews()
      } catch (err: any) {
        this.error = err.message || 'Erro ao carregar notícias'
      } finally {
        this.loading = false
      }
    },
  },
})
