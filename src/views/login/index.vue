<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        name="用户名"
        placeholder="请输入手机号"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        type="password"
        name="密码"
        placeholder="请输入验证码"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button round size="small" type="default" class="get-msg-btn">获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
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