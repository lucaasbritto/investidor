<template>
  <div class="q-pa-md">
    <q-card class="q-pa-lg">
      <div class="text-h6">Bem-vindo ao Dashboard!</div>
      <q-btn label="Sair" color="negative" @click="logout" class="q-mt-md" />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>