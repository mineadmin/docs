# 常用函数

## common.js

### Tag 相关
#### 增加Tag
```js
import { addTag } from '@/utils/common'
import { useRoute } from 'vue-router'

const route = useRoute()

// 页面tag栏，新增一个tag
addTag({ name: route.name, path: route.path, title: route.meta.title, query: route.query })
```
#### 关闭Tag
```js
import { closeTag } from '@/utils/common'
import { useRoute } from 'vue-router'

const route = useRoute()

// 关闭一个tag
closeTag({ name: route.name, path: route.path })
```

#### 刷新当前Tag
```js
import { refreshTag } from '@/utils/common'

// 刷新当前Tag
refreshTag()
```

### 通知栏快捷方法
通知栏是在页面右上角处滑入的一个信息提示框，目前系统就新消息提示方面使用了，我们对 Arco 的通知进行了简单的封装

```js
import { success, info, error } from '@/utils/common'

// 成功状态通知栏
success('提示', '任务已经完成')

// 警告状态通知栏
info('注意', '你工作的时间太久了，该休息一会了')

// 错误状态通知栏
error('错误', '系统崩溃了，请刷新页面')
```

### 权限、角色检查方法
我们除了可以通过在模板中使用指令方式来检查权限和角色，还可以在 `js` 代码中使用函数在业务逻辑中使用
:::tip
在指令 v-auth 和 v-role 中传入的是数组，在函数中传入的是字符串
:::

```js
import { auth, role } from '@/utils/common'

// 检查权限
```

## tool.js