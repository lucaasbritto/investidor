import { computed } from 'vue'

export function NewsDetailScript(props: { modelValue: boolean; news: any | null }, emit: any) {
  const localModel = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })

  const close = () => emit('update:modelValue', false)

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ''
    if (isNaN(Date.parse(dateStr))) {
      return dateStr
    }

    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return {
    localModel,
    close,
    formatDate,
  }
}
