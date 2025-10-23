<template>
  <div class="dashboard q-pl-md">
    <div class="news-header q-pt-md q-pb-md flex items-center">
      <q-icon name="article" size="18px" class="header-icon q-mr-xs" />
      <span>Categorias</span>
    </div>
    <CategoryList />
  </div>
</template>

<script setup lang="ts">
import CategoryList from '@/components/Category/CategoryList/CategoryList.vue'
</script>

<style lang="scss" scoped>
    @use './CategoryPage.scss'; 
</style>