# 环境安装

:::tip
MineAdmin 对系统环境有一些要求，由于使用的 Hyperf 框架是基于 Swoole 网络引擎驱动的，仅可运行于 Linux 和 Mac 环境下，但是 Docker 虚拟化技术的发展，在 Windows 下也可以通过 Docker for Windows 来作为运行环境。
:::

:::warning 开发环境建议
不管你是 Windows、Mac 还是 Linux 使用者，我们都建议使用 `Docker` 作为开发环境。
:::

## Docker下的环境安装


## 宝塔面板下的环境安装
:::tip
以下教程为全新系统的安装方式，可根据自己服务器的实际情况，挑选适合自己的章节

注意：图片可以点击放大查看
:::
### 安装宝塔面板
- ECS服务器,重新初始化操作系统 , 安全组开放宝塔面板所需网络端口。例如：8888端口。
- 安装面板，执行以下命令：
```bash
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```
- 按提示打开宝塔面板，完成下述各项操作步骤。

### 安装所需的web应用

在软件商店中搜索如下应用，并按提示完成安装即可。
- nginx:1.21
- mysql:5.7
- php:8.0
- phpmyadmin:5.1
- Node.js版本管理器

> Redis 不直接安装，而是通过PHP管理器来安装

### PHP配置

