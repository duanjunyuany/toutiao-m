// postcss.config.js
module.exports = {
  // 配置使用的postcss插件
  plugins: {
    // 配置使用的postcss-pxtorem插件
    'postcss-pxtorem': {
      // 根据vant样式或自己写的样式动态定义1/10的大小
      // 如果是vant样式，1rem=37.5px
      // 如果是自己写的样式，1rem=75px
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 应用与全部样式
      propList: ['*'],
    }
  }
}