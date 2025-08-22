<template>
  <q-page class="work-showcase">
    <!-- 固定的字母動畫元素 -->
    <div ref="letterElement" class="floating-letter">J</div>

    <!-- 背景色彩層 -->
    <div ref="bgLayer" class="background-layer"></div>

    <!-- 主要內容區域 -->
    <section ref="pinSection" class="pin-section">
      <!-- 視差標題 -->
      <div class="parallax-title">
        <h1 ref="mainTitle" class="title-main">作品系列</h1>
        <h2 ref="subTitle" class="title-sub">ARTWORK COLLECTION</h2>
      </div>

      <!-- 橫向滑動軌道 -->
      <div ref="track" class="horizontal-track">
        <div
          v-for="(series, seriesIdx) in workSeries"
          :key="series.id"
          class="series-panel"
          :data-series="seriesIdx"
        >
          <!-- 系列標題 -->
          <div class="series-info">
            <h3 class="series-title">{{ series.title }}</h3>
            <p class="series-desc">{{ series.description }}</p>
            <div class="series-meta">{{ series.year }} • {{ series.count }} 作品</div>
          </div>

          <!-- 作品網格 -->
          <div class="artwork-grid">
            <div
              v-for="(work, workIdx) in series.works"
              :key="work.id"
              class="artwork-item"
              :style="{ animationDelay: `${workIdx * 0.1}s` }"
            >
              <img :src="work.image" :alt="work.title" class="artwork-image" />
              <div class="artwork-overlay">
                <h4>{{ work.title }}</h4>
                <p>{{ work.medium }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 系列指示器 -->
    <div class="series-indicator">
      <div
        v-for="(series, idx) in workSeries"
        :key="series.id"
        class="indicator-dot"
        :class="{ active: currentSeries === idx }"
      ></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 作品系列資料
const workSeries = [
  {
    id: 1,
    title: '動物喝茶系列',
    description: '探索潛意識的色彩與形狀',
    year: '2023',
    count: 8,
    color: '#FF6B6B',
    works: [
      {
        id: 1,
        title: '午夜夢迴',
        image:
          'https://res.cloudinary.com/dm5rlvzns/image/upload/v1755832805/works/samezymj56l3pff5mehj.jpg',
        medium: '水彩',
      },
      {
        id: 2,
        title: '藍色憂鬱',
        image:
          'https://res.cloudinary.com/dm5rlvzns/image/upload/v1755832874/works/k5u71ssa2am42dx5cavx.jpg',
        medium: '油畫',
      },
      {
        id: 3,
        title: '金色幻想',
        image:
          'https://res.cloudinary.com/dm5rlvzns/image/upload/v1755833079/works/pvoeot36vhpdpj7csdc2.jpg',
        medium: '數位繪畫',
      },
      {
        id: 4,
        title: '紫色迷霧',
        image:
          'https://res.cloudinary.com/dm5rlvzns/image/upload/v1755833132/works/qyyhcxlmzxwdhp9ymvfv.jpg',
        medium: '壓克力',
      },
    ],
  },
  {
    id: 2,
    title: '都市印象',
    description: '現代城市的光影與節奏',
    year: '2022',
    count: 6,
    color: '#4ECDC4',
    works: [
      { id: 5, title: '霓虹夜景', image: '/images/city1.jpg', medium: '數位繪畫' },
      { id: 6, title: '地鐵風景', image: '/images/city2.jpg', medium: '速寫' },
      { id: 7, title: '摩天大樓', image: '/images/city3.jpg', medium: '水彩' },
      { id: 8, title: '街頭塗鴉', image: '/images/city4.jpg', medium: '噴漆' },
    ],
  },
  {
    id: 3,
    title: '自然詩篇',
    description: '大自然的原始美感',
    year: '2021',
    count: 10,
    color: '#95E1D3',
    works: [
      { id: 9, title: '森林秘境', image: '/images/nature1.jpg', medium: '油畫' },
      { id: 10, title: '海浪之歌', image: '/images/nature2.jpg', medium: '水彩' },
      { id: 11, title: '山嵐飄渺', image: '/images/nature3.jpg', medium: '國畫' },
      { id: 12, title: '花語綻放', image: '/images/nature4.jpg', medium: '壓克力' },
    ],
  },
]

// Refs
const pinSection = ref(null)
const track = ref(null)
const letterElement = ref(null)
const bgLayer = ref(null)
const mainTitle = ref(null)
const subTitle = ref(null)
const currentSeries = ref(0)

let ctx = null

onMounted(async () => {
  await nextTick()
  initAnimations()
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})

const initAnimations = () => {
  ctx = gsap.context(() => {
    const section = pinSection.value
    const trackEl = track.value
    const letter = letterElement.value
    const bg = bgLayer.value

    // 計算總滑動距離
    const panels = gsap.utils.toArray('.series-panel')
    const totalWidth = panels.reduce((acc, panel) => acc + panel.offsetWidth, 0)
    const scrollDistance = totalWidth - window.innerWidth

    // 設定初始狀態
    gsap.set('.artwork-item', { scale: 0.8, autoAlpha: 0, y: 50 })
    gsap.set('.series-info', { x: -100, autoAlpha: 0 })
    gsap.set(letter, { scale: 1, rotation: 0 })

    // 主要橫向滑動動畫（pin）
    const horizontalTween = gsap.to(trackEl, {
      x: () => `-${scrollDistance}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // 更新當前系列指示器
          const progress = self.progress
          const seriesIndex = Math.floor(progress * workSeries.length)
          currentSeries.value = Math.min(seriesIndex, workSeries.length - 1)
        },
      },
    })

    // 字母動畫（沿底部移動並旋轉）
    gsap.to(letter, {
      x: () => window.innerWidth - 100,
      rotation: 360,
      scale: 1.5,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
      },
    })

    // 背景色彩變化
    const colorTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
      },
    })

    workSeries.forEach((series, idx) => {
      if (idx < workSeries.length - 1) {
        colorTimeline.to(bg, {
          backgroundColor: series.color,
          duration: 1,
        })
      }
    })

    // 視差標題動畫
    gsap.to(mainTitle.value, {
      x: -200,
      opacity: 0.3,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 2,
      },
    })

    gsap.to(subTitle.value, {
      x: 300,
      opacity: 0.5,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1.5,
      },
    })

    // 每個系列面板的進入動畫
    panels.forEach((panel, idx) => {
      // 系列資訊淡入
      gsap.to(panel.querySelector('.series-info'), {
        x: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: panel,
          start: 'left 70%',
          end: 'right 30%',
          containerAnimation: horizontalTween,
          toggleActions: 'play none none reverse',
        },
      })

      // 作品項目依序淡入
      const artworkItems = panel.querySelectorAll('.artwork-item')
      artworkItems.forEach((item, itemIdx) => {
        gsap.to(item, {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          delay: itemIdx * 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: panel,
            start: 'left 60%',
            end: 'right 40%',
            containerAnimation: horizontalTween,
            toggleActions: 'play none none reverse',
          },
        })
      })
    })
  }, pinSection.value)
}
</script>

<style>
.work-showcase {
  overflow-x: hidden;
  background: #1a1a1a;
  color: white;
}

.floating-letter {
  position: fixed;
  bottom: 40px;
  left: 40px;
  font-size: 120px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.1);
  z-index: 10;
  font-family: 'Arial Black', sans-serif;
  pointer-events: none;
}

.background-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: -1;
}

.pin-section {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.parallax-title {
  position: absolute;
  top: 10%;
  left: 5%;
  z-index: 5;
}

.title-main {
  font-size: 6rem;
  font-weight: 900;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.title-sub {
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0;
  letter-spacing: 8px;
  opacity: 0.8;
}

.horizontal-track {
  display: flex;
  height: 100vh;
  align-items: center;
}

.series-panel {
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  gap: 60px;
}

.series-info {
  flex: 0 0 30%;
  padding-right: 40px;
}

.series-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #fff, #ccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.series-desc {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 15px;
  opacity: 0.9;
}

.series-meta {
  font-size: 0.9rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.artwork-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 800px;
}

.artwork-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.artwork-item:hover {
  transform: scale(1.05);
}

.artwork-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.artwork-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.artwork-item:hover .artwork-overlay {
  transform: translateY(0);
}

.artwork-overlay h4 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.artwork-overlay p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.series-indicator {
  position: fixed;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background: white;
  transform: scale(1.3);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .series-panel {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 40px 20px;
  }

  .series-info {
    flex: none;
    padding-right: 0;
    margin-bottom: 40px;
  }

  .title-main {
    font-size: 3rem;
  }

  .artwork-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .floating-letter {
    font-size: 60px;
    bottom: 20px;
    left: 20px;
  }
}
</style>
