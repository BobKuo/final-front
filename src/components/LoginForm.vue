<template>
  <div class="login-form">
    <!-- 表單標題 -->
    <div class="form-header">
      <h5 class="form-title text-judy-7">歡迎回來</h5>
      <p class="form-subtitle text-judy-6">請登入您的帳戶</p>
    </div>

    <!-- 登入表單 -->
    <q-form class="form-content" @submit.prevent="submit">
      <!-- 帳號輸入 -->
      <div class="input-group">
        <q-input
          v-model="account.value.value"
          label="帳號或信箱"
          outlined
          no-error-icon
          class="custom-input"
          :class="{ 'input-error': !!account.errorMessage.value }"
          :disable="form.isSubmitting.value"
          :error="!!account.errorMessage.value"
          :error-message="account.errorMessage.value"
        >
          <template v-slot:prepend>
            <q-icon name="person" class="text-judy-4" />
          </template>
        </q-input>
      </div>

      <!-- 密碼輸入 -->
      <div class="input-group">
        <q-input
          v-model="password.value.value"
          label="密碼"
          :type="showPassword ? 'text' : 'password'"
          outlined
          no-error-icon
          maxlength="20"
          class="custom-input"
          :class="{ 'input-error': !!password.errorMessage.value }"
          :disable="form.isSubmitting.value"
          :error="!!password.errorMessage.value"
          :error-message="password.errorMessage.value"
        >
          <template v-slot:prepend>
            <q-icon name="lock" class="text-judy-4" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer text-judy-6"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </div>

      <!-- 登入按鈕 -->
      <div class="button-group">
        <q-btn
          type="submit"
          no-caps
          unelevated
          class="login-btn bg-judy-3 text-white"
          :loading="form.isSubmitting.value"
          :disable="form.isSubmitting.value"
        >
          <span class="btn-text">登入</span>
          <q-icon name="arrow_forward" class="q-ml-sm" />
        </q-btn>

        <!-- 註冊按鈕 -->
        <q-btn
          no-caps
          flat
          class="register-btn text-judy-5"
          @click="toggleRegister"
          :disable="form.isSubmitting.value"
        >
          <span>還沒有帳戶？點此註冊</span>
        </q-btn>
      </div>

      <!-- 忘記密碼 -->
      <div class="forgot-password">
        <q-btn flat no-caps size="sm" class="forgot-btn text-judy-6" @click="handleForgotPassword">
          忘記密碼？
        </q-btn>
      </div>
    </q-form>

    <!-- 裝飾性元素 -->
    <div class="form-decoration">
      <div class="decoration-line bg-judy-2"></div>
      <div class="decoration-circle bg-judy-4"></div>
      <div class="decoration-dot bg-judy-5"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import * as yup from 'yup'
import userService from 'src/services/user'
import { useUserStore } from 'src/stores/user'

const router = useRouter()
const userStore = useUserStore()
const $q = useQuasar()

defineProps(['toggleRegister'])
const emit = defineEmits(['closeDrawer'])

// 控制密碼顯示
const showPassword = ref(false)

// 建立 vee-validate 的表單
const form = useForm({
  validationSchema: yup.object({
    account: yup.string().required('帳號或電子郵件是必填的'),
    password: yup
      .string()
      .required('密碼是必填的')
      .min(4, '密碼至少需要 4 個字元')
      .max(20, '密碼最多只能有 20 個字元'),
  }),
})

// 建立 vee-validate 的表單欄位
const account = useField('account')
const password = useField('password')

// 表單送出處理
const submit = form.handleSubmit(async (values) => {
  try {
    const { data } = await userService.login({
      account: values.account,
      password: values.password,
    })

    userStore.setUser(data.user)

    $q.notify({
      type: 'positive',
      message: '登入成功！',
      timeout: 2000,
      position: 'top',
    })

    emit('closeDrawer')
    router.push('/')
  } catch (error) {
    console.error('Login error:', error)

    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || '登入失敗，請稍後再試！',
      timeout: 3000,
      position: 'top',
    })
  }
})

// 忘記密碼處理
const handleForgotPassword = () => {
  $q.notify({
    type: 'info',
    message: '忘記密碼功能開發中，請聯繫管理員',
    timeout: 2000,
    position: 'top',
  })
}
</script>

<style scoped>
.login-form {
  padding: 24px;
  max-width: 100%;
  position: relative;
  overflow: hidden;
}

/* 表單標題區域 */
.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.form-title {
  margin: 0 0 8px 0;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
}

.form-subtitle {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
  font-weight: 400;
}

/* 表單內容 */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 輸入群組 */
.input-group {
  position: relative;
}

.custom-input {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.custom-input :deep(.q-field__control) {
  border-radius: 12px;
  background-color: rgba(248, 244, 240, 0.5);
  /* border: 2px solid rgba(235, 140, 111, 0.2); */
  transition: all 0.3s ease;
}

.custom-input:not(.input-error) :deep(.q-field__control:hover) {
  /* border-color: rgba(235, 140, 111, 0.4); */
  background-color: rgba(248, 244, 240, 0.8);
}

.custom-input :deep(.q-field--focused .q-field__control) {
  border-color: rgba(154, 198, 219, 0.6) !important;
  /* box-shadow: 0 0 0 3px rgba(154, 198, 219, 0.1); */
  background-color: rgba(248, 244, 240, 1);
}

.input-error :deep(.q-field__control) {
  /* border-color: rgba(198, 40, 40, 0.5) !important; */
  background-color: rgba(198, 40, 40, 0.05);
}

.custom-input :deep(.q-field__label) {
  color: rgba(58, 78, 61, 0.7);
  font-weight: 500;
}

.custom-input :deep(.q-field--focused .q-field__label) {
  color: rgba(154, 198, 219, 0.8);
}

/* 按鈕群組 */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

.login-btn {
  width: 100%;
  padding: 14px 24px;
  border-radius: 12px;
  min-height: 50px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  /* box-shadow: 0 4px 16px rgba(154, 198, 219, 0.3); */
  /* transition: all 0.3s ease; */
  justify-content: center;
  align-items: center;
}

.login-btn:hover {
  background-color: rgba(154, 198, 219, 0.9) !important;
  /* transform: translateY(-2px); */
  /* box-shadow: 0 6px 20px rgba(154, 198, 219, 0.4); */
}

.login-btn:active {
  transform: translateY(0);
}

.btn-text {
  font-size: 1rem;
  letter-spacing: 0.5px;
}

.register-btn {
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.register-btn:hover {
  background-color: rgba(217, 164, 65, 0.1);
  color: rgba(217, 164, 65, 0.9);
}

/* 忘記密碼 */
.forgot-password {
  text-align: center;
  margin-top: 8px;
}

.forgot-btn {
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.forgot-btn:hover {
  color: rgba(170, 170, 170, 0.8);
  text-decoration: underline;
}

/* 裝飾性元素 */
.form-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: -1;
}

.decoration-line {
  position: absolute;
  top: 30%;
  right: -50px;
  width: 100px;
  height: 2px;
  border-radius: 1px;
  opacity: 0.1;
  transform: rotate(45deg);
}

.decoration-circle {
  position: absolute;
  bottom: 20%;
  left: -30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  opacity: 0.05;
}

.decoration-dot {
  position: absolute;
  top: 15%;
  left: 20%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.2;
}

/* 載入狀態 */
.login-btn :deep(.q-spinner) {
  color: white;
}

/* 錯誤訊息樣式 */
.custom-input :deep(.q-field__messages) {
  color: rgba(198, 40, 40, 0.8);
  font-weight: 500;
  font-size: 0.8rem;
  margin-top: 4px;
}

/* 響應式設計 */
@media (max-width: 480px) {
  .login-form {
    padding: 20px 16px;
  }

  .form-header {
    margin-bottom: 24px;
  }

  .form-title {
    font-size: 1.3rem;
  }

  .form-subtitle {
    font-size: 0.85rem;
  }

  .login-btn {
    padding: 12px 20px;
    min-height: 46px;
    font-size: 0.95rem;
  }

  .btn-text {
    font-size: 0.95rem;
  }
}

/* 動畫效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-form {
  animation: fadeInUp 0.6s ease-out;
}

.input-group {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.input-group:nth-child(1) {
  animation-delay: 0.1s;
}
.input-group:nth-child(2) {
  animation-delay: 0.2s;
}
.button-group {
  animation: fadeInUp 0.6s ease-out;
  animation-delay: 0.3s;
  animation-fill-mode: both;
}

/* 聚焦狀態增強 */
.custom-input :deep(.q-field--focused) {
  z-index: 1;
}

/* Judy 顏色系統的微調 */
.text-judy-4 {
  color: rgba(122, 184, 163, 0.8);
}
.text-judy-5 {
  color: rgba(217, 164, 65, 0.9);
}
.text-judy-6 {
  color: rgba(170, 170, 170, 0.8);
}
.text-judy-7 {
  color: rgba(58, 78, 61, 1);
}

.bg-judy-2 {
  background-color: rgba(235, 140, 111, 1);
}
.bg-judy-3 {
  background-color: rgba(154, 198, 219, 1);
}
.bg-judy-4 {
  background-color: rgba(122, 184, 163, 1);
}
.bg-judy-5 {
  background-color: rgba(217, 164, 65, 1);
}
</style>
