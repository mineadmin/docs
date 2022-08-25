# 内置指令

## 权限指令
```html
<el-button v-auth="['system:user:add']">新增用户</el-button>
<el-button v-auth="['system:user:update']">更新用户</el-button>
<el-button v-auth="['system:user:add', 'system:user:update']">复制用户</el-button>
```

## 角色指令
```html
<el-button v-role="['cfo', 'ceo']">财务管理</el-button>
<el-button v-role="['hr', 'ceo']">员工管理</el-button>
```
