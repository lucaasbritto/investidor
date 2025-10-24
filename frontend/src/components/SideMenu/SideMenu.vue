<template>
  <q-drawer show-if-above side="left" :width="200" class="side-menu">
    <div class="drawer-header">
      <q-icon name="dashboard" size="16px" />
      <span class="drawer-title">Dashboard</span>
    </div>

    <div class="menu-container">
      <div class="section-title">
        <q-icon name="menu_book" size="10px" class="section-icon" />
        Notícias
      </div>

      <q-item clickable v-ripple to="/" exact active-class="menu-item-active" dense>
        <q-item-section avatar>
          <q-icon name="library_books" size="13px" />
        </q-item-section>
        <q-item-section>Listar</q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="$router.push('/news/create')" dense>
        <q-item-section avatar>
          <q-icon name="post_add" size="13px" />
        </q-item-section>
        <q-item-section>Cadastrar</q-item-section>
      </q-item>

      <div class="section-title">
        <q-icon name="person" size="10px" class="section-icon" />
        Categorias
      </div>

      <q-item clickable v-ripple @click="$router.push('/category')" exact active-class="menu-item-active" dense>
        <q-item-section avatar>
          <q-icon name="group" size="13px" />
        </q-item-section>
        <q-item-section>Listar</q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="$router.push('/category/create')" exact active-class="menu-item-active" dense>
        <q-item-section avatar>
          <q-icon name="person_add" size="13px" />
        </q-item-section>
        <q-item-section>Cadastrar</q-item-section>
      </q-item>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const search = ref('')
</script>

<style scoped lang="scss">
@use './SideMenu.scss';


</style>
