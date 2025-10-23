import { ref, onMounted } from 'vue'
import { fetchNews, type News } from '@/api/news'

export function NewListScript() {
  const newsList = ref<News[]>([])
  const loading = ref(false)
  const showModal = ref(false)
  const selectedNews = ref<News | null>(null)

  const truncate = (text: string, max = 100) =>
    text.length > max ? text.substring(0, max) + '...' : text

  const truncateTitle = (title: string, max = 50) => truncate(title, max)

  const openNews = (news: News) => {
    selectedNews.value = news
    showModal.value = true
  }

  onMounted(async () => {
    loading.value = true
    try {
      newsList.value = await fetchNews()
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  })

  return {
    newsList,
    loading,
    truncate,
    truncateTitle,
    openNews,
    showModal,
    selectedNews,
  }
}
