<template>
  <q-page>
    <h1>商品管理</h1>
  </q-page>
</template>
<script setup>
import { ref, useTemplateRef } from 'vue'
import productService from 'src/services/product'
import { useQuasar } from 'quasar'

const products = ref([])
const $q = useQuasar()

const getProducts = async () => {
  try {
    const { data } = await productService.getAll()
    products.value = data.products
  } catch (error) {
    console.error('Error fetching products:', error)
    $q.notify({
      type: 'negative',
      message: '無法載入商品資料',
    })
  }
}
getProducts()
</script>
