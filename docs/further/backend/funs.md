# 内置函数

## container() 从容器获取单例
此函数使用的是 `hyperf` 的DI，做了封装，可方便快捷的从容器获取类的单例。
- 示例代码：
```php
// 获取 \Mine\MineRequest 的单例
$request = container()->get(\Mine\MineRequest::class);
```

## redis() 获取Redis实例
此函数可以获取Redis实例对象，可对redis进行相关操作
- 示例代码：
```php
// 获取 Redis 的实例
$redis = redis();
$username = $redis->get('username');
```

## console() 获取控制台输出实例
此函数可以获取控制台输出实例对象，可以在控制台输出信息，进行代码调试等操作。
- 示例代码：
```php
// 获取控制台输出实例
$console = console();

$console->alert('警告信息');
$console->info('普通信息');
$console->warning('注意信息');
$console->notice('提示信息');
$console->error('错误信息');
$console->debug('调试信息');
$console->log('日志信息');
```

## logger() 获取日志对象
此函数可以获取日志对象，对错误、警告、操作等信息可以保存成日志文件。

- 示例代码：
```php
// 获取控制台输出实例
$logger = logger();

$logger->alert('警告日志');
$logger->info('普通日志');
$logger->warning('注意日志');
$logger->notice('提示日志');
$logger->error('错误日志');
$logger->debug('调试日志');
$logger->log('一般日志');
```

## 其他函数
```php
/**
 * 获取当前登录用户实例
 * @param string $scene
 * @return LoginUser
 */
user(string $scene = 'user');

/**
 * 获取APP应用请求实例
 * @param string $scene
 * @return AppVerify
 */
app_verify(string $scene = 'api');

/**
 * 格式化大小
 * @param int $size
 * @return string
 */
format_size(int $size);

/**
 * 多语言函数
 * @param string $key 语言包key
 * @param array $replace 语言包关键字替换指定内容
 * @return string
 * @throws \Psr\Container\ContainerExceptionInterface
 * @throws \Psr\Container\NotFoundExceptionInterface
 */
t(string $key, array $replace = []);

/**
 * 创建一个Mine的集合类
 * @param null|mixed $value
 * @return \Mine\MineCollection
 */
mine_collect($value = null);

/**
 * 设置协程上下文数据
 * @param string $key 
 * @param $data
 * @return bool
 */
context_set(string $key, $data);

/**
 * 获取上下文数据
 * @param string $key
 * @return mixed
 */
context_get(string $key);

/**
 * 事件调度快捷方法
 * @param object $dispatch
 * @return object
 * @throws \Psr\Container\ContainerExceptionInterface
 * @throws \Psr\Container\NotFoundExceptionInterface
 */
event(Object $dispatch);

/**
 * 推送消息到队列
 * @param QueueMessageVo $message
 * @param array $receiveUsers
 * @return bool
 * @throws Throwable
 * @throws \Psr\Container\ContainerExceptionInterface
 * @throws \Psr\Container\NotFoundExceptionInterface
 */
push_queue_message(QueueMessageVo $message, array $receiveUsers = []);

/**
 * 添加任务到队列
 * @param \App\System\Vo\AmqpQueueVo $amqpQueueVo
 * @return bool
 * @throws Throwable
 * @throws \Psr\Container\ContainerExceptionInterface
 * @throws \Psr\Container\NotFoundExceptionInterface
 */
add_queue(\App\System\Vo\AmqpQueueVo $amqpQueueVo);
```