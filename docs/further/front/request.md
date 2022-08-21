# 网络请求
MineAdmin 是通过 `Axios` 包来实现网络请求的。这个包非常强大，我们做了封装，也仅仅使用了部分功能
- 请求封装了自动携带Token
- 请求自动识别开发/生产模式
- 请求自动识别是否使用代理模式
- 请求自动根据前端设置的国际化，请求相应的多语言
- 响应封装了统一的拦截器
- 响应自动根据响应判断是否需要登录
- 请求和响应的异常处理

:::tip request.js
封装的请求处理文件在 `src/utils/request.js` 可查看源码，自行根据需求加入功能
:::

前端跟大多数一样，有专门的目录存放所有的网络请求的 `api` 文件，它们存放在 `src/api` 目录下
- 一些公共的网络请求或者无法分类的网络请求则放在 `src/api` 根目录下
- 普通业务的网络请求则要根据 `模块` 来存放

:::tip
目前，api目录下有 `system` 和 `setting` 两个模块，如果建立了模块，此目录也要建立相应的模块目录
:::

## 使用示例

### 定义
```js
// 示例 src/api/foo/foo.js
import { request } from '@/utils/request'

export default {
    login(params = {}) {
        return request({
            url: 'system/login',
            method: 'post',
            data: params
        })
    }
}
```
:::tip 其他参数
- header: 可自定义请求头的参数
- timeout: 可自定义请求超时时间，默认为 30 秒。如下载接口可定义时间长一些
- responseType: 指定相应返回数据的类型，一般不需要设置，如果是下载返回的二进制，则需要指定 `blob`
:::

### Vue页面使用
使用 Promise 方式
```js
import foo from '@/api/foo/foo'
const data = {
    username: 'superAdmin',
    password: 'admin123'
}
foo.login(data).then( response => {
    if (response.success) {
        console.log('登录成功')
    }
}).catch( err => {
    console.error(error)
})
```

使用同步模式
```js
import foo from '@/api/foo/foo'
const data = {
    username: 'superAdmin',
    password: 'admin123'
}
const login = async () => {
    const response = await foo.login(data)
    response.success && console.log('登录成功')
}
login()
```