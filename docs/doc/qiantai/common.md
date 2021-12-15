# 公共方法

## $CONFIG
通过 `$CONFIG` 可以获取全局的配置信息
```js
// 模式 开发：dev | 生产：prod | 普通：normal，生产模式会隐藏掉模块管理、代码生成器、数据表设计器
APP_MODE: 'dev',

//标题
APP_NAME: "MineAdmin",

//首页地址
DASHBOARD_URL: "/dashboard",

//版本号
APP_VER: "0.4.0",

//官网地址
APP_URL: "www.mineadmin.com",

//接口地址
API_URL: "/api",

//Token前缀，注意最后有个空格，如不需要需设置空字符串
TOKEN_PREFIX: "Bearer ",

//请求是否开启缓存
REQUEST_CACHE: false,

//布局 默认：default | 通栏：header | 经典：menu | 功能坞：dock
//dock将关闭标签和面包屑栏
LAYOUT: 'default',

//菜单是否折叠
MENU_IS_COLLAPSE: false,

//是否开启多标签
LAYOUT_TAGS: true,

// 请求超时时间	 默认 5 秒
TIMEOUT: 5000,

//语言
LANG: 'zh_CN',

//主题颜色
COLOR: '#0960bd',

//菜单是否启用手风琴效果
MENU_UNIQUE_OPENED: true,

//控制台首页默认布局
DEFAULT_GRID: {
    //默认分栏数量和宽度 例如 [24] [18,6] [8,8,8] [6,12,6]
    layout: [12, 6, 6],
    //小组件分布，com取值:views/home/components 文件名
    copmsList: [
        ['welcome'],
        ['about', 'ver'],
        ['time', 'progress']
    ]
},

// 文件存储URL地址
STORAGE_URL: {
    LOCAL: 'http://127.0.0.1:9501',
    OSS: '',
    COS: '',
    QINIU: ''
}
```
## $TOOL

`$TOOL` 是个工具箱集合

- 本地存储方法 localStorage
```js
// 创建一个变量
this.$TOOL.data.set('name', '张三')

// 获取一个变量
this.$TOOL.data.get('name')

// 删除一个变量
this.$TOOL.data.remove('name')

// 清空所有变量
this.$TOOL.data.clear()
```

- 浏览器SESSION 
```js
// 创建一个变量
this.$TOOL.session.set('name', '张三')

// 获取一个变量
this.$TOOL.session.get('name')

// 删除一个变量
this.$TOOL.session.remove('name')

// 清空所有变量
this.$TOOL.session.clear()
```

- 日期格式化
```js
this.$TOOL.dateFormat('2021-10-01 15:32:12', 'yyyy-MM-dd')
// 2021-10-01
```

- 千分符，货币格式化
```js
this.$TOOL.groupSeparator(300000)
// 300,000
```

- 常用加解密
```js
// MD5加密
this.$TOOL.crypto.MD5(str)

// BASE64 加密
this.$TOOL.crypto.BASE64.encrypt(str)

// BASE64 还原
this.$TOOL.crypto.BASE64.decrypt(str)

// AES 加密
this.$TOOL.crypto.AES.encrypt(str, secretKey)

// AES 还原
this.$TOOL.crypto.AES.decrypt(str, secretKey)
```

- 格式化大小
```js
this.$TOOL.formatSize(size)
```

- 向浏览器发送下载文件
```js
this.$TOOL.download(Blod)
```

- 显示后端图片
```js
this.$TOOL.viewImage(url, storageMode = 'LOCAL')

// 快捷方法
this.viewImage(url, storageMode = 'LOCAL')
```

- 城市CODE转城市名称
```js
this.$TOOL.codeToCity(province, city = undefined, area = undefined, split = ' / ')

// 快捷方法
this.codeToCity(province, city = undefined, area = undefined, split = ' / ')
```

- 对象转url参数
```js
this.$TOOL.httpBuild(objectData, isPrefix = false)
```

## $AUTH
- 检查是否拥有权限，非指令

```js
// 如果有新增用户权限
if (this.$AUTH('system.user.save')) {
    // TODO...
}

// 如果有编辑用户和删除用户
if (this.$AUTH(['system.user.delete', 'system.user.edit'])) {
    // TODO...
}
```

## $ROLE
- 检查是否拥有角色，非指令

```js
// 如果是超级管理员
if (this.$ROLE('superAdmin')) {
    // TODO...
}

// 如果是老板和销售经理
if (this.$ROLE(['boss', 'saleManager'])) {
    // TODO...
}
```
## clipboard
`clipboard` 是一个可以把字符串复制到剪切板的公共方法

```js
this.clipboard('hello world')
```