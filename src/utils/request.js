// axios请求模块
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 请求根路径
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起经过这里
  // config本次请求的配置对象
  // config里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 务必返回config，否则请求就停在这里了
  return config
}, function (error) {
  // 请求出错了进入这里
  return Promise.reject(error)
})

// 响应拦截器

export default request
