# 环境安装

:::tip
MineAdmin 对系统环境有一些要求，由于使用的 Hyperf 框架是基于 Swoole 网络引擎驱动的，仅可运行于 Linux 和 Mac 环境下，但是 Docker 虚拟化技术的发展，在 Windows 下也可以通过 Docker for Windows 来作为运行环境。
:::

:::warning 开发环境建议
不管你是 Windows、Mac 还是 Linux 使用者，我们都建议使用 `Docker` 作为开发环境。
:::

## Docker下环境安装

### Docker 介绍
docker是一种虚拟化技术（和虚拟机差不多，没有虚拟机隔离的那么彻底）。
然后我们通过docker下载不同功能的容器来使用；而所有容器都运行在docker之上。

那么，什么是容器？可以通俗的理解为一个个集装箱，每个集装箱封装好了功能。
比如，想开发php，就通过docker下载一个php的容器来运行，那么你就可以开发php了

### 安装Docker
首先，[下载DeskTop Docker](https://www.docker.com/get-started/)，一步步安装软件。
安装完成后，打开docker显示这个界面，既已代表安装成功了。

<img src="https://s1.ax1x.com/2022/10/12/xUhwxU.png" />

### 拉取镜像
**MineAdmin** 需要用的几个镜像列表:
- ixmo/mine-admin（运行mineadmin的基础环境镜像，已配置好swoole、php、git等基础环境）
- mysql:5.7 (宿主机安装有，则不需要拉取)
- redis (宿主机安装有，则不需要拉取)
- rabbitmq:management (宿主机安装有或不需要队列功能，则不需要拉取)

#### 首先，拉取 `ixmo/mine-admin` 镜像，打开 `cmd` 或者 `终端`
```
# 拉取镜像
docker pull ixmo/mine-admin

# 创建环境容器
docker run -d --name mineadmin -v d:\mineadmin:/opt/www -p 9501:9501 -p 9502:9502 -p 9503:9503 -it ixmo/mine-admin
```
参数说明：
- --name 容器名字
- -v 本地目录:容器目录 （宿主机与容器目录挂载）
- -p 本地端口:容器端口 （宿主机与容器端口映射)

#### 拉取 `mysql:5.7` 镜像，如果本地宿主机安装有mysql，可跳过
```
# 拉取镜像
docker pull mysql:5.7

# 创建mysql容器
docker run -d -p 3306:3306 --privileged=true -e MYSQL_ROOT_PASSWORD=123456 --name mysql mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_general_ci
```
参数说明：
- -d 表示后台运行
- -p 表示端口映射
- --privileged=true 设值MySQL的root用户权限, 否则外部不能使用root用户登陆
- -e MYSQL_ROOT_PASSWORD=123456　　　设置MySQL数据库root用户的密码
- --name 表示容器名字
- --character-set-server=utf8mb4 --collation-server=utf8mb4_general_ci 设值数据库默认编码

#### 拉取 `redis` 镜像，如果本地宿主机安装有redis，可跳过
```
# 拉取镜像
docker pull redis

# 创建redis容器
docker run --name redis -d -p 6379:6379 redis
```
参数说明：
- --name 表示容器名字
- -p 表示端口映射

#### 拉取 `rabbitmq:management` 镜像，如果本地宿主机安装有或者不需要队列功能，可跳过
```
# 拉取镜像
docker pull rabbitmq:management

# 创建rabbitmq容器
docker run -d --name rabbit -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin -p 15672:15672 -p 5672:5672 -p 25672:25672 -p 61613:61613 -p 1883:1883 rabbitmq:management
```
参数说明：
- -d 表示后台运行
- --name 表示容器名字
- -e RABBITMQ_DEFAULT_USER=admin 设置rabbitmq默认的用户名
- -e RABBITMQ_DEFAULT_PASS=admin 设置rabbitmq默认的密码
- -p 表示映射的一系列端口

## Docker Compose方式环境安装

### 前提条件
- 宿主机安装好`docker`、`docker-compose`环境
- 宿主机安装好`nodejs`、`npm`、`yarn`环境，`nodejs`建议装`lts`版本
- 下载[【前端】](https://gitee.com/mineadmin/mineadmin-vue)，然后在后端根目录建立`mine-ui`目录，前端文件复制到这里

### 步骤
1. 第一次跑暂时只启动`hyperf`、`mysql`、`redis`这三个容器
> 注意：`mysql`和`redis`没有映射出来持久化，需要你自己百度一下

```shell
# 只启动`hyperf`、`mysql`、`redis`这三个容器
docker-compose up -d hyperf mysql redis
```

第一次跑要先进容器，跑一遍 `composer` 和`mine:install`的命令
```shell
# 进hyperf容器
docker-compose exec hyperf /bin/sh

# 查看当前目录，即mineadmin目录
pwd
# /opt/www

# 安装依赖
composer install -vvv

# 安装mineadmin
php bin/hyperf.php mine:install

# mysql和redis填写
- `mysql`的server地址输入`mysql`，端口:`3306`，密码为`12345678`
- `redis`的server地址输入`redis`，没有密码
- 其它一路回车就好
- 第一次 `php bin/hyperf.php mine:install` 是配置`.env` 文件

# 再次执行安装命令
php bin/hyperf.php mine:install
- 这次将执行安装数据

# 退出hyperf容器
exit
```


2. 启动前端
> 提示：`docker-compose.yml`前端映射的是`8101`端口，自己修改成想要的端口

``` shell
# 进入前端目录
cd mine-ui

# 修改mine-ui/.env文件的ip为你服务器ip

npm install 
npm run dev 或者 npm run build
# 或者
# yarn install
# yarn dev 或者 yarn build

# 退回mineadmin目录 
cd ..

# 启动前端容器
docker-compose up -d nginx-frontend
```
> 提示：`hyperf`容器内没有`nodejs`、`npm`环境，所以要在宿主机安装前端`npm`先打包，要是你不小心在打包前就已经起了前端服务，那么可以执行以下命令删除掉前端容器：

```shell
# 停止nginx-frontend容器 && 删除nginx-frontend容器
docker-compose stop nginx-frontend && docker-compose rm nginx-frontend
# 输入y，确认删除

# 前端打包完后，单独启动前端服务
docker-compose up -d nginx-frontend

# 可选：查看日志
# docker-compose logs nginx-frontend
```
3. 如果登录时一直转圈圈，可能`super_admin`和`admin_role`有问题，要从数据库读取后抄进`.env`

```shell
# 进入mysql容器
docker-compose exec mysql /bin/bash

# 进入mysql客户端
mysql -uroot -p
# 输入密码:12345678

# 选择mineadmin库
use mineadmin;
# 分别查询出`super_admin`和`admin_role`的id
select * from system_user;
select * from system_role;
# 退出mysql
exit
# 退出容器
exit

# 停止和删除redis容器，或者你连进去redis，清空掉缓存
docker-compose stop redis && docker-compose rm redis
# 如有提示，输入y

# 重启容器
docker-compose up -d redis
```

4. 完成
> `docker-compose.yml`前端映射的是`8101`端口，自己修改成想要的端口

前端访问地址：http://服务器地址:8101

后端地址验证：http://服务器地址:9501

至此，环境已搭建完毕。

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

2. 第二步：添加node项目，可以参考下图配置，点提交
:::tip
第一次添加项目会自动下载依赖，并且启动项目。

**注意：打包完成后，项目服务状态会成为【未启动】状态，这个是正常的，以后每次需要打包，只需要启动一次项目即可**
:::

<img src="https://s1.ax1x.com/2022/10/11/xNwu7Q.png" />

3. 第三步：在PHP项目里，添加个普通的静态网站，目录指向前端目录的 `dist` 目录。