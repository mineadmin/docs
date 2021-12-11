# 安装部署

## 服务器及环境需求

#### 服务器要求
MineAdmin 对系统环境有一些要求，当您使用 Swoole 网络引擎驱动时，仅可运行于 Linux 和 Mac 环境下，但由于 Docker 虚拟化技术的发展，在 Windows 下也可以通过 Docker for Windows 来作为运行环境。

#### 环境需求

- Swoole >= 4.5.x 并关闭 `Short Name`
- Hyperf >= 2.2.x
- PHP >= 7.4 并开启以下扩展：
    - mbstring
    - json
    - pdo
    - openssl
    - redis
    - pcntl
- Mysql >= 5.7
- Redis >= 4.0

## 安装MineAdmin
- MineAdmin 使用 <a href="https://www.phpcomposer.com/" target="_blank">Composer</a> 来管理项目的依赖，请确保你的运行环境已经安装好了 Composer。
- 前端使用 <a href="https://www.npmjs.cn/" target="_blank">npm</a> 或者 <a href="https://yarn.bootcss.com/" target="_blank">yarn</a> 来管理依赖，使用npm或者yanr请先确保安装了 <a href="http://nodejs.cn/" target="_blank">Node.js</a>

#### 下载项目
```shell
git clone https://gitee.com/xmo/MineAdmin && cd MineAdmin
```

#### 安装依赖
```shell
// 将源切换到国内阿里镜像
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

// 安装依赖
composer install
```

#### 后端安装
 - 项目安装需要开 `两个终端`，一个 `启动项目`，一个 `执行安装命令`

打开启动终端，启动项目
```shell
php bin/hyperf.php start
```
切换到安装终端，执行安装命令
```shell
php bin/hyperf.php mine:install
```
待提示以下信息后，切换到启动终端，重启项目
```shell
Reset the ".env" file. Please restart the service before running 
the installation command to continue the installation.
```
切换到安装终端，再次执行安装命令，完成安装。
```shell
php bin/hyperf.php mine:install
```

- 前端安装

请先确保安装了node.js，yarn 或者 npm 工具，建议使用yarn
```shell
cd mine-ui && yarn
```
启动
```shell
yarn dev
```

:::tip
实际开发中，可以使用 `php watch -c` 来启动项目，它可以监听文件的改动实时热重启，提高开发效率。
:::


## 项目部署

项目需要线上环境部署或者测试的时候，本地与线上环境不一致或者前端和后端不在一个服务器上面，需要进行 Nginx 反向代理，以及修改前端部分配置。
#### 后端代理
:::tip
生产环境一般都会用 Nginx 代理发布，实现负载均衡等。
:::

```shell
# 至少需要一个 Hyperf 节点，多个配置多行
upstream hyperf {
    # Hyperf HTTP Server 的 IP 及 端口
    server 127.0.0.1:9501;
}

server {
  # 端口
  listen 80;
  # 域名
  server_name demo.mineadmin.com;
  # 日志
  access_log /data/wwwlogs/demo.mineadmin.com_nginx_access.log combined;
  error_log /data/wwwlogs/demo.mineadmin.com_nginx_error.log debug;

  # 同域根目录前端代码部署,注意：
  location / {
      root /data/wwwroot/demo.mineadmin.com;
      try_files $uri $uri/ /index.html;
      index index.html;
  }

  # 支持自定义下划线参数通过header传输
  # underscores_in_headers on;

  # PHP 代码
  location /api/ {
      # 将客户端的 Host 和 IP 信息一并转发到对应节点
      proxy_set_header Host $http_host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      # 将协议架构转发到对应节点，如果使用非https请改为http
      proxy_set_header X-scheme https;

      # 执行代理访问真实服务器
      proxy_pass http://hyperf/;
  }
}
```

#### 前端必要配置
前端也使用了代理方式来请求后端接口

在 `mine-ui/vue.config.js` 里面找到以下配置，根据自己的情况修改
```shell
// 基础url
const base_url = 'http://127.0.0.1:9501'

// 代理API前缀
const proxy_api = '/api'
```

## 存在兼容性问题的扩展

由于 Hyperf 基于 Swoole 协程实现，而 Swoole 4 带来的协程与不少扩展都仍存在兼容性的问题。
以下扩展（包括但不限于）都会造成一定的兼容性问题，不能与之共用或共存：

- xhprof
- xdebug
- blackfire
- trace
- uopz