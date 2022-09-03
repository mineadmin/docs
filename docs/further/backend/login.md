# 登录替换
:::tip 理念
MineAdmin 后台只提供了最基础的登录功能，即：只需要提供 `用户名` 和 `密码` 即可登录，大家看到的验证码只是前端进行验证。
并不存在任何后端逻辑，我们的理念就是提供最简单实用的功能，而把扩展的空间留给大家。

现在后台登录体验越来越友好，有的需要支持扫码登录、有的需要支持微信登录或者是短信验证码登录等方式，我们提供了`登录替换`功能，只需要对配置文件参数进行设置，然后开发自己的登录逻辑即可，不需要改动`MineAdmin`的任何原生功能。
:::

## dependencies
该文件类型 `laravel` 的门面，是 `hyperf` 一大特色功能，用于管理 DI 的依赖关系和类对应关系。
- 文件目录：`config/autoload/dependencies.php`
- 文件内容：
```php
return [
    // 省略其他定义...
    Mine\Interfaces\UserServiceInterface::class => App\System\Service\Dependencies\UserAuthService::class,
]
```

我们可以看到，我们定义了一个 `UserServiceInterface` 接口，绑定了 `UserAuthService` 类。

这样做的好处就是：
- 我们定义了统一的接口，任何类实现接口就必须实现其接口功能。
- 通过这个模式，我们只需要替换到绑定的类即可。

我们接下来改变绑定的类：
```php
return [
    // 省略其他定义...
    Mine\Interfaces\UserServiceInterface::class => App\FooLogin::class,
]
```

## UserServiceInterface
- 下面就是接口的原型，有两个必须要实现的方法：`login()` 和 `logout()`
```php
namespace Mine\Interfaces;

use Mine\Vo\UserServiceVo;

/**
 * 用户服务抽象
 */
interface UserServiceInterface
{
    public function login(UserServiceVo $userServiceVo);

    public function logout();
}
```

## 实现登录和退出
接口并没有指定方法返回的数据类型，以下返回 `bool` 仅为示例代码
- App\FooLogin
```php
class FooLogin implements Mine\Interfaces\UserServiceInterface
{
    public function login(UserServiceVo $userServiceVo): bool
    {
        if ($userServiceVo->getUsername() !== '狂徒张三') {
            throw new Exception('你不是法外狂徒：张三');
        }

        if ($userServiceVo->getPassword() !== '123456') {
            throw new Exception('密码错误');
        }

        return true;
    }

    public function logout(): bool
    {
        // 一堆业务逻辑 todo...

        return true;
    }
}
```