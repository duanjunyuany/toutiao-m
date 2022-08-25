// 文章请求模块
import request from '@/utils/request'

// 获取文章列表
const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: params
  })
}
// 获取文章详情
const getArticleById = id => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${id}`
  })
}
export { getArticles, getArticleById }
