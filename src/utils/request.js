// axios请求模块
import axios from 'axios'

// 拦截模块

// 响应模块

const request = axios.create({
  // 请求根路径
  baseURL: 'http://toutiao.itheima.net'
})

export default request
