<template>
  <q-dialog v-model="localModel" persistent transition-show="scale" transition-hide="scale">
    <q-card class="news-edit-modal q-pa-md">
      <div class="row items-center justify-between q-mb-sm">
        <div class="text-h6 text-weight-bold text-dark">Editar Notícia</div>
        <q-btn flat round dense icon="close" color="grey-7" @click="close" />
      </div>

      <NewsForm
        :initialData="formInitialData"
        :categories="categories"
        submitLabel="Salvar Alterações"
        :loading="loading"
        @submit="handleUpdate"
        @cancel="close"
      />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import NewsForm from '@/components/News/NewsForm/NewsForm.vue'
import { useNewsEdit, type EditableNews } from './NewsEditModal'

const props = defineProps<{
  modelValue: boolean
  news: EditableNews | null
  categories: { id: number; name: string }[]
}>()

const emit = defineEmits(['update:modelValue', 'updated'])

const { loading, localModel, formInitialData, handleUpdate, close } = useNewsEdit(props, emit)
</script>

<style lang="scss" scoped>
@use './NewsEditModal.scss';
</style>
