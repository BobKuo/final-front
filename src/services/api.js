import axios from 'axios'
// import userService from 'src/services/user'
import { useUserStore } from 'src/stores/user'

// axios.create 建立一個有自己預設設定的 axios
// baseURL = http://localhost:4000
// api.post('/user')
// api.post('/user/login')
// baseURL = 不設定
// axios.post('http://localhost:4000/user')
// axios.post('http://localhost:4000/user/login')

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
})

// axios 攔截器
// 1. axios.get() axios.post()
// 2. 請求攔截器 interceptors.request
// 3. 送出
// 4. 回應攔截器 interceptors.response
// 5. await / .then() .catch()

// 在每個請求前，加入 token
// config = 請求設定值，路徑、資料等等
apiAuth.interceptors.request.use((config) => {
  const userStore = useUserStore()
  config.headers.Authorization = `Bearer ${userStore.token}`
  return config
})

export default { api, apiAuth }
