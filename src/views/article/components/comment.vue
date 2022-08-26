<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败，稍后重试"
    @load="onLoad"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @deleteLike="deleteLikeOne"
      @addLike="addLikeOne"
      @qufan="reverse"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from './comment-item.vue'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 获取下一页数据
      offset: null,
      limit: 10,
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        // 请求获取数据
        const { data } = await getComments({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        // 将数据添加到列表
        const { results } = data.data
        this.list.push(...results)
        // 把评论总数传给父组件
        this.$emit('totalCount', data.data)
        // 将loading关闭
        this.loading = false
        // 判断是否还有数据，有就获取下一页页码，没有就将finished结束
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    deleteLikeOne (id) {
      const count = this.list.find((item) => {
        return item.com_id === id
      })
      const index = this.list.indexOf(count)
      this.list[index].like_count--
    },
    addLikeOne (id) {
      const count = this.list.find((item) => {
        return item.com_id === id
      })
      const index = this.list.indexOf(count)
      this.list[index].like_count++
    },
    reverse (id) {
      const count = this.list.find((item) => {
        return item.com_id === id
      })
      const index = this.list.indexOf(count)
      this.list[index].is_liking = !this.list[index].is_liking
    }
  },
  created () {
    this.onLoad()
  }
}
</script>

<style lang="less" scoped>

</style>
