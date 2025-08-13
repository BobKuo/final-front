const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { title: '首頁', login: '', admin: false },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      // { path: 'daily', component: () => import('pages/DailyPage.vue') },
      // { path: 'work', component: () => import('pages/WorkPage.vue') },
      // { path: 'paper', component: () => import('pages/PaperPage.vue') },
      {
        path: 'shopping',
        component: () => import('pages/ShoppingPage.vue'),
        meta: { title: '購物' },
      },
      // { path: 'clips', component: () => import('pages/ClipsPage.vue') },
      // { path: 'about', component: () => import('pages/AboutPage.vue') },
      // { path: 'contact', component: () => import('pages/ContactPage.vue') },
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
      { path: 'products', component: () => import('pages/admin/ProductsPage.vue') },
      { path: 'orders', component: () => import('pages/admin/OrdersPage.vue') },
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
