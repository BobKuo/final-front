<template>
  <div class="projects-section">
    <div class="container">
      <div class="q-pa-md">
        <!-- 載入狀態 -->
        <div v-if="loading" class="loading-container">
          <q-spinner size="50px" color="primary" />
          <p class="q-mt-md">載入中...</p>
        </div>

        <!-- Carousel -->
        <q-carousel
          v-else
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          control-color="primary"
          class="rounded-borders"
        >
          <q-carousel-slide
            v-for="series in allSeries"
            :key="series._id"
            :name="series._id"
            :img-src="series.cover"
          >
            <div class="absolute-bottom custom-caption">
              <div class="text-h2">{{ series.name }}</div>
              <div class="text-subtitle1">{{ series.description }}</div>
            </div>
          </q-carousel-slide>
        </q-carousel>

        <!-- Carousel 控制按鈕 -->
        <div v-if="!loading && allSeries.length > 0" class="row justify-center q-mt-md">
          <q-btn-toggle
            v-model="slide"
            :options="carouselOptions"
            toggle-color="primary"
            color="white"
            text-color="primary"
            unelevated
          />
        </div>
      </div>

      <!-- 顯示當前選中系列的作品 -->
      <div v-if="currentSeries" class="row justify-center">
        <div class="col-12">
          <h2 class="section-title">{{ currentSeries.name }} - 作品集</h2>
        </div>

        <!-- 如果當前系列有作品 -->
        <div v-if="currentWorks.length > 0" class="projects-grid col-12 col-md-10">
          <WorkCard
            v-for="(work, index) in currentWorks"
            :key="work._id"
            :project="transformWorkToProject(work)"
            :is-reverse="index % 2 === 1"
            @view-project="handleViewProject"
          />
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
import { ref, onMounted, computed, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkCard from 'src/components/WorkCard.vue'
import seriesService from 'src/services/series'
import workService from 'src/services/work'

gsap.registerPlugin(ScrollTrigger)

// 響應式資料
const allSeries = ref([])
const allWorks = ref([])
const loading = ref(true)
const slide = ref('')

// 計算屬性：生成 carousel 控制按鈕選項
const carouselOptions = computed(() => {
  return allSeries.value.map((series) => ({
    label: series.name,
    value: series._id,
  }))
})

// 計算屬性：當前選中的系列
const currentSeries = computed(() => {
  return allSeries.value.find((series) => series._id === slide.value) // slide 為選到的系列 ID
})

// 計算屬性：當前系列的作品
const currentWorks = computed(() => {
  return allWorks.value.filter((work) => work.category === slide.value) // slide 為選到的系列 ID
})

// 將 work 物件轉換為 WorkCard 元件需要的 project 格式
const transformWorkToProject = (work) => {
  return {
    id: work._id,
    title: work.name,
    category: currentSeries.value?.name || '未分類', // 使用系列名稱作為分類
    description: work.content || '暫無描述',
    image: work.images?.[0] || 'https://via.placeholder.com/600x400?text=No+Image', // 使用第一張圖片
    tags: work.tags || [],
  }
}

// 監聽 slide 變化，可以添加切換動畫
watch(slide, (newSlide, oldSlide) => {
  if (newSlide !== oldSlide && newSlide) {
    console.log('切換到系列:', currentSeries.value?.name)
    console.log('該系列作品數量:', currentWorks.value.length)

    // 可以在這裡添加切換動畫
    // animateWorksTransition()
  }
})

// 作品切換動畫
// const animateWorksTransition = () => {
//   // 等待 DOM 更新後執行動畫
//   setTimeout(() => {
//     gsap.fromTo(
//       '.projects-grid .work-card',
//       {
//         y: 50,
//         opacity: 0,
//       },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 0.6,
//         stagger: 0.1,
//         ease: 'power2.out',
//       },
//     )
//   }, 50)
// }

// const projects = ref([
//   {
//     id: 1,
//     title: 'Mountain Resort Branding',
//     category: 'Branding & Identity',
//     description:
//       'Complete brand identity design for a luxury mountain resort, including logo design, color palette, and brand guidelines.',
//     image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
//   },
//   {
//     id: 2,
//     title: 'Forest Conservation Website',
//     category: 'Web Design',
//     description:
//       'Responsive website design for an environmental organization focused on forest conservation and sustainability initiatives.',
//     image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
//   },
//   {
//     id: 3,
//     title: 'Nature Photography Portfolio',
//     category: 'Portfolio Design',
//     description:
//       'Clean and minimalist portfolio website showcasing stunning nature photography with smooth transitions and galleries.',
//     image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
//   },
//   {
//     id: 4,
//     title: 'Outdoor Adventure App',
//     category: 'UI/UX Design',
//     description:
//       'Mobile app design for outdoor enthusiasts, featuring trail maps, weather updates, and community features.',
//     image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
//   },
// ])

const getSeries = async () => {
  try {
    loading.value = true
    const response = await seriesService.get()
    allSeries.value = response.data.series

    // 設定預設的 slide（第一個系列）
    if (allSeries.value.length > 0) {
      slide.value = allSeries.value[0]._id
    }
  } catch (error) {
    console.error('Error fetching series:', error)
  } finally {
    loading.value = false
  }
}

const getWorks = async () => {
  try {
    loading.value = true
    const response = await workService.get()
    allWorks.value = response.data.works
  } catch (error) {
    console.error('Error fetching works:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  // 頁面載入時呼叫 API
  await getSeries()
  await getWorks()

  // 滾動觸發動畫
  // gsap.fromTo(
  //   '.project-item',
  //   {
  //     y: 100,
  //     opacity: 0,
  //   },
  //   {
  //     y: 0,
  //     opacity: 1,
  //     duration: 1,
  //     stagger: 0.2,
  //     ease: 'power2.out',
  //     scrollTrigger: {
  //       trigger: '.projects-grid',
  //       start: 'top 80%',
  //       end: 'bottom 20%',
  //       toggleActions: 'play none none reverse',
  //     },
  //   },
  // )
  // 圖片視差效果
  // gsap.utils.toArray('.project-image img').forEach((img) => {
  //   gsap.fromTo(
  //     img,
  //     { scale: 1.2 },
  //     {
  //       scale: 1,
  //       duration: 1.5,
  //       ease: 'power2.out',
  //       scrollTrigger: {
  //         trigger: img.closest('.project-item'),
  //         start: 'top 90%',
  //         end: 'bottom 10%',
  //         scrub: 1,
  //       },
  //     },
  //   )
  // })
})

const handleViewProject = (project) => {
  console.log('View project:', project)
  // 這裡可以添加導航到項目詳情頁的邏輯
  // 例如: router.push(`/projects/${project.id}`)
}
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
}
</style>
