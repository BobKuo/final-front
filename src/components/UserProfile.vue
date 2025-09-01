<template>
  <div class="user-profile">
    <!-- 用戶資訊卡片 -->
    <div class="user-info-card bg-judy-1">
      <div class="user-avatar">
        <q-avatar size="60px" class="text-judy-7 bg-judy-3">
          <q-icon name="person" size="28px" />
        </q-avatar>
      </div>
      <div class="user-details">
        <h6 class="user-name text-judy-7">{{ userStore.account }}</h6>
        <q-chip
          :color="userStore.role === 'admin' ? 'judy-5' : 'judy-4'"
          text-color="white"
          size="sm"
          class="user-role-chip"
        >
          {{ userStore.role === 'user' ? '會員' : '管理員' }}
        </q-chip>
      </div>
    </div>

    <!-- 功能選單 -->
    <div class="menu-section">
      <h6 class="section-title text-judy-7">功能選單</h6>

      <!-- 一般用戶功能 -->
      <div class="menu-category">
        <q-btn
          outline
          no-caps
          class="menu-btn bg-judy-2 text-white"
          :to="userStore.role === 'user' ? '/orders' : '/admin/orders'"
          icon="receipt_long"
        >
          <span>{{ userStore.role === 'user' ? '我的訂單' : '管理訂單' }}</span>
        </q-btn>

        <q-btn
          v-if="userStore.role === 'user'"
          outline
          no-caps
          class="menu-btn bg-judy-3 text-white"
          to="/cart"
          icon="shopping_cart"
        >
          <span>購物車</span>
        </q-btn>

        <q-btn
          v-if="userStore.role === 'user'"
          outline
          no-caps
          class="menu-btn bg-judy-4 text-white"
          to="/favorites"
          icon="favorite"
        >
          <span>我的收藏</span>
        </q-btn>
      </div>

      <!-- 管理員功能 -->
      <div v-if="userStore.role === 'admin'" class="menu-category admin-section">
        <div class="category-label text-judy-6">管理功能</div>

        <q-btn
          outline
          no-caps
          class="menu-btn bg-judy-5 text-white"
          to="/admin/works"
          icon="palette"
        >
          <span>管理作品</span>
        </q-btn>

        <q-btn
          outline
          no-caps
          class="menu-btn bg-judy-6 text-white"
          to="/admin/series"
          icon="collections"
        >
          <span>管理系列</span>
        </q-btn>

        <q-btn
          outline
          no-caps
          class="menu-btn bg-judy-7 text-white"
          to="/admin/products"
          icon="inventory"
        >
          <span>管理產品</span>
        </q-btn>
      </div>
    </div>

    <!-- 登出按鈕 -->
    <div class="logout-section">
      <q-btn
        @click="logout"
        outline
        no-caps
        class="logout-btn"
        color="negative"
        icon="logout"
        label="登出"
      />
    </div>
  </div>
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
      timeout: 2000,
      position: 'top',
    })

    // 收起側邊欄
    emit('closeDrawer')

    // 登出成功後，導向到首頁
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)

    $q.notify({
      type: 'negative',
      message: '登出失敗，請稍後再試',
      timeout: 2000,
      position: 'top',
    })
  }
}
</script>

<style scoped>
.user-profile {
  padding: 20px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 用戶資訊卡片 */
.user-info-card {
  padding: 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(235, 140, 111, 0.2);
}

.user-avatar {
  flex-shrink: 0;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  margin: 0 0 8px 0;
  font-weight: 600;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-role-chip {
  margin: 0;
  font-weight: 500;
  font-size: 0.75rem;
}

/* 功能選單 */
.menu-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  margin: 0 0 8px 0;
  font-weight: 600;
  font-size: 1rem;
  padding-left: 4px;
}

.menu-category {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.admin-section {
  padding-top: 16px;
  border-top: 1px solid rgba(170, 170, 170, 0.3);
}

.category-label {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
  padding-left: 4px;
  opacity: 0.8;
}

.menu-btn {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  justify-content: flex-start;
  text-align: left;
  min-height: 48px;
  border: none !important;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.menu-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.menu-btn .q-icon {
  margin-right: 12px;
  font-size: 20px;
}

.menu-btn span {
  font-weight: 500;
  font-size: 0.95rem;
}

/* 登出區域 */
.logout-section {
  padding-top: 16px;
  border-top: 1px solid rgba(170, 170, 170, 0.3);
}

.logout-btn {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  min-height: 48px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: rgba(198, 40, 40, 0.1);
}

/* 響應式設計 */
@media (max-width: 480px) {
  .user-profile {
    padding: 16px;
    gap: 20px;
  }

  .user-info-card {
    padding: 16px;
    gap: 12px;
  }

  .user-name {
    font-size: 1rem;
  }

  .menu-btn {
    padding: 10px 14px;
    min-height: 44px;
  }

  .menu-btn span {
    font-size: 0.9rem;
  }
}

/* Judy 顏色系統增強 */
.bg-judy-2:hover {
  background-color: rgba(235, 140, 111, 0.9) !important;
}

.bg-judy-3:hover {
  background-color: rgba(154, 198, 219, 0.9) !important;
}

.bg-judy-4:hover {
  background-color: rgba(122, 184, 163, 0.9) !important;
}

.bg-judy-5:hover {
  background-color: rgba(217, 164, 65, 0.9) !important;
}

.bg-judy-6:hover {
  background-color: rgba(170, 170, 170, 0.9) !important;
}

.bg-judy-7:hover {
  background-color: rgba(58, 78, 61, 0.9) !important;
}
</style>
