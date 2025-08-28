import apiService from './api'

export default {
  create(data) {
    return apiService.apiAuth.post('/series/add', data)
  },
  getAll() {
    return apiService.apiAuth.get('/series/all')
  },
  get() {
    return apiService.api.get('/series')
  },
  getId(id) {
    return apiService.api.get('/series/' + id)
  },
  update(id, data) {
    return apiService.apiAuth.patch(`/series/${id}`, data)
  },
}
