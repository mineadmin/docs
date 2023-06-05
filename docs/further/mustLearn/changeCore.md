# 核心类库的替换

:::tip <a-badge text="1.3.0+" />
在实际开发中，因为业务的需要，系统的功能无法满足；这时可能需要对 `MineAdmin` 核心库的某些类进行修改或者重写。

但实际操作后发现，如果后续升级到新版本，将会是一个大问题！

为此，MineAdmin提供一种可无感替换任何类的方式：[依赖代理注解](/further/backend/annotation.md#依赖代理注解)，通过此注解可以平滑、无损且无感的替换 `MineAdmin` 核心库的任何类，也包括<a-tag size="large" color="blue">vendor</a-tag>目录下的所有类。而且最大的好处是不会影响后续更新升级
:::