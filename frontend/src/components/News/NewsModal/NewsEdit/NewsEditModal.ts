import { ref, computed } from 'vue'
import { Notify } from 'quasar'
import { updateNews } from '@/api/news'

export interface EditableNews {
  id?: number
  title: string
  content: string
  category_id: number | null
}

export function useNewsEdit(
  props: {
    modelValue: boolean
    news: EditableNews | null
    categories: { id: number; name: string }[]
  },
  emit: {
    (e: 'update:modelValue', value: boolean): void
    (e: 'updated', news: EditableNews): void
  }
) {
  const loading = ref(false)

  const localModel = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v)
  })

  const formInitialData = computed(() => props.news ?? undefined)

  const handleUpdate = async (formData: EditableNews) => {
    if (!props.news?.id) return

    try {
        loading.value = true

        const payload = {
        title: formData.title,
        content: formData.content,
        category_id: formData.category_id ?? undefined
        }

        await updateNews(props.news.id, payload)
        Notify.create({ message: 'Notícia atualizada com sucesso!', color: 'positive', icon: 'check_circle' })

        emit('updated', formData)

        close()
    } catch (err) {
        console.error(err)
        Notify.create({ message: 'Erro ao atualizar notícia', color: 'negative', icon: 'error' })
    } finally {
        loading.value = false
    }
    }

  const close = () => emit('update:modelValue', false)

  return {
    loading,
    localModel,
    formInitialData,
    handleUpdate,
    close
  }
}
