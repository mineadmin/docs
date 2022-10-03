| 参数名 | 参数类型 | 参数说明 |
|:---:|:---:|:---:|
| name | String | 指定字典的名称，可在数据字典管理里面查看 |
| data | Array | 指定一个数据集合 |
| url | String | 指定一个url地址，组件自动进行远程请求数据 |
| method | String | 指定url请求时的请求方式：get,post,delete,put |
| params | Object | 指定url请求时的query参数 |
| body | Object | 指定url请求时的data参数 |
| translation | Boolean | 翻译：true则显示字典对应的标签，false则为显示原始数据 |
| tagColor | String | 统一设置tag标签的颜色对翻译的字典数据加上tag，前置条件：translation: true |
| tagColors | Object | 单独对某个字典值设置tag颜色，前置条件：translation: true |
| props | Object | 设置解析数据的 label 和 value，例如: { label: 'title', value: 'key' } |


:::warning tagColors 讲解
tagColors对象里设置的不是字典label，而是value。

比如字典数据为： `[{ label: '正常', value: 1}, {label: '停用', value: 2}]`

那么对应的tagColors设置为：`{ 1: '#ff00ff', 2: 'green' }`
:::

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