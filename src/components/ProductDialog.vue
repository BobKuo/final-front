<template>
  <q-dialog v-model="model" persistent>
    <q-card class="q-pa-md" style="min-width: 400px">
      <q-form @submit.prevent="submit">
        <q-card-section>
          <div class="text-h6">{{ props.product ? '編輯商品' : '新增商品' }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model="name.value.value"
            deleteable
            :disable="isSubmitting"
            :error="!!name.errorMessage.value"
            :error-message="name.errorMessage.value"
            label="名稱"
          ></q-input>
          <q-input
            v-model="price.value.value"
            :disable="isSubmitting"
            :error="!!price.errorMessage.value"
            :error-message="price.errorMessage.value"
            label="價格"
            type="number"
            min="0"
          ></q-input>
          <q-select
            label="分類"
            v-model="category.value.value"
            :disable="isSubmitting"
            :options="categoryOptions"
            :error="!!category.errorMessage.value"
            :error-message="category.errorMessage.value"
          />
          <q-input
            v-model="description.value.value"
            :disable="isSubmitting"
            :error="!!description.errorMessage.value"
            :error-message="description.errorMessage.value"
            label="描述"
            type="textarea"
            outlined
          ></q-input>
          <!-- 顯示商品圖片 -->
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
            :error-text="{ type: '檔案格式不正確', size: '檔案大小不得超過 1MB' }"
            help-text="選擇或拖拽檔案"
            :multiple="true"
            :maxFiles="5"
            max-size="5MB"
          />
          <q-toggle
            :label="sell.value.value ? '上架中' : '未上架'"
            v-model="sell.value.value"
            :disable="isSubmitting"
            :error="!!sell.errorMessage.value"
            :error-message="sell.errorMessage.value"
          />
          <q-card-actions align="right">
            <q-btn color="secondary" @click="closeDialog">取消</q-btn>
            <q-btn type="submit" :loading="isSubmitting" color="primary">{{
              props.product ? '更新' : '新增'
            }}</q-btn>
          </q-card-actions>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, watch, useTemplateRef } from 'vue'
import { useQuasar } from 'quasar'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import productService from 'src/services/product'

const FOLDERNAME = 'products'

const model = defineModel()

const props = defineProps({
  product: Object,
})

const emit = defineEmits(['close'])

const $q = useQuasar()
const fileAgent = useTemplateRef('fileAgent')

const categoryOptions = ['電子產品', '服裝', '家居用品', '書籍', '玩具', '食品', '其他']
const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('商品名稱是必填的').max(100, '商品名稱最多只能有 100 個字元'),
    price: yup.number().typeError('價格是必填的').required('價格是必填的').min(0, '價格不能為負數'),
    category: yup.string().required('分類是必填的').oneOf(categoryOptions, '請選擇有效的分類'),
    description: yup.string().max(500, '描述最多只能有 500 個字元'),
    sell: yup.boolean().required('是否上架是必填的'),
  }),
  initialValues: {
    name: '',
    price: 0,
    category: '',
    description: '',
    sell: false,
  },
})
const name = useField('name')
const price = useField('price')
const category = useField('category')
const description = useField('description')
const sell = useField('sell')

const fileRecords = ref([])
const rawFileRecords = ref([])

const existedImages = ref([])
const deletedImages = ref([])

watch(
  () => props.product,
  (editProduct) => {
    // 如果有傳入 product，則填入表單資料
    if (editProduct) {
      name.value.value = editProduct.name
      price.value.value = editProduct.price
      category.value.value = editProduct.category
      description.value.value = editProduct.description
      sell.value.value = editProduct.sell

      // 使用展開運算符複製圖片陣列
      // 這樣可以避免直接修改原始陣列
      existedImages.value = [...editProduct.images]

      // 清空刪除的圖片
      deletedImages.value = []
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

  // 新增商品必須有圖片
  // 編輯商品沒有圖片就是沿用舊的圖片
  if (!props.product && fileRecords.value.length === 0) {
    $q.dialog({
      title: '錯誤',
      message: '請上傳商品圖片',
    })
    return
  }

  // 圖片數量限制
  if (props.product?.images.length + fileRecords?.value.length > 5) {
    $q.dialog({
      title: '錯誤',
      message: `最多只能再上傳 ${5 - props.product.images.length} 張圖片`,
    })
    return
  }

  // 送出
  try {
    // 建立 FormData 格式資料
    // fd.append(欄位名稱, 欄位值)
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('price', values.price)
    fd.append('category', values.category)
    fd.append('description', values.description)
    fd.append('sell', values.sell)
    fd.append('folder', FOLDERNAME)
    fd.append('deletedImages', JSON.stringify(deletedImages.value))

    if (fileRecords.value.length > 0) {
      const images = fileRecords.value.filter((record) => record.file).map((record) => record.file)

      images.forEach((file) => {
        fd.append('images', file)
      })
    }

    const { data } = await (props.product
      ? productService.update(props.product._id, fd)
      : productService.create(fd))

    console.log('data---', data)

    $q.notify({
      type: 'positive',
      message: props.product ? '商品更新成功' : '商品新增成功',
    })

    closeDialog(data.product)
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || '操作失敗，請稍後再試',
    })
  }
})

const closeDialog = (returnedProduct) => {
  // 重置表單
  resetForm()

  // 清空圖片欄位
  fileAgent.value.deleteFileRecord()

  // 手動清空檔案列表 (上面的 deleteFileRecord 沒有清空檔案)
  fileRecords.value = []
  rawFileRecords.value = []

  // 關閉對話框
  emit('close', returnedProduct)
}

// 選擇刪除圖片
const selectDeletedImage = (idx) => {
  deletedImages.value.push(existedImages.value[idx])
  existedImages.value.splice(idx, 1)
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
