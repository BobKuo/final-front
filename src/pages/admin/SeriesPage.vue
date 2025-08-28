<template>
  <q-page class="flex flex-center">
    <div style="overflow-x: auto; max-width: 100%">
      <q-table
        separator="cell"
        :rows="filteredSeries"
        :columns="columns"
        row-key="id"
        class="q-table--dense"
        v-model:pagination="pagination"
      >
        <template #top>
          <q-toolbar>
            <q-btn flat icon="add" label="新增系列" @click="openDialog(null)" class="q-mr-sm" />
            <q-space />
            <q-input v-model="searchName" dense outlined clearable placeholder="搜尋名稱">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-toolbar>
        </template>
        <template #body-cell-cover="props">
          <q-td :props="props">
            <div style="display: flex; align-items: center; gap: 8px">
              <!-- 顯示第一張圖片 -->
              <q-img
                :src="props.row.cover"
                style="width: 100px; height: 100px"
                class="q-ma-sm"
                :alt="props.row.name"
              />
            </div>
          </q-td>
        </template>
        <template #body-cell-works="props">
          <q-td :props="props">
            <div v-if="props.row.works.length > 0" class="row q-gutter-xs" style="width: 150px">
              <template v-for="work in props.row.works" :key="work._id">
                <q-badge v-if="work.enable" color="primary" class="q-mr-xs">{{
                  work.name
                }}</q-badge>
                <q-badge
                  v-else
                  color="grey"
                  style="text-decoration: line-through"
                  class="q-mr-xs"
                  outline
                >
                  {{ work.name }}</q-badge
                >
              </template>
            </div>
          </q-td>
        </template>
        <template #body-cell-description="props">
          <q-td :props="props">
            <div style="width: 200px; height: 100px; overflow-y: auto; white-space: pre-line">
              {{ props.row.description }}
            </div>
          </q-td>
        </template>
        <template #body-cell-post="props">
          <q-td :props="props">
            <q-icon v-if="props.row.post" name="check" size="md" color="green" />
          </q-td>
        </template>
        <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn flat icon="edit" @click="openDialog(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <series-dialog v-model="isShowDialog" :series="dialogSeries" @close="handleDialogClose" />
  </q-page>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import seriesService from 'src/services/series'

import seriesDialog from 'src/components/SeriesDialog.vue'

const series = ref([])
const searchName = ref('')

// 搜尋功能
const filteredSeries = computed(() => {
  return series.value.filter((series) => {
    const nameMatch =
      !searchName.value || series.name.toLowerCase().includes(searchName.value.toLowerCase())

    return nameMatch
  })
})

// 加入分頁控制
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
})

// 監聽搜尋條件變化，重置到第一頁
watch(searchName, () => {
  pagination.value.page = 1
})

const $q = useQuasar()

// ************************
// *       表格顯示        *
// ************************

const columns = [
  { name: 'action', label: '操作', field: 'action' },
  { name: 'post', label: '上首頁', field: 'post' },
  { name: 'name', label: '名稱', field: 'name', align: 'left', sortable: true },
  { name: 'cover', label: '封面', field: 'cover', align: 'center', sortable: false },
  { name: 'works', label: '代表作品', field: (item) => item.works.join(', '), align: 'left' },
  { name: 'description', label: '描述', field: 'description' },
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

const getSeries = async () => {
  try {
    console.log('獲取系列列表')
    const { data } = await seriesService.getAll()
    series.value = data.series
  } catch (error) {
    console.error('Error fetching series:', error)
    $q.notify({
      type: 'negative',
      message: '無法載入系列資料',
    })
  }
}
getSeries()

// 打開系列對話框
const isShowDialog = ref(false)
const dialogSeries = ref(null)

const openDialog = (series) => {
  dialogSeries.value = series // 編輯時傳入系列，新增時傳 null
  isShowDialog.value = true
}

const handleDialogClose = (returnedSeries) => {
  if (returnedSeries) {
    const index = series.value.findIndex((s) => s._id === returnedSeries._id)
    if (index !== -1) {
      // 更新
      series.value[index] = returnedSeries
    } else {
      // 新增
      series.value.push(returnedSeries)
    }
  }

  isShowDialog.value = false
  dialogSeries.value = null
}
</script>
