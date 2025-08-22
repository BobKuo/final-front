<template>
  <q-dialog v-model="model" persistent>
    <q-card class="q-pa-md" style="min-width: 400px">
      <q-form @submit.prevent="submit">
        <q-card-section>
          <div class="text-h6">{{ props.work ? '編輯作品' : '新增作品' }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model="name.value.value"
            deleteable
            :disable="isSubmitting"
            :error="!!name.errorMessage.value"
            :error-message="name.errorMessage.value"
            label="標題"
          ></q-input>
          <q-select
            label="分類"
            v-model="category.value.value"
            :disable="isSubmitting"
            :options="categoryOptions"
            :error="!!category.errorMessage.value"
            :error-message="category.errorMessage.value"
          />

          <div style="border: 1px solid #aaa; border-radius: 4px; padding: 8px">
            <div class="row justify-between">
              <div class="text-subtitle1 text-grey-7">標籤</div>
              <!-- <div>{{ selectedTags }}</div> -->
              <q-btn
                class="q-mb-xs"
                color="primary"
                size="sm"
                dense
                outline
                icon="edit"
                @click="openTagDialog"
              />
            </div>
            <q-option-group
              :options="tagOptions"
              type="checkbox"
              v-model="selectedTags"
              inline
              dense
            >
              <template v-slot:label="opt">
                <span v-if="opt.enable" class="q-mr-xs">{{ opt.label }}</span>
                <span v-else style="text-decoration: line-through" class="text-grey-5 q-mr-xs">{{
                  opt.label
                }}</span>
              </template>
            </q-option-group>
          </div>
          <q-input
            v-model="content.value.value"
            :disable="isSubmitting"
            :error="!!content.errorMessage.value"
            :error-message="content.errorMessage.value"
            label="內容"
            type="textarea"
            outlined
          ></q-input>
          <!-- 顯示作品圖片 -->
          <template v-if="existedImages.length > 0">
            <div class="row">
              <template v-for="(image, idx) in existedImages" :key="idx">
                <div class="image-container" style="position: relative; width: 20%">
                  <q-img :src="image" style="width: 100%" :alt="image" />
                  <q-btn
                    round
                    dense
                    icon="close"
                    color="negative"
                    class="delete-btn"
                    size="8px"
                    @click="selectDeletedImage(idx)"
                  />
                </div>
              </template>
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
            :multiple="true"
            :maxFiles="5"
            max-size="5MB"
          />
          <q-toggle
            :label="post.value.value ? '張貼中' : '未張貼'"
            v-model="post.value.value"
            :disable="isSubmitting"
            :error="!!post.errorMessage.value"
            :error-message="post.errorMessage.value"
          />
          <q-card-actions align="right">
            <q-btn color="secondary" @click="closeDialog(false)">取消</q-btn>
            <q-btn type="submit" :loading="isSubmitting" color="primary">{{
              props.work ? '更新' : '新增'
            }}</q-btn>
          </q-card-actions>
        </q-card-section>
      </q-form>
    </q-card>
    <tag-dialog v-model="isShowDialog" :tags="allTags" @close="handleDialogClose" />
  </q-dialog>
</template>
<script setup>
import { ref, watch, useTemplateRef } from 'vue'
import { useQuasar } from 'quasar'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import workService from 'src/services/work'
import tagService from 'src/services/tag'
import tagDialog from 'src/components/TagDialog.vue'

const FOLDERNAME = 'works'

const model = defineModel()

const props = defineProps({
  work: Object,
})

const emit = defineEmits(['close'])

const $q = useQuasar()
const fileAgent = useTemplateRef('fileAgent')

const categoryOptions = [
  '普迪系列',
  '幾何動物',
  '字母系列',
  '白日夢系列',
  '動物喝茶',
  '注音系列',
  '365日常',
  '生活雜記',
  '其他',
]

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('作品標題是必填的').max(100, '作品標題最多只能有 100 個字元'),
    category: yup.string().required('分類是必填的').oneOf(categoryOptions, '請選擇有效的分類'),
    content: yup.string().max(500, '內容最多只能有 500 個字元'),
    post: yup.boolean().required('是否張貼是必填的'),
  }),
  initialValues: {
    name: '',
    category: '',
    content: '',
    post: false,
  },
})
const name = useField('name')
const category = useField('category')
const content = useField('content')
const post = useField('post')

const tags = ref([]) // 陣列存放tag的object id
const statistics = ref({
  views: 0,
  likes: [],
})

const fileRecords = ref([])
const rawFileRecords = ref([])

const existedImages = ref([])
const deletedImages = ref([])

const allTags = ref([]) // 所有標籤列表
const tagOptions = ref([]) // 從 API 獲取的標籤列表
const selectedTags = ref([]) // 已選中的標籤

watch(model, (newValue) => {
  // 新增作品
  if (newValue && !props.work) {
    // 清空form表單以外的資料
    tags.value = []
    statistics.value = {
      views: 0,
      likes: [],
    }

    existedImages.value = []
    deletedImages.value = []

    // 新增作品時 執行 fetchTags
    // 編輯作品時 留到props.work的監聽去執行fetchTags
    fetchTags()
  }
})

watch(
  () => props.work,
  (editWork) => {
    // 如果有傳入 work，則填入表單資料
    if (editWork) {
      name.value.value = editWork.name
      category.value.value = editWork.category
      tags.value = editWork.tags
      content.value.value = editWork.content
      post.value.value = editWork.post
      statistics.value.value = editWork.statistics

      // 使用展開運算符複製圖片陣列
      // 這樣可以避免直接修改原始陣列
      existedImages.value = [...editWork.images]

      // 清空刪除的圖片
      deletedImages.value = []

      fetchTags()
    }
  },
)

const submit = handleSubmit(async (values) => {
  // 如果圖片欄位有錯誤，不執行
  if (fileRecords.value.some((record) => record.error)) {
    $q.notify({
      type: 'negative',
      message: '請選擇有效的圖片檔案',
    })
    return
  }

  // 新增作品必須有圖片
  // 編輯作品沒有圖片就是沿用舊的圖片
  if (!props.work && fileRecords.value.length === 0) {
    $q.dialog({
      title: '錯誤',
      message: '請上傳作品圖片',
    })
    return
  }

  // 圖片數量限制
  if (props.work?.images.length + fileRecords?.value.length > 5) {
    $q.dialog({
      title: '錯誤',
      message: `最多只能再上傳 ${5 - props.work.images.length} 張圖片`,
    })
    return
  }

  // 送出
  try {
    // 建立 FormData 格式資料
    // fd.append(欄位名稱, 欄位值)
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('category', values.category)
    fd.append('tags', JSON.stringify(selectedTags.value)) // 傳送選中的標籤
    fd.append('content', values.content)
    fd.append('post', values.post)
    fd.append('folder', FOLDERNAME)
    fd.append('deletedImages', JSON.stringify(deletedImages.value))

    if (fileRecords.value.length > 0) {
      const images = fileRecords.value.filter((record) => record.file).map((record) => record.file)

      images.forEach((file) => {
        fd.append('images', file)
      })
    }

    const { data } = await (props.work
      ? workService.update(props.work._id, fd)
      : workService.create(fd))

    $q.notify({
      type: 'positive',
      message: props.work ? '作品更新成功' : '作品新增成功',
    })

    closeDialog(data.work)
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
const selectDeletedImage = (idx) => {
  deletedImages.value.push(existedImages.value[idx])
  existedImages.value.splice(idx, 1)
}

// 獲取標籤列表
const fetchTags = async () => {
  // 清空已選擇的標籤
  selectedTags.value = []
  tagOptions.value = []
  allTags.value = []

  try {
    const { data } = await tagService.getAll()

    allTags.value = data.tags
    console.log('獲取標籤列表')

    // 設定標籤選項
    tagOptions.value = data.tags.map((tag) => ({
      value: tag._id,
      label: tag.name,
      enable: tag.enable,
      color: tag.enable ? 'primary' : 'grey',
    }))

    // tagOptions.value = [
    //   { label: '科技', value: '科技' },
    //   { label: '藝術', value: '藝術' },
    //   { label: '設計', value: '設計' },
    //   { label: '教育', value: '教育' },
    //   { label: '其他', value: '其他' },
    // ]

    // 先刪除tags中 不在tagOptions裡的標籤
    // 再將結果設定給selectedTags
    // 例如：假設有以下情況
    // tags:[{name:'運動', id:'aaa'}, {name:'日本', id:'bbb'}]
    // tagOptions:[{ label: '南韓', value: 'bbb' }, { label: '生活', value: 'ccc' }]  (運動已被停用)
    // selectedTags.value = ['bbb']（只留下有對應的 id）
    //

    selectedTags.value = tagOptions.value
      .filter((option) => tags.value.some((tag) => tag._id === option.value))
      .map((option) => option.value)
  } catch (error) {
    console.error('獲取標籤失敗', error)
  }
}

// 打開標籤管理對話框
const isShowDialog = ref(false)

const openTagDialog = () => {
  isShowDialog.value = true
}

const handleDialogClose = () => {
  isShowDialog.value = false

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
