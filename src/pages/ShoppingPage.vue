<template>
  <q-page class="flex q-ma-xl column">
    <div class="row full-width q-mb-lg">
      <div class="col-12">
        <q-input
          v-model="search"
          deleteable
          label="搜尋商品"
          @update:model-value="currentPage = 1"
        />
      </div>
      <div class="col-12">
        <div class="row justify-between items-center">
          <!-- 左側的 q-chip -->
          <div class="col-auto">
            <q-chip
              v-for="(selected, category) in categoryOptions"
              :key="category"
              :label="category"
              outline
              color="primary"
              v-model:selected="categoryOptions[category]"
              @update:selected="
                (selected) => {
                  currentPage = 1
                }
              "
            />
          </div>
          <!-- 右側的 q-btn -->
          <div class="col-auto">
            <q-btn
              color="primary"
              flat
              icon-right="arrow_drop_down"
              :ripple="false"
              class="q-ml-sm"
            >
              {{ sortOptions[selectedSort].text }}
              <q-menu transition-show="jump-down" transition-hide="jump-up">
                <q-list style="min-width: 100px">
                  <q-item
                    v-for="(option, index) in sortOptions"
                    :key="index"
                    clickable
                    v-close-popup
                    @click="selectSortOption(index)"
                  >
                    <q-item-section>{{ option.text }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm"
        v-for="product in currentPageProducts"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </div>
    </div>
    <div class="row justify-center bg-grey-2 q-pa-md">
      <q-pagination v-model="currentPage" :max="totalPages" color="primary" boundary-links />
    </div>
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
  return products.value
    .filter((product) => {
      // 搜尋商品名稱
      const nameMatch =
        !search.value || product.name.toLowerCase().includes(search.value.toLowerCase())

      // 篩選類別
      const categoryMatch =
        selectedCategories.value.length === 0 || selectedCategories.value.includes(product.category)
      return nameMatch && categoryMatch
    })
    .sort((a, b) => {
      // .sort()
      // return 0 順序不變
      // return < 0     a 在前
      // return > 0     b 在前
      // return a - b   正序
      // return b - a   倒序
      // 根據選擇的排序選項進行排序
      // sortOptions[selectedSort.value] 會是選到的排序選項
      // { text: '名稱', key: 'name', direction: 1 }
      const sortOption = sortOptions[selectedSort.value]
      // 如果是日期的排序
      if (sortOption.key === 'createdAt' || sortOption.key === 'updatedAt') {
        // 使用 new Date() 轉換日期字串為日期物件，然後進行比較
        return sortOption.direction * (new Date(a[sortOption.key]) - new Date(b[sortOption.key]))
      }
      return sortOption.direction * (a[sortOption.key] > b[sortOption.key] ? 1 : -1)
    })
})

// 排序功能
// 選擇的排序選項索引
const selectedSort = ref(0)
// 排序選項
// text: 顯示的文字
// key: 排序的鍵
// direction: 排序方向，1 為升序，-1 為降序
// 使用 key 和 direction 來排序 products
const sortOptions = [
  { text: '名稱', key: 'name', direction: 1 },
  { text: '價格：低到高', key: 'price', direction: 1 },
  { text: '價格：高到低', key: 'price', direction: -1 },
  { text: '最新商品', key: 'createdAt', direction: -1 },
  { text: '最舊商品', key: 'createdAt', direction: 1 },
]

const selectSortOption = (index) => {
  selectedSort.value = index
  currentPage.value = 1
}

// 分頁相關
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
