<template>
  <div class="q-pa-md flex flex-center login-page">    
    <q-card class="q-pa-xl login-card">
      <div class="text-center q-mb-md">
        <img src="/images/logo-investidor.webp" alt="Logo" class="logo q-mb-sm" />
        <div class="text-grey"><small>Bem-vindo a sua Carteira de Finanças</small></div>
      </div>

      <q-form @submit.prevent="handleLogin" class="">
        <q-input
          v-model="email"
          label="Email"
          type="email"
          class="full-width"
          filled
          :disable="loading"
          lazy-rules
          :rules="[val => !!val || 'Campo obrigatório']"
          stack-label
        />

        <q-input
          v-model="password"
          label="Senha"
          type="password"
          class="full-width"
          :disable="loading"
          filled
          lazy-rules
          :rules="[val => !!val || 'Campo obrigatório']"
          stack-label
        />

        <q-btn
          type="submit"
          label="Entrar"
          class="full-width btn-biblioteca"
          :loading="loading"
          :disable="loading"
          no-caps
        >
          <template v-slot:loading>
            <q-spinner-dots size="20px" class="q-mr-sm" />
            Entrando...
          </template>
        </q-btn>

        <q-banner
          v-if="error"
          class="bg-red-2 text-red q-mt-md"
          dense
          rounded
        >
          {{ error }}
        </q-banner>
      </q-form>

      <div class="text-center q-mt-md text-grey-6 text-caption">
        <small>© Todos os Diretos Reservados</small>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { LoginPageScript } from './LoginPage.js';

const { email, password, loading, error, handleLogin } = LoginPageScript()

</script>

<style lang="scss" scoped>
    @use './LoginPage.scss'; 
</style>