<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'

export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('不能为空')
          return
        }
        // 提交昵称
        await updateUserProfile({
          name: localName
        })
        // 更新视图
        this.$emit('input', localName)
        // 关闭弹层
        this.$emit('close')
        this.$toast('修改成功')
      } catch (error) {
        this.$toast('修改失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-name {
  /deep/ .van-nav-bar__text {
    color: white;
  }
  .field-wrap {
    padding: 20px;
  }
}
</style>
