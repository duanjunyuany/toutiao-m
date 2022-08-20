# toutiao-m

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

遇到的问题
1.在给导航栏设置背景色时，全局样式被vant组件的样式覆盖了，通过调试发现自己写的全局样式没有生效
解决：（1）可以使用!important提高全局样式的优先级，但不推荐
     （2）在入口文件发现vant的样式放在了全局样式的下面，调整加载顺序，把全局样式放在vant样式的后面
2.在发起登录请求是接口地址失效，查找CSDN发现文档已更新
更新后的接口根地址： http://toutiao.itheima.net
新版接口文档地址： http://toutiao.itheima.net/api.html
3.在获取验证码按钮和切换倒计时效果时，不能正常显示按钮和倒计时，经过检查发现，倒计时的位置不对，没有把倒计时和按钮放在一个标签中，在倒计时中设置v-if，在同级的标签中设置v-else，但是按钮是这个标签的子元素，所以出错，解决办法是把倒计时跟按钮放在同一个父元素里
4.在实现发送验证码时，手机接收不到验证码，但是代码显示发送成功，可能是后端停止发送验证码服务
5.token过期问题后续会处理
6.标签栏切换时，不能切换回首页，而且首页一直是高亮状态
原因：vant版本高，将匹配规则改了，适应高版本应该对每一个路由都指定具体的路径，如果处于子路由模块下，那父路由应该使用重定向指向要跳转的子路由，对于tab组件，在路由模式下的to应该指定具体的路径