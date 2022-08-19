# 模块

:::tip
模块是 `MineAdmin` 从路由功能上物理划分出的，实际`Hyperf`目前没有此功能或者多应用架构
:::

<div style="text-align:center"><img src="https://s1.ax1x.com/2022/08/19/vrHv1x.png" /></div>

## 模块的意义

- 独立的业务功能划分，包含独立的`数据库迁移`文件，可独立`安装`、`卸载`以及`启停用`
- 可独立使用`MineAdmin` 和 `Hyperf` 所有功能
- 可开发独有模块功能，比如`注解`、`AOP`、`中间件`的功能使用
- 可迁移到其他使用`MineAdmin`的系统里

## config.json配置

- 每个模块都有一个`config.json`文件
- 系统启动时，会扫描每个模块下的配置文件

```js
{
    "name": "Foo",
    "label": "演示",
    "description": "演示",
    "installed": true,
    "enabled": true
    "version": "1.0",
    "order": 1
}
```

## 创建模块
目前创建模块只支持在后台创建：`[ 工具 > 模块管理 > 新增模块]` 即可创建新模块