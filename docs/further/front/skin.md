# 扩展皮肤
MineAdmin 设计出的换肤功能，灵感思想来源于 `D2Admin`。下面讲解一下如何制作新的皮肤

## 准备工作
1. 在 `public/skins-thumb` 下建立 **皮肤名称** 的目录，该目录存放皮肤缩略图
2. 在 `src/style/skins` 下建立 **皮肤名称** 的目录，并创建 **index.less** 文件。该目录主要存放样式及要使用的背景图片
3. 打开 `src/style/skin.less` 引入皮肤的 **index.less** 文件
4. 配置皮肤信息，打开 `src/config/skins.js` 增加相应的配置信息

## 样式范围前缀

皮肤前缀：`[mine-skin="皮肤名称"]`

```less
/** 设置在 demo 这个皮肤下的菜单图标颜色 **/
[mine-skin="demo"] {
    .arco-trigger-menu .arco-trigger-menu-has-icon .arco-trigger-menu-icon {
        fill: rgb(var(--primary-6));
    }
}
```

Arco 暗黑样式前缀：`[arco-theme="dark"]`

- 混合使用

```less
/** 设置在 demo 这个皮肤的黑暗模式下的菜单图标颜色 **/
[mine-skin="demo"][arco-theme="dark"] {
    .arco-trigger-menu .arco-trigger-menu-has-icon .arco-trigger-menu-icon {
        fill: #fff;
    }
}
```