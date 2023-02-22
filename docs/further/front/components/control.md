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
        control: (val) => {
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
