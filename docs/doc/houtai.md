# 后端文档

## 开发规范
:::tip
代码逻辑调用规则 控制器(Controller)->业务服务(Service)->数据访问映射(Mapper)->模型(Models) 
接口功能基本遵循以上规则，其实就是每个功能基本是4个文件支持。

当然你也可以遵循这样的约定，直接在控制器调用模型实现功能。
:::

- `MineAdmin` 数据表主键使用了`雪花算法`，并且主键使用的为 `bigint` 类型。你也可以遵循这个约定。
- 如果你想使用自增ID，完全不影响使用。

## 路由命名规范
> MineAdmin 路由只使用 `注解路由`，所以请勿使用配置文件形式来注册路由

类路由使用 `@Controller`
方法路由使用具体各个实际请求方法的注解

- `@PostMapping`   POST请求路由注解
- `@GetMapping`    GET请求路由注解
- `@DeleteMapping` DELETE请求路由注解
- `@PutMapping`    PUT请求路由注解
- 其他请求注解方式请参考 `hyperf` 官方文档

路由命名规范为：`模块名/业务名/操作名`

例如，有一个系统模块，下面有个用户管理业务，要请求用户列表，那么应如此定义
```php
/**
 * 系统模块下的用户业务，控制器定义路由
 * @Controller(prefix="system/user")
 * @Auth
 */
class UserController extends MineController
{
    /**
     * 定义操作路由
     * @GetMapping("index")
     */
    public function index()
    {
        // TODO...
    }
}
```

那么他的访问地址既是 `system/user/index`
:::tip
整个系统的路由定义规范皆是如此，尽量遵守约定，可以减少项目后续中的麻烦。
:::

## 控制器层

因为是后台管理系统，控制器必须要继承 `MineController`。若是写前台或者其他方面，则不需要继承
```php
class FooController extends MineController {
    //TODO...
}
```

控制器引入业务的 `Service`，可以使用 `@Inject` 注解自动注入
```php
/**
 * 示例
 * @Controller(prefix="demo/foo")
 */
class FooController extends MineController {

    /**
     * @Inject
     * @var DemoService
     */
    protected $service;
    
    /**
     * 请求列表数据
     * @GetMapping("index")
     */
    public function index(): ResponseInterface
    {
        return $this->success($this->service->getPageList($this->request->all()));
    }
}
```

## 业务服务层

业务服务层也叫业务逻辑层，是对具体业务代码的封装，可以达到复用的结果

:::tip
业务服务层，要引入数据访问映射 `Mapper`；但Mapper内部要引入模型类，因为常驻内存原因，则不能使用 `@Inject` 注解引入Mapper

业务服务层要继承 `AbstractService` 抽象服务类，该类引入了 `ServiceTrait` 里面是对MineAdmin标准CURD一套的封装。
:::

```php
/**
 * Foo 业务服务
 */
class DemoFooService extends AbstractService
{
    /**
     * @var DemoFooMapper
     */
    public $mapper;

    /**
     * @param DemoFooMaper $mapper
     */
    public function __construct(DemoFooMapper $mapper)
    {
        $this->mapper = $mapper;
    }
}
```

## 数据访问映射层

通俗来讲，这层作用是对业务SQL的封装，因为它已经直接操作模型类了

:::tip
引入模型类，必须按照示例代码来引入，模型绝对不能使用`依赖自动注入`形式引入。否则因为常驻内存的原因，会导致不可预测出的问题。
:::

```php
use App\Demo\Model\FooModel;
/**
 * 示例代码
 */
class DemoFooMapper extends AbstractMapper
{
    /**
     * @var FooModel
     */
    public $model;

    public function assignModel()
    {
        $this->model = FooModel::class;
    }
}
```

## 身份验证注解 @Auth

#### 用户必须登录后才可以访问某个接口

使用范围
- Class   使用再类上面，对该类的所有方法有效
- Method  使用方法上面只对该方法有效

## 权限验证注解 @Permission

#### 只允许有某接口权限的用户访问 （会附带对身份验证）

使用范围
- Method  只对方法有效

参数说明
- 要验证的权限标识代码，可在 `菜单管理` 查询菜单的权限标识代码


## 操作日志注解 @OperationLog

#### 使用后会记录用户在后台请求某接口的参数、返回值、用户信息等

使用范围
- Method  只对方法有效


## 数据库事务注解 @Transaction

#### 使用后会自动启动事务、提交。执行失败自动回滚。

使用范围
- Method  只对方法有效


## 数据权限
在实际开发中，需要设置用户只能查看哪些部门的数据，这种情况一般称为数据权限。
例如对于销售，财务的数据，它们是非常敏感的，因此要求对数据权限进行控制，
对于基于集团性的应用系统而言，就更多需要控制好各自公司的数据了。
如设置只能看本公司、或者本部门的数据，对于特殊的领导，可能需要跨部门的数据，
因此程序不能硬编码那个领导该访问哪些数据，需要进行后台的权限和数据权限的控制。

#### 数据权限设置在角色管理里面

:::tip
超级管理员 `superAdmin` 默认为所有访问权限和数据权限，其角色同样如此。
:::

:::warning
若想使用数据权限，MineAdmin自带的数据表请忽略。
但自建的数据表都需要有 `created_by` 字段，且类型为`bigint`
:::

:::tip
使用方法
:::

MineAdmin 通过 `Builder` 类的 `macro` 方法扩展出了一个方法 `userDataScope()`。

不管你是用 查询构造器 方式还是使用 模型查询，都可以使用该方法
```php
// 查询构造器使用
Db::table('user')->userDataScope()->get();

// 模型使用
User::query()->userDataScope()->get();
```

这样，查询出的数据会自动设置该用户所允许查看的数据了。

:::tip
如果使用系统封装好的curd，那么系统已经默认调用该方法了。
:::

## 定时任务
`MineAdmin` 的定时任务是在 `Hyperf` 官方的定时任务基础上修改而来，执行逻辑不变。
但启停某个定时任务完全可以在后台控制，并且增加了 `请求url` 类型任务。

:::tip
定义 `eval` 和 `url` 可以不重启，在任务开启后的下一分钟后将按照定义时间来执行。

`Class` 和 `Command` 则都需要重启服务器才会生效。
:::
- <b>url</b> 任务可以指定一个url地址来请求，没有什么可解释的。

- <b>eval</b> 任务可以直接写入 `php` 代码，但代码请不要带 `<?php` 和 `?>`，具体查阅 `eval` 函数

- <b>Class</b> 任务必须指定带有 `命名空间的类名`，并且实现一个 `public` 属性的方法：`execute`，方法返回值为 `bool` 类型

- <b>Command</b> 任务请先按照 `Hyperf` 官方文档定义好执行命令，在新增任务，输入定义的 `命令` 即可

## 代码生成

完善中...