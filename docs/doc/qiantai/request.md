# 请求流程

## 交互流程
一般一个完整的前端与服务端交互流程是这样的：

- 前端 UI 组件交互操作
- 调用统一管理的请求函数
- 使用封装的 request.js 发送请求
- 获取服务端返回
- 更新数据到界面 UI

为了方便管理维护，请求`api`文件都放在 `@/src/api/apis` 目录中，并且一般按照 `模块名/业务名` 纬度进行拆分文件，如：
```shell
api/
  apis/                 # api目录
    system/             # 模块目录
      user.js           # 用户业务api
      role.js           # 角色业务api
      ...               # 其他业务api
    setting/            # 模块目录
      operlog.js
      ...               # 其他业务api
    ...                 # 其他模块
```

:::tip
其中，[@/src/utils/request.js](https://gitee.com/xmo/MineAdmin/blob/master/mine-ui/src/utils/request.js) 是基于 axios 的封装，便于统一处理请求参数，请求头，以及错误提示信息等。系统封装了全局的 `request拦截器`、`response拦截器`、`统一的错误处理`、`统一做了超时处理`，以及对 `下载文件` 处理设置等。
:::

## 请求示例
```js
// api/apis/system/user.js 部分代码
import { request } from '@/utils/request.js'

export default {

  /**
   * 获取用户
   * @returns
   */
  getPageList (params = {}) {
    return request({
      url: 'system/user/index',
      method: 'get',
      params
    })
  },
}

// demo.vue 演示代码
export default {
  data() {
    userList: [],
    loading: false
  },
  methods: {
    getUserList() {
      this.loading = true
      let params = {
        pageSize: 10    // 每页请求10条记录
      }
      // 请求用户接口 通过 this.$API.业务文件名.函数名 来调用接口
      this.$API.user.getPageList(params).then(res => {
        this.userList = res.items
        this.loading = false
      })
    }
  }
}