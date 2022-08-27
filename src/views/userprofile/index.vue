<template>
  <div class="userinfo-container">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" class="van-nav-bar" left-arrow @click-left="$router.back()" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
        <van-image class="img" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell @click="isUpdateNameShow = true" title="昵称" :value="user.name" is-link />
    <van-cell @click="isUpdateGenderShow = true" title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
    <van-cell @click="isUpdateBirthdayShow = true" title="生日" :value="user.birthday" is-link />
    <!-- 编辑昵称 -->
    <van-popup v-model="isUpdateNameShow" style="height: 100%;" position="bottom">
      <update-name v-if="isUpdateNameShow" @close="isUpdateNameShow = false" v-model="user.name" />
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender v-if="isUpdateGenderShow" @close="isUpdateGenderShow = false" v-model="user.gender" />
    </van-popup>
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday v-if="isUpdateBirthdayShow" @close="isUpdateBirthdayShow = false" v-model="user.birthday" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'

export default {
  name: 'UserprofilePage',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday
  },
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false
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
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
