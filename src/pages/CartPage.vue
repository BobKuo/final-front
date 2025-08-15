<template>
  <q-page class="flex flex-center">
    <q-list bordered padding separator class="shadow-2" style="width: 80%">
      <q-item-label header>購物車</q-item-label>
      <q-separator></q-separator>

      <!-- 商品項目 -->
      <template v-for="item in cart" :key="item._id">
        <q-item>
          <q-item-section top thumbnail class="q-ml-none" style="width: 200px; height: 100px">
            <img
              :src="item.product.images[0]"
              style="object-fit: contain; width: 100%; height: 100%"
            />
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
              v-model.number="item.quantity"
              type="number"
              input-class="text-center"
              :min="1"
              outlined
              square
            />
            <div class="row q-mt-sm">
              <q-btn
                icon="favorite"
                color="red"
                outline
                dense
                label="移入"
                @click="updateCart(item.quantity + 1, item, cart.indexOf(item))"
              />
              <q-btn
                icon="delete"
                color="secondary"
                outline
                dense
                label="刪除"
                @click="updateCart(0, item, cart.indexOf(item))"
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
          <q-item-label class="q-ml-md">總計</q-item-label>
          <q-item-label class="text-center">${{ totalPrice }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-btn
            :disabled="checkoutDisable"
            @click="checkout"
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
