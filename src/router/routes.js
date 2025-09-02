const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { title: '首頁', login: '', admin: false },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      // { path: 'daily', component: () => import('pages/DailyPage.vue') },
      { path: 'work', component: () => import('pages/WorkPage.vue') },
      {
        path: 'shopping',
        component: () => import('pages/ShoppingPage.vue'),
        meta: { title: '購物' },
      },
      // { path: 'paper', component: () => import('pages/PaperPage.vue') },
      // { path: 'clips', component: () => import('pages/ClipsPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'aboutsample', component: () => import('src/pages/AboutPage_sample.vue') },
      // { path: 'contact', component: () => import('pages/ContactPage.vue') },
      {
        path: 'orders',
        component: () => import('src/pages/OrdersPage.vue'),
        meta: { title: '訂單紀錄' },
      },
      {
        path: 'cart',
        component: () => import('pages/CartPage.vue'),
        meta: { title: '購物車結帳' },
      },
      {
        path: 'favorites',
        component: () => import('pages/FavoritesPage.vue'),
        meta: { title: '我的收藏' },
      },
      {
        path: 'product/:id',
        component: () => import('pages/product/ProductDetail.vue'),
      },
      // {
      //   path: 'admin',
      //   component: () => import('pages/AdminPage.vue'),
      //   meta: { requiresAuth: true, isAdmin: true },
      // },
    ],
  },
  // 管理員路由
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { title: '管理員', login: 'login-only', admin: true },
    children: [
      {
        path: 'works',
        component: () => import('pages/admin/WorksPage.vue'),
        meta: { title: '作品管理' },
      },
      {
        path: 'series',
        component: () => import('pages/admin/SeriesPage.vue'),
        meta: { title: '系列管理' },
      },
      {
        path: 'products',
        component: () => import('pages/admin/ProductsPage.vue'),
        meta: { title: '商品管理' },
      },
      {
        path: 'orders',
        component: () => import('pages/admin/OrdersPage.vue'),
        meta: { title: '訂單管理' },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
