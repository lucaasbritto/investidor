<template>
  <div class="create-news-page q-pa-md flex flex-center">
    <q-card class="news-card q-pa-md">
      <div class="header q-mb-sm flex items-center">
        <q-icon name="article" size="sm" class="q-mr-sm" />
        <h6 class="text-weight-bold q-ma-none">Nova Notícia</h6>
      </div>

      <q-form @submit.prevent="handleSubmit" class="q-gutter-sm">
        <q-input
          dense
          filled
          v-model="title"
          label="Título"
          :rules="[val => !!val || 'Título é obrigatório']"
          maxlength="100"
          label-class="form-label"
          input-class="form-input"
        >
          <template v-slot:prepend>
            <q-icon name="title" class="text-gold" />
          </template>
        </q-input>

        <q-select
          dense
          filled
          v-model="categoryId"
          :options="categories"
          option-label="name"
          option-value="id"
          label="Categoria"
          :rules="[val => !!val || 'Categoria é obrigatória']"
          emit-value
          map-options
          label-class="form-label"
          input-class="form-input"
        >
          <template v-slot:prepend>
            <q-icon name="category" class="text-gold" />
          </template>
        </q-select>

        <q-input
          dense
          filled
          type="textarea"
          v-model="content"
          label="Conteúdo"
          :rules="[val => !!val || 'Conteúdo é obrigatório']"
          autogrow
          maxlength="1000"
          label-class="form-label"
          input-class="form-input"
        >
          <template v-slot:prepend>
            <q-icon name="description" class="text-gold" />
          </template>
        </q-input>

        <div class="q-mt-sm flex justify-end gap-sm">
          <q-btn
            label="Cadastrar"
            type="submit"
            unelevated
            size="xs"
            :loading="loading"
            icon="send"
            class="btn-gold btn-animated"
          />
          <q-btn
            label="Cancelar"
            flat
            color="grey-7"
            icon="close"
            size="xs"
            @click="goBack"
            class="btn-animated"
          />
        </div>

      </q-form>
    </q-card>
  </div>
</template>

<script setup lang="ts">
  import { NewListScript } from './NewsAdd'
  const { title, content, categoryId, categories, loading, handleSubmit, goBack } = NewListScript()
</script>

<style lang="scss" scoped>
    @use './NewsAdd.scss'; 
</style>
