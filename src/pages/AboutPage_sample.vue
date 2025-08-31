<template>
  <q-page class="about-page">
    <!-- 主視覺區域 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">關於我們</h1>
          <p class="hero-subtitle">致力於創造美好的數位體驗，讓每一個瞬間都充滿意義</p>
        </div>
        <div class="hero-image">
          <q-img src="/src/assets/logo.jpg" alt="Brand Story" class="brand-image" ratio="4/3" />
        </div>
      </div>
    </section>

    <!-- 品牌故事 -->
    <section class="story-section">
      <div class="container">
        <div class="section-content">
          <h2 class="section-title">我們的故事</h2>
          <div class="story-grid">
            <div class="story-text">
              <p class="story-paragraph">
                每一個創意的開始，都源於對美好生活的嚮往。我們相信，透過精心設計的產品和服務，
                能夠為人們帶來更多的快樂與滿足。
              </p>
              <p class="story-paragraph">
                從概念到實現，從設計到製作，我們用心對待每一個細節， 只為了給您最完美的體驗。
              </p>
            </div>
            <div class="story-values">
              <div class="value-item">
                <q-icon name="favorite" color="primary" size="2rem" />
                <h3>用心設計</h3>
                <p>每一個產品都經過精心設計與反覆測試</p>
              </div>
              <div class="value-item">
                <q-icon name="star" color="primary" size="2rem" />
                <h3>品質保證</h3>
                <p>堅持使用最優質的材料與工藝</p>
              </div>
              <div class="value-item">
                <q-icon name="eco" color="primary" size="2rem" />
                <h3>永續經營</h3>
                <p>致力於環保與可持續發展</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 團隊介紹 -->
    <section class="team-section">
      <div class="container">
        <h2 class="section-title">認識我們的團隊</h2>
        <div class="team-grid">
          <div class="team-member" v-for="member in teamMembers" :key="member.id">
            <div class="member-avatar">
              <q-avatar size="120px" color="primary" text-color="white">
                {{ member.initials }}
              </q-avatar>
            </div>
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
            <p class="member-description">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 聯絡資訊 -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2 class="section-title">聯絡我們</h2>
            <div class="contact-details">
              <div class="contact-item">
                <q-icon name="place" color="primary" size="1.5rem" />
                <div>
                  <h4>地址</h4>
                  <p>台北市信義區松仁路123號</p>
                </div>
              </div>
              <div class="contact-item">
                <q-icon name="phone" color="primary" size="1.5rem" />
                <div>
                  <h4>電話</h4>
                  <p>+886-2-1234-5678</p>
                </div>
              </div>
              <div class="contact-item">
                <q-icon name="email" color="primary" size="1.5rem" />
                <div>
                  <h4>信箱</h4>
                  <p>hello@example.com</p>
                </div>
              </div>
              <div class="contact-item">
                <q-icon name="schedule" color="primary" size="1.5rem" />
                <div>
                  <h4>營業時間</h4>
                  <p>週一至週五 9:00-18:00</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 聯絡表單 -->
          <div class="contact-form">
            <h3>留言給我們</h3>
            <q-form @submit="onSubmit" class="form-content">
              <q-input
                v-model="form.name"
                label="姓名 *"
                filled
                class="q-mb-md"
                :rules="[(val) => !!val || '請輸入姓名']"
              />
              <q-input
                v-model="form.email"
                label="Email *"
                type="email"
                filled
                class="q-mb-md"
                :rules="[
                  (val) => !!val || 'Email 為必填',
                  (val) => /.+@.+\..+/.test(val) || 'Email 格式不正確',
                ]"
              />
              <q-input v-model="form.subject" label="主旨" filled class="q-mb-md" />
              <q-input
                v-model="form.message"
                label="訊息 *"
                type="textarea"
                filled
                rows="4"
                class="q-mb-md"
                :rules="[(val) => !!val || '請輸入訊息內容']"
              />
              <q-btn
                type="submit"
                label="送出訊息"
                color="primary"
                class="full-width"
                :loading="loading"
              />
            </q-form>
          </div>
        </div>
      </div>
    </section>

    <!-- 社群媒體 -->
    <section class="social-section">
      <div class="container">
        <h2 class="section-title">追蹤我們</h2>
        <p class="social-subtitle">與我們保持聯繫，獲得最新消息</p>
        <div class="social-links">
          <q-btn
            v-for="social in socialLinks"
            :key="social.name"
            :icon="social.icon"
            :href="social.url"
            target="_blank"
            round
            size="lg"
            color="primary"
            outline
            class="social-btn"
            :aria-label="`追蹤我們的 ${social.name}`"
          />
        </div>
      </div>
    </section>

    <!-- Newsletter 訂閱 -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2 class="newsletter-title">訂閱電子報</h2>
          <p class="newsletter-subtitle">第一時間收到最新產品資訊與特別優惠</p>
          <div class="newsletter-form">
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
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer-section">
      <div class="container">
        <div class="footer-content">
          <!-- 主要 Footer 內容 -->
          <div class="footer-main">
            <!-- 社群媒體 -->
            <div class="footer-social">
              <div class="footer-social-links">
                <q-btn
                  v-for="social in footerSocialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  flat
                  round
                  :icon="social.icon"
                  size="md"
                  color="white"
                  class="footer-social-btn"
                  :aria-label="`追蹤我們的 ${social.name}`"
                />
              </div>
            </div>

            <!-- 導航連結 -->
            <div class="footer-navigation">
              <div class="footer-column">
                <h4 class="footer-column-title">商店</h4>
                <ul class="footer-links">
                  <li><router-link to="/shopping" class="footer-link">最新商品</router-link></li>
                  <li><router-link to="/shopping" class="footer-link">熱門商品</router-link></li>
                  <li><router-link to="/works" class="footer-link">作品集</router-link></li>
                  <li><router-link to="/cart" class="footer-link">購物車</router-link></li>
                </ul>
              </div>

              <div class="footer-column">
                <h4 class="footer-column-title">資訊</h4>
                <ul class="footer-links">
                  <li><router-link to="/about" class="footer-link">關於我們</router-link></li>
                  <li><a href="mailto:hello@example.com" class="footer-link">聯絡我們</a></li>
                  <li><router-link to="/faq" class="footer-link">常見問題</router-link></li>
                  <li><router-link to="/policy" class="footer-link">隱私政策</router-link></li>
                </ul>
              </div>

              <div class="footer-column">
                <h4 class="footer-column-title">服務</h4>
                <ul class="footer-links">
                  <li><router-link to="/orders" class="footer-link">訂單查詢</router-link></li>
                  <li><router-link to="/shipping" class="footer-link">運送資訊</router-link></li>
                  <li><router-link to="/returns" class="footer-link">退換貨政策</router-link></li>
                  <li><router-link to="/support" class="footer-link">客服中心</router-link></li>
                </ul>
              </div>

              <div class="footer-column">
                <h4 class="footer-column-title">聯絡資訊</h4>
                <div class="footer-contact">
                  <p class="footer-contact-item">
                    <q-icon name="email" size="sm" />
                    hello@example.com
                  </p>
                  <p class="footer-contact-item">
                    <q-icon name="phone" size="sm" />
                    +886-2-1234-5678
                  </p>
                  <p class="footer-contact-item">
                    <q-icon name="place" size="sm" />
                    台北市信義區松仁路123號
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer 底部 -->
          <div class="footer-bottom">
            <div class="footer-bottom-content">
              <div class="footer-brand">
                <h3 class="footer-brand-name">您的品牌名稱</h3>
              </div>
              <div class="footer-copyright">
                <p>&copy; {{ currentYear }} 您的品牌名稱. 版權所有</p>
                <div class="footer-legal-links">
                  <router-link to="/terms" class="footer-legal-link">服務條款</router-link>
                  <span class="footer-separator">|</span>
                  <router-link to="/privacy" class="footer-legal-link">隱私政策</router-link>
                  <span class="footer-separator">|</span>
                  <a href="https://aeolidia.com" target="_blank" class="footer-legal-link"
                    >網站設計</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// 表單數據
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const newsletter = reactive({
  email: '',
})

const loading = ref(false)
const newsletterLoading = ref(false)

// 當前年份
const currentYear = computed(() => new Date().getFullYear())

// 團隊成員數據
const teamMembers = ref([
  {
    id: 1,
    name: '王小明',
    role: '創意總監',
    initials: '王',
    description: '擁有10年設計經驗，專精於品牌視覺與使用者體驗設計',
  },
  {
    id: 2,
    name: '李小華',
    role: '技術總監',
    initials: '李',
    description: '全端開發專家，致力於創造流暢的數位體驗',
  },
  {
    id: 3,
    name: '張小美',
    role: '行銷總監',
    initials: '張',
    description: '數位行銷專家，協助品牌與消費者建立深度連結',
  },
])

// 社群媒體連結
const socialLinks = ref([
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com' },
  { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
  { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com' },
])

// Footer 社群媒體連結
const footerSocialLinks = ref([
  { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
  { name: 'Pinterest', icon: 'fab fa-pinterest', url: 'https://pinterest.com' },
  { name: 'TikTok', icon: 'fab fa-tiktok', url: 'https://tiktok.com' },
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com' },
])

// 表單提交
const onSubmit = async () => {
  loading.value = true
  try {
    // 這裡可以加入實際的 API 呼叫
    await new Promise((resolve) => setTimeout(resolve, 1000))

    $q.notify({
      type: 'positive',
      message: '訊息已成功送出，我們會盡快回覆您！',
      position: 'top',
    })

    // 重置表單
    Object.keys(form).forEach((key) => {
      form[key] = ''
    })
  } catch {
    $q.notify({
      type: 'negative',
      message: '發送失敗，請稍後再試',
      position: 'top',
    })
  } finally {
    loading.value = false
  }
}

// Newsletter 訂閱
const subscribeNewsletter = async () => {
  if (!newsletter.email) {
    $q.notify({
      type: 'warning',
      message: '請輸入有效的 Email 地址',
      position: 'top',
    })
    return
  }

  newsletterLoading.value = true
  try {
    // 這裡可以加入實際的 API 呼叫
    await new Promise((resolve) => setTimeout(resolve, 1000))

    $q.notify({
      type: 'positive',
      message: '感謝您的訂閱！',
      position: 'top',
    })

    newsletter.email = ''
  } catch {
    $q.notify({
      type: 'negative',
      message: '訂閱失敗，請稍後再試',
      position: 'top',
    })
  } finally {
    newsletterLoading.value = false
  }
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}

/* 主視覺區域 */
.hero-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 0;
}

.brand-image {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* 通用樣式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 60px;
  color: #1a1a1a;
}

/* 品牌故事區域 */
.story-section {
  padding: 100px 0;
  background: white;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.story-paragraph {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 24px;
}

.story-values {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.value-item {
  text-align: center;
  padding: 30px;
  border-radius: 12px;
  background: #f8f9fa;
  transition: transform 0.3s ease;
}

.value-item:hover {
  transform: translateY(-5px);
}

.value-item h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 16px 0 12px;
  color: #1a1a1a;
}

.value-item p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 團隊區域 */
.team-section {
  padding: 100px 0;
  background: #f8f9fa;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.team-member {
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
}

.member-avatar {
  margin-bottom: 24px;
}

.member-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1a1a1a;
}

.member-role {
  color: #1976d2;
  font-weight: 500;
  margin-bottom: 16px;
}

.member-description {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 聯絡區域 */
.contact-section {
  padding: 100px 0;
  background: white;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.contact-item h4 {
  font-weight: 600;
  margin-bottom: 4px;
  color: #1a1a1a;
}

.contact-item p {
  color: #666;
  margin: 0;
}

.contact-form {
  background: #f8f9fa;
  padding: 40px;
  border-radius: 16px;
}

.contact-form h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 32px;
  color: #1a1a1a;
}

/* 社群媒體區域 */
.social-section {
  padding: 80px 0;
  background: #f8f9fa;
  text-align: center;
}

.social-subtitle {
  font-size: 1.125rem;
  color: #666;
  margin-bottom: 40px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-btn {
  width: 60px;
  height: 60px;
}

/* Newsletter 區域 */
.newsletter-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  text-align: center;
}

.newsletter-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: white;
}

.newsletter-subtitle {
  font-size: 1.125rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.newsletter-form {
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-input {
  background: white;
  border-radius: 8px;
}

/* Footer 區域 */
.footer-section {
  background: #2c3e50;
  color: #ecf0f1;
}

.footer-content {
  padding: 60px 0 0;
}

.footer-main {
  border-bottom: 1px solid #34495e;
  padding-bottom: 60px;
}

.footer-social {
  text-align: center;
  margin-bottom: 50px;
}

.footer-social-links {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.footer-social-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.footer-social-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.footer-navigation {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.footer-column-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ecf0f1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-link {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  display: inline-block;
}

.footer-link:hover {
  color: #3498db;
  text-decoration: none;
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #bdc3c7;
  font-size: 0.95rem;
  margin: 0;
}

.footer-contact-item .q-icon {
  color: #3498db;
  min-width: 16px;
}

.footer-bottom {
  padding: 30px 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ecf0f1;
  margin: 0;
}

.footer-copyright {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-copyright p {
  color: #95a5a6;
  font-size: 0.9rem;
  margin: 0;
}

.footer-legal-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-legal-link {
  color: #95a5a6;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-legal-link:hover {
  color: #3498db;
  text-decoration: none;
}

.footer-separator {
  color: #7f8c8d;
  font-size: 0.8rem;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .hero-content,
  .story-grid,
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .social-links {
    flex-wrap: wrap;
  }

  .hero-section,
  .story-section,
  .team-section,
  .contact-section {
    padding: 60px 0;
  }

  /* Footer 響應式 */
  .footer-navigation {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .footer-copyright {
    flex-direction: column;
    gap: 12px;
  }

  .footer-social-links {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .contact-form {
    padding: 24px;
  }

  .value-item {
    padding: 20px;
  }

  /* Footer 小螢幕響應式 */
  .footer-navigation {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }

  .footer-content {
    padding: 40px 0 0;
  }

  .footer-main {
    padding-bottom: 40px;
  }

  .footer-social {
    margin-bottom: 40px;
  }

  .footer-social-links {
    gap: 12px;
  }

  .footer-legal-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
