---
home: true
heroImage: /logo.svg
heroText: MineAdmin
---

<div class="go">
  <a href="/doc/guide/" class="start">快速开始</a>
  <a href="https://demo.mineadmin.com" target="blank" class="demo">演示站</a>
</div>

<div>
  <img src="https://s4.ax1x.com/2022/01/16/7t9aWD.png" />
</div>

<div class="list">
  <div>
    <h5>流行的技术栈</h5>
    <span>使用基于Swoole的Hyperf高性能协程框架，Vue + Element作为前端，完全的前后端分离。PHP以常驻内存方式运行，大大提高了安全和性能。并且Hyperf框架提供了Mysql、Redis连接池等特性，让PHP焕然一新</span>
  </div>
  <div>
    <h5>使用注解代替配置文件</h5>
    <span>在PHP项目还是以配置文件为主的时候，MineAdmin全部使用注解方式替代配置文件，极大提高开发效率。路由、身份验证、权限控制、操作日志、事务等都以注解方式实现，后面还会增加更多注解替代传统配置文件</span>
  </div>
  <div>
    <h5>基础功能完善</h5>
    <span>内置了完整的权限体系，包括：菜单、用户、角色、部门等权限控制。也包括了日常的系统监控、字典代码、数据表维护。还有开发利器：在线表设计器、代码生成器等功能。</span>
  </div>
</div>

<div class="copyright">Copyright © 2021-2022 mineadmin.com All Rights Reserved</div>
<style>
.go {
  width: 400px; display: flex; margin:0 auto; justify-content: space-around; align-items: center;
  height: 100px; margin-top: -30px;
}
.go .start {
  background: #0960bd; display: inline-block; width: 170px; height: 50px; line-height: 50px; text-align:center;
  font-size: 1rem; border-radius: 4px; color: #fff;
}
.go .start:hover {
  background: #1a80ed
}
.go .demo {
  border: 1px solid #0960bd; display: inline-block; width: 168px; height: 48px; line-height: 48px; text-align: center;
  font-size: 1rem; border-radius: 4px; color: #0960bd; 
}
.go .demo:hover {
  background: #d4e9ff;
}
.home .hero .description {
  font-size: 14px;
}
.copyright {
  font-size: 14px; text-align:center; color: #555; height: 80px; line-height: 80px;
}
.list {
  display:flex;
}
.list div {
  padding: 10px;
}
.list div h5{
  font-size: 24px; font-weight:100; text-align:center; 
}
.list div span{
  font-size: 14px; color: #555; line-height: 28px;
}
#app {
}
body .home .hero img {
  max-height: 130px;
}
</style>