import apiService from './api'

export default {
  create(data) {
    return apiService.apiAuth.post('/tag/add', data)
  },
  getAll() {
    return apiService.apiAuth.get('/tag/all')
  },
  update(data) {
    return apiService.apiAuth.post('/tag/update', data)
  },
  delete(name) {
    return apiService.apiAuth.post('/tag/delete', { name })
  },
}
