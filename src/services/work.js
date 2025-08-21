import apiService from './api'

export default {
  create(data) {
    return apiService.apiAuth.post('/work/add', data)
  },
  getAll() {
    return apiService.apiAuth.get('/work/all')
  },
  get() {
    return apiService.api.get('/work')
  },
  getId(id) {
    return apiService.api.get('/work/' + id)
  },
  update(id, data) {
    return apiService.apiAuth.patch(`/work/${id}`, data)
  },
}
