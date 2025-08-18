<template>
  <h6>{{ userStore.role === 'user' ? '會員' : '管理員' }}： {{ userStore.account }}</h6>
  <q-btn
    color="primary"
    :to="userStore.role === 'user' ? '/orders' : '/admin/orders'"
    class="q-mb-lg"
    >{{ userStore.role === 'user' ? '查看訂單' : '管理訂單' }}</q-btn
  >
  <q-btn @click="logout" label="登出" />
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import userService from 'src/services/user'
import { useUserStore } from 'src/stores/user'

const router = useRouter()
const userStore = useUserStore()

const emit = defineEmits(['closeDrawer'])
const $q = useQuasar()

const logout = async () => {
  try {
    await userService.logout()
    userStore.clearUser()
    // 顯示登出成功訊息
    $q.notify({
      type: 'positive',
      message: '登出成功！',
    })

    // 收起側邊欄
    emit('closeDrawer')

    // 登出成功後，導向到首頁
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>
