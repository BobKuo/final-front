import axios from 'axios'
// import userService from 'src/services/user'
// import { useUserStore } from 'src/stores/user'

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


export default { api, apiAuth }
