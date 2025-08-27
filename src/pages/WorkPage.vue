<template>
  <q-page>
    <div id="index" class="flex flex-center text-h1">start</div>
    <div id="container">
      <div
        v-for="(series, index) in workSeries"
        :key="index"
        :style="{ backgroundColor: series.color }"
        class="slide flex flex-center text-h1"
      >
        {{ series.title }}
      </div>
    </div>
    <div id="index" class="flex flex-center text-h1">end</div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'none' })

// 定義 slides 資料
// 作品系列資料
const workSeries = ref([
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
])

onMounted(() => {
  let sections = gsap.utils.toArray('.slide')

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    scrollTrigger: {
      trigger: '#container',
      start: 'top top+=50',
      end: `+=${workSeries.value.length * 1000}`, // 根據 slide 數量動態調整
      scrub: 1,
      snap: (value) => {
        const total = sections.length - 1
        const slide = Math.round(value * total)
        return slide / total
      },
      pin: true,
      markers: true,
    },
  })
})
</script>

<style scoped>
#index {
  height: calc(100vh - 100px);
  width: 100vw;
  border: 5px solid red;
}

#container {
  /* height: calc(100vh - 50px);
  width: 100vw; */

  display: flex;
  flex-direction: row;
  overflow-x: hidden;
}

.slide {
  flex: 0 0 100%;
  height: calc(100vh - 50px);
}
</style>
