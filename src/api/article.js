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
// 收藏文章
const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
// 取消收藏
const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
// 点赞文章
const addLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消点赞
const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}

export { getArticles, getArticleById, addCollect, deleteCollect, addLike, deleteLike }
