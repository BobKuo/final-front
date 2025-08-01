<template>
  <q-layout view="hhr lpr ffr">
    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          JUDY WANG ART
        </q-toolbar-title>

        <q-tabs align="right">
          <q-route-tab v-for="item in navItems" :key="item.to" :to="item.to" :label="item.label" />
        </q-tabs>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" elevated overlay behavior="mobile">
      <!-- drawer content -->
      <q-list>
        <!-- 登入表單 -->
        <q-item>
          <q-item-section>
            <LoginForm v-if="!isLoggedIn && !showRegister" :toggleRegister="toggleRegister" />
            <RegisterForm v-if="showRegister" :toggleRegister="toggleRegister" />
            <!-- <MemberActions v-if="isLoggedIn" @logout="logout" /> -->
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
// import MemberActions from '../components/MemberActions.vue'

const rightDrawerOpen = ref(false)
const isLoggedIn = ref(false) // 是否已登入
const showRegister = ref(false) // 是否顯示註冊表單

//
const navItems = [
  { to: '/daily', label: '365日常' },
  { to: '/work', label: '作品集' },
  { to: '/paper', label: '著色紙下載' },
  { to: '/shop', label: '原畫及周邊' },
  { to: '/shop', label: '小短片' },
  { to: '/shop', label: '關於我' },
  { to: '/shop', label: '聯絡我' },
]

// 切換右側側欄
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

//
// 切換註冊表單顯示
const toggleRegister = () => {
  showRegister.value = !showRegister.value
}

// 登出功能
// const logout = () => {
//   isLoggedIn.value = false
//   alert('已登出！')
// }
</script>
