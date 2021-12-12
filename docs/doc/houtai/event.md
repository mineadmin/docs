# 系统事件（钩子）

## 用户登录前事件

监听类名
- \Mine\Event\UserLoginBefore::class

事件参数
- 用户登录时提交的数据

## 用户登录后事件

监听类名
- \Mine\Event\UserLoginAfter::class

事件参数
- 当前登录用户数据

## 用户退出事件

监听类名
- \Mine\Event\UserLogout::class

事件参数
- 当前退出用户数据

## 附件上传后事件

监听类名
- \Mine\Event\UploadAfter::class

事件参数
- 上传文件数据

## 附件真实删除事件

监听类名
- \Mine\Event\RealDeleteUploadFile::class

事件参数
- SystemUploadFile 模型实例 (文件数据)
- Filesystem 文件操作系统实例 (支持 OSS QINIU COS 本地)

事件方法
- setConfirm(bool $confirm) 设置是否删除文件
- getConfirm() 获取是否删除文件

> 系统只有在 `getConfirm()` 返回为 `true` 才会删除文件

## 后台操作记录事件

监听类名
- \Mine\Event\Operation::class

事件参数
- 当前请求的详细数据

## API接口请求前事件

监听类名
- \Mine\Event\ApiBefore::class

事件参数
- 无

## API接口请求后事件

监听类名
- \Mine\Event\ApiAfter::class

事件参数
- 请求接口的详细数据
- 接口返回浏览器的数据 （可改变接口返回数据的内容，不建议这么做）
