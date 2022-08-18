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