# 升级指南

## 前端升级指南

### 1.1.0 升级到 1.2.0 指南
MaCrud组件修改列表：
- 组件 `Props` 参数的 `crud` 更名为 `options`，但之前的`crud`名称可以继续使用
- `columns` 字段配置项的 `rules` 更名为 `commonRules`，之前名称不可用
- 事件名称修改，统一加了前缀：on 比如，点击事件 onClick: () => {} 注意：区分大小写
- `viewLayoutSetting` 参数，现改名为 `formOption` 之前名称不可使用
同时，该参数下的 `layout` 数据类型改为 `Object` 是对form进行布局配置，可以查看文档
删除了 `cols` 和 `labelAlign` 属性
新增了 `tagId` 参数，`tagName`参数，`viewType`增加了 `tag` 配置

旧版本
```js
  viewLayoutSetting?: {
    // 布局方式, 支持 auto（自动） 和 customer（自定义）两种
    layout?: "auto" | "customer";
    // 显示方式支持模态框和抽屉?: modal drawer
    viewType?: "modal" | "drawer";
    // 显示宽度
    width?: number;
    // 是否全屏，只有modal有效
    isFull?: boolean;
    // 表单设置一行多少列，会自适应，在布局为 auto 下生效
    cols?: number;
    // 标签对齐方式
    labelAlign?: "center" | "right" | "left";
  };
```

新版本
```js
 // 表单配置项
  formOption: {
    // 显示方式支持模态框和抽屉或新打开一个tag页: modal drawer tag
    viewType: 'modal',
    // 只有 viewType 为 tag 时生效，此值在所有 MaCrud 内唯一
    tagId: '',
    // 只有 viewType 为 tag 时生效，定义tag的名称
    tagName: '',
    // 显示宽度
    width: 600,
    // 是否全屏，只有modal有效
    isFull: false,
    // 表单布局
    layout: []
  },
```
- formType组件名称变更列表

| 旧版本 | 新版本 |
|:---:|:---:|
| 'select-user' | 'user-select' |
| 'icon' | 'icon-picker' |

- formType 新增组件列表

| 组件名称 | 说明 |
|:---:|:---:|
| button | Arco的按钮组件 |
| color-picker | 颜色选择器组件 |
| static-text | 静态文字组件 |
| divider | Arco的分割线组件 |
| verify-code | 验证码组件 |

执行 `yarn` 更新依赖

## 后端升级指南

### 1.1.0 升级到 1.1.1 指南
更新文件：
- 更新 App\System\Service\ServerMonitorService.php 文件
- 更新 App\Setting\Service\SettingGenerateColumnsService.php 文件
- 更新 App\System\Controller\UploadController.php 文件
- 更新 App\System\Controller\ServerController.php 文件
- 更新 Mine 目录所有文件

执行 `composer update -o` 更新依赖