<template>
  <div class="search-history-container">
    <van-cell title="搜索历史">
      <template v-if="isDeleteShow">
        <span @click="allDelete">全部删除</span>
        &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </template>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <!-- 历史记录列表 -->
    <van-cell :title="item" v-for="(item, index) in searchHistories" :key="index" @click="everyDelete(item, index)">
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 元素的显示状态
      isDeleteShow: false
    }
  },
  methods: {
    // 全部删除
    allDelete () {
      this.$emit('allDelete')
    },
    // 每一个记录删除
    everyDelete (item, index) {
      if (this.isDeleteShow) {
        // 如果是删除状态，执行删除操作
        this.$emit('everyDelete', index)
      } else {
        // 否则执行搜索操作
        this.$emit('isSearchClick', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
