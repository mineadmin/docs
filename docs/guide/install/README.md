# 快速开始

## 所需环境
| 环境 | 描述 | 是否必须 | 操作 |
|:---:|:---:|:---:|:---:|
| Swoole | Swoole >= 4.8.x，Hyperf框架运行基础基于Swoole | 必须 | [安装教程](https://wiki.swoole.com/#/environment) |
| PHP | 目前仅支持 `8.0` 版本，后续升级hyperf3.0，则支持8.x版本 | 必须 | - |
| Mysql | Mysql >= 5.7 且 <= 8.0 (需支持innodb引擎、开发环境为5.7版本) | 必须 | - |
| NodeJs | NodeJs >= 14.18.3 前端开发环境 (包含NPM依赖安装工具) | 必须 | - |
| Composer | Composer >= 2.x.x PHP依赖包安装工具 | 必须 | - |
| Redis | Redis >= 4.0.0 | 必须 | - |
| RabbitMQ | RabbitMQ >= 3.x.x，消息队列所需软件，系统默认未开启队列功能 | 非必须 | - |

## 开放被禁用的函数

:::tip 开放以下函数
- putenv
- shell_exec
- proc_open
- pcntl_ 开头的函数
:::

或者打开 `php.ini` （命令行版本），查找 `disable_functions` 关键字，复制下面文本，替换原有的：
```
disable_functions = passthru,system,chroot,chgrp,chown,popen,ini_alter,ini_restore,dl,openlog,syslog,readlink,symlink,popepassthru,imap_open,apache_setenv
```

## 关闭Swoole短名称

打开 `php.ini` 在最后一行加入
```
swoole.use_shortname = 'Off'
```

## 下载代码

### 下载后端代码
- 后端Github仓库地址：[Github 后端](https://github.com/kanyxmo/mineadmin)
- 后端Gitee仓库地址：[Gitee 后端](https://gitee.com/mineadmin/mineadmin)

### 下载前端代码
- 前端Github仓库地址：[Github 前端](https://github.com/kanyxmo/mineadmin-vue)
- 前端Gitee仓库地址：[Gitee 前端](https://gitee.com/mineadmin/mineadmin-vue)

:::warning 小建议
可以在后端根目录建一个 web 目录，把前端的源代码放在这个 web 目录下，这样方便更好管理项目
:::

## 后端安装与启动

### 后端安装
:::tip
后端安装需要执行**两次安装命令**，**第一次**是为了生成 `.env` 文件，**第二次**是安装数据。

> 如果自行复制 `.env.example` 文件改名成 `.env` 后只需要执行一次，但在用户登录时会出现报错，可参考这里解决：[解决方法](/faqs/#前端登录提示-未知错误)
:::

- 打开终端，进入到后端根目录，按照以下命令安装后端
```sh
# 进入到后端根目录
cd mineadmin

# 安装依赖
composer install
```

第一遍安装：生成 `.env` 文件
```sh
# 显示安装欢迎语之后，然后按照提示一步步完成安装。一些跟自己的默认值相同的可以按 `回车` 跳过
php bin/hyperf.php mine:install
```

没有任何数据未连接成功等相关报错，遇到以下提示后，按 `ctrl+c` 关闭服务，重启执行安装命令
```sh
Reset the ".env" file. Please restart the service before running 
the installation command to continue the installation.
```

第二遍安装：建立数据表和填充表初始数据，提示以下语句后，按 `回车` 执行即可。
```sh
Do you want to continue with the installation program? (yes/no) [yes]:
```

待显示以下信息，系统已经安装完成。
```sh
/---------------------- welcome to use -----------------------\
|               _                ___       __          _      |
|    ____ ___  (_)___  _____    /   | ____/ /___ ___  (_)___  |
|   / __ `__ \/ / __ \/ ___/   / /| |/ __  / __ `__ \/ / __ \ |
|  / / / / / / / / / / /__/   / ___ / /_/ / / / / / / / / / / |
| /_/ /_/ /_/_/_/ /_/\___/   /_/  |_\__,_/_/ /_/ /_/_/_/ /_/  |
|                                                             |
\_____________  Copyright MineAdmin 2021 ~ 2022  _____________|
MineAdmin Version: 1.0.0
default username: superAdmin
default password: admin123
```
### 启动后端
开发环境可以使用热更新方式来启动，在根目录执行下面的启动命令即可 **（生产环境不要用热更新）**
```sh
php watch -c
```
官方启动命令：
```sh
php bin/hyperf.php start
```

:::tip
也可以使用官方的[热更新插件](https://hyperf.wiki/2.2/#/zh-cn/watcher)
:::

## 前端安装与启动

### 前端安装
- 打开终端，进入到前端根目录，按照以下命令安装前端依赖
```sh
# 进入到后端根目录
cd mineadmin-vue

# 安装依赖
yarn install
```

### 启动前端
```sh
yarn dev
```

### 前端打包
```sh
yarn build
```

### 前端预览
在前端打包后，可以以web服务器方式预览打包后的兼容性等问题，这是部署前必要的操作。
```sh
yarn preview
```