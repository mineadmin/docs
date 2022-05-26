# 组件介绍

组件主要介绍 `MineAdmin` 系统封装的几个常用组件。`SCUI` 的组件使用方式，请[点击此处](https://lolicode.gitee.io/scui-doc/guide/)

## maSelectUser

用户选择器。可以通过该组件选择需要的用户并返回其用户ID，返回的类型为 `Array`。

```vue
<template>
    <ma-select-user v-model="users"> </ma-select-user>
</template>

<script>
import maSelectUser from "@/components/maSelectUser"
export default {
    components: {
        maSelectUser
    },
    data() {
        return {
            users: []
        }
    }
}
</script>
```

## maCityLinkage

城市联级选择器。通过该组件可以选择城市，并通过 `valueType` 属性来指定返回城市编码或名称。

```vue
<template>
    <city-linkage v-model="cityInfo" :valueType="cityType"> </city-linkage>
</template>

<script>
import cityLinkage from "@/components/maCityLinkage"
export default {
    components: {
        cityLinkage
    },
    data() {
        return {
           cityInfo: [],
           cityType: "name" // 设置为 code 时，返回城市编码
        }
    }
}
</script>
```

### Props

| 参数          | 说明         | 类型     | 可选值         | 默认值   |
|-------------|------------|--------|-------------|-------|
| placeholder | 未选择值时的占位内容 | String | -           | 请选择区域 |
| valueType   | 选择完毕后返回的内容累哦行 | String | code/name   | name  |
| expandType  | 次级菜单的展开方式  | String | click/hover | click |


## 三级下拉联动城市选择器

该组件将城市选择器分为三个可选组件，分别返回 `province` `city` 和 `area`，同时也支持修改 `valueType` 属性来指定返回的值是否为城市编码或城市名称。

```vue
<template>
    <three-city-linkage v-model="cityInfo" :valueType="cityType"> </three-city-linkage>
</template>

<script>
import threeLevelLinkage from "@/components/maCityLinkage/threeLevelLinkage";
export default {
    components: {
        threeLevelLinkage
    },
    data() {
        return {
           cityInfo: [],
           cityType: "name" // 设置为 code 时，返回城市编码
        }
    }
}
</script>
```

### Props

| 参数          | 说明         | 类型     | 可选值         | 默认值   |
|-------------|------------|--------|-------------|-------|
| valueType   | 选择完毕后返回的内容类型 | String | code/name   | name  |

