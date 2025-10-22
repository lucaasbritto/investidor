import { ref, onMounted } from 'vue'
import { fetchNews, type News } from '@/api/news'

export function NewListScript() {
  const newsList = ref<News[]>([])
  const loading = ref(false)

  const truncate = (text: string, max = 100) => {
    return text.length > max ? text.substring(0, max) + '...' : text;
  }

  const truncateTitle = (title: string, max = 50) => truncate(title, max)

  const openNews = (news: News) => {
    console.log('Abrindo notícia:', news.title)
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
    openNews
  }
}
