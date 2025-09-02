<template>
  <q-page>
    <div class="q-gutter-xl">
      <!-- 自我介紹 -->
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

      <!-- 主題描述區域2 -->
      <div class="row q-pa-md q-mx-xl q-gutter-md text-center font-sora">
        <div class="col flex justify-end">
          <q-img
            src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1756817454/%E9%97%9C%E6%96%BC%E6%88%91_%E5%AA%92%E9%AB%94%E5%A0%B1%E5%B0%8E_%E5%88%86%E9%A1%9E%E5%B0%81%E9%9D%A2_ug0cgn.jpg"
            fit="contain"
            width="100%"
          />
        </div>
        <div class="col">
          <div class="q-px-xl">
            <h3 class="text-left">媒體報導</h3>
            <div class="row justify-start">
              <div class="text-h7 text-left text-grey-9">
                <template v-for="(el, idx) in mediaCoverage" :key="idx">
                  <div class="row">
                    <div class="col-2">{{ el.date }}</div>
                    <div class="col">
                      {{ el.title }}
                      <template v-for="(link, idxx) in el.links" :key="idxx">
                        (<a :href="link.url" target="_blank">{{ link.label }}</a
                        >)
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row q-pa-md q-mx-xl q-gutter-md text-center font-sora">
        <div class="col">
          <div class="q-px-xl">
            <h3 class="text-right">講座授課</h3>
            <div class="row justify-end">
              <div class="text-h7 text-left text-grey-9">
                <template v-for="(el, idx) in lectureReport" :key="idx">
                  <div class="row">
                    <div class="col-2">{{ el.date }}</div>
                    <div class="col">
                      {{ el.title }}
                      <template v-for="(link, idxx) in el.links" :key="idxx">
                        (<a :href="link.url" target="_blank">{{ link.label }}</a
                        >)
                      </template>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col flex justify-end">
          <q-img
            src="https://res.cloudinary.com/dm5rlvzns/image/upload/v1756817454/%E9%97%9C%E6%96%BC%E6%88%91_%E8%AC%9B%E5%BA%A7%E6%8E%88%E8%AA%B2_%E5%88%86%E9%A1%9E%E5%B0%81%E9%9D%A2_hzvndg.png"
            fit="contain"
            width="100%"
          />
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

// 媒體報導
const mediaCoverage = reactive([
  {
    date: '2021.07.06',
    title: '【媒體】蘋果日報-蘋果人物 她憑繪本進軍插畫界奧斯卡',
    links: [{ url: 'https://tinyurl.com/23va4ct6', label: '連結' }],
  },
  {
    date: '2020.09.22',
    title: '【媒體】人間福報-小人物大啟發 暖心繪本 陪伴孤單孩子成長',
    links: [
      { url: 'https://tinyurl.com/y62kt2a3', label: '網頁版' },
      { url: 'https://tinyurl.com/22g9gku2', label: '紙本版' },
    ],
  },
  {
    date: '2020.08.18',
    title: '【媒體】中國時報-生活版 濱海小學堂10年 每周半小時時光成弱勢童最期待的時光',
    links: [{ url: 'https://tinyurl.com/y2kf8vt7 ', label: '連結' }],
  },
  {
    date: '2020.08.18',
    title: '【媒體】國立教育廣播電台 每週視訊十年守護 濱海小學堂兒童和他們的長腿叔叔',
    links: [{ url: 'https://tinyurl.com/27pyf2qj ', label: '連結' }],
  },
  {
    date: '2020.08.18',
    title: '【媒體】痞客邦PIXNET-公益家 每週視訊、十年守護 濱海小學堂兒童和他們的「長腿叔叔」',
    links: [{ url: 'https://tinyurl.com/2xhewoog', label: '連結' }],
  },
  {
    date: '2019.11.22',
    title: '【媒體】師大新聞-校園生活 公共空間結合生活美學 綜合大樓七樓彩繪打卡牆完工',
    links: [{ url: 'https://tinyurl.com/vh8rdmx', label: '連結' }],
  },
  {
    date: '2019.09.29',
    title: '【媒體】痞客邦PIXNET-走在行銷公關路上《普迪好忙》繪本插畫家 Judy 的踏實追夢歷程',
    links: [{ url: 'https://tinyurl.com/2cbslcfs', label: '連結' }],
  },
  {
    date: '2019.09.21',
    title: '【媒體】蘋果日報-蘋果人物 畫筆圓夢 台女半途出家做插畫家 繪本獲大師當眾稱讚',
    links: [{ url: 'https://tinyurl.com/25pjeksg', label: '連結' }],
  },
  {
    date: '2019.09.20',
    title: '【媒體】蘋果日報-蘋果人物 她用畫筆圓夢 繪本角色受肯定進軍插畫界奧斯卡',
    links: [
      { url: 'https://tinyurl.com/2bsz7mub', label: '影音採訪' },
      { url: 'https://www.appledaily.com.tw/micromovie/20190919/', label: '連結' },
    ],
  },
  {
    date: '2019.08.30',
    title: '【媒體】喬西咖啡沙龍 行銷人玩藝術，茱蒂的圖文創作路',
    links: [
      { url: 'https://imchelsea.com/coffeechat/10', label: '喬西官網' },
      { url: 'https://tinyurl.com/y288qxqv', label: 'Podcast頁面' },
    ],
  },
])

// 講座授課
const lectureReport = reactive([
  {
    date: '2024.05.08',
    title: '【講座】臺灣藝術大學 行銷企劃書的撰寫技巧與實務介紹：以藝術行銷為例',
    links: [],
  },
  {
    date: '2022.04.12',
    title: '【講座】臺灣藝術大學 藝術書寫沙龍系列講座：繪本行銷的文案寫作技巧與應用',
    links: [{ url: 'https://tinyurl.com/22mold3a', label: '連結' }],
  },
  {
    date: '2021.12.01',
    title: '【講座】臺灣藝術大學 藝術書寫沙龍系列講座：繪本行銷的文案寫作技巧與應用練習',
    links: [],
  },
  {
    date: '2021.03.06',
    title: '【講座】Google’s WTM IWD Taipei 2021年度活動 從行銷公關轉職做圖文創作者的追夢歷程',
    links: [{ url: 'https://tinyurl.com/3h8py7zk', label: '連結' }],
  },
  {
    date: '2020.11.15',
    title: '【課程】客家文化基金會 寶藏巖 <小人物探險去> 親子創作課',
    links: [{ url: 'https://tinyurl.com/3sxvreff', label: '連結' }],
  },
  {
    date: '2020.11.06',
    title: '【講座】臺灣藝術大學 藝術書寫沙龍系列講座：繪本行銷的文案寫作技巧與應用',
    links: [{ url: 'https://tinyurl.com/d38u8v3h', label: '連結' }],
  },
  {
    date: '2020.10.14',
    title: '【課程】味全文教基金會-親子關係成長坊 動物膠膜拼貼-親子創作課',
    links: [{ url: 'https://tinyurl.com/28mkefvh', label: '僅有粉專的作品示範' }],
  },
  {
    date: '2019.12.14',
    title: '【講座】Chez la mère 吃了沒健康料理 一支筆的魔力(追加場)：旅行作家Ｘ繪本作家的勇氣之路',
    links: [{ url: 'https://tinyurl.com/ryg36lc ', label: '連結' }],
  },
  {
    date: '2019.09.28',
    title: '【講座】文房閱讀空間 一支筆的魔力：旅行作家Ｘ繪本作家的勇氣之路暨新書分享會',
    links: [{ url: 'https://tinyurl.com/yxexl2kc', label: '連結' }],
  },
  {
    date: '2019.08.19',
    title: '【講座】味全文教基金會-職人大探索 用畫筆說故事的孩子-繪本作家',
    links: [{ url: 'https://tinyurl.com/y3msjsq7 ', label: '連結' }],
  },
  {
    date: '2019.08.15',
    title: '【講座】Jin"Life職感系列講座 職人對談x擺脫上班族的自足繪本生活',
    links: [{ url: 'https://tinyurl.com/y6xkerek', label: '連結' }],
  },
])

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
