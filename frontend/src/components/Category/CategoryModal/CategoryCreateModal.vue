<template>
  <q-dialog v-model="localModel">
    <q-card style="min-width: 400px">
      <q-card-section class="text-h6">Nova Categoria</q-card-section>

      <q-card-section>
        <q-input v-model="form.name" label="Nome" outlined dense />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="close" />
        <q-btn color="primary" label="Salvar" @click="save" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { createCategory } from '@/api/category'
import { Notify } from 'quasar'
import { useCategories } from '@/stores/category'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'created'])

const form = ref({ name: '' })
const loading = ref(false)
const { reloadCategories } = useCategories()

const localModel = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val)
})

watch(localModel, (val) => {
  if (val) form.value.name = ''
})

const save = async () => {
  if (!form.value.name.trim()) {
    Notify.create({ message: 'Informe o nome da categoria', color: 'warning' })
    return
  }

  try {
    loading.value = true
    await createCategory(form.value)
    Notify.create({ message: 'Categoria criada!', color: 'positive' })

    await reloadCategories()

    emit('created')
    emit('update:modelValue', false)
  } catch (err) {
    console.error(err)
    Notify.create({ message: 'Erro ao criar categoria', color: 'negative' })
  } finally {
    loading.value = false
  }
}

const close = () => {
  localModel.value = false
}
</script>
