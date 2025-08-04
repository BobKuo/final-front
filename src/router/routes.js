const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { title: '首頁', login: '', admin: false },
    children: [
      { path: 'user', component: () => import('pages/IndexPage.vue') },
      { path: 'register', component: () => import('pages/IndexPage.vue') },
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
