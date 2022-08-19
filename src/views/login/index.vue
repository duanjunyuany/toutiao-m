<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="countDown"
            :time="1000 * 5"
            format="ss s"
            @finish="countDown = false"
          />
          <van-button
            v-else
            round
            size="small"
            type="default"
            class="get-msg-btn"
            native-type="button"
            @click="onSendMsg"
          >
          获取验证码
          </van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入登录请求模块
import { login, sendCode } from '@/api/user.js'

export default {
  name: 'LoginPage',
  data () {
    return {
      // 用户手机号和验证码
      user: {
        mobile: '',
        code: ''
      },
      // 表单验证
      userFormRules: {
        mobile: [
          { require: true, message: '手机号不能为空' },
          { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '手机号格式错误' }
        ],
        code: [
          { require: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      // 倒计时状态
      countDown: false
    }
  },
  methods: {
    async onSubmit () {
      // 开始转圈，正在登录
      this.$toast.loading({
        // 持续时间，0表示一直展示
        duration: 0,
        // 禁止背景点击
        forbidClick: true,
        // 提示消息
        message: '登录中...'
      })
      // 发送登录请求
      try {
        const { data } = await login(this.user)
        // console.log('登录成功', res)
        this.$store.commit('setUserToken', data.data)
        // 提示success或fail时会先把其他的toast清除掉
        this.$toast.success('登录成功')
      } catch (err) {
        // console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    async onSendMsg () {
      // 验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 验证通过，显示倒计时
      this.countDown = true
      // 请求发送验证码
      try {
        await sendCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.countDown = false
        if (err.response.statue === 429) {
          this.$toast('发送频繁，稍后再试')
        } else {
          this.$toast('发送失败，稍后再试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  // 左侧小图标
  .toutiao {
    font-size: 37px;
  }
  // 验证码按钮
  .get-msg-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  // 登录按钮
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
