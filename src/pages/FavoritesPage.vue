<template>
  <div class="projects-section">
    <div class="container">
      <div class="q-pa-md">
        <!-- 載入狀態 -->
        <div v-if="loading" class="loading-container">
          <q-spinner size="50px" color="primary" />
          <p class="q-mt-md">載入中...</p>
        </div>
      </div>

      <!-- 顯示當前選中系列的作品 -->
      <div v-if="currentSeries" class="row justify-center">
        <div class="col-12">
          <h2 class="section-title">我的收藏</h2>
        </div>

        <!-- 如果當前系列有作品 -->
        <div v-if="currentWorks.length > 0" class="projects-grid col-12 col-md-10">
          <div
            v-for="(work, index) in currentWorks"
            :key="work._id"
            :id="`project-${work._id}`"
            class="project-section"
          >
            <WorkCard :project="transformWorkToProject(work)" :is-reverse="index % 2 === 1" />
          </div>
        </div>

        <!-- 如果當前系列沒有作品 -->
        <div v-else class="no-works-container">
          <div class="no-works-message">
            <q-icon name="image" size="4rem" color="grey-5" />
            <h3>此系列暫無作品</h3>
            <p>請選擇其他系列查看作品</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkCard from 'src/components/WorkCard.vue'
import workService from 'src/services/work'
import { useUserStore } from 'src/stores/user'

const userStore = useUserStore()
gsap.registerPlugin(ScrollTrigger)

// 響應式資料
const currentWorks = ref([])
const loading = ref(true)

// 將 work 物件轉換為 WorkCard 元件需要的 project 格式
const transformWorkToProject = (work) => {
  return {
    id: work._id,
    title: work.name,
    category: currentSeries.value?.name || '未分類', // 使用系列名稱作為分類
    description: work.content || '暫無描述',
    image: work.images?.[0] || 'https://via.placeholder.com/600x400?text=No+Image', // 使用第一張圖片
    tags: work.tags || [],
    statistics: work.statistics || {},
  }
}

const getWorks = async () => {
  try {
    loading.value = true

    // 用使用者的收藏 ID 來獲取作品
    const favorites = userStore.favorites
    const response = await workService.getByIds({ ids: favorites })

    currentWorks.value = response.data.works
  } catch (error) {
    console.error('Error fetching works:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  // 頁面載入時呼叫 API
  await getWorks()
})
</script>

<style scoped lang="scss">
.projects-section {
  // padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 80px;
  color: #2d3436;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #6c5ce7, #a29bfe);
    border-radius: 2px;
  }
}

.projects-grid {
  // display: flex;
  // flex-direction: column;
  gap: 60px;
}

// 無作品時的樣式
.no-works-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;

  .no-works-message {
    text-align: center;
    color: #636e72;

    h3 {
      margin: 1rem 0 0.5rem 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    p {
      margin: 0;
      font-size: 1rem;
      opacity: 0.8;
    }
  }
}

.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}

// 🎯 作品區塊樣式
.project-section {
  margin-bottom: 80px;
  scroll-margin-top: 50px; /* 為 header 和 carousel 預留空間 */
  transition: all 0.3s ease;
}

/* ✨ 高亮效果動畫 */
// .project-section.highlighted {
//   animation: highlight 3s ease-in-out;
//   border-radius: 20px;
//   padding: 20px;
//   margin: 20px 0;
// }

// @keyframes highlight {
//   0% {
//     background-color: transparent;
//     transform: scale(1);
//   }
//   25% {
//     background-color: rgba(235, 140, 111, 0.15);
//     transform: scale(1.02);
//     box-shadow: 0 10px 30px rgba(235, 140, 111, 0.2);
//   }
//   50% {
//     background-color: rgba(235, 140, 111, 0.1);
//     transform: scale(1.01);
//     box-shadow: 0 8px 25px rgba(235, 140, 111, 0.15);
//   }
//   75% {
//     background-color: rgba(235, 140, 111, 0.05);
//     transform: scale(1.005);
//     box-shadow: 0 5px 15px rgba(235, 140, 111, 0.1);
//   }
//   100% {
//     background-color: transparent;
//     transform: scale(1);
//     box-shadow: none;
//   }
// }

// /* 🎯 為分享連結訪問者添加特殊樣式 */
// .project-section:target {
//   animation: highlight 3s ease-in-out;
// }

// /* 📱 載入動畫 */
// .project-section {
//   opacity: 0;
//   animation: fadeInUp 0.6s ease-out forwards;
// }

// .project-section:nth-child(1) {
//   animation-delay: 0.1s;
// }
// .project-section:nth-child(2) {
//   animation-delay: 0.2s;
// }
// .project-section:nth-child(3) {
//   animation-delay: 0.3s;
// }
// .project-section:nth-child(4) {
//   animation-delay: 0.4s;
// }
// .project-section:nth-child(5) {
//   animation-delay: 0.5s;
// }

// @keyframes fadeInUp {
//   from {
//     opacity: 0;
//     transform: translateY(30px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// 響應式設計
@media (max-width: 1024px) {
  .projects-section {
    padding: 80px 0;
  }

  .projects-grid {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .projects-section {
    padding: 60px 0;
  }

  .section-title {
    margin-bottom: 60px;
  }

  .projects-grid {
    gap: 0px;
  }

  .project-section {
    margin-bottom: 60px;
    scroll-margin-top: 300px;
  }

  .project-section.highlighted {
    padding: 10px;
    margin: 10px 0;
  }
}
</style>
