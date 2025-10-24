<template>
  <q-dialog
    v-model="localModel"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="news-modal q-pa-md">
      <div class="header q-mb-sm">
        <div class="title">{{ news?.title }}</div>
        <q-btn flat round dense icon="close" color="grey-6" @click="close" class="close-icon" />
      </div>

      <div class="meta-info q-mb-md">
        <span class="category">{{ news?.category?.name || 'Sem categoria' }}</span>
        <span class="dot">•</span>
        <span class="date">{{ formatDate(news?.created_at) }}</span>
      </div>

      <q-separator spaced color="grey-4" />
      <div class="q-mt-md content" v-html="news?.content"></div>

      <div class="q-mt-md flex justify-end">
        <q-btn
          unelevated
          color="amber-7"
          label="Fechar"
          @click="close"
          class="close-btn"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { NewsDetailScript } from './NewsDetailModal'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: boolean
  news: any | null
}>()

const emit = defineEmits(['update:modelValue'])

const { localModel, close, formatDate } = NewsDetailScript(props, emit)
</script>

<style lang="scss" scoped>
    @use './NewsDetailModal.scss';
</style>
