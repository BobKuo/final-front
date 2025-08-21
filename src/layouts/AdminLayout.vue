<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-9 text-white">
    <q-header elevated class="bg-grey-6">
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu" icon="menu" />
        <q-toolbar-title> 管理後台 </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="bg-grey-8">
      <q-list dark>
        <q-item-label header>功能</q-item-label>

        <template v-for="item in navItems" :key="item.to">
          <q-item :to="item.to" :active-class="$route.path === item.to ? 'q-item--active' : ''">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <!-- <q-item to="/">
          <q-item-section avatar>
            <q-icon name="shopping_bag" />
          </q-item-section>
          <q-item-section>
            <q-item-label>商品管理</q-item-label>
            <q-item-label caption>https://quasar.dev</q-item-label>
          </q-item-section>
        </q-item> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

const navItems = [
  { title: '作品管理', to: '/admin/works', icon: 'palette' },
  { title: '商品管理', to: '/admin/products', icon: 'shopping_bag' },
  { title: '訂單管理', to: '/admin/orders', icon: 'list_alt' },
  { title: '首頁', to: '/', icon: 'home' },
]

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
