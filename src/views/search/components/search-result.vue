<template>
  <div class="search-result-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getResults } from '@/api/search.js'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 10,
      error: false
    }
  },
  methods: {
    async onLoad () {
      // 请求获取数据
      try {
        const { data } = await getResults({
          page: this.page,
          per_page: this.perpage,
          q: this.searchText
        })
        // 将数据添加到数组中
        const { results } = data.data
        this.list.push(...results)
        // 将本次加载的loading关闭
        this.loading = false
        // 判断是否还有数据，有则更新获取下一个数据的页码，没有则将finished设为结束
        if (results.length) {
          // 如果有
          this.page++
        } else {
          // 如果没有
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
