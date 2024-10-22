# 组件明细表格使用

## 配置参考说明
组件是在`ma-crud`和`ma-form`的基础上新增了`form-table`表格明细功能，其`ma-crud`和`ma-form`组件配置以及使用说明请到 
[mineadmin文档](http://doc.mineadmin.com)查看

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
提交数据只需要在 `ma-form` 组件上加上 `@submit` 事件，就可以自行处理提交后端业务逻辑了。

定义提交方法，组件会传入两个参数：
- data 表单数据，经过表单验证的数据
- done 表单状态
:::
```html
<template>
    <!-- 使用 ma-crud 组件，加入提交事件 @submit -->
    <ma-form v-model="form" :columns="columnsOptions" ref="crudForm" @submit="handlerSubmit" />
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

const handlerSubmit = (data, done) => {
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

## 使用字典数据
<DictList />

## 数据联动
<CascaderItem />

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
| display | Boolean | 表单字段是否显示字段表单 | true |
| disabled | Boolean | 表单字段是否禁用字段表单 | false |
| readonly | Boolean | 表单字段是否只读字段表单 | false |
| dict | Object | 设置字段字典数据，可参考[字典属性](/further/front/formComponent.html#使用字典数据) | 无 |
| formExtra | String | 设置表单扩展提示信息，用于字段说明 | 无 |
| virtualList | Boolean | 是否开启虚拟列表，大数据量下非常流畅，只对 select 组件和 tree-select 组件有效 | 无 |
| control | Function | 字段交互控制 参考[使用方法](/further/front/formComponent.html#字段交互控制) | 无 |
| cascaderItem | Array | 联动数据，只支持 select, radio, checkbox，[使用说明](/further/front/formComponent.html#数据联动) | 无 |
| childrenForm | Array | 子表单、明细表格（动态表单，可动态增加删除），只支持一层 | Columns 列表 |
| emptyRow | Number | 默认空行，formType 为子表单或明细表格时生效 | 0 |
|---|---|---|---|

## Options属性列表
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| showButtons | Boolean | 是否显示提交和重置按钮 | 是 |
| layout | 'auto', 'customer' | 布局方式，auto为自动布局，customer为自定义布局 | 'auto' |
| labelAlign | 'left', 'center', 'right' | 设置表单label全局对齐 | 'right' |
| col | Number | 设置表单以几列显示，默认 1 列 | 1 |

## formType属性列表
<formType />

## 组件方法
:::tip
组件方法都需要通过 `ref` 来调用
:::
| 方法名 | 说明 | 参数 | 返回值 |
|:---:|:---:|:---:|:---:|
| init() | 初始化表单 | - | - |
| reset() | 重置表单 | - | - |

## 组件属性
:::tip
组件属性都需要通过 `ref` 来调用
:::
| 属性名 | 说明 |
|:---:|:---:|
| formRef | 组件内部表单的ref，通过这个属性可以调用 arco 表单组件的原生方法和属性 |


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
    <ma-form v-model="form" :columns="columnsOptions" ref="crudForm" @submit="handlerSubmit" />
        <template #form-username="{ form, item }">
            <a-input v-model="form[item.dataIndex]" placeholder="请输入用户名" />
        </template>
    </ma-form>
</template>
```

### 子表单字段插槽
:::tip 说明
子表单代表下面有一组相同的表单数据，对于子表单我们也支持了插槽。

**注意：子表单只支持一层**
:::
插槽名：
- `父字段名-子表单字段名`

参数列表：
- data 子表单数据
- groupItem 子表单字段配置项
- groupIndex 子表单索引序号

:::tip
使用其他输入数据组件，可以用 `form['父字段名'][groupIndexIndex][groupItem.dataIndex]` 来进行双向绑定
:::
```html
<template>
    <!-- 使用 ma-form 组件 -->
    <ma-form v-model="form" :columns="columnsOptions" ref="crudForm" @submit="handlerSubmit" />
        <!-- slot 名称为配置项父级dataIndex + 明细项dataIndex -->
        <template #demoGroup-username="{ data, groupItem, groupIndex }">
            <a-input v-model="form['demoGroup'][groupIndex][groupItem.dataIndex]" placeholder="请输入用户名" />
        </template>
    </ma-form>
</template>
```

### 明细表格字段插槽
:::tip 说明
明细表格在日常业务中经常遇到，比如出差回来要报销，那么公司可能需要你的花费明细，这个时候明细表格就派上用场了。

**注意：明细表格只支持一层**
:::
插槽名：
- `父字段名-子表单字段名`

参数列表：
- record 表格行数据
- tableItem 字段配置项
- tableIndex 表格行索引

:::tip
使用其他输入数据组件，可以用 `form['父字段名'][tableIndex][tableItem.dataIndex]` 来进行双向绑定
:::
```html
<template>
    <!-- 使用 ma-form 组件 -->
    <ma-form v-model="form" :columns="columnsOptions" ref="crudForm" @submit="handlerSubmit" />
        <!-- slot 名称为配置项父级dataIndex + 明细项dataIndex -->
        <template #demoTable-username="{ record, tableItem, tableIndex }">
            <a-input v-model="form['demoTable'][tableIndex][tableItem.dataIndex]" placeholder="请输入用户名" />
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
