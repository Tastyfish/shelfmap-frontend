import axios from 'axios'
import store from '@/store'
import router from '@/router'

const API_URL = 'http://localhost:3000'

const secureAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const plainAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

secureAxios.interceptors.request.use(config => {
  const method = config.method?.toUpperCase()
  if (method !== 'OPTIONS') {
    config.headers = {
      ...config.headers,
      Authorization: store.state.jwt
    }
  }
  return config
})

secureAxios.interceptors.response.use(undefined, error => {
  if (error.response && error.response.config && error.response.status === 401) {
    // If 401 by expired access cookie, we do a refresh request
    store.commit('signout')
    router.replace({ name: 'signin' })
  }

  return Promise.reject(error)
})

export { secureAxios, plainAxios }
