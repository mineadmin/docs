# 前端文档

## 开发规范

## 请求流程

## 使用组件

## 使用权限
前端已经封装好了两个指令级别的权限 `v-auth` 和 `v-role`，每个都可单独使用，也可以联合使用
- v-auth 权限检查指令
- v-role 角色检查指令

#### 使用权限指令
```html
// 单个权限检查 检查用户必须存在此权限才能看到
<el-button v-auth="system:user:save">新增用户</el-button>

// 多个权限检查 （多个权限，只要包含一个就能看到）
<el-button v-auth="['system:user:delete', 'system:user:realDelete']">删除用户</el-button>
```

#### 使用角色指令
```html
// 单个角色检查 检查用户拥有此角色才能看到
<el-button v-role="superAdmin">新增用户</el-button>

// 多个角色检查 （多个角色，只要包含一个就能看到）
<el-button v-role="['role-1', 'role-2']">删除用户</el-button>
```

## 使用字典
字典管理是用来维护固定且常用的数据，如下拉框、单选按钮、复选框、等数据，方便维护。

:::tip
字典主要通过字典的代码标识来调用数据，因为已经在`main.js`里全局挂载了方法，所以在页面里任何地方都可以直接使用
:::
```javascript
let xxxx = this.getDict('字典类型代码标识')
console.log(xxxx.data)

OR 

this.getDict('字典类型代码标识').then(res => {
    this.xxxx = res.data
})
console.log(this.xxxx)
```
