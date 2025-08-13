<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ product.name }}</div>
        <div class="text-subtitle2">{{ product.category }}</div>
        <div class="text-h6">{{ product.price }}</div>
        <div class="text-body1">{{ product.description }}</div>
      </q-card-section>
      <q-card-section>
        <q-btn @click="addToCart(product)">加入購物車</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import router from 'src/router'
import productService from 'src/services/product'

const route = useRoute()
const $q = useQuasar()

const product = ref({
  name: '',
  price: 0,
  description: '',
  category: '',
  sell: true,
  images: [],
})
const getProduct = async () => {
  try {
    const { data } = await productService.getId(route.params.id)
    product.value.name = data.product.name
    product.value.price = data.product.price
    product.value.description = data.product.description
    product.value.category = data.product.category
    product.value.sell = data.product.sell
    product.value.images = data.product.images

    document.title = `${data.product.name} | JUDY WANG ART`
  } catch (error) {
    console.error('Error fetching products:', error)
    $q.notify({
      type: 'negative',
      message: '無法載入商品資料',
    })

    router.push('/')
  }
}
getProduct()
</script>
