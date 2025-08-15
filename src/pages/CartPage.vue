<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-12">
          <div class="text-h5 text-center">購物車</div>
        </div>
        <div class="col-12">
          <q-list bordered separator>
            <q-item v-for="item in cart" :key="item._id">
              <q-item-section>{{ item.product.name }}</q-item-section>
              <q-item-section>{{ item.quantity }}</q-item-section>
              <q-item-section>{{ item.product.price * item.quantity }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import orderService from 'src/services/order'
import userService from 'src/services/user'
import { useUserStore } from 'src/stores/user'
import router from 'src/router'

const $q = useQuasar
const user = useUserStore()

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
  try {
    const { data } = await userService.cart({
      product: item.product._id,
      quantity: newValue - item.quantity,
    })
    item.quantity = newValue
    if (newValue <= 0) {
      cart.value.splice(i, 1)
    }
    user.cartTotal = data.result
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
  return cart.value.length === 0 || cart.value.some((item) => !item.product.sell)
})

const checkout = async () => {
  try {
    await orderService.create()
    user.cartTotal = 0
    router.push('/orders')
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: '結帳失敗，請稍後再試！',
    })
  }
}
</script>
