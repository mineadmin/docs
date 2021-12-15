# 模块开发

## 模块介绍
`MineAdmin` 非常适合模块化开发，从系统设计之初就考虑了模块功能。

模块有以下特点：
- 独立的`Controller、Request、Model、Service、Mapper`等基础架构
- 模块可以使用`Hyperf`框架、`MineAdmin`所有功能
- 拥有独立的数据迁移文件，用于模块安装、升级、回滚操作
- 模块可以独立发布、下载。

:::tip
模块可以看作一个独立的应用
:::

## 创建模块

目前创建模块只支持在后台创建：[ `开发工具 > 模块管理` ] 即可创建新模块

模块创建完成后，会生成一个基础的模块架构，新模块目录结构如下：
```
├── app                                 // 应用程序目录
│   └── Foo                             // 演示模块
│       └──Controller                   // 控制器目录
│       └──Databases                    // 数据库迁移
│       └──Mapper                       // 数据库映射访问层目录
│       └──Model                        // 模型目录
│       └──Middleware                   // 中间件目录
│       └──Request                      // 请求验证目录
│       └──Listener                     // 事件监听目录
│       └──Service                      // 业务逻辑层目录
│       └──config.json                  // 模块信息文件
│   └── ...                             // 其他模块
```

`config.json` 文件包含了模块的信息，`MineAdmin` 每次加载模块都会扫描此文件，文件信息如下：
```js
{
    "name": "Foo",
    "label": "演示",
    "description": "演示",
    "installed": true,
    "version": "1.0",
    "order": 0
}
```

:::tip
其实，也可以按照此目录结构以及`config.json`的信息，手动创建一个模块结构
:::

## 模块开发规范

- 模块名（模块目录名）唯一
- `config.json`的`name`属性值要与模块名一致