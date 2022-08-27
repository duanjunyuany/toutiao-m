// 评论请求模块
import request from '@/utils/request'

// 获取文章评论
const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params: params
  })
}
// 对评论点赞
const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消评论点赞
const deleteCommentLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
// 发布评论或评论回复
const addComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: data
  })
}
export { getComments, addCommentLike, deleteCommentLike, addComment }
