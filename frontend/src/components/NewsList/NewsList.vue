<template>
  <div class="news-list q-pa-md">
    <div v-if="loading" class="loading-container">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <div v-else class="row q-col-gutter-md justify-start">
      <div
        v-for="news in newsList"
        :key="news.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="news-card">
          <q-card-section class="q-pa-sm">
            <div class="flex items-center justify-between">
              <span class="news-category">
                {{ news.category?.name }}
              </span>
            </div>

            <div class="news-title text-weight-medium">
              {{ truncateTitle(news.title) }}
            </div>

            <div class="news-content text-grey-7 ellipsis-3-lines">
              {{ truncate(news.content, 50) }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right" class="q-pa-xs">
            <q-btn
              dense
              unelevated
              color="primary"
              size="xs"
              icon="arrow_outward"
              label="Acessar"
              class="access-btn"
              @click="openNews(news)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { NewListScript } from './NewsList'

    const { newsList, loading, truncate, truncateTitle, openNews } = NewListScript()
</script>

<style lang="scss" scoped>
    @use './NewsList.scss'; 
</style>
