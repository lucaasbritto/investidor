<template>
  <q-dialog v-model="localModel">
    <q-card style="min-width: 400px">
      <q-card-section class="text-h6">Editar Categoria</q-card-section>

      <q-card-section>
        <q-input v-model="form.name" label="Nome" outlined dense />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="close" />
        <q-btn color="primary" label="Salvar" @click="update" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { updateCategory } from '@/api/category'
import { Notify } from 'quasar'

const props = defineProps<{ modelValue: boolean; category: any }>()
const emit = defineEmits(['update:modelValue', 'updated'])

const form = ref({ name: '' })
const loading = ref(false)

const localModel = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val)
})

watch(() => props.category, (cat) => {
  if (cat) form.value.name = cat.name
}, { immediate: true })

const update = async () => {
  if (!form.value.name.trim()) {
    Notify.create({ message: 'Informe o nome da categoria', color: 'warning' })
    return
  }

  try {
    loading.value = true
    await updateCategory(props.category.id, form.value)
    Notify.create({ message: 'Categoria atualizada!', color: 'positive' })
    emit('updated')
    close()
  } catch (err) {
    console.error(err)
    Notify.create({ message: 'Erro ao atualizar categoria', color: 'negative' })
  } finally {
    loading.value = false
  }
}

const close = () => {
  localModel.value = false
}
</script>
