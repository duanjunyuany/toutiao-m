<template>
  <div class="home-container">
    <!-- 搜索栏 -->
    <van-nav-bar class="van-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >搜索
      </van-button>
    </van-nav-bar>
    <!-- 标签页 -->
    <van-tabs class="channel-tabs" v-model="active" animated  swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEdit = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEdit"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit :myChannels="channels" :active="active" @updateActive="onUpdateActive" />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'

export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      active: 0,
      // 频道列表
      channels: [],
      // 控制编辑频道弹出层
      isChannelEdit: false
    }
  },
  methods: {
    // 获取频道
    async loadChannels () {
      try {
        let channels = []
        if (this.user) {
          // 已登录，请求获取用户频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，判断是否本地有列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 有就拿来用
          if (localChannels) {
            channels = localChannels
          } else {
            // 没有就请求默认列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道失败')
      }
    },
    onUpdateActive (index, isShow = true) {
      this.active = index
      this.isChannelEdit = isShow
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 175px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: 100%;
  }
  .search-btn {
    width: 450px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 20px;
    }
    .van-tabs__line {
      width: 30px !important;
      height: 6px;
      background-color: #3296fa;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 2px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
