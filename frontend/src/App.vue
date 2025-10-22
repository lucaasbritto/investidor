<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader v-if="!isLoginPage && userStore.isAuthenticated" />
    <SideMenu v-if="!isLoginPage && userStore.isAuthenticated" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { useUserStore } from './stores/user'
import AppHeader from '@/components/Header/Header.vue'
import SideMenu from '@/components/SideMenu/SideMenu.vue'

const route = useRoute()
const userStore = useUserStore()

const isLoginPage = computed(() => route.name === 'Login')

watch(
  () => userStore.isAuthenticated,
  async (isAuth) => {
    if (isAuth && !userStore.user) {
      await userStore.fetchUser()
    }
  },
  { immediate: true }
)
</script>

<style>
.scroll {
  overflow-y: auto;
}
</style>
