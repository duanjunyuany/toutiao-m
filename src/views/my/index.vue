<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header userinfo" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            class="touimg"
            round
            fit="cover"
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑用户资料</van-button>
        </div>
      </div>
      <div class="data-state">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" class="mb-9" is-link />
    <van-cell v-if="user" title="退出登录" class="logout-cell" clickable @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'

export default {
  name: 'MyPage',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  methods: {
    onLogout () {
      // 退出提示
      // 确认退出，清除登录状态（容器中的user和本地存储的user）
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        // console.log('退出成功')
        this.$store.commit('setUserToken', null)
      }).catch(() => {
        // console.log('取消退出')
      })
    },
    async loadUserInfo () {
      // 获取用户信息
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取用户信息失败')
      }
    }
  },
  created () {
    // 如果已登录，则请求加载用户信息
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 360px;
    background-image: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: white;
      }
    }
  }
  .userinfo {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 230px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .touimg {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-state {
      display: flex;
      // height: 130px;
      .data-item {
        flex: 1;
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 10px;
    .grid-item {
      height: 140px;
      .toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d
      }
      .text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    margin-top: 10px;
    text-align: center;
    color: rgb(207, 39, 39)
  }
}
</style>
