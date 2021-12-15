# 开发规范
#### 新增 view
在 [@/views](https://gitee.com/xmo/MineAdmin/tree/master/mine-ui/src/views) 文件下 创建对应的文件夹，一般性一个路由对应一个文件， 该模块下的功能就建议在本文件夹下创建一个新文件夹，各个功能模块维护自己的utils或components组件。

#### 新增 api
在 [@/api/apis](https://gitee.com/xmo/MineAdmin/tree/master/mine-ui/src/api/apis) 文件夹下创建本模块对应的 api 服务。

#### 新增组件
在全局的 [@/components](https://gitee.com/xmo/MineAdmin/tree/master/mine-ui/src/components)写一些全局的组件，如富文本，各种搜索组件，封装的分页组件等等能被公用的组件。

每个页面或者模块特定的业务组件则会写在当前 [@/views](https://gitee.com/xmo/MineAdmin/tree/master/mine-ui/src/views)下面。
如：@/views/system/user/components/xxx.vue。这样拆分大大减轻了维护成本。

#### 新增样式
页面的样式和组件是一个道理，全局的 [@/style](https://gitee.com/xmo/MineAdmin/tree/master/mine-ui/src/style) 放置一下全局公用的样式，每一个页面的样式就写在当前 views 下面，请记住加上scoped 就只会作用在当前组件内了，避免造成全局的样式污染。
