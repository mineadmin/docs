# 架构

:::tip 介绍
MineAdmin 后端系统架构思想来源于 Spring boot，但由于 php 和 java 并不一样，也不适合完全照搬，所以我们取其精华

系统分层：
1. 控制器 Controller
2. 业务服务层 Service
3. 数据访问映射 Mapper，这一层也可以叫做 Dao 层
4. 模型 Model，模型也可以叫做实体类

**注意：系统分层是为了更好管理业务代码逻辑，如觉着麻烦，可以用传统方式直接在 Controller 调用 Db 一把梭。**
:::

## Controller控制器层
MineAdmin 只是一个后台权限管理系统，控制器必须要继承 `MineController`，若是写前台或者跟后台无关的功能，则不需要继承

控制器按照系统架构分层，一般不进行业务逻辑代码的编写，它只负责业务代码的调用、返回数据功能。
```php
<?php

declare(strict_types=1);
namespace App\Foo\Controller;

use Mine\MineController
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Psr\Http\Message\ResponseInterface;

#[Controller(prefix: "foo")]
class FooController extends MineController {
    
    #[GetMapping("index")]
    public function index(): ResponseInterface
    {
        return $this->success('操作成功', [ 'data' => 'hello MineAdmin!']);
    }
}
```

## Service业务服务层
业务服务层也叫业务逻辑层，这一层主要写复杂的、可复用的业务逻辑功能，但不涉及任何直接对数据库的操作。

**而是通过调用 `Mapper` 从而间接对数据库操作**

:::tip
业务服务层和数据访问映射是一家，一般 `Service` 都要引入数据访问映射 `Mapper` 对象

业务服务层要继承 `AbstractService` 抽象服务类，该类引入了 `ServiceTrait` 里面封装了一套通用的 `CRUD` 操作方法
:::

- 通过 `Inject` 注解注入Mapper
```php
<?php

declare(strict_types=1);
namespace App\Foo\Service;

use Mine\Abstracts\AbstractService;
use Hyperf\Di\Annotation\Inject;
use App\Foo\Mapper\FooMapper;

class FooService extends AbstractService
{
    #[Inject]
    public FooMapper $mapper;
}
```

- 通过 `__construct` 参数注入Mapper
```php
<?php

declare(strict_types=1);
namespace App\Foo\Service;

use Mine\Abstracts\AbstractService;
use App\Foo\Mapper\FooMapper;

class FooService extends AbstractService
{
    public FooMapper $mapper;

    public function __construct(FooMapper $mapper)
    {
        $this->mapper = $mapper;
    }
}
```

## Mapper数据访问映射层
这一层其实含义就是 DAO 层，该层封装的方法其实就是对数据进行增删改查操作，但不同 `Service` 的是，Mapper的方法只接受 `sql语句` 和 `参数`，不负责实现具体的增删改查业务逻辑。只管将接受到的sql语句和参数拼接在一起，然后执行sql语句，并返回执行结果。
```php
<?php

declare(strict_types=1);
namespace App\Mapper\FooMapper;

use App\Model\FooModel;
use Mine\Abstracts\AbstractMapper;

class FooMapper extends AbstractMapper
{
    public $model;

    public function assignModel()
    {
        $this->model = FooModel::class;
    }
}

```

## Model模型
模型也可以叫实体类，它定义并映射了数据库的物理字段。
:::tip
`MineAdmin` 系统使用了 `Hyperf` 的模型，也就是 `Laravel` 的 **Eloquent ORM**，模型的操作方法可查看 `Laravel` 的相关文档

文档就不粘贴示例代码了
:::