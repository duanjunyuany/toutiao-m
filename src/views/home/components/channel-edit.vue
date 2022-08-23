<template>
  <div class="channel-edit-container">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="min"
        class="editbtn"
        @click="isEdit = !isEdit"
        >{{isEdit ? '完成' : '编辑'}}
        </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels2"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fiexChannels.includes(channel.id)"
        >
        </van-icon>
        <span
          class="text"
          :class="{ active: index === active }"
          slot="text"
        >{{channel.name}}
        </span>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="suggest-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in reChannels"
        :key="index"
        :text="channel.name"
        icon="plus"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      myChannels2: this.myChannels,
      isEdit: false,
      // 固定频道
      fiexChannels: [0]
    }
  },
  computed: {
    ...mapState(['user']),
    reChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
      // const channels = []
      // this.allChannels.forEach(channel => {
      //   // 遍历数组，找到满足条件的元素项
      //   const ret = this.myChannels.find(mychannel => {
      //     return mychannel.id === channel.id
      //   })
      //   // 如果我的频道不包含该频道项，则放到推荐频道中
      //   if (!ret) {
      //     channels.push(channel)
      //   }
      // })
      // return channels
    }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel (channel) {
      this.myChannels2.push(channel)
      // 数据持久化
      if (this.user) {
        // 已登录
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels2.length
          })
        } catch (err) {
          this.$toast('保存失败，稍后再试')
        }
      } else {
        // 未登录
        setItem('TOUTIAO_CHANNELS', this.myChannels2)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 如果是固定频道，不删除
        if (this.fiexChannels.includes(index)) {
          return
        }
        // 如果是编辑状态，执行删除频道
        if (index <= this.active) {
          // 让激活频道的索引-1
          this.$emit('updateActive', this.active - 1, true)
        }
        this.myChannels2.splice(index, 1)
        // 处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('updateActive', index, false)
      }
    },
    async deleteChannel (channel) {
      if (this.user) {
        // 已登录
        try {
          await deleteUserChannel(channel.id)
        } catch (err) {
          this.$toast('保存失败，稍后再试')
        }
      } else {
        // 未登录
        setItem('TOUTIAO_CHANNELS', this.myChannels2)
      }
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style lang="less" scoped>
.channel-edit-container {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .editbtn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .suggest-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
