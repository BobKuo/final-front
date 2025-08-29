<template>
  <div class="index-page">
    <!-- 載入狀態 -->
    <div v-if="slides.length === 0" class="loading">
      <q-spinner size="50px" color="white" />
      <p>載入中...</p>
    </div>

    <!-- 主要內容，只在有資料時顯示 -->
    <template v-else>
      <section v-for="(slide, index) in slides" :key="index" class="slide">
        <div class="slide__outer">
          <div class="slide__inner">
            <div class="slide__content" :class="`bg-judy-${(index % 5) + 1}`">
              <div class="slide__container">
                <h2 class="slide__heading" v-html="slide.name"></h2>
                <div class="slide__img-wrapper">
                  <!-- <p>{{ work.images[0] }}</p> -->
                  <img
                    v-for="(work, workIndex) in slide.works"
                    :key="workIndex"
                    class="slide__img"
                    :src="work.images[0]"
                    :alt="`${slide.name} - ${workIndex + 1}`"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="overlay text-judy-7">
        <div class="overlay__content">
          <figure class="overlay__img-cont">
            <img v-for="(slide, index) in slides" :key="index" class="image" :src="slide.cover" />
          </figure>
          <p class="overlay__count overlay__count--line1"><span class="count-line1"></span></p>
          <p class="overlay__count overlay__count--line2"><span class="count-line2"></span></p>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { TextPlugin } from 'gsap/TextPlugin'
import seriesService from 'src/services/series'

// 註冊 GSAP 插件
gsap.registerPlugin(Observer)
gsap.registerPlugin(TextPlugin)

// 定義幻燈片資料
const slides = ref([])

let observer = null
let animating = false
let currentIndex = 0

// const slides = ref([
//   {
//     name: ' 動物喝茶系列',
//     description: '1 動物茶',
//     works: [
//       {
//         images: [
//           'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=80&w=400',
//         ],
//       },
//     ],
//     cover:
//       'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTU4Mw&ixlib=rb-1.2.1&q=80&w=800',
//     backgroundColor: '#6d597a',
//   },
//   {
//     name: 'ALPHABET',
//     description: '2字母',
//     works: [
//       {
//         images: [
//           'https://images.unsplash.com/photo-1558603668-6570496b66f8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=85&w=400',
//         ],
//       },
//       {
//         images: [
//           'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=85&w=400',
//         ],
//       },
//     ],
//     cover:
//       'https://images.unsplash.com/photo-1594666757003-3ee20de41568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTcwOA&ixlib=rb-1.2.1&q=80&w=800',
//     backgroundColor: '#355070',
//   },
//   {
//     name: 'GEOMETRY-ANIMAL',
//     description: '3幾何動物',
//     works: [
//       {
//         images: [
//           'https://images.unsplash.com/photo-1537165924986-cc3568f5d454?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=85&w=400',
//         ],
//       },
//       {
//         images: [
//           'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=80&w=400',
//         ],
//       },
//       {
//         images: [
//           'https://images.unsplash.com/photo-1544787219-7f47ccb76574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=80&w=400',
//         ],
//       },
//     ],
//     cover:
//       'https://images.unsplash.com/photo-1579830341096-05f2f31b8259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTQ5Ng&ixlib=rb-1.2.1&q=80&w=800',
//     backgroundColor: '#b56576',
//   },
//   {
//     name: 'PUTTY',
//     description: '4油灰',
//     works: [
//       {
//         images: [
//           'https://images.unsplash.com/photo-1589271243958-d61e12b61b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=80&w=400',
//         ],
//       },
//       {
//         images: [
//           'https://images.unsplash.com/photo-1493612276216-ee3925520721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=80&w=400',
//         ],
//       },
//       {
//         images: [
//           'https://images.unsplash.com/photo-1537165924986-cc3568f5d454?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=85&w=400',
//         ],
//       },
//       {
//         images: [
//           'https://images.unsplash.com/photo-1544787219-7f47ccb76574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=80&w=400',
//         ],
//       },
//     ],
//     cover:
//       'https://images.unsplash.com/photo-1603771628302-c32c88e568e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTUxNg&ixlib=rb-1.2.1&q=80&w=800',
//     backgroundColor: '#9a8c98',
//   },
// ])

const initializeGSAP = () => {
  console.clear()

  const sections = gsap.utils.toArray('.slide')
  const images = gsap.utils.toArray('.image') // 移除 .reverse()
  const outerWrappers = gsap.utils.toArray('.slide__outer')
  const innerWrappers = gsap.utils.toArray('.slide__inner')
  const countLine1 = document.querySelector('.count-line1')
  const countLine2 = document.querySelector('.count-line2')
  const wrap = gsap.utils.wrap(0, sections.length)

  gsap.set(outerWrappers, { xPercent: 100 })
  gsap.set(innerWrappers, { xPercent: -100 })
  gsap.set('.slide:nth-of-type(1) .slide__outer', { xPercent: 0 })
  gsap.set('.slide:nth-of-type(1) .slide__inner', { xPercent: 0 })

  // 設置初始圖片顯示狀態
  gsap.set(images, { autoAlpha: 0 })
  if (images[0]) {
    gsap.set(images[0], { autoAlpha: 1 })
  }

  // 分割 description 並設定到兩個區塊的函數
  function setDescriptionText(description) {
    const lines = (description || '').split(/\\r\\n|\r\n|\n/)
    const line1 = lines[0] || ''
    const line2 = lines[1] || ''

    gsap.set(countLine1, { text: line1 })
    gsap.set(countLine2, { text: line2 })
  }

  // 確保 slides 資料存在
  if (slides.value.length > 0 && slides.value[currentIndex]) {
    setDescriptionText(slides.value[currentIndex].description)
  }

  function gotoSection(index, direction) {
    animating = true
    index = wrap(index)

    // 確保索引有效且資料存在
    if (!slides.value[index]) {
      animating = false
      return
    }

    let tl = gsap.timeline({
      defaults: { duration: 1, ease: 'expo.inOut' },
      onComplete: () => {
        animating = false
      },
    })

    let currentSection = sections[currentIndex]
    let heading = currentSection.querySelector('.slide__heading')
    let nextSection = sections[index]
    let nextHeading = nextSection.querySelector('.slide__heading')

    // 獲取當前和下一個 slide 的圖片
    let currentSlideImages = currentSection.querySelectorAll('.slide__img')
    let nextSlideImages = nextSection.querySelectorAll('.slide__img')

    gsap.set([sections, images], { zIndex: 0, autoAlpha: 0 })
    gsap.set([sections[currentIndex], images[currentIndex]], { zIndex: 1, autoAlpha: 1 })
    gsap.set([sections[index], images[index]], { zIndex: 2, autoAlpha: 1 })

    // 清空兩行文字，然後設定新的內容
    const lines = (slides.value[index].description || '').split(/\\r\\n|\r\n|\n/)
    const line1 = lines[0] || ''
    const line2 = lines[1] || ''

    tl.set([countLine1, countLine2], { text: '' }, 0.32)
      .to(
        countLine1,
        {
          text: line1,
          duration: 0.32,
          ease: 'none',
        },
        0.32,
      )
      .to(
        countLine2,
        {
          text: line2,
          duration: 0.32,
          ease: 'none',
        },
        0.32,
      )
      .fromTo(
        outerWrappers[index],
        {
          xPercent: 100 * direction,
        },
        { xPercent: 0 },
        0,
      )
      .fromTo(
        innerWrappers[index],
        {
          xPercent: -100 * direction,
        },
        { xPercent: 0 },
        0,
      )
      .to(
        heading,
        {
          // '--width': 800,
          // xPercent: 30 * direction,
        },
        0,
      )
      .fromTo(
        nextHeading,
        {
          // '--width': 800,
          // xPercent: -30 * direction,
        },
        {
          // '--width': 200,
          // xPercent: 0,
        },
        0,
      )
      .fromTo(
        images[index],
        {
          xPercent: 125 * direction,
          scaleX: 1.5,
          scaleY: 1.3,
        },
        { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
        0,
      )
      .fromTo(
        images[currentIndex],
        { xPercent: 0, scaleX: 1, scaleY: 1 },
        {
          xPercent: -125 * direction,
          scaleX: 1.5,
          scaleY: 1.3,
        },
        0,
      )
      .fromTo(currentSlideImages, { scale: 1 }, { scale: 1.2 }, 0)
      .fromTo(
        nextSlideImages,
        {
          scale: 2,
        },
        { scale: 1 },
        0,
      )
      .timeScale(0.8)

    currentIndex = index
  }

  observer = Observer.create({
    type: 'wheel,touch,pointer',
    preventDefault: true,
    wheelSpeed: -1,
    onUp: () => {
      console.log('down')
      if (animating) return
      gotoSection(currentIndex + 1, +1)
    },
    onDown: () => {
      console.log('up')
      if (animating) return
      gotoSection(currentIndex - 1, -1)
    },
    tolerance: 10,
  })

  function logKey(e) {
    console.log(e.code)
    if ((e.code === 'ArrowUp' || e.code === 'ArrowLeft') && !animating) {
      gotoSection(currentIndex - 1, -1)
    }
    if (
      (e.code === 'ArrowDown' ||
        e.code === 'ArrowRight' ||
        e.code === 'Space' ||
        e.code === 'Enter') &&
      !animating
    ) {
      gotoSection(currentIndex + 1, 1)
    }
  }

  document.addEventListener('keydown', logKey)

  // 清理函數，儲存到組件實例以便在 onUnmounted 中使用
  window.cleanupKeyListener = () => {
    document.removeEventListener('keydown', logKey)
  }
}

const getSeries = async () => {
  try {
    const response = await seriesService.get()
    slides.value = response.data.series
    console.log('Fetched slides:', slides.value)

    // 等待 DOM 更新後初始化 GSAP
    await nextTick()
    if (slides.value.length > 0) {
      initializeGSAP()
    }
  } catch (error) {
    console.error('Error fetching series:', error)
  }
}

onMounted(async () => {
  await getSeries()
})

onUnmounted(() => {
  // 清理事件監聽器
  if (observer) {
    observer.kill()
  }
  if (window.cleanupKeyListener) {
    window.cleanupKeyListener()
    delete window.cleanupKeyListener
  }
})
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'Bandeins Sans & Strange Variable';
  src: url('https://res.cloudinary.com/dldmpwpcp/raw/upload/v1566406079/BandeinsStrangeVariable_esetvq.ttf');
}
@import url('https://fonts.googleapis.com/css2?family=Sora&display=swap');

.index-page {
  * {
    box-sizing: border-box;
    user-select: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  figure {
    margin: 0;
    overflow: hidden;
  }

  height: 100vh;
  height: -webkit-fill-available;
  overflow: hidden;
  margin: 0;
  padding: 0;
  color: #fff;
  background: #4361ee;
  font-family: 'Sora', sans-serif;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 9999;

  p {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
}

.slide {
  height: calc(100vh - 100px);
  width: 100%;
  // top: 0;
  position: fixed;
  // visibility: hidden;

  top: var(--q-header-height); /* 避開 q-header */
  bottom: var(--q-footer-height); /* 避開 q-footer */

  &__outer,
  &__inner {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
  }

  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(20, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    // padding: 1rem;

    // border: 5px solid red;

    // 顯示 10x10 grid 格線（開發用）
    // &::after {
    //   content: '';
    //   position: absolute;
    //   inset: 0;
    //   pointer-events: none;
    //   z-index: 1000;
    //   background-image:
    //     linear-gradient(to right, rgba(255, 255, 255, 0.6) 1px, transparent 1px),
    //     linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 1px, transparent 1px);
    //   background-size: 10% 10%;
    // }
  }

  &__heading {
    --width: 200;
    display: block;
    text-align: left;
    font-family: 'Bandeins Sans & Strange Variable';
    font-size: clamp(4rem, 12vw, 12rem);
    font-weight: 900;
    font-variation-settings: 'wdth' var(--width);
    margin: 0;
    padding: 0;
    color: #f2f1fc;
    z-index: 999;
    mix-blend-mode: difference;
    grid-area: 2 / 2 / 4 / 10;
    align-self: center;
    line-height: 0.9;
    overflow: hidden;

    // border: 5px solid purple;
  }

  &__img-wrapper {
    margin-top: 4rem;
    grid-area: 2 / 1 / 7 / 8;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-content: flex-start;
    height: 100%;
    overflow: hidden;

    // border: 5px solid hotpink;
  }

  &__img {
    width: calc(50% - 0.25rem);
    height: calc(50% - 0.25rem);
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;

    // 當只有一張圖時，佔滿整個 wrapper
    &:only-child {
      width: 100%;
      height: 100%;
    }
  }
}

.overlay {
  position: fixed;
  // top: 0;
  // bottom: 0;
  // top: var(--q-header-height); /* 避開 q-header */
  height: calc(100vh - 100px); /* 計算實際可用高度 */
  left: 0;
  right: 0;
  z-index: 2;

  &__content {
    // max-width: 1400px;
    width: 100%;
    height: 100%;
    // margin: 0 auto;
    // padding: 0 1rem;
    // height: 90vh;
    // margin-bottom: 10vh;

    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(20, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    // border: 5px solid yellow;

    // 顯示格線（開發用）
    position: relative; // 確保 ::after 定位正確

    // &::after {
    //   content: '';
    //   position: absolute;
    //   inset: 0;
    //   pointer-events: none;
    //   z-index: 1000;
    //   background-image:
    //     linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
    //     linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px);
    //   background-size: calc(100% / 20) calc(100% / 20);
    // }
  }

  &__img-cont {
    position: relative;
    overflow: hidden;
    margin: 0;
    grid-area: 1 / 1 / 21 / 21;
    // border: 5px solid green;
    z-index: 1; // 背景圖片層級

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  &__count {
    // font-size: clamp(1.5rem, 3vw, 3rem);
    font-size: 3rem;
    margin: 0;
    padding: 0;
    text-align: right;
    font-weight: bold;
    letter-spacing: 0.1em;
    min-height: 1em;
    z-index: 10;
    position: absolute;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    line-height: 1.2;
    right: 20px;

    // 第一行文字定位 - 在第二行上方
    &--line1 {
      top: calc(60% - 4rem); // 再下移 10%
    }

    // 第二行文字定位 - 在原本單行的位置
    &--line2 {
      top: 60%; // 再下移 10%
    }

    // border: 5px solid cyan;
  }
}

@media screen and (min-width: 900px) {
  .overlay__img-cont {
    grid-area: 9 / 10 / 20 / 20;
  }

  .overlay__count {
    grid-area: 8 / 12 / 10 / 20;
  }

  .slide__img-wrapper {
    margin-top: 0;
    grid-area: 6 / 2 / 20 / 11;
  }

  .slide__heading {
    grid-area: 1 / 3 / 8 / 21;
  }
}
</style>
