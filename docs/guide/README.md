# 介绍

<p align="center">
    <img src="/logo.svg" width="120" />
</p>
<div class="h1center">MineAdmin</div>
<div class="tags">
    <img src="https://gitee.com/xmo/MineAdmin/badge/star.svg?theme=dark" />
    <img src="https://gitee.com/xmo/MineAdmin/badge/fork.svg?theme=dark" />
    <img src="https://svg.hamm.cn/badge.svg?key=License&value=Apache-2.0&color=da4a00" />
    <img src="https://svg.hamm.cn/badge.svg?key=MineAdmin&value=v1.0.0" />
</div>

::: tip 缘由
PHP有很多优秀的后台管理系统，但基于Swoole的后台管理系统没找到合适我自己的。
所以就开发了一套后台管理系统。系统可以用于网站管理后台、CMS、CRM、OA、ERP等。

如果觉着还不错的话，就请点个 ⭐star 支持一下吧，这将是对我最大的支持和鼓励！    
:::

`MineAdmin` 基于 <a href="http://www.hyperf.io" target="_blank">Hyperf</a> 框架开发。企业级架构分层，轻松支撑创业公司及个人前期发展使用，使用少量的服务器资源媲美静态语言的性能。前端使用Vue3 + Vite3 + Pinia + Arco，一端适配PC、移动端、平板。企业和个人可以免费使用

`MineAdmin` 是一个后台权限管理系统，提供完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。

## 在Vue中使用JSON完成CRUD
在传统的前后端分离架构下，前端必须要配置专业的前端开发人员来完成业务，这对于PHPer习惯前后端一把梭来说比较费事。
在JQuery逐渐没落的大趋势下，使用Vue成为趋势，但从JQ到Vue转变最难的是思想。

MineAdmin强调快速开发，为了适应现代开发模式并且兼顾传统一把梭，特开发出了crud和form两个组件，
只需要像过去配置json的方式即可完成对后端的接口联调，从而快速完成CRUD，大大替开发人员节省了时间。
让刚接触VUE的同学也能上手vue，体验vue的好处。

## 内置功能
1.  用户管理，完成用户添加、修改、删除配置，支持不同用户登录后台看到不同的首页
2.  部门管理，部门组织机构（公司、部门、小组），树结构展现支持数据权限
3.  岗位管理，可以给用户配置所担任职务
4.  角色管理，角色菜单权限分配、角色数据权限分配
5.  菜单管理，配置系统菜单和按钮等
6.  字典管理，对系统中经常使用并且固定的数据可以重复使用和维护
7.  系统配置，系统的一些常用设置管理
8.  操作日志，用户对系统的一些正常操作的查询
9.  登录日志，用户登录系统的记录查询
10. 在线用户，查看当前登录的用户
11. 服务监控，查看当前服务器状态和PHP环境等信息
12. 附件管理，管理当前系统上传的文件及图片等信息
13. 数据表维护，对系统的数据表可以进行清理碎片和优化
14. 模块管理，管理系统当前所有模块
15. 定时任务，在线（添加、修改、删除)任务调度包含执行结果日志
16. 代码生成，前后端代码的生成（php、vue、js、sql），支持下载和生成到模块
17. 缓存监控，查看Redis信息和系统所使用key的信息
18. API管理，对应用和接口管理、接口授权等功能。接口文档自动生成，输入、输出参数检查等
19. 队列管理，消息队列管理功能、消息管理、消息发送。使用ws方式即时消息提醒（需安装rabbitMQ）

## 非官方QQ交流群

> <img src="https://img.shields.io/badge/Q群-150105478-red.svg" />

## 演示图片
<img src="https://s1.ax1x.com/2022/07/31/vklKzR.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vklGdO.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vkl8eK.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vkl1L6.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vklwQI.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vkldSA.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vklNJH.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vklJoD.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vkllsx.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vklZoF.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vklUWd.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vkl0yt.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vkltFe.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vkluW9.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vklnJJ.jpg" />
<img src="https://s1.ax1x.com/2022/07/31/vklmi4.jpg" />

<style>
.h1center {
    font-size: 38px; text-align: center;
}
.tags {
    text-align: center; margin-top: 20px;
}
.tags img {
    margin-left: 5px;
}
</style>