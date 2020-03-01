# 如何使用 Ts+Vue 快速开发一个浏览器扩展

## 初始化项目 / 搭建环境

前期准备：

1. 安装 VueCli
2. 新建一个项目，预设选择 TS，其他随意
3. 安装 `vue-cli-plugin-browser-extension` 插件

上述步骤除了`Vue ui`通过可视界面操作之外，也可以通过命令行实现

```cmd
npm install vue@cli -g
```
```cmd
vue create my-ext
```
```cmd
vue add `vue-cli-plugin-browser-extension`
```

根据插件的设置步骤一步步来，就会自动为你生成对应的文件和目录架构。
至此，就可以写一些vue组件或者ts来测试一下是否能正常编译。

## 初步尝试
1. 打开 vue build，**设置监听变化**
2. 打开chrome的扩展页面，开发者模式下选择**加载已解压的扩展程序**

ok,一个扩展就可以运行起来啦！