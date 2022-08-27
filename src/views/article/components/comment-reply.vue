<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('clickClose')"
      />
    </van-nav-bar>
    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <van-cell title="所有回复" />
    <!-- 评论的回复列表 -->
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
      />
    </van-list>
    <!-- 底部 -->
    <!-- /底部 -->
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import { getComments } from '@/api/comment.js'

export default {
  name: 'CommentReply',
  components: {
    CommentItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  methods: {
    async onLoad () {
      // 请求获取数据
      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      // 将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 关闭loading
      this.loading = false
      // 判断是否加载完毕
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
