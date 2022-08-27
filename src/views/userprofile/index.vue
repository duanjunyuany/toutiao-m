<template>
  <div class="userinfo-container">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" class="van-nav-bar" left-arrow @click-left="$router.back()" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
        <van-image class="img" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link />
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
    <van-cell title="生日" :value="user.birthday" is-link />
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'

export default {
  name: 'UserprofilePage',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        this.$toast('获取信息失败')
      }
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style lang="less" scoped>
.userinfo-container {
  .img {
    width: 60px;
    height: 60px;
  }
}
</style>
