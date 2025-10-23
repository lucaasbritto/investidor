import { ref, watch } from 'vue'

export default function useNewsForm(props: any, emit: any) {
  const form = ref({
    title: props.initialData?.title || '',
    content: props.initialData?.content || '',
    category_id: props.initialData?.category_id ?? null
  })

  watch(
    () => props.initialData,
    (val) => {
      form.value = {
        title: val?.title || '',
        content: val?.content || '',
        category_id: val?.category_id ?? null
      }
    },
    { deep: true, immediate: true }
  )

  const handleSubmit = () => {
    emit('submit', { ...form.value, category_id: form.value.category_id ?? null })
  }

  return { form, handleSubmit }
}
