import { ref, onMounted } from 'vue'
import { Dialog, Notify } from 'quasar'
import { useCategories } from '@/stores/category'
import { deleteCategory } from '@/api/category'
import type { QTableColumn } from 'quasar'

export interface CategoryRow {
  id: number
  name: string
}

export function useCategoryList() {
  const { categories, loading, loadCategories } = useCategories()

  const showEditModal = ref(false)
  const showCreateModal = ref(false)
  const selectedCategory = ref<CategoryRow | null>(null)

  const deletingCategory = ref(false)

  const columns: QTableColumn<CategoryRow>[] = [
    { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
    { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
    { name: 'actions', label: 'Ações', field: (_) => '', align: 'center' },
  ]

  const openEditModal = (category: CategoryRow) => {
    selectedCategory.value = category
    showEditModal.value = true
  }

  const openCreateModal = () => showCreateModal.value = true

  const confirmDelete = (category: CategoryRow) => {
    Dialog.create({
      title: 'Confirmar exclusão',
      message: `Deseja realmente excluir a categoria "${category.name}"?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      try {
        deletingCategory.value = true
        await deleteCategory(category.id)
        categories.value = categories.value.filter(c => c.id !== category.id)
        Notify.create({ message: 'Categoria excluída!', color: 'positive' })
      } catch (err) {
        console.error(err)
        Notify.create({ message: 'Erro ao excluir categoria', color: 'negative' })
      } finally {
        deletingCategory.value = false
      }
    })
  }

  const reload = () => loadCategories()

  const rowClass = () => 'q-hoverable cursor-pointer'

  onMounted(loadCategories)

  return {
    categories,
    loading,
    deletingCategory,
    columns,
    showEditModal,
    showCreateModal,
    selectedCategory,
    openEditModal,
    openCreateModal,
    confirmDelete,
    reload,
    rowClass,
  }
}
