<template>
  <div class="search-suggest-container">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggests } from '@/api/search.js'
// 按需加载debounce
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggest',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 联想建议数组
      suggestions: []
    }
  },
  methods: {
    async loadSuggests (value) {
      try {
        const { data } = await getSuggests(value)
        if (data.data.options[0] === null) {
          // 如果拿到的数组里面只有一个值null，则退出这个函数
          return
        }
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，稍后再试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 需要手动new RegExp
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  },
  watch: {
    searchText: {
      // 当searchText变化时调用handler函数
      // handler (value) {
      //   this.loadSuggests(value)
      // },
      // handler: function (value) {
      //   this.loadSuggests(value)
      // },
      // 使用loadsh实现防抖
      handler: debounce(function (value) {
        this.loadSuggests(value)
      }, 500),
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggest-container {
  /deep/ .active {
    color: #3296fa;
  }
}
</style>
