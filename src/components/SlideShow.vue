<template>
  <div class="slide-show" ref="slideShowContainer">
    <section v-for="(slide, index) in slides" :key="index" class="slide">
      <div class="slide__outer">
        <div class="slide__inner">
          <div class="slide__content" :style="{ backgroundColor: slide.backgroundColor }">
            <div class="slide__container">
              <h2 class="slide__heading">{{ slide.title }}</h2>
              <figure class="slide__img-cont">
                <img class="slide__img" :src="slide.image" :alt="slide.title" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="overlay">
      <div class="overlay__content">
        <p class="overlay__count">0<span class="count">1</span></p>
        <figure class="overlay__img-cont">
          <img
            v-for="(slide, slideIndex) in slides"
            :key="slideIndex"
            class="image"
            :src="slide.overlayImage"
            :data-slide="slideIndex"
            :data-img="0"
          />
        </figure>
      </div>
    </section>

    <footer v-if="showFooter">
      <a href="https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.observe()"
        >ScrollTrigger.observe()</a
      >
      <p>GSAP demo</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps, ref } from 'vue'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

// 註冊 GSAP 插件
gsap.registerPlugin(Observer)

// 定義 props
const props = defineProps({
  slides: {
    type: Array,
    required: true,
    validator: (slides) => {
      return slides.every(
        (slide) => slide.title && slide.image && slide.overlayImage && slide.backgroundColor,
      )
    },
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
})

// 使用 props 中的 slides 資料
const { slides } = props

// 模板引用
const slideShowContainer = ref(null)

let observer = null
let animating = false
let currentIndex = 0

onMounted(() => {
  console.clear()

  const sections = gsap.utils.toArray('.slide')
  const outerWrappers = gsap.utils.toArray('.slide__outer')
  const innerWrappers = gsap.utils.toArray('.slide__inner')
  const count = document.querySelector('.count')
  const wrap = gsap.utils.wrap(0, sections.length)

  gsap.set(outerWrappers, { xPercent: 100 })
  gsap.set(innerWrappers, { xPercent: -100 })
  gsap.set('.slide:nth-of-type(1) .slide__outer', { xPercent: 0 })
  gsap.set('.slide:nth-of-type(1) .slide__inner', { xPercent: 0 })

  function gotoSection(index, direction) {
    animating = true
    index = wrap(index)

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

    // 獲取當前和下一個 slide 的 overlay 圖片
    const currentOverlayImage = slideShowContainer.value.querySelector(
      `.image[data-slide="${currentIndex}"]`,
    )
    const nextOverlayImage = slideShowContainer.value.querySelector(`.image[data-slide="${index}"]`)

    gsap.set([sections, currentOverlayImage, nextOverlayImage], { zIndex: 0, autoAlpha: 0 })
    gsap.set([sections[currentIndex], nextOverlayImage], { zIndex: 1, autoAlpha: 1 })
    gsap.set([sections[index], currentOverlayImage], { zIndex: 2, autoAlpha: 1 })

    tl.set(count, { text: index + 1 }, 0.32)
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
          '--width': 800,
          xPercent: 30 * direction,
        },
        0,
      )
      .fromTo(
        nextHeading,
        {
          '--width': 800,
          xPercent: -30 * direction,
        },
        {
          '--width': 200,
          xPercent: 0,
        },
        0,
      )

    // 下一個 slide 的 overlay 圖片動畫
    tl.fromTo(
      nextOverlayImage,
      {
        xPercent: 125 * direction,
        scaleX: 1.5,
        scaleY: 1.3,
      },
      {
        xPercent: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 1,
      },
      0,
    )

    // 當前 slide 的 overlay 圖片動畫
    tl.fromTo(
      currentOverlayImage,
      {
        xPercent: 0,
        scaleX: 1,
        scaleY: 1,
      },
      {
        xPercent: -125 * direction,
        scaleX: 1.5,
        scaleY: 1.3,
      },
      0,
    )

    // 下一個 slide 的背景圖片縮放動畫
    const nextSlideImg = sections[index].querySelector('.slide__img')
    tl.fromTo(
      nextSlideImg,
      {
        scale: 2,
      },
      {
        scale: 1,
      },
      0,
    )

    tl.timeScale(0.8)

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

.slide-show {
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

footer {
  position: fixed;
  z-index: 999;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  width: 100%;
  height: 7em;
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.2rem, 2vw, 1rem);
}

a {
  color: #fff;
  text-decoration: none;
}

.slide {
  height: 100%;
  width: 100%;
  top: 0;
  position: fixed;

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
    max-width: 1400px;
    width: 100vw;
    margin: 0 auto;
    height: 90vh;
    margin-bottom: 10vh;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    padding: 0 1rem;
  }

  &__heading {
    --width: 200;
    display: block;
    text-align: left;
    font-family: 'Bandeins Sans & Strange Variable';
    font-size: clamp(5rem, 15vw, 15rem);
    font-weight: 900;
    font-variation-settings: 'wdth' var(--width);
    margin: 0;
    padding: 0;
    color: #f2f1fc;
    z-index: 999;
    mix-blend-mode: difference;
    grid-area: 2 / 2 / 3 / 10;
    align-self: end;
  }

  &__img-cont {
    margin-top: 4rem;
    grid-area: 2 / 1 / 7 / 8;
    overflow: hidden;
    border-radius: 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;

  &__content {
    max-width: 1400px;
    width: 100vw;
    margin: 0 auto;
    padding: 0 1rem;
    height: 90vh;
    margin-bottom: 10vh;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  &__img-cont {
    position: relative;
    overflow: hidden;
    margin: 0;
    grid-area: 4 / 3 / 9 / 11;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  &__count {
    grid-area: 3 / 10 / 4 / 10;
    font-size: clamp(3rem, 4vw, 15rem);
    margin: 0;
    padding: 0;
    text-align: right;
    border-bottom: 7px white solid;
  }
}

@media screen and (min-width: 900px) {
  .overlay__content,
  .slide__container {
    padding: 0 3rem;
    margin-top: 10vh;
    height: 80vh;
  }

  .overlay__img-cont {
    grid-area: 5 / 4 / 10 / 11;
  }

  .overlay__count {
    grid-area: 3 / 10 / 4 / 11;
  }

  .slide__img-cont {
    margin-top: 0;
    grid-area: 3 / 2 / 8 / 7;
  }

  .slide__heading {
    grid-area: 1 / 1 / 4 / 10;
  }
}
</style>
