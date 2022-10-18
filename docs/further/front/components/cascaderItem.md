MineAdmin 专门开发了数据联动功能，可大大简化日常开发中的繁琐

:::tip 必要条件
使用数据联动需要有以下几个条件：
- formType 组件类型比如为：**select | radio | checkbox** 三种类型，其他类型目前暂时不支持
- 联动和被联动的字段都需要在 columns 属性中使用字典
- 被联动数据字典只支持 url 请求方式
- 被联动数据不支持字典翻译（表格的单元格只会显示原始数据，需自行用插槽实现）
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
            url: 'demo/dataD?id={{key}}',
            props: { label: 'title', value: 'key'},
        },
    },
])

// 省略其他示例代码
```