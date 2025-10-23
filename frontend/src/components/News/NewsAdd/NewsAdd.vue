<template>
  <div class="create-news-page q-pa-md flex flex-center">
    <q-card class="news-card q-pa-md">
      <div class="header q-mb-sm flex items-center">
        <q-icon name="article" size="sm" class="q-mr-sm" />
        <h6 class="text-weight-bold q-ma-none">Nova Notícia</h6>
      </div>

      <NewsForm
        submitLabel="Cadastrar"
        :loading="loading"
        :initialData="{ title: '', content: '', category_id: null }"
        :categories="categories"
        @submit="handleSubmit"
        @cancel="goBack"
      />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useNewsAdd } from './NewsAdd'
import NewsForm from '@/components/News/NewsForm/NewsForm.vue'

const { loading, handleSubmit, goBack,categories } = useNewsAdd()
</script>

<style lang="scss" scoped>
    @use './NewsAdd.scss'; 
</style>
