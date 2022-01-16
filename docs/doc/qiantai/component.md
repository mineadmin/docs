# 组件介绍

组件主要介绍 `MineAdmin` 系统封装的几个常用组件。`SCUI` 的组件使用方式，请[点击此处](https://lolicode.gitee.io/scui-doc/guide/)

## 图片上传组件(MineAdmin版)
```html
<ma-resource-select />
```
| 参数名           | 释义         |默认值          |
| ------------- |:-------------:|:-------------:|
| resource | 是否显示选择资源按钮 | true |
| thumb | 是否显示预览的缩略图 | false |
| value | 默认显示的图片列表 | [] |
| @upload-data | 方法，上传图片成功后的回调 | null |

其他待完善