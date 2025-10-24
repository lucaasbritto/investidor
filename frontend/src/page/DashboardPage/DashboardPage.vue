<template>
  <div class="dashboard q-pl-md">
    <div class="news-header q-pt-md q-pb-md flex items-center justify-between">
      <div class="flex items-center">
        <q-icon name="article" size="18px" class="header-icon q-mr-xs" />
        <span class="text-weight-medium">Últimas Notícias</span>
      </div>

      <div class="filters flex items-center q-gutter-sm"> 
        <q-input
          dense
          outlined
          rounded
          v-model="searchTitle"
          placeholder="Pesquisar noticia..."
          class="search-input"
          color="grey-7"
          input-class="text-caption"
          bg-color="white"
        >
          <template #prepend>
            <q-icon name="search" size="14px" color="grey-7" />
          </template>
        </q-input>

        <q-select
          dense
          outlined
          rounded
          v-model="searchCategoryId"
          :options="categoryOptions"
          option-label="name"
          option-value="id"
          emit-value
          map-options
          clearable
          label="Categoria"
          class="search-input"
          color="grey-7"
          input-class="text-caption"
          style="min-width: 180px;"
        />
      </div>
    </div>

    <NewsList
      :searchTitle="searchTitle"
      :searchCategoryId="searchCategoryId"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NewsList from '@/components/News/NewsList/NewsList.vue'
import { useCategories } from '@/stores/category'

const searchTitle = ref('')
const searchCategoryId = ref<number | null>(null)

const { categories } = useCategories()
const categoryOptions = categories

</script>

<style lang="scss" scoped>
    @use './DashboardPage.scss'; 
</style>