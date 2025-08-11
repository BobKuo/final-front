<template>
  <q-page class="flex flex-center q-ma-xl column">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4">
        <q-input v-model="search" deleteable label="搜尋商品" />
      </div>
      <div class="col-12 col col-md-6 col-lg-4">
        <q-chip
          v-for="(selected, category) in categoryOptions"
          :key="category"
          :label="category"
          outline
          color="primary"
          v-model:selected="categoryOptions[category]"
        />
      </div>
    </div>
    <!-- <div class="q-gutter-xs col-12 col-md-6">
    </div> -->
    <!-- <div class="col-12 col-md-6">
    </div> -->
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm"
        v-for="product in currentPageProducts"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </div>
    </div>

    <!-- <div class="q-mt-sm">Your pick: {{ selectedCategories }}</div> -->
  </q-page>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useQuasar } from 'quasar'
import productService from 'src/services/product'
import ProductCard from 'src/components/ProductCard.vue'

const $q = useQuasar()
const products = ref([])
const search = ref('')

const categoryOptions = reactive({
  電子產品: false,
  服裝: false,
  家居用品: false,
  書籍: false,
  玩具: false,
  食品: false,
  其他: false,
})

const selectedCategories = computed(() => {
  return Object.keys(categoryOptions).filter((category) => categoryOptions[category])
})

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    // 搜尋商品名稱
    const nameMatch =
      !search.value || product.name.toLowerCase().includes(search.value.toLowerCase())

    // 篩選類別
    const categoryMatch =
      selectedCategories.value.length === 0 || selectedCategories.value.includes(product.category)
    return nameMatch && categoryMatch
  })
})

const ITEMS_PER_PAGE = 12
const currentPage = ref(1)
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / ITEMS_PER_PAGE)
})
const currentPageProducts = computed(() => {
  // 一頁 12 筆
  // 第 1 頁 = 0 ~ 11 = .slice(0, 12)
  // 第 2 頁 = 12 ~ 23 = .slice(12, 24)
  // 第 3 頁 = 24 ~ 35 = .slice(24, 36)
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return filteredProducts.value.slice(start, end)
})

const getProducts = async () => {
  try {
    const { data } = await productService.get()
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
