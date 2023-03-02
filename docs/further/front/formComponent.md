# MaForm组件（重要）

:::tip 介绍
MaForm组件是MineAdmin特意封装的一个用于快速构建表单的组件，用法与MaCrud组件类型，都是通过配置JSON快速生成。相比表单设计器虽然不是可视化，但比表单生成器一次性的生成后，在后续修改维护的方面要快捷方便的多。而且组件支持后端传入JSON配置动态渲染表单。*（参考系统配置功能）* 
:::

## 初步使用

组件进行了全局挂载，我们在任何的 Vue 页面中，只需要调用组件即可

以下为组件的Props参数 **组件初始化需要设置必填的两个参数**：`v-model` 和 `columns`
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| v-model | Object | 表单数据，双向绑定 | 是 |
| columns | Array | 表单字段配置列表，点此查看[[全部属性]](/further/front/formComponent.html#Columns属性列表) | 是 |
| options | Object | 表单配置，点此查看[[全部属性]](/further/front/formComponent.html#Options属性列表) | 否 |

:::tip
- 建议每个调用的 ma-form 组件，都设置一个 **ref** 参数，如下代码示例
:::

```html
<template>
    <!-- 使用 ma-crud 组件 -->
    <ma-form v-model="form" :columns="columnsOptions" ref="crudForm" />
</template>

<script setup>
import { ref, reactive } from 'vue'

// form 组件的 ref
const crudForm = ref()
// 表单数据
const form = ref({})
// 组件的字段设置
const columnsOptions = reactive([
    {
        title: '真实姓名',
        dataIndex: 'realName',
        formType: 'input',  // 默认为 input 组件
    },
    {
        title: '性别',
        dataIndex: 'sex',
        formType: 'radio',  // 使用单选框组件
        // 定义字典数据
        dict: {
            data: [{ label: '保密', value: 0 }, { label: '男', value: 1 }, { label: '女', value: 2 }]
        }
    },
    {
        title: '所在省市',
        dataIndex: 'city',
        formType: 'city-linkage',  // 使用省市联动选择器
        type: 'cascader',
    },
])
</script>
```

## 提交数据
:::tip
提交数据只需要在 `ma-form` 组件上加上 `@onSubmit` 事件，就可以自行处理提交后端业务逻辑了。

定义提交方法，组件会传入两个参数：
- data 表单数据，经过表单验证的数据
- done 表单状态
:::
```html
<template>
    <!-- 使用 ma-crud 组件，加入提交事件 @onSubmit -->
    <ma-form v-model="form" :columns="columnsOptions" ref="crudForm" @onSubmit="handlerSubmit" />
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message } from '@arco-design/web-vue'
import foo from '@/api/foo.js'

// form 组件的 ref
const crudForm = ref()
// 表单数据
const form = ref({})
// 组件的字段设置
const columnsOptions = reactive([
    {
        title: '真实姓名',
        dataIndex: 'realName',
        formType: 'input',  // 默认为 input 组件
    },
    {
        title: '性别',
        dataIndex: 'sex',
        formType: 'radio',  // 使用单选框组件
        // 定义字典数据
        dict: {
            data: [{ label: '保密', value: 0 }, { label: '男', value: 1 }, { label: '女', value: 2 }]
        }
    },
    {
        title: '所在省市',
        dataIndex: 'city',
        formType: 'city-linkage',  // 使用省市联动选择器
        type: 'cascader',
    },
])

const handlerSubmit = (data) => {
    // 显示表单提交中状态
    done(true)
    if (data) {
        if (data.realName == '张三') {
            Message.info('真实姓名是张三')
        }
        foo.save(data).then( res => {
            if (res.code == 200 && res.success) {
                Message.succes('提交成功')
            }
        }).catch( e => {
            console.error(e)
            Message.error('提交失败')
        })
    }
    // 关闭表单提交中状态
    done(false)
}
</script>
```

## 设置表单字段默认值
:::tip
由于表单组件的 `v-model` 是双向绑定的，我们只需要通过改变字段的值，即可影响组件的数据更新。
:::
```js
// 省略html代码

import { ref, reactive } from 'vue'

// form 组件的 ref
const crudForm = ref()

// 表单数据，我们通过对 form 表单数据直接初始化即可设置字段的默认值
const form = ref({ realName: '张三', sex: 0 })

// 通过某个事件调用方法改变表单的值
const handlerChange = () => {
    form.value.sex = 1
    form.value.realName = '李四'
}

// 省略其他代码
```

## 表单布局
:::tip 介绍
表单布局是前端**1.2.0**版本新增的功能，也是MaForm非常强大且自豪的功能

通过配置可以实现适应各种复杂需求的表单布局排版，比如
- 简历表单
- 商品发布表单
- 报表表单
:::

### 布局容器介绍
目前表单以下几种布局方式：
- tabs 选项卡
- grid 栅格
- grid-tailwind 自适应栅格（使用tailwindCSS的栅格系统）
- table 表格
- card 卡片

:::tip 注意事项
每个布局容器都可以进行嵌套其他容器，但请不要套娃！！
:::

### tabs选项卡容器
配置参数：
- **formType:** 'tabs'
- **display** 是否显示组件
- **tabs:** [] 选项卡配置信息，几个选项卡则配置几个，属性参考下面tabs对象属性列表
- 其他属性可参考 **Arco Design** 的 [**Tabs API**](https://arco.design/vue/component/tabs#API)


事件列表：
- **onTabClick** 用户点击标签时触发，参数 key: string | number
- **onChange** 当前标签值改变时触发，参数 key: string | number
- **onAdd** 用户点击增加按钮时触发，参数 无
- **onDelete** 用户点击删除按钮时触发，参数 key: string | number

tabs 对象属性列表：
- **title** tab选项卡名称
- **display** 是否显示组件
- **dataIndex** tab选项卡的索引，可不配置
- **customClass:** [] 自定义className
- **formList** 表单列表，同 columns 属性
- 其他属性可参考 **Arco Design** 的 [**Tabs API**](https://arco.design/vue/component/tabs#API)

### table表格容器
配置参数：
- **formType:** 'table'
- **display** 是否显示组件
- **customClass:** [] 自定义className
- **style:** {} 自定义样式
- **rows:** [] 行配置，几行则配置几个，属性参考下面rows对象属性列表

rows (行) 对象属性列表：
- **customClass:** [] 自定义className
- **display** 是否显示组件
- **style:** {} 自定义样式
- **cols:** [] 列配置，几列则配置几个, 属性参考下面cols对象属性列表
- **formList** 表单列表，同 columns 属性

cols (单元格) 对象属性列表
- **customClass:** [] 自定义className
- **display** 是否显示组件
- **style:** {} 自定义样式
- **colspan:** 跨列数（合并列）
- **rowspan:** 跨行数（合并行）
- **formList** 表单列表，同 columns 属性

### grid栅格容器（Arco栅格系统）
配置参数：
- **formType:** 'grid'
- **customClass:** [] 自定义className
- **display** 是否显示组件
- **cols:** [] 列配置，几列则配置几个，属性参考下面cols对象属性列表
- 其他属性可参考 **Arco Design** 的 [**Grid API**](https://arco.design/vue/component/grid#API)

cols 对象属性列表
- **customClass:** [] 自定义className
- **display** 是否显示组件
- **formList** 表单列表，同 columns 属性
- 其他属性可参考 **Arco Design** 的 [**Grid API**](https://arco.design/vue/component/grid#API)

### grid-tailwind栅格容器
配置参数：
- **formType:** 'grid-tailwind'
- **display** 是否显示组件
- **customClass:** [] 自定义className
- **style** 自定义样式
- **colNumber** 一行显示几列，最少1列，最多12列
- **cols:** [] 列配置，几列则配置几个，属性参考下面cols对象属性列表

cols 对象属性列表
- **display** 是否显示组件
- **customClass:** [] 自定义className
- **style** 自定义样式
- **span** 占据多少列，最大24  
- **formList** 表单列表，同 columns 属性

### card卡片容器
配置参数：
- **formType:** 'card'
- **display** 是否显示组件
- **customClass:** [] 自定义className
- **dataIndex** tab选项卡的索引，可不配置
- **formList** 表单列表，同 columns 属性
- 其他属性可参考 **Arco Design** 的 [**Card API**](https://arco.design/vue/component/card#API)


### 代码示例
可直接复制走运行测试
```html
<template>
  <div class="p-3">
    <ma-form v-model="form" :options="options" :columns="columns"></ma-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const form = ref({
  createUser: '狂徒张三',
  createTime: dayjs().format('YYYY-MM-DD'),
  auditReportType: '0',
  firmOfficeArea: { province: '河南省', city: '洛阳市' },
})
const auditReportTypeData = [
  { label: '年报审计', value: '0' },
  { label: '净资产专项审计', value: '1' },
  { label: '财务尽职调查', value: '2' },
  { label: '资产清查专项审计', value: '3' },
]
const options = ref({
  showFormTitle: true,
  formTitle: '新增审计报告',
})
const columns = ref([
  {
    formType: 'card',
    title: '基础信息',
    customClass: ['mt-3'],
    bodyStyle: { paddingBottom: 0, },
    formList: [
      {
        title: '审计报告类型', dataIndex: 'auditReportType', formType: 'radio', labelWidth: '135px',
        dict: { data: auditReportTypeData },
      },
      {
        formType: 'grid-tailwind',
        customClass: ['mt-5'],
        colNumber: 2,
        cols: [
          {
            formList: [{
              dataIndex: 'auditName', title: '报告名称', labelWidth: '150px',
              rules: [{ required: true, message: '请输入报告名称' }]
            }]
          },
          {
            formList: [{
              dataIndex: 'createTime', title: '创建日期', formType: 'date', labelWidth: '150px',
              rules: [{ required: true, message: '请选择创建日期' }]
            }]
          },
          {
            formList: [{
              dataIndex: 'createUser', title: '创建人', disabled: true, labelWidth: '150px',
            }]
          },
        ]
      },
      {
        formType: 'grid-tailwind',
        colNumber: 2,
        cols: [
          {
            formList: [{
              dataIndex: 'signCPA1', title: '签字注册会计师-1', labelWidth: '150px'
            }]
          },
          {
            formList: [{
              dataIndex: 'signCPA2', title: '签字注册会计师-2', labelWidth: '150px'
            }]
          }
        ]
      },
    ]
  },
  {
    formType: 'card',
    title: '事务所信息',
    customClass: ['mt-3'],
    bodyStyle: { paddingBottom: 0, },
    formList: [
      {
        dataIndex: 'firmCnName', title: '事务所中文全称', labelWidth: '130px',
        rules: [{ required: true, message: '请输入事务所中文全称' }]
      },
      {
        dataIndex: 'firmCnAbbrName', title: '事务所中文简称', labelWidth: '130px',
        rules: [{ required: true, message: '请输入事务所中文简称' }]
      },
      {
        dataIndex: 'firmEnName', title: '事务所英文全称', labelWidth: '130px',
        rules: [{ required: true, message: '请输入事务所英文简称' }]
      },
      {
        dataIndex: 'firmEnAbbrName', title: '事务所英文简称', labelWidth: '130px',
        rules: [{ required: true, message: '请输入事务所英文简称' }]
      },
      {
        dataIndex: 'firmOfficeArea', title: '事务所行政区域', labelWidth: '130px', formType: 'city-linkage',
        rules: [{ required: true, message: '请输入事务所英文简称' }]
      },
    ],
  },
  { 
    formType: 'card',
    title: '被审计单位信息',
    customClass: ['mt-3', 'mb-5'],
    formList: [
      { 
        title: '基础信息', formType: 'divider', orientation: 'left', margin: '30px',
      },
      {
        formType: 'grid-tailwind',
        customClass: ['mt-5'],
        colNumber: 2,
        cols: [
          { 
            formList: [{
              dataIndex: 'companyName', title: '单位名称', labelWidth: '170px',
              rules: [{ required: true, message: '请输入单位名称' }]
            }]
          },
          { 
            formList: [{
              dataIndex: 'subscribeRegisterCapital', title: '认缴注册资本', labelWidth: '150px',
              rules: [{ required: true, message: '请输入认缴注册资本' }]
            }]
          },
          {
            formList: [{
              dataIndex: 'companyCreditCode', title: '统一社会信用代码', labelWidth: '170px',
              rules: [{ required: true, message: '请输入统一社会信用代码' }] 
            }]
          },
          { 
            formList: [{
              dataIndex: 'corporate', title: '法定代表人', labelWidth: '150px',
              rules: [{ required: true, message: '请输入法定代表人' }]
            }]
          }
        ]
      },
      {
        dataIndex: 'actualControl', title: '实际控制人', labelWidth: '150px',
        rules: [{ required: true, message: '请输入实际控制人' }]
      },
      { 
        dataIndex: 'registerArea', title: '注册地区', labelWidth: '150px', formType: 'city-linkage',
        rules: [{ required: true, message: '请选择企业注册地区' }]
      },
      { 
        dataIndex: 'detailAddress', title: '详细地址', labelWidth: '150px',
        rules: [{ required: true, message: '请输入详细地址' }]
      },
      { 
        dataIndex: 'businessScope', title: '经营范围', labelWidth: '150px', formType: 'textarea',
        rules: [{ required: true, message: '请输入经营范围' }]
      },
      { 
        title: '股东信息', formType: 'divider', orientation: 'left', margin: '30px',
      },
      {
        title: '股东列表', dataIndex: 'shareholderInfo', formType: 'children-form', type: 'table', emptyRow: 2,
        formList: [
          { title: '股东名称', dataIndex: 'name', rules: [{ required: true, message: '请输入股东名称' }] },
          { title: '认缴资本金', dataIndex: 'registerCapital', rules: [{ required: true, message: '请输入认缴资本金' }] },
          { title: '实收资本', dataIndex: 'actualCapital', rules: [{ required: true, message: '请输入实收资本' }] },
          { title: '认缴比例', dataIndex: 'registerShareRatio', rules: [{ required: true, message: '请输入认缴比例' }] },
          { title: '实缴比例', dataIndex: 'actualShareRatio', rules: [{ required: true, message: '请输入实缴比例' }] }
        ]
      }
    ],
  },
])
</script>
```

## 事件介绍
:::tip
ma-form对事件做了封装，支持arco每种组件的所有事件，但事件名也有稍稍改动：`on + 事件名（驼峰）`

比如，Arco的input组件原生 **用户按下回车时触发** 事件： press-enter，在配置里使用的时候则为:
```js
onPressEnter: (ev) => {
    console.log(ev)
}
```

通用事件，每种组件都有以下两种通用事件
- onCreated 在组件为vue的created生命周期内会被调用
- onMounted 在组件为vue的mounted生命周期内会被调用
:::

## 扩展自定义组件
:::tip
虽然我们提供了Arco全部数据组件的支持，但某些复杂业务场景下还会有不够用的感觉，这个时候只需要自己开发组件加入到maform当中，即可让maform来支持调用。同时，由于`MaCrud`组件的表单是使用的`MaForm`组件，所以在`MaCrud`也就可以使用

注意：**formType: 'component'** 虽然可以调用自定义组件，但只是配置项**单次**调用。
但扩展出的组件则可以在maForm内部随意使用
:::

### 示例代码
示例代码，代码里的 `<custom-component v-model="value" />` 请根据自己的组件名称修改
```html
<template>
  <!-- 组件外部的 form-item -->
  <ma-form-item
    v-if="(typeof props.component.display == 'undefined' || props.component.display === true)"
    :component="props.component"
    :custom-field="props.customField"
  >
    <slot :name="`form-${props.component.dataIndex}`" v-bind="props.component">
      <!-- 调用自己开发的自定义组件，具体名称改成自己的 -->
      <custom-component v-model="value" />
    </slot>
  </ma-form-item>
</template>

<script setup>
// 引入相关vue必要的api
import { ref, inject, onMounted, watch } from 'vue'
// 引入处理索引的函数
import { get, set } from 'lodash'
// 引入 MaFormItem 组件
import MaFormItem from './form-item.vue'
// 引入处理事件的函数
import { maEvent } from '../js/formItemMixin.js'
// 组件都需要定义以下的props
const props = defineProps({
  component: Object,
  customField: { type: String, default: undefined }
})
// form数据列表
const formModel = inject('formModel')
// 使用数据字典，如有必要使用可加入下面这行代码
const dictList = inject('dictList')
// 该组件在form数据的索引名称
const index = props.customField ?? props.component.dataIndex
// 该组件的表单数据
const value = ref(get(formModel.value, index))

// 监听组件数据的改变
watch( () => get(formModel.value, index), vl => value.value = vl )
watch( () => value.value, v => set(formModel.value, index, v) )

// 绑定组件事件
maEvent.handleCommonEvent(props.component, 'onCreated')
onMounted(() => {
  maEvent.handleCommonEvent(props.component, 'onMounted')
})
</script>
```

### 扩展方法
组件写好以后，把文件移动到 `src/components/ma-form/formItem/` 下面，文件名以 `form-` 开头，后面则为自己定义的组件名。

例如: `form-demo.vue`

调用方法：在配置里 `formType: 'demo'` 指定组件名称即可。只要符合规范的组件及组件名放入到此目录，都会被自动识别

## 字段交互控制
<Control />

## Columns属性列表
:::tip
以下为 columns 的通用属性，大多数组件还有各自的属性，
可参考 [formType类型列表](/further/front/formComponent.html#formtype属性列表) 章节的**其他参数**
:::
| 属性名 | 值类型 | 说明 | 默认值 |
|:---:|:---:|:---:|:---:|
| title | String | 字段业务标识名称 | 无 |
| dataIndex | String | 字段名，支持多层结构字段，如：user.nickname | 无 |
| formType | String | 组件类型，可参考 [formType列表](/further/front/crudComponent.html#formtype属性列表) | 无 |
| placeholder | String | 表单字段描述 | 无 |
| rules | Array | 表单字段验证规则，可参考 Arco 官方的 [验证规则](https://arco.design/vue/component/) | 无 |
| dict | Object | 设置字段字典数据，可参考[字典属性](/further/front/formComponent.html#使用字典数据) | 无 |
| control | Function | 字段交互控制 参考[使用方法](/further/front/formComponent.html#字段交互控制) | 无 |
| cascaderItem | Array | 联动数据，只支持 select, radio，[使用说明](/further/front/formComponent.html#数据联动) | 无 |
| formList | Array | 容器或子表单时配置使用 | 无 |
| emptyRow | Number | 默认空行，formType为子表单时生效 | 0 |
|---|---|---|---|

## Options属性列表
| 参数名 | 参数类型 | 参数说明 | 默认值 |
|:---:|:---:|:---:|:---:|
| init | Boolean| 是否自动初始化表单并加载字典及联动远程数据 | true |
| loadingText | String | 表单等待中提示文案 | '加载中...' |
| customClass | Array | 表单样式class | [] |
| size | String | 表单控件尺寸（全局）'mini', 'small', 'medium', 'large' | 'medium' |
| labelAlign | String | 标签的对齐方向 | 'right' |
| layout | String | 表单排列方式 horizontal 水平排列 vertical 垂直排列 inline 行内排列 | 'horizontal' |
| disabled | Boolean | 表单是否禁用 | false |
| showButtons | Boolean | 是否显示提交和重置按钮 | true |
| rules | Object | 表单项验证规则整体配置 | 无 |
| - | - | - | - |
| submitIcon | String | 提交按钮图标 | 'icon-send' |
| submitType | String | 提交按钮类型 | 'primary' |
| submitStatus | String | 提交按钮状态 | 'normal' |
| submitText | String | 提交按钮文案 | '提交' |
| submitShowBtn | Boolean | 是否显示提交按钮 | true |
| - | - | - | - |
| resetIcon | String | 重置按钮图标 | 'icon-refresh' |
| resetType | String | 重置按钮类型 | 'secondary' |
| resetStatus | String | 重置按钮状态 | 'normal' |
| resetText | String | 重置按钮文案 | '重置' |
| resetShowBtn | Boolean | 是否显示重置按钮 | true |
| - | - | - | - |
| formTitle | String | 表单标题文案 | '未命名表单' |
| showFormTitle | Boolean | 是否显示表单标题 | false |
| formTitleStyle | String, Object | 自定义标题样式css | '' |
| formTitleClass | Array | 自定义标题样式class | [] |

## formType属性列表
<formType />

## 组件方法
:::tip
组件方法都需要通过 `ref` 来调用
:::
| 方法名 | 说明 | 参数 | 返回值 |
|:---:|:---:|:---:|:---:|
| init() | 初始化表单 | - | - |
| getFormRef() | 获取表单的Ref | - | Object |
| getColumns() | 获取表单Columns配置列表 | - | Array |
| getDictlist() | 获取字典数据列表 | - | Object |
| getCascaderList() | 获取联动数据列表 | - | Object |
| getFormData() | 获取表单数据 | - | Object |
| validateForm() | 验证表单 | - | - |
| resetForm() | 重置表单 | - | - |
| clearValidate() | 清除表单验证状态 | - | - |


## 组件插槽列表
表单组件支持各个字段的插槽定义，可以实现想要的业务逻辑

### 字段组件插槽
插槽名：
- `form-字段名`

参数列表：
- form 表单数据
- item 当前字段配置项

:::tip
使用其他输入数据组件，可以用 `form[item.dataIndex]` 来进行双向绑定
:::
```html
<template>
    <!-- 使用 ma-form 组件 -->
    <ma-form v-model="form" :columns="columnsOptions" ref="crudForm" @onSubmit="handlerSubmit" />
        <template #form-username>
            <a-input v-model="form['username']" placeholder="请输入用户名" />
        </template>
    </ma-form>
</template>
```

### 表单按钮前置插槽
插槽名：
- `formBeforeButtons`

参数列表：
无

```html
<template>
    <!-- 使用 ma-form 组件 -->
    <ma-form v-model="form" :columns="columnsOptions" ref="crudForm" @onSubmit="handlerSubmit" />
        <template #formBeforeButtons>
            <a-button>前置按钮</a-button>
        </template>
    </ma-form>
</template>
```

### 表单按钮后置插槽
插槽名：
- `formAfterButtons`

参数列表：
无

```html
<template>
    <!-- 使用 ma-form 组件 -->
    <ma-form v-model="form" :columns="columnsOptions" ref="crudForm" @onSubmit="handlerSubmit" />
        <template #formAfterButtons>
            <a-button>后置按钮</a-button>
        </template>
    </ma-form>
</template>
```

### 表单按钮插槽
插槽名：
- `formButtons`

参数列表：
无

:::tip 注意
使用此插槽会替换掉默认的提交和重置按钮
:::
```html
<template>
    <!-- 使用 ma-form 组件 -->
    <ma-form v-model="form" :columns="columnsOptions" ref="crudForm" @onSubmit="handlerSubmit" />
        <template #formButtons>
            <a-button>按钮1</a-button>
            <a-button>按钮2</a-button>
        </template>
    </ma-form>
</template>
```

<script setup>
import formType from './components/formType.html.vue'
import DictList from './components/dictList.html.vue'
import CascaderItem from './components/cascaderItem.html.vue'
import Control from './components/control.html.vue'
</script>
