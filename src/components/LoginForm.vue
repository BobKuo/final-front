<template>
  <q-form class="q-gutter-md" @submit.prevent="submit">
    <h6>登入</h6>
    <!-- 帳號 -->
    <q-input
      v-model="account.value.value"
      label="帳號或信箱"
      square
      clearable
      required
      :disable="form.isSubmitting.value"
      :error="!!account.errorMessage.value"
      :error-message="account.errorMessage.value"
    />

    <!-- 密碼 -->
    <q-input
      v-model="password.value.value"
      label="密碼"
      type="password"
      maxlength="20"
      required
      :disable="form.isSubmitting.value"
      :error="!!password.errorMessage.value"
      :error-message="password.errorMessage.value"
    />

    <!-- 送出按鈕 -->
    <q-btn
      type="submit"
      label="登入"
      color="primary"
      :loading="form.isSubmitting.value"
      :disable="form.isSubmitting.value"
    />
    <!-- 註冊 -->
    <q-btn label="註冊" flat @click="toggleRegister" />
  </q-form>
</template>

<script setup>
// import validator from 'validator'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import * as yup from 'yup'
import userService from 'src/services/user'
import { useUserStore } from 'src/stores/user'

const router = useRouter()
const userStore = useUserStore()

defineProps(['toggleRegister'])
const emit = defineEmits(['closeDrawer'])

// 建立 vee-validate 的表單
const form = useForm({
  // 用 yup 定義表單驗證格式
  // https://github.com/jquense/yup
  validationSchema: yup.object({
    account: yup
      // 資料型態是文字
      .string()
      .required('帳號或電子郵件是必填的'),
    password: yup
      .string()
      .required('密碼是必填的')
      .min(4, '密碼至少需要 4 個字元')
      .max(20, '密碼最多只能有 20 個字元'),
  }),
})

// 建立 vee-validate 的表單欄位
// 一定要在 useForm 後面
// useField(欄位名稱)
const account = useField('account')
const password = useField('password')

const $q = useQuasar()

// vee-validate 的表單送出
// handleSubmit(處理function)
// values 表單所有欄位的值
const submit = form.handleSubmit(async (values) => {
  console.log('表單送出', values)

  try {
    // axios.post('/api/user', values)
    // userService.login(values)
    // => apiService.api.post('/user/login', data)

    // 解構axios回傳物件中的data
    const { data } = await userService.login({
      account: values.account,
      password: values.password,
    })

    // 使用 Pinia 儲存使用者資料
    // userStore.setUser(data.user)
    userStore.setUser(data.user)

    // 顯示成功訊息
    $q.notify({
      type: 'positive',
      message: '登入成功！',
      position: 'bottom',
    })

    // 收起側邊欄
    emit('closeDrawer')

    // 登入成功後，導向到首頁
    router.push('/')
  } catch (error) {
    console.error(error)
    // 顯示錯誤訊息
    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || '登入失敗，請稍後再試！',
      position: 'bottom-right',
    })
  }
})
</script>
