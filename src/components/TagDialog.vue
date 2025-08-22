<template>
  <q-dialog v-model="model" persistent>
    <q-card class="q-pa-md" style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">管理標籤</div>
      </q-card-section>
      <q-card-section>
        <!-- 新增標籤 -->
        <q-input
          bottom-slots
          v-model="newTagName"
          label="新增標籤"
          clearable
          counter
          outlined
          maxlength="10"
          @keyup.enter="addTag"
        >
          <template v-slot:before>
            <q-icon name="label"></q-icon>
          </template>

          <template v-slot:hint> </template>

          <template v-slot:append>
            <q-btn round dense flat icon="add" @click="addTag"></q-btn>
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <!-- 標籤列表 -->
        <q-list>
          <q-item v-for="(tag, index) in tagOptions" :key="tag.value">
            <q-item-section>
              <template v-if="!tag.isEditing">
                <div class="row">
                  <q-btn
                    size="sm"
                    dense
                    flat
                    icon="edit"
                    @click="tag.isEditing = true"
                    class="q-mr-sm"
                  />
                  <span>{{ tag.label }}</span>
                </div>
              </template>
              <template v-else>
                <q-input
                  v-model="tag.newName"
                  dense
                  outlined
                  autofocus
                  @blur="saveTagName(tag)"
                  @keyup.enter="saveTagName(tag)"
                />
              </template>
            </q-item-section>
            <q-item-section side>
              <div class="row q-gutter-sm">
                <q-toggle
                  dense
                  class="q-pa-sm"
                  style="border: 1px solid #ccc"
                  v-model="tag.enable"
                  label="啟用"
                />
                <q-btn size="sm" outline dense icon="delete" @click="removeTag(index)" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="secondary" @click="closeDialog(false)">取消</q-btn>
        <q-btn color="primary" @click="closeDialog(true)">儲存</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import tagService from 'src/services/tag'

const model = defineModel()

const props = defineProps({
  tags: Array,
})

const emit = defineEmits(['close'])

const $q = useQuasar()

const newTagName = ref('') // 新標籤的名稱
const tagOptions = ref([]) // 標籤選項列表

// 初始化標籤選項
watch(
  model,
  (newValue) => {
    if (newValue) {
      console.log('Tag 對話框已開啟，執行初始化邏輯')

      tagOptions.value = props.tags.map((tag) => ({
        label: tag.name,
        value: tag._id,
        enable: tag.enable,
        isEditing: false, // 是否處於編輯模式
        newName: tag.name, // 用於編輯的臨時名稱
      }))
      console.log('初始化標籤選項:', tagOptions.value)
    }
  },
  { immediate: true },
)

// 新增標籤
const addTag = () => {
  if (!newTagName.value.trim()) {
    $q.notify({
      type: 'negative',
      message: '標籤名稱不能為空',
    })
    return
  }

  if (tagOptions.value.some((tag) => tag.label === newTagName.value.trim())) {
    $q.notify({
      type: 'negative',
      message: '標籤已存在',
    })
    return
  }

  // 更新標籤列表
  tagOptions.value.push({
    label: newTagName.value.trim(),
    value: newTagName.value.trim(),
    enable: true,
  })
  // 清空輸入框
  newTagName.value = ''
}

// 刪除標籤
const removeTag = (index) => {
  if (index < 0 || index >= tagOptions.value.length) {
    console.error('無效的標籤索引:', index)
    return
  }
  tagOptions.value.splice(index, 1)
}

// 保存標籤名稱
const saveTagName = (tag) => {
  if (!tag.newName.trim()) {
    tag.isEditing = false // 退出編輯模式
    return
  }

  if (tagOptions.value.some((t) => t.label === tag.newName.trim() && t.value !== tag.value)) {
    $q.notify({
      type: 'negative',
      message: '標籤已存在',
    })
    return
  }

  if (tag.newName.trim() === tag.label) {
    tag.isEditing = false // 如果名稱沒有變更，直接退出編輯模式
    return
  }

  tag.label = tag.newName.trim() // 更新標籤名稱
  tag.isEditing = false // 退出編輯模式
}

// 關閉對話框
const closeDialog = async (confirmed) => {
  if (confirmed) {
    try {
      // 提交標籤更新
      const updateData = tagOptions.value.map((tag) => ({
        _id: tag.value,
        name: tag.label,
        type: '插畫作品',
        enable: tag.enable,
      }))
      console.log('提交標籤更新:', updateData)

      await tagService.update(updateData)

      $q.notify({
        type: 'positive',
        message: '標籤更新成功',
      })
    } catch (error) {
      console.error('更新標籤時發生錯誤: ', error)
      $q.notify({
        type: 'negative',
        message: '無法更新標籤',
      })
    }
  }
  // 清空輸入框
  newTagName.value = ''
  // 關閉對話框
  emit('close')
}
</script>
