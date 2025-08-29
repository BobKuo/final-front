<template>
  <q-page class="flex flex-center">
    <div style="overflow-x: auto; max-width: 100%">
      <q-table
        separator="cell"
        :rows="filteredSeries"
        :columns="columns"
        row-key="id"
        class="q-table--dense q-mx-lg"
        v-model:pagination="pagination"
        style="width: 95vw; height: 90vh"
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
        <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn flat icon="edit" @click="openDialog(props.row)" />
          </q-td>
        </template>
        <template #body-cell-post="props">
          <q-td :props="props">
            <template v-if="props.row.post">
              <q-icon name="check" size="xs" color="green" />
            </template>
          </q-td>
        </template>
        <template #body-cell-cover="props">
          <q-td :props="props">
            <div v-if="props.row.cover" style="display: flex; align-items: center; gap: 8px">
              <!-- 顯示系列封面 -->
              <q-img
                :src="props.row.cover"
                style="width: 100%; height: 100%"
                class="q-ma-sm"
                :alt="props.row.name"
                fit="contain"
              />
            </div>
          </q-td>
        </template>
        <template #body-cell-works="props">
          <q-td :props="props">
            <div v-if="props.row.works.length > 0" class="row q-gutter-sm wrap">
              <template v-for="work in props.row.works" :key="work._id">
                <div style="width: 45%">
                  <q-img
                    :src="work.images[0]"
                    :alt="work.name"
                    fit="contain"
                    style="border: 1px solid gray"
                  />
                  <div
                    class="text-overline text-center"
                    style="overflow-y: auto; white-space: pre-line"
                  >
                    {{ work.name }}
                  </div>
                </div>
              </template>
            </div>
          </q-td>
        </template>
        <template #body-cell-description="props">
          <q-td :props="props">
            <template v-if="props.row.description">
              <div style="overflow-y: auto; white-space: pre-line">
                {{ props.row.description }}
              </div>
            </template>
          </q-td>
        </template>
        <template #body-cell-createdAt="props">
          <q-td :props="props" style="white-space: normal">
            {{ new Date(props.row.createdAt).toLocaleString() }}
          </q-td>
        </template>

        <template #body-cell-updatedAt="props">
          <q-td :props="props" style="white-space: normal">
            {{ new Date(props.row.updatedAt).toLocaleString() }}
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
  { name: 'action', label: '操作', field: 'action', align: 'center', style: 'width: 3%' },
  { name: 'post', label: '上首頁', field: 'post', align: 'center', style: 'width: 2%' },
  {
    name: 'name',
    label: '名稱',
    field: 'name',
    align: 'center',
    sortable: true,
    style: 'width: 5%',
  },
  {
    name: 'cover',
    label: '封面',
    field: 'cover',
    align: 'center',
    sortable: false,
    style: 'width: 40%',
  },
  {
    name: 'works',
    label: '代表作品',
    field: (item) => item.works.join(', '),
    align: 'left',
    style: 'width: 20%',
  },
  { name: 'description', label: '描述', field: 'description', align: 'left', style: 'width: 20%' },
  {
    name: 'createdAt',
    label: '建立日期',
    field: (item) => new Date(item.createdAt).toLocaleString(),
    sortable: true,
    style: 'width: 5%',
  },
  {
    name: 'updatedAt',
    label: '更新日期',
    field: (item) => new Date(item.updatedAt).toLocaleString(),
    sortable: true,
    style: 'width: 5%',
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
  // 更新或新增系列後，更新列表
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
