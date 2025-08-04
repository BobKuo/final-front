import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
  START_LOCATION,
} from 'vue-router'
import routes from './routes'
import userService from 'src/services/user'
import { useUserStore } from 'src/stores/user'
import { useQuasar } from 'quasar'

const $q = useQuasar()

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    // 第一次進入網站初始導航時，如果有 token，取使用者資料
    if (from === START_LOCATION && userStore.isLoggedIn) {
      try {
        const { data } = await userService.profile()
        userStore.setUser(data.user)
      } catch (error) {
        console.error(error)
        userStore.token = ''
      }
    }

    // 根據登入狀態和頁面路徑進行導航守衛
    if (to.meta.login === 'no-login-only' && userStore.isLoggedIn) {
      // 去未登入限定頁面，註冊頁和登入頁，且使用者有登入，導航回首頁
      next('/')
    } else if (to.meta.login === 'login-only' && !userStore.isLoggedIn) {
      // 去登入限定頁面，且使用者沒有登入，導航到登入頁
      next('/')
      // 顯示提示訊息
      $q.notify({
        type: 'warning',
        message: '請先登入。',
        position: 'center',
      })
    } else if (to.meta.admin && !userStore.isAdmin) {
      // 去管理員限定頁面，且使用者不是管理員，導航回首頁
      next('/')
      // 顯示提示訊息
      $q.notify({
        type: 'warning',
        message: '您沒有權限訪問此頁面。',
        position: 'center',
      })
    } else {
      // 不阻擋
      next()
    }
  })

  Router.afterEach((to) => {
    document.title = `${to.meta.title} | JUDY WANG ART`
  })

  return Router
})
