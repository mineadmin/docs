# MaCrud组件（重要）

:::tip 开发初衷
在0.x版本时虽然开发了代码生成器，但对不熟悉Vue的同学非常不友好。一旦代码生成器生成的页面代码不符合实际需求，需要做出改动的情况下，还需要去学习Vue相关的知识。虽然十分建议学习Vue，但能若在项目开发中，慢慢掌握比单纯去枯燥的学习Vue要强的多。

所以，我们开发了 MaCrud 组件，通过名称基本可以了解是专门用于 增删改查 的组件，通过该组件可以体验出一些Layui时代的感觉，仅通过 JSON 配置，即可开发出包含 列表页面、新增、编辑、删除 等常用业务功能
:::

## 组件区域划分
组件一共分为八块功能区域，每块都有相关的 **参数** 或者 **插槽** 进行设置或者扩展功能

<img src="https://s1.ax1x.com/2022/08/19/vrrJ6x.png" />

## 初步使用

组件进行了全局挂载，我们在任何的 Vue 页面中，只需要调用组件即可

以下为组件的Props参数 **组件初始化需要设置必填的两个参数**
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| crud | Object | 该参数是对 **增删改查** 的一个整体设置，点此查看[[全部参数]](/further/front/crudComponent.html#参数列表) | 是 |
| columns | Array | 该参数是对包括列表、新增和编辑的字段设置，点此查看[[全部属性]](/further/front/crudComponent.html#属性列表) | 是 |
| data | Function, Array | 数据集合，可直接指定数据集合 | 否 |
| pagination | Boolean | 是否开启表格分页 | false |
| pageSizeOption | Number[] | 设置每页记录数  | [10, 20, 30, 50, 100] |

:::tip
除两个必填参数，组件还可以传入 Arco Design 表格的所有属性参数，[点击了解](https://arco.design/vue/component/table#API)

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
我们会经常使用一些固定性的数据，比如状态字段，一般最常见的也有两个选项：正常/停用。对于选项性、且固定的数据我们可以采用数据字典方式

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
| tagColor | String | 通过设置tag标签的颜色对翻译的字典数据加上tag |
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

### 数据联动
MineAdmin 专门开发了数据联动功能，可大大简化日常开发中的繁琐

:::tip 必要条件
使用数据联动需要有以下几个条件：
- formType 组件类型比如为：**select | radio | checkbox** 三种类型，其他类型目前暂时不支持
- 联动和被联动的字段都需要在 columns 属性中使用字典
- 被联动数据字典只支持 url 请求方式
:::

- 使用说明
```js
// 省略其他示例代码

// 组件的字段设置
const columnsOptions = reactive([
    {
        title: '数据A',
        dataIndex: 'dataA',
        formType: 'select',
        dict: {
            // 调用某字典数据
            name: 'demo_dict_name',
            props: { label: 'title', value: 'key'},
        },
        // 定义联动，dataA的数据改变，dataB和dataC的数据也会变化
        cascaderItem: ['dataB', 'dataC'],
    },
    {
        title: '数据B',
        dataIndex: 'dataB',
        formType: 'select',
        // 定义字典，组件会自动将dataA选择的值把{{key}}替换掉，进行服务器请求
        dict: {
            url: 'demo/dataB/{{key}}',
            props: { label: 'title', value: 'key'},
        },
    },
    {
        title: '数据C',
        dataIndex: 'dataC',
        formType: 'select',
        // 定义字典，未带{{key}}，组件会自动在该url后面追加?key=value 上dataA的值
        dict: {
            url: 'demo/dataC',
            props: { label: 'title', value: 'key'},
        },
        // 同时，定义定义联动字段dataD
        cascaderItem: ['dataD'],
    },
    {
        title: '数据D',
        dataIndex: 'dataD',
        formType: 'select',
        // 定义字典，组件会自动将dataC选择的值把{{key}}替换掉，进行服务器请求
        dict: {
            url: 'demo/dataD/{{key}}',
            props: { label: 'title', value: 'key'},
        },
    },
])

// 省略其他示例代码
```

### 分组表头
组件支持分组表头定义，只需要在 `columns` 里加入 `children` 即可
<img src="https://s1.ax1x.com/2022/08/23/vcmQqP.png" />

```js
// 省略其他示例代码

// 组件的字段设置
const columnsOptions = reactive([
    {
        title: 'Name',
        dataIndex: 'name',
        fixed: 'left',
        width: 140,
    }, {
        title: 'User Info',
        children: [{
            title: 'Birthday',
            dataIndex: 'birthday'
        }, {
            title: 'Address',
            children: [{
            title: 'City',
            dataIndex: 'city'
            }, {
            title: 'Road',
            dataIndex: 'road'
            }, {
            title: 'No.',
            dataIndex: 'no'
            }]
        }]
    }, {
        title: 'Information',
        children: [{
            title: 'Email',
            dataIndex: 'email',
        }, {
            title: 'Phone',
            dataIndex: 'phone',
        }]
    }, {
        title: 'Salary',
        dataIndex: 'salary',
        fixed: 'right',
        width: 120
    }
])

// 省略其他示例代码
```

### 合计行应用
表格尾部合计行在一些行业中非常常用，我们做了封装，且支持以下合计方式：
- 加总合计
- 平均合计

使用示例
```js
// 省略其他示例代码

// 组件的整体参数定义
const crudOptions = reactive({
    // 设置列表API接口
    api: foo.getList,
    // 开启合计行功能
    showSummary: true,
    summary: [
        // 定义 amountA 字段加总合计
        {
            dataIndex: 'amountA',
            action: 'sum'
        },
        // 定义 amountA 字段平均合计
        {
            dataIndex: 'amountB',
            action: 'avg'
        },
    ]
})

// 省略其他示例代码
```

### 字段交互控制
在一些情况下，有这种需求：
- A字段的值等于1，B字段和C字段隐藏
- A字段的值等于2，B字段隐藏，C字段显示
- A字段的值等于3，C字段隐藏，B字段显示
- A字段的值等于4，B字段和C字段显示

在或者，某些情况下，改变某字段的 label、value 等，我们称之为字段交互控制

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
        // 定义字段交互控制
        control: (val, form) => {
            if (val == 1) {
                return {
                    view_number: { display: false },
                    created_at: { display: false },
                    author: { title: '我的标题改变咯' }
                }
            }
            if (val == 2) {
                return {
                    view_number: { display: true },
                    created_at: { display: true },
                    author: { title: '作者' }
                }
            }
        }
    },
    {
        title: '发布时间',
        dataIndex: 'created_at',
        formType: 'date'
    },
])

// 省略其他示例代码
```

### 使用jxs自定义渲染
MineAdmin 提供了 jxs 模板渲染表格列的支持，这里要感谢 `ZQ` 贡献的代码，是他实现了这项功能

:::tip
此方法和表格列插槽选择其中一种即可，参数与表格列插槽的参数一样
:::
```js
// 省略其他示例代码

// 组件的字段设置
const columnsOptions = reactive([
    {
        title: '状态',
        dataIndex: 'status',
        formType: 'radio',
        dict: {
            name: 'data_status',
            props: { label: 'title', value: 'key' },
        },
        customRender: ({ record }) => {
            const status = record.status
            const colors = ['', 'blue', 'red']
            const label = status == 1 ? '正常' : '停用'
            return (
                <a-tag color={colors[status]}>{label}</a-tag>
            )
        }
    },
])

// 省略其他示例代码
```

### 新增编辑表单布局
::: tip
组件对表单布局提供了两种模式：
- auto 自动化布局，这种只需要设置一行显示多少列即可，同时支持移动端
- customer 自定义布局，使用的是 `Arco Design` 的栅格系统，也是支持移动端
:::
#### 自动化布局
- 自动化布局非常省事，几乎不需要多余配置，仅仅两三行代码即可完成
```js
// 省略其他示例代码

// 组件的整体参数定义
const crudOptions = reactive({
    // 新增编辑显示设置项
    viewLayoutSetting: {
        // 设置布局模式为 'auto'
        layout: 'auto',
        // 一行两列表单布局模式，移动端模式下，会变为一行一列
        cols: 2,
    }
})

// 省略其他示例代码
```

#### 自定义布局
- 自定义布局适合复杂的表单系统，一行多少列显示完全由自己控制，对于复杂的表单，这个模式非常合适
- 系统使用了栅格系统，`Arco Design` 的栅格划分为 **24** 列，即 **24** 为一整行
- 如果均等的两列，各设置 **12**，均等三列，各设置 **8**。即：通过这种方式来控制表单布局
:::tip
首先设置布局模式
:::
```js
// 省略其他示例代码

// 组件的整体参数定义
const crudOptions = reactive({
    // 新增编辑显示设置项
    viewLayoutSetting: {
        // 设置布局模式为 'customer' 自定义模式，启用栅格系统
        layout: 'customer',
    }
})

// 省略其他示例代码
```
:::tip
其次对字段进行设置，系统默认每个字段的栅格为：**24**
:::
```js
// 省略其他示例代码

// 组件的字段设置
const columnsOptions = reactive([
    {
        title: '标题',
        dataIndex: 'title',
        formType: 'input',
        // 设置栅格为 24，其实系统默认就是24
        span: 24,
    },
    // 下面三个字段都设置为8，代表三个字段都在一行
    {
        title: '作者',
        dataIndex: 'author',
        formType: 'input',
        // 设置栅格为8
        span: 8,
    },
    {
        title: '浏览量',
        dataIndex: 'view_number',
        formType: 'input-number',
        // 设置栅格为8
        span: 8,
    },
    {
        title: '状态',
        dataIndex: 'status',
        formType: 'radio',
        // 设置栅格为8
        span: 8,
    },
    // 默认为 24，独占一行
    {
        title: '发布时间',
        dataIndex: 'created_at',
        formType: 'date',
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
| switch| 开关 | 选中的值 checkedValue: String, Number, Boolean 未选中的值 uncheckedValue: String, Number, Boolean |
| date | 日期选择器 | 显示时间 showTime: Boolean, 模式 mode: 'month', 'year', 'week', 'quarter' |
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

## CRUD详解

### 参数列表
| 名称 | 类型 | 说明 | 默认值 |
|:---:|:---:|:---:|:---:|
| pk | String | 设置表格主键key | 'id' |
| rowSelection | TableRowSelection | 表格的行选择器配置，可参考 [配置项](/further/front/crudComponent.html#表格的行选择器配置)| 无 |
| bordered | Object | 是否显示边框 | { wrapper: true, cell: false } |
| hideExpandButtonOnEmpty | Boolean | 子节点为空隐藏节点按钮 | true |
| expandAllRows | Boolean | 默认展开所有行 | false |
| stripe | Boolean | 斑马线 | true |
| size | 'mini', 'small', 'medium', 'large' | 表格大小 | 'large' |
| searchLabelWidth | string, 'auto'  | 搜索label宽度 | 'auto' |
| searchLabelAlign | 'left', 'center', 'right' | 搜索label对齐方式 | 'right' |
| isExpand | Boolean | 是否显示折叠按钮 | false |
| showTools | Boolean | 是否显示工具栏 | true |
| resizable | Boolean | 允许调整列宽 | true |
| scroll | Object | 表格滚动默认宽高 | { x: '100%', y: '100%' } |
| --- | ---  | --- | --- |
| autoRequest | Boolean | 是否自动请求 | true |
| dataCompleteRefresh | Boolean | 新增、编辑、删除完成后是否刷新表格 | true |
| isDbClickEdit | Boolean | 是否开启双击编辑数据 | true |
| showExpandRow | Boolean | 是否显示自定义扩展行 | false |
| showSummary | Boolean | 是否显示合计行 | false |
| summary | Object | 合计行，可参考 [配置项](/further/front/crudComponent.html#合计行设置) | - |
| customerSummary | Function | 自定义合计行 | - |
| showIndex | Boolean | 是否显示索引列 | false |
| indexLabel | String | 索引列名称 | '序号' |
| requestParamsLabel | String | 设置请求数据label | - |
| indexLabel | String | 索引列名称 | '序号' |
| operationColumn | Boolean | 是否显示操作列 | false |
| operationWidth | Number | 操作列宽度 | 160 |
| operationColumnText | String | 操作列名称 | '操作' |
| searchCustomerLayout | Boolean | 搜索栏是否启用自定义布局 | false |
| viewLayoutSetting | Object | 新增和编辑显示设置，参考 [配置项](/further/front/crudComponent.html#新增和编辑显示设置) | - |
| --- | ---  | --- | --- |
| api | Function | 指定列表数据API | - |
| recycleApi | Function | 指定回收站列表数据API | - |
| add | { api: undefined, auth: [], role: [], text: '新增', show: false } | 新增设置 | - |
| edit | { api: undefined, auth: [], role: [], text: '编辑', show: false } | 编辑设置 | - |
| delete | { api: undefined, auth: [], role: [], text: '删除', realApi: undefined, realAuth: [], realRole: [], realText: '删除', show: false } | 删除设置 | - |
| recovery | { api: undefined, auth: [], role: [], text: '恢复', show: false } | 恢复设置 | - |
| import | { url: undefined, templateUrl: undefined, auth: [], role: [], text: '导入', show: false } | 导入设置 | - |
| export | { url: undefined, auth: [], role: [], text: '导出', show: false } | 导出设置 | - |
| --- | ---  | --- | --- |
| beforeOpenAdd | Function() | 新增打开弹窗前处理方法，返回值：Boolean | - |
| beforeOpenEdit | Function(record) | 编辑打开弹窗前处理方法，返回值：Boolean | - |
| beforeRequest | Function(params) | 请求前置处理方法，返回值：- | - |
| afterRequest | Function(tableData) | 请求后置处理方法，返回值：- | - |
| beforeAdd | Function(formData) | 新增前置处理方法，返回值：- | - |
| afterAdd | Function(response, formData) | 新增后置处理方法，返回值：- | - |
| beforeEdit | Function(formData) | 编辑前置处理方法，返回值：- | - |
| afterEdit | Function(response, formData) | 编辑后置处理方法，返回值：- | - |
| beforeDelete | Function(record) | 删除前置处理方法，返回值：- | - |
| afterDelete | Function(response, record) | 删除后置处理方法，返回值：- | - |


### 方法列表
MaCrud组件暴露的方法，可通过定义的 ref 来调用

- 方法列表

| 方法名 | 说明 | 参数 |
|:---:|:---:|:---:|
| refresh() | 刷新当前页表格 | 无 |
| requestData() | 表格初始化，并请求数据，可用于表格手动加载，配合crud参数 autoRequest: false 来使用 | 无 |
| addAction() | 执行显示新增的弹窗 | 无 |
| editAction() | 执行显示编辑的弹窗 | record: Object |
| getTableData() | 获取当前页的表格数据 | 无 |
| setSelecteds() | 设置默认选择的行 | key: Array |

### 变量列表
MaCrud组件暴露的变量，可通过定义的 ref 来调用

- 变量列表

| 变量名 | 说明 |
|:---:|:---:|
| requestParams | 当前请求的所有参数 |
| isRecovery | 当前是否处于回收站列表 |
| tableRef | 获取组件内部表格的 **ref**  |
| maCrudForm | 获取组件内部的表单 **ref**  |
| maCrudSearch | 获取组件内部搜索栏的 **ref** |
| maCrudImport | 获取组件内部导入的 **ref** |
| maCrudSetting | 获取组件内部表格设置模块的 **ref** |
::: tip
通过内部组件暴露的 ref，可获取内部子组件的数据，进行改变
:::

## COLUMNS详解

### 属性列表
:::tip
以下为 columns 的通用属性，大多数组件还有各自的属性，
可参考 [formType类型列表](/further/front/crudComponent.html#formtype-类型列表) 章节的**其他参数**
:::
| 属性名 | 值类型 | 说明 | 默认值 |
|:---:|:---:|:---:|:---:|
| title | String | 字段业务标识名称 | 无 |
| dataIndex | String | 字段名，支持多层结构字段，如：user.nickname | 无 |
| formType | String | 组件类型，可参考 [formType列表](/further/front/crudComponent.html#formtype-类型列表) | 无 |
| align | String | 表格列对齐方式：'center', 'left', 'right' | 'left' |
| fixed | String | 表格列固定方式：'left', 'right' | 无 |
| sortable | Object | 设置表格字段排序：{ sortDirections: ['ascend', 'descend'], sorter: true }，其中 sorter 是否设置为服务器排序 | 无 |
| search | Boolean | 是否为搜索字段 | false |
| width | Number | 设置表格列的宽度 | auto |
| hide | Boolean | 表格列是否设置隐藏 | false |
| placeholder | String | 设置新增和编辑时的表单字段描述 | 无 |
| rules | Array | 新增/编辑 通用表单验证规则，可参考 Arco 官方的 [验证规则](https://arco.design/vue/component/form#Type) | 无 |
| addRules | Array | 新增时表单的验证规则，可参考 Arco 官方的 [验证规则](https://arco.design/vue/component/form#Type) | 无 |
| editRules | Array | 编辑时表单的验证规则，可参考 Arco 官方的 [验证规则](https://arco.design/vue/component/form#Type) | 无 |
| display | Boolean | 新增/编辑 是否显示字段表单 | true |
| addDisplay | Boolean | 新增是否显示字段表单 | true |
| editDisplay | Boolean | 编辑是否显示字段表单 | true |
| disabled | Boolean | 新增/编辑 是否禁用字段表单 | false |
| addDisabled | Boolean | 新增是否禁用字段表单 | false |
| editDisabled | Boolean | 编辑是否禁用字段表单 | false |
| readonly | Boolean | 新增/编辑 是否只读字段表单 | false |
| addReadonly | Boolean | 新增是否只读字段表单 | false |
| editReadonly | Boolean | 编辑是否只读字段表单 | false |
| addDefaultValue | any | 字段新增时默认值 | 无 |
| editDefaultValue | any | 字段编辑时默认值 | 无 |
| dict | Object | 设置字段字典数据，可参考[字典属性](/further/front/crudComponent.html#使用字典数据) | 无 |
| searchDefaultValue | Number, String | 设置字段搜索的默认值 | 无 |
| searchPlaceholder | String | 设置搜索字段的表单描述 | 无 |
| searchSpan | Number | 搜索栏栅格（在开启搜索栏自定义布局后生效） | 24 |
| formExtra | String | 设置表单扩展提示信息，用于字段说明 | 无 |
| virtualList | Boolean | 是否开启虚拟列表，大数据量下非常流畅，只对 select 组件和 tree-select 组件有效 | 无 |
| control | Function | 字段交互控制 参考[使用方法](/further/front/crudComponent.html#字段交互控制) | 无 |
| cascaderItem | Array | 联动数据，只支持 select, radio, checkbox，[使用说明](/further/front/crudComponent.html#数据联动) | 无 |
| children | Array | 子表单（动态表单，可动态增加删除），只支持一层 | Columns 列表 |
| customRender | Function | 自定义渲染表格列，可使用 JSX 模板语法自定义 | 函数传入参数：{ record, column, rowIndex } |
|---|---|---|---|

### 事件说明
:::tip 事件讲解
formType 指定的组件都包含三个基本事件：
- change 表单数据改变事件
- click 表单数据被点击事件
- blur 表单失去焦点事件

在 columns 的属性中设置，类型均为 Function，参数列表
- value 当前表单的值
- { form, item, currentAction, index } 对象，包含表单Form数据，当前 columns 的 item 属性，当前模式，add 或 edit，表单索引值
:::

## 组件插槽列表

::: tip 什么是插槽
插槽是Vue提出来的一个概念，如名字一样，插槽用于决定将所携带的内容（html代码、组件等内容），插入到指定的某个位置，从而对原始内容进行替换或者自定义扩展
:::

### 搜索栏插槽
- 搜索栏的插槽必须在字段属性中定义了 **search: true** 后才可使用

插槽名称：
- `search-字段名`

参数列表：
- searchForm 搜索表单的数据
- item 当前在columns定义的字段属性

```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef">
        <!-- 自定义字段名为 status 的插槽 -->
        <template #search-status="{ searchForm, item }">
            <!-- 显示一个输入框组件，并绑定输入框的v-model -->
            <a-input v-model="searchForm[item.dataIndex]" placeholder="请输入状态" />
        </template>
    </ma-crud>
</template>
```

### 表格列插槽
插槽名称：
- `字段名`

插槽参数：
- record 当前数据行的数据
- column 当前列信息
- rowIndex 当前数据行的索引号
```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef">
        <!-- 自定义字段名为 title 的插槽 -->
        <template #title="{ record }">
            <!-- 对标题加上 tag -->
            <a-tag color="blue">{{ record.title }}</a-tag>
        </template>
    </ma-crud>
</template>
```

### 主内容区域插槽
插槽名：
- `content`

参数列表：
- tableData 当前页的数据

```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef">
        <template #content="tableData">
            <div v-for="data in tableData">
                <!-- 实现自定义数据展示方式  -->
            </div>
        </template>
    </ma-crud>
</template>
```
### 搜索按钮扩展插槽
插槽名：
- `searchButtons`

参数列表：无参数
```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef">
        <template #searchButtons>
            <a-button>搜索方式A</a-button>
            <a-button>搜索方式B</a-button>
        </template>
    </ma-crud>
</template>
```
### 表格功能按钮扩展插槽
插槽名：
- `tableButtons`

参数列表：无参数
```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef">
        <template #tableButtons>
            <a-button>扩展操作A</a-button>
            <a-button>扩展操作B</a-button>
        </template>
    </ma-crud>
</template>
```

### 表格工具栏扩展插槽
插槽名：
- `tools`

参数列表：无参数
```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef">
        <template #tools>
            <a-button>扩展A</a-button>
            <a-button>扩展B</a-button>
        </template>
    </ma-crud>
</template>
```

### 操作列前置插槽
插槽名：
- `operationBeforeExtend`

参数列表：
- record 当前数据行的数据
- column 当前列信息
- rowIndex 当前数据行的索引号
```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef">
        <template #operationBeforeExtend="{ record }">
            <a-button>查看</a-button>
            <a-button>新增</a-button>
        </template>
    </ma-crud>
</template>
```

### 操作列后置插槽
插槽名：
- `operationAfterExtend`

参数列表：
- record 当前数据行的数据
- column 当前列信息
- rowIndex 当前数据行的索引号
```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef">
        <template #operationAfterExtend="{ record }">
            <a-button>查看</a-button>
            <a-button>新增</a-button>
        </template>
    </ma-crud>
</template>
```
### 操作列单元格插槽
插槽名：
- `operationCell`

参数列表：
- record 当前数据行的数据
- column 当前列信息
- rowIndex 当前数据行的索引号

:::tip
该插槽会替覆盖组件自带的 **编辑和删除** 功能
:::
```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef">
        <template #operationCell="{ record }">
            <a-button>查看</a-button>
            <a-button>新增</a-button>
        </template>
    </ma-crud>
</template>
```

### 合计行插槽
插槽名：
- `summaryCell`

参数列表：
- record 当前数据行的数据
- column 当前列信息
- rowIndex 当前数据行的索引号

```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-crud :crud="crudOptions" :columns="columnsOptions" ref="crudRef">
        <template #summaryCell="{ record }">
            <a-tag>{{ record[column.dataIndex] }}</a-tag>
        </template>
    </ma-crud>
</template>
```

## 表格的行选择器配置
| 名称 | 类型 | 说明 | 默认值 |
|:---:|:---:|:---:|:---:|
| type | 'checkbox', 'radio' | 行选择器的类型 | 无 |
| selectedRowKeys | String[] | 已选择的行（受控模式） | 无 |
| defaultSelectedRowKeys | String[] | 默认已选择的行（非受控模式） | 无 |
| showCheckedAll | Boolean | 是否显示全选选择器 | false |
| title | String | 列标题 | 无 |
| width | Number | 列宽度 | 无 |
| fixed | Boolean | 是否固定 | false |
| checkStrictly | Boolean | 是否开启严格选择模式 (default: true) | false |
| onlyCurrent | Boolean | 是否仅展示当前页的 keys（切换分页时清空 keys） | false |

## 新增和编辑显示设置
| 名称 | 类型 | 说明 | 默认值 |
|:---:|:---:|:---:|:---:|
| layout | 'auto', 'customer' | 布局方式 | 'auto' |
| viewType | 'modal', 'drawer' | 显示方式支持模态框和抽屉 | 'modal' |
| width | Number | 显示宽度 | 600 |
| isFull | Boolean | 是否全屏，只有modal有效 | false |
| cols | Number | 表单设置一行多少列，会自适应。在布局为 auto 下生效 | 1 |
| labelAlign | 'left', 'center', 'right' | 标签对齐方式 | 'right' |

## 合计行设置
| 名称 | 类型 | 说明 | 默认值 |
|:---:|:---:|:---:|:---:|
| dataIndex | string | 合计行字段 | - |
| action | 'sum', 'avg' | 合计方式，sum：加总；avg：平均 | - |