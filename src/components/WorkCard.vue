<template>
  <div
    class="project-item bg-judy-1"
    :class="{ reverse: isReverse }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="project-image">
      <q-card class="my-card" flat bordered>
        <img
          :src="project.image"
          :alt="project.title"
          class="main-image"
          @click="openImageDialog"
        />
        <q-card-actions :align="isReverse ? 'left' : 'right'">
          <div class="row full-width items-center">
            <div class="col">
              <div class="row justify-end q-gutter-xs">
                <q-chip
                  square
                  :color="`judy-${2 + (index % 5)}`"
                  text-color="white"
                  icon="tag"
                  v-for="(tag, index) in project.tags"
                  :key="tag"
                >
                  {{ tag }}
                </q-chip>
              </div>
            </div>
            <div class="col-4">
              <div class="row justify-end">
                <q-btn flat round color="red" icon="favorite">
                  <q-tooltip>加入收藏</q-tooltip></q-btn
                >
                <q-btn flat round color="teal" icon="bookmark"><q-tooltip>書籤</q-tooltip></q-btn>
                <q-btn flat round color="primary" icon="share" @click="shareProject">
                  <q-tooltip>分享作品</q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-actions>
      </q-card>
    </div>

    <div class="project-content">
      <div class="project-category">－{{ project.category }}</div>
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <button class="project-link" @click="openImageDialog">
        <span>放大看作品</span>
        <svg class="arrow-icon" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
  <!-- 圖片放大對話框 -->
  <q-dialog v-model="showImageDialog" maximized transition-show="none" transition-hide="none">
    <q-card class="image-dialog-card bg-black">
      <!-- 圖片容器 -->
      <div class="image-container" @click="closeImageDialog">
        <!-- 圖片 -->
        <img
          :src="project.image"
          :alt="project.title"
          class="fullsize-image"
          @click="closeImageDialog"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const props = defineProps({
  project: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value &&
        typeof value === 'object' &&
        'id' in value &&
        'title' in value &&
        'category' in value &&
        'description' in value &&
        'image' in value
      )
    },
  },
  isReverse: {
    type: Boolean,
    default: false,
  },
})

// 圖片對話框狀態
const showImageDialog = ref(false)

// 開啟圖片對話框
const openImageDialog = () => {
  showImageDialog.value = true
}

// 關閉圖片對話框
const closeImageDialog = () => {
  showImageDialog.value = false
}

// 🔗 分享功能
const shareProject = async () => {
  // 生成錨點連結到 WorkPage
  const shareUrl = `${window.location.origin}${window.location.pathname}#/work#project-${props.project.id}`
  // const shareData = {
  //   title: `${props.project.title} - Judy的創作世界`,
  //   text: `來看看 Judy 的作品：${props.project.description}`,
  //   url: shareUrl,
  // }

  try {
    showShareDialog(shareUrl)
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('分享失敗:', error)
      showShareDialog(shareUrl)
    }
  }
}

// 顯示分享選項對話框
const showShareDialog = (shareUrl) => {
  const shareText = `來看看 Judy 的作品：${props.project.title}`

  $q.dialog({
    title: '分享作品',
    message: '選擇分享方式',
    options: {
      type: 'radio',
      model: 'copy',
      items: [
        { label: '複製連結', value: 'copy', icon: 'content_copy' },
        { label: '分享到 Facebook', value: 'facebook', icon: 'facebook' },
        { label: '分享到 LINE', value: 'line', icon: 'chat' },
      ],
    },
    ok: '分享',
    cancel: '取消',
    persistent: true,
  }).onOk((shareMethod) => {
    handleShare(shareMethod, shareUrl, shareText)
  })
}

// 🔧 現代化的複製到剪貼簿函數
const copyToClipboard = async (text) => {
  try {
    // 方法 1: 使用現代 Clipboard API（推薦）
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // 方法 2: 使用 document.execCommand（較舊的瀏覽器支援）

    // 方法 3: 最後備用方案
    throw new Error('複製功能不受支援')
  } catch (error) {
    console.error('複製失敗:', error)
    return false
  }
}

// 處理不同的分享方式
const handleShare = async (method, url) => {
  switch (method) {
    case 'copy': {
      const copySuccess = await copyToClipboard(url)

      if (copySuccess) {
        $q.notify({
          type: 'positive',
          message: '連結已複製到剪貼簿！',
          position: 'top',
          timeout: 2000,
          icon: 'content_copy',
        })
      } else {
        // 如果複製失敗，顯示連結讓用戶手動複製
        $q.dialog({
          title: '手動複製連結',
          message: '請手動複製以下連結：',
          prompt: {
            model: url,
            type: 'text',
            readonly: true,
          },
          ok: '關閉',
          persistent: true,
        })
      }
      break
    }

    case 'facebook':
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        '_blank',
        'width=600,height=400,scrollbars=yes,resizable=yes',
      )
      $q.notify({
        type: 'info',
        message: '正在開啟 Facebook 分享...',
        position: 'top',
        timeout: 2000,
        icon: 'facebook',
      })
      break

    case 'line':
      window.open(
        `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
        '_blank',
        'width=600,height=400,scrollbars=yes,resizable=yes',
      )
      $q.notify({
        type: 'info',
        message: '正在開啟 LINE 分享...',
        position: 'top',
        timeout: 2000,
        icon: 'chat',
      })
      break

    default:
      $q.notify({
        type: 'negative',
        message: '未知的分享方式',
        position: 'top',
        timeout: 2000,
      })
  }
}

// 滑鼠進入事件
const handleMouseEnter = (event) => {
  const item = event.currentTarget
  // const image = item.querySelector('.main-image')
  const content = item.querySelector('.project-content')

  // gsap.to(image, { scale: 1.1, duration: 0.6, ease: 'power2.out' })
  gsap.to(content, { y: -10, duration: 0.3 })
}

const handleMouseLeave = (event) => {
  const item = event.currentTarget
  // const image = item.querySelector('.main-image')
  const content = item.querySelector('.project-content')

  // gsap.to(image, { scale: 1, duration: 0.6, ease: 'power2.out' })
  gsap.to(content, { y: 0, duration: 0.3 })
}
</script>

<style scoped lang="scss">
.project-item {
  margin: 0px 100px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;

  &.reverse {
    .project-image {
      order: 2;
    }
    .project-content {
      order: 1;
    }
    .project-content {
      text-align: right;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;

    &.reverse {
      .project-image,
      .project-content {
        order: unset;
      }
    }
  }
}

.project-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  cursor: zoom-in;

  .main-image {
    width: 100%;
    // height: 400px;
    object-fit: contain;
    transition: transform 0.6s ease;
  }
}

.project-content {
  padding: 0 20px;

  .project-category {
    font-size: 0.9rem;
    font-weight: 600;
    color: #6c5ce7;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
    position: relative;
  }

  .project-title {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 700;
    color: #2d3436;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .project-description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #636e72;
    margin-bottom: 30px;
  }

  .project-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    background: linear-gradient(135deg, #6c5ce7, #a29bfe);
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #a29bfe, #6c5ce7);
      transition: left 0.3s ease;
      z-index: -1;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(108, 92, 231, 0.3);

      &::before {
        left: 0;
      }

      .arrow-icon {
        transform: translateX(10px);
      }
    }

    .arrow-icon {
      width: 20px;
      height: 20px;
      stroke: currentColor;
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: transform 0.3s ease;
    }
  }
}

// 圖片對話框樣式
.image-dialog-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
}

.image-container {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: auto;
}

.fullsize-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: zoom-out;
}

// 響應式設計
@media (max-width: 1024px) {
  .project-item {
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .project-content {
    padding: 0;

    .project-category::before {
      display: none;
    }
  }

  .project-image .main-image {
    height: 300px;
  }

  .close-btn {
    top: 15px;
    right: 15px;
  }
}
</style>
