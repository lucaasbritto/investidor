<template>
  <div class="dashboard q-pl-md">
    <div class="news-header q-pt-md q-pb-md flex items-center">
      <q-icon name="article" size="18px" class="header-icon q-mr-xs" />
      <span>Últimas Notícias</span>
    </div>
    <NewsList />
  </div>
</template>

<script setup lang="ts">
import NewsList from '@/components/NewsList/NewsList/NewsList.vue'
</script>

<style lang="scss" scoped>
    @use './DashboardPage.scss'; 
</style>