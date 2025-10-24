<template>
  <div class="news-list q-pa-md">
    <div v-if="loading" class="loading-container">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <div
      v-else-if="newsList.length === 0"
      class="no-news-container text-grey-7 text-center q-pa-lg"
    >
      <q-icon name="newspaper" size="40px" color="grey-6" class="q-mb-sm" />
      <div class="text-subtitle1">Nenhuma notícia encontrada</div>
      <div class="text-caption text-grey-6">
        Tente ajustar os filtros de busca ou crie uma nova notícia.
      </div>
    </div>

    <div v-else class="row q-col-gutter-md justify-start">
      <div v-for="news in newsList" :key="news.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="news-card relative-position">
          <q-inner-loading :showing="deletingId === news.id">
            <q-spinner color="primary" size="30px" />
          </q-inner-loading>

          <q-card-section class="q-pa-sm">
            <div class="flex items-center justify-between">
              <span class="news-category">{{ news.category?.name }}</span>
              <div class="action-icons">
                <q-btn flat dense round size="xs" icon="edit" color="amber-7"
                  @click="openEditModal(news)" title="Editar Notícia" />
                <q-btn flat dense round size="xs" icon="delete" color="negative"
                  @click="deleteNews(news)" title="Excluir Notícia" />
              </div>
            </div>

            <div class="news-title text-weight-medium q-mt-xs">{{ truncateTitle(news.title) }}</div>
            <div class="news-content text-grey-7 ellipsis-3-lines" v-html="truncateHTML(news.content, 50)"></div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right" class="q-pa-xs">
            <q-btn dense unelevated size="xs" icon="arrow_outward" color="primary"
              label="Acessar" @click="openDetailModal(news)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div v-if="totalPages > 1" class="q-mt-md flex justify-center">
      <q-pagination
        v-model="currentPage"
        :max="totalPages"
        boundary-numbers
        max-pages="5"
        color="primary"
        dense
        size="sm"
        @update:model-value="reloadNews"
      />
    </div>

    <NewsDetailModal v-model="showDetailModal" :news="selectedNews" />

    <NewsEditModal
      v-model="showEditModal"
      :news="selectedNewsEdit"
      :categories="categories"
      @updated="reloadNews"
    />
  </div>
</template>

<script setup lang="ts">
import { useNewsList } from './NewsList'
import NewsDetailModal from '@/components/News/NewsModal/NewsDetail/NewsDetailModal.vue'
import NewsEditModal from '@/components/News/NewsModal/NewsEdit/NewsEditModal.vue'

const props = defineProps({
  searchTitle: {
    type: String,
    default: ''
  },
  searchCategoryId: {
    type: [Number, null],
    default: null
  }
})

const {
  newsList,
  categories,
  loading,
  deletingId,
  truncateHTML,
  truncateTitle,
  currentPage,
  totalPages,
  showDetailModal,
  selectedNews,
  openDetailModal,
  showEditModal,
  selectedNewsEdit,
  openEditModal,
  deleteNews,
  reloadNews
} = useNewsList(props)
</script>

<style lang="scss" scoped>
@use './NewsList.scss';
</style>
