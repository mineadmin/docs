# 开始
## 后端文件结构
```shell
.     
├── app                                 // 应用程序目录
│   └── System                          // 系统模块目录
│       └──Controller                   // 控制器目录
│       └──Databases                    // 数据库迁移
│       └──Mapper                       // 数据库映射访问层目录
│       └──Model                        // 模型目录
│       └──Request                      // 请求验证目录
│       └──Service                      // 业务逻辑层目录
│       └──...                          // 其他目录
│   └── Setting                         // 设置模块目录
│   └── ...                             // 以后增加的其他模块目录
├── bin                                 
│   └── hyperf.php                      // 启动项目的文件
├── config                              // 配置文件目录
├── mine                                // MineAdmin 核心目录
│   └──Abstracts                        // 存放抽象类目录
│   └──Annotation                       // 存放自定义注解目录
│   └──Aspect                           // 存放自定义切面目录
│   └──Command                          // 存放自定义命令目录
│   └──Crontab                          // 存放定时任务核心目录
│   └──Event                            // 存放事件目录
│   └──Exception                        // 存放异常接管处理目录
│   └──Generator                        // 存放代码生成处理目录
│   └──Helper                           // 助手类目录
│   └──Listener                         // 存放事件监听目录
│   └──Traits                           // 存放复用类目录
│   └──Mine.php                         // MineAdmin 基础功能类
│   └──MineCollection.php               // 模型数据处理类
│   └──MineCommand.php                  // 命令基础类
│   └──MineController.php               // 控制器基础类
│   └──MineModel.php                    // 模型基础类
│   └──MineModelVisitor.php             // 模型字段类型映射
│   └──MineRequest.php                  // 请求基础类
│   └──MineResponse.php                 // 响应基础类
│   └──MineServer.php                   // Mine服务类
│   └──MineUpload.php                   // 上传处理类
├── mine-ui                             // 前端目录
├── public                              // MineAdmin外部访问目录
├── runtime                             // 临时文件目录
├── storage                             // 多语言目录  
├── vendor
```

## 前端文件结构
```shell
./mine-ui/
├── build                      // 构建相关  
├── bin                        // 执行脚本
├── public                     // 公共文件
│   ├── favicon.ico            // favicon图标
│   └── index.html             // html模板
│   └── tinymce                // 编辑器
│   └── img                    // 对外图片目录
├── src                        // 核心源码目录
│   ├── api                    // 存放所有请求文件目录
│   ├── assets                 // 存放字体等静态资源目录
│   ├── components             // 存放全局公用组件目录
│   ├── config                 // 存放全局配置文件目录
│   ├── directive              // 存放全局指令目录
│   ├── layout                 // 存放布局目录
│   ├── router                 // 存放路由目录
│   ├── store                  // 存放store管理目录
│   ├── style                  // 存放css目录
│   ├── utils                  // 全局公用方法目录
│   ├── views                  // 存放所有页面目录
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
├── .editorconfig              // 编码格式
├── README.md                  // SCUI项目介绍文件
├── LICENSE                    // 开源协议文件
├── .gitignore                 // git 忽略项
├── babel.config.js            // babel.config.js
├── package.json               // package.json
└── vue.config.js              // vue.config.js
```


## 使用注解
注解是 MineAdmin 里面处处涉及到的知识点，通过注解可以减少很多配置并实现很多非常方便的功能。

#### 什么是注解？
在解释注解之前我们需要先定义一下 `注解` 与 `注释` 的区别：
- 注释：给程序员看，帮助理解代码，对代码起到解释、说明的作用。
- 注解：给应用程序看，用于元数据的定义，单独使用时没有任何作用，需配合应用程序对其元数据进行利用才有作用。

#### 注解如何使用
:::tip
注解必须写在标准注释块才能被正确解析，其它格式均不能被正确解析。
:::
注释块示例：
```php
/**
 * @AnnotationClass()
 */
```

在标准注释块内通过书写 `@AnnotationClass()` 这样的语法即表明对当前注释块所在位置的对象(类、类方法、类属性)进行了注解的定义， `AnnotationClass` 对应的是一个 `注解类` 的类名，可写全类的命名空间，亦可只写类名，但需要在当前类 `use` 该注解类以确保能够根据命名空间找到正确的注解类。

#### 下面举例一个使用注解的完整示例：

```php
<?php

declare(strict_types=1);
namespace App\System\Controller\Permission;

use App\System\Service\SystemUserService;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\PostMapping;
use Mine\Annotation\Auth;
use Mine\Annotation\OperationLog;
use Mine\Annotation\Permission;
use Mine\MineController;
use Psr\Http\Message\ResponseInterface;

/**
 * Class UserController
 * @package App\System\Controller
 * @Controller(prefix="system/user")
 * @Auth
 */
class UserController extends MineController
{
    /**
     * @Inject
     * @var SystemUserService
     */
    protected $service;

    /**
     * 新增一个用户
     * @PostMapping("save")
     * @param SystemUserCreateRequest $request
     * @return ResponseInterface
     * @Permission("system:user:save")
     * @OperationLog
     */
    public function save(SystemUserCreateRequest $request): ResponseInterface
    {
        return $this->success(['id' => $this->service->save($request->all())]);
    }
?>
```

#### 可以看到示例代码中用到了多种注解：
类注解
- `@Controller`
- `@Auth`

方法注解
- `@PostMapping`
- `@Permission`
- `@OperationLog`

每一种注解都代表了一种功能，比如 `@Controller` 注解代表设置该类的路由，`@Auth` 注解代表了身份认证，检测用户是否需要登录才可以访问




## 编程须知

#### 不能通过全局变量获取属性参数
在 `PHP-FPM` 下可以通过全局变量获取到请求的参数，服务器的参数等，在 Hyperf 和 Swoole 内，都无法通过 `$_GET/$_POST/$_REQUEST/$_SESSION/$_COOKIE/$_SERVER` 等 `$_` 开头的变量获取到任何属性参数。

#### 通过容器获取的类都是单例
通过依赖注入容器获取的都是进程内持久化的，是多个协程共享的，所以不能包含任何的请求唯一的数据或协程唯一的数据，这类型的数据都通过协程上下文去处理，具体请仔细阅读hyperf官方问的 <a href="https://hyperf.wiki/2.2/#/zh-cn/di" target="_blank">依赖注入</a> 和 <a href="https://hyperf.wiki/2.2/#/zh-cn/coroutine" target="_blank">协程</a> 章节。

#### Hyperf 常见问题
访问hyperf官方文档 <a href="https://hyperf.wiki/2.2/#/zh-cn/quick-start/questions" target="_blank">常见问题</a>