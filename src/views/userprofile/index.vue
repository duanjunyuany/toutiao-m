<template>
  <div class="userinfo-container">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" class="van-nav-bar" left-arrow @click-left="$router.back()" />
    <!-- 个人信息 -->
    <input
      type="file"
      hidden
      ref="file"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
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
    <!-- 编辑头像 -->
    <van-popup v-model="isUpdatePhotoShow" style="height: 100%" position="bottom">
      <update-photo v-if="isUpdatePhotoShow" :img="img" @close="isUpdatePhotoShow = false" @update-photo="user.photo = $event" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'

export default {
  name: 'UserprofilePage',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
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
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true
      // 如果选择同一个文件则不会触发change事件，需要在每次使用后，把value清空
      this.$refs.file.value = ''
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
