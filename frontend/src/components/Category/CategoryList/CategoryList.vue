<template>
  <div class="q-pa-md">

    <div class="row justify-between items-center q-mb-md">
      <div class="text-h6">Categorias</div>
      <q-btn color="primary" icon="add" label="Categoria" size="xs" @click="openCreateModal" dense  />
    </div>

    <q-table
      flat
      :rows="categories"
      :columns="columns"
      row-key="id"
      :loading="loading"
      no-data-label="Nenhuma categoria encontrada"
      loading-label="Carregando categorias..."
      dense
      bordered
      class="shadow-1 rounded-borders q-mb-md"
      :row-class="rowClass"
    >
      <template v-slot:body-cell-actions="props">
        <q-td align="center" class="q-pa-none">
          <q-btn flat dense round color="amber" icon="edit" size="sm" @click="openEditModal(props.row)" />
          <q-btn flat dense round color="negative" icon="delete" size="sm" @click="confirmDelete(props.row)" />
        </q-td>
      </template>
    </q-table>

    <CategoryEditModal
      v-model="showEditModal"
      :category="selectedCategory"
      @updated="reload"
    />

    <CategoryCreateModal
      v-model="showCreateModal"
      @created="reload"
    />

  </div>
</template>

<script setup lang="ts">
import { useCategoryList } from './CategoryList'
import CategoryEditModal from '../CategoryModal/CategoryEditModal.vue'
import CategoryCreateModal from '../CategoryModal/CategoryCreateModal.vue'

const {
  categories,
  loading,
  columns,
  showEditModal,
  showCreateModal,
  selectedCategory,
  openEditModal,
  openCreateModal,
  confirmDelete,
  reload,
  rowClass,
} = useCategoryList()
</script>

<style scoped lang="scss">
    @use './CategoryList.scss';
</style>
