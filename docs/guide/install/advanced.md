# 环境安装

:::tip
MineAdmin 对系统环境有一些要求，由于使用的 Hyperf 框架是基于 Swoole 网络引擎驱动的，仅可运行于 Linux 和 Mac 环境下，但是 Docker 虚拟化技术的发展，在 Windows 下也可以通过 Docker for Windows 来作为运行环境。
:::

:::warning 开发环境建议
不管你是 Windows、Mac 还是 Linux 使用者，我们都建议使用 `Docker` 作为开发环境。
:::

## Docker下环境安装

## Docker Compose方式环境安装


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

**Redis 不直接安装，而是通过PHP管理器来安装**

### PHP配置

#### 安装扩展
在 `PHP8.0 管理-安装扩展` 中，安装 `fileinfo`、`redis`、`swoole` 扩展。
<img src="https://s1.ax1x.com/2022/10/10/xYo728.png" />

#### 修改配置文件
点击 `配置文件` 选项卡，搜索 `disable_functions`，替换成：
```sh
disable_functions = passthru,system,chroot,chgrp,chown,popen,ini_alter,ini_restore,dl,openlog,syslog,readlink,symlink,popepassthru,imap_open,apache_setenv
```
<img src="https://s1.ax1x.com/2022/10/10/xYTJII.png" />

并在最后一行加入：
```sh
swoole.use_shortname = 'Off'
```

### 重启面板
由于宝塔的PHP命令行相关设置不会即时生效，也可能是bug等问题，需要对宝塔面板进行重启。

点击 `右上角-重启-重启面板` 等待几秒钟即可重启完毕


### 后端代理配置
接下来，我们对 `nginx` 进行配置
```sh
server {
  # 端口
  listen 80;
  # 域名 前端访问地址，改成自己的
  server_name demo.mineadmin.com;
  # 日志
  access_log /data/wwwlogs/demo.mineadmin.com_nginx_access.log combined;
  error_log /data/wwwlogs/demo.mineadmin.com_nginx_error.log debug;

  # 同域根目录前端代码部署，注意：
  location / {
      root /data/wwwroot/demo.mineadmin.com;
      try_files $uri $uri/ /index.html;
      index index.html;
  }

  # 支持自定义下划线参数通过header传输
  # underscores_in_headers on;

  # PHP后端代理，这里的 /prod/ 要跟前端 .env.production 的 VITE_APP_PROXY_PREFIX 值一致
  location /prod/ {
      # 将客户端的 Host 和 IP 信息一并转发到对应节点
      proxy_set_header Host $http_host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      # 将协议架构转发到对应节点，如果使用非https请改为http
      proxy_set_header X-scheme https;

      # 执行代理访问真实服务器
      proxy_pass http://127.0.0.1:9501/;
  }
}
```

### 上传目录同域名代理配置
后端代理完成后，我们需要对上传目录也设置代理，这里的设置为同域名即访问前端、也能访问后端接口，还可以访问上传目录的附件。

- 如果是非同域名，则跟上一步骤的后端代理配置差不多
```sh
# 其他配置......
#   proxy_pass http://127.0.0.1:9501/;
# }
# 在此配置下面继续加入配置

# ^~ 不能去掉，/upload/ 中的 upload 可以改成其他名称
location ^~ /upload/ {
    # 将客户端的 Host 和 IP 信息一并转发到对应节点
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # 将协议架构转发到对应节点，如果使用非https请改为http
    proxy_set_header X-scheme https;

    # 执行代理访问真实服务器
    proxy_pass http://127.0.0.1:9501/;
}
```

上面配置完成以后，我们需要对前端访问图片地址进行设置：

打开 `src/config/upload.js` 文件，修改 `LOCAL` 的值
```js
export default {
  storage: {
    // 后面的 upload 要跟 nginx 的代理配置路径一致
    LOCAL: 'http://demo.mineadmin.com/upload',
    OSS: '',
    COS: '',
    QINIU: ''
  }
}
```
### 消息服务代理配置
消息服务是websocket协议，可以按照此配置修改成自己的：
```sh
server {
  # 端口
  listen 80;
  # 域名 前端访问地址，改成自己的
  server_name message.mineadmin.com;
  # 日志
  access_log /data/wwwlogs/message.mineadmin.com_nginx_access.log combined;
  error_log /data/wwwlogs/message.mineadmin.com_nginx_error.log debug;

  location / {
    # WebSocket Header
    proxy_http_version 1.1;
    proxy_set_header Upgrade websocket;
    proxy_set_header Connection "Upgrade";

    # 将客户端的 Host 和 IP 信息一并转发到对应节点
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;

    # 客户端与服务端无交互 60s 后自动断开连接，请根据实际业务场景设置
    proxy_read_timeout 60s ;

    # 执行代理访问真实服务器
    proxy_pass http://127.0.0.1:9502/;
  }
}
```
### 部署前端
部署前端，有两种方式：
- 第一种为本地打包，然后上传服务器。
- 第二种可以通过git管理代码，每次在服务器上拉下最新代码后，在服务器上打包。

#### 本地打包
打包后前端输出到 `dist` 目录，打包后把此目录的文件上传到服务器即可。
```sh
yarn build
```

#### 本地预览
打包完成后，我们可以对打包的前端以服务器模式进行预览，可以查看程序状态，以防止打包前与打包后出现的差异或者bug
```sh
yarn preview
```

#### 服务器打包

1. 第一步：服务器上安装nodejs管理器

<img src="https://s1.ax1x.com/2022/10/11/xNwPkd.png" />

2. 第二步：