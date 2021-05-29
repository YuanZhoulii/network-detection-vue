# network-detection-vue

## 介绍

基于Vue+Element+ECharts实现network-detection前台系统前端功能

![输入图片说明](https://images.gitee.com/uploads/images/2021/0529/192713_e16a5d9c_5036914.png "屏幕截图.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0529/195425_345467eb_5036914.png "屏幕截图.png")

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