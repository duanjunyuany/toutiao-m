<template>
  <div class="article-list-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" /> -->
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      // 存储列表数据
      list: [],
      // 控制加载中loading状态
      loading: false,
      // 控制数据加载完成的状态
      finished: false,
      // 请求下一页数据的时间戳
      timestamp: null,
      // 是否加载失败
      error: false,
      // 控制下拉刷新的状态
      isLoading: false
    }
  },
  methods: {
    // 初始化或滚动到底部时触发onLoad
    async onLoad () {
      try {
        // 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          // 时间戳，请求新的推荐数据传当前的时间戳
          timestamp: this.timestamp || Date.now()
        })
        // 把获取结果添加到list数组
        const { results } = data.data
        this.list.push(...results)
        // 本次数据加载结束后把加载状态设置为结束
        this.loading = false
        // 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了
          this.finished = true
        }
      } catch (err) {
        // 加载失败
        this.loading = false
        this.error = true
      }
    },
    async onRefresh () {
      try {
        // 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        // 将数据放在列表顶部
        this.list.unshift(...data.data.results)
        // 关闭下拉刷新状态
        this.isLoading = false
      } catch (err) {
        this.$toast.fail('刷新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list-container {
  height: 79vh;
  overflow-y: auto;
}
</style>
