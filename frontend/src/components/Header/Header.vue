<template>
  <q-header elevated class="bg-black text-white q-px-md q-py-xs">
    <div class="row items-center justify-between full-width divHeader">

      <div class="row items-center">
        <img src="/images/logo-investidor-white.svg" alt="Logo" height="20" class="" />
      </div>
        

      <div class="row items-center q-gutter-sm">

        <div class="row items-center">
          <q-avatar size="28px" color="primary" text-color="white">
            <img :src="`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=f05065&color=fff&bold=true`" />
          </q-avatar>

          <div class="column q-ml-xs">
            <div class="text-caption text-grey-4 welcomeText">Bem-vindo,</div>
            <div class="text-caption text-weight-bold">{{ user?.name || 'Usuário' }}</div>
          </div>
        </div>

        <q-separator vertical color="grey-8" class="q-mx-sm"/>

        <q-btn
          flat
          dense
          icon="logout"
          color="red-4"
          size="sm"
          @click="logout"
          title="Sair"
        />
      </div>

    </div>
  </q-header>
</template>

<script setup>
import headerScript from './Header.js'

const { user, logout } = headerScript()
</script>

<style scoped lang="scss">
  @use './Header.scss'; 
</style>
