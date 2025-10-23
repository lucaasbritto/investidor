import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import { createNews, type CreateNewsPayload } from '@/api/news'
import { useCategories } from '@/stores/category'

export function useNewsAdd() {
  const loading = ref(false)
  const router = useRouter()

  const { categories, loadCategories } = useCategories()

  const handleSubmit = async (formData: CreateNewsPayload) => {
    try {
      loading.value = true
      await createNews(formData)
      Notify.create({
        message: 'Notícia cadastrada com sucesso!',
        color: 'positive',
        icon: 'check_circle',
      })
      router.push('/')
    } catch (err) {
      console.error(err)
      Notify.create({
        message: 'Erro ao cadastrar notícia',
        color: 'negative',
        icon: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  const goBack = () => router.back()

  onMounted(async () => {
    await loadCategories()
  })

  return {
    loading,
    handleSubmit,
    goBack,
    categories
  }
}
