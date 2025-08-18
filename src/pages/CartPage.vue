<template>
  <q-page class="flex flex-center">
    <q-list bordered padding separator class="shadow-2" style="width: 80%">
      <q-item-label header>購物車</q-item-label>
      <q-separator></q-separator>

      <!-- 商品項目 -->
      <template v-for="(item, i) in cart" :key="item._id">
        <q-item :active="!item.product.sell" active-class="bg-grey-3">
          <q-item-section top class="q-ml-none" style="width: 200px; height: 150px">
            <q-img
              :src="item.product.images[0]"
              fit="contain"
              style="cursor: pointer"
              @click="$router.push('/product/' + item.product._id)"
            >
              <div v-if="!item.product.sell" class="absolute-bottom text-subtitle1 text-center">
                已下架
              </div>
            </q-img>
          </q-item-section>

          <q-separator vertical />

          <q-item-section>
            <q-item-label class="q-ml-md">{{ item.product.name }}</q-item-label>
            <q-item-label caption class="text-center">價格: ${{ item.product.price }}</q-item-label>
          </q-item-section>

          <q-separator vertical />

          <q-item-section style="height: 100px">
            <q-item-label caption style="overflow: auto; white-space: pre-line">{{
              item.product.description
            }}</q-item-label>
          </q-item-section>

          <q-separator vertical />

          <q-item-section side>
            <q-input
              :model-value="item.quantity"
              type="number"
              input-class="text-center"
              :min="0"
              :disable="!item.product.sell"
              outlined
              square
              @update:model-value="updateCart($event, item, i)"
            />
            <div class="row q-mt-sm">
              <q-btn icon="favorite" color="red" outline dense label="移入" />
              <q-btn
                icon="delete"
                color="secondary"
                outline
                dense
                label="刪除"
                @click="updateCart(0, item, i)"
                class="q-ml-md"
              />
            </div>
            <q-item-label class="q-mt-md"
              >項目總價: ${{ item.product.price * item.quantity }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </template>

      <!-- 總計 -->
      <q-item>
        <q-item-section>
          <q-item-label class="text-right">總計</q-item-label>
          <q-item-label class="text-right">${{ totalPrice }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            @click="checkout"
            :disable="checkoutDisable"
            label="結帳"
            color="primary"
            class="full-width"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import orderService from 'src/services/order'
import userService from 'src/services/user'
import { useUserStore } from 'src/stores/user'
// import router from 'src/router'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const userStore = useUserStore()
const router = useRouter()

const cart = ref([])

const getCart = async () => {
  try {
    const { data } = await userService.getCart()
    cart.value = data.result
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: '無法獲取購物車資料',
    })
  }
}
getCart()

const updateCart = async (newValue, item, i) => {
  if (newValue === '') {
    return
  }

  try {
    const { data } = await userService.cart({
      product: item.product._id,
      quantity: newValue - item.quantity,
    })
    item.quantity = newValue
    if (newValue <= 0) {
      cart.value.splice(i, 1)
    }
    userStore.cartTotal = data.result
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: '更新購物車失敗',
    })
  }
}

const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
})

const checkoutDisable = computed(() => {
  return cart.value.length === 0
})

const checkout = async () => {
  if (cart.value.some((item) => !item.product.sell)) {
    $q.notify({
      type: 'negative',
      message: '購物車中有已下架商品，無法結帳',
    })
    return
  }

  try {
    await orderService.create()

    userStore.cartTotal = 0
    cart.value = []

    $q.notify({
      spinner: true,
      type: 'positive',
      timeout: 1500,
      message: '結帳成功！ 將跳轉到訂單頁面',
    })

    setTimeout(() => {
      router.push('/orders')
    }, 3000)
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: '結帳失敗，請稍後再試！',
    })
  }
}
</script>
