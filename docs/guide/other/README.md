# 注意事项

## 不能通过全局变量获取属性参数
在 `PHP-FPM` 下可以通过全局变量获取到请求的参数，服务器的参数等，在 Hyperf 和 Swoole 内，都无法通过 `$_GET/$_POST/$_REQUEST/$_SESSION/$_COOKIE/$_SERVER` 等 `$_` 开头的变量获取到任何属性参数。

## 通过容器获取的类都是单例
通过依赖注入容器获取的都是进程内持久化的，是多个协程共享的，所以不能包含任何的请求唯一的数据或协程唯一的数据，这类型的数据都通过协程上下文去处理，具体请仔细阅读hyperf官方的 [依赖注入](https://hyperf.wiki/2.2/#/zh-cn/di) 和 [协程](https://hyperf.wiki/2.2/#/zh-cn/coroutine) 章节。

## 代码不生效
执行 `composer dump-autoload -o` 命令，重启服务

## Hyperf 常见问题
访问hyperf官方文档 [常见问题](https://hyperf.wiki/2.2/#/zh-cn/quick-start/questions)