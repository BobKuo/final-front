<template>
  <q-page class="work-showcase">
    <!-- 固定的字母動畫元素 -->
    <div ref="letterElement" class="floating-letter">J</div>

    <!-- 主要內容區域 -->
    <section ref="pinSection" class="pin-section">
      <!-- 橫向滑動軌道 -->
      <div ref="track" class="horizontal-track">
        <div
          v-for="(series, seriesIdx) in workSeries"
          :key="series.id"
          class="series-panel"
          :data-series="seriesIdx"
        ></div>
      </div>
    </section>
  </q-page>
</template>
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'

// Refs
const pinSection = ref(null)
const letterElement = ref(null)

let ctx = null

onMounted(async () => {
  await nextTick()
  initAnimations()
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})

// 初始化動畫
const initAnimations = () => {
  const section = pinSection.value
  const letter = letterElement.value

  // 計算總滑動距離
  const panels = gsap.utils.toArray('.series-panel')
  const totalWidth = panels.reduce((acc, panel) => acc + panel.offsetWidth, 0)
  const scrollDistance = totalWidth - window.innerWidth

  // 設定初始狀態
  gsap.set(letter, { scale: 1, rotation: 0 })

  // 字母動畫（沿底部移動並旋轉）
  gsap.to(letterElement, {
    x: () => window.innerWidth - 150,
    rotation: 360,
    scale: 1.5,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${scrollDistance}`,
      scrub: 1,
      markers: true,
    },
  })
}
//
</script>
<style scoped>
.work-showcase {
  /* background: #1a1a1a; */
  /* color: white; */
  background-color: cadetblue;
  color: green;
}
.floating-letter {
  position: fixed;
  bottom: 40px;
  left: 40px;

  font-size: 120px;
  font-weight: bold;
  /* color: rgba(255, 255, 255, 0.1); */
  z-index: 10;

  font-family: 'Arial Black', sans-serif;
  pointer-events: none;
}

/* section */
.pin-section {
  height: calc(100vh - var(--app-header-height) - var(--app-footer-height));
  position: relative;

  background-color: pink;
}
</style>
