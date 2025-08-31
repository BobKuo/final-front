<template>
  <q-page>
    <!-- 主介紹區域 -->
    <div class="row justify-center text-center q-mb-lg fade-in-section" data-section="intro">
      <div class="col-4">
        <q-img src="~assets/logo.jpg" />
      </div>
      <div class="col-12 q-gutter-lg">
        <div class="text-h2 intro_title">I'm Judy</div>
        <div class="text-h6 about-description">
          <p>Judy Wang，本名王君儀，台灣台北人。</p>
          <p>臺師大大傳所畢業，曾任職中央社、奧美公關、痞客邦等傳播機構，現為全職圖文創作者。</p>
          <p>Judy擅長色彩鮮明、可愛療癒的畫風，注重作品的通俗性、趣味性以及讀者的互動性。</p>
          <p>曾發行實體繪本《普迪好忙》以及數位著色本《ㄅㄆㄇ在跳舞》及《快樂字母ABC》。</p>
          <p>《普迪好忙》曾入圍2020年亞洲插畫年度大賞。</p>
        </div>
      </div>
    </div>

    <!-- 主題描述區域 -->
    <div class="row q-pa-md q-gutter-md text-center fade-in-section" data-section="experience">
      <div class="col">
        <div>
          <q-img src="https://picsum.photos/300/200/?random=1" />
        </div>
      </div>
      <div class="col">
        <div>
          <h3>個人經歷與背景</h3>
          <p>這是個人經歷與背景的描述。</p>
        </div>
      </div>
    </div>

    <div class="row q-pa-md q-gutter-md text-center fade-in-section" data-section="creative">
      <div class="col">
        <div>
          <h3>創作過程與風格</h3>
          <p>這是創作過程的描述。</p>
        </div>
      </div>
      <div class="col">
        <div>
          <q-img src="https://picsum.photos/300/200/?random=2" />
        </div>
      </div>
    </div>

    <!-- 時間軸區域 -->
    <div class="q-px-xl q-py-md fade-in-section" data-section="timeline">
      <q-timeline :layout="layout" color="secondary">
        <q-timeline-entry heading> 作品時程演進 </q-timeline-entry>

        <q-timeline-entry
          title="幾何動物系列"
          subtitle="February 22, 1986"
          side="left"
          class="timeline-item"
        >
          <img
            class="timeline-image"
            src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1756628360/works/lckwgyes3c1roihkrscq.png"
          />
          <div>
            導航手裡部落前往贏得教師這次性感在那裡大幅本帖基本，金融一遍看到合理上一頁魅力字元不良水溝信箱貫徹格式現象出口，投資者上市陷入科技完全整理，翻譯過程多麼資訊而來心裡玻璃優秀為何掌握，姐姐發佈真是內地意義版權所有，友情連結來自東西，親自相機，屏幕變化，左右。
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="動物喝茶系列"
          subtitle="February 21, 1986"
          side="right"
          icon="delete"
          class="timeline-item"
        >
          <div>
            導航手裡部落前往贏得教師這次性感在那裡大幅本帖基本，金融一遍看到合理上一頁魅力字元不良水溝信箱貫徹格式現象出口，投資者上市陷入科技完全整理，翻譯過程多麼資訊而來心裡玻璃優秀為何掌握，姐姐發佈真是內地意義版權所有，友情連結來自東西，親自相機，屏幕變化，左右。
          </div>
        </q-timeline-entry>

        <q-timeline-entry heading>November, 2017</q-timeline-entry>

        <q-timeline-entry
          title="注音符號系列"
          subtitle="February 22, 1986"
          side="left"
          class="timeline-item"
        >
          <div>
            導航手裡部落前往贏得教師這次性感在那裡大幅本帖基本，金融一遍看到合理上一頁魅力字元不良水溝信箱貫徹格式現象出口，投資者上市陷入科技完全整理，翻譯過程多麼資訊而來心裡玻璃優秀為何掌握，姐姐發佈真是內地意義版權所有，友情連結來自東西，親自相機，屏幕變化，左右。
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="普迪系列"
          subtitle="February 22, 1986"
          side="right"
          color="orange"
          icon="done_all"
          class="timeline-item"
        >
          <img
            class="timeline-image"
            src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1755797776/works/ace181st4hot8cookfmh.jpg"
          />
          <div>
            導航手裡部落前往贏得教師這次性感在那裡大幅本帖基本，金融一遍看到合理上一頁魅力字元不良水溝信箱貫徹格式現象出口，投資者上市陷入科技完全整理，翻譯過程多麼資訊而來心裡玻璃優秀為何掌握，姐姐發佈真是內地意義版權所有，友情連結來自東西，親自相機，屏幕變化，左右。
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="白日夢系列"
          subtitle="February 22, 1986"
          side="left"
          class="timeline-item"
        >
          <div>
            導航手裡部落前往贏得教師這次性感在那裡大幅本帖基本，金融一遍看到合理上一頁魅力字元不良水溝信箱貫徹格式現象出口，投資者上市陷入科技完全整理，翻譯過程多麼資訊而來心裡玻璃優秀為何掌握，姐姐發佈真是內地意義版權所有，友情連結來自東西，親自相機，屏幕變化，左右。
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="生活雜記系列"
          subtitle="February 22, 1986"
          side="left"
          class="timeline-item"
        >
          <div>
            導航手裡部落前往贏得教師這次性感在那裡大幅本帖基本，金融一遍看到合理上一頁魅力字元不良水溝信箱貫徹格式現象出口，投資者上市陷入科技完全整理，翻譯過程多麼資訊而來心裡玻璃優秀為何掌握，姐姐發佈真是內地意義版權所有，友情連結來自東西，親自相機，屏幕變化，左右。
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>

    <!-- Footer 區域 -->
    <div class="footer-section text-center bg-judy-2 fade-in-section" data-section="footer">
      <div class="row">
        <!-- 訂閱與追蹤 -->
        <div class="col-12 col-sm-3">
          <h4>訂閱與追蹤</h4>
          <q-input
            v-model="newsletter.email"
            placeholder="輸入您的 Email"
            filled
            class="newsletter-input"
          >
            <template v-slot:append>
              <q-btn
                @click="subscribeNewsletter"
                label="訂閱"
                color="primary"
                flat
                :loading="newsletterLoading"
              />
            </template>
          </q-input>
          <p>訂閱我們的電子報，獲取最新消息。</p>
          <div class="footer-social-links">
            <q-btn
              v-for="social in SocialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              flat
              round
              :icon="social.icon"
              size="md"
              color="white"
              :aria-label="`追蹤我們的 ${social.name}`"
            />
          </div>
        </div>
        <!-- 作品導覽 -->
        <div class="col-12 col-sm-3">
          <h4>作品導覽</h4>
          <p>探索我們的最新作品和案例研究。</p>
        </div>
        <!-- 其他資訊-->
        <div class="col-12 col-sm-3">
          <h4>其他資訊</h4>
          <p>聯繫我們，了解更多資訊。</p>
        </div>
        <!-- logo -->
        <div class="col-12 col-sm-3">
          <q-img src="~assets/logo.jpg" />
        </div>
      </div>
      <div class="row justify-center">© 2023 Judy. All rights reserved.</div>
      <div class="row justify-center">Site by BobKuo</div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger)

// 時間軸響應式佈局
const $q = useQuasar()
const layout = computed(() => {
  return $q.screen.lt.sm ? 'dense' : $q.screen.lt.md ? 'comfortable' : 'loose'
})

// 訂閱功能
const newsletter = reactive({
  email: '',
})

const newsletterLoading = ref(false)

// Footer 社群媒體連結
const SocialLinks = ref([
  { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
  { name: 'Pinterest', icon: 'fab fa-pinterest', url: 'https://pinterest.com' },
  { name: 'TikTok', icon: 'fab fa-tiktok', url: 'https://tiktok.com' },
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com' },
])

// 訂閱電子報功能
const subscribeNewsletter = async () => {
  if (!newsletter.email) {
    $q.notify({
      type: 'warning',
      message: '請輸入 Email 地址',
      timeout: 2000,
      position: 'top',
    })
    return
  }

  newsletterLoading.value = true

  try {
    // 模擬 API 調用
    await new Promise((resolve) => setTimeout(resolve, 1000))

    $q.notify({
      type: 'positive',
      message: '訂閱成功！感謝您的支持',
      timeout: 3000,
      position: 'top',
    })

    newsletter.email = ''
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: '訂閱失敗，請稍後再試: ' + error.message,
      timeout: 3000,
      position: 'top',
    })
  } finally {
    newsletterLoading.value = false
  }
}

// 使用 gsap.context() 管理動畫
let ctx

onMounted(() => {
  // 創建 GSAP context
  ctx = gsap.context(() => {
    // 設定所有區塊的初始狀態（隱藏）
    gsap.set('.fade-in-section', {
      opacity: 0,
      y: 50,
    })

    // 為每個區塊設定 ScrollTrigger 動畫
    gsap.utils.toArray('.fade-in-section').forEach((section, index) => {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%', // 當區塊頂部到達視窗 80% 位置時觸發
          end: 'bottom 20%',
          toggleActions: 'play none none reverse', // 進入時播放，離開時反轉
          // markers: true, // 開發時可以開啟來看觸發點
        },
        delay: index * 0.1, // 每個區塊延遲 0.1 秒，創造連續效果
      })
    })

    // 時間軸項目的動畫
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50, // 奇偶項目從不同方向進入
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.2,
        },
      )
    })

    // Footer 社群媒體按鈕的動畫
    gsap.utils.toArray('.footer-social-links .q-btn').forEach((btn, index) => {
      gsap.fromTo(
        btn,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.footer-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.5 + index * 0.1,
        },
      )
    })
  }) // 這裡的範圍是整個組件
})

onUnmounted(() => {
  // 清理 GSAP context，會自動清理所有相關的動畫和 ScrollTrigger
  if (ctx) {
    ctx.revert()
  }
})
</script>

<style scoped>
.intro_title {
  font-family: 'Bandeins Sans & Strange Variable';
  color: #ff6f61;
}

.about-description {
  font-family: 'Sora', sans-serif;
}

.footer-social-links {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.timeline-image {
  width: 50%;
  object-fit: contain;
}

.newsletter-input {
  background: white;
  border-radius: 8px;
  margin: 10%;
}

/* ScrollTrigger 動畫的初始狀態 */
.fade-in-section {
  opacity: 0;
  transform: translateY(50px);
}

.timeline-item {
  opacity: 0;
}

/* 確保動畫完成後的最終狀態 */
.fade-in-section.animate-complete,
.timeline-item.animate-complete {
  opacity: 1;
  transform: translateY(0);
}

/* 響應式設計調整 */
@media (max-width: 768px) {
  .fade-in-section {
    transform: translateY(30px); /* 手機版減少位移距離 */
  }
}
</style>
