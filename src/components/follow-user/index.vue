<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
  >已关注
  </van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
  >关注
  </van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'

export default {
  name: 'FollowButton',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      require: true
    }
  },
  model: {
    // 自定义v-model的数据名称和事件名称
    prop: 'isFollowed',
    event: 'updateFollow'
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow () {
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注
          await deleteFollow(this.userId)
          // this.isFollowed = false
        } else {
          // 未关注
          await addFollow(this.userId)
          // this.isFollowed = true
        }
        // this.isFollowed = !this.isFollowed
        // this.$emit('updateFollow', !this.isFollowed)
        this.$emit('updateFollow', !this.isFollowed)
      } catch (error) {
        let message = '操作失败，稍后重试'
        if (error.response && error.response.status === 400) {
          message = '不能关注自己'
        }
        if (error.response && error.response.status === 401) {
          message = '请先登录'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
