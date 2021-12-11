# 后端文档

## 开发规范
:::tip
代码逻辑调用规则 控制器(Controller)->业务服务(Service)->数据访问映射(Mapper)->模型(Models) 
接口功能基本遵循以上规则，其实就是每个功能基本是4个文件支持。

当然你也可以不遵循这样的约定，直接在控制器调用模型实现功能。
:::

- `MineAdmin` 数据表主键使用了`雪花算法`，并且主键使用的为 `bigint` 类型。
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
引入模型类，必须按照示例代码来引入，模型绝对不能使用`依赖自动注入`形式引入。否则因为常驻内存的原因，会出现不可预测的问题。
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