<template>
  <q-dialog v-model="model" persistent>
    <q-card class="q-pa-md" style="min-width: 400px">
      <q-card-section>
        <div class="row justify-between items-center">
          <div>
            <div class="text-h6">選擇代表作品</div>
            <div class="text-caption text-grey-6">已選擇 {{ selectedWorkIds.length }}/4 張作品</div>
          </div>
          <q-btn
            outline
            dense
            color="negative"
            @click="clearAll"
            :disable="selectedWorkIds.length === 0"
          >
            全部清除
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-list bordered separator>
          <template v-for="work in allWorks" :key="work._id">
            <q-item tag="label" v-ripple>
              <q-item-section class="q-ml-none">
                <q-img :src="work.images[0]" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ work.name }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-checkbox
                  v-model="selectedWorkIds"
                  :val="work._id"
                  :disable="isCheckboxDisabled(work._id)"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="secondary" @click="closeDialog">取消</q-btn>
        <q-btn color="primary" @click="confirmSelection">確定</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import workService from 'src/services/work'

const model = defineModel()

const props = defineProps({
  works: Array,
  seriesId: String,
})

const emit = defineEmits(['close'])

const $q = useQuasar()

const allWorks = ref([])
const selectedWorkIds = ref([])

// 檢查 checkbox 是否應該被禁用
const isCheckboxDisabled = (workId) => {
  // 如果已經選中這個作品，不禁用（允許取消選擇）
  if (selectedWorkIds.value.includes(workId)) {
    return false
  }
  // 如果已經選了4張，禁用其他未選中的 checkbox
  return selectedWorkIds.value.length >= 4
}

// 全部清除
const clearAll = () => {
  selectedWorkIds.value = []
}

// 監聽選擇變化，提供提示
watch(selectedWorkIds, (newValue) => {
  if (newValue.length > 4) {
    // 如果超過4張，自動移除最後一個
    selectedWorkIds.value = newValue.slice(0, 4)
    $q.notify({
      type: 'warning',
      message: '最多只能選擇4張作品',
      timeout: 2000,
    })
  } else if (newValue.length === 4) {
    $q.notify({
      type: 'positive',
      message: '已選擇4張作品',
      timeout: 1500,
    })
  }
})

const getWorkList = async (seriesId) => {
  try {
    console.log('獲取指定系列的作品列表')
    const { data } = await workService.getList(seriesId)
    allWorks.value = data.works
  } catch (error) {
    console.error('Error fetching works:', error)
    $q.notify({
      type: 'negative',
      message: '無法載入作品簡單列表',
    })
  }
}

watch(model, (newValue) => {
  // 對話框開啟
  if (newValue) {
    if (props.works) {
      getWorkList(props.seriesId)

      selectedWorkIds.value = props.works.map((work) => work._id)
    } else {
      getWorkList(null)

      // 清空
      selectedWorkIds.value = []
    }
  }
})

const closeDialog = () => {
  // 關閉對話框
  emit('close')
}

const confirmSelection = () => {
  const selectedWorks = allWorks.value.filter((work) => selectedWorkIds.value.includes(work._id))

  // 關閉對話框
  emit('close', selectedWorks)
}
</script>
