# 导入与导出
对于企业来讲，对报表之类的数据很重视，往往需要经常导出数据。而财务或者销售相关的数据会经常按月或季度来导入到系统。

我们为此设计了一套 [注解](/further/backend/annotation.html#excel相关注解)，配合使用

## 前提准备
:::tip
首先我们要创建一个`DTO（data to object）`类，该类要实现 `MineModelExcel` 接口（目前是个空接口，不需要做任何实现）

在类上面加上 `#[ExcelData]` 注解，类里面定义类属性，映射要 `导出/导出` 的数据库字段，该字段上面加上 `@ExcelProperty` 注解。

并且注解里设置相关属性，其中 `value` 和 `index` 是必须设置的项
:::

- 示例代码：
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

## 数据导出
### 快捷导出
:::tip
由于在 `ServiceTrait` 封装好了导出功能，在控制器只需要调用即可
:::
- export方法参数列表

| 参数 | 类型 | 说明 | 默认值 |
|:---:|:---:|:---:|:---:|
| $params | Array | 接收一个数组，用于数据条件筛选| - |
| $dto | String | 设置dto类的引用命名空间| - |
| $filename | String | 要导出的excel文件名称 | 默认以数据表名作为文件名 |

- 示例代码：
```php
/**
 * 用户导出
 * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
 * @return ResponseInterface
 */
#[PostMapping("export"), Permission("system:user:export")]
public function export(): ResponseInterface
{
    return $this->service->export($this->request->all(), \App\System\Dto\UserDto::class, '用户列表');
}
```

### 自定义导出
:::tip
上述使用是没有大的需求情况下，使用系统封装好的方法直接调用导出，在业务复杂的情况下，那么就需要自定义导出了
:::

- 使用 `\Mine\MineCollection` 下的 `export` 实现自定义导出
- 该方法第三个参数，支持传入一个`匿名函数`，自己实现获取数据方法，最后返回一个 `array` 即可。 也可以直接传入一个数据集合。

```php
/**
 * @param string $dto
 * @param string $filename
 * @param null|Closure|array $closure
 */
(new \Mine\MineCollection)->export($dto, $filename, $closure)
```

- 示例代码：
```php
// 传入匿名函数
(new \Mine\MineCollection)->export($dto, $filename, function() {
    return SystemUser::query()->where('age', '<', 18)->get()->toArray();
})

// 传入数据集合
$data = SystemUser::query()->where('age', '<', 18)->get()->toArray();

(new \Mine\MineCollection($data))->export($dto, $filename);
// 或者
(new \Mine\MineCollection())->export($dto, $filename, $data);
```

### 导出空模板
一样使用自定义导出的方法，只需要把第三个参数传入一个空数组即可
- 示例代码：
```php
(new MineCollection)->export(\App\System\Dto\UserDto::class, '用户导入模板', []);
```

## 数据导入
:::tip
数据导入首先必须提供一个 `空模板`，按照模板去填充数据，再上传服务器即可。

MineAdmin 封装了一套简便的使用方法，只需要在 `控制器` 调用 `业务服务层` 的 `import` 方法即可
:::

### 快捷导入
- `import` 方法接收 `dto` 类的引用命名空间地址
- 示例代码：
```php
/**
 * 用户导入
 * @return ResponseInterface
 * @throws \PhpOffice\PhpSpreadsheet\Reader\Exception
 */
#[PostMapping("import"), Permission("system:user:import")]
public function import(): ResponseInterface
{
    return $this->service->import(\App\System\Dto\UserDto::class) ? $this->success() : $this->error();
}
```

### 自定义导入
:::tip
如果业务复杂，导入数据不仅仅是 `单表` 操作，需要 `多表联动`；那么可以使用下面的方法，把具体的导入流程交给开发人员手里
:::

- 使用 `\Mine\MineCollection` 下的 `import` 实现自定义导出

- import方法参数列表 

| 参数 | 类型 | 说明 | 默认值 |
|:---:|:---:|:---:|:---:|
| $dto | String | 设置dto类的引用命名空间 | - |
| $model | MineModel | 继承于 `MineAdmin` 模型类 | - |
| $closure | String | 接收一个匿名函数, 返回值：bool | - |

- 匿名函数参数列表

| 参数 | 类型 | 说明 |
|:---:|:---:|:---:|
| $model | MineModel | 实例化后的模型对象 |
| $data  | Array | 从excel里读取好的待导入数据 |

- 示例代码：
```php
$bool = (new \Mine\MineCollection)->import(
    \App\System\Dto\UserDto::class, new SystemUser, function($model, $data) {
        try {
            foreach ($data as $item) {
                $model->insert($item);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
);
```