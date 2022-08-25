<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText" />
    <!-- 联想建议 -->
    <search-suggest v-else-if="searchText" :searchText="searchText" @search="onSearch" />
    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :searchHistories="searchHistory"
      @allDelete="deleteAll"
      @everyDelete="deleteOne"
      @isSearchClick="onSearch"
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggest from './components/search-suggest.vue'
import SearchResult from './components/search-result.vue'
import { getItem, setItem } from '@/utils/storage.js'

export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: getItem('searchHistory') || []
    }
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      // 不要有重复历史记录，最新的记录排在前面
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        // 如果记录重复，则删除原先的旧记录
        this.searchHistory.splice(index, 1)
      }
      // 把记录添加到数组头部
      this.searchHistory.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
    // 删除一条记录
    deleteOne (index) {
      this.searchHistory.splice(index, 1)
    },
    // 删除全部记录
    deleteAll () {
      // this.searchHistory = []
      this.searchHistory.splice(0, this.searchHistory.length)
    }
  },
  watch: {
    searchHistory (val) {
      // 同步到本地存储
      setItem('searchHistory', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: white;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
