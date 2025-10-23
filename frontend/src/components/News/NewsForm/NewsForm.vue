<template>
  <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
    <q-input
      v-model="form.title"
      label="Título"
      outlined
      dense
      required
    />

    <q-select
      v-model="form.category_id"
      :options="categoryOptions"
      label="Categoria"
      outlined
      dense
      emit-value
      map-options
    />

    <q-editor
      v-model="form.content"
      label="Conteúdo"
      outlined
      min-height="150px"
    />

    <div class="row justify-end q-gutter-sm">
      <q-btn flat label="Cancelar" color="grey" @click="emit('cancel')" />
      <q-btn color="primary" :label="submitLabel" type="submit" :loading="loading" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useNewsForm from './NewsForm.ts'

const props = defineProps<{
  initialData?: { title?: string; content?: string; category_id?: number | null }
  categories: { id: number; name: string }[]
  submitLabel: string
  loading?: boolean
}>()

const emit = defineEmits(['submit', 'cancel'])

const { form, handleSubmit } = useNewsForm(props, emit)

const categoryOptions = computed(() =>
  props.categories.map(c => ({ label: c.name, value: c.id }))
)
</script>

<style lang="scss" scoped>
@use './NewsForm.scss';
</style>
