// 用户相关的请求模块
import request from '@/utils/request'
// import store from '@/store'
// 用户登录
const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}
// 发送验证码
const sendCode = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户信息
const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头，验证身份
    // headers: {
    //   // token的格式Bearer xxxxx
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 获取频道列表
const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

export { login, sendCode, getUserInfo, getUserChannels }
