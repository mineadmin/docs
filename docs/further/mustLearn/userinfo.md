# 获取用户信息

:::tip
在实际项目中，使用当前登录用户的一些信息是非常常见的，MineAdmin在前后各端都有获取当前登录用户信息的方式
:::
## 前端获取方式
在前端中，用户信息存放在 `store` 中，也就是 `Pinia` 的状态管理，这个是Vue配套的全局状态管理程序，在下一次浏览器刷新前的生命周期内一直存在，而且会被实时监听数据的变化，同时，在所有的vue页面或者js文件中都可以调用及使用。

#### 使用方式
```js
import { useUserStore } from '@/store'

const userStore = useUserStore()

// 当前登录的用户所有信息，包括 id 用户名 昵称 等信息
const user = userStore.user
// 当前用户的权限标识列表
const codes = userStore.codes
// 当前用户的角色列表
const roles = userStore.roles
// 当前用户的菜单列表
const menus = userStore.menus
```

## 后端获取方式

后端使用的是 `jwt` 来存储用户信息，所以后端是通过前端携带的 `Token` 来识别当前用户。

#### 使用方式
在后端任何地方，只需要调用 `user()` 函数即可获取实例化后的 `LoginUser` 对象

```php
// 获取 LoginUser 对象
$user = user();

// 获取当前用户ID
$user->getId();
```

| 方法名 | 参数 | 说明 |
|:---:|:---:|:---:|
| check | ?string $token = null, string $scene = 'default' | 检查用户是否登录，可传入指定token检查 |
| getJwt | 无 | 获取 `jwt` 对象 |
| getUserInfo | ?string $token = null | 获取当前用户的所有信息 |
| getId | 无| 获取当前用户ID |
| getUsername | 无 | 获取当前登录用户名 |
| getUserRole | array $columns = ['id', 'name', 'code'] | 获取当前用户的角色列表 |
| getUserPost | array $columns = ['id', 'name', 'code'] | 获取当前登录的岗位列表 |
| getUserDept | array $columns = ['id', 'name'] | 获取当前登录用户部门列表 |
| getUserType | 无 | 获取当前登录用户类型 |
| isSuperAdmin | 无 | 检查当前用户是否为超级管理员（创始人） |
| isAdminRole | 无 | 检查当前用户是否为超管角色（创始人角色） |