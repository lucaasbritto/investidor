<template>
  <q-layout view="hHh lpR fFf">
    <HeaderComponent />

    <q-page-container class="q-pa-md">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
</script>

<style scoped>

</style>