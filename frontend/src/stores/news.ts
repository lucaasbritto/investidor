import { defineStore } from 'pinia'
import { fetchNews, type News } from '@/api/news'

interface PaginatedNews {
  data: News[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number | null
    to: number | null
  }
  links?: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
}

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [] as News[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  }),

  actions: {
    async loadNews(page = 1) {
      this.loading = true
      this.error = null
      try {
        const res: PaginatedNews = await fetchNews({ page })
        this.news = res.data
        this.totalItems = res.meta.total
        this.totalPages = res.meta.last_page
        this.currentPage = res.meta.current_page
      } catch (err: any) {
        this.error = err.message || 'Erro ao carregar notícias'
      } finally {
        this.loading = false
      }
    },
  },
})
