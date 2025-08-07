<template>
  <!-- 商品編輯對話框 -->
  <q-dialog v-model="dialog.open" persistent>
    <q-card style="min-width: 600px" class="q-pa-md">
      <q-form @submit.prevent="submit">
        <q-card-section>
          <div class="text-h6">
            {{ dialog.id.length > 0 ? '編輯商品' : '新增商品' }}
          </div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model="name.value.value"
            :disable="form.isSubmitting"
            :error="!!name.errorMessage.value"
            :error-message="name.errorMessage.value"
            label="名稱"
            filled
          />

          <q-input
            v-model.number="price.value.value"
            :disable="form.isSubmitting"
            :error="!!price.errorMessage.value"
            :error-message="price.errorMessage.value"
            label="價格"
            type="number"
            min="0"
            filled
          />

          <q-select
            v-model="category.value.value"
            :disable="form.isSubmitting"
            :options="categoryOptions"
            :error="!!category.errorMessage.value"
            :error-message="category.errorMessage.value"
            label="分類"
            filled
          />

          <q-input
            v-model="description.value.value"
            :disable="form.isSubmitting"
            :error="!!description.errorMessage.value"
            :error-message="description.errorMessage.value"
            label="描述"
            type="textarea"
            filled
          />

          <!-- 保留 VueFileAgent 插件 -->
          <VueFileAgent
            ref="fileAgent"
            :disable="form.isSubmitting"
            v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            :error-text="{ type: '檔案格式不正確', size: '檔案大小不得超過 1MB' }"
            help-text="選擇或拖拽檔案"
            max-size="1MB"
          />

          <q-checkbox
            v-model="sell.value.value"
            :disable="form.isSubmitting"
            :error="!!sell.errorMessage.value"
            :error-message="sell.errorMessage.value"
            label="上架"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="取消"
            color="negative"
            flat
            :disable="form.isSubmitting"
            @click="closeDialog"
          />
          <q-btn
            :label="dialog.id.length > 0 ? '編輯' : '新增'"
            color="positive"
            :loading="form.isSubmitting"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup></script>
