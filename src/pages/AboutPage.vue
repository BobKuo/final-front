<template>
  <q-page>
    <div class="row justify-center text-center q-mb-lg">
      <div class="col-4">
        <q-img src="~assets/about.png" />
      </div>
      <div class="col-12 q-gutter-lg">
        <div class="text-h2 intro_title">I'm Judy</div>
        <div class="text-h6 font-sora">
          <p>Judy Wang，台灣台北人。</p>
          <p>臺師大大傳所畢業，曾任職中央社、奧美公關、痞客邦等傳播機構，現為全職圖文創作者。</p>
          <br />
          <p>Judy擅長色彩鮮明、可愛療癒的畫風，注重作品的通俗性、趣味性以及讀者的互動性。</p>
          <p>曾發行實體繪本《普迪好忙》以及數位著色本《ㄅㄆㄇ在跳舞》及《快樂字母ABC》。</p>
          <p>《普迪好忙》曾入圍2020年亞洲插畫年度大賞。</p>
        </div>
      </div>
    </div>
    <!-- 主題描述區域1 -->
    <div class="row q-pa-md q-mx-xl q-mb-md q-gutter-md text-center font-sora">
      <div class="col flex justify-end">
        <q-img
          src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1756817454/%E9%97%9C%E6%96%BC%E6%88%91_%E5%B1%95%E8%A6%BD%E7%B6%93%E6%AD%B7_%E5%88%86%E9%A1%9E%E5%B0%81%E9%9D%A2_ju8kyp.png"
          fit="contain"
          width="100%"
        />
      </div>
      <div class="col">
        <div class="q-px-xl">
          <h3 class="text-left">個人經歷/展覽</h3>
          <div class="row justify-start">
            <div class="text-h6 text-left text-grey-9">
              <p>
                2020/2019 味全文教基金會藝術講師<br />
                2019 台灣繪本協會行動師資<br />
                2019 蘭陽繪本創作營<br />
                2019 繪本創作個展-普迪好忙原畫展<br />
                2019 繪本創作聯展-繪本下午茶<br />
                2018 陳璐茜繪本創作師資班25期學員<br />
                2018 學好教育機構藝術老師
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-separator></q-separator>
    <!-- 時間軸區域 -->
    <div class="q-px-xl q-py-md fade-in-section" data-section="timeline">
      <q-timeline :layout="layout" color="secondary">
        <q-timeline-entry heading> 著作歷程 </q-timeline-entry>

        <q-timeline-entry
          title="繪本《小畫家與大畫家》（雙人創作／獨立出版）"
          subtitle="October, 2021"
          side="left"
          class="timeline-item"
        >
          <img
            class="timeline-image"
            src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1756817464/%E9%97%9C%E6%96%BC%E6%88%91_%E8%91%97%E4%BD%9C_2021%E7%B9%AA%E6%9C%AC_%E5%B0%8F%E7%95%AB%E5%AE%B6%E8%88%87%E5%A4%A7%E7%95%AB%E5%AE%B6_%E6%9B%B8%E7%B1%8D%E5%B0%81%E9%9D%A2_y5hv47.jpg"
          />
          <!-- <div>這邊可以放簡述</div> -->
        </q-timeline-entry>

        <q-timeline-entry
          title="著色本《ㄅㄆㄇ在跳舞》（個人創作／網路出版）"
          subtitle="July, 2020"
          side="right"
          icon="book"
          class="timeline-item"
        >
          <img
            class="timeline-image"
            src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1756817464/%E9%97%9C%E6%96%BC%E6%88%91_%E8%91%97%E4%BD%9C_2020%E8%91%97%E8%89%B2%E6%9C%AC_%E6%B3%A8%E9%9F%B3_%E4%B8%8A%E8%89%B2%E7%A4%BA%E7%AF%84_mzsxoa.jpg"
          />
          <!-- <div>這邊可以放簡述</div> -->
        </q-timeline-entry>

        <!-- <q-timeline-entry heading>November, 2017</q-timeline-entry> -->

        <q-timeline-entry
          title="著色本《快樂字母》（個人創作／網路出版）"
          subtitle="April, 2020"
          side="left"
          class="timeline-item"
        >
          <img
            class="timeline-image"
            src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1756817462/%E9%97%9C%E6%96%BC%E6%88%91_%E8%91%97%E4%BD%9C_2020%E8%91%97%E8%89%B2%E6%9C%AC_%E5%AD%97%E6%AF%8D_%E4%B8%8A%E8%89%B2%E7%A4%BA%E7%AF%84_xvnd7w.jpg"
          />
          <!-- <div>這邊可以放簡述</div> -->
        </q-timeline-entry>

        <q-timeline-entry
          title="繪本《最愛的禮物》（團體創作／小魯文化出版）"
          subtitle="November, 2019"
          side="right"
          color="orange"
          icon="done_all"
          class="timeline-item"
        >
          <img
            class="timeline-image"
            src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1756817453/%E9%97%9C%E6%96%BC%E6%88%91_%E8%91%97%E4%BD%9C_2019%E7%B9%AA%E6%9C%AC_%E6%9C%80%E6%84%9B%E7%9A%84%E7%A6%AE%E7%89%A9_%E6%9B%B8%E7%B1%8D%E5%B0%81%E9%9D%A2_ioreeh.png"
          />
          <!-- <div>
            導航手裡部落前往贏得教師這次性感在那裡大幅本帖基本，金融一遍看到合理上一頁魅力字元不良水溝信箱貫徹格式現象出口，投資者上市陷入科技完全整理，翻譯過程多麼資訊而來心裡玻璃優秀為何掌握，姐姐發佈真是內地意義版權所有，友情連結來自東西，親自相機，屏幕變化，左右。
          </div> -->
        </q-timeline-entry>

        <q-timeline-entry
          title="繪本《普迪好忙》（個人創作／獨立出版）"
          subtitle="June, 2019"
          side="left"
          class="timeline-item"
        >
          <img
            class="timeline-image"
            src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1756817458/%E9%97%9C%E6%96%BC%E6%88%91_%E8%91%97%E4%BD%9C_2019%E7%B9%AA%E6%9C%AC_%E6%99%AE%E8%BF%AA%E5%A5%BD%E5%BF%99_%E6%9B%B8%E7%B1%8D%E5%B0%81%E9%9D%A2_loeasf.jpg"
          />
          <div>
            註：普迪好忙販售於三民網路書店
            <a href="https://tinyurl.com/y8fc8zx3" target="_blank">點此購買</a>
          </div>
        </q-timeline-entry>

        <q-timeline-entry title="" subtitle="START" side="left" class="timeline-item">
        </q-timeline-entry>
      </q-timeline>
    </div>

    <q-separator></q-separator>

    <!-- 主題描述區域2 -->
    <div class="row q-pa-md q-mx-xl q-gutter-md text-center font-sora">
      <div class="col flex justify-end">
        <q-img
          src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1756817454/%E9%97%9C%E6%96%BC%E6%88%91_%E5%B1%95%E8%A6%BD%E7%B6%93%E6%AD%B7_%E5%88%86%E9%A1%9E%E5%B0%81%E9%9D%A2_ju8kyp.png"
          fit="contain"
          width="100%"
        />
      </div>
      <div class="col">
        <div class="q-px-xl">
          <h3 class="text-left">個人經歷/展覽</h3>
          <div class="row justify-start">
            <div class="text-h6 text-left text-grey-9">
              <p>
                2020/2019 味全文教基金會藝術講師<br />
                2019 台灣繪本協會行動師資<br />
                2019 蘭陽繪本創作營<br />
                2019 繪本創作個展-普迪好忙原畫展<br />
                2019 繪本創作聯展-繪本下午茶<br />
                2018 陳璐茜繪本創作師資班25期學員<br />
                2018 學好教育機構藝術老師
              </p>
            </div>
          </div>
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
          <q-img src="~assets/logo.png" />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { reactive, computed, onMounted, onUnmounted } from 'vue'
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

// 使用 gsap.context() 管理動畫
let ctx

onMounted(() => {
  // 創建 GSAP context
  ctx = gsap.context(() => {
    // 設定所有區塊的初始狀態（隱藏）
    gsap.set('.fade-in-section', {
      opacity: 0,
      y: 100,
    })
    gsap.set('.timeline-item', {
      opacity: 0,
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
          toggleActions: 'play none none none', // 進入時播放，離開時反轉
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
            start: 'top 100%',
            end: 'bottom 0%',
            toggleActions: 'play none none none',
            // markers: true, // 開發時可以開啟來看觸發點
          },
          delay: index * 0.2,
        },
      )
    })

    // 手動刷新 ScrollTrigger 確保正確計算位置
    ScrollTrigger.refresh()
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
/* .footer-section {
  background-color: var(--judy-2);
} */

.font-sora {
  font-family: 'Sora', sans-serif;
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
