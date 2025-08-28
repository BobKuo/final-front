<template>
  <q-dialog v-model="model" persistent>
    <q-card class="q-pa-md" style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">選擇代表作品</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-list bordered separator>
          <q-item v-for="work in allWorks" :key="work._id" @click="toggleWorkSelection(work)">
            <q-item-section>
              <q-item-label>{{ work.title }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox v-model="selectedWorks" :true-value="work._id" :false-value="null" />
            </q-item-section>
          </q-item>
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
import series from 'src/services/series'

const model = defineModel()

const props = defineProps({
  works: Array,
  seriesId: String,
})

const emit = defineEmits(['close'])

const $q = useQuasar()

const allWorks = ref([])
const selectedWorks = ref([])

const getWorkList = async (id) => {
  try {
    console.log('獲取作品簡單列表')
    const { data } = await workService.getList(id)
    allWorks.value = data.works
  } catch (error) {
    console.error('Error fetching works:', error)
    $q.notify({
      type: 'negative',
      message: '無法載入作品簡單列表',
    })
  }
}

watch(
  () => props.works,
  (editWorks) => {
    if (editWorks) {
      // 當對話框打開時，初始化所有作品和選中的作品
      getWorkList(props.seriesId)
      selectedWorks.value = props.works
    }
  },
  { immediate: true },
)

const toggleWorkSelection = (work) => {
  const index = selectedWorks.value.indexOf(work._id)
  if (index === -1) {
    selectedWorks.value.push(work._id)
  } else {
    selectedWorks.value.splice(index, 1)
  }
}

const closeDialog = (returnedWorks) => {
  // 清空選中的作品
  selectedWorks.value = []

  // 關閉對話框
  emit('close', returnedWorks)
}

const confirmSelection = () => {
  closeDialog(selectedWorks.value)
}
</script>
