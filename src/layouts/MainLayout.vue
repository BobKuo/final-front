<template>
  <q-layout view="hHr lpr ffr">
    <q-header
      v-model="headerVisible"
      reveal
      @reveal="onHeaderReveal"
      bordered
      class="bg-primary text-white"
      height-hint="98"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          JUDY WANG ART
        </q-toolbar-title>

        <q-tabs align="right">
          <template v-for="item in navItems">
            <q-route-tab
              v-if="item.show !== false"
              :key="item.to"
              :to="item.to"
              :label="item.label"
              exact
            />
          </template>
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
            <UserProfile v-if="userStore.isLoggedIn" @closeDrawer="toggleRightDrawer" />
            <LoginForm
              v-if="!userStore.isLoggedIn && !showRegister"
              :toggleRegister="toggleRegister"
              @closeDrawer="toggleRightDrawer"
            />
            <RegisterForm v-if="showRegister" :toggleRegister="toggleRegister" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-page-sticky position="top">
        <q-btn @click="toggleHeader" flat round color="primary" icon="arrow_drop_down" />
      </q-page-sticky>
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
import { computed, ref } from 'vue'
import LoginForm from 'src/components/LoginForm.vue'
import RegisterForm from 'src/components/RegisterForm.vue'
import UserProfile from 'src/components/UserProfile.vue'
import { useUserStore } from 'src/stores/user'
// import MemberActions from '../components/MemberActions.vue'

const userStore = useUserStore()

const rightDrawerOpen = ref(false)
const showRegister = ref(false) // 是否顯示註冊表單
const headerVisible = ref(true)

//
const navItems = computed(() => [
  { to: '/daily', label: '365日常', show: true },
  { to: '/work', label: '作品集', show: true },
  { to: '/paper', label: '著色紙下載', show: userStore.isLoggedIn },
  { to: '/shopping', label: '原畫及周邊', show: userStore.isLoggedIn },
  { to: '/clips', label: '小短片' },
  { to: '/about', label: '關於我' },
  { to: '/contact', label: '聯絡我' },
  { to: '/admin/products', label: '管理後台', show: userStore.isLoggedIn && userStore.isAdmin },
])

// 切換右側側欄
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

// 切換註冊表單顯示
const toggleRegister = () => {
  showRegister.value = !showRegister.value
}

// 顯示頁首
const toggleHeader = () => {
  headerVisible.value = !headerVisible.value
}

//
const onHeaderReveal = (value) => {
  console.log(value ? '🔼 Header 出現（reveal）' : '🔽 Header 被收起（hide）')
  headerVisible.value = value
}
</script>
