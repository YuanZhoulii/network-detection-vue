# network-detection-vue

## 介绍

网络资源探测系统前端项目

## 相关技术

Vue+Element+ECharts

## 项目结构 

```
network-detection
├─static  包含地图数据、主题文件、网站图标等第三方资源文件
│
├─src 源码目录
│  ├─assets 包含组件中使用到的CSS样式、字体、图片和视频资源文件
│  ├─components 包含各类页面组件
│  │  ├─common 公共模块
│  │  ├─user 用户模块
│  │  ├─visual 可视化模块
│  │  ├─search 搜索模块（未实现）
│  ├─router 组件路由配置
│  ├─utils 存放公共方法
│  ├─views 测试组件显示效果
│  ├─App.vue 页面入口
│  ├─main.js 程序入口
│  └store.js vuex配置文件，用于共享数据