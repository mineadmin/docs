# 内置组件
:::tip
目前我们封装了一些常用组件，以后也会增加更多的组件提供大家使用，我们也支持独家组件开发定制。
:::
## 上传组件 MaUpload

### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| v-model | String, Array, Object | 上传数据，双向绑定 | 是 |
| title | String | 上传按钮显示文案 | '文件上传' |
| icon | String | 上传按钮显示图标 | 'iconPlus' |
| rounded | Boolean | 是否为圆角样式 | false |
| multiple | Boolean | 是否可以多选上传 | false |
| disabled | Boolean | 是否为禁用状态 | false |
| size | Number | 上传大小限制（分块上传无效） | 4 * 1024 * 1024 |
| chunk | Boolean | 是否为分块上传 | false |
| chunkSize | Number | 每次分块上传大小 | 1 * 1024 * 1024 |
| limit | Number | 多选上传最多限制最大数量，0为不限制 | 0 |
| tip | String | 提示文案 | - |
| type | 'image', 'file' | 上传类型 | 'image' |
| accept | String | mimeType类型 | '*' |
| onlyUrl | Boolean | 是否只返回url | true |
| fileType | 'drag', 'button' | 上传文件显示方式 | 'button' |
| showList | Boolean | 是否显示已上传文件列表（type为image生效） | true |

### 组件使用
```html
<template>
    <ma-upload v-model="images" />
    <div>图片：{{ images }}</div>
</template>

<script setup>
import { ref } from 'vue'
const images = ref()
</script>
```
## 图表组件 MaCharts
:::tip 提示
组件依赖于 `echarts` 目前只引入了 `柱状图、折线图、饼图、仪表盘` 组件

如需使用 `echarts` 其他组件模块，需要修改 `@/components/index.js` 引入 `echarts` 其他组件模块
:::
### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| options | Object | echarts Option配置属性 | 是 |
| autoresize | Boolean | 是否为自适应大小 | true |
| width | String | 宽度 | '100%' |
| height | String | 高度 | '100%' |

### 组件使用
```html
<template>
    <ma-charts :options="options" />
</template>

<script setup>
import { reactive } from 'vue'
const options = reactive({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
        }
    ]
})
</script>
```

## 省市选择器组件 MaCityLinkage
:::tip 提示
省市数据全部在前端 `@/components/ma-cityLinkage/lib/city.json` 保存
:::
### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| v-model | Number, String, Object | 绑定数据 | 是 |
| autoresize | Boolean | 是否为自适应大小 | true |
| type | 'select', 'cascader' | 组件类型：下拉联动和级联选择器 | 'select' |
| mode | 'name', 'code' | 返回数据格式：省市名称、省市代码 | 'name' |

### 组件使用
:::warning 注意
组件类型不同，返回的数据类型也不同：
- 级联选择器返回数据格式为字符串：String
- 下拉联动返回数据格式为数组：Array
:::
```html
<template>
    <ma-city-linkage v-model="city" />
</template>

<script setup>
import { reactive } from 'vue'
const city = reactive([])
</script>
```

## 资源选择器组件 MaResource
资源选择器分为两种组件形式：一种为直接展示型；一种为按钮型，点击后打开资源选择器。
### 展示型组件
#### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| v-model | String, Number | 绑定数据 | 是 |
| multiple | Boolean | 是否允许多选 | true |
| onlyUrl | Boolean | 是否只返回URL | true |

#### 组件使用
```html
<template>
    <ma-resource v-model="imageList" />
    <div>选择的图片{{ imageList }}</div>
</template>

<script setup>
import { ref } from 'vue'
const imageList = ref([])
</script>
```

### 按钮型组件
#### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| v-model | String, Number | 绑定数据 | 是 |
| multiple | Boolean | 是否允许多选 | true |
| onlyUrl | Boolean | 是否只返回URL | true |
| width | Number | 模态框的宽度 | 1080 |

#### 组件使用
```html
<template>
    <ma-resource-button v-model="imageList" />
    <div>选择的图片{{ imageList }}</div>
</template>

<script setup>
import { ref } from 'vue'
const imageList = ref([])
</script>
```

## 树侧边栏选择器 MaTreeSlider
### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| v-model | Array | 绑定数据 | 是 |
| searchPlaceholder | String | 搜索框提示文案 | - |
| selectedKeys | Array | 设置默认被选中的节点key | - |
| fieldNames | Object | 树的props | { title: 'label', value: 'code' } |
| icon | String | 设置节点图标 | - |

### 组件属性
:::tip
属性需通过组件定义的 `ref` 来调用
:::
| 属性 | 描述 |
|:---:|:---:|
| MaTree | `a-tree` 组件的 `ref`，可以调用 `Arco design` 的原生组件属性和方法 |

### 组件使用
:::warning 注意
该组件未进行全局挂载，使用时需要单独引入
:::
```html
<template>
    <ma-tree-slider
        v-model="depts"
        searchPlaceholder="搜索部门"
        :field-names="{ title: 'label', key: 'value' }"
        @click="switchDept"
    />
</template>

<script setup>
import { reactive } from 'vue'
const depts = reactive([
    {
        label: '部门A'，
        value: 1,
    },
    {
        label: '部门B'，
        value: 2,
    }
])

const switchDept = (key) => {
    const dept = depts.find(item => item.value == key)
    console.log(dept.label)
}
</script>
```

## 图标选择器 MaIcon
### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| v-model | String, Number | 绑定数据 | 是 |

### 组件使用
```html
<template>
    <ma-icon v-model="icon" />
    <div>选择的图标：{{ icon }}</div>
</template>

<script setup>
import { ref } from 'vue'
const icon = ref()
</script>
```

## 编辑器组件 MaEditor
### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| v-model | String | 绑定数据 | 是 |
| height | Number | 编辑器高度 | 400 |

### 组件使用
```html
<template>
    <ma-editor v-model="content" :height="600" />
</template>

<script setup>
import { ref } from 'vue'
const content = ref('')
</script>
```

## 代码编辑器组件 MaCodeEditor
### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| v-model | String | 绑定数据 | 是 |
| height | Number | 编辑器高度 | 400 |
| isBind | Boolean | 是否绑定回显 | false |
| language | 'php','javascript','mysql','html','css' | 编辑器高亮语言 | 'javascript' |
| readonly | Boolean | 是否为只读状态 | false |

### 组件使用
```html
<template>
    <ma-code-editor v-model="codeContent" language="php" :height="600" />
</template>

<script setup>
import { ref } from 'vue'
const codeContent = ref(' <?php echo "Hello World!"; ?> ')
</script>
```

## 用户选择器组件 MaUser

### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| v-model | String, Number | 绑定数据 | 是 |
| isEcho | Boolean | 是否回显记录已选择用户 | false |
| onlyId | Boolean | 是否只返回ID，否则返回全量数据 | true |

### 组件使用
```html
<template>
    <ma-user v-model="userList" />
    <div>已选择的用户：{{ userList }}</div>
</template>

<script setup>
import { ref } from 'vue'
const userList = ref([])
</script>
```

## 用户信息组件 MaUserInfo
### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| v-model | String, Number | 绑定数据 | 是 |

### 组件使用
```html
<template>
    <ma-userinfo v-model="userinfo" />
    <div>选择的用户信息：{{ userinfo }}</div>
</template>

<script setup>
import { ref } from 'vue'
const userinfo = ref()
</script>
```
## 验证码组件 MaVerifyCode

### 组件方法
:::tip
方法需通过组件定义的 `ref` 来调用
:::
| 方法名 | 描述 | 参数 | 返回值 |
|:---:|:---:|:---:|:---:|
| checkResult() | 校验验证码是否正确 | verifyCode | Boolean |
| refresh() | 刷新验证码 | - | - |

### 组件使用
:::warning 注意
该组件未进行全局挂载，使用时需要单独引入
:::
```html
<template>
    <a-form :model="form" @submit="handleSubmit">
        <a-form-item
            field="code"
            :hide-label="true"
            :rules="[{
                required: true,
                match: /^[a-zA-Z0-9]{4}$/,
                message: '请输入验证码'
            }]"
        >
            <a-input
              v-model="form.code"
              :placeholder="$t('sys.login.verifyCode')"
              size="large"
              allow-clear
            >
                <template #prefix><icon-safe /></template>
                <template #append>
                    <!-- 验证码 options 参数不是必须设置的 -->
                    <ma-verify-code ref="verifyCode" :options="options" />
                </template>
            </a-input>
        </a-form-item>
    <a-form>
</template>

<script setup>
// 引入组件
import MaVerifyCode from '@cps/ma-verifyCode/index.vue'
import { ref } from 'vie'
const verifyCode = ref()
const form = ref({})
// 设置验证码参数，该参数不是必须设置的。
const options = ref({
    pool: '1234567890',
    size: 4,
    width: 120,
    height: 30
})

const handleSubmit = ({ values, errors }) => {

    // 校验验证码
    if (! verifyCode.value.checkResult(values.code)) {
        // 验证码未通过。。。
        return false
    }
    // 处理提交数据
}
</script>
```


## 表单弹窗组件 formModal
### 组件参数
| 参数名 | 参数类型 | 参数说明 | 是否必填/默认值 |
|:---:|:---:|:---:|:---:|
| title | String| 弹出框标题 | |
| column| Boolean | ma-form组件column属性 | {} |
| options| Boolean | ma-form组件options属性| {} |
| default_visible| Boolean | 默认隐藏 | false |
| submit| Function | 提交回调事件，注意是这样:submit="submit"不用加括号 |  |
### 组件方法
:::tip
方法需通过组件定义的 `ref` 来调用
:::
| 方法名 | 描述 | 参数 | 返回值 |
|:---:|:---:|:---:|:---:|
| open(formData) | 打开弹窗 | formData | Object |
| close() | 关闭弹窗 | - | - |

### 组件使用
:::warning 注意
该组件未进行全局挂载，使用时需要单独引入
:::
```html
<template>
  <div>
    <ma-form-modal
        :column="column"
        :submit="submit"
    >
      <template #body>
        提示信息
      </template>
    </ma-form-modal>
  </div>
</template>

<script setup>
import {ref, reactive, shallowRef} from 'vue'
import MaFormModal from "@/components/ma-form-modal/index.vue"

/**
 * 于ma-form的column参数一致
 */
const column = reactive([
  {
    dataIndex: "test",
    title: "测试",
    rules: {
      required: "测试不可为空"
    }
  },
  {
    dataIndex: "msg",
    title: "备注",
  }
])
const submit = async (formData) => {
  console.log(formData)
}
</script>

<style scoped>

</style>
```