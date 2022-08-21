# 路由

:::tip
路由是前端系统的核心，没有路由系统将无法运行。所以，前端开发有必要完全掌握路由使用和定义。
:::

## 静态路由
- 静态路由在 `src/router/webRouter.js` 中定义
- 后台首页的静态路由在 `src/router/homePageRoutes.js` 中定义
- 静态路由不受动态权限控制（除硬编码外），主要适用于公共页面，并且不需要权限控制的功能。

```js
... // 其他路由

{
    name: "test",                    // 路由名称（标识符） 唯一
    path: "/test",                   // 路由地址，浏览器访问的地址，要唯一
    meta: {
        title: "标题",               // 路由标题，显示在浏览器标题栏
        icon : "图标",               // 路由图标
    },
    component: () => import('@/views/test/index.vue'),   // 路由绑定的页面组件地址
}

... // 其他路由
```

## 动态路由

:::tip
动态路由需要在菜单管理添加与修改，是跟 `用户`、`角色` 等功能息息相关，并且动态路由受权限动态控制。

与静态路由不同的是，动态路由表完全存放在后台数据库，每次刷新页面都会从后台请求当前登录用户的路由列表，Vue通过分析路由结构给动态添加到路由器里
:::

## 路由使用
在开发中经常会用到页面跳转、或者获取当前页面信息等需求，那么有必要掌握路由方面的一些操作

### 获取当前路由信息
使用 `useRoute()` 获取当前路由的API，可通过此API获取当前路由的信息，比如 path、name、query 等参数。

更多信息可以参考 `vue-router` 的setup语法使用[文档](https://router.vuejs.org/zh/guide/advanced/composition-api.html)
```js
import { useRoute } from 'vue-router'
const route = useRoute()
```

### Vue页面路由跳转
使用 `useRouter()` API可操作路由的跳转，更多使用方式，可参考 `vue-router` 的文档
```js
import { useRouter } from 'vue-router'
const router = useRouter()

// 直接输入要跳转的路由
router.push('/login')

// 指定路由的 name 跳转
router.push({ name: 'login' })

// 指定路由的 path 跳转
router.push({ path: '/login' })

// 带上参数跳转
router.push({ name: 'login', query: { id: 1, name: '张三' } })
```