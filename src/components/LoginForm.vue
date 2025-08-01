<template>
  <div>
    <h6>登入</h6>
    <q-input v-model="loginForm.username" label="使用者名稱" outlined />
    <q-input v-model="loginForm.password" label="密碼" type="password" outlined />
    <q-btn label="登入" color="primary" @click="login" />
    <q-btn label="註冊" flat @click="toggleRegister" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loginForm = ref({
  username: '',
  password: '',
})

const login = () => {
  if (loginForm.value.username && loginForm.value.password) {
    alert('登入成功！')
  } else {
    alert('請輸入完整的登入資訊！')
  }
}

defineProps({
  toggleRegister: Function,
})
</script>
