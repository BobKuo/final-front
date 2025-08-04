<template>
  <q-form class="q-gutter-md" @submit.prevent="submit">
    <h6>註冊</h6>
    <!-- 帳號 -->
    <q-input
      v-model="account.value.value"
      label="帳號"
      maxlength="20"
      counter
      square
      clearable
      required
      :disable="form.isSubmitting.value"
      :error="!!account.errorMessage.value"
      :error-message="account.errorMessage.value"
    />

    <!-- 信箱 -->
    <q-input
      v-model="email.value.value"
      label="信箱"
      clearable
      required
      :disable="form.isSubmitting.value"
      :error="!!email.errorMessage.value"
      :error-message="email.errorMessage.value"
    />

    <!-- 密碼 -->
    <q-input
      v-model="password.value.value"
      label="密碼"
      type="password"
      maxlength="20"
      counter
      required
      :disable="form.isSubmitting.value"
      :error="!!password.errorMessage.value"
      :error-message="password.errorMessage.value"
    />

    <!-- 確認密碼 -->
    <q-input
      v-model="confirmPassword.value.value"
      label="確認密碼"
      type="password"
      maxlength="20"
      counter
      filled
      required
      :disable="form.isSubmitting.value"
      :error="!!confirmPassword.errorMessage.value"
      :error-message="confirmPassword.errorMessage.value"
    />

    <!-- 送出按鈕 -->
    <q-btn
      type="submit"
      label="註冊"
      color="primary"
      :loading="form.isSubmitting.value"
      :disable="form.isSubmitting.value"
    />
    <!-- 取消 -->
    <q-btn label="取消" flat @click="toggleRegister" />
  </q-form>

  <!--
  <q-input v-model="registerForm.username" label="使用者名稱" outlined />
  <q-input v-model="registerForm.email" label="電子郵件" outlined />
  <q-input v-model="registerForm.password" label="密碼" type="password" outlined />
    <q-btn label="提交註冊" color="primary" @click="register" />
    <q-btn label="取消" flat @click="toggleRegister" /> -->
</template>

<script setup>
import validator from 'validator'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useQuasar } from 'quasar'
import userService from 'src/services/user'

// 建立 vee-validate 的表單
const form = useForm({
  // 用 yup 定義表單驗證格式
  // https://github.com/jquense/yup
  validationSchema: yup.object({
    account: yup
      // 資料型態是文字
      .string()
      .required('帳號是必填的')
      .min(4, '帳號至少需要 4 個字元')
      .max(20, '帳號最多只能有 20 個字元')
      // 自訂驗證(驗證名稱, 錯誤訊息, 驗證function)
      .test('isAlphanumeric', '帳號只能包含英文字母和數字', (value) => {
        return validator.isAlphanumeric(value)
      }),
    email: yup
      .string()
      .required('電子郵件是必填的')
      .test('isEmail', '請輸入有效的電子郵件地址', (value) => {
        return validator.isEmail(value)
      }),
    password: yup
      .string()
      .required('密碼是必填的')
      .min(4, '密碼至少需要 4 個字元')
      .max(20, '密碼最多只能有 20 個字元'),
    confirmPassword: yup
      .string()
      .required('確認密碼是必填的')
      // .oneOf(陣列, 訊息)   欄位的值必須是陣列內的其中一個
      // .ref(欄位)          取得欄位的值
      // .ref(password)     password 欄位的值
      .oneOf([yup.ref('password')], '密碼和確認密碼必須相同'),
  }),
})

// 建立 vee-validate 的表單欄位
// 一定要在 useForm 後面
// useField(欄位名稱)
const account = useField('account')
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('confirmPassword')

const $q = useQuasar()

// vee-validate 的表單送出
// handleSubmit(處理function)
// values 表單所有欄位的值
const submit = form.handleSubmit(async (values) => {
  console.log('表單送出', values)

  try {
    // axios.post('/api/user', values)
    // userService.create(values)
    // => apiService.api.post('/user', data)

    await userService.create({
      account: values.account,
      email: values.email,
      password: values.password,
    })
    // 顯示成功訊息
    $q.notify({
      type: 'positive',
      message: '註冊成功! 請登入',
      position: 'bottom-right',
    })
    // 切換到登入
    props.toggleRegister()
  } catch (error) {
    console.error(error)
    // 顯示錯誤訊息
    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || '註冊失敗，請稍後再試！',
      position: 'bottom-right',
    })
  }
})

const props = defineProps(['toggleRegister'])
</script>
