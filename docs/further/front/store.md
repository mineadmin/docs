# Pinia状态管理

Pinia 是 Vue 的存储库，它允许您跨组件/页面共享状态。

相比 Vuex 来讲，Pinia 简便了很多，使用起来非常方便，也可以算是下一代的 Store

## 存放目录及内置Store

存放Store的目录在 `src/store/modules`, 目前系统有以下几处使用了 Pinia：
- app.js 保存整个系统的设置信息，包括个人的个性化设置
- config.js 保存系统设置里的站点配置信息
- doc.js 保存访问API文档的身份信息
- iframe.js 保存iFrame类型菜单的keepalive信息
- keepAlive.js 保存路由的keepalive信息
- message.js 保存消息通知的数据
- tag.js 保存后台系统多标签的数据
- user.js 保存当前登录用户的信息数据

## 定义一个Store
src/store/modules/foo.js
```js
import { defineStore } from 'pinia'

const useFooStore = defineStore('foo', {
  state: () => {
    name: '',
  },

  getters: {
    getFoo(state) {
      return { ...state }
    },
  },

  actions: {
    setFooName (name) {
        this.name = name
    }
  }
```

:::tip
src/store/index.js 需要增加引入，才能让自己新增的 Store 生效
:::
```js
import { createPinia } from 'pinia'
import useUserStore from './modules/user'
import useAppStore from './modules/app'
import useTagStore from './modules/tag'
import useKeepAliveStore from './modules/keepAlive'
import useIframeStore from './modules/iframe'
import useConfigStore from './modules/config'
import useMessageStore from './modules/message'
import useDocStore from './modules/doc'
// 下面引入新增的foo
import useFooStore from './modules/foo'

const pinia = createPinia()

export {
  useUserStore,
  useAppStore,
  useTagStore,
  useKeepAliveStore,
  useIframeStore,
  useConfigStore,
  useMessageStore,
  useDocStore,
  // 下面也导出新增的
  useFooStore
}
export default pinia
```

## 使用Store
src/store/modules/foo.js
```js
import { useFooStore } from '@/store'

const fooStore = useFooStore()

// 设置
fooStore.setFooName('法外狂徒-张三')

// 输出到控制台
console.log(fooStore.name)
```