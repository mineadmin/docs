# MaCrud组件（重要）

:::tip 开发初衷
在0.x版本时虽然开发了代码生成器，但对不熟悉Vue的同学非常不友好。一旦代码生成器生成的页面代码不符合实际需求，需要做出改动的情况下，还需要去学习Vue相关的知识。虽然十分建议学习Vue，但能若在项目开发中，慢慢掌握比单纯去枯燥的学习Vue要强的多。

所以，我们开发了 MaCrud 组件，通过名称基本可以了解是专门用于 增删改查 的组件，通过该组件可以体验出一些Layui时代的感觉，仅通过 JSON 配置，即可开发出包含 列表页面、新增、编辑、删除 等常用业务功能
:::

## 组件区域划分
组件一共分为八块功能区域，每块都有相关的 **参数** 或者 **插槽** 进行设置或者扩展功能

<img src="https://s1.ax1x.com/2022/08/19/vrrJ6x.png" />

::: tip 什么是插槽
插槽是Vue提出来的一个概念，如名字一样，插槽用于决定将所携带的内容（html代码、组件等内容），插入到指定的某个位置，从而对原始内容进行替换或者自定义扩展
:::

## 初步使用

组件进行了全局挂载，我们在任何的 Vue 页面中，只需要调用组件即可

**组件需要设置必填的两个参数**
| 参数名 | 参数类型 | 参数说明 |
|:---:|:---:|:---:|
| crud | Object | 该参数是对 **增删改查** 的一个整体设置，点此查看[[全部参数]]() |
| columns | Array | 该参数是对包括列表、新增和编辑的字段设置，点此查看[[全部属性]]() |

:::tip
除上面两个必填参数，组件还可以传入 Arco Design 表格的所有属性参数，[点击了解](https://arco.design/vue/component/table#API)

- 建议每个调用的 ma-crud 组件，都设置一个 **ref** 参数，如下代码示例
:::
```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef" />
</template>

<script setup>
import { ref, reactive } from 'vue'

// crud 组件的 ref
const crudRef = ref()
// 组件的整体参数定义
const crudOptions = reactive({})
// 组件的字段设置
const columnsOptions = reactive([])
</script>
```

## 详细使用

### API接口设置
我们在搭建好组件框架后，需要对 crud 组件的一些必要参数进行设置
- 这一步，我们要引入相关的 **业务网络请求** 文件，了解[网络请求](/further/front/request.md)

```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef" />
</template>

<script setup>
import { ref, reactive } from 'vue'
// 引入业务网络请求js
import foo from '@/api/foo/foo.js'

// crud 组件的 ref
const crudRef = ref()
// 组件的整体参数定义
const crudOptions = reactive({
    // 设置列表API接口
    api: foo.getList,
    // 设置新增接口
    add: {
        show: true,                     // 显示新增按钮
        api: foo.save                   // 新增接口
        auth: ['foo:save']              // 需要有新增的权限列表
    },
    // 设置编辑接口
    edit: {
        show: true,                     // 显示编辑按钮
        api: foo.update,                // 编辑接口
        auth: ['foo:update']            // 需要有编辑的权限列表
    },
    // 设置删除接口
    delete: {
        show: true,                     // 显示删除按钮
        api: foo.deletes,               // 删除接口
        auth: ['foo:deletes'],          // 需要有删除的权限列表
        realApi: foo.realDeletes,       // 真实删除接口
        realAuth: ['foo:realDeletes']   // 需要有真实删除的权限列表
    },
    // 设置恢复数据接口
    recovery: {
        show: true,                     // 显示恢复按钮
        api: foo.recoverys,             // 恢复接口
        auth: ['foo:recoverys']         // 需要有恢复的权限列表
    },
    // 设置导入接口
    import: {
        // 显示导入按钮
        show: true,
        // 填写导入接口地址，非封装的网络请求
        url: 'foo/foo/import',
        // 填写下载模板的接口地址，非封装的网络请求
        templateUrl: 'foo/foo/downloadTemplate',
        // 需要有导入的权限列表
        auth: ['foo:import']
    },
    // 设置导出接口
    export: {
        // 显示导出按钮
        show: true,
        // 填写导出的接口地址，非封装的网络请求
        url: 'foo/foo/export',
        // 需要有导出的权限列表
        auth: ['foo:export']
    },
})
// 组件的字段设置
const columnsOptions = reactive([])
</script>
```

### 设置字段列表
:::tip
在设置完接口后，我们则需要对字段进行设置
:::
```js
// 省略其他示例代码

// 组件的字段设置
const columnsOptions = reactive([
    {
        title: '标题',
        dataIndex: 'title',
        formType: 'input'
    },
    {
        title: '作者',
        dataIndex: 'author',
        formType: 'input'
    },
    {
        title: '浏览量',
        dataIndex: 'view_number',
        formType: 'input-number'
    },
    {
        title: '状态',
        dataIndex: 'status',
        formType: 'radio'
    },
    {
        title: '发布时间',
        dataIndex: 'created_at',
        formType: 'date'
    },
])

// 省略其他示例代码
```

到此为止，CRUD 组件的基本设置已经完毕，而且已完成了一个业务的 **列表浏览、新增、编辑、删除以及恢复数据** 等常用业务功能

下一步，我们将继续对 CRUD 组件进行设置

### 前置请求
:::tip
有的时候，我们需要在请求前做一些处理，比如请求一个列表数据，指定一个按照某字段的排序，这个时候则需要用前置请求来处理。
:::

```js
// 省略其他示例代码

// 组件的整体参数定义
const crudOptions = reactive({
    // 设置前置请求
    beforeRequest: params => {
        // 指定排序字段为浏览量字段
        params.orderBy = 'view_number'
        // 指定降序排序
        params.orderType = 'desc'
    }
})

// 省略其他示例代码
```

设置完毕后，crud 组件在每次请求服务器都会带上这两个参数，服务器接收后则按照指定的排序字段和方式进行查询数据

### 使用字典数据
在之前的 **组件字段设置** 我们仅仅是简单的对字段进行了基础配置

字典参数：
| 参数名 | 参数类型 | 参数说明 |
|:---:|:---:|:---:|
| name | String | 指定字典的名称，可在数据字典管理里面查看 |
| data | Array | 指定一个数据集合 |
| url | String | 指定一个url地址，组件自动进行远程请求数据 |
| method | String | 指定url请求时的请求方式：get,post,delete,put |
| params | Object | 指定url请求时的query参数 |
| body | Object | 指定url请求时的data参数 |
| translation | Boolean | 翻译：true则显示字典对应的标签，false则为显示原始数据 |
| props | Object | 设置解析数据的 label 和 value，例如: { label: 'title', value: 'key' } |

:::tip
支持字典的 formType 类型为以下几种：
- select 下拉选择框
- radio  单选框
- checkbox 复选框
- transfer 穿梭框
- cascader 级联选择器
- tree-select 下拉树形选择框
:::

```js
// 省略其他示例代码

// 组件的字段设置
const columnsOptions = reactive([
    {
        title: '标题',
        dataIndex: 'title',
        formType: 'input'
    },
    {
        title: '作者',
        dataIndex: 'author',
        formType: 'input'
    },
    {
        title: '浏览量',
        dataIndex: 'view_number',
        formType: 'input-number'
    },
    {
        title: '状态',
        dataIndex: 'status',
        formType: 'radio',
        // 使用字典
        dict: {
            // 指定字典名称
            name: 'data_status',
            // 设置解析数据的label 和 value
            props: { label: 'title', value: 'key' },
            // 对数据进行字典翻译
            translation: true
        },
    },
    {
        title: '发布时间',
        dataIndex: 'created_at',
        formType: 'date'
    },
])

// 省略其他示例代码
```
## formType 类型列表
| 类型 | 说明 | 其他参数 |
|:---:|:---:|:---:|
| radio | 单选框 | 无 |
| checkbox | 复选框 | 无 |
| select | 下拉选择框 | 多选 multiple: Boolean, 虚拟列表 virtualList: Boolean |
| transfer | 穿梭框 | 显示搜索 showSearch: Boolean,  |
| tree-select | 下拉树形选择框 | 多选 multiple: Boolean, 虚拟列表 virtualList: Boolean, 开启复选框 treeCheckable: Boolean |
| cascader | 级联选择器 | 多选 multiple: Boolean, 触发方式 trigger: 'click', 'hover' |
| date | 日期选择器 | 显示时间 showTime: Boolean |
| month | 月选择器 | 无 |
| year | 年选择器 | 无 |
| week | 周选择器 | 无 |
| quarter | 季度选择器 | 无 |
| range | 范围选择器 | 模式 mode: 'date', 'year', 'quarter', 'month', 'week' 显示时间 showTime: Boolean  |
| time | 时间选择器 | 类型 type: 'time', 'time-range' |
| input | 文本框 | 无 |
| password | 密码框 | 无 |
| textarea | 文本域 | 无 |
| upload | 图片/文件上传 | 类型 type: 'image', 'file', 数量 limit: Number, 多上传 multiple: Boolean, 是否分块 chunk: Boolean, 只返回URL onlyUrl: Boolean |
| select-user | 用户选择器 | 是否只返回用户ID onlyId: Boolean |
| editor | 富文本编辑器 | 编辑器高度 height: Number |
| code-editor | 代码编辑器 | 编辑器高度 height: Number |
| icon | 图标选择器 | 无 |
| user-info | 用户信息 | 无 |
| city-linkage | 城市联动选择器 | 组件类型 type: 'select', 'cascader', 返回数据模式 mode: 'name', 'code' |
| form-group | 子表单 | 无 |
| select-resource | 资源选择器 | 多选 multiple: Boolean, 只返回URL onlyUrl: Boolean |