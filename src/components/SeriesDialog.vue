<template>
  <q-dialog v-model="model" persistent>
    <q-card class="q-pa-md" style="min-width: 400px">
      <q-form @submit.prevent="submit">
        <q-card-section>
          <div class="text-h6">{{ props.series ? '編輯系列' : '新增系列' }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model="name.value.value"
            deleteable
            :disable="isSubmitting"
            :error="!!name.errorMessage.value"
            :error-message="name.errorMessage.value"
            label="系列名稱"
            maxlength="10"
            counter
          ></q-input>
          <!-- 代表作品 -->
          <q-btn
            outline
            color="primary"
            label="選擇作品"
            @click="openWorkList"
            :disable="isSubmitting"
          />
          <q-list bordered separator v-if="selectedWorks.length > 0" class="q-pa-sm">
            <q-item v-for="work in selectedWorks" :key="work._id">
              <q-item-section top thumbnail class="q-ml-none">
                <img :src="work.images[0]" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ work.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <!-- 系列描述 -->
          <q-input
            v-model="description.value.value"
            :disable="isSubmitting"
            :error="!!description.errorMessage.value"
            :error-message="description.errorMessage.value"
            label="描述"
            type="textarea"
            outlined
            maxlength="100"
            counter
          >
          </q-input>
          <!-- 顯示封面圖片 -->
          <template v-if="existedCover">
            <div class="image-container" style="position: relative; width: 20%">
              <q-img :src="existedCover" style="width: 100%" :alt="existedCover" />
              <q-btn
                round
                dense
                icon="close"
                color="negative"
                class="delete-btn"
                size="8px"
                @click="selectDeletedImage"
              />
            </div>
          </template>
          <VueFileAgent
            ref="fileAgent"
            v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            :disable="isSubmitting"
            :error-text="{ type: '檔案格式不正確', size: '檔案大小不得超過 5MB' }"
            help-text="選擇或拖拽檔案"
            max-size="5MB"
          />
          <q-toggle
            :label="post.value.value ? '上首頁' : '不上首頁'"
            v-model="post.value.value"
            :disable="isSubmitting"
            :error="!!post.errorMessage.value"
            :error-message="post.errorMessage.value"
          />
          <q-card-actions align="right">
            <q-btn color="secondary" @click="closeList(false)">取消</q-btn>
            <q-btn type="submit" :loading="isSubmitting" color="primary">{{
              props.series ? '更新' : '新增'
            }}</q-btn>
          </q-card-actions>
        </q-card-section>
      </q-form>
    </q-card>
    <!-- <work-list v-model="isShowList" @close="handleListClose" /> -->
  </q-dialog>
</template>
<script setup>
import { ref, watch, useTemplateRef } from 'vue'
import { useQuasar } from 'quasar'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import seriesService from 'src/services/series'

const FOLDERNAME = 'series'

const model = defineModel()

const props = defineProps({
  series: Object,
})

const emit = defineEmits(['close'])

const $q = useQuasar()
const fileAgent = useTemplateRef('fileAgent')

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('系列名稱是必填的').max(10, '作品標題最多只能有 10 個字元'),
    description: yup.string().max(100, '描述最多只能有 100 個字元'),
    post: yup.boolean().required('是否上首頁是必填的'),
  }),
  initialValues: {
    name: '',
    description: '',
    post: false,
  },
})
const name = useField('name')
const description = useField('description')
const post = useField('post')

const works = ref([]) // 陣列存放作品的object id

const fileRecords = ref([])
const rawFileRecords = ref([])

const existedCover = ref('')
const deletedCover = ref('')

const allWorks = ref([]) // 所有作品列表
const workOptions = ref([]) // 從 API 獲取的作品列表
const selectedWorks = ref([]) // 已選中的作品

watch(model, (newValue) => {
  console.log('model變化', newValue)
  // 新增作品
  if (newValue && !props.work) {
    // 清空form表單以外的資料
    works.value = []

    existedCover.value = ''
    deletedCover.value = ''

    // 新增作品時 執行 fetchTags
    // 編輯作品時 留到props.work的監聽去執行fetchTags
    fetchTags()
  }
})

watch(
  () => props.series,
  (editSeries) => {
    // 如果有傳入 series，則填入表單資料
    if (editSeries) {
      name.value.value = editSeries.name
      description.value.value = editSeries.description
      post.value.value = editSeries.post

      // 使用展開運算符複製圖片陣列
      // 這樣可以避免直接修改原始陣列
      existedCover.value = editSeries.cover

      // 清空刪除的圖片
      deletedCover.value = ''

      fetchTags()
    }
  },
)

const submit = handleSubmit(async (values) => {
  // 如果圖片欄位有錯誤，不執行
  if (fileRecords.value[0]?.error) {
    $q.notify({
      type: 'negative',
      message: '請選擇有效的圖片檔案',
    })
    return
  }

  // 圖片數量限制
  if (existedCover.value) {
    $q.dialog({
      title: '錯誤',
      message: `請先刪除原來的封面圖片，才能上傳新圖片`,
    })
    return
  }

  // 送出
  try {
    // 建立 FormData 格式資料
    // fd.append(欄位名稱, 欄位值)
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('works', JSON.stringify(selectedWorks.value)) // 傳送選中的作品
    fd.append('description', values.description)
    fd.append('post', values.post)
    fd.append('folder', FOLDERNAME)
    fd.append('deletedImage', deletedCover.value)

    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    const { data } = await (props.series
      ? seriesService.update(props.series._id, fd)
      : seriesService.create(fd))

    $q.notify({
      type: 'positive',
      message: props.series ? '系列更新成功' : '系列新增成功',
    })

    closeDialog(data.series)
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || '操作失敗，請稍後再試',
    })
  }
})

const closeDialog = (returnedWork) => {
  // 重置表單
  resetForm()

  // 清空圖片欄位
  fileAgent.value.deleteFileRecord()

  // 手動清空檔案列表 (上面的 deleteFileRecord 沒有清空檔案)
  fileRecords.value = []
  rawFileRecords.value = []

  // 關閉對話框
  emit('close', returnedWork)
}

// 選擇刪除圖片
const selectDeletedImage = () => {
  deletedCover.value = existedCover.value
  existedCover.value = ''
}

// 獲取標籤列表
const fetchTags = async () => {
  // // 清空已選擇的標籤
  // selectedTags.value = []
  // tagOptions.value = []
  // allTags.value = []
  // try {
  //   const { data } = await tagService.getAll()
  //   allTags.value = data.tags
  //   console.log('獲取標籤列表')
  //   // 設定標籤選項
  //   tagOptions.value = data.tags.map((tag) => ({
  //     value: tag._id,
  //     label: tag.name,
  //     enable: tag.enable,
  //     color: tag.enable ? 'primary' : 'grey',
  //   }))
  //   // tagOptions.value = [
  //   //   { label: '科技', value: '科技' },
  //   //   { label: '藝術', value: '藝術' },
  //   //   { label: '設計', value: '設計' },
  //   //   { label: '教育', value: '教育' },
  //   //   { label: '其他', value: '其他' },
  //   // ]
  //   // 先刪除tags中 不在tagOptions裡的標籤
  //   // 再將結果設定給selectedTags
  //   // 例如：假設有以下情況
  //   // tags:[{name:'運動', id:'aaa'}, {name:'日本', id:'bbb'}]
  //   // tagOptions:[{ label: '南韓', value: 'bbb' }, { label: '生活', value: 'ccc' }]  (運動已被停用)
  //   // selectedTags.value = ['bbb']（只留下有對應的 id）
  //   //
  //   selectedTags.value = tagOptions.value
  //     .filter((option) => tags.value.some((tag) => tag._id === option.value))
  //     .map((option) => option.value)
  // } catch (error) {
  //   console.error('獲取標籤失敗', error)
  // }
}

// 打開標籤管理對話框
const isShowList = ref(false)

const openWorkList = () => {
  isShowList.value = true
}

const handleListClose = () => {
  isShowList.value = false

  console.log('重新獲取標籤列表')
  fetchTags() // 重新獲取標籤列表
}
</script>

<style scoped>
.image-container {
  position: relative;
}

.delete-btn {
  position: absolute;
  top: -8px;
  right: 0px;
  z-index: 1000; /* 確保按鈕在最上層 */
}
</style>
