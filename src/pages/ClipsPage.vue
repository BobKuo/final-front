<template>
  <q-page class="clips-page bg-judy-1">
    <!-- 頁面標題區域 -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title text-judy-7">小短片 Collection</h1>
        <p class="page-subtitle text-judy-6">分享創作過程中的靈感瞬間</p>
      </div>
    </div>

    <!-- 影片橫幅區域 -->
    <div class="clips-section">
      <div class="container">
        <!-- 篩選按鈕 -->
        <div class="filter-section">
          <q-btn-toggle
            v-model="activeFilter"
            :options="filterOptions"
            color="white"
            text-color="judy-7"
            toggle-color="judy-3"
            no-caps
            unelevated
            class="filter-toggle"
          />
        </div>

        <!-- 影片橫幅列表 -->
        <div class="clips-list">
          <div
            v-for="(clip, index) in filteredClips"
            :key="clip.id"
            class="clip-banner"
            :class="`clip-banner-${(index % 6) + 1}`"
          >
            <!-- 左側影片區域 -->
            <div class="video-section">
              <div class="video-container">
                <!-- YouTube 影片直接嵌入 -->
                <div v-if="isYouTubeVideo(clip.embedUrl)" class="q-video">
                  <iframe
                    :src="getYouTubeEmbedUrl(clip.embedUrl)"
                    frameborder="0"
                    allowfullscreen
                  />
                </div>

                <!-- 其他平台顯示縮圖 -->
                <div
                  v-else
                  class="video-thumbnail"
                  @click="openExternalVideo(clip.embedUrl)"
                  style="height: 400px"
                >
                  <img :src="getVideoThumbnail(clip)" :alt="clip.title" class="thumbnail-image" />
                  <div class="play-overlay">
                    <q-icon name="play_circle_filled" size="4rem" color="white" />
                    <div class="external-link-text">點擊觀看</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右側資訊區域 -->
            <div class="info-section">
              <div class="clip-header">
                <h2 class="clip-title text-judy-7">{{ clip.title }}</h2>
                <q-badge
                  :color="`judy-${(index % 5) + 2}`"
                  text-color="white"
                  class="duration-badge"
                >
                  {{ clip.duration }}
                </q-badge>
              </div>

              <p class="clip-description text-judy-6">{{ clip.description }}</p>

              <!-- 影片資訊 -->
              <div class="clip-meta">
                <span class="clip-date text-judy-5">{{ formatDate(clip.date) }}</span>
                <span class="clip-views text-judy-6">{{ clip.views }} 次觀看</span>
                <span class="clip-category text-judy-4">{{ getCategoryName(clip.category) }}</span>
              </div>

              <!-- 動作按鈕 -->
              <div class="clip-actions">
                <q-btn
                  unelevated
                  color="judy-3"
                  text-color="white"
                  icon="share"
                  label="分享"
                  @click="shareClip(clip)"
                  class="action-btn"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 載入更多按鈕 -->
        <div class="load-more-section" v-if="hasMoreClips">
          <q-btn
            @click="loadMoreClips"
            :loading="loadingMore"
            color="judy-5"
            text-color="white"
            size="lg"
            no-caps
            class="load-more-btn"
          >
            <q-icon name="expand_more" class="q-mr-sm" />
            載入更多影片
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// 響應式資料
const activeFilter = ref('all')
const loadingMore = ref(false)
const hasMoreClips = ref(true)

// 篩選選項
const filterOptions = [
  { label: '全部', value: 'all' },
  { label: '靈感發想', value: 'inspiration' },
  { label: '創作過程', value: 'process' },
  { label: '繪畫教學', value: 'tutorial' },
]

// 影片資料
const clips = ref([
  {
    id: 1,
    title: '如何畫柚子｜How to draw pomelo',
    description: 'In this video, you will learn how to draw and color a pomelo step by step.',
    embedUrl: 'https://www.youtube.com/watch?v=SMCI6X4uqx4',
    thumbnail: '',
    duration: '5:34',
    category: 'tutorial',
    date: '2021-09-19',
    views: 1198,
  },
  {
    id: 2,
    title: '畫瓶子',
    description: '分享我在生活中的靈感與常用的畫法。',
    embedUrl: 'https://www.facebook.com/reel/696985914784007',
    thumbnail:
      'https://res.cloudinary.com/dm5rlvzns/image/upload/v1756841748/%E6%88%AA%E5%9C%96_2025-09-03_%E5%87%8C%E6%99%A82.49.02_cqfhba.png',
    duration: '1:35',
    category: 'inspiration',
    date: '2022-01-10',
    views: 1212,
  },
  {
    id: 3,
    title: '日更第29天｜角色設計靈感發想',
    description:
      '昨天第一次畫扇貝，在網路上找不到想要的參考視角，乾脆自己做一個小的，方便自己畫透視... 坐在扇貝裡打嗑睡的小生物是干貝柱，人家是愛玩的小女孩，不是布丁唷，哈哈！',
    embedUrl: 'https://www.facebook.com/share/v/12LNJfBv1LL/',
    thumbnail:
      'https://res.cloudinary.com/dm5rlvzns/image/upload/v1756842099/%E6%88%AA%E5%9C%96_2025-09-03_%E5%87%8C%E6%99%A82.48.19_wgkr8r.png',
    duration: '0:11',
    category: 'inspiration',
    date: '2023-12-31',
    views: 158,
  },
  {
    id: 4,
    title: '如何畫白飯｜How to draw rice',
    description: 'In this video, you will learn how to draw and color rice step by step :)',
    embedUrl: 'https://youtu.be/7WDL3k94HaA?si=wbL78eynnUjn4Pio',
    thumbnail: '',
    duration: '8:20',
    category: 'tutorial',
    date: '2021-06-13',
    views: 112,
  },

  {
    id: 5,
    title: '#365日更之旅 #小黃車',
    description: '#illustratpicturebook #coloringbook #插畫 #繪本 #著色本',
    embedUrl: 'https://www.instagram.com/reel/CmDa-OdDtYQ/',
    thumbnail:
      'https://res.cloudinary.com/dm5rlvzns/image/upload/v1756842307/%E6%88%AA%E5%9C%96_2025-09-03_%E5%87%8C%E6%99%A83.44.53_jt5foy.png',
    duration: '18:30',
    category: 'process',
    date: '2022-12-20',
    views: 187,
  },
  {
    id: 6,
    title: '#365日更之旅 #老虎',
    description: '#絵本作家 #絵本好き #絵本好きな人と繋がりたい #絵本好きと繋がりたい',
    embedUrl: 'https://www.instagram.com/reel/Coc3Y-AO0f_/',
    thumbnail:
      'https://res.cloudinary.com/dm5rlvzns/image/upload/v1756842664/%E6%88%AA%E5%9C%96_2025-09-03_%E5%87%8C%E6%99%A83.50.48_ajbezb.png',
    duration: '1:25',
    category: 'process',
    date: '2023-12-15',
    views: 337,
  },
])

// 計算屬性：篩選後的影片
const filteredClips = computed(() => {
  if (activeFilter.value === 'all') {
    return clips.value
  }
  return clips.value.filter((clip) => clip.category === activeFilter.value)
})

// 判斷是否為 YouTube 影片
const isYouTubeVideo = (url) => {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

// 轉換 YouTube URL 為 embed 格式
const getYouTubeEmbedUrl = (url) => {
  let videoId = ''

  if (url.includes('youtu.be/')) {
    // 處理 youtu.be/VIDEO_ID 格式
    videoId = url.split('youtu.be/')[1].split('?')[0]
  } else if (url.includes('youtube.com/watch?v=')) {
    // 處理 youtube.com/watch?v=VIDEO_ID 格式
    videoId = url.split('v=')[1].split('&')[0]
  } else if (url.includes('youtube.com/embed/')) {
    // 已經是 embed 格式，直接返回
    return url
  }

  return `https://www.youtube.com/embed/${videoId}?rel=0`
}

// 取得影片縮圖
const getVideoThumbnail = (clip) => {
  return clip.thumbnail
}

// 開啟外部影片連結
const openExternalVideo = (url) => {
  // 將各種 URL 格式轉換為實際觀看 URL
  let watchUrl = url

  if (url.includes('facebook.com/reel/')) {
    watchUrl = url
  } else if (url.includes('youtu.be/')) {
    // 處理 youtu.be 短網址
    const videoId = url.split('youtu.be/')[1].split('?')[0]
    watchUrl = `https://www.youtube.com/watch?v=${videoId}`
  } else if (url.includes('youtube.com/embed/')) {
    // 處理 embed URL
    const videoId = url.split('/embed/')[1].split('?')[0]
    watchUrl = `https://www.youtube.com/watch?v=${videoId}`
  } else if (url.includes('youtube.com/watch?v=')) {
    // 已經是正確的觀看 URL
    watchUrl = url
  }

  window.open(watchUrl, '_blank')
}

// 分享影片
const shareClip = async (clip) => {
  const shareData = {
    title: `${clip.title} - Judy的創作世界`,
    text: clip.description,
    url: `${window.location.origin}${window.location.pathname}#clip-${clip.id}`,
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
      $q.notify({
        type: 'positive',
        message: '分享成功！',
        position: 'top',
        timeout: 2000,
      })
    } else {
      await navigator.clipboard.writeText(shareData.url)
      $q.notify({
        type: 'positive',
        message: '連結已複製到剪貼簿！',
        position: 'top',
        timeout: 2000,
      })
    }
  } catch {
    $q.notify({
      type: 'negative',
      message: '分享失敗，請稍後再試',
      position: 'top',
      timeout: 2000,
    })
  }
}

// 載入更多影片
const loadMoreClips = () => {
  loadingMore.value = true

  // 模擬 API 呼叫
  setTimeout(() => {
    loadingMore.value = false
    hasMoreClips.value = false
    $q.notify({
      type: 'info',
      message: '已載入所有影片',
      position: 'top',
      timeout: 2000,
    })
  }, 1500)
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 取得分類名稱
const getCategoryName = (category) => {
  const categoryMap = {
    inspiration: '靈感發想',
    process: '創作過程',
    tutorial: '繪畫教學',
  }
  return categoryMap[category] || category
}

onMounted(() => {
  console.log('ClipsPage 已載入')
})
</script>

<style lang="scss" scoped>
.clips-page {
  min-height: 100vh;

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  // 頁面標題區域
  .page-header {
    padding: 50px 0 60px;
    text-align: center;

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 16px;
      font-family: 'Sora', sans-serif;
    }

    .page-subtitle {
      font-size: 1.2rem;
      opacity: 0.8;
    }
  }

  // 影片區域
  .clips-section {
    padding-bottom: 80px;

    // 篩選區域
    .filter-section {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;

      .filter-toggle {
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(var(--judy-7-rgb), 0.1);
        overflow: hidden;

        :deep(.q-btn) {
          padding: 12px 24px;
          font-weight: 500;
        }
      }
    }

    // 影片橫幅列表
    .clips-list {
      display: flex;
      flex-direction: column;
      gap: 40px;
      margin-bottom: 60px;

      .clip-banner {
        background: white;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(var(--judy-7-rgb), 0.08);
        display: flex;
        min-height: 400px;

        // 不同橫幅的左邊框顏色
        &.clip-banner-1 {
          border-left: 6px solid var(--judy-2);
        }
        &.clip-banner-2 {
          border-left: 6px solid var(--judy-3);
        }
        &.clip-banner-3 {
          border-left: 6px solid var(--judy-4);
        }
        &.clip-banner-4 {
          border-left: 6px solid var(--judy-5);
        }
        &.clip-banner-5 {
          border-left: 6px solid var(--judy-6);
        }
        &.clip-banner-6 {
          border-left: 6px solid var(--judy-7);
        }

        .video-section {
          flex: 0 0 50%;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, var(--judy-1) 0%, var(--judy-2) 100%);

          .video-container {
            width: 100%;
            height: 100%;
            position: relative;
          }

          .q-video {
            width: 100%;
            height: 100%;
            border-radius: 0;
            overflow: hidden;
            box-shadow: none;

            iframe {
              width: 100%;
              height: 100%;
              border: none;
            }
          }

          .video-thumbnail {
            width: 100%;
            height: 100%;
            position: relative;
            cursor: pointer;
            overflow: hidden;

            .thumbnail-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }

            .play-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.3);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 8px;

              .external-link-text {
                color: white;
                font-size: 1rem;
                font-weight: 600;
                text-align: center;
                background: rgba(0, 0, 0, 0.5);
                padding: 8px 16px;
                border-radius: 20px;
                backdrop-filter: blur(10px);
              }
            }

            &:hover .play-overlay {
              background: rgba(0, 0, 0, 0.5);
            }
          }
        }

        .info-section {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .clip-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;

            .clip-title {
              font-size: 1.8rem;
              font-weight: 600;
              line-height: 1.3;
              flex: 1;
              margin-right: 20px;
            }

            .duration-badge {
              font-size: 0.9rem;
              font-weight: 600;
              padding: 8px 16px;
              border-radius: 20px;
              white-space: nowrap;
            }
          }

          .clip-description {
            font-size: 1.1rem;
            line-height: 1.7;
            margin-bottom: 24px;
            opacity: 0.85;
          }

          .clip-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 24px;
            font-size: 0.95rem;

            .clip-date {
              font-weight: 500;
              display: flex;
              align-items: center;

              &:before {
                content: '📅';
                margin-right: 6px;
              }
            }

            .clip-views {
              opacity: 0.8;
              display: flex;
              align-items: center;

              &:before {
                content: '👁️';
                margin-right: 6px;
              }
            }

            .clip-category {
              font-weight: 500;
              display: flex;
              align-items: center;

              &:before {
                content: '🏷️';
                margin-right: 6px;
              }
            }
          }

          .clip-actions {
            display: flex;
            gap: 12px;

            .action-btn {
              padding: 12px 24px;
              border-radius: 50px;
              font-weight: 500;
            }
          }
        }
      }
    }

    // 載入更多區域
    .load-more-section {
      display: flex;
      justify-content: center;

      .load-more-btn {
        padding: 16px 32px;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(var(--judy-5-rgb), 0.3);
      }
    }
  }

  // 響應式設計
  @media (max-width: 1024px) {
    .clips-list {
      .clip-banner {
        flex-direction: column;
        min-height: auto;

        .video-section {
          flex: none;
          height: 300px;

          .video-container {
            height: 100%;
          }

          .q-video,
          .video-thumbnail {
            height: 100%;

            iframe,
            .thumbnail-image {
              height: 100%;
            }
          }
        }
        .info-section {
          padding: 30px;

          .clip-header {
            .clip-title {
              font-size: 1.5rem;
            }
          }

          .clip-description {
            font-size: 1rem;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .page-header {
      padding: 60px 0 40px;

      .page-title {
        font-size: 2.2rem;
      }

      .page-subtitle {
        font-size: 1rem;
      }
    }

    .clips-section {
      .filter-section {
        .filter-toggle {
          :deep(.q-btn) {
            padding: 10px 16px;
            font-size: 0.9rem;
          }
        }
      }

      .clips-list {
        gap: 30px;

        .clip-banner {
          .info-section {
            padding: 24px;

            .clip-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;

              .clip-title {
                font-size: 1.3rem;
                margin-right: 0;
              }
            }

            .clip-description {
              font-size: 0.95rem;
            }

            .clip-meta {
              flex-direction: column;
              gap: 8px;
              font-size: 0.9rem;
            }

            .clip-actions {
              flex-direction: column;
              gap: 8px;

              .action-btn {
                width: 100%;
                justify-content: center;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 15px;
    }

    .clips-list {
      .clip-banner {
        .video-section {
          .video-container {
            height: 100%;
          }

          .q-video,
          .video-thumbnail {
            height: 100%;

            iframe,
            .thumbnail-image {
              height: 100%;
            }
          }
        }
        .info-section {
          padding: 20px;

          .clip-header {
            .clip-title {
              font-size: 1.2rem;
            }
          }
        }
      }
    }

    .filter-section {
      .filter-toggle {
        :deep(.q-btn) {
          padding: 8px 12px;
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
