<template>
  <div
    class="project-item"
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
          <q-btn flat round color="red" icon="favorite"></q-btn>
          <q-btn flat round color="teal" icon="bookmark"></q-btn>
          <q-btn flat round color="primary" icon="share"></q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <div class="project-content">
      <div class="project-category">－{{ project.category }}</div>
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <button class="project-link" @click="$emit('view-project', project)">
        <span>View Project</span>
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

defineProps({
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

defineEmits(['view-project'])

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
