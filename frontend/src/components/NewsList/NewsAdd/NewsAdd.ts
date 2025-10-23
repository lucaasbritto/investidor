import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createNews } from '@/api/news'
import { fetchCategories } from '@/api/category'
import { Notify } from 'quasar'

export function NewListScript() {
  const router = useRouter()

  const title = ref('')
  const content = ref('')
  const categoryId = ref<number | null>(null)
  const categories = ref<{ id: number; name: string }[]>([])
  const loading = ref(false)

  onMounted(async () => {
    try {
      categories.value = await fetchCategories()
    } catch (err) {
      console.error('Erro ao carregar categorias:', err)
      Notify.create({
        message: 'Falha ao carregar categorias',
        color: 'negative',
        icon: 'error',
      })
    }
  })

  const handleSubmit = async () => {
    if (!title.value || !content.value || !categoryId.value) return

    try {
      loading.value = true
      await createNews({
        title: title.value,
        content: content.value,
        category_id: categoryId.value,
      })

      Notify.create({
        message: 'Notícia cadastrada com sucesso!',
        color: 'positive',
        icon: 'check_circle',
      })

      router.push('/news')
    } catch (err) {
      console.error('Erro ao cadastrar notícia:', err)
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

  return {
    title,
    content,
    categoryId,
    categories,
    loading,
    handleSubmit,
    goBack,
  }
}
