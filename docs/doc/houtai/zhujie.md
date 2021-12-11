## 身份验证注解

#### 用户必须登录后才可以访问某个接口

使用范围
- Class   使用在类上面，对该类的所有方法有效
- Method  使用方法上面只对该方法有效

```php
/**
 * @Auth
 */
class UserController extends MineController
{
    // ...    
}

OR

class FooController extends MineController
{
    /**
     * @Auth
     */
    public function index()
    {
        // ...
    }
}
```

## 权限验证注解

#### 只允许有某接口权限的用户访问 （会附带对身份验证）

使用范围
- Method  只对方法有效

参数说明
- 要验证的权限标识代码，可在 `菜单管理` 查询菜单的权限标识代码

使用方法
- @Permission("system.user:save")

```php
class UserController extends MineController
{
    /**
     * @Permission("system:user:index")
     */
    public function index(): ResponseInterface
    {
        //...
    }
}
```

## 操作日志注解

#### 使用后会记录用户在后台请求某接口的参数、返回值、用户信息等

使用范围
- Method  只对方法有效 未传值情况下，请配合`@Permission`注解一起使用

参数说明 `0.4.1版本新增`
- 要记录的菜单名称

使用方法
- @OperationLog
- @OperationLog("用户更新")  `0.4.1版本新增`

```php
class UserController extends MineController
{
    /**
     * 新增用户
     * @PostMapping("save")
     * @Permission("system:user:save")
     * @OperationLog
     */
    public function save(): ResponseInterface
    {
        //...
    }

    /**
     * 获取用户列表
     * @GetMapping("list")
     * @OperationLog("用户列表")
     */
    public function list(): ResponseInterface
    {
        //...
    }
}
```


## 数据库事务注解

#### 使用后会自动启动事务、提交。执行失败自动回滚。

使用范围
- Method  只对方法有效

使用方法
- @Transaction

```php
/**
 * @Transaction
 */
public function save(): ResponseInterface
{
    //...
}
```


## 防止重复提交注解

#### 对接口使用后会在3秒内（默认值）禁止再次访问

使用范围
- Method  只对方法有效

参数说明
- 要禁止的秒数，默认值3秒

使用方法
- @Resubmit
- @Resubmit("10")

```php
/**
 * @Resubmit("5")
 */
public function save(): ResponseInterface
{
    //...
}
```

## 清除缓存注解

#### 主要用于更新、删除数据操作后，执行清除缓存操作，只需要指定缓存key即可 `0.4.1版本新增`

使用范围
- Method  只对方法有效

参数说明
- 要清除的缓存key，支持多个，每个key以逗号隔开；支持`通配符`清除缓存
- 通配符 `*` 例子：'loginInfo:*'

使用方法
- @DelteCache('crontab')
- @DelteCache("crontab,config:*")

```php
/**
 * 在更新完信息后，使用删除缓存注解，自动清除指定缓存
 * @DelteCache("crontab,loginInfo:*")
 */
public function updateInfo(): ResponseInterface
{
    //...
}
```

## Excel相关注解

#### 注解服务用于 `数据导出为Excel` 和 `Excel导入到数据库`

#### 定义Excel DTO类注解
- CLASS  只对类有效
- 使用方法 @ExcelData

#### 定义Excel DTO类属性注解
- METHOD  只对方法有效
- 使用方法 @ExcelProperty(value="显示列名", index="显示、读取顺序")
- 参数说明

| 参数           | 说明          |
| ------------- |:-------------:|
| value |显示在excel第一行的列名称|
| index |设置excel列的显示顺序，从0开始|

```php
<?php
namespace App\System\Dto;

use Mine\Interfaces\MineModelExcel;
use Mine\Annotation\ExcelData;
use Mine\Annotation\ExcelProperty;

/**
 * 用户数据对象类
 * @ExcelData
 */
class UserDto implements MineModelExcel
{
    /**
     * @ExcelProperty(value="用户名", index="0")
     */
    public $username;

    /**
     * @ExcelProperty(value="昵称", index="1")
     */
    public $nickname;
    
    /**
     * @ExcelProperty(value="手机", index="2")
     */
    public $phone;
}
```

