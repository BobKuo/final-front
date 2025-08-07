<template>
  <q-dialog v-model="model" persistent>
    <q-card class="q-pa-md" style="min-width: 400px">
      <q-form>
        <q-card-section>
          <div class="text-h6">新增商品</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model="name.value.value"
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
          <VueFileAgent
            accept="image/jpeg,image/png"
            deletable
            :error-text="{ type: '檔案格式不正確', size: '檔案大小不得超過 1MB' }"
            help-text="選擇或拖拽檔案"
            multiple="true"
            maxFiles="5"
            max-size="1MB"
          />
          <q-toggle
            :label="sell.value.value ? '上架中' : '未上架'"
            v-model="sell.value.value"
            :disable="isSubmitting"
            :error="!!sell.errorMessage.value"
            :error-message="sell.errorMessage.value"
          />
          <q-card-actions align="right">
            <q-btn label="取消" color="secondary" />
            <q-btn label="新增" color="primary" />
          </q-card-actions>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue'
// import { useQuasar } from 'quasar'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const model = defineModel()

defineProps({
  product: Object,
})

// const emit = defineEmits(['close'])

// const $q = useQuasar()

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
</script>
