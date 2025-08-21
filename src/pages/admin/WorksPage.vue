<template>
  <q-page class="flex flex-center">
    <div style="overflow-x: auto; max-width: 100%">
      <q-table
        separator="cell"
        :rows="filteredWorks"
        :columns="columns"
        row-key="id"
        class="q-table--dense"
        :pagination="{ rowsPerPage: 5 }"
      >
        <template #top>
          <q-toolbar>
            <q-btn flat icon="add" label="新增作品" @click="openDialog(null)" class="q-mr-sm" />
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
                outline
                dense
                label="更多"
                @click="showAllImages(props.row.images)"
              />
            </div>
          </q-td>
        </template>
        <template #body-cell-tags="props">
          <q-td :props="props">
            <q-badge
              v-for="(tag, idx) in props.row.tags"
              :key="idx"
              color="primary"
              class="q-mr-xs"
              outline
            >
              {{ tag }}
            </q-badge>
          </q-td>
        </template>
        <template #body-cell-content="props">
          <q-td :props="props">
            <div style="width: 200px; height: 100px; overflow-y: auto; white-space: pre-line">
              {{ props.row.content }}
            </div>
          </q-td>
        </template>
        <template #body-cell-post="props">
          <q-td :props="props">
            <q-icon v-if="props.row.post" name="check" color="green" />
          </q-td>
        </template>
        <template #body-cell-statistics="props">
          <q-td :props="props">
            <div>
              <div>瀏覽次數: {{ props.row.statistics.views }}</div>
              <div>喜歡人數: {{ props.row.statistics.likes.length }}</div>
            </div>
          </q-td>
        </template>
        <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn flat icon="edit" @click="openDialog(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <work-dialog v-model="isShowDialog" :work="dialogWork" @close="handleDialogClose" />
  </q-page>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import workService from 'src/services/work'
import workDialog from 'src/components/WorkDialog.vue'

const works = ref([])
const searchName = ref('')
const searchCategory = ref(null)

// 從 works 中提取所有分類，並去重複
const categoryOptions = computed(() => {
  const categories = [...new Set(works.value.map((work) => work.category))]
  // 將分類轉換為 Quasar 下拉選單需要的格式
  return categories.map((category) => ({
    label: category, // 顯示的名稱
    value: category, // 對應的值
  }))
})
// 搜尋功能
const filteredWorks = computed(() => {
  return works.value.filter((work) => {
    const nameMatch =
      !searchName.value || work.name.toLowerCase().includes(searchName.value.toLowerCase())
    const categoryMatch =
      !searchCategory.value ||
      work.category.toLowerCase().includes(searchCategory.value.toLowerCase())
    return nameMatch && categoryMatch
  })
})

const $q = useQuasar()

// ************************
// *       表格顯示        *
// ************************

const columns = [
  { name: 'action', label: '操作', field: 'action' },
  { name: 'post', label: '發佈', field: 'post' },
  { name: 'name', label: '名稱', field: 'name', sortable: true },
  { name: 'images', label: '圖片', field: 'images', align: 'center', sortable: false },
  { name: 'category', label: '分類', field: 'category' },
  { name: 'tags', label: '標籤', field: (item) => item.tags.join(', ') },
  { name: 'content', label: '內容', field: 'content' },
  { name: 'statistics', label: '統計', field: 'statistics' },
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
]

const getWorks = async () => {
  try {
    console.log('獲取作品列表')
    const { data } = await workService.getAll()
    works.value = data.works
  } catch (error) {
    console.error('Error fetching works:', error)
    $q.notify({
      type: 'negative',
      message: '無法載入作品資料',
    })
  }
}
getWorks()

// 點擊展開按鈕時，顯示所有圖片
const showAllImages = (images) => {
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
const dialogWork = ref(null)

const openDialog = (work) => {
  dialogWork.value = work // 編輯時傳入作品，新增時傳 null
  isShowDialog.value = true
}

const handleDialogClose = (returnedWork) => {
  if (returnedWork) {
    const index = works.value.findIndex((w) => w._id === returnedWork._id)
    if (index !== -1) {
      // 更新
      works.value[index] = returnedWork
    } else {
      // 新增
      works.value.push(returnedWork)
    }
  }

  isShowDialog.value = false
  dialogWork.value = null
}
</script>
