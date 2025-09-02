import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const account = ref('')
    const cartTotal = ref(0)
    const role = ref('user')
    const token = ref('')
    const favorites = ref([])
    const goods = ref([])

    const isLoggedIn = computed(() => token.value.length > 0)
    const isAdmin = computed(() => role.value === 'admin')

    const setUser = (data) => {
      account.value = data.account
      cartTotal.value = data.cartTotal
      role.value = data.role
      favorites.value = data.favorites || []
      goods.value = data.goods || []

      // 重新整理頁面時，用 token 取得使用者資料
      // 這個回應不包含 token
      if (data.token) {
        token.value = data.token
      }
    }

    const clearUser = () => {
      account.value = ''
      cartTotal.value = 0
      role.value = 'user'
      token.value = ''
      favorites.value = []
      goods.value = []
    }

    return {
      account,
      cartTotal,
      role,
      token,
      isLoggedIn,
      isAdmin,
      setUser,
      clearUser,
      favorites,
      goods,
    }
  },
  {
    persist: {
      key: 'shop-user',
      pick: ['token'],
    },
  },
)
