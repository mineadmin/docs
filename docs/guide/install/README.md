# 准备

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

## 安装后端

- 打开终端，进入到后端根目录，按照以下命令安装后端
```sh
# 进入到后端根目录
cd mineadmin

# 安装依赖
composer install
```

> 第一遍启动安装：生成 `.env` 文件
```sh
# 显示安装欢迎语之后，然后按照提示一步步完成安装。一些跟自己的默认值相同的可以按 `回车` 跳过
php bin/hyperf.php mine:install

# Reset the ".env" file. Please restart the service before running 
# the installation command to continue the installation.
```

待显示以下信息，系统已经安装完成。

## 启动后端
```sh

```

