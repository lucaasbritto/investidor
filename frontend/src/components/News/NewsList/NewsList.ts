import { ref, onMounted, watch } from 'vue'
import { fetchNews, type News, createNews, updateNews, deleteNews as apiDeleteNews, type CreateNewsPayload } from '@/api/news'
import { Notify, Dialog  } from 'quasar'
import { useCategories } from '@/stores/category'

export interface EditableNews {
  id?: number
  title: string
  content: string
  category_id: number | null
}

interface Filters {
  searchTitle?: string
  searchCategoryId?: number | null
}

export function useNewsList(filters?: Filters) {
  const newsList = ref<News[]>([])
  const loading = ref(false)
  const deletingId = ref<number | null>(null)

  const showDetailModal = ref(false)
  const selectedNews = ref<News | null>(null)

  const showEditModal = ref(false)
  const selectedNewsEdit = ref<EditableNews | null>(null)

  const { categories, loadCategories } = useCategories()

  const truncate = (text: string, max = 100) =>
    text?.length > max ? text.substring(0, max) + '...' : text

  const truncateTitle = (title: string, max = 50) => truncate(title, max)

  const reloadNews = async () => {
    loading.value = true
    try {
      newsList.value = await fetchNews({
        title: filters?.searchTitle || undefined,
        category_id: filters?.searchCategoryId || undefined
      })
    } catch (err) {
      console.error(err)
      Notify.create({
        message: 'Erro ao carregar notícias',
        color: 'negative',
        icon: 'error'
      })
    } finally {
      loading.value = false
    }
  }

  if (filters) {
    watch(
      () => [filters.searchTitle, filters.searchCategoryId],
      () => reloadNews(),
      { deep: true }
    )
  }

  onMounted(async () => {
    loadCategories()
    reloadNews()
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
    Dialog.create({
      title: 'Confirmar exclusão',
      message: `Deseja realmente excluir a notícia "${news.title}"?`,
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        try {
          deletingId.value = news.id
          await apiDeleteNews(news.id)
          newsList.value = newsList.value.filter(n => n.id !== news.id)

          Notify.create({
            message: 'Notícia excluída com sucesso!',
            color: 'positive',
            icon: 'check_circle',
          })
        } catch (err) {
          console.error(err)
          Notify.create({
            message: 'Erro ao excluir notícia',
            color: 'negative',
            icon: 'error',
          })
        } finally {
          deletingId.value = null
        }
      })
  }

  return {
    newsList,
    categories,
    loading,
    deletingId,
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
