# 介绍
<center class="h1center">MineAdmin</center>
<div class="tags">
    <img src="https://gitee.com/xmo/MineAdmin/badge/star.svg?theme=dark" />
    <img src="https://gitee.com/xmo/MineAdmin/badge/fork.svg?theme=dark" />
    <img src="https://svg.hamm.cn/badge.svg?key=License&value=Apache-2.0&color=da4a00" />
    <img src="https://svg.hamm.cn/badge.svg?key=MineAdmin&value=v0.6.3" />
</div>

::: tip
PHP有很多优秀的后台管理系统，但基于Swoole的后台管理系统没找到合适我自己的。
所以就开发了一套后台管理系统。系统可以用于网站管理后台、CMS、CRM、OA、ERP等。

如果觉着还不错的话，就请点个 ⭐star 支持一下吧，这将是对我最大的支持和鼓励！    
:::

`MineAdmin` 基于 <a href="http://www.hyperf.io" target="_blank">Hyperf</a> 框架开发，前端使用Vue3.0 + <a href="https://gitee.com/lolicode/scui" target="_blank">SCUI</a>（基于 <a href="https://element-plus.gitee.io/" target="_blank">Element UI</a>），支持PC和移动端。企业和个人可以免费使用。

`MineAdmin` 是一个后台权限管理系统，提供完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。

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
12. 依赖监控，查看当前程序所依赖的库信息和版本
13. 附件管理，管理当前系统上传的文件及图片等信息
14. 数据表维护，对系统的数据表可以进行清理碎片和优化
15. 模块管理，管理系统当前所有模块
16. 数据表设计器，简单版数据库设计器，搭配代码生成器事半功倍
17. 定时任务，在线（添加、修改、删除)任务调度包含执行结果日志
18. 代码生成，前后端代码的生成（php、vue、js、sql），支持下载和生成到模块
19. 缓存监控，查看Redis信息和系统所使用key的信息
20. API管理，对应用和接口管理、接口授权等功能。接口文档自动生成，输入、输出参数检查等
21. 队列管理，消息队列管理功能、消息管理、消息发送。使用ws方式即时消息提醒（需安装rabbitMQ）

## QQ技术交流群

> <img src="https://img.shields.io/badge/Q群-15169734-red.svg" />


## 鸣谢

> 以下排名不分先后

[hyperf 一款高性能企业级协程框架](https://hyperf.io/)

[SCUI 中后台前端解决方案](https://gitee.com/lolicode/scui)

[swoole PHP协程框架](https://www.swoole.com)

[Element Plus 桌面端组件库](https://element-plus.gitee.io/zh-CN/)


## 演示图片
<table>
    <tr>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4n3tA.png"></td>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nKmD.png"></td>
    </tr>
    <tr>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4n1kd.png"></td>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nQTH.png"></td>
    </tr>
    <tr>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nM0e.png"></td>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4n8fI.png"></td>
    </tr>
    <tr>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nJpt.png"></td>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nY1P.png"></td>
    </tr>
    <tr>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nt6f.png"></td>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nNX8.png"></td>
    </tr>
     <tr>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nw7Q.png"></td>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nanS.png"></td>
    </tr>
    <tr>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nBkj.png"></td>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nrhn.png"></td>
    </tr>
    <tr>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nDts.png"></td>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nypq.png"></td>
    </tr>
    <tr>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4n610.png"></td>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4ngXT.png"></td>
    </tr>
    <tr>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nccV.png"></td>
        <td><img src="https://z3.ax1x.com/2021/08/17/f4nRnU.png"></td>
    </tr>
</table>

<style>
.h1center {
    font-size: 38px;
}
.tags {
    text-align: center; margin-top: 20px;
}
</style>