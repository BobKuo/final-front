<template>
  <q-page>
    <!-- <div id="index" class="flex flex-center text-h1">start</div> -->
    <div id="container">
      <div
        v-for="(series, index) in workSeries"
        :key="index"
        :style="{ backgroundColor: series.color }"
        class="slide flex flex-center text-h1"
      >
        <div
          class="work-display"
          :class="{
            'justify-start': index % 2 === 0,
            'justify-end': index % 2 !== 0,
          }"
        >
          <div class="img_container">
            <img :src="series.works[0].image" alt="" />
          </div>

          <div
            class="content-overlay"
            :class="{ 'content-right': index % 2 === 0, 'content-left': index % 2 !== 0 }"
          >
            <div class="series-title">{{ series.title }}</div>
            <div class="series-description q-mt-xl q-mb-lg">{{ series.description }}</div>
          </div>
        </div>
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
        title: '長頸鹿喝茶',
        image:
          'https://res.cloudinary.com/dm5rlvzns/image/upload/v1755832805/works/samezymj56l3pff5mehj.jpg',
        description: '這是一個關於動物與茶的系列作品，探索它們之間的微妙關係。',
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
      {
        id: 5,
        title: '霓虹夜景',
        image:
          'https://res.cloudinary.com/dm5rlvzns/image/upload/v1755833079/works/pvoeot36vhpdpj7csdc2.jpg',
        medium: '數位繪畫',
      },
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
      end: `+=${workSeries.value.length * 300}`, // 根據 slide 數量動態調整
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

.work-display {
  width: 80%;
  height: 80%;

  position: relative;

  /* border: 1px solid black; */

  display: flex;
  align-items: center;
}

.img_container {
  width: 80%;
  height: 100%;
  position: relative;

  /* border: 1px solid blue; */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.content-overlay {
  position: absolute;

  top: 50%;
  transform: translateY(-50%);

  background: rgba(255, 255, 255, 0.5);
  color: black;

  /* padding: 5rem; */
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 10;

  width: 30%;
  height: auto;
}

/* 奇數張 series (index 0, 2, 4...) - content 在右邊 */
.content-right {
  right: 0;
}

/* 偶數張 series (index 1, 3, 5...) - content 在左邊 */
.content-left {
  left: 0;
}

.series-title {
  font-family: 'Dela Gothic One', sans-serif;
  font-size: 90px;
  /* font-weight: bold; */
  color: blue;
  text-align: center;
}

.series-description {
  font-size: 40px;
  color: gray;
  padding: 10px 20px;
}
</style>
