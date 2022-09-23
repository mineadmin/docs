# 注解

## 介绍
:::tip 特点
注解是 `Hyperf` 非常强大的一项功能，也是 `MineAdmin` 到处使用的功能。

程序可以通过注解的形式减少很多的配置，以及实现很多非常方便的功能。
:::

### 什么是注解什么是注释？
在解释注解之前我们需要先定义一下 `注解` 与 `注释` 的区别：
- 注释：给程序员看，帮助理解代码，对代码起到解释、说明的作用。
- 注解：给应用程序看，用于元数据的定义，单独使用时没有任何作用，需配合应用程序对其元数据进行利用才有作用。

### 注解如何书写
由于，我们已经使用了 `PHP 8.0` 及以上版本，我们可以使用php自带的原生注解，故我们也只讲原生注解使用方法。

我们还是看控制器的代码，我们发现代码里存在两句：
- #[Controller(prefix: "foo")]
- #[GetMapping("index")]

以上就是使用和书写注解的方式，由 `#[]` 组成，方括号内的内容则是注解内容
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

## 路由注解
:::tip
系统内所有的 `http` 访问都是以注解形式定义的路由。根据系统的开发规范，要放弃过去的配置文件注册路由的形式，转而使用注解来注册路由。

相比配置文件使用注解来注册路由有以下好处：
- 找控制器文件方便，不需要再打开相应的配置文件查找具体的控制器文件
- 找路由方便，不需要对比控制器文件和配置文件相互印证，只需要通过全局搜索注解路由即可
- 控制器即是路由文件，减少了配置文件
- 对新手友好，可以更快掌握开发方式
:::

### 类路由注解

类路由使用 `#[Controller]` 注解来注册路由，使用 `prefix` 指定类路由的前缀
```php
/**
 * 该类的访问前缀则为：system/user
 */
#[Controller(prefix: "system/user")]
class UserController extends MineController
{
    //todo...
}
```

### 方法路由注解
- **#[PostMapping]** POST请求路由注解
- **#[GetMapping]** GET请求路由注解
- **#[DeleteMapping]** DELETE请求路由注解
- **#[PutMapping]** PUT请求路由注解
:::tip
其他请求注解方式请参考 hyperf [路由](https://hyperf.wiki/2.2/#/zh-cn/router?id=%e9%80%9a%e8%bf%87%e6%b3%a8%e8%a7%a3%e5%ae%9a%e4%b9%89%e8%b7%af%e7%94%b1) 章节
:::
```php
/**
 * 定义控制器访问前缀
 */
#[Controller(prefix: "system/user")]
class UserController extends MineController
{
    /**
     * 定义操作路由
     * 该方法的访问路径为：system/user/index，请求方式：GET
     */
    #[GetMapping("index")]
    public function index()
    {
        return $this->success('hello world');
    }
}
```


### 路由命名规范
:::tip 规范
路由命名规范为：模块名/业务名/操作名

整个系统的路由定义规范皆是如此，尽量遵守约定，可以减少项目后续中的麻烦。
:::

## 系统内置注解
MineAdmin 在开发之初就规划了几个注解，我们可以在开发中调用这些注解来帮助完成业务开发

### 登录验证注解
#### 注解名
- **#[Auth]**
#### 说明
用户必须登录后才可以访问某个接口

#### 使用范围
- √ 代表可用
- x 代表不可用

| 类 | 方法 |
|:---:|:---:|
| √ | √ |
| 类使用后，该类所有方法都将验证 | 若类未使用，仅方法使用，只对该方法检查 |

#### 注解参数
| 参数名 | 说明 | 默认值 |
|:---:|:---:|:---:|
| scene | 场景名，需要验证登录的场景 | 'default' |

#### 使用示例
```php
// 引入注解
use Mine\Annotation\Auth;

#[Auth]
class UserController extends MineController
{
    // ...    
}

// 或者

class FooController extends MineController
{
    #[Auth]
    public function index()
    {
        // ...
    }
}
```

### 权限验证注解
#### 注解名
- **#[Permission]**
#### 说明
只允许有某接口权限的用户访问（会附带其登录验证）

#### 使用范围
- √ 代表可用
- x 代表不可用

| 类 | 方法 |
|:---:|:---:|
| x | √ |
| - | 仅能对方法使用 |

#### 注解参数
| 参数名 | 说明 | 默认值 |
|:---:|:---:|:---:|
| code | 权限代码标识，支持验证多个权限 | - |
| where | 验证条件：AND, OR | OR |

#### 使用示例
```php
// 引入注解
use Mine\Annotation\Permission;

class FooController extends MineController
{
    /**
     * 验证一个权限，通过即可访问
     */
    #[Permission("system:foo:index")]
    public function index(): ResponseInterface
    {
        //...
    }

    /**
     * 验证多个权限，全部通过才可访问
     */
    #[Permission("system:foo:save, system:foo:update", "AND")]
    public function save(): ResponseInterface
    {
        //...
    }

    /**
     * 验证多个权限，其中一个通过即可访问
     */
    #[Permission("system:foo:index, system:foo:read", "OR")]
    public function read(): ResponseInterface
    {
        //...
    }
}
```

### 角色验证注解
#### 注解名
- **#[Role]**
#### 说明
只允许有用某个角色的用户访问（会附带其登录验证）

#### 使用范围
- √ 代表可用
- x 代表不可用

| 类 | 方法 |
|:---:|:---:|
| x | √ |
| - | 仅能对方法使用 |

#### 注解参数
| 参数名 | 说明 | 默认值 |
|:---:|:---:|:---:|
| code | 角色代码标识，支持验证多个角色 | - |
| where | 验证条件：AND, OR | OR |

#### 使用示例
```php
// 引入注解
use Mine\Annotation\Role;

class FooController extends MineController
{
    /**
     * 验证一个角色，通过即可访问
     */
    #[Role("superAdmin")]
    public function index(): ResponseInterface
    {
        //...
    }

    /**
     * 验证多个角色，全部通过才可访问
     */
    #[Role("ceo, cfo", "AND")]
    public function save(): ResponseInterface
    {
        //...
    }

    /**
     * 验证多个角色，其中一个通过即可访问
     */
    #[Role("cto, cfo", "OR")]
    public function read(): ResponseInterface
    {
        //...
    }
}
```

### 操作日志注解
#### 注解名
- **#[OperationLog]**
#### 说明
使用后会记录用户在后台请求某接口的参数、返回值、用户信息等

#### 使用范围
- √ 代表可用
- x 代表不可用

| 类 | 方法 |
|:---:|:---:|
| x | √ |
| - | 仅能对方法使用 |

#### 注解参数
:::tip
如果未传参数，请配合 `#[Permission]` 注解使用
:::
| 参数名 | 说明 | 默认值 |
|:---:|:---:|:---:|
| menuName | 菜单名称 | 默认值：未定义菜单，搭配 #[Permission] 注解使用后，会自动获取菜单名称 |

#### 使用示例
```php
// 引入注解
use Mine\Annotation\OperationLog;

class UserController extends MineController
{
    /**
     * 新增用户
     */
    #[Permission("system:user:save"), OperationLog]
    public function save(): ResponseInterface
    {
        //...
    }

    /**
     * 获取用户列表
     */
    #[OperationLog("用户列表")]
    public function list(): ResponseInterface
    {
        //...
    }
}
```

### 数据库事务注解
#### 注解名
- **#[Transaction]**
#### 说明
使用后会自动启动事务、提交。执行失败自动回滚。

#### 使用范围
- √ 代表可用
- x 代表不可用

| 类 | 方法 |
|:---:|:---:|
| x | √ |
| - | 仅能对方法使用 |

#### 注解参数
| 参数名 | 说明 | 默认值 |
|:---:|:---:|:---:|
| retry | 重试次数 | 1 |

#### 使用示例
```php
// 引入注解
use Mine\Annotation\Transaction;

// 忽略其他代码

/**
 * 新增用户，使用事务注解，失败重试 2 次
 */
#[Transaction(2)]
public function save(): MineModel
{
    //...
}

```

### 防止重复提交注解
#### 注解名
- **#[Resubmit]**
#### 说明
对接口使用后会在3秒内（默认值）禁止再次访问

#### 使用范围
- √ 代表可用
- x 代表不可用

| 类 | 方法 |
|:---:|:---:|
| x | √ |
| - | 仅能对方法使用 |

#### 注解参数
| 参数名 | 说明 | 默认值 |
|:---:|:---:|:---:|
| second | 要禁止的秒数 | 3 |
| message | 提示的信息 | - |

#### 使用示例
```php
// 引入注解
use Mine\Annotation\Resubmit;

// 忽略其他代码

/**
 * 新增用户，3秒内禁止重复提交
 */
#[Resubmit]
public function save(): MineModel
{
    //...
}

```

### 清除缓存注解
#### 注解名
- **#[DelteCache]**
#### 说明
用于更新、删除数据操作后，执行清除缓存操作，只需要指定缓存key即可

#### 使用范围
- √ 代表可用
- x 代表不可用

| 类 | 方法 |
|:---:|:---:|
| x | √ |
| - | 仅能对方法使用 |

#### 注解参数
| 参数名 | 说明 | 默认值 |
|:---:|:---:|:---:|
| keys | 要清除的缓存key，支持多个，每个key以逗号隔开；支持 ` 通配符：* ` 清除缓存 | - |

#### 使用示例
```php
// 引入注解
use Mine\Annotation\DelteCache;

// 忽略其他代码

/**
 * 在更新完信息后，使用删除缓存注解，自动清除指定缓存
 */
#[DelteCache("crontab,loginInfo:*")]
public function updateInfo(): ResponseInterface
{
    //...
}

```

### Excel相关注解
#### 注解名
- **#[ExcelData]**
- **#[ExcelProperty]**
#### 说明
注解服务用于 **数据导出为Excel** 和 **Excel导入到数据库**

#### #[ExcelData] 使用范围
- √ 代表可用
- x 代表不可用

| 类 | 方法 |
|:---:|:---:|
| √ | x |
| 仅能对类使用，声明类为 `ExcelData` | - |

#### #[ExcelProperty] 使用范围
- √ 代表可用
- x 代表不可用

| 类 | 方法 | 属性 |
|:---:|:---:|:---:|
| x | x | √ |
| - | x | 声明导出列映射数据库字段属性 |

#### #[ExcelData] 注解参数
无

#### #[ExcelProperty] 注解参数
| 参数  | 说明 | 默认值 |
|:---:|:---:|:---:|
| value |显示在excel第一行的列名称| - |
| index |设置excel列的显示顺序，从0开始| - |
| width |设置单元格的宽度| - |
| align |设置单元格的对齐方式，有 `left`, `center`, `right` 可选| left |
| headColor |设置`表头`单元格字体颜色，十六进制，例如 `00FF00`，xlswriter只支持整行设置| - |
| headBgColor |设置`表头`单元格背景颜色，十六进制，例如 `00FF00`，xlswriter只支持整行设置| - |
| color |设置`表体`单元格字体颜色，十六进制，例如 `00FF00`，xlswriter只支持整行设置| - |
| bgClor |设置`表体`单元格背景颜色，十六进制，例如 `00FF00`，xlswriter只支持整行设置| - |

#### 使用示例
```php
<?php
namespace App\System\Dto;

use Mine\Interfaces\MineModelExcel;
use Mine\Annotation\ExcelData;
use Mine\Annotation\ExcelProperty;

/**
 * 用户数据对象类
 */
#[ExcelData]
class UserDto implements MineModelExcel
{
    #[ExcelProperty(value="用户名", index=0, width=20)]
    public string $username;

    #[ExcelProperty(value="昵称", index=1, width=15)]
    public string $nickname;
    
    #[ExcelProperty(value="手机", index=2, width=15)]
    public string $phone;
}
```