import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

// Attach JWT token to every request automatically
api.interceptors.request.use(config => {
  const stored = localStorage.getItem('sportlink_user')
  if (stored) {
    const user = JSON.parse(stored)
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
  }
  return config
})

export default api
