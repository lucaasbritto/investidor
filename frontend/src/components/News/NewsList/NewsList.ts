import { ref, onMounted } from 'vue'
import { fetchNews, type News, createNews, updateNews, type CreateNewsPayload } from '@/api/news'
import { Notify } from 'quasar'
import { useCategories } from '@/stores/category'

export interface EditableNews {
  id?: number
  title: string
  content: string
  category_id: number | null
}

export function useNewsList() {
  const newsList = ref<News[]>([])
  const loading = ref(false)

  const showDetailModal = ref(false)
  const selectedNews = ref<News | null>(null)

  const showEditModal = ref(false)
  const selectedNewsEdit = ref<EditableNews | null>(null)

  const { categories, loadCategories } = useCategories()

  const truncate = (text: string, max = 100) =>
    text.length > max ? text.substring(0, max) + '...' : text

  const truncateTitle = (title: string, max = 50) => truncate(title, max)

  const reloadNews = async () => {
    loading.value = true
    try {
      newsList.value = await fetchNews()
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    reloadNews()
    await loadCategories()
  })

  const openDetailModal = (news: News) => {
    selectedNews.value = news
    showDetailModal.value = true
  }

  
  const openEditModal = (news?: News) => {
    if (news) {
      selectedNewsEdit.value = {
        id: news.id,
        title: news.title,
        content: news.content,
        category_id: news.category?.id || null
      }
    } else {
      selectedNewsEdit.value = {
        title: '',
        content: '',
        category_id: null
      }
    }
    showEditModal.value = true
  }

  const closeEditModal = () => {
    showEditModal.value = false
    selectedNewsEdit.value = null
  }

  const saveNews = async (form: CreateNewsPayload) => {
    loading.value = true
    try {
      let updatedNews: News

      if (selectedNewsEdit.value?.id) {
        updatedNews = await updateNews(selectedNewsEdit.value.id, form)
        const index = newsList.value.findIndex(n => n.id === updatedNews.id)
        if (index !== -1) newsList.value[index] = updatedNews
      } else {
        updatedNews = await createNews(form)
        newsList.value.unshift(updatedNews)
      }

      closeEditModal()
    } catch (err) {
      console.error(err)
      Notify.create({ message: 'Erro ao salvar notícia', color: 'negative', icon: 'error' })
    } finally {
      loading.value = false
    }
  }

  const deleteNews = async (news: News) => {
    if (!confirm('Deseja realmente excluir esta notícia?')) return
    Notify.create({ message: 'Funcionalidade de exclusão não implementada', color: 'warning' })
  }

  return {
    newsList,
    categories,
    loading,
    truncate,
    truncateTitle,
    showDetailModal,
    selectedNews,
    openDetailModal,
    showEditModal,
    selectedNewsEdit,
    openEditModal,
    closeEditModal,
    saveNews,
    deleteNews,
    reloadNews
  }
}
