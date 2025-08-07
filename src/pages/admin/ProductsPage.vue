<template>
  <q-page class="flex flex-center">
    <div style="overflow-x: auto; max-width: 100%">
      <q-table
        separator="cell"
        :rows="filteredProducts"
        :columns="columns"
        row-key="id"
        class="q-table--dense"
        :pagination="{ rowsPerPage: 10 }"
      >
        <template #top>
          <q-toolbar>
            <q-btn flat icon="add" label="新增商品" @click="openDialog(null)" class="q-mr-sm" />
            <q-space />
            <q-input v-model="searchName" dense outlined clearable placeholder="搜尋名稱">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-select
              v-model="searchCategory"
              dense
              outlined
              clearable
              placeholder="搜尋分類"
              :options="categoryOptions"
              emit-value
              map-options
            >
              <template v-slot:prepend>
                <q-icon name="filter_list" />
              </template>
            </q-select>
          </q-toolbar>
        </template>

        <template #body-cell-images="props">
          <q-td :props="props">
            <div style="display: flex; align-items: center; gap: 8px">
              <!-- 顯示第一張圖片 -->
              <q-img
                v-if="props.row.images && props.row.images.length > 0"
                :src="props.row.images[0]"
                style="width: 100px; height: 100px"
                class="q-ma-sm"
                :alt="props.row.name"
              />
              <!-- 如果有多張圖片，顯示展開按鈕 -->
              <q-btn
                v-if="props.row.images.length > 1"
                flat
                dense
                label="更多"
                @click="showAllImages(props.row.images)"
              />
            </div>
          </q-td>
        </template>
        <template #body-cell-sell="props">
          <q-td :props="props">
            <q-icon v-if="props.row.sell" name="check" color="green" />
          </q-td>
        </template>
        <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn flat icon="edit" @click="openDialog(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <product-dialog v-model="isShowDialog" :product="dialogProduct" @close="closeDialog" />
  </q-page>
</template>
<script setup>
import { computed, ref } from 'vue'
import productService from 'src/services/product'
import { useQuasar } from 'quasar'
import ProductDialog from 'src/components/ProductDialog.vue'

const products = ref([])
const searchName = ref('')
const searchCategory = ref(null)

// 從 products 中提取所有分類，並去重複
const categoryOptions = computed(() => {
  const categories = [...new Set(products.value.map((product) => product.category))]
  // 將分類轉換為 Quasar 下拉選單需要的格式
  return categories.map((category) => ({
    label: category, // 顯示的名稱
    value: category, // 對應的值
  }))
})
// 搜尋功能
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const nameMatch =
      !searchName.value || product.name.toLowerCase().includes(searchName.value.toLowerCase())
    const categoryMatch =
      !searchCategory.value ||
      product.category.toLowerCase().includes(searchCategory.value.toLowerCase())
    return nameMatch && categoryMatch
  })
})

const $q = useQuasar()

// ************************
// *       表格顯示        *
// ************************

const columns = [
  {
    name: '_id',
    label: 'ID',
    field: '_id',
  },
  { name: 'images', label: '圖片', field: 'images', align: 'center', sortable: false },
  { name: 'name', label: '名稱', field: 'name', sortable: true },
  { name: 'category', label: '分類', field: 'category' },
  {
    name: 'price',
    label: '價格',
    field: 'price',
    align: 'right',
    sortable: true,
  },
  { name: 'description', label: '描述', field: 'description' },
  { name: 'sell', label: '上架', field: 'sell' },
  {
    name: 'createdAt',
    label: '建立日期',
    field: (item) => new Date(item.createdAt).toLocaleString(),
    sortable: true,
  },
  {
    name: 'updatedAt',
    label: '更新日期',
    field: (item) => new Date(item.updatedAt).toLocaleString(),
    sortable: true,
  },
  { name: 'action', label: '操作', field: 'action' },
]

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

// 點擊展開按鈕時，顯示所有圖片
const showAllImages = (images) => {
  console.log('所有圖片:', images)
  $q.dialog({
    title: '所有圖片',
    message: images
      .map((img) => `<img src="${img}" style="width: 100%; margin-bottom: 8px;" />`)
      .join(''),
    html: true,
  })
}

// 打開商品對話框
const isShowDialog = ref(false)
const dialogProduct = ref(null)

const openDialog = (product) => {
  dialogProduct.value = product // 編輯時傳入商品，新增時傳 null
  isShowDialog.value = true
}

const closeDialog = () => {
  isShowDialog.value = false
  dialogProduct.value = null // 重置商品資料
}
</script>
