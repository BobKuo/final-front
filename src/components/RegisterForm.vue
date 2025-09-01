<template>
  <div class="register-form">
    <!-- 表單標題 -->
    <div class="form-header">
      <h5 class="form-title text-judy-7">建立新帳戶</h5>
      <p class="form-subtitle text-judy-6">當Judy的好朋友吧！</p>
    </div>

    <!-- 註冊表單 -->
    <q-form class="form-content" @submit.prevent="submit">
      <!-- 帳號輸入 -->
      <div class="input-group">
        <q-input
          v-model="account.value.value"
          label="帳號"
          outlined
          no-error-icon
          maxlength="20"
          counter
          class="custom-input"
          :class="{ 'input-error': !!account.errorMessage.value }"
          :disable="form.isSubmitting.value"
          :error="!!account.errorMessage.value"
          :error-message="account.errorMessage.value"
        >
          <template v-slot:prepend>
            <q-icon name="account_box" class="text-judy-4" />
          </template>
        </q-input>
      </div>

      <!-- 信箱輸入 -->
      <div class="input-group">
        <q-input
          v-model="email.value.value"
          label="電子信箱"
          outlined
          no-error-icon
          class="custom-input"
          :class="{ 'input-error': !!email.errorMessage.value }"
          :disable="form.isSubmitting.value"
          :error="!!email.errorMessage.value"
          :error-message="email.errorMessage.value"
        >
          <template v-slot:prepend>
            <q-icon name="mail" class="text-judy-4" />
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
          counter
          class="custom-input"
          :class="{ 'input-error': !!password.errorMessage.value }"
          :disable="form.isSubmitting.value"
          :error="!!password.errorMessage.value"
          :error-message="password.errorMessage.value"
        >
          <template v-slot:prepend>
            <q-icon name="key" class="text-judy-4" />
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

      <!-- 確認密碼輸入 -->
      <div class="input-group">
        <q-input
          v-model="confirmPassword.value.value"
          label="確認密碼"
          :type="showConfirmPassword ? 'text' : 'password'"
          outlined
          no-error-icon
          maxlength="20"
          counter
          class="custom-input"
          :class="{ 'input-error': !!confirmPassword.errorMessage.value }"
          :disable="form.isSubmitting.value"
          :error="!!confirmPassword.errorMessage.value"
          :error-message="confirmPassword.errorMessage.value"
        >
          <template v-slot:prepend>
            <q-icon name="lock" class="text-judy-4" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer text-judy-6"
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </template>
        </q-input>
      </div>

      <!-- 密碼強度指示器 -->
      <div class="password-strength" v-if="password.value.value">
        <div class="strength-label text-judy-6">密碼強度：</div>
        <div class="strength-bar">
          <div
            class="strength-fill"
            :class="passwordStrengthClass"
            :style="{ width: passwordStrengthWidth }"
          ></div>
        </div>
        <div class="strength-text" :class="passwordStrengthClass">
          {{ passwordStrengthText }}
        </div>
      </div>

      <!-- 使用條款 -->
      <div class="terms-section">
        <q-checkbox v-model="acceptTerms" class="terms-checkbox" color="judy-5">
          <span class="terms-text text-judy-6">
            我同意
            <a href="#" class="terms-link text-judy-5" @click.prevent="showTerms">使用條款</a>
            和
            <a href="#" class="terms-link text-judy-5" @click.prevent="showPrivacy">隱私政策</a>
          </span>
        </q-checkbox>
      </div>

      <!-- 按鈕群組 -->
      <div class="button-group">
        <q-btn
          type="submit"
          no-caps
          class="register-btn bg-judy-5 text-white"
          :loading="form.isSubmitting.value"
          :disable="form.isSubmitting.value || !acceptTerms"
        >
          <span class="btn-text">建立帳戶</span>
          <q-icon name="person_add" class="q-ml-sm" />
        </q-btn>

        <!-- 取消按鈕 -->
        <q-btn
          no-caps
          flat
          class="cancel-btn text-judy-6"
          @click="toggleRegister"
          :disable="form.isSubmitting.value"
        >
          <span>已有帳戶？點此登入</span>
        </q-btn>
      </div>
    </q-form>

    <!-- 裝飾性元素 -->
    <div class="form-decoration">
      <div class="decoration-circle-1 bg-judy-2"></div>
      <div class="decoration-circle-2 bg-judy-3"></div>
      <div class="decoration-triangle bg-judy-4"></div>
      <div class="decoration-dots">
        <div class="dot bg-judy-5"></div>
        <div class="dot bg-judy-6"></div>
        <div class="dot bg-judy-7"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import validator from 'validator'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useQuasar } from 'quasar'
import userService from 'src/services/user'

const $q = useQuasar()
const props = defineProps(['toggleRegister'])

// 控制密碼顯示
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const acceptTerms = ref(false)

// 建立 vee-validate 的表單
const form = useForm({
  validationSchema: yup.object({
    account: yup
      .string()
      .required('帳號是必填的')
      .min(4, '帳號至少需要 4 個字元')
      .max(20, '帳號最多只能有 20 個字元')
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
      .oneOf([yup.ref('password')], '密碼和確認密碼必須相同'),
  }),
})

// 建立 vee-validate 的表單欄位
const account = useField('account')
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('confirmPassword')

// 密碼強度計算
const passwordStrength = computed(() => {
  const pwd = password.value.value
  if (!pwd) return 0

  let score = 0
  if (pwd.length >= 8) score += 1
  if (/[a-z]/.test(pwd)) score += 1
  if (/[A-Z]/.test(pwd)) score += 1
  if (/[0-9]/.test(pwd)) score += 1
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1

  return Math.min(score, 4)
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  switch (strength) {
    case 0:
    case 1:
      return '弱'
    case 2:
      return '中等'
    case 3:
      return '強'
    case 4:
      return '非常強'
    default:
      return ''
  }
})

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value
  switch (strength) {
    case 0:
    case 1:
      return 'strength-weak'
    case 2:
      return 'strength-medium'
    case 3:
      return 'strength-strong'
    case 4:
      return 'strength-very-strong'
    default:
      return ''
  }
})

const passwordStrengthWidth = computed(() => {
  return `${(passwordStrength.value / 4) * 100}%`
})

// 表單送出處理
const submit = form.handleSubmit(async (values) => {
  if (!acceptTerms.value) {
    $q.notify({
      type: 'warning',
      message: '請先同意使用條款和隱私政策',
      timeout: 2000,
      position: 'top',
    })
    return
  }

  try {
    await userService.create({
      account: values.account,
      email: values.email,
      password: values.password,
    })

    $q.notify({
      type: 'positive',
      message: '註冊成功！請登入',
      timeout: 2000,
      position: 'top',
    })

    props.toggleRegister()
  } catch (error) {
    console.error('Register error:', error)

    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || '註冊失敗，請稍後再試！',
      timeout: 3000,
      position: 'top',
    })
  }
})

// 顯示使用條款
const showTerms = () => {
  $q.notify({
    type: 'info',
    message: '使用條款頁面開發中',
    timeout: 2000,
    position: 'top',
  })
}

// 顯示隱私政策
const showPrivacy = () => {
  $q.notify({
    type: 'info',
    message: '隱私政策頁面開發中',
    timeout: 2000,
    position: 'top',
  })
}
</script>

<style scoped>
.register-form {
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
  /* border-color: rgba(217, 164, 65, 0.6) !important; */
  box-shadow: 0 0 0 3px rgba(217, 164, 65, 0.1);
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
  color: rgba(217, 164, 65, 0.8);
}

/* 計數器樣式 */
.custom-input :deep(.q-field__counter) {
  color: rgba(170, 170, 170, 0.8);
  font-size: 0.75rem;
}

/* 密碼強度指示器 */
.password-strength {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.strength-label {
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background-color: rgba(170, 170, 170, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-weak .strength-fill {
  background-color: rgba(198, 40, 40, 0.8);
}
.strength-medium .strength-fill {
  background-color: rgba(217, 164, 65, 0.8);
}
.strength-strong .strength-fill {
  background-color: rgba(122, 184, 163, 0.8);
}
.strength-very-strong .strength-fill {
  background-color: rgba(58, 78, 61, 0.8);
}

.strength-text {
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.strength-weak {
  color: rgba(198, 40, 40, 0.8);
}
.strength-medium {
  color: rgba(217, 164, 65, 0.8);
}
.strength-strong {
  color: rgba(122, 184, 163, 0.8);
}
.strength-very-strong {
  color: rgba(58, 78, 61, 0.8);
}

/* 使用條款區域 */
.terms-section {
  margin: 8px 0;
}

.terms-checkbox :deep(.q-checkbox__label) {
  font-size: 0.85rem;
  line-height: 1.4;
}

.terms-text {
  margin-left: 8px;
}

.terms-link {
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.terms-link:hover {
  text-decoration: underline;
  opacity: 0.8;
}

/* 按鈕群組 */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

.register-btn {
  width: 100%;
  padding: 14px 24px;
  border-radius: 12px;
  min-height: 50px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  box-shadow: 0 4px 16px rgba(217, 164, 65, 0.3);
  transition: all 0.3s ease;
  justify-content: center;
  align-items: center;
}

.register-btn:hover:not(:disabled) {
  background-color: rgba(217, 164, 65, 0.9) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(217, 164, 65, 0.4);
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.register-btn:active {
  transform: translateY(0);
}

.btn-text {
  font-size: 1rem;
  letter-spacing: 0.5px;
}

.cancel-btn {
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cancel-btn:hover {
  background-color: rgba(170, 170, 170, 0.1);
  color: rgba(170, 170, 170, 0.9);
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

.decoration-circle-1 {
  position: absolute;
  top: 10%;
  right: -40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  opacity: 0.05;
}

.decoration-circle-2 {
  position: absolute;
  bottom: 30%;
  left: -50px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.03;
}

.decoration-triangle {
  position: absolute;
  top: 50%;
  right: 10%;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 26px solid rgba(122, 184, 163, 0.1);
  transform: rotate(30deg);
}

.decoration-dots {
  position: absolute;
  bottom: 15%;
  right: 20%;
  display: flex;
  gap: 8px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  opacity: 0.2;
}

/* 載入狀態 */
.register-btn :deep(.q-spinner) {
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
  .register-form {
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

  .register-btn {
    padding: 12px 20px;
    min-height: 46px;
    font-size: 0.95rem;
  }

  .btn-text {
    font-size: 0.95rem;
  }

  .password-strength {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .strength-text {
    text-align: center;
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

.register-form {
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
.input-group:nth-child(3) {
  animation-delay: 0.3s;
}
.input-group:nth-child(4) {
  animation-delay: 0.4s;
}

.password-strength {
  animation: fadeInUp 0.6s ease-out;
  animation-delay: 0.35s;
  animation-fill-mode: both;
}

.terms-section {
  animation: fadeInUp 0.6s ease-out;
  animation-delay: 0.5s;
  animation-fill-mode: both;
}

.button-group {
  animation: fadeInUp 0.6s ease-out;
  animation-delay: 0.6s;
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
.bg-judy-6 {
  background-color: rgba(170, 170, 170, 1);
}
.bg-judy-7 {
  background-color: rgba(58, 78, 61, 1);
}
</style>
