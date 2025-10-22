<template>
  <q-drawer show-if-above side="left" :width="200" class="side-menu">
    <div class="drawer-header">
      <q-icon name="dashboard" size="16px" />
      <span class="drawer-title">Dashboard</span>
    </div>

    <div class="search-container q-pa-xs">
      <q-input
        dense
        outlined
        rounded
        v-model="search"
        placeholder="Pesquisar noticia..."
        class="search-input"
        color="grey-7"
        input-class="text-caption"
        bg-color="white"
      >
        <template #prepend>
          <q-icon name="search" size="14px" color="grey-7" />
        </template>
      </q-input>
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

      <q-item clickable v-ripple to="/books/new" exact active-class="menu-item-active" dense>
        <q-item-section avatar>
          <q-icon name="post_add" size="13px" />
        </q-item-section>
        <q-item-section>Cadastrar</q-item-section>
      </q-item>

      <div class="section-title">
        <q-icon name="person" size="10px" class="section-icon" />
        Categorias
      </div>

      <q-item clickable v-ripple to="/authors" exact active-class="menu-item-active" dense>
        <q-item-section avatar>
          <q-icon name="group" size="13px" />
        </q-item-section>
        <q-item-section>Listar</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/authors/new" exact active-class="menu-item-active" dense>
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
