// 搜索模块

import request from '@/utils/request'
// 获取联想建议
const getSuggests = data => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q: data
    }
  })
}
// 获取搜索结果
const getResults = data => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params: data
  })
}

export { getSuggests, getResults }
