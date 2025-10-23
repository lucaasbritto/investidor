import { ref } from 'vue'
import { fetchCategories } from '@/api/category'

const categories = ref<{ id: number; name: string }[]>([])
const loading = ref(false)

export async function loadCategories() {
  if (categories.value.length > 0) return categories.value
  loading.value = true
  try {
    categories.value = await fetchCategories()
  } finally {
    loading.value = false
  }
  return categories.value
}


export async function reloadCategories() {
  loading.value = true
  try {
    categories.value = await fetchCategories()
  } finally {
    loading.value = false
  }
  return categories.value
}

export function useCategories() {
  return { categories, loading, loadCategories, reloadCategories }
}
