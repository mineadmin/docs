# 应用与接口

:::tip 说明
MineAdmin提供了一套对外部授权的API应用系统

- 实现了最高基于 OAuth2.0 协议授权
- 实现了文档自动化生成
- 提供了应用分组、接口分组管理
:::

:::warning 注意
这套API应用系统并不建议在系统内部本身使用，若使用反而会造成业务上的繁琐，使得变的更加复杂。
:::

## 应用
:::tip
创建应用前，请先创建应用分组
:::

创建应用会生成一个 `appId` 和 `appSecret`。这两个参数是授权给外部访问接口的重要凭证

<img src="https://s1.ax1x.com/2022/09/28/xmVa5R.png" />

:::warning 注意
编辑应用时，刷新 `appId` 和 `appSecret` 操作会导致正常使用应用接口的访问全部失效。
:::

## 接口
<img src="https://s1.ax1x.com/2022/09/28/xmZSMT.png" />

### 说明
- 接口名称：一般填入该接口的主要作用，比如 `获取用户列表`
- 访问名称：接口的真实访问地址，接口都是以 `http://xxx.com/api/v1/{访问名称}` 形式访问
- 请求模式：支持 `所有、POST、GET、DELETE、PUT` 等形式。
- 类名称：填入类的命名空间地址，例如：`Api\InterfaceApi\v1\DemoApi`
- 方法名称：填入类里的方法名称，例如：`getUserList`

:::tip 访问名称定义小技巧
访问名称不支持 `/` ，但可以用 `.` 来区分层级。

比如，我们对外授权以路由划分功能模块，有 `新增用户` 接口 和 `获取用户列表` 接口，那么可以用下面的方式来定义：
- user.add
- user.list

外部访问实际地址就是：
- http://xxx.com/api/v1/user.add
- http://xxx.com/api/v1/user.list
:::

## 文档

### 如何进入文档
通过 `应用管理` 列表的 `操作栏` 进入应用接口文档
<img src="https://s1.ax1x.com/2022/09/28/xmmqde.png" />

### 文档界面介绍
