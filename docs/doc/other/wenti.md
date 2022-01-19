# 常见问题

## 怎么升级版本？
每次升级完最新版本后，请执行更新命令完成SQL语句升级 `php bin/hyperf.php mine:update`

## 登录后台白屏没有任何跳转
有以下几种可能，请逐一排查
- `数据库` 或者 `redis` 没有正确配置
- 没有`真正`的完成安装项目，需要再次运行 `php bin/hyperf mine:install` 命令
- 检查`.env`文件的`SUPER_ADMIN`的值是否与用户表的超管ID一致
- 检查用户是否绑定了`角色`，同时角色是否至少绑定了一个`菜单`

## 为何出现“您访问的资源不存在”
- 确认是否配置了此菜单
- 确认后端路由定义是否存在，并检查是否需要参数
- 确认服务器是否重启
- 确认是否删除 `runtime/container` 目录


## 超级管理员怎么设置
超级管理员，也就是创始人，必须在`.env`中的`SUPER_ADMIN`定义

## docker里连不上数据库、Redis
这种情况一般是`数据库`和`redis`安装在`本地（宿主机）`

可使用以下命令查看本机ID地址
- Windows: `ipconfig`
- Linux: `ip addr` or `ifconfig`
- Mac: `ifconfig`

然后以局域网地址连接

## 前端是否需要部署在docker里面？
不需要

## 为什么安装要执行两遍 mine:install
一、第一次执行命令是为了生成`.env`文件。

二、因为常驻内存，`.env` 文件此时还未加载，数据库、redis等还无法使用，所以需要重启加载加`.env`文件。

三、重启后，再次执行安装命令是为了执行migrate和seeds

## 安装的SQL文件在哪里？
`MineAdmin`没有使用传统SQL文件安装，而是使用了数据迁移工具进行建表和数据填充工作

相关的文件在每个模块下的`Database`里