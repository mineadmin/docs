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

// 检查某个权限
if (auth('system:user:save')) {
    // 业务代码
}

// 检查某个角色
if (role('cto')) {
    // 业务代码
}
```

## tool.js

### 数据存储类

#### LocalStorage
```js
import tool from '@/utils/tool'

// 存储数据
const data = { key1: '示例1', key2: '示例2' }
tool.local.set('demo', data)

// 获取数据
const demo = tool.local.get('demo')
console.log(demo.key1) // 示例1

// 删除数据
tool.local.remove('demo')

// 清空数据
tool.local.clear()
```

#### Session
:::tip
仅在下一次页面关闭前或刷新前有效
:::
```js
import tool from '@/utils/tool'

// 存储数据
const data = { key1: '示例1', key2: '示例2' }
tool.session.set('demo', data)

// 获取数据
const demo = tool.session.get('demo')
console.log(demo.key1) // 示例1

// 删除数据
tool.session.remove('demo')

// 清空数据
tool.session.clear()
```

#### Cookie
```js
import tool from '@/utils/tool'

// 存储数据
const cfg = {
    expires: 86400 * 7,
    path: '/',
    domain: 'https://demo.mineadmin.com',
}
tool.cookie.set('username', 'superAdmin', cfg)

// 获取数据
console.log(tool.cookie.get('username')) // superAdmin

// 删除数据
tool.cookie.remove('username')
```
### 加密解密类

#### md5
```js
import tool from '@/utils/tool'

const str = tool.md5('hello')
```

#### base64
```js
import tool from '@/utils/tool'

// 加密
const str1 = tool.base64.encode('hello')

// 解密
const str2 = tool.base64.decode(str1)
```

#### aes
```js
import tool from '@/utils/tool'

// 定义密钥
const key = 'secret key'

// 加密
const str1 = tool.aes.encode('hello', key)

// 解密
const str2 = tool.aes.decode(str1, key)
```

### 日期格式化
```js
import tool from '@/utils/tool'

const date = tool.dateFormat(new Date(), 'yyyy-MM-dd', '-')
```

### 千分符
```js
import tool from '@/utils/tool'

// 进行转换
const price = tool.groupSeparator(12345678)

console.log('￥' + price) // ￥12,345,678
```

### 格式化数据大小
```js
import tool from '@/utils/tool'

// 进行格式化
const size = tool.formatSize(1024)

console.log(size) // 1KB
```

### 文件下载
```js
import tool from '@/utils/tool'

// 传入服务器返回的数据，第二个参数可不带，会自动识别
tool.download(response, '文件.txt')
```

### json转url参数
```js
import tool from '@/utils/tool'

// 第二个参数是否带上问号 ?
const parmas = tool.httpBuild({ id: '1', age: 22 }, true)

console.log(params) // ?id=1&age=22
```

### 上传文件附加url
```js
import tool from '@/utils/tool'

// 第一个参数为后端返回的文件地址，第二个参数为存储模式，默认为LOCAL
const url = tool.attachUrl(filePath, 'LOCAL')
```

### 获取token
```js
import tool from '@/utils/tool'

// 获取当前用户登录的token
const token = tool.getToken()
```

