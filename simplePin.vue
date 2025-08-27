<template>
  <q-page>
    <div id="container">
      <div class="slide grey bg-grey flex flex-center text-h1">start</div>
      <div class="slide purple bg-purple flex flex-center text-h1">h1</div>
      <div class="slide cyan bg-cyan flex flex-center text-h1">h2</div>
    </div>
    <div id="index" class="flex flex-center text-h1">end</div>
  </q-page>
</template>
<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'none', duration: 2 })

onMounted(() => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#container', // 或 q-page
        start: 'top top+=50',
        end: '+=4000', // 根據面板數量調整
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        markers: true, // 除錯用，可移除
      },
    })
    // .from('.grey', { xPercent: 100 })
    .from('.purple', { xPercent: 100 })
    .from('.cyan', { xPercent: 100 })
})
</script>
<style scoped>
#index {
  height: calc(100vh - 100px);
  /* height: 100vh; */
  width: 100vw;

  border: 5px solid red;
}
#container {
  position: relative;

  height: calc(100vh - 50px);
  width: 100vw;
}
.slide {
  position: absolute;

  height: 100%;
  width: 100%;
}
</style>
