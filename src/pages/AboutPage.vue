<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-4">
        <q-img src="~assets/logo.jpg" />
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <div class="text-h2 q-mb-lg">我是Judy</div>
        <div class="about-description">
          我們致力於創造美好的數位體驗，讓每一個瞬間都充滿意義。我們致力於創造美好的數位體驗，讓每一個瞬間都充滿意義。我們致力於創造美好的數位體驗，讓每一個瞬間都充滿意義。我們致力於創造美好的數位體驗，讓每一個瞬間都充滿意義。我們致力於創造美好的數位體驗，讓每一個瞬間都充滿意義。我們致力於創造美好的數位體驗，讓每一個瞬間都充滿意義。
        </div>
      </div>
    </div>
    <!-- 主題描述區域 -->
    <div class="row q-pa-md q-gutter-md text-center">
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
    <div class="row q-pa-md q-gutter-md text-center">
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
    <div class="q-px-xl q-py-md">
      <q-timeline :layout="layout" color="secondary">
        <q-timeline-entry heading> 作品時程演進 </q-timeline-entry>

        <q-timeline-entry title="幾何動物系列" subtitle="February 22, 1986" side="left">
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
        >
          <div>
            導航手裡部落前往贏得教師這次性感在那裡大幅本帖基本，金融一遍看到合理上一頁魅力字元不良水溝信箱貫徹格式現象出口，投資者上市陷入科技完全整理，翻譯過程多麼資訊而來心裡玻璃優秀為何掌握，姐姐發佈真是內地意義版權所有，友情連結來自東西，親自相機，屏幕變化，左右。
          </div>
        </q-timeline-entry>

        <q-timeline-entry heading>November, 2017</q-timeline-entry>

        <q-timeline-entry title="注音符號系列" subtitle="February 22, 1986" side="left">
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
        >
          <img
            class="timeline-image"
            src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1755797776/works/ace181st4hot8cookfmh.jpg"
          />
          <div>
            導航手裡部落前往贏得教師這次性感在那裡大幅本帖基本，金融一遍看到合理上一頁魅力字元不良水溝信箱貫徹格式現象出口，投資者上市陷入科技完全整理，翻譯過程多麼資訊而來心裡玻璃優秀為何掌握，姐姐發佈真是內地意義版權所有，友情連結來自東西，親自相機，屏幕變化，左右。
          </div>
        </q-timeline-entry>

        <q-timeline-entry title="白日夢系列" subtitle="February 22, 1986" side="left">
          <div>
            導航手裡部落前往贏得教師這次性感在那裡大幅本帖基本，金融一遍看到合理上一頁魅力字元不良水溝信箱貫徹格式現象出口，投資者上市陷入科技完全整理，翻譯過程多麼資訊而來心裡玻璃優秀為何掌握，姐姐發佈真是內地意義版權所有，友情連結來自東西，親自相機，屏幕變化，左右。
          </div>
        </q-timeline-entry>

        <q-timeline-entry title="生活雜記系列" subtitle="February 22, 1986" side="left">
          <div>
            導航手裡部落前往贏得教師這次性感在那裡大幅本帖基本，金融一遍看到合理上一頁魅力字元不良水溝信箱貫徹格式現象出口，投資者上市陷入科技完全整理，翻譯過程多麼資訊而來心裡玻璃優秀為何掌握，姐姐發佈真是內地意義版權所有，友情連結來自東西，親自相機，屏幕變化，左右。
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>

    <!-- Footer 區域 -->
    <div class="footer-section text-center bg-judy-2">
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
import { ref, reactive, computed } from 'vue'
import { useQuasar } from 'quasar'

// 時間軸響應式佈局
const $q = useQuasar()
const layout = computed(() => {
  return $q.screen.lt.sm ? 'dense' : $q.screen.lt.md ? 'comfortable' : 'loose'
})

// 訂閱功能
const newsletter = reactive({
  email: '',
})

// Footer 社群媒體連結
const SocialLinks = ref([
  { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
  { name: 'Pinterest', icon: 'fab fa-pinterest', url: 'https://pinterest.com' },
  { name: 'TikTok', icon: 'fab fa-tiktok', url: 'https://tiktok.com' },
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com' },
])
</script>
<style scoped>
/* .footer-section {
  background-color: var(--judy-2);
} */
.about-description {
  margin: 0 20%;
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

/*  */
.newsletter-input {
  background: white;
  border-radius: 8px;
  margin: 10%;
}
</style>
