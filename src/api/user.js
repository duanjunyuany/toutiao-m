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
// 关注用户
const addFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: target
    }
  })
}
// 取消关注
const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
// 获取当前用户个人资料
const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
// 编辑用户个人资料
const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data: data
  })
}
export { login, sendCode, getUserInfo, getUserChannels, addFollow, deleteFollow, getUserProfile, updateUserProfile }
