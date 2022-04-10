# 使用手册
## 使用导出
导出没有使用自定义组件，还是普通的按钮实现
```html
<el-button
    icon="el-icon-download"
    v-auth="['system:user:export']"
    @click="exportExcel"
>导出</el-button>
```

vue 代码，里面使用了一个全局挂载的 `$TOOL` 工具助手，使用 `download` 函数对服务器的数据进行处理
```js
// 导出用户
exportExcel () {
    this.$API.user.exportExcel(this.queryParams).then(res => {
        this.$TOOL.download(res)
    })
},
```

## 使用导入
前端已经全局挂载了导入组件，可以在任何页面直接使用
```html
<ma-import
    :auth="['system:user:import']"
    :upload-api="$API.user.importExcel"
    :download-tpl-api="$API.user.downloadTemplate"
    @success="handleSuccess()"
/>
```
| 参数           | 说明          |
| ------------- |:-------------:|
| auth|接收字符串或者数组，验证是否有权限可以使用|
| upload-api|指定导入数据接口|
| download-tpl-api|指定下载空模板接口|
| @success|导入成功后处理方法，比如刷新表格|

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
// 使用获取单个字典
let xxxx = this.getDict('字典类型代码标识')
console.log(xxxx.data)

OR 

this.getDict('字典类型代码标识').then(res => {
    this.xxxx = res.data
})
console.log(this.xxxx)

// 使用获取多个字典
let zzzz = this.getDicts(['字典标识-1', '字典标识-2'])
console.log(zzzz.data)

OR 

this.getDicts(['字典标识-1', '字典标识-2']).then(res => {
    this.zzzz = res.data
})
console.log(this.zzzz)
```

## 前端获取当前用户信息
在任何页面中，用法如下：
```js
let user = this.$TOOL.data.get('user');
console.log(user)
```

在JS当中，用法如下：
```js
// 需要先引入tool
import tool from '@/utils/tool';
// 获取用户信息
let user = tool.data.get('user')
console.log(user)
```